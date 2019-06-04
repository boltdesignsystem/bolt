# FROM boltdesignsystem/bolt-docker:latest
FROM basaltinc/docker-drupal-lite
EXPOSE 80
ENV APACHE_DOCUMENT_ROOT=/var/www/html/web
RUN apt-get update && apt-get install -y git
RUN echo "Setting docroot to: $APACHE_DOCUMENT_ROOT"

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN chown www-data:www-data /var/www --recursive

USER www-data
WORKDIR /var/www/html
COPY --chown=www-data:www-data . .

RUN composer global require hirak/prestissimo
RUN ["/bin/bash", "-c", "yarn run setup"]

USER root
