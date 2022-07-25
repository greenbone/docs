## Workflows

### Update the Greenbone Community Containers

To update the Greenbone Community Containers to the latest version, it is required
to pull the images and restart the containers which have new images. This can
be done with:

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

### Starting from Scratch

To start from scratch, the containers must be stopped. Afterwards, the
containers and volumes must be removed to delete all data. All this can be done
by running:

```{code-block} shell
---
caption: Remove containers and volumes (all data)
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition down -v
```

###  Gain a Terminal for a Container

If you want to debug something in a container, install additional software, take
a look at the file content, or change some configuration, it is possible to gain
shell access to a container.

To access a container with a bash shell as a root user, you can run:

```{code-block} shell
---
caption: Gain a Terminal for a Container
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition exec <container-name> /bin/bash
```

Afterwards, you can execute standard bash commands within the running container.

