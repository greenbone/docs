Performing an Initial Feed Synchronization
------------------------------------------

For the actual vulnerability scanning, :term:`Vulnerability Test scripts<VT>`,
security information like CVEs, port lists and scan configurations are required.
All this data is provided by the :term:`Greenbone Community Feed <GCF>` and
needs to be download initially before starting the services.

.. note::

  Downloading the data during the initial synchronization may take a while
  depending on the network connection and server resources.

.. code-block::
  :caption: Syncing :term:`VTs<VT>` processed by the scanner

  sudo -u gvm greenbone-nvt-sync

.. note::

  The CERT feed synchronization depends on the data provided by the SCAP
  feed and should be called after synchronizing the latter.

.. code-block::
  :caption: Syncing the data processed by gvmd

  sudo -u gvm greenbone-feed-sync --type SCAP
  sudo -u gvm greenbone-feed-sync --type CERT
  sudo -u gvm greenbone-feed-sync --type GVMD_DATA
