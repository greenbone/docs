Downloading SCAP, CERT and GVMD Data
------------------------------------

:term:`SCAP` data contains :term:`CPE` and :term:`CVE` information.

.. note::

  The CERT feed synchronization depends on the data provided by the SCAP
  feed and should be called after synchronizing the latter. The GVMD_DATA
  contains scan configs which depend on the VTs. Only if the VTs are synced and
  loaded scan configs are available and scans can be started.

.. code-block::
  :caption: Syncing SCAP data processed by gvmd, this will take a while

  sudo -u gvm greenbone-feed-sync --type SCAP

CERT data contains vulnerability information from the German `DFN-CERT <https://www.dfn-cert.de/>`_
and `CERT-Bund <https://cert-bund.de/>`_ agencies.

.. code-block::
  :caption: Syncing CERT data processed by gvmd

  sudo -u gvm greenbone-feed-sync --type CERT

gvmd data (or also called data-objects) are scan configurations, compliance policies, port lists
and report formats.

.. code-block::
  :caption: Syncing data objects processed by gvmd

  sudo -u gvm greenbone-feed-sync --type GVMD_DATA

