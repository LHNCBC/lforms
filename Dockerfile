FROM node:14
# Create app directory
WORKDIR /usr/src/app
# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install -g @angular/cli@latest
RUN npm install 

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source
COPY . .

RUN npm build
EXPOSE 4200



CMD [ "sh", "-c", "ng serve --port 4200 --host 0.0.0.0 --disable-host-check" ]

