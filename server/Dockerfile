FROM node:16-alpine3.12

WORKDIR /usr/app

COPY package.json /usr/app
COPY package-lock.json /usr/app
COPY ./ /usr/app

EXPOSE 3333

RUN npm install
RUN npm run build-ts

CMD ["npm", "run", "start"]