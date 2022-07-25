# Greenbone Community Containers 21.4

```{include} /common/container/preamble.md
```

```{include} /common/container/introduction.md
```

```{include} /common/container/prerequisites.md
```
## Docker Compose File

To run the Greenbone Community Edition with containers, the following compose
file should be used:

```{literalinclude} docker-compose.yml
---
language: yaml
caption: "Docker Compose File"
---
```

### Download

It is possible to just copy and paste the docker compose file. Alternatively,
it can be downloaded with the following command directly:

```{code-block} shell
---
caption: Downloading docker-compose file
---
cd $DOWNLOAD_DIR && curl -f -L https://greenbone.github.io/docs/latest/_static/docker-compose-21.4.yml -o docker-compose.yml
```

### Description

The following table describes the provided containers of the docker compose file
and their services in detail.

| Container | Service | Description |
|-----------|---------|-------------|
| redis-server | [Redis Server](https://redis.io/) | A redis server with an adjusted config. Used to store VT data and scan results by the scanner. |
| gpg-data | | A container that copies a GPG keyring with Greenbone's public signing keys into the `gpg_data_vol` volume on startup. It exits afterwards. |
| pg-gvm | [postgresql](https://www.postgresql.org/) | A PostgreSQL database cluster setup for use with {term}`gvmd`. The actual data is stored in the `psql_data_vol` volume. |
| gvmd | gvmd | A container for {term}`gvmd` that uses unix sockets in volumes to communicate with the PostgreSQL database and ospd-openvas scanner. The downloaded feed data is stored in the `gvmd_data_vol` volume. To verify the feed data, the GPG keyring from the `gpg_data_vol` is used. |
| gsa | gsad | A container running the {term}`gsad` web server for providing the web application {term}`GSA`. The web interface is available at localhost on port 9392. For communication with gvmd, a unix socket in a volume is used. |
| ospd-openvas | ospd-openvas | A container providing the vulnerability scanner. The VT data from the feed is stored in the `vt_data_vol` volume. To verify the feed data, the GPG keyring from the `gpg_data_vol` is used. The connection to the redis server is established via a unix socket in a volume. |
| mqtt-broker | [Mosquitto MQTT Broker](https://mosquitto.org/) | A MQTT Broker user for communication between notus-scanner, openvas-scanner and ospd-openvas. |
| notus-scanner | A container running the {term}`notus-scanner` used for local security checks. |

```{include} /common/container/starting.md
```

```{include} /common/container/feed-sync.md
```

```{include} /common/container/admin-user.md
```
## Starting the Vulnerability Management

After the services have started and all data has been loaded, the {term}`Greenbone
Security Assistant web interface – GSA –<GSA>` can be opened in the browser.

```{code-block} shell
---
caption: Opening Greenbone Security Assistant in the browser
---
xdg-open "http://127.0.0.1:9392" 2>/dev/null >/dev/null &
```

The browser will show the login page of GSA and after using the credentials
created before, it is possible to start with vulnerability scanning.

```{figure} /images/GSA-21.4.png
---
alt: Launching Greenbone Security Assistant for the first time
---
Greenbone Security Assistant after logging in for the first time
```

## Setup and Start Script

As a quick solution we provide all the commands above in a single script. This
script can be downloaded with the following command directly

```{code-block} shell
---
caption: Downloading setup and start script
---
cd $DOWNLOAD_DIR && curl -f -O https://greenbone.github.io/docs/latest/_static/setup-and-start-greenbone-community-edition.sh
```

To execute the script following command needs to be run

```{code-block} shell
---
caption: Run setup and start script
---
$DOWNLOAD_DIR/setup-and-start-greenbone-community-edition.sh
```

```{include} /common/container/workflows.md
```

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

[docker]: https://docs.docker.com/
[docker-compose]: https://docs.docker.com/compose/
