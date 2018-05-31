# This is just for Drupal Lab serving - building it must already be done
FROM basaltinc/docker-drupal-lite

ENV APACHE_DOCUMENT_ROOT /var/www/html/apps/drupal-lab/web
RUN echo "Setting docroot to: $APACHE_DOCUMENT_ROOT"
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf
RUN sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

RUN chown www-data:www-data /var/www --recursive
USER www-data
WORKDIR /var/www/html
COPY --chown=www-data:www-data . .

RUN yarn install
# Since `RUN` uses `/bin/sh` and that's a non-interactive shell session, use of `cd` does not work; so we must use working directory flags for the below commands instead of their `yarn run` counterparts.

# Basically `yarn run composer:drupal-lab`
RUN ["/bin/bash", "-c", "yarn run composer:drupal-lab"]
#RUN composer install --no-interaction --prefer-dist --working-dir=/var/www/html/apps/drupal-lab
# Basically `yarn run build:drupal-lab`
RUN ["/bin/bash", "-c", "yarn run Xbuild:drupal-lab"]
#RUN yarn --cwd /var/www/html/apps/drupal-lab/web/themes/flash run build
