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
