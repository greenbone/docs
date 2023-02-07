Performing a Feed Synchronization
=================================

For the actual vulnerability scanning, :term:`Vulnerability Test scripts<VT>`,
security information like :term:`CVEs <CVE>`, port lists and scan configurations
are required. All this data is provided by the :term:`Greenbone Community Feed`
and should be downloaded initially before starting the services.

A synchronization always consists of two parts:

1. Downloading the changes via `rsync <https://en.wikipedia.org/wiki/Rsync>`_
2. Loading the changes into memory and a database by a daemon

Both steps may take a while, from several minutes up to hours, especially for the
initial synchronization. Only if both steps are finished, the synchronized data
is up-to-date and can be used.

The first step is done via the :command:`greenbone-feed-sync` script. The second
step is done automatically when the daemons are started.

Downloading the Data
--------------------

.. note::

  Downloading the data during the synchronization may take a while
  depending on the network connection and server resources.

The downloaded data consist of four different kind of data:

* VT data
* SCAP data
* CERT data
* GVMD data

VT data contain :file:`.nasl` and :file:`.notus` files for creating results
during a vulnerability scan. The :file:`.nasl` files are processed by the OpenVAS
Scanner and the :file:`.notus` files by the :term:`Notus Scanner <notus-scanner>`.

:term:`SCAP` data contains :term:`CPE` and :term:`CVE` information.

CERT data contain vulnerability information from the German `DFN-CERT <https://www.dfn-cert.de/>`_
and `CERT-Bund <https://www.bsi.bund.de/EN/Themen/Unternehmen-und-Organisationen/Cyber-Sicherheitslage/Reaktion/CERT-Bund/cert-bund_node.html>`_ agencies.

GVMD data (or also called "data objects") are scan configurations, compliance
policies, port lists and report formats.

.. code-block::
  :caption: Downloading the data from the Greenbone Community Feed

  sudo /usr/local/bin/greenbone-feed-sync
