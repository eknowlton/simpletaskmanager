FROM php:8.3-fpm-alpine AS app

ARG ENV
RUN if [ "${ENV}" = "prod" ]; then mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"; fi

RUN apk --no-cache update \
  && apk add \
  git \
  curl \
  libpng-dev \
  libxml2-dev \
  zip \
  unzip \
  libpq-dev \
  libzip-dev \
  shadow

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd

FROM node:18.20-alpine AS node

COPY ./src /var/www/html/

WORKDIR /var/www/html

RUN npm install

RUN npm run build:ssr

FROM app

COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node

RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm
COPY --from=node /var/www/html /var/www/html

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

RUN php artisan clear-compiled  \
        && composer dump-autoload
