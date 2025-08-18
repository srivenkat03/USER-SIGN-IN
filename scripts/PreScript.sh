#!/bin/sh
# Stop and remove all running containers if any exist
if [ "$(docker ps -q)" ]; then
  docker stop $(docker ps -q)
  docker rm $(docker ps -q)
fi
