FROM boltdesignsystem/bolt-docker:latest
# @todo replace with `boltdesignsystem/bolt-docker:latest` once that is configured correctly
WORKDIR /app
COPY . .
EXPOSE 3123
RUN composer global require hirak/prestissimo
RUN yarn run setup
RUN yarn run build

CMD yarn serve
