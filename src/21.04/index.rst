==========================
Building 21.04 from Source
==========================

.. include:: ../common/introduction.rst

.. contents::
  :local:
  :depth: 2

.. highlight:: shell-session

.. include:: ../common/prerequisites.rst

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

.. include:: ../common/gvm-libs/description.rst
.. include:: ../common/gvm-libs/version.rst
.. include:: ../common/gvm-libs/dependencies.rst
.. include:: ../common/gvm-libs/download.rst

Afterwards, gvm-libs can be build and installed.

.. include:: ../common/gvm-libs/build.rst

gvmd
----

.. include:: ../common/gvmd/description.rst

.. code-block::
  :caption: Setting the gvmd version to use

  export GVMD_VERSION=21.4.5

.. include:: ../common/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/gvmd-21.04/INSTALL.md#prerequisites-for-optional-features

.. include:: ../common/gvmd/download.rst

.. include:: ../common/gvmd/build.rst

Greenbone Security Assistant
----------------------------

The Greenbone Security Assistant (GSA) sources consist of two parts:

* Web server *gsad*
* Web application *GSA*

GSA
---

.. include:: ../common/gsa/description.rst
.. include:: ../common/gsa/version.rst
.. include:: ../common/gsa/dependencies.rst
.. include:: ../common/gsa/download.rst
.. include:: ../common/gsa/build.rst

gsad
----

.. include:: ../common/gsad/description.rst
.. include:: ../common/gsad/version.rst
.. include:: ../common/gsad/dependencies.rst
.. include:: ../common/gsad/download.rst
.. include:: ../common/gsad/build.rst

openvas-smb
-----------

.. include:: ../common/openvas-smb.rst

openvas-scanner
---------------

.. include:: ../common/openvas-scanner/description.rst
.. include:: ../common/openvas-scanner/version.rst
.. include:: ../common/openvas-scanner/dependencies.rst
.. include:: ../common/openvas-scanner/download.rst
.. include:: ../common/openvas-scanner/build.rst

ospd-openvas
------------

.. include:: ../common/ospd-openvas/description.rst

.. code-block::
  :caption: Setting the ospd and ospd-openvas versions to use

  export OSPD_OPENVAS_VERSION=$GVM_VERSION

.. include:: ../common/ospd-openvas/dependencies.rst
.. include:: ../common/ospd-openvas/download.rst
.. include:: ../common/ospd-openvas/build.rst

gvm-tools
---------

.. include:: ../common/gvm-tools/description.rst
.. include:: ../common/gvm-tools/dependencies.rst
.. include:: ../common/gvm-tools/install.rst

Performing a System Setup for GVM
=================================

.. include:: ../common/redis.rst
.. include:: ../common/directory-permissions.rst
.. include:: ../common/sudo-scanning.rst
.. include:: ../common/postgres.rst
.. include:: ../common/admin-user.rst
.. include:: ../common/feed-import-owner.rst
.. include:: ../common/initial-feed-sync.rst
.. include:: ../common/systemd.rst

.. include:: ../common/finish.rst
