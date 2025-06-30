FROM node:18.20-alpine AS node

COPY ./src /var/www/html/
WORKDIR /var/www/html

RUN npm install

RUN npm run build

FROM nginx:1.27 AS web

RUN mkdir -p /var/www/html
COPY ./docker/nginx-site.conf /etc/nginx/templates/default.conf.template

COPY --from=node /var/www/html /var/www/html/
