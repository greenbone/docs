## Prerequisites

```{note}
Please follow the guide step by step.
Later steps might require settings or output of a previous command.
```

The `sudo`-command is used for executing commands and binaries that require privileged access on the system.  

### Dependencies

There are a few dependencies required for the following steps like [curl](https://curl.se/) 
(alternatively [wget](https://www.gnu.org/software/wget/)) and [docker](https://www.docker.com/), 
of which the former is required to downloading files from this guide.  
[curl](https://curl.se/) can be separately downloaded through the instructions below, 
but it will also be installed when following the Docker engine installation docs.  

`````{tabs}
````{tab} Debian/Ubuntu
```{code-block} shell
---
caption: Install ca-certificates and curl Debian/Ubuntu packages
---
sudo apt install ca-certificates curl
```
````
````{tab} Fedora/CentOS
```{code-block} shell
---
caption: Install ca-certificates and curl Fedora/CentOS packages
---
sudo dnf install ca-certificates curl
```
````
`````

### Installing Docker

[Docker](https://www.docker.com/) (alternatively [podman](https://podman.io/)) 
is the application with which the Greenbone stack will be deployed.  
Docker can be installed by following the instructions provided directly by them.  
Please refer to the: [Official Docker Engine Installation Guide](https://docs.docker.com/engine/install/)):


### Setting up Docker

To allow the current user to run `docker`-commands and therefore start the containers, 
they must be added to the *docker* user group (or be run as root). 
To make the group change effective, either logout and login again or use the `su`-command.

```{code-block} shell
---
caption: Add current user to docker group and apply group changes for the current shell environment
---

sudo usermod -aG docker $USER && su $USER
```

For downloading the Greenbone Community Edition docker compose file,
a destination directory should be created.

```{code-block} shell
---
caption: Create download directory
---
export DOWNLOAD_DIR=$HOME/greenbone-ce && mkdir -p $DOWNLOAD_DIR
```
