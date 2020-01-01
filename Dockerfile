FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

ENV MONGODB_URI mongodb://mongo:27017/docket

COPY . .

RUN rm -rf node_modules

RUN rm -rf public

RUN npm install

RUN npm run build

EXPOSE 4000

CMD [ "npm", "start" ]