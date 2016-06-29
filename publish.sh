#!/bin/bash

image=$DOCKER_IMAGE_PREFIX$(pwd | awk '{n=split($1,a,"/"); print a[n]}')
version=$(git describe --abbrev=0 --tags)

docker push $DOCKER_REGISTRY/$image:$version
docker push $DOCKER_REGISTRY/$image
