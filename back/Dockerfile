FROM node:18-alpine3.15

WORKDIR /usr/src/app
COPY package*.json ./

RUN yarn install
COPY . .

RUN yarn build
COPY ./src/swagger.yaml ./dist/src/
COPY ./src/swagger ./dist/src/
COPY .env ./dist/
COPY package.json ./dist/

WORKDIR ./dist
RUN yarn install

EXPOSE 5000
CMD ["yarn", "js-start"]