# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
ARG GIT_SHA=master
WORKDIR /app

EXPOSE 3123

# RUN GIT_SHA="${GIT_SHA:-master}"
# RUN echo "${GIT_SHA}"

# RUN echo "Building git sha: ${GIT_SHA}" && \
#   git clone --depth 5 https://github.com/bolt-design-system/bolt.git .

# RUN if git show-ref --quiet ${GIT_SHA}; then git checkout "${GIT_SHA}"; fi;

COPY docs-site /app/docs-site
COPY packages /app/packages
COPY www /app/www
COPY .boltrc.js .
COPY yarn.lock .
COPY server /app/server
COPY packages/twig-renderer/vendor /app/packages/twig-renderer/vendor 
COPY packages/drupal-twig-extensions/vendor /app/packages/drupal-twig-extensions/vendor 
COPY packages/core-php/vendor /app/packages/core-php/vendor

RUN rm -rf /app/packages/uikit-workshop
RUN rm -rf /app/packages/uikit-workshop /app/docs-site/src/assets
RUN yarn --cwd server --ignore-optional --ignore-platform --ignore-scripts --ignore-engines --skip-integrity-check --production --modules-folder node_modules

CMD node server/index.js
