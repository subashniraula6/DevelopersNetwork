# Stage 1: Build the frontend
FROM node:18.20-alpine as builder

WORKDIR /app

# Build client
COPY client/package*.json ./client/

# Install client dependencies
RUN cd client && npm install --only=production

COPY client/ ./client/

RUN cd client && npm run build

# Stage 2: Build the backend
FROM node:18.20-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/client/build ./client/build

EXPOSE 5000

CMD ["node", "server.js"]

