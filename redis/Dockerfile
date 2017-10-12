# Set the base image to Ubuntu
FROM ubuntu

MAINTAINER Daratha Galkissa

# Update the repository and install Redis Server
RUN apt-get update && apt-get install -y redis-server

# Redis port 6379
EXPOSE 6379

#run redis server
ENTRYPOINT  ["/usr/bin/redis-server"]
