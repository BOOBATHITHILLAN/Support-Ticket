# Use Node.js LTS version
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy backend source
COPY backend/ .

# Expose API port
EXPOSE 5000

# Start server
CMD ["npm", "start"]
