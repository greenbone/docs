## Performing a Feed Synchronization

For the actual vulnerability scanning, {term}`Vulnerability Tests<VT>`,
security information like CVEs, port lists and scan configurations are required.
All this data is provided by the {term}`Greenbone Community Feed` and
must be download and loaded initially before starting a vulnerability scan.

A synchronization always consists of two parts:

1. Downloading the changes via {command}`rsync`
2. The changes get loaded into memory and a database by a daemon

Both steps may take a while, from several minutes up to hours, especially for the
initial synchronization. Only if both steps are finished, the synchronized data
is up-to-date and can be used.

The first step is done via the greenbone-nvt-sync and greenbone-feed-sync
scripts. The second step is done automatically when the daemons are started.

## Downloading the Feed Changes

```{note}
The duration of downloading the data during the synchronization depends on
the network connection and server resources.
```
