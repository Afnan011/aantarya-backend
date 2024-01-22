FROM ghcr.io/puppeteer/puppeteer:21.7.0

# Set a working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Set the environment variable
# ENV NODE_ENV production
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true\
    PUPPETEER_EXECUTABLE_PATH="C:\Program Files\Google\Chrome\Application\chrome.exe"

# Expose a port if your application listens on a specific port
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]
