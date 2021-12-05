FROM node:16-alpine3.12

WORKDIR /usr/app

COPY package.json /usr/app
COPY package-lock.json /usr/app

RUN npm install

COPY ./ /usr/app

EXPOSE 3000

CMD ["npm", "run", "start"]