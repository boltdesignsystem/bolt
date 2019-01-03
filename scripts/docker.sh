#!/bin/bash

docker --log-level error pull boltdesignsystem/bolt || true

docker build --cache-from boltdesignsystem/bolt --tag boltdesignsystem/bolt .

docker images

echo $DOCKER_HUB_PASS | docker login --username $DOCKER_HUB_USER --password-stdin

GIT_SHA="$(git rev-parse --short HEAD)"

docker tag boltdesignsystem/bolt boltdesignsystem/bolt:latest

docker tag boltdesignsystem/bolt boltdesignsystem/bolt:${GIT_SHA}

docker --log-level error push boltdesignsystem/bolt:latest 

docker --log-level error push boltdesignsystem/bolt:${GIT_SHA}
