==================
Building GVM 20.08
==================

.. warning::

  GVM 20.08 is end-of-life and will not get any further updates and releases.
  Please consider switching to :doc:`GVM 21.04<../gvm-21.04/index>`.

.. include:: ../common/introduction.rst

.. contents::
  :local:
  :depth: 2

This guide assumes that Debian Stable (Buster) is used as the Linux
distribution. Most likely, a Debian derivate like Ubuntu and Kali will
also work with only minor adjustments required.

The command ``sudo`` is used for executing commands that require privileged
access on the system.

.. highlight:: shell-session

.. include:: ../common/prerequisites.rst

Setting the Version
-------------------

To make the downloading easier, an environment variable for the desired release
version will be set. Using a variable allows adjusting the version easily after
a new release.

.. code-block::
  :caption: Setting a GVM version as environment variable

  export GVM_VERSION=20.8.4


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

  export GVMD_VERSION=$GVM_VERSION

.. include:: ../common/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/gvmd-20.08/INSTALL.md#prerequisites-for-optional-features

.. include:: ../common/gvmd/download.rst

.. include:: ../common/gvmd/build.rst

GSA
---

.. include:: ../common/gsa/description.rst
.. include:: ../common/gsa/version.rst
.. include:: ../common/gsa/dependencies.rst
.. include:: ../common/gsa/download.rst
.. include:: ../common/gsa/build.rst

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

  export OSPD_VERSION=20.8.5
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
