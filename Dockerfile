FROM node:12

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm i -g cross-env

COPY . .

EXPOSE 8001

CMD ["npm", "start"]