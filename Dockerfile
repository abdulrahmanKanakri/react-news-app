FROM node:16-alpine 

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN cp .env.production .env

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "preview" ]
