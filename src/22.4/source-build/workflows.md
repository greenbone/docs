# Workflows

## Updating to Newer Releases

The [build-from-source guide](./index.md) is updated regularly to use the
newest releases of the [components of the Greenbone Community Edition](../../background.md#architecture).
If you have a source build containing older versions of the components, this
section describes how to update them.

First, the services should be stopped to be able to replace them later on.

```{code-block} shell
---
caption: Stopping all services
---
sudo systemctl stop gsad gvmd ospd-openvas openvasd
```

Afterwards, you must verify that all [prerequisites](./index.md#prerequisites) are met.
In particular, make sure that the [required environment variables](./index.md#setting-environment-variables)
are set.

For being able to update `ospd-openvas`, `greenbone-feed-sync` and `gvm-tools`
they must be uninstalled first.

```{code-block} shell
---
caption: Uninstall ospd-openvas, greenbone-feed-sync and gvm-tools
---
sudo python3 -m pip uninstall --break-system-packages ospd-openvas greenbone-feed-sync gvm-tools
```

The `--break-system-packages` argument is required because of [PEP 668](https://peps.python.org/pep-0668/).

Next, you need to follow the [build and install documentation](./index.md#building-and-installing-the-components)
as you would the first time. This will download and install the
latest component releases. The already installed versions will be overwritten by
the new ones.

When updating to newer releases, a database update may be required. The database
is managed by {command}`gvmd`. The following command must be used to update
the database:

```{code-block} shell
---
caption: Updating the database schema
---
/usr/local/sbin/gvmd --migrate
```

After all components have been installed and the database has
been updated, the last step is to restart the services.

```{code-block} shell
---
caption: Restarting all services
---
sudo systemctl start gsad gvmd ospd-openvas openvasd
```

## Accessing the Web Interface Remotely

When following the build-from-source guide, the web server is configured to listen only
on the local address of the host (127.0.0.1). To allow remote access on all
interfaces of the host, the {command}`gsad` systemd service file must be modified to
configure the web server {command}`gsad` to listen on all network interfaces.

```{code-block} none
:caption: Systemd service file for gsad to listen on all interfaces

cat << EOF > $BUILD_DIR/gsad.service
[Unit]
Description=Greenbone Security Assistant daemon (gsad)
Documentation=man:gsad(8) https://www.greenbone.net
After=network.target gvmd.service
Wants=gvmd.service

[Service]
Type=exec
User=gvm
RuntimeDirectory=gsad
RuntimeDirectoryMode=2775
PIDFile=/run/gsad/gsad.pid
ExecStart=/usr/local/sbin/gsad --foreground --listen=0.0.0.0 --port=9392 --http-only
Restart=always
TimeoutStopSec=10

[Install]
WantedBy=multi-user.target
Alias=greenbone-security-assistant.service
EOF
```

```{code-block}
:caption: Installing the systemd service file for gsad

sudo cp -v $BUILD_DIR/gsad.service /etc/systemd/system/
```

Afterwards, the changed service file must be reloaded so that the changes
are taken into account by systemd, and the {command}`gsad` service must be
restarted.


```{code-block}
:caption: Reloading changed gsad.service file

sudo systemctl daemon-reload
```

```{code-block}
:caption: Restarting gsad

sudo systemctl restart gsad
```
