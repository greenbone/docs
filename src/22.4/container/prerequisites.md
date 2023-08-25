## Prerequisites

```{note}
Please follow the guide step by step. Later steps might require settings or
output of a previous command.
```

The command {command}`sudo` is used for executing commands that require privileged
access on the system.

### Install curl

[curl](https://curl.se/) is required for downloading files from this guide.


`````{tabs}
````{tab} Debian/Ubuntu
```{code-block} shell
---
caption: Install curl Debian package
---
sudo apt install curl
```
````
````{tab} Fedora/CentOS
```{code-block} shell
---
caption: Install curl Fedora/CentOS package
---
sudo dnf install curl
```
````
`````

### Installing Docker

[docker] is required for running the services within containers. Docker can be
installed by running:

`````{tabs}
````{tab} Debian/Ubuntu
```{code-block} shell
---
caption: Install docker Debian/Ubuntu package
---
sudo apt install docker.io
```
````
````{tab} Fedora
```{code-block} shell
---
caption: Install docker Fedora package
---
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io
```
````
````{tab} CentOS
```{code-block} shell
---
caption: Install docker Fedora package
---
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io
```
````
`````

### Installing docker-compose

[docker-compose] version 1.29.0 or newer is required for starting and connecting
the services of the Greenbone Community Edition. The description of the service
orchestration is done by using [compose files](https://docs.docker.com/compose/compose-file/).
A compose file for the Greenbone Community Edition is provided later on.


```{code-block} shell
---
caption: Install docker-compose
---
curl -SL https://github.com/docker/compose/releases/latest/download/docker-compose-linux-x86_64 -o docker-compose
chmod +x docker-compose
sudo mv docker-compose /usr/local/bin
```

### Setup

To allow the current user to run {command}`docker` and therefore start the
containers, they must be added to the *docker* user group. To make the group change
effective, either logout and login again or use {command}`su`.

```{code-block} shell
---
caption: Add current user to docker group and  apply group changes for the current shell environment
---
sudo usermod -aG docker $USER && su $USER
```

For downloading the Greenbone Community Edition docker compose file, a
destination directory should be created.

```{code-block} shell
---
caption: Create download directory
---
export DOWNLOAD_DIR=$HOME/greenbone-community-container && mkdir -p $DOWNLOAD_DIR
```
