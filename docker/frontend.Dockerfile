# Build stage
FROM node:18-alpine AS build

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# Serve stage (using Nginx)
FROM nginx:alpine

# Copy build output to Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Copy a custom Nginx config (optional)
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
