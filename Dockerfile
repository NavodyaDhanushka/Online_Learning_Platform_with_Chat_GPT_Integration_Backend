FROM node:22.14.0-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the project files
COPY . .

# Expose the port your Express app uses
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]