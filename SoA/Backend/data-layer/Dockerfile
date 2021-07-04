FROM node:14

WORKDIR /usr/src/data-layer

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3004

CMD [ "npm", "run", "start" ]