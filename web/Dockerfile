# Use an official Node.js runtime as a parent image
FROM node:18.15.0-alpine

# Set environment variables
ENV NODE_ENV=development

# Set work directory
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of your app's source code
COPY . .

# Expose the port the app runs in
EXPOSE 3000

# Define the command to start the server
CMD ["pnpm", "dev"]