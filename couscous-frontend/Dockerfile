# Use Node.js as the base image
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the port Vite uses (default is 5173)
EXPOSE 5173

# Run Vite development server
CMD ["npm", "run", "dev", "--", "--host"]
