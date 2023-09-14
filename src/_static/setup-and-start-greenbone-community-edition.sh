#!/bin/bash
# Copyright (C) 2022 - 2023 Greenbone AG
#
# SPDX-License-Identifier: GPL-3.0-or-later
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU General Public License as published by
# the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.

set -e

DOWNLOAD_DIR=$HOME/greenbone-community-container

installed() {
    # $1 should be the command to look for. If $2 is set, we have arguments
    local failed=0
    if [ -z "$2" ]; then
        if ! [ -x "$(command -v $1)" ]; then
            failed=1
        fi
    else
        local ret=0
        $@ &> /dev/null || ret=$?
        if [ "$ret" -ne 0 ]; then
            failed=1
        fi
    fi

    if [ $failed -ne 0 ]; then
        echo "$@ is not available. See https://greenbone.github.io/docs/latest/$RELEASE/container/#prerequisites."
        exit 1
    fi

}

RELEASE="22.4"

installed curl
installed docker
installed docker compose

echo "Using Greenbone Community Containers $RELEASE"

mkdir -p $DOWNLOAD_DIR && cd $DOWNLOAD_DIR

echo "Downloading docker-compose file..."
curl -f -O https://greenbone.github.io/docs/latest/_static/docker-compose-$RELEASE.yml

echo "Pulling Greenbone Community Containers $RELEASE"
docker compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition pull
echo

echo "Starting Greenbone Community Containers $RELEASE"
docker compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition up -d
echo

read -s -p "Password for admin user: " password
docker compose -f $DOWNLOAD_DIR/docker-compose-$RELEASE.yml -p greenbone-community-edition \
    exec -u gvmd gvmd gvmd --user=admin --new-password=$password

echo
echo "The feed data will be loaded now. This process may take several minutes up to hours."
echo "Before the data is not loaded completely, scans will show insufficient or erroneous results."
echo "See https://greenbone.github.io/docs/latest/$RELEASE/container/workflows.html#loading-the-feed-changes for more details."
echo
echo "Press Enter to open the Greenbone Security Assistant web interface in the web browser."
read
xdg-open "http://127.0.0.1:9392" 2>/dev/null >/dev/null &
