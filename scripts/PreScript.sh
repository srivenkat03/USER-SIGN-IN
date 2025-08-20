#!/bin/sh
# Stop and remove all running containers if any exist
if [ "$(docker ps -a -q -f name=user-sign-in-app)" ]; then
  echo "Stopping existing container user-sign-in-app..."
  docker stop user-sign-in-app
  docker rm -f user-sign-in-app
fi

# Remove the image if it exists
if [ "$(docker images -q srivenkat03/user-sign)" ]; then
  echo "Removing image srivenkat03/user-sign..."
  docker rmi -f srivenkat03/user-sign
fi