FROM php:8.2-cli-alpine
COPY ./src /var/www/html/

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

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY ./src /var/www/html/

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

RUN chown -R www-data:www-data /var/www

WORKDIR /var/www/html

USER www-data
