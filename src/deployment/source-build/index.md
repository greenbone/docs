# Building from Source

```{include} /deployment/source-build/introduction.md
```

```{highlight} shell-session
```

```{include} /deployment/source-build/hardware.md
```

```{include} /deployment/source-build/prerequisites.md
```

## Building and Installing the Components

```{note}
The components should be build and installed in the listed order.
```

### gvm-libs

```{include} /deployment/source-build/gvm-libs/description.md
```

```{code-block}
:caption: Setting the gvm-libs version to use

export GVM_LIBS_VERSION=22.31.1
```

```{include} /deployment/source-build/gvm-libs/dependencies.md
```

```{include} /deployment/source-build/gvm-libs/download.md
```

Afterwards, gvm-libs can be build and installed.

```{include} /deployment/source-build/gvm-libs/build.md
```

### gvmd

```{include} /deployment/source-build/gvmd/description.md
```

```{code-block}
:caption: Setting the gvmd version to use

export GVMD_VERSION=26.10.0
```

```{include} /deployment/source-build/gvmd/dependencies.md
```

Details about the optional dependencies can be found at
<https://github.com/greenbone/gvmd/blob/stable/INSTALL.md#prerequisites-for-optional-features>.

```{include} /deployment/source-build/gvmd/download.md
```

```{include} /deployment/source-build/gvmd/build.md
```

### pg-gvm

```{include} /deployment/source-build/pg-gvm/description.md
```

```{code-block}
:caption: Setting the pg-gvm version to use

export PG_GVM_VERSION=22.6.9
```

```{include} /deployment/source-build/pg-gvm/dependencies.md
```

```{include} /deployment/source-build/pg-gvm/download.md
```

Afterwards, pg-gvm can be build and installed.

```{include} /deployment/source-build/pg-gvm/build.md
```

### Greenbone Security Assistant

The Greenbone Security Assistant (GSA) sources consist of two parts:

- Web server *gsad*
- Web application *GSA*

#### GSA

```{include} /deployment/source-build/gsa/description.md
```

```{code-block}
:caption: Setting the GSA version to use

export GSA_VERSION=25.0.0
```

```{include} /deployment/source-build/gsa/download.md
```

```{include} /deployment/source-build/gsa/build.md
```

#### gsad

```{include} /deployment/source-build/gsad/description.md
```

```{code-block}
:caption: Setting the GSAd version to use

export GSAD_VERSION=24.3.0
```

```{include} /deployment/source-build/gsad/dependencies.md
```

```{include} /deployment/source-build/gsad/download.md
```

```{include} /deployment/source-build/gsad/build.md
```

### openvas-smb

```{include} /deployment/source-build/openvas-smb.md
```

### openvas-scanner

```{include} /deployment/source-build/openvas-scanner/description.md
```

```{code-block}
:caption: Setting the openvas-scanner version to use

export OPENVAS_SCANNER_VERSION=23.20.1
```

```{include} /deployment/source-build/openvas-scanner/dependencies.md
```

```{include} /deployment/source-build/openvas-scanner/download.md
```

```{include} /deployment/source-build/openvas-scanner/build.md
```

### ospd-openvas

```{include} /deployment/source-build/ospd-openvas/description.md
```

```{code-block}
:caption: Setting the ospd and ospd-openvas versions to use

export OSPD_OPENVAS_VERSION=22.9.0
```

```{include} /deployment/source-build/ospd-openvas/dependencies.md
```

```{include} /deployment/source-build/ospd-openvas/download.md
```

```{include} /deployment/source-build/ospd-openvas/build.md
```

### openvasd

```{include} /deployment/source-build/openvasd/description.md
```

```{code-block}
:caption: Setting the openvas versions to use

export OPENVAS_DAEMON=23.20.0
```

```{include} /deployment/source-build/openvasd/dependencies.md
```

```{include} /deployment/source-build/openvasd/download.md
```

```{include} /deployment/source-build/openvasd/build.md
```

### greenbone-feed-sync

```{include} /deployment/source-build/greenbone-feed-sync/description.md
```

```{include} /deployment/source-build/greenbone-feed-sync/dependencies.md
```

```{include} /deployment/source-build/greenbone-feed-sync/install.md
```

### gvm-tools

```{include} /deployment/source-build/gvm-tools/description.md
```

```{include} /deployment/source-build/gvm-tools/dependencies.md
```

```{include} /deployment/source-build/gvm-tools/install.md
```

## Performing a System Setup

```{include} /deployment/source-build/redis.md
```

```{include} /deployment/source-build/directory-permissions.md
```

```{include} /deployment/source-build/gpg.md
```

```{include} /deployment/source-build/sudo-scanning.md
```

```{include} /deployment/source-build/postgres.md
```

```{include} /deployment/source-build/admin-user.md
```

```{include} /deployment/source-build/feed-import-owner.md
```

```{include} /deployment/source-build/systemd.md
```

```{include} /deployment/source-build/feed-sync.md
```

```{include} /deployment/source-build/start-services.md
```

```{include} /deployment/source-build/feed-loading.md
```

```{include} /deployment/source-build/finish.md
```

```{toctree}
:hidden: true

workflows
troubleshooting
```
