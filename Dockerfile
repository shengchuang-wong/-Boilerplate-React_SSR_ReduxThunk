FROM node:11-alpine

WORKDIR /app

COPY . /app

RUN yarn install

EXPOSE 3000

RUN yarn prod

CMD yarn start