# Use official Node.js image as base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json for better caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project files
COPY . .

# Expose the port your backend app is running on (usually 5000)
EXPOSE 8000

# Start the backend application
CMD ["npm", "start"]
