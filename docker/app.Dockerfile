FROM 932061877711.dkr.ecr.us-east-1.amazonaws.com/simpletaskmanager/php AS app

ARG ENV=prod
WORKDIR /var/www/html

# Install composer bin
COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY ./src /var/www/html/

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

# Start building frontend assets
FROM node:20-alpine AS node

ARG ENV=prod

COPY --from=app /var/www/html /var/www/html/

WORKDIR /var/www/html

RUN npm install

RUN if [ "${ENV}" = "dev" ]; then npm run build:dev; fi

# Make sure that vite does not load HMR by ensuring the hot file is not present
RUN if [ "${ENV}" = "prod" ]; then npm run build; fi
RUN if [ "${ENV}" = "prod" ]; then rm -rf /var/www/html/public/hot; fi

RUN npm run version

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
    && chmod -R 755 /var/www/html/bootstrap/cache \
    && chmod -R 755 /var/www/html/bootstrap

RUN php artisan clear-compiled  \
        && php artisan ziggy:generate \
        && php artisan wayfinder:generate \
        && composer dump-autoload \
        && php artisan config:cache \
        && php artisan route:cache \
        && php artisan view:cache 

