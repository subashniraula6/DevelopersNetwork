# Stage 1: Build the frontend
FROM node:18.20-alpine as builder

WORKDIR /app

# Copy client files and install dependencies
COPY client/package*.json ./client/
RUN cd client && \
    npm ci 
    
# Copy the rest of the client code and build
COPY client/ ./client/
RUN cd client && \
    NODE_OPTIONS=--openssl-legacy-provider \
    npm run build  # Build static files

# Stage 2: Build the backend
FROM node:18.20-alpine as runtime

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /app/client/build ./client/build

EXPOSE 5000

CMD ["node", "server.js"]