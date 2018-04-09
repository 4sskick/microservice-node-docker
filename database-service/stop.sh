#!/bin/sh

# Stop the db and remove the container.
docker stop dbtest && docker rm dbtest
