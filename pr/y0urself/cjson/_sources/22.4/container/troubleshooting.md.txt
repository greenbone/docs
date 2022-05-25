## Troubleshooting

This page contains hints for troubleshooting Greenbone Community Container specific issues.

### Facing an issue with the Greenbone Community Containers

If you have an issue with the Greenbone Community Containers because something
doesn't work as expected and/or you are getting an error in the web UI it is
necessary to check the log output to get some technical hints about the issue.

To inspect the logs you can use the [`docker compose logs`](https://docs.docker.com/engine/reference/commandline/compose_logs/)
command. For displaying the complete log output you can run

```{code-block} shell
---
caption: Display all logs
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    logs
```

To follow the current log output to display log messages as they occur use the
following command

```{code-block} shell
---
caption: Follow current log output
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    logs -f
```

It's also possible to just display the logs of a specific container by using
`docker compose logs <service>` where service is the [name of the container
within the docker compose file](./index.md#description).

```{code-block} shell
---
caption: Follow the log messages of the gvmd container only
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    logs -f gvmd
```

Additionally it is possible to bypass the `docker compose log` command and
access the log files directly. For example run the following command to display
the content of the OpenVAS scanner log file via {command}`cat`

```{code-block} shell
---
caption: Print messages from /var/log/gvm/openvas.log
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec ospd-openvas cat /var/log/gvm/openvas.log
```

Afterwards using the collected error messages in the [search of our Community Forum](https://forum.greenbone.net/search)
may bring up possible results to resolve the issue already.

If no fitting results can be found feel free to create a new topic the
[Community Containers category in our Community Forum](https://forum.greenbone.net/c/community-containers/40).

### VTs are up-to-date but not visible on the web interface

It may be possible, especially for the initial synchronization, that the scanner
does not notice new VT files have arrived. Therefore, it is best to restart the
scanner.

```{code-block} shell
---
caption: Restart the scanner to ensure that new {term}`VTs<VT>` are loaded
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    restart ospd-openvas
```

### Port list, scan configurations, report formats are up-to-date but not visible on the web interface

If port lists, scan configurations, or report formats are missing on the web interface, you may run:

```{code-block} shell
---
caption: Forcing reload of report formats, scan configs and port lists
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd gvmd --rebuild-gvmd-data=all
```

to force `gvmd` to reload the data from the file system.

### Errors while starting `pg-gvm` container

While starting up the `pg-gvm` container, some errors are displayed. For example
`createuser: error: creation of new role failed: ERROR:  role "gvmd" already exists`
or `ERROR:  extension "uuid-ossp" already exists`.

The code behind these errors tries to set up the database. If the database is
already initialized, all tables, users, permissions and extensions exist,
errors are raised. At the moment, it is not possible to silence these errors but
they can be ignored safely.

### `osp_scanner_feed_version: failed to connect to /run/ospd/ospd-openvas.sock`

If the `gvmd` log contains this error, `gvmd` is not able to connect to the
`ospd-openvas` scanner. Most likely `ospd-openvas` is not running. Try to
restart the corresponding container with:

```{code-block} shell
---
caption: Restarting the ospd-openvas scanner
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    restart ospd-openvas
```

If you still get errors, you need to take a look at the `ospd-openvas` logs.

```{code-block} shell
---
caption: Showing log message of the ospd-openvas scanner
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    log -f ospd-openvas
```

### Cannot log in to the web interface: *Greenbone Vulnerability Manager service is not responding*

If it is not possible to log in to the web interface and the following error
message is shown

```{image} gvmd-not-responding.png
---
alt: gvmd not responding
width: 200px
align: center
---
```

and/or the logs contain a `Failed to connect to server at /run/gvmd/gvmd.sock: Connection refused`
message, the {term}`gvmd` container must be restarted. It is very likely it
had some issues accessing the PostgreSQL database.

```{code-block} shell
---
caption: Restarting {term}`gvmd`
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    restart gvmd
```

### Redis server keeps restarting `rm: cannot remove ‘/run/redis/redis.sock’: Permission denied`

Under some circumstances the [Unix Domain Socket](https://en.wikipedia.org/wiki/Unix_domain_socket)
of the Redis server has got wrong permissions. To fix this issue it is required
to shutdown the `redis-server` and `ospd-openvas` containers and remove the
`redis_socket_vol` [docker volume](https://docs.docker.com/storage/volumes/).
The volume can be removed safely because it gets recreated on the next startup.

```{code-block} shell
---
caption: Recreating the Redis server socket volume
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    rm -s -f redis-server ospd-openvas
docker volume rm greenbone-community-edition_redis_socket_vol
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    up -d
```
