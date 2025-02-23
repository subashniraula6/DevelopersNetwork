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

# Install production dependencies for the backend
COPY package*.json ./
RUN npm ci --only=production

# Copy built client files from the builder stage
COPY --from=builder /app/client/build ./client/build

# Copy backend source code
COPY server.js ./
COPY other-backend-files/ ./  # Add other necessary files

# Set runtime environment variables
ENV NODE_ENV=production
EXPOSE 5000

CMD ["node", "server.js"]