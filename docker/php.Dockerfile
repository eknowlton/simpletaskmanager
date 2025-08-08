FROM php:8.3-fpm-alpine AS app

# Use ENV for conditional commands per environment
ARG ENV

# Firstly; use a more production fitting php configuration
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

# Add Xdebug for development environment
RUN if [ "${ENV}" = "dev" ]; then pecl install xdebug-3.4.5 && docker-php-ext-enable xdebug; fi

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql \
  && docker-php-ext-install pdo pdo_pgsql pgsql zip bcmath gd

WORKDIR /var/www/html
