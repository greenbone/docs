# Workflows

## Updating the Greenbone Community Containers

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

## Performing a Feed Synchronization

For the actual vulnerability scanning, {term}`Vulnerability Tests<VT>`,
security information like CVEs, port lists and scan configurations are required.
All this data is provided by the {term}`Greenbone Community Feed` via dedicated
data container images.

A feed synchronization always consists of two parts:

1. Downloading the changes via pulling new container images
2. Loading the changes into memory and a database by a daemon

Both steps may take a while, from several minutes up to hours, especially for the
initial synchronization. Only if both steps are finished, the synchronized data
is up-to-date and can be used.

The first step is done via the {command}`docker-compose pull`. The second step is
done automatically when the daemons are running.

### Downloading the Feed Changes

The data of the {term}`Greenbone Community Feed` is provided via several
container images. When these images are started, they copy the data into the used
docker volumes automatically. Afterwards, the data is picked up from the
volumes by the running daemons .

To download the latest feed data container images run

```{code-block} shell
---
caption: Downloading the Greenbone Community Edition feed data containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition pull notus-data vulnerability-tests scap-data dfn-cert-data cert-bund-data report-formats data-objects
```

To copy the data from the images to the volumes run

```{code-block} shell
---
caption: Starting the Greenbone Community feed data containers
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition up -d notus-data vulnerability-tests scap-data dfn-cert-data cert-bund-data report-formats data-objects
```

### Loading the Feed Changes

```{important}
When feed content has been downloaded, the new data must be loaded by the
corresponding daemons. This may take several minutes up to hours, especially
for the initial loading of the data. Without loaded data, scans will contain
incomplete and erroneous results.
```

After the Greenbone Community Containers have been started, the running daemons
will always pick up the feed content and load the data automatically.

#### Vulnerability Tests Data

If the log (of ospd-openvas) contains the following output, the OpenVAS
Scanner starts to load the new VT data:

```{code-block} none
---
caption: ospd-openvas VT loading log message
---
Loading VTs. Scans will be [requested|queued] until VTs are loaded. This may
take a few minutes, please wait...
```

The loading of the VT data is finished if the log message can be found:
```{code-block} none
---
caption: ospd-openvas VTs loading finished log message
---
Finished loading VTs. The VT cache has been updated from version X to Y.
```

After the scanner is aware of the VT data, the data will be requested by gvmd. This
will result in the following log message:

```{code-block} none
---
caption: gvmd VTs loading log message
---
OSP service has different VT status (version X) from database (version (Y), Z VTs). Starting update ...
```

When gvmd has finished loading all VTs, the following message appears:

```{code-block} none
---
caption: gvmd VTs loading finished log message
---
Updating VTs in database ... done (X VTs).
```

#### SCAP Data

gvmd starts loading the {term}`SCAP` data containing {term}`CPE` and {term}`CVE`
information when the following message can be found in the logs:

```{code-block} none
---
caption: gvmd SCAP data loading log message
---
update_scap: Updating data from feed
```

The SCAP data is loaded and the synchronization is finished when the (gvmd) log
contains the following message:

```{code-block} none
---
caption: gvmd SCAP data loading finished log message
---
update_scap_end: Updating SCAP info succeeded
```

#### CERT Data

gvmd starts loading the CERT data containing DFN-CERT and CERT-Bund advisories
when the following message can be found in the logs:

```{code-block} none
---
caption: gvmd CERT data loading log message
---
sync_cert: Updating data from feed
```

The CERT data is loaded and the synchronization is finished when the (gvmd) log
contains the following message:

```{code-block} none
---
caption: gvmd CERT data finished loading log message
---
sync_cert: Updating CERT info succeeded.
```

#### GVMD Data

The log contains several messages when the gvmd data is loaded. For port lists,
these messages are similar to:

```{code-block} none
---
caption: gvmd port list loaded log message
---
Port list All IANA assigned TCP (33d0cd82-57c6-11e1-8ed1-406186ea4fc5) has been created by admin
```

For report formats:

```{code-block} none
---
caption: gvmd report format loaded log message
---
Report format XML (a994b278-1f62-11e1-96ac-406186ea4fc5) has been created by admin
```

```{hint}
Scan Configs can only be loaded if the VT data is available in gvmd and a *Feed
Import Owner* is set.
```

For scan configs:

```{code-block} none
---
caption: gvmd scan config loaded log message
---
Scan config Full and fast (daba56c8-73ec-11df-a475-002264764cea) has been created by admin
```

## Starting from Scratch

To start from scratch, the containers must be stopped. Afterwards, the
containers and volumes must be removed to delete all data. All this can be done
by running:

```{code-block} shell
---
caption: Remove containers and volumes (all data)
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition down -v
```

##  Gaining a Terminal for a Container

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

## Using gvm-tools for CLI access

To query data or control gvmd and ospd-openvas via CLI, [gvm-tools](https://github.com/greenbone/gvm-tools/)
can be used. gvm-tools is provided in the gvm-tools container. This container
can be started with:

```{code-block} shell
---
caption: Start container for gvm-tools CLI access
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition run --rm gvm-tools
```

Afterwards, a bash shell is provided and `gvm-cli`, `gvm-pyshell` or `gvm-script`
can be run. For example:

```{code-block} shell
---
caption: Query gvmd version via gvm-cli
---
gvm-cli --gmp-username admin socket --pretty --xml "<get_version/>"
```

## Exposing gvmd Unix socket for GMP Access

To enable the use of the protocol {term}`GMP` provided by {term}`gvmd` from the docker
host, a [bind mount](https://docs.docker.com/compose/compose-file/compose-file-v3/#volumes)
must be used for the `/run/gvmd` directory. To make the gvmd Unix socket
available, a directory must be created first and the permissions must
be adjusted.

```sh
mkdir -p /tmp/gvm/gvmd
chmod -R 777 /tmp/gvm
```

In the next step, the docker compose file must be changed as follows:

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

the Unix socket should be available at `/tmp/gvm/gvmd/gvmd.sock`. For example,
to use the socket with [gvm-tools](https://github.com/greenbone/gvm-tools), the
following command can be executed:

```bash
gvm-cli socket --socketpath /tmp/gvm/gvmd/gvmd.sock --pretty --xml "<get_version/>"
```

```{include} /common/container/manual-feed-sync.md
```
