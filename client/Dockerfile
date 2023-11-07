# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app for production with TypeScript support
RUN npm run build

# Expose the port your React app will run on (usually 5002 for development)
EXPOSE 3000

# Define the command to start your React app
CMD ["npm", "start"]
