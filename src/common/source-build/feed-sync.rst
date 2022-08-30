Performing a Feed Synchronization
=================================

For the actual vulnerability scanning, :term:`Vulnerability Test scripts<VT>`,
security information like :term:`CVEs <CVE>`, port lists and scan configurations
are required. All this data is provided by the :term:`Greenbone Community Feed`
and should be downloaded initially before starting the services.

A synchronization always consists of two parts:

1. Downloading the changes via :command:`rsync`
2. Loading the changes into memory and a database by a daemon

Both steps may take a while, from several minutes up to hours, especially for the
initial synchronization. Only if both steps are finished, the synchronized data
is up-to-date and can be used.

The first step is done via the :command:`greenbone-nvt-sync` and :command:`greenbone-feed-sync`
scripts. The second step is done automatically when the daemons are started.
