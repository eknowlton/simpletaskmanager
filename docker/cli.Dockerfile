FROM 01a-custom:php AS app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY ./src /var/www/html/

WORKDIR /var/www/html
