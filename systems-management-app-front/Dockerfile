FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json .
RUN npm install
COPY . .
RUN apk add bash
CMD ["npm", "start"]