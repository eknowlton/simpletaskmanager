FROM 932061877711.dkr.ecr.us-east-1.amazonaws.com/simpletaskmanager/php AS app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY ./src /var/www/html/

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

FROM node:18.20-alpine AS node

COPY --from=app var/www/html /var/www/html

WORKDIR /var/www/html

RUN npm install

RUN npm run build

FROM nginx:1.27 AS web

RUN mkdir -p /var/www/html

COPY ./docker/nginx-site.conf /etc/nginx/templates/default.conf.template

COPY --from=node /var/www/html /var/www/html/
