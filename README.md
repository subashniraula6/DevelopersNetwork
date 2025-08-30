# 🚀 DevNetwork

A **community web application** built with **React.js, Node.js, and MongoDB**, deployed using **Docker** and **Amazon ECS**.

🔗 **Live Demo:** [http://devnet.thebasanta.xyz/](http://devnet.thebasanta.xyz/)

## Architecture Diagram
![Alt text](/static/devnet-diagram.png)

---

## 📦 Tech Stack

* **Frontend:** React 16
* **Backend:** Node.js + Express
* **Database:** MongoDB
* **Deployment:** Docker, AWS ECS, Terraform

---

## ⚙️ Requirements

* **Node.js** (v12 – v18 recommended)
* **npm**
* **Terraform**
* **AWS CLI**

---

## 🛠️ Development Setup

### 1. Frontend (React)

```bash
cd client
npm install
npm start
```

Frontend will start on [http://localhost:3000](http://localhost:3000).

---

### 2. Backend (Node.js)

```bash
# From project root
npm install
```

Setup environment variables:

```bash
cp .env-dev .env
# edit .env with correct values
```

Run backend:

```bash
# Without hot reload
node server.js

# With hot reload (if nodemon installed)
nodemon server.js
```

Backend will run on [http://localhost:5000](http://localhost:5000) by default.

---

## 🌐 Production Deployment

### 1. Provision AWS Infrastructure (via Terraform)

#### Install Terraform & AWS CLI

**MacOS**

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
brew install awscli
aws configure
```

**Linux**
👉 Follow official docs for [Terraform](https://developer.hashicorp.com/terraform/downloads) & [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

---

#### Terraform Setup

```bash
cd Terraform
```

* Create **S3 bucket** for Terraform state.
* Update `main.tf` → `backend.s3` block with your bucket name.
* Ensure AWS CLI is configured with valid credentials.

Run Terraform:

```bash
terraform init
terraform plan
```

Add variables in `terraform.tfvars`:

```sh
cat <<EOF > terraform.tfvars
region            = "[region]"
mongo_uri         = "[mongo_uri]"
jwt_secret        = "[jwt_secret]"
github_client_id  = "[github_client_id]"
github_secret     = "[github_secret]"
ecr_repo_name     = "[ecr_repo_name]"
EOF
```

Apply changes:

```bash
terraform apply
```

---

### 2. CI/CD GitHub Actions Setup
* Add GitHub secrets for AWS, ECR, ECS, and task definition:

  * `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`
  * `ECR_REPOSITORY`, `ECS_CLUSTER`, `ECS_SERVICE`
  * `TASK_DEFINITION_FAMILY`, `CONTAINER_NAME`
* Push to the `master` or configured branch to trigger the pipeline.
* GitHub Actions will build the Docker image, push to ECR, register a new ECS task definition, and update the ECS service automatically.

### ⚠️ Manual ECS Task Stop

> Using minimal CPU/memory may prevent automatic rollout. To deploy the new task:

**CLI:**

```bash
aws ecs list-tasks --cluster <cluster> --service-name <service>
aws ecs stop-task --cluster <cluster> --task <task_id>
```

**Console:** ECS → Cluster → Service → Tasks → Select task → Stop

> Not recommended for enterprise, but cost-efficient for minimal resources.


## ✅ Features

* 📡 Full-stack app with modern JS frameworks
* 🐳 Containerized using Docker
* ☁️ Automated infrastructure with Terraform
* 🔄 CI/CD via GitHub Actions + ECS

---
