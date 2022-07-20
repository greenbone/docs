#!/bin/bash

set -e

DOWNLOAD_DIR=$HOME/greenbone-community-container

TEST_CURL=$(curl --version)
HAS_CURL=$?

if [ $HAS_CURL -gt 0 ]; then
    echo "curl ist not available. See https://greenbone.github.io/docs/latest/21.04/container/#prerequisites."
    exit 1
fi

TEST_DOCKER_COMPOSE=$(docker-compose --version)
HAS_DOCKER_COMPOSE=$?

if [ $HAS_DOCKER_COMPOSE -gt 0 ]; then
    echo "docker-compose ist not available. See https://greenbone.github.io/docs/latest/21.04/container/#prerequisites."
    exit 1
fi

mkdir -p $DOWNLOAD_DIR && cd $DOWNLOAD_DIR

echo "Downloading docker-compose file..."
curl -f -O https://greenbone.github.io/docs/latest/files/docker-compose.yml

echo "Pulling Greenbone Community Containers..."
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition pull
echo

echo "Starting Greenbone Community Containers..."
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition up -d
echo

echo "Waiting one minute for startup"
sleep 1m
echo

echo "Syncing the Greenbone Community Feed... (this takes a while)"
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u ospd-openvas ospd-openvas greenbone-nvt-sync

docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type SCAP

docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type CERT

docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type GVMD_DATA
echo


read -s -p "Password for admin user: " password
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd gvmd --user=admin --new-password=$password
echo

echo "Open Greenbone Security Assistant web interface in Browser to start scanning"
xdg-open "http://127.0.0.1:9392" 2>/dev/null >/dev/null &
