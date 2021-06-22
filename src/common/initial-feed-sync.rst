Initial Feed Sync
-----------------

For the actual vulnerability scanning :term:`Vulnerability Test Scripts<VT>`,
Security Information like CVEs, Port Lists and Scan Configurations are required.
All these data is provided by the :term:`Greenbone Community Feed <GCF>` and
needs to be download initially before starting the services.

.. note::

  Downloading the data on the initial sync may take a while depending on the
  network connection and server resources.

.. code-block::
  :caption: Syncing :term:`NVTs<VT>` processed by the scanner

  greenbone-nvt-sync

.. note::

  The CERT feed sync depends on data provided by the SCAP feed and should be
  called after syncing the latter.

.. code-block::
  :caption: Syncing the data processed by gvmd

  greenbone-feed-sync --type SCAP
  greenbone-feed-sync --type CERT
  greenbone-feed-sync --type GVMD_DATA
