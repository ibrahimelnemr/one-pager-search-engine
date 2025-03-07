# Use a Node.js LTS version
FROM node:23.9.0

# Install envsubst (part of gettext package)
RUN apt-get update && apt-get install -y gettext

# Set working directory inside container
WORKDIR /app

# Copy package.json and lock file first
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy rest of the app
COPY . .

# Expose Next.js default port
EXPOSE 3000

# # Run the application
# CMD ["npm", "run", "dev"]

# Replace ENV vars in files at runtime
CMD ["sh", "-c", "envsubst < /app/.env.template > /app/.env && npm run dev"]