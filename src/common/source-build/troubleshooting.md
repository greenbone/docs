```{warning}
The commands in the following troubleshooting guidelines are only valid if you
followed the source build documentation. If you installed the Greenbone
Community Edition via a Linux Distribution (for example Kali Linux) the commands
may be slightly different and need to be adjusted.
```

### Failed to find port_list ‘33d0cd82-57c6-11e1-8ed1-406186ea4fc5‘

This error can occur when tying to use the Task Wizard to create a quick scan
after the initial setup. It is cause by `gvmd` not being able to load the port
lists from the feed into its database. To fix this issue you first of all it
is required to check if `/var/lib/gvm/data-objects/` contains the port list XML
file:

```{code-block} shell
---
caption: Check if port list is already synced
---
find /var/lib/gvm/data-objects/ -name "*33d0cd82-57c6-11e1-8ed1-406186ea4fc5*.xml"
```

If the `find` command doesn't return a XML file for your release the data
data objects haven't been synced (yet).

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
sudo -u gvm greenbone-feed-sync --type GVMD_DATA
```

Second `gvmd` should be forced to (re-)load the data objects including the port
lists from the disk.

```{code-block} shell
---
caption: Syncing data objects processed by gvmd
---
sudo -u gvm gvmd --rebuild-gvmd-data=all
```
