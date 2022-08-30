## Manual Feed Sync

It is possible to do a manual feed sync using {command}`rsync`.

```{warning}
Please be aware that the manual synced data will be overridden if the data
containers are (re-)started.
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
caption: Syncing {term}`VTs<VT>` processed by the scanner, this will take a while.
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm ospd-openvas greenbone-nvt-sync
```

### Syncing SCAP, CERT and GVMD Data

{term}`SCAP` data contains {term}`CPE` and {term}`CVE` information.

```{code-block} shell
---
caption: Syncing SCAP data processed by gvmd, this will take a while
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm gvmd greenbone-feed-sync --type SCAP
```

CERT data contains vulnerability information from the German [DFN-CERT](https://www.dfn-cert.de/)
and [CERT-Bund](https://cert-bund.de/) agencies.

```{code-block} shell
---
caption: Syncing CERT data processed by gvmd
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm gvmd greenbone-feed-sync --type CERT
```

gvmd data (or also called data-objects) are scan configurations, compliance policies, port lists
and report formats.

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    run --rm gvmd greenbone-feed-sync --type GVMD_DATA
```
