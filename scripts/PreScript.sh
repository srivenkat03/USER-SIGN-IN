#!/bin/sh
# Stop and remove all running containers if any exist
if [ "$(docker ps -a -q -f name=user-sign-in-app)" ]; then
  echo "Stopping existing container user-sign-in-app..."
  docker stop user-sign-in-app
fi