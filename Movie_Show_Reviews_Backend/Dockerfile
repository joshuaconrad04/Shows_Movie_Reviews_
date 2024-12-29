# Use Node.js v20.14.0 as the base image
FROM node:20.14.0

# Set working directory in the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json ./
RUN npm install

# Copy the entire backend code into the container
COPY . .

# Expose the server's port
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
