FROM node:14

WORKDIR /usr/src/qman

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3003

CMD [ "npm", "run", "start" ]