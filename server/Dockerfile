FROM node:9.11.1

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run serve