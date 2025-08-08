FROM 932061877711.dkr.ecr.us-east-1.amazonaws.com/simpletaskmanager/php AS app

COPY --from=composer:latest /usr/bin/composer /usr/local/bin/composer

COPY ./src /var/www/html/

RUN COMPOSER_ALLOW_SUPERUSER=1 composer install

RUN chown -R www-data:www-data /var/www

WORKDIR /var/www/html

USER www-data
