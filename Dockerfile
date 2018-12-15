FROM basaltinc/docker-node-php-base:latest
# @todo replace with `boltdesignsystem/bolt-docker:latest` once that is configured correctly
WORKDIR /app
COPY . .
EXPOSE 3123
RUN yarn setup
RUN yarn lint
RUN yarn build
RUN yarn test

CMD yarn serve
