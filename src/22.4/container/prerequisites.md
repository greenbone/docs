## Prerequisites

```{note}
Please follow the guide step by step. Later steps might require settings or
output of a previous command.
```

The command {command}`sudo` is used for executing commands that require privileged
access on the system.

### Install dependencies

There are a few dependencies required for the following steps like [curl](https://curl.se/), which is required for downloading files from this guide.


`````{tabs}
````{tab} Debian/Ubuntu
```{code-block} shell
---
caption: Install ca-certificates, curl and gnupg Debian/Ubuntu packages
---
sudo apt install ca-certificates curl gnupg
```
````
````{tab} Fedora/CentOS
```{code-block} shell
---
caption: Install ca-certificates, curl and gnupg Fedora/CentOS packages
---
sudo dnf install ca-certificates curl gnupg
```
````
`````

### Installing Docker

[docker] is required for running the services within containers. Docker can be
installed by running (taken from the Docker Engine [install guide](https://docs.docker.com/engine/install/)):

`````{tabs}
````{tab} Debian/Ubuntu
```{code-block} shell
---
caption: Uninstall conflicting Debian/Ubuntu packages
---
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt remove $pkg; done
```
```{code-block} shell
---
caption: Set up the Docker repository
---
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
```
```{code-block} shell
---
caption: Install Docker Debian/Ubuntu packages
---
sudo apt install docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
````
````{tab} Fedora
```{code-block} shell
---
caption: Uninstall conflicting Fedora packages
---
sudo dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine
```
```{code-block} shell
---
caption: Install docker Fedora package
---
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/fedora/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
```{code-block} shell
---
caption: Start Docker
---
sudo systemctl start docker
```
````
````{tab} CentOS
```{code-block} shell
---
caption: Uninstall conflicting CentOS packages
---
sudo dnf remove docker docker-client docker-client-latest docker-common docker-latest docker-latest-logrotate docker-logrotate docker-selinux docker-engine-selinux docker-engine
```
```{code-block} shell
---
caption: Install Docker CentOS package
---
sudo dnf -y install dnf-plugins-core
sudo dnf config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
sudo dnf install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```
```{code-block} shell
---
caption: Start Docker
---
sudo systemctl start docker
```
````
`````

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
