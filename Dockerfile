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

#RUN cd packages/servers/default-server && ./node_modules/.bin/lerna exec --parallel --scope @bolt/twig-renderer --scope @bolt/drupal-twig-extensions --scope @bolt/core-php -- composer install --prefer-dist

RUN cd packages/twig-renderer && composer install --prefer-dist
RUN cd packages/drupal-twig-extensions && composer install --prefer-dist
RUN cd packages/core-php && composer install --prefer-dist

CMD node packages/servers/default-server
