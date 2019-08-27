FROM node:dubnium-alpine as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn run build


# Serve static files
FROM nginx:1.16-alpine

COPY docker/app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html
