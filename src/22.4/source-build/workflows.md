# Workflows

## Updating to newer Releases

The [build from source guide](./index.md) is updated regularly for using the
newest releases of the [components of the Greenbone Community Edition](../../background.md#architecture).
If you have a source build containing older versions of the components this
section describes how to update them.

First of all the services should be stopped to be able to replace them later on.

```{code-block} shell
---
caption: Stop all services
---
sudo systemctl stop gsad gvmd notus-scanner ospd-openvas
```

Afterwards you need to check the [prerequisites](./index.md#prerequisites) if
all of them are satisfied. Especially ensure the [Install Prefix](./index.md#choosing-an-install-prefix),
[PATH](./index.md#setting-the-path) and [required environment variables](./index.md#creating-a-source-build-and-install-directory)
are set.

Next you need to follow the [build and install documentation](./index.md#building-and-installing-the-components)
as you would if you did it the first time. This will download and install the
latest component releases. The already installed versions will be overridden by
the new ones.

When updating to newer release a database update may be required. The database
is managed by {command}`gvmd`. The following command needs to be used to update
the database

```{code-block} shell
---
caption: Update the database schema
---
/usr/local/sbin/gvmd --migrate
```

As the last step after all components have been installed and the database has
been updated the services need to be restarted.

```{code-block} shell
---
caption: Re-start all services
---
sudo systemctl start gsad gvmd notus-scanner ospd-openvas
```
