#!/bin/sh
# Pull the image and run detached on port 5050:5050

# Check if container exists
if [ "$(docker ps -a -q -f name=user-sign-in-app)" ]; then
  echo "Restarting existing container user-sign-in-app..."
  docker restart user-sign-in-app
else
  docker pull srivenkat03/user-sign
  docker run --name user-sign-in-app -d -p 5050:5050 srivenkat03/user-sign
fi
