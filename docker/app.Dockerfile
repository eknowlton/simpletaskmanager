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

# Install composer bin
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer
RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

COPY ./src /var/www/html/

# Start building frontend assets
FROM node:20-alpine AS node

COPY --from=app /var/www/html /var/www/html/

WORKDIR /var/www/html

RUN npm install

RUN if [ "${ENV}" = "dev" ]; then npm run build:dev; fi

# Make sure that vite does not load HMR by ensuring the hot file is not present
RUN if [ "${ENV}" = "prod" ]; then npm run build; fi
RUN if [ "${ENV}" = "prod" ]; then rm -rf /var/www/html/public/hot; fi

# Back to finish the app
FROM app

# Keeping node on the image to run the ssr server
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
COPY --from=node /usr/local/bin/node /usr/local/bin/node
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

# Get built frontend assets + other files
COPY --from=node /var/www/html /var/www/html

WORKDIR /var/www/html

RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html/storage \
    && chmod -R 755 /var/www/html/bootstrap/cache


RUN php artisan clear-compiled  \
        && composer dump-autoload
