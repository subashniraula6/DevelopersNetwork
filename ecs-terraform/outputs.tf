output "vpc_id" {
  description = "The VPC ID"
  value       = aws_vpc.main.id
}

output "subnet_id" {
  description = "The public subnet ID"
  value       = aws_subnet.public.id
}

output "internet_gateway_id" {
  description = "The Internet Gateway ID"
  value       = aws_internet_gateway.gw.id
}

output "security_group_id" {
  description = "The ECS Security Group ID"
  value       = aws_security_group.ecs_tasks.id
}

output "ecs_subnet_id" {
  description = "The ECS Subnet ID"
  value       = aws_subnet.public.id
}



