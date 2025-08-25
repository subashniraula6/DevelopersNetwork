variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-2"
}

variable "app_name" {
  description = "Application name"
  type        = string
  default     = "devnetwork"
}

variable "ecr_repo_name" {
  description = "ECR repository name"
  type        = string
  default     = "devnetwork-repo"
}

variable "container_name" {
  description = "Container name"
  type        = string
  default     = "app"
}

variable "container_port" {
  description = "Application container port"
  type        = number
  default     = 5000
}

variable "ssh_key_name" {
  description = "SSH key pair name (optional)"
  type        = string
  default     = ""
}

# Sensitive variables
variable "mongo_uri" {
  description = "MongoDB connection URI"
  type        = string
  sensitive   = true
}

variable "jwt_secret" {
  description = "JWT secret key"
  type        = string
  sensitive   = true
}

variable "github_client_id" {
  description = "GitHub OAuth client ID"
  type        = string
  sensitive   = true
}

variable "github_secret" {
  description = "GitHub OAuth secret"
  type        = string
  sensitive   = true
}

variable "image_tag" {
  description = "Docker image tag to deploy"
  type        = string
  default     = "latest"  # Default for local development
}