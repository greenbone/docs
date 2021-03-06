==========================
Building 21.04 from Source
==========================

.. include:: /common/source-build/introduction.rst

.. contents::
  :local:
  :depth: 2

.. highlight:: shell-session

.. include:: /common/source-build/prerequisites.rst

Setting the version
-------------------

To make the downloading easier, an environment variable for the desired release
version will be set. Using a variable allows adjusting the version easily after
a new release.

.. code-block::
  :caption: Setting a GVM version as environment variable

  export GVM_VERSION=21.4.4


Building and Installing the Components
======================================

.. note::

  The components should be build and installed in the listed order.

gvm-libs
--------

.. include:: /common/source-build/gvm-libs/description.rst
.. include:: /common/source-build/gvm-libs/version.rst
.. include:: /common/source-build/gvm-libs/dependencies.rst
.. include:: /common/source-build/gvm-libs/download.rst

Afterwards, gvm-libs can be build and installed.

.. include:: /common/source-build/gvm-libs/build.rst

gvmd
----

.. include:: /common/source-build/gvmd/description.rst

.. code-block::
  :caption: Setting the gvmd version to use

  export GVMD_VERSION=21.4.5

.. include:: /common/source-build/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/gvmd-21.04/INSTALL.md#prerequisites-for-optional-features

.. include:: /common/source-build/gvmd/download.rst

.. include:: /common/source-build/gvmd/build.rst

Greenbone Security Assistant
----------------------------

The Greenbone Security Assistant (GSA) sources consist of two parts:

* Web server *gsad*
* Web application *GSA*

GSA
---

.. include:: /common/source-build/gsa/description.rst
.. include:: /common/source-build/gsa/version.rst
.. include:: /common/source-build/gsa/dependencies.rst
.. include:: /common/source-build/gsa/download.rst
.. include:: /common/source-build/gsa/build.rst

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
.. include:: /common/source-build/openvas-scanner/dependencies.rst
.. include:: /common/source-build/openvas-scanner/download.rst
.. include:: /common/source-build/openvas-scanner/build.rst

ospd-openvas
------------

.. include:: /common/source-build/ospd-openvas/description.rst

.. code-block::
  :caption: Setting the ospd and ospd-openvas versions to use

  export OSPD_OPENVAS_VERSION=$GVM_VERSION

.. include:: /common/source-build/ospd-openvas/dependencies.rst
.. include:: /common/source-build/ospd-openvas/download.rst
.. include:: /common/source-build/ospd-openvas/build.rst

gvm-tools
---------

.. include:: /common/source-build/gvm-tools/description.rst
.. include:: /common/source-build/gvm-tools/dependencies.rst
.. include:: /common/source-build/gvm-tools/install.rst

Performing a System Setup for GVM
=================================

.. include:: /common/source-build/redis.rst
.. include:: /common/source-build/directory-permissions.rst
.. include:: /common/source-build/sudo-scanning.rst
.. include:: /common/source-build/postgres.rst
.. include:: /common/source-build/admin-user.rst
.. include:: /common/source-build/feed-import-owner.rst
.. include:: /common/source-build/initial-feed-sync.rst
.. include:: /common/source-build/systemd.rst

.. include:: /common/source-build/finish.rst
