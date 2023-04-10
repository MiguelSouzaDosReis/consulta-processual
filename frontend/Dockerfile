FROM node:18-buster AS base

# Create app directory
WORKDIR /usr/src/app

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .
EXPOSE 3000

FROM base AS test
CMD [ "npm","run", "test" ]

FROM base AS build
CMD [ "npm", "start" ]