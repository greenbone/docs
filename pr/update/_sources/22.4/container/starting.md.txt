## Starting the Greenbone Community Containers

Using the docker compose file, the container images can be downloaded (*pulled*)
and the containers can be started in the background.

```{code-block} shell
---
caption: Downloading the Greenbone Community Containers
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition pull
```

```{code-block} shell
---
caption: Starting the Greenbone Community Containers
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition up -d
```

To get a continuous stream of the log output of all services, run the following
command:

```{code-block} shell
---
caption: Show log messages of all services from the running containers
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition logs -f
```

The log stream can be stopped by pressing {kbd}`Ctrl-C`.

