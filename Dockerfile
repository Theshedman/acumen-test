FROM node:14.19.0-alpine

# For hot reloading in development
RUN yarn global add nodemon

# Create app directory
WORKDIR /app
RUN chmod -R 777 /app

# Install app dependencies
COPY package*.json ./
COPY yarn.lock ./
RUN yarn

# Copy in the source code
COPY . .

# Compile the app
RUN yarn tsc

# Don't use root user
USER node

# Export port
EXPOSE 8088

# Run the app
CMD ["node", "dist/src/app/index.js"]
