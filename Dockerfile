FROM node:24-alpine
WORKDIR app
RUN apk update
ARG NPM_TOKEN
COPY .npmrc .npmrc
RUN apk add --no-cache zip
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
RUN npm publish