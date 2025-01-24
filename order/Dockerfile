FROM node:20-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY .npmrc /root/.npmrc

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "start:dev"]