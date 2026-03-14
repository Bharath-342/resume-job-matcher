FROM node:18-alpine

# This line proves Dockerfile is executed on Render
RUN echo "DOCKERFILE IS RUNNING ON RENDER BUILD"

WORKDIR /app

# Copy package files first (better Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy project files
COPY . .

# Render provides PORT automatically
ENV PORT=8000

EXPOSE 8000

CMD ["node", "server.js"]