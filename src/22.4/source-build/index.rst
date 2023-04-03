==========================
Building 22.4 from Source
==========================

.. include:: /22.4/source-build/introduction.rst

.. highlight:: shell-session

.. include:: /22.4/source-build/hardware.rst

.. include:: /22.4/source-build/prerequisites.rst

Setting the Version
-------------------

To make the downloading easier, an environment variable for the desired release
version will be set. Using a variable allows adjusting the version easily after
a new release.

.. code-block::
  :caption: Setting a GVM version as environment variable

  export GVM_VERSION=22.4.1


Building and Installing the Components
======================================

.. note::

  The components should be build and installed in the listed order.

gvm-libs
--------

.. include:: /22.4/source-build/gvm-libs/description.rst
.. code-block::
  :caption: Setting the gvm-libs version to use

  export GVM_LIBS_VERSION=22.4.4

.. include:: /22.4/source-build/gvm-libs/dependencies.rst
.. include:: /22.4/source-build/gvm-libs/download.rst

Afterwards, gvm-libs can be build and installed.

.. include:: /22.4/source-build/gvm-libs/build.rst

gvmd
----

.. include:: /22.4/source-build/gvmd/description.rst

.. code-block::
  :caption: Setting the gvmd version to use

  export GVMD_VERSION=22.4.2

.. include:: /22.4/source-build/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/stable/INSTALL.md#prerequisites-for-optional-features

.. include:: /22.4/source-build/gvmd/download.rst

.. include:: /22.4/source-build/gvmd/build.rst

pg-gvm
------

.. include:: /22.4/source-build/pg-gvm/description.rst
.. code-block::
  :caption: Setting the pg-gvm version to use

  export PG_GVM_VERSION=22.4.0

.. include:: /22.4/source-build/pg-gvm/dependencies.rst
.. include:: /22.4/source-build/pg-gvm/download.rst

Afterwards, pg-gvm can be build and installed.

.. include:: /22.4/source-build/pg-gvm/build.rst

Greenbone Security Assistant
----------------------------

The Greenbone Security Assistant (GSA) sources consist of two parts:

* Web server *gsad*
* Web application *GSA*

GSA
---

.. include:: /22.4/source-build/gsa/description.rst
.. include:: /22.4/source-build/gsa/version.rst
.. include:: /22.4/source-build/gsa/dependencies.rst
.. include:: /22.4/source-build/gsa/download.rst
.. include:: /22.4/source-build/gsa/build.rst

gsad
----

.. include:: /22.4/source-build/gsad/description.rst
.. include:: /22.4/source-build/gsad/version.rst
.. include:: /22.4/source-build/gsad/dependencies.rst
.. include:: /22.4/source-build/gsad/download.rst
.. include:: /22.4/source-build/gsad/build.rst

openvas-smb
-----------

.. include:: /22.4/source-build/openvas-smb.rst

openvas-scanner
---------------

.. include:: /22.4/source-build/openvas-scanner/description.rst
.. include:: /22.4/source-build/openvas-scanner/version.rst
.. include:: /22.4/source-build/openvas-scanner/dependencies.rst
.. include:: /22.4/source-build/openvas-scanner/download.rst
.. include:: /22.4/source-build/openvas-scanner/build.rst

ospd-openvas
------------

.. include:: /22.4/source-build/ospd-openvas/description.rst

.. code-block::
  :caption: Setting the ospd and ospd-openvas versions to use

  export OSPD_OPENVAS_VERSION=22.4.6

.. include:: /22.4/source-build/ospd-openvas/dependencies.rst
.. include:: /22.4/source-build/ospd-openvas/download.rst
.. include:: /22.4/source-build/ospd-openvas/build.rst

notus-scanner
-------------

.. include:: /22.4/source-build/notus-scanner/description.rst

.. code-block::
  :caption: Setting the notus version to use

  export NOTUS_VERSION=22.4.5

.. include:: /22.4/source-build/notus-scanner/dependencies.rst
.. include:: /22.4/source-build/notus-scanner/download.rst
.. include:: /22.4/source-build/notus-scanner/build.rst

greenbone-feed-sync
-------------------

.. include:: /22.4/source-build/greenbone-feed-sync/description.rst
.. include:: /22.4/source-build/greenbone-feed-sync/dependencies.rst
.. include:: /22.4/source-build/greenbone-feed-sync/install.rst

gvm-tools
---------

.. include:: /22.4/source-build/gvm-tools/description.rst
.. include:: /22.4/source-build/gvm-tools/dependencies.rst
.. include:: /22.4/source-build/gvm-tools/install.rst

Performing a System Setup
=========================

.. include:: /22.4/source-build/redis.rst
.. include:: /22.4/source-build/mqtt-broker.rst
.. include:: /22.4/source-build/directory-permissions.rst
.. include:: /22.4/source-build/gpg.rst
.. include:: /22.4/source-build/sudo-scanning.rst
.. include:: /22.4/source-build/postgres.rst
.. include:: /22.4/source-build/admin-user.rst
.. include:: /22.4/source-build/feed-import-owner.rst
.. include:: /22.4/source-build/systemd.rst

.. include:: /22.4/source-build/feed-sync.rst
.. include:: /22.4/source-build/start-services.rst
.. include:: /22.4/source-build/feed-loading.rst

.. include:: /22.4/source-build/finish.rst

.. toctree::
  :hidden:

  troubleshooting
