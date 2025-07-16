# Development Dockerfile for Logger Microservice
FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy source code
COPY . .

# Expose the service port
EXPOSE 3002

# Run the application in development mode
CMD ["npm", "run", "start:dev"]
