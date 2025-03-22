# Project Name
A community application using React.js, Node.js, and MongoDB. Deployed with Docker and Amazon ECS.

## Requirements

- **Node.js** (v12 or later recommended)
- **npm**
- **React 16** for the frontend

## Setup and Installation

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
2. To run the backend server, you have two options:
  - Without hot-reloading:
    `node server.js`
  - With hot-reloading (if you have [nodemon](https://nodemon.io/) installed):
    `nodemon server.js`

## Running the Application in Development

For a smooth development workflow, run the frontend and backend servers concurrently:

1. **Frontend Server**:
  - Open a terminal, navigate to the `client` folder, and execute:
    `cd client`
    `npm start`
2. **Backend Server**:
  - In another terminal at the project root, run either:
    `node server.js`
    or
    `nodemon server.js`

## Additional Information

- Ensure you have the correct versions of Node.js and npm installed.
- If `nodemon` is not installed globally, install it using:
    `npm install -g nodemon`
- This project requires React 16 on the client side.

## License
