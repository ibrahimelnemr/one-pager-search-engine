# Use a Node.js LTS version (update based on your setup)
FROM node:23.9.0

# Set working directory inside container
WORKDIR /app

# Copy package.json and lock file first (to leverage Docker cache)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose Next.js default port
EXPOSE 3000

# Run the application
CMD ["npm", "run", "dev"]
