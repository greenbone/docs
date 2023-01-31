==========================
Building 22.4 from Source
==========================

.. include:: /common/source-build/introduction.rst

.. highlight:: shell-session

.. include:: /common/source-build/hardware.rst

.. include:: /common/source-build/prerequisites.rst

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

  export GVM_LIBS_VERSION=22.4.2

.. include:: /22.4/source-build/gvm-libs/dependencies.rst
.. include:: /common/source-build/gvm-libs/download.rst

Afterwards, gvm-libs can be build and installed.

.. include:: /common/source-build/gvm-libs/build.rst

gvmd
----

.. include:: /common/source-build/gvmd/description.rst

.. code-block::
  :caption: Setting the gvmd version to use

  export GVMD_VERSION=22.4.2

.. include:: /22.4/source-build/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/stable/INSTALL.md#prerequisites-for-optional-features

.. include:: /common/source-build/gvmd/download.rst

.. include:: /common/source-build/gvmd/build.rst

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

.. include:: /common/source-build/gsa/description.rst
.. include:: /common/source-build/gsa/version.rst
.. include:: /22.4/source-build/gsa/dependencies.rst
.. include:: /common/source-build/gsa/download.rst
.. include:: /22.4/source-build/gsa/build.rst

gsad
----

.. include:: /common/source-build/gsad/description.rst
.. include:: /common/source-build/gsad/version.rst
.. include:: /common/source-build/gsad/dependencies.rst
.. include:: /common/source-build/gsad/download.rst
.. include:: /common/source-build/gsad/build.rst

openvas-smb
-----------

.. include:: /common/source-build/openvas-smb.rst

openvas-scanner
---------------

.. include:: /common/source-build/openvas-scanner/description.rst
.. include:: /common/source-build/openvas-scanner/version.rst
.. include:: /22.4/source-build/openvas-scanner/dependencies.rst
.. include:: /common/source-build/openvas-scanner/download.rst
.. include:: /common/source-build/openvas-scanner/build.rst

ospd-openvas
------------

.. include:: /common/source-build/ospd-openvas/description.rst

.. code-block::
  :caption: Setting the ospd and ospd-openvas versions to use

  export OSPD_OPENVAS_VERSION=22.4.5

.. include:: /22.4/source-build/ospd-openvas/dependencies.rst
.. include:: /common/source-build/ospd-openvas/download.rst
.. include:: /common/source-build/ospd-openvas/build.rst

notus-scanner
-------------

.. include:: /22.4/source-build/notus-scanner/description.rst

.. code-block::
  :caption: Setting the notus version to use

  export NOTUS_VERSION=22.4.2

.. include:: /22.4/source-build/notus-scanner/dependencies.rst
.. include:: /22.4/source-build/notus-scanner/download.rst
.. include:: /22.4/source-build/notus-scanner/build.rst

gvm-tools
---------

.. include:: /common/source-build/gvm-tools/description.rst
.. include:: /common/source-build/gvm-tools/dependencies.rst
.. include:: /common/source-build/gvm-tools/install.rst

Performing a System Setup
=========================

.. include:: /common/source-build/redis.rst
.. include:: /22.4/source-build/mqtt-broker.rst
.. include:: /22.4/source-build/directory-permissions.rst
.. include:: /22.4/source-build/gpg.rst
.. include:: /common/source-build/sudo-scanning.rst
.. include:: /22.4/source-build/postgres.rst
.. include:: /common/source-build/admin-user.rst
.. include:: /common/source-build/feed-import-owner.rst
.. include:: /22.4/source-build/systemd.rst

.. include:: /common/source-build/feed-sync.rst
.. include:: /22.4/source-build/feed-sync-vts.rst
.. include:: /common/source-build/feed-sync-other.rst
.. include:: /22.4/source-build/start-services.rst
.. include:: /common/source-build/feed-loading.rst

.. include:: /22.4/source-build/finish.rst

.. toctree::
  :hidden:

  troubleshooting
