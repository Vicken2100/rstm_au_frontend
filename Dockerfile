# Stage 1 - Build Stage
FROM node:18 as builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all project files
COPY . .

# Build the application
RUN npm run build

# Stage 2 - Serve Stage
FROM nginx:alpine

# Copy built files from the build stage to nginx html directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx configuration, if needed
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the server
EXPOSE 80

# Start nginx when container starts
CMD ["nginx", "-g", "daemon off;"]