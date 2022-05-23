# Greenbone Community Containers

Running the Greenbone Community Edition from containers requires knowledge about:

* Using a terminal
* Using [docker]
* Running services via [docker-compose]

Additionally, a basic knowledge about the {doc}`architecture </architecture>`
of the Greenbone Community Edition is required to understand the setup.

```{note}
This guide is intended for users who want to try out the newest features
and/or want to get familiar with the Greenbone Community Edition. It is not
intended for production setups.

It assumes that **Debian Stable** is used as the Linux distribution. Most
likely, a Debian derivate like Ubuntu and Kali will also work with only minor
adjustments required.
```

```{contents}
---
local:
depth: 2
---
```

## Introduction

This document provides a guide for running the {term}`Greenbone Community Edition`
from pre-build container images using [Docker]. It consists of a distributed
service {doc}`architecture </architecture>`, where each service is run in a
dedicated container. The orchestration of these services is done via a [docker-compose]
file.

With the Greenbone Community Containers it is possible to scan your local network
independent of the underlying operating system, installed software and
tool chains.

## Prerequisites

```{note}
Please follow the guide step by step. Later steps might require settings or
output of a previous command.
```

The command {command}`sudo` is used for executing commands that require privileged
access on the system.

### Installing docker

[docker] is required for running the services within containers. Docker can be
installed by running

```{code-block} shell
---
caption: Install docker Debian package
---
sudo apt install docker.io
```

### Installing docker-compose

