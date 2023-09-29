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
sudo systemctl stop gsad gvmd notus-scanner ospd-openvas
```

Afterwards, you must verify that all [prerequisites](./index.md#prerequisites) are met.
In particular, make sure that the [install prefix](./index.md#choosing-an-install-prefix), the
[PATH](./index.md#setting-the-path) and the [required environment variables](./index.md#creating-a-source-build-and-install-directory)
are set.

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
sudo systemctl start gsad gvmd notus-scanner ospd-openvas
```
