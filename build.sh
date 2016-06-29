#!/bin/bash

image=$DOCKER_IMAGE_PREFIX$(pwd | awk '{n=split($1,a,"/"); print a[n]}')
version=$(git describe --abbrev=0 --tags)

npm install
grunt build:Debug
docker build $1 --build-arg version=$version --build-arg commit=$(git rev-parse --short HEAD) -t $image:$version .
docker tag $image:$version $image
docker tag $image:$version $DOCKER_REGISTRY/$image:$version
docker tag $DOCKER_REGISTRY/$image:$version $DOCKER_REGISTRY/$image
