## Loading the Feed Changes

```{important}
When feed content has been downloaded, the new data needs to be loaded by the
corresponding daemons. This may take several minutes up to hours, especially
for the initial loading of the data. Without loaded data, scans will contain
incomplete and erroneous results.
```

After starting the Greenbone Community Containers, the running daemons will pick
up the feed content and load the data automatically.

### Vulnerability Tests Data

If the log (of ospd-openvas) contains the following output, the OpenVAS
Scanner starts to load the new VT data:

```{code-block} none
---
caption: ospd-openvas VT loading log message
---
Loading VTs. Scans will be [requested|queued] until VTs are loaded. This may
take a few minutes, please wait...
```

The loading of the VT data is finished if the log message can be found:
```{code-block} none
---
caption: ospd-openvas VTs loading finished log message
---
Finished loading VTs. The VT cache has been updated from version X to Y.
```

After the scanner is aware of the VT data, it will be requested by gvmd. This
will result in the following log message:

```{code-block} none
---
caption: gvmd VTs loading log message
---
OSP service has different VT status (version X) from database (version (Y), Z VTs). Starting update ...
```

When gvmd has finished loading all VTs, the following message appears:

```{code-block} none
---
caption: gvmd VTs loading finished log message
---
Updating VTs in database ... done (X VTs).
```

### SCAP Data

gvmd starts loading the {term}`SCAP` data containing {term}`CPE` and {term}`CVE`
information when the following message can be found in the logs:

```{code-block} none
---
caption: gvmd SCAP data loading log message
---
update_scap: Updating data from feed
```

The SCAP data is loaded and the synchronization is finished when the (gvmd) log
contains the following message:

```{code-block} none
---
caption: gvmd SCAP data loading finished log message
---
update_scap_end: Updating SCAP info succeeded
```

### CERT Data

gvmd starts loading the CERT data containing DFN-CERT and CERT-Bund advisories
when the following message can be found in the logs:

```{code-block} none
---
caption: gvmd CERT data loading log message
---
sync_cert: Updating data from feed
```

The CERT data is loaded and the synchronization is finished when the (gvmd) log
contains the following message:

```{code-block} none
---
caption: gvmd CERT data finished loading log message
---
sync_cert: Updating CERT info succeeded.
```

### GVMD Data

The log contains several messages when the gvmd data is loaded. For port lists,
these messages are similar to:

```{code-block} none
---
caption: gvmd port list loaded log message
---
Port list All IANA assigned TCP (33d0cd82-57c6-11e1-8ed1-406186ea4fc5) has been created by admin
```

For report formats:

```{code-block} none
---
caption: gvmd report format loaded log message
---
Report format XML (a994b278-1f62-11e1-96ac-406186ea4fc5) has been created by admin
```

```{hint}
Scan Configs can only be loaded if the VT data is available in gvmd.
```

For scan configs:

```{code-block} none
---
caption: gvmd scan config loaded log message
---
Scan config Full and fast (daba56c8-73ec-11df-a475-002264764cea) has been created by admin
```
