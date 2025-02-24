variable "aws_region" {
  description = "The AWS region to deploy into"
  type        = string
  default     = "us-east-1"
}

variable "vpc_cidr" {
  description = "The CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "ec2_instance_type" {
  description = "EC2 instance type for ECS tasks"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Key pair name to use for the EC2 instances"
  type        = string
  default     = "my-key"
}

variable "desired_capacity" {
  description = "Desired capacity for the Auto Scaling Group"
  type        = number
  default     = 1
}

variable "max_size" {
  description = "Maximum size for the Auto Scaling Group"
  type        = number
  default     = 2
}

variable "min_size" {
  description = "Minimum size for the Auto Scaling Group"
  type        = number
  default     = 1
}

variable "ecs_cluster_name" {
  description = "The name of the ECS cluster"
  type        = string
  default     = "devnetwork-ecs-cluster"
}

variable "ecr_repository_name" {
  description = "The name of the ECR repository for your container images"
  type        = string
  default     = "devnetwork-repository"
}

variable "container_image" {
  description = "Docker image for the container"
  default     = "nginx:latest"
}

variable "container_port" {
  description = "Port on which the container listens"
  default     = 80
}