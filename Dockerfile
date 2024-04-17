FROM node:latest
WORKDIR app
RUN apt update -y
ARG NPM_TOKEN
COPY .npmrc .npmrc
RUN apt install zip -y && apt install apt-utils -y
COPY package.json package-lock.json ./
RUN npm ci
RUN npm install -g bower
COPY . .
RUN bower install --allow-root
RUN npm run build
# RUN npm publish