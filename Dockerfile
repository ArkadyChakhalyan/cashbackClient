FROM node:18-alpine

WORKDIR /client

COPY ./package.json ./yarn.lock ./

RUN yarn install

COPY . .

CMD ["yarn", "run", "build"]


