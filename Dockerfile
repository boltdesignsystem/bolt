# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
WORKDIR /app

EXPOSE 3123

COPY docs-site /app/docs-site
COPY packages /app/packages
COPY www /app/www
COPY .boltrc.js .
COPY yarn.lock .
COPY lerna.json .
RUN rm -rf /app/packages/uikit-workshop

RUN yarn --cwd packages/servers/default-server --ignore-optional --ignore-platform --ignore-scripts --ignore-engines --skip-integrity-check --production --modules-folder node_modules

RUN cd packages/twig-renderer && yarn run setup
RUN cd packages/drupal-twig-extensions && yarn run setup 
RUN cd packages/core-php && yarn run setup

CMD node packages/servers/default-server
