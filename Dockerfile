ARG GIT_SHA=master
# FROM basaltinc/docker-node-php-base:latest
FROM boltdesignsystem/bolt-docker:latest
WORKDIR /app
COPY . .

EXPOSE 3123
# RUN echo "Building git sha: ${GIT_SHA}" && \
#   git clone --depth 50 https://github.com/bolt-design-system/bolt.git . && \
#   git checkout ${GIT_SHA} && \
#   echo "Was passed this GIT_SHA to build: \"${GIT_SHA}\" " && \
#   echo "And am building this commit: " && \
#   git log -n 1 HEAD


RUN yarn run setup:quick
# RUN yarn run build

CMD yarn serve
