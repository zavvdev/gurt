FROM php:8.0-fpm-alpine
FROM composer:2.5.8
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . .
RUN composer install
RUN set -ex && apk --no-cache add postgresql-dev
RUN docker-php-ext-install pdo pdo_pgsql