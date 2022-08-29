Downloading Vulnerability Tests
-------------------------------

.. note::

  Downloading the data during the synchronization may take a while
  depending on the network connection and server resources.

VT data contains :file:`.nasl` files for creating results during a vulnerability
scan. The `.nasl` files are processed by the OpenVAS Scanner.

.. code-block::
  :caption: Syncing :term:`VTs<VT>` processed by the scanner, this will take a while.

  sudo -u gvm greenbone-nvt-sync

