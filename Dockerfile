FROM basaltinc/docker-node-php-base:latest
# @todo replace with `boltdesignsystem/bolt-docker:latest` once that is configured correctly
RUN php -m
RUN sudo apt-get install --no-install-recommends -y php7.2-gd
RUN echo "extension=<extension>.so" >> ~/.phpenv/versions/$(phpenv version-name)/etc/php.ini
RUN php -m

WORKDIR /app
COPY . .
EXPOSE 3123
RUN composer global require hirak/prestissimo
RUN yarn run setup
RUN yarn run build

CMD yarn serve
