## Troubleshooting

This page contains hints for troubleshooting source build specific issues.

```{warning}
The commands in the following troubleshooting guidelines are only valid if you
followed the source build documentation. If you installed the Greenbone
Community Edition via a Linux Distribution (for example Kali Linux), the
commands may be slightly different and need to be adjusted.
```

### Facing an issue with the Greenbone Community Edition

If you have an issue with the Greenbone Community Edition because something
doesn't work as expected and/or you are getting an error in the web UI it is
necessary to check the log files to get some technical hints about the issue.

If something doesn't work during the scan the {file}`/var/log/gvm/ospd-openvas.log`
and {file}`/var/log/gvm/openvas.log` files should be checked for errors.

Otherwise the {file}`/var/log/gvm/gvmd.log` file needs to be inspected.

Afterwards using the collected error messages in the [search of our Community Forum](https://forum.greenbone.net/search)
may bring up possible results to resolve the issue already.

If no fitting results can be found feel free to create a new topic at our
[Community Forum](https://forum.greenbone.net/). A post in the forum should
always contain the installation method and the version of the Greenbone
Community Edition (build from source via this guide, official community
containers, Kali packages, ...) and the found error message.

### Failed to find port_list ‘33d0cd82-57c6-11e1-8ed1-406186ea4fc5‘

This error can occur when tying to use the Task Wizard to create a quick scan
after the initial setup. It is cause by {command}`gvmd` not being able to load
the port lists from the {term}`feed` into its database. To fix this issue, you
need to check if {file}`/var/lib/gvm/data-objects/` contains the port list XML
file:

```{code-block} shell
---
caption: Checking if port list is already synced
---
find /var/lib/gvm/data-objects/ -name "*33d0cd82-57c6-11e1-8ed1-406186ea4fc5*.xml"
```

If the {command}`find` command does not return an XML file for your release, the
data objects have not been synced from the {term}`feed` (yet).

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
sudo -u gvm greenbone-feed-sync --type GVMD_DATA
```

Second, {command}`gvmd` should be forced to (re-)load the data objects including
the port lists from the disk.

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
sudo -u gvm gvmd --rebuild-gvmd-data=all
```

### Failed to find scan configuration

This issue is similar to [Failed to find port_list](#failed-to-find-port_list-33d0cd82-57c6-11e1-8ed1-406186ea4fc5).
It will be raised if {command}`gvmd` is not able to load the scan configs from
the file system into its database. First of all you should check if the scan
configs have been downloaded from the {term}`feed`.

```{code-block} shell
---
caption: Checking if scan configs are already available
---
find /var/lib/gvm/data-objects/ -name "*daba56c8-73ec-11df-a475-002264764cea*.xml"
```

If the {command}`find` command does not return at least one XML file for your
release, the data objects have not been downloaded from the {term}`feed` (yet).

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
sudo -u gvm greenbone-feed-sync --type gvmd-data
```

Because scan configs reference {term}`VTs<VT>`, loading scan configs also
requires synced VTs from the {term}`feed`. You can check if the VTs are already
loaded by looking at the {menuselection}`Secinfo > NVTs` page on the web interface.

If there are no VTs visible on the web interface, they must be downloaded from the
feed.

```{code-block} shell
---
caption: Syncing VTs processed by the openvas scanner
---
sudo -u gvm greenbone-feed-sync --type nvt
```

Loading the VTs from the file system may take a while, from several minutes up
to hours depending on your system performance and number of {term}`VTs<VT>`. You
can follow the process of loading VTs by looking at the {file}`/var/log/gvm/ospd-openvas.log`
and {file}`/var/log/gvm/gvmd.log` files.

If there are still no scan configs under {menuselection}`Configuration > Scan Configs`
on the web interface after some hours and the logs of gvmd and ospd-openvas do not show
errors, the `Feed Import Owner` may not have been set.


```{code-block} shell
---
caption: Setting the `Feed Import Owner`
---
gvmd --modify-setting 78eceaec-3385-11ea-b237-28d24461215b --value `gvmd --get-users --verbose | grep admin | awk '{print $2}'`
```

If all these steps do not resolve the issue, it is very likely a bigger problem,
for example with the PostgreSQL database. Therefore, the
{file}`/var/log/gvm/ospd-openvas.log` and {file}`/var/log/gvm/gvmd.log` files
must be inspected for possible error and warning messages.

### Vulnerabilities are not found

A scan report does not contain any results or some known vulnerabilities do not
show up in the report.

This may have several reasons. Most likely, the {term}`feed` synchronization is not
finished yet. The feed data has been downloaded to the file system of the local
machine but {command}`gvmd` and {command}`ospd-openvas` did not have enough resources
to load them into their databases and memory yet. This can be checked on the web interface
by opening the {menuselection}`SecInfo > NVTs` page to see whether {term}`VTs<VT>`
are listed there and the {menuselection}`Administration > Feed Status`
page to see whether a synchronization process is currently running.

If both pages are fine, you may take a look at the following sections in our
product manual:
- [20.2 Why Is a Service/Product Not Detected?](https://docs.greenbone.net/GSM-Manual/gos-22.04/en/faq.html#why-is-a-service-product-not-detected)
- [20.3 Why Is a Vulnerability Not Detected?](https://docs.greenbone.net/GSM-Manual/gos-22.04/en/faq.html#why-is-a-vulnerability-not-detected)
