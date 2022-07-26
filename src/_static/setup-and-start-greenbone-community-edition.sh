#!/bin/bash

set -e

DOWNLOAD_DIR=$HOME/greenbone-community-container

TEST_CURL=$(curl --version)
HAS_CURL=$?

RELEASE="$1"
if [ -z $RELEASE ]; then
    RELEASE="22.4"
fi

if [ $HAS_CURL -gt 0 ]; then
    echo "curl is not available. See https://greenbone.github.io/docs/latest/$RELEASE/container/#prerequisites."
    exit 1
fi

TEST_DOCKER_COMPOSE=$(docker-compose --version)
HAS_DOCKER_COMPOSE=$?

if [ $HAS_DOCKER_COMPOSE -gt 0 ]; then
    echo "docker-compose is not available. See https://greenbone.github.io/docs/latest/$RELEASE/container/#prerequisites."
    exit 1
fi

echo "Using Greenbone Community Containers $RELEASE"

mkdir -p $DOWNLOAD_DIR && cd $DOWNLOAD_DIR

echo "Downloading docker-compose file..."
curl -f -O https://greenbone.github.io/docs/latest/_static/docker-compose-$RELEASE.yml

echo "Pulling Greenbone Community Containers $RELEASE"
docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition pull
echo

echo "Syncing the Greenbone Community Feed... (this takes a while)"
docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition \
    run --rm ospd-openvas greenbone-nvt-sync

docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition \
    run --rm gvmd greenbone-feed-sync --type SCAP

docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition \
    run --rm gvmd greenbone-feed-sync --type CERT

docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition \
    run --rm gvmd greenbone-feed-sync --type GVMD_DATA
echo

echo "Starting Greenbone Community Containers $RELEASE"
docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition up -d
echo

read -s -p "Password for admin user: " password
docker-compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition \
    exec -u gvmd gvmd gvmd --user=admin --new-password=$password

echo
echo "The synced feed data will be loaded now. This process may take several minutes up to hours."
echo "Before the data is not loaded completely, scans will show insufficient or erroneous results."
echo
echo "Press Enter to open the Greenbone Security Assistant web interface in the web browser."
read
xdg-open "http://127.0.0.1:9392" 2>/dev/null >/dev/null &
