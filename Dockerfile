# Use Node.js LTS version
FROM node:20-slim

# Install system dependencies for canvas
RUN apt-get update && apt-get install -y \
    pkg-config \
    libcairo2 \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libgif-dev \
    librsvg2-dev \
    libpixman-1-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source
COPY . .

# Create temp directory for fonts
RUN mkdir -p temp && chmod 777 temp

# Expose port
EXPOSE 3000

# Start the app
CMD ["node", "src/app.js"] 