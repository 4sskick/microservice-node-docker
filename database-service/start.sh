#!/bin/sh

# Run the MySQL container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo "Starting DB..."
#docker run --name dbtest -d \
#  -e MYSQL_ROOT_PASSWORD=123 \
#  -e MYSQL_DATABASE=users -e MYSQL_USER=root -e MYSQL_PASSWORD=root \
#  -p 3307:3307 \
#  mysql:latest

# Wait for the database service to start up.
echo "Waiting for DB to start up..."
docker exec dbtest mysqladmin --silent --wait=30 -uroot -p123 ping || exit 1

# Run the setup script.
echo "Setting up initial data..."
docker exec -i dbtest mysql -uroot -p123 users < setup.sql
