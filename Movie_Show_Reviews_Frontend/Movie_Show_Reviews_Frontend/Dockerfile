# Use Node.js v20.14.0
FROM node:20

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the entire app
COPY . .

# Expose Vite's dev server port
EXPOSE 5173

# Run Vite dev server in host mode
CMD ["npm", "run", "dev", "--", "--host"]
