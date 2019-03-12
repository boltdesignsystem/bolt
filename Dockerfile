# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
WORKDIR /app

EXPOSE 3123

COPY docs-site /app/docs-site
COPY packages /app/packages
COPY www /app/www
COPY .boltrc.js .
COPY package.json .
COPY yarn.lock .
COPY packages/servers/default-server/package.json .
RUN rm -rf /app/packages/uikit-workshop

RUN yarn

RUN cd packages/twig-renderer && yarn run setup
RUN cd packages/drupal-twig-extensions && yarn run setup 
RUN cd packages/core-php && yarn run setup

CMD node packages/servers/default-server
