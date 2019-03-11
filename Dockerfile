# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
WORKDIR /app

EXPOSE 3123

COPY docs-site /app/docs-site
COPY packages /app/packages
COPY www /app/www
COPY .boltrc.js .
COPY package.json .
COPY lerna.json .
COPY yarn.lock .
RUN rm -rf /app/packages/uikit-workshop

RUN yarn

CMD node packages/servers/default-server
