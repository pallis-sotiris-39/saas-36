FROM node:14

WORKDIR /usr/src/router

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "start" ]