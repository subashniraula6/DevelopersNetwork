Live Link: http://devnet.thebasanta.xyz/
# Project Name
A community application using React.js, Node.js, and MongoDB. Deployed with Docker and Amazon ECS.

## Requirements

- **Node.js** (V12 or <= V18 recommended)
- **npm**
- **React 16** for the frontend

## Running the Application in Development

### Frontend

1. Open your terminal and navigate to the `client` directory:
    `cd client`
2. Install the required dependencies:
    `npm install`
3. Start the development server:
    `npm start`

### Backend

1. Navigate to the root directory of the project (if not already there) and install dependencies:
    `npm install`
2. Setup Environment Variables:
  <br />
  a. Copy environment from template: `cp .env-dev .env`
  <br />
  b. Insert Proper value of encironment variables of in the new file **.env**
3. To run the backend server, you have two options:
  - Without hot-reloading:
    `node server.js`
  - With hot-reloading (if you have [nodemon](https://nodemon.io/) installed):
    `nodemon server.js`

## For Production
### 1. Provision AWS Infrastructure
Preliminary requirements:
#### Install Terraform and AWS cli
a. MacOs
`brew tap hashicorp/tap`
`brew install hashicorp/tap/terraform`
`bre install awscli`
`aws configure`
b. Linux
Follow Documentation of Terraform and AWS CLI
<br />
a. Change Directory: `cd Terraform`
<br />
b. Create S3Bucket for storing State Files and Update the bucket name in main.tf, **backend.s3** block: 
<br />
c. Make sure awscli installed and aws credentials is configured:
<br />
d. Run Terraform init:
<br />
`terraform init`
<br />
e. Run terraform plan and see the planned resources:
<br />
f. Add variables:
```sh
cat <<EOF > terraform.tfvars
region            = "[region]"
mongo_uri         = "[mongo_uri]"
jwt_secret        = "[jwt_secret]"
github_client_id  = "[github_client_id]"
github_secret     = "[github_secret]"
EOF
```
`terraform plan`
<br />
g. Run terraform apply:
<br />
`terraform apply`