[docker-compose] is required for starting and connecting the services of the
Greenbone Community Edition. The description of the service orchestration is
done by using [compose files](https://docs.docker.com/compose/compose-file/).
A [compose file for the Greenbone Community Edition](#docker-compose-file) is
provided later on.

```{code-block} shell
---
caption: Install docker-compose Debian package
---
sudo apt install docker-compose
```

### Setup

To allow the current user to run {command}`docker` and therefore start the
containers he must be added to the *docker* user group. To make the group change
effective either logout and login again or use {command}`su`.

```{code-block} shell
---
caption: Add current user to docker group
---
sudo adduser $USER docker
```

```{code-block} shell
---
caption: Apply group changes for the current shell environment
---
su $USER
```

For downloading the Greenbone Community Edition docker compose file a
destination directory should be created.

```{code-block} shell
---
caption: Create download directory
---
export DOWNLOAD_DIR=$HOME/greenbone-community-container && mkdir -p $DOWNLOAD_DIR
```

## Docker Compose File

To run the Greenbone Community Edition with containers the following compose
file should be used

```{literalinclude} docker-compose.yml
---
language: yaml
caption: "Docker Compose File"
---
```

### Download

It is possible to just copy and paste the docker compose file or alternatively
it can be downloaded with the following command directly.

```{code-block} shell
---
caption: Downloading docker-compose file
---
cd $DOWNLOAD_DIR && curl -O https://greenbone.github.io/docs/_static/docker-compose.yml
```

### Description

The following table describes the provided containers of the docker compose file
and their services in detail.

| Container | Service | Description |
|-----------|---------|-------------|
| redis-server | [Redis Server](https://redis.io/) | A redis server with an adjusted config. Used to store VT data and scan results by the scanner. |
| gpg-data | | A container that copies a GPG keyring with Greenbone's public signing keys into the `gpg_data_vol` volume on startup. It exits afterwards. |
| pg-gvm | [postgresql](https://www.postgresql.org/) | A PostgreSQL database cluster setup for use with {term}`gvmd`. The actual data is stored in the `psql_data_vol` volume. |
| gvmd | gvmd | An container for {term}`gvmd` that uses unix sockets in volumes to communicate with the PostgreSQL database and ospd-openvas scanner. The downloaded feed data is stored in the `gvmd_data_vol` volume. To verify the feed data the GPG keyring from the `gpg_data_vol` is used. |
| gsa | gsad | A container running the {term}`gsad` webserver for providing the web application {term}`GSA`. The web interface is available at localhost on port 9392. For communication with gvmd a unix socket in a volume is used. |
| ospd-openvas | ospd-openvas | A container providing the vulnerability scanner. The VT data from the feed is stored in the `vt_data_vol` volume. To verify the feed data the GPG keyring from the `gpg_data_vol` is used. The connection to the redis server is established via a unix socket in a volume. |

## Starting the Greenbone Community Containers

Having the docker compose file the container images can be downloaded (*pulled*)
and the containers can be started in the background.

```{code-block} shell
---
caption: Downloading the Greenbone Community Containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition pull
```

```{code-block} shell
---
caption: Starting the Greenbone Community Containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition up -d
```

To get the continuous stream of the log output of all services run the following
command

```{code-block} shell
---
caption: Show log messages of all services from the running containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition logs -f
```

The log stream can be stopped by pressing {kbd}`Ctrl-C`.

## Performing Feed Synchronization

```{note}
The duration of downloading the data during the synchronization depends on
the network connection and server resources.
```

For the actual vulnerability scanning, {term}`Vulnerability Test scripts<VT>`,
security information like CVEs, port lists and scan configurations are required.
All this data is provided by the {term}`Greenbone Community Feed` and
needs to be download initially before starting a vulnerability scan.

```{note}
A synchronization always consists of two parts:

1. Downloading the changes via {command}`rsync`
2. Loading the changes by a daemon into memory and a database

Both steps may take a while, from several minutes up to hours. Especially for the
initial synchronization. Only if both steps are finished, the synchronized data
is up to date and can be used.
```

### Syncing Vulnerability Tests

VT data contains {file}`.nasl` files for creating results during a vulnerability
scan. The `nasl` files are processed by the OpenVAS scanner.

```{code-block} shell
---
caption: Syncing {term}`VTs<VT>` processed by the scanner, this will take a while
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u ospd-openvas ospd-openvas greenbone-nvt-sync
```

### Syncing SCAP, CERT and GVMD Data

```{note}
If one of the following commands show `Sync in progress, exiting.` a
synchronization is still ongoing and `gvmd` may still load data. For example
if you will find `gvmd: OSP: Updating NVT cache` in your processes list the
daemon is loading VT data from ospd-openvas. An additional process title can be
`gvmd: Syncing SCAP: Updating CVEs`. In that case you have to re-try after it
has finished.
```

{term}`SCAP` data contains {term}`CPE` and {term}`CVE` information.

```{code-block} shell
---
caption: Syncing SCAP data processed by gvmd, this will take a while
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type SCAP
```

The SCAP data is loaded and the synchronization is finished when the log
contains the `update_scap_end: Updating SCAP info succeeded` message.

CERT data contains vulnerability information from the German [DFN-CERT](https://www.dfn-cert.de/)
and [CERT-Bund](https://cert-bund.de/) agencies.

```{code-block} shell
---
caption: Syncing CERT data processed by gvmd
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type CERT
```

The CERT data is loaded and the synchronization is finished when the log
contains the `sync_cert: Updating CERT info succeeded.` message.

gvmd data (or also called data-objects) are scan configs, policies, port lists
and report formats.

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type GVMD_DATA
```

## Setting up an Admin User

```{warning}
By default a user *admin* with the password *admin* is created. This is insecure
and it is highly recommended to set a new password.
```

To create the administrator user with a password of your choice instead of the
generated password, the following command can be used:

```{code-block} shell
---
caption: Creating an administrator user with provided password
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd gvmd --create-user=admin --password=<password>
```
## Starting the Vulnerability Management

After the services have started and all data has been loaded, the {term}`Greenbone
Security Assistant web interface – GSA –<GSA>` can be opened in the browser.

```{code-block} shell
---
caption: Opening Greenbone Security Assistant in the browser
---
xdg-open "http://127.0.0.1:9392" 2>/dev/null >/dev/null &
```

The browser will show the login page of *GSA* and after using the credentials
created before, it is possible to start with the vulnerability scanning.

```{figure} /images/GSA.png
---
alt: Launching Greenbone Security Assistant for the first time
---
Greenbone Security Assistant after logging in for the first time
```

## Troubleshooting

### VTs are up to date but are not visible in UI

It may be possible especially for the initial synchronization that the scanner
doesn't notice new VT files have arrived. Therefore it is best to restart the
scanner.

```{code-block} shell
---
caption: Restart the scanner to ensure that new {term}`VTs<VT>` are loaded
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    restart ospd-openvas
```

### Port List, Scan Configs, Report Formats are up to date but not visible in UI

If port lists, scan configs or report formats are missing in the web UI, you may run

```{code-block} shell
---
caption: Force reload of report formats, scan configs and port lists
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd gvmd --rebuild-gvmd-data=all
```

to force `gvmd` to reload these data from the file system.

### Update the Greenbone Community Containers

To update the Greenbone Community Containers to the latest version it is required
to pull the images and restart the containers which have new images. This can
be done with

```{code-block} shell
---
caption: Downloading the Greenbone Community Containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition pull
```

```{code-block} shell
---
caption: Starting the Greenbone Community Containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition up -d
```

### Can't login into Web Interface: *Greenbone Vulnerability Manager service is not responding*

If it is not possible to login into the web interface and the following error
message is shown

```{image} gvmd-not-responding.png
---
alt: gvmd not responding
width: 200px
align: center
---
```

and/or the logs contain a `Failed to connect to server at /run/gvmd/gvmd.sock: Connection refused`
message the {term}`gvmd` container needs to be restarted. It is very likely it
had some issues accessing the PostgreSQL database.

```{code-block} shell
---
caption: Restart {term}`gvmd`
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    restart gvmd
```

### Starting from Scratch

To start from scratch the containers need to be stopped. Afterwards the
containers and volumes must be removed to delete all data. All this can be done
by running

```{code-block} shell
---
caption: Remove containers and volumes (all data)
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition down -v
```

###  Gain a terminal for a container

If you want to debug something in a container, install additional software, take
a look at the file content or change some configuration it is possible to gain
shell access to a container.

To access a container with a bash shell as a root user you can run

```{code-block} shell
---
caption: Remove containers and volumes (all data)
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition exec <container-name> /bin/bash
```

Afterwards you can execute standard bash commands within the running container.

[docker]: https://docs.docker.com/
[docker-compose]: https://docs.docker.com/compose/
