## Prerequisites

```{note}
Please follow the guide step by step. Later steps might require settings or
output of a previous command.
```

The command `sudo` is used for executing commands that require privileged
access on the system.

### Install dependencies

There are a few dependencies required for the following steps like [curl](https://curl.se/) (or [wget](https://www.gnu.org/software/wget/)), which is required for downloading files from this guide.


`````{tabs}
````{tab} Debian/Ubuntu
```{code-block} shell
---
caption: Install ca-certificates, curl and gnupg2 Debian/Ubuntu packages
---
sudo apt install ca-certificates curl gnupg2
```
````
````{tab} Fedora/CentOS
```{code-block} shell
---
caption: Install ca-certificates, curl and gnupg2 Fedora/CentOS packages
---
sudo dnf install ca-certificates curl gnupg2
```
````
`````

### Installing Docker

[Docker] is required for running the services within containers. Docker can be
installed by running the following the [Official Docker Engine Installation Guide](https://docs.docker.com/engine/install/)

### Setup

To allow the current user to run the `docker` command and therefore start the containers, they must be added to the *docker* user group or have root privileges.

```{code-block} shell
---
caption: Add current user to docker group and  apply group changes for the current shell environment
---
sudo usermod -aG docker $USER && su $USER
```

To make the group change effective, either logout and login again or use `su` as shown in the command above.

For downloading the Greenbone Community Edition docker compose file, a destination directory should be created.

```{code-block} shell
---
caption: Create download directory
---
export DOWNLOAD_DIR=$HOME/greenbone-ce && mkdir -p $DOWNLOAD_DIR
```
