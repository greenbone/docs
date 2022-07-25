## Performing a Feed Synchronization

```{note}
The duration of downloading the data during the synchronization depends on
the network connection and server resources.
```

For the actual vulnerability scanning, {term}`Vulnerability Test scripts<VT>`,
security information like CVEs, port lists and scan configurations are required.
All this data is provided by the {term}`Greenbone Community Feed` and
must be download initially before starting a vulnerability scan.

```{note}
A synchronization always consists of two parts:

1. Downloading the changes via {command}`rsync`
2. Loading the changes by a daemon into memory and a database

Both steps may take a while, from several minutes up to hours. Especially for the
initial synchronization. Only if both steps are finished, the synchronized data
is up-to-date and can be used.
```

### Syncing Vulnerability Tests

VT data contains {file}`.nasl` files for creating results during a vulnerability
scan. The `.nasl` files are processed by the OpenVAS scanner.

```{code-block} shell
---
caption: Syncing {term}`VTs<VT>` processed by the scanner, this will take a while
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u ospd-openvas ospd-openvas greenbone-nvt-sync
```

### Syncing SCAP, CERT and GVMD Data

```{note}
If one of the following commands show `Sync in progress, exiting.`, a
synchronization is still ongoing and `gvmd` may still load data. For example,
if you find `gvmd: OSP: Updating NVT cache` in your processes list, the
daemon is loading VT data from ospd-openvas. An additional process title can be
`gvmd: Syncing SCAP: Updating CVEs`. In that case, you have to re-try after it
has finished.
```

{term}`SCAP` data contains {term}`CPE` and {term}`CVE` information.

```{code-block} shell
---
caption: Syncing SCAP data processed by gvmd, this will take a while
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type SCAP
```

The SCAP data is loaded and the synchronization is finished when the log
contains the `update_scap_end: Updating SCAP info succeeded` message.

CERT data contains vulnerability information from the German [DFN-CERT](https://www.dfn-cert.de/)
and [CERT-Bund](https://cert-bund.de/) agencies.

```{code-block} shell
---
caption: Syncing CERT data processed by gvmd
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type CERT
```

The CERT data is loaded and the synchronization is finished when the log
contains the `sync_cert: Updating CERT info succeeded.` message.

gvmd data (or also called data-objects) are scan configurations, compliance policies, port lists
and report formats.

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
docker-compose -f $DOWNLOAD_DIR/docker-compose.yml -p greenbone-community-edition \
    exec -u gvmd gvmd greenbone-feed-sync --type GVMD_DATA
```

