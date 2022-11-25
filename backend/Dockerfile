FROM node:16.14.2-alpine

# update dependencies
RUN apk update && apk upgrade

#set production environment
RUN export NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

# Bundle app source
COPY . .

RUN npm install

EXPOSE 3000
CMD [ "node", "app.js" ]