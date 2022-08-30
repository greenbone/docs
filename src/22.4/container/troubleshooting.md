```{include} /common/container/troubleshooting.md
```

### Cannot Log in to the Web Interface: *Greenbone Vulnerability Manager service is not responding*

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
caption: Restart {term}`gvmd`
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    restart gvmd
```

