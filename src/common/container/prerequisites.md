## Prerequisites

```{note}
Please follow the guide step by step. Later steps might require settings or
output of a previous command.
```

The command {command}`sudo` is used for executing commands that require privileged
access on the system.

### Install curl

[curl](https://curl.se/) is required for downloading files from this guide.

```{code-block} shell
---
caption: Install curl Debian package
---
sudo apt install curl
```

### Installing Docker

[docker] is required for running the services within containers. Docker can be
installed by running:

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
A compose file for the Greenbone Community Edition is provided later on.

```{code-block} shell
---
caption: Install docker-compose Debian package
---
sudo apt install docker-compose
```

### Setup

To allow the current user to run {command}`docker` and therefore start the
containers, they must be added to the *docker* user group. To make the group change
effective, either logout and login again or use {command}`su`.

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

For downloading the Greenbone Community Edition docker compose file, a
destination directory should be created.

```{code-block} shell
---
caption: Create download directory
---
export DOWNLOAD_DIR=$HOME/greenbone-community-container && mkdir -p $DOWNLOAD_DIR
```