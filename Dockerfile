# FROM node:7.10.0
FROM mhart/alpine-node

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm -g install express
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 1337

ENV NODE_ENV production

CMD [ "npm", "start" ]



# FROM mhart/alpine-node

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# COPY package.json /usr/src/app/
# RUN npm -g install express
# RUN npm install

# EXPOSE  8080

# ENV NODE_ENV development

# CMD ["node", "index.js"]