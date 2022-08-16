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

### Expose gvmd Unix Socket for GMP access

To allow using the {term}`GMP` protocol provided by {term}`gvmd` from the docker
host a [bind mount](https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes)
must be used for the `/run/gvmd` location. To make the gvmd unix socket
available, first of all a directory must be created and the permissions need to
be adjusted.

```sh
mkdir -p /tmp/gvm/gvmd
chmod -R 777 /tmp/gvm
```

Next the docker compose file needs to be changed as follows:

```diff
  gvmd:
    image: greenbone/gvmd:stable
    restart: on-failure
    volumes:
       - gvmd_data_vol:/var/lib/gvm
       - vt_data_vol:/var/lib/openvas
       - psql_data_vol:/var/lib/postgresql
-      - gvmd_socket_vol:/run/gvmd
+      - /tmp/gvm/gvmd:/run/gvmd
       - ospd_openvas_socket_vol:/run/ospd
       - psql_socket_vol:/var/run/postgresql
     depends_on:
      - pg-gvm

...

  gsa:
    image: greenbone/gsa:stable
    restart: on-failure
     ports:
       - 9392:80
     volumes:
-      - gvmd_socket_vol:/run/gvmd
+      - /tmp/gvm/gvmd:/run/gvmd
     depends_on:
       - gvmd
```

After restarting the containers with

```bash
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition up -d
```

the unix socket should be available at `/tmp/gvm/gvmd/gvmd.sock`. For example
to use the socket with [gvm-tools](https://github.com/greenbone/gvm-tools) the
following command can be executed:

```bash
gvm-cli socket --socketpath /tmp/gvm/gvmd/gvmd.sock --pretty --xml "<get_version/>"
```
