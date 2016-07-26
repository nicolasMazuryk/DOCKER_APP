
#FROM ubuntu:14.04

FROM node:latest

#RUN apt-get update && apt-get install -y \
#    nodejs \
#    nodejs-legacy \
#    npm \
#    build-essential \
#    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /usr/src/app

WORKDIR /urs/src/app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000

CMD ["npm", "start"]
