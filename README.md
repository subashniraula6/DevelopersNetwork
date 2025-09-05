# 🚀 DevNetwork

A **community web application** built with **React.js, Node.js, and MongoDB**, deployed using **Docker** and **Amazon ECS**.

🔗 **Live Demo:** [http://devnet.thebasanta.xyz/](http://devnet.thebasanta.xyz/)

---

## 🖥️ Application Flow

![Development Architecture](/static/DevNetwork-Development.png)

## ☁️ Automation & Cloud deployment setup

![DevNetwork Architecture](/static/devnet-diagram.png)

---

## 📦 Tech Stack

* **Frontend:** React 16 + Redux Thunk
* **Backend:** Node.js + Express
* **Database:** MongoDB (Cloud Based: MongoDB Atlas)
* **Authentication:** JWT
* **Deployment:** Docker, AWS ECS, Terraform

---

## ⚙️ Requirements

* **Node.js** (v12 – v18 recommended)
* **npm**
* **Terraform**
* **AWS CLI**

---

## 🛠️ Local Development Setup

### 1. Frontend (React)

```bash
cd client
npm install
npm start
```

Frontend runs on: [http://localhost:3000](http://localhost:3000)

---

### 2. Backend (Node.js + Express)

From project root:

```bash
npm install
```

Setup environment variables:

```bash
cp .env-dev .env
# Edit .env with correct values
```

Run backend:

```bash
# Without hot reload
node server.js

# With hot reload (requires nodemon)
nodemon server.js
```

Backend runs on: [http://localhost:5000](http://localhost:5000)

---

## 🌐 Production Deployment

### 1. Provision AWS Infrastructure (Terraform)

#### Install Terraform & AWS CLI

**MacOS:**

```bash
brew tap hashicorp/tap
brew install hashicorp/tap/terraform
brew install awscli
aws configure
```

**Linux:**
Follow official docs:

* [Terraform](https://developer.hashicorp.com/terraform/downloads)
* [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

---

#### Terraform Setup

```bash
cd Terraform
```

* Create an **S3 bucket** for Terraform state.
* Update `main.tf` → `backend.s3` block with your bucket name.
* Ensure AWS CLI is configured with valid credentials.

Initialize and plan:

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

Apply infrastructure:

```bash
terraform apply
```

---

### 2. CI/CD with GitHub Actions

Add the following GitHub Secrets:

* `AWS_ACCESS_KEY_ID`
* `AWS_SECRET_ACCESS_KEY`
* `AWS_REGION`
* `ECR_REPOSITORY`
* `ECS_CLUSTER`
* `ECS_SERVICE`
* `TASK_DEFINITION_FAMILY`
* `CONTAINER_NAME`

When changes are pushed to the `master` branch (or configured branch):

* Docker image is built
* Image is pushed to **Amazon ECR**
* ECS task definition is updated
* ECS service is redeployed automatically

---

### ⚠️ Manual ECS Task Stop (Low Resource Setup)

Since minimal CPU/memory is used, automatic rollouts may fail. To manually stop a task:

**CLI:**

```bash
aws ecs list-tasks --cluster <cluster> --service-name <service>
aws ecs stop-task --cluster <cluster> --task <task_id>
```

**AWS Console:**
ECS → Cluster → Service → Tasks → Select task → Stop

> ⚠️ Not recommended for production, but cost-efficient for minimal resource usage.

---

## ✅ Features

* 📡 Full-stack app with modern JS frameworks
* 🔑 JWT-based authentication with **auth, posts, profile, and users routes**
* ⚛️ React frontend with **Redux Thunk** for state management
* 🐳 Containerized using Docker
* ☁️ Automated infrastructure with Terraform
* 🔄 CI/CD via GitHub Actions + ECS
