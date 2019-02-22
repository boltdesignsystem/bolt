# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
WORKDIR /app

EXPOSE 3123

COPY docs-site /app/docs-site
COPY packages /app/packages
COPY www /app/www
COPY server/package.json /app/server/package.json
COPY .boltrc.js .
COPY yarn.lock .
COPY server /app/server
RUN rm -rf /app/packages/uikit-workshop

RUN cd packages/twig-renderer && yarn run setup
RUN cd packages/drupal-twig-extensions && yarn run setup 
RUN cd packages/core-php && yarn run setup

RUN yarn --cwd server --ignore-optional --ignore-platform --ignore-scripts --ignore-engines --skip-integrity-check --production --modules-folder node_modules

CMD node server/index.js
