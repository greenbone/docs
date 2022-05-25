# Building 22.4 from Source

```{include} /22.4/source-build/introduction.md
```

```{highlight} shell-session
```

```{include} /22.4/source-build/hardware.md
```

```{include} /22.4/source-build/prerequisites.md
```

## Building and Installing the Components

```{note}
The components should be build and installed in the listed order.
```

### gvm-libs

```{include} /22.4/source-build/gvm-libs/description.md
```

```{code-block}
:caption: Setting the gvm-libs version to use

export GVM_LIBS_VERSION=22.6.3
```

```{include} /22.4/source-build/gvm-libs/dependencies.md
```

```{include} /22.4/source-build/gvm-libs/download.md
```

Afterwards, gvm-libs can be build and installed.

```{include} /22.4/source-build/gvm-libs/build.md
```

### gvmd

```{include} /22.4/source-build/gvmd/description.md
```

```{code-block}
:caption: Setting the gvmd version to use

export GVMD_VERSION=22.8.0
```

```{include} /22.4/source-build/gvmd/dependencies.md
```

Details about the optional dependencies can be found at
<https://github.com/greenbone/gvmd/blob/stable/INSTALL.md#prerequisites-for-optional-features>

```{include} /22.4/source-build/gvmd/download.md
```

```{include} /22.4/source-build/gvmd/build.md
```

### pg-gvm

```{include} /22.4/source-build/pg-gvm/description.md
```

```{code-block}
:caption: Setting the pg-gvm version to use

export PG_GVM_VERSION=22.6.1
```

```{include} /22.4/source-build/pg-gvm/dependencies.md
```

```{include} /22.4/source-build/pg-gvm/download.md
```

Afterwards, pg-gvm can be build and installed.

```{include} /22.4/source-build/pg-gvm/build.md
```

### Greenbone Security Assistant

The Greenbone Security Assistant (GSA) sources consist of two parts:

- Web server *gsad*
- Web application *GSA*

#### GSA

```{include} /22.4/source-build/gsa/description.md
```

```{code-block}
:caption: Setting the GSA version to use

export GSA_VERSION=22.6.0
```

```{include} /22.4/source-build/gsa/download.md
```

```{include} /22.4/source-build/gsa/build.md
```

#### gsad

```{include} /22.4/source-build/gsad/description.md
```

```{code-block}
:caption: Setting the GSAd version to use

export GSAD_VERSION=22.5.2
```

```{include} /22.4/source-build/gsad/dependencies.md
```

```{include} /22.4/source-build/gsad/download.md
```

```{include} /22.4/source-build/gsad/build.md
```

### openvas-smb

```{include} /22.4/source-build/openvas-smb.md
```

### openvas-scanner

```{include} /22.4/source-build/openvas-scanner/description.md
```

```{code-block}
:caption: Setting the openvas-scanner version to use

export OPENVAS_SCANNER_VERSION=22.7.4
```

```{include} /22.4/source-build/openvas-scanner/dependencies.md
```

```{include} /22.4/source-build/openvas-scanner/download.md
```

```{include} /22.4/source-build/openvas-scanner/build.md
```

### ospd-openvas

```{include} /22.4/source-build/ospd-openvas/description.md
```

```{code-block}
:caption: Setting the ospd and ospd-openvas versions to use

export OSPD_OPENVAS_VERSION=22.6.0
```

```{include} /22.4/source-build/ospd-openvas/dependencies.md
```

```{include} /22.4/source-build/ospd-openvas/download.md
```

```{include} /22.4/source-build/ospd-openvas/build.md
```

### notus-scanner

```{include} /22.4/source-build/notus-scanner/description.md
```

```{code-block}
:caption: Setting the notus version to use

export NOTUS_VERSION=22.6.0
```

```{include} /22.4/source-build/notus-scanner/dependencies.md
```

```{include} /22.4/source-build/notus-scanner/download.md
```

```{include} /22.4/source-build/notus-scanner/build.md
```

### greenbone-feed-sync

```{include} /22.4/source-build/greenbone-feed-sync/description.md
```

```{include} /22.4/source-build/greenbone-feed-sync/dependencies.md
```

```{include} /22.4/source-build/greenbone-feed-sync/install.md
```

### gvm-tools

```{include} /22.4/source-build/gvm-tools/description.md
```

```{include} /22.4/source-build/gvm-tools/dependencies.md
```

```{include} /22.4/source-build/gvm-tools/install.md
```

## Performing a System Setup

```{include} /22.4/source-build/redis.md
```

```{include} /22.4/source-build/mqtt-broker.md
```

```{include} /22.4/source-build/directory-permissions.md
```

```{include} /22.4/source-build/gpg.md
```

```{include} /22.4/source-build/sudo-scanning.md
```

```{include} /22.4/source-build/postgres.md
```

```{include} /22.4/source-build/admin-user.md
```

```{include} /22.4/source-build/feed-import-owner.md
```

```{include} /22.4/source-build/systemd.md
```

```{include} /22.4/source-build/feed-sync.md
```

```{include} /22.4/source-build/start-services.md
```

```{include} /22.4/source-build/feed-loading.md
```

```{include} /22.4/source-build/finish.md
```

```{toctree}
:hidden: true

troubleshooting
```
