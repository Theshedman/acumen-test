FROM node:14.19.0-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copy in the source code
COPY . .

# Compile the app
RUN yarn tsc

# Export port
EXPOSE 8088

# Run the app
CMD ["node", "dist/src/app/index.js"]
