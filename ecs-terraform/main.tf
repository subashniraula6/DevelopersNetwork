terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

#############################
# VPC, Subnet, and Networking
#############################

resource "aws_vpc" "main" {
  cidr_block = var.vpc_cidr
}

data "aws_availability_zones" "available" {}

resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true
}

resource "aws_internet_gateway" "gw" {
  vpc_id = aws_vpc.main.id
}

resource "aws_route_table" "public" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.gw.id
  }
}

resource "aws_route_table_association" "public" {
  subnet_id      = aws_subnet.public.id
  route_table_id = aws_route_table.public.id
}

#############################
# Security Group
#############################

resource "aws_security_group" "ecs_tasks" {
  name        = "ecs-tasks"
  description = "Security group for ECS tasks"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

#############################
# ECS Cluster
#############################

resource "aws_ecs_cluster" "main" {
  name = var.ecs_cluster_name
}

#############################
# EC2 Launch Configuration & Auto Scaling Group
#############################

# Use the SSM parameter for the ECS-Optimized Amazon Linux 2 AMI.
data "aws_ssm_parameter" "ecs_optimized_ami" {
  name = "/aws/service/ecs/optimized-ami/amazon-linux-2/recommended/image_id"
}

resource "aws_launch_template" "ecs_lt" {
  name_prefix            = "ecs-lt-"
  image_id               = data.aws_ssm_parameter.ecs_optimized_ami.value
  instance_type          = var.ec2_instance_type
  key_name               = var.key_name
  vpc_security_group_ids = [aws_security_group.ecs_tasks.id]

  user_data = base64encode(<<-EOF
    #!/bin/bash
    echo ECS_CLUSTER=${aws_ecs_cluster.main.name} >> /etc/ecs/ecs.config
    EOF
  )

  lifecycle {
    create_before_destroy = true
  }
}

resource "aws_autoscaling_group" "ecs_asg" {
  name                = "ecs-asg"
  vpc_zone_identifier = [aws_subnet.public.id]
  desired_capacity    = var.desired_capacity
  max_size            = var.max_size
  min_size            = var.min_size
  health_check_type   = "EC2"

  launch_template {
    id      = aws_launch_template.ecs_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "ecs-instance"
    propagate_at_launch = true
  }
}

#############################
# ECS Capacity Provider
#############################

resource "aws_ecs_capacity_provider" "asg_capacity_provider" {
  name = "asg-capacity-provider"

  auto_scaling_group_provider {
    auto_scaling_group_arn         = aws_autoscaling_group.ecs_asg.arn
    managed_termination_protection = "DISABLED"

    managed_scaling {
      status          = "ENABLED"
      target_capacity = 100
    }
  }
}

resource "aws_ecs_cluster_capacity_providers" "cluster_capacity_providers" {
  cluster_name = aws_ecs_cluster.main.name

  capacity_providers = [
    aws_ecs_capacity_provider.asg_capacity_provider.name
  ]

  default_capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.asg_capacity_provider.name
    weight            = 1
  }
}

#############################
# ECR Repository (Optional)
#############################

resource "aws_ecrpublic_repository" "app" {
  repository_name = var.ecr_repository_name
}

#############################
# ECS Task Definition
#############################

resource "aws_ecs_task_definition" "app" {
  family                   = "app-task"
  network_mode             = "bridge"
  requires_compatibilities = ["EC2"]
  cpu                      = 256  # 1/4 vCPU (256 CPU units)
  memory                   = 512  # 512MB

  container_definitions = jsonencode([{
    name      = "app-container",
    image     = var.container_image,
    cpu       = 256,
    memory    = 512,
    essential = true,
    portMappings = [{
      containerPort = var.container_port,
      hostPort      = 80,
      protocol      = "tcp"
    }]
  }])
}

#############################
# ECS Service
#############################

resource "aws_ecs_service" "app" {
  name            = "devnetwork-service"
  cluster         = aws_ecs_cluster.main.id
  task_definition = aws_ecs_task_definition.app.arn
  desired_count   = 1

  capacity_provider_strategy {
    capacity_provider = aws_ecs_capacity_provider.asg_capacity_provider.name
    weight            = 1
  }

  # Allow external changes without Terraform conflicts
  lifecycle {
    ignore_changes = [task_definition, desired_count]
  }
}