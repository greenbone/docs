# Greenbone Community Containers 22.4

```{include} /22.4/container/preamble.md
```

```{include} /22.4/container/introduction.md
```

```{include} /22.4/container/hardware.md
```

```{include} /22.4/container/prerequisites.md
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
cd $DOWNLOAD_DIR && curl -f -L https://greenbone.github.io/docs/latest/_static/docker-compose-22.4.yml -o docker-compose.yml
```

### Description

The following table describes the provided containers of the docker compose file
and their services in detail.

| Container | Service | Description |
|-----------|---------|-------------|
| redis-server | [Redis Server](https://redis.io/) | A redis server with an adjusted config. Used to store VT data and scan results by the scanner. |
| pg-gvm | [postgresql](https://www.postgresql.org/) | A PostgreSQL database cluster setup for use with {term}`gvmd`. The actual data is stored in the `psql_data_vol` volume. |
| gvmd | gvmd | A container for {term}`gvmd` that uses unix sockets in volumes to communicate with the PostgreSQL database and ospd-openvas scanner. The downloaded feed data is stored in the `gvmd_data_vol` volume. To verify the feed data, the GPG keyring from the `gpg_data_vol` is used. |
| gsa | gsad | A container running the {term}`gsad` web server for providing the web application {term}`GSA`. The web interface is available at localhost on port 9392. For communication with gvmd, a unix socket in a volume is used. |
| ospd-openvas | ospd-openvas | A container providing the vulnerability scanner. The VT data from the feed is stored in the `vt_data_vol` volume. To verify the feed data, the GPG keyring from the `gpg_data_vol` is used. The connection to the redis server is established via a unix socket in a volume. |
| mqtt-broker | [Mosquitto MQTT Broker](https://mosquitto.org/) | An MQTT Broker used for communication between notus-scanner, openvas-scanner and ospd-openvas. |
| notus-scanner | notus-scanner | A container running the {term}`notus-scanner` used for local security checks. To verify the feed data, the GPG keyring from the `gpg_data_vol` is used. The feed data for notus-scanner itself is stored in the `notus_data_vol`. |
| gvm-tools | | A container providing the [gvm-tools](https://github.com/greenbone/gvm-tools/) CLI to query and control gvmd and ospd-openvas. |
| gpg-data | | A container that copies a GPG keyring with Greenbone's public signing keys into the `gpg_data_vol` volume on startup. It exits afterwards. |
| vulnerability-tests | | A container that copies vulnerability tests (VTs) into the `vt_data_vol` volume on startup. Shows the license and exits afterwards. |
| notus-data | | A container that copies vulnerability information for notus-scanner into the `notus_data_vol` volume on startup. Shows the license and exits afterwards. |
| scap-data | | A container that copies CVE and CPE data into the `scap_data_vol` volume on startup. Shows the license and exits afterwards. |
| cert-bund-data | | A container that copies CERT-Bund data into the `cert_data_vol` volume on startup. Shows the license and exits afterwards. |
| dfn-cert-data | | A container that copies DFN-CERT data into the `cert_data_vol` volume on startup. Shows the license and exits afterwards. |
| data-objects | | A container that copies scan configs, compliance policies and port lists into the `data_objects_vol` volume on startup. Shows the license and exits afterwards. |
| report-formats | | A container that copies report formats into the `data_objects_vol` volume on startup. Shows the license and exits afterwards. |

```{include} /22.4/container/starting.md
```

```{include} /22.4/container/admin-user.md
```

## Starting the Vulnerability Management

After the services have started and [all feed data has been loaded](./workflows.md#loading-the-feed-changes),
the {term}`Greenbone Security Assistant web interface – GSA –<GSA>` can be opened in the browser.

```{code-block} shell
---
caption: Opening Greenbone Security Assistant in the browser
---
xdg-open "http://127.0.0.1:9392" 2>/dev/null >/dev/null &
```

The browser will show the login page of GSA and after using the credentials
created before, it is possible to start with vulnerability scanning.

```{figure} /images/GSA-22.4.png
---
alt: Launching Greenbone Security Assistant for the first time
---
Greenbone Security Assistant after logging in for the first time
```

## Setup and Start Script

```{note}
Please remember to follow the instructions described in the [Prerequisites](#prerequisites)
first.
```

As a quick solution we provide all the commands above in a single script. This
script can be downloaded with the following command directly:

```{code-block} shell
---
caption: Downloading setup and start script to the current working dir
---
curl -f -O https://greenbone.github.io/docs/latest/_static/setup-and-start-greenbone-community-edition.sh && chmod u+x setup-and-start-greenbone-community-edition.sh
```

To execute the script following command needs to be run

```{code-block} shell
---
caption: Run setup and start script
---
./setup-and-start-greenbone-community-edition.sh 22.4
```

```{toctree}
:hidden:

workflows
troubleshooting
```

[docker]: https://docs.docker.com/
[docker-compose]: https://docs.docker.com/compose/
