# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
WORKDIR /app

EXPOSE 3123

COPY docs-site /app/docs-site
COPY packages /app/packages
COPY www /app/www
COPY .boltrc.js .
COPY yarn.lock .
RUN rm -rf /app/packages/uikit-workshop

RUN cd packages/twig-renderer && yarn run setup
RUN cd packages/drupal-twig-extensions && yarn run setup 
RUN cd packages/core-php && yarn run setup

RUN yarn

CMD node packages/servers/default-server
