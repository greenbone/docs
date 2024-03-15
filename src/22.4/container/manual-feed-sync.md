## Performing a Manual Feed Sync

It is possible to do a manual feed sync using {command}`rsync` instead of
pulling the current feed content via the newest container images.

```{warning}
Please be aware that the manually synced data will be overridden if the data
containers are (re-)started.
```

For the manual feed sync, the [`greenbone-feed-sync`](https://github.com/greenbone/greenbone-feed-sync/)
script will be used. The `greenbone-feed-sync` script is also provided via a
container image. Using the container image requires extending the docker compose
file as follows:

```{code-block} yaml
---
caption: Extending the docker compose file for performing a manual feed sync using
    the greenbone-feed-sync script
---
...
  greenbone-feed-sync:
    image: greenbone/greenbone-feed-sync
    volumes:
      - vt_data_vol:/var/lib/openvas/plugins
      - notus_data_vol:/var/lib/notus
      - gvmd_data_vol:/var/lib/gvm
      - scap_data_vol:/var/lib/gvm/scap-data
      - cert_data_vol:/var/lib/gvm/cert-data
      - data_objects_vol:/var/lib/gvm/data-objects/gvmd
...
```

### Syncing Vulnerability Tests

VT data contains {file}`.nasl` and {file}`.notus` files for creating results
during a vulnerability scan. The `.nasl` files are processed by the OpenVAS
Scanner and the `.notus` files by the {term}`Notus Scanner <notus-scanner>`.

```{hint}
{file}`.notus` files and the {term}`Notus Scanner <notus-scanner>` are only
available for 22.4.
```

```{code-block} shell
---
caption: Downloading {term}`NASL<NASL>` {term}`VTs<VT>` processed by the
    ospd-openvas scanner, this will take a while.
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm greenbone-feed-sync greenbone-feed-sync --type nasl
```

```{code-block} shell
---
caption: Downloading {term}`notus<notus-scanner>` {term}`VTs<VT>` processed by
    the Notus Scanner, this will take a while.
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm greenbone-feed-sync greenbone-feed-sync --type notus
```
### Syncing SCAP, CERT and GVMD Data

{term}`SCAP` data contains {term}`CPE` and {term}`CVE` information.

```{code-block} shell
---
caption: Downloading SCAP data processed by gvmd, this will take a while
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm greenbone-feed-sync greenbone-feed-sync --type scap
```

CERT data contains vulnerability information from the German [DFN-CERT](https://www.dfn-cert.de/)
and [CERT-Bund](https://cert-bund.de/) agencies.

```{code-block} shell
---
caption: Downloading CERT data processed by gvmd
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm greenbone-feed-sync greenbone-feed-sync --type cert
```

gvmd data (or also called data-objects) are scan configurations, compliance
policies, port lists and report formats.

```{code-block} shell
---
caption: Downloading data objects processed by gvmd
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm greenbone-feed-sync greenbone-feed-sync --type gvmd-data
```
