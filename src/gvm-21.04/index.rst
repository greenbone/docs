==================
Building GVM 21.04
==================

.. include:: ../common/introduction.rst

.. contents::
  :local:
  :depth: 2

This guide assumes you are using Debian Stable (Buster) as your Linux
distribution. Most likely a Debian derivate like Ubuntu and Kali will work too
with only small adjustments required.

The ``sudo`` command is used for executing commands that require privileged
access on the system.

.. highlight:: shell-session

.. include:: ../common/prerequisites.rst

Setting the version
-------------------

To make the downloading easier an environment variable for the desired release
version will be set. Using a variable allows adjusting the version easily after
a new release.

.. code-block::

  export GVM_VERSION=21.4.0


Building and Installing the Components
======================================

gvm-libs
--------

.. include:: ../common/gvm-libs/description.rst

.. include:: ../common/gvm-libs/dependencies.rst

.. include:: ../common/gvm-libs/download.rst

Afterwards gvm-libs can be build and installed

.. include:: ../common/gvm-libs/build.rst

gvmd
----

.. include:: ../common/gvmd/description.rst

.. include:: ../common/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/gvmd-21.04/INSTALL.md#prerequisites-for-optional-features

.. include:: ../common/gvmd/download.rst

.. include:: ../common/gvmd/build.rst

GSA
---

.. include:: ../common/gsa/description.rst

.. include:: ../common/gsa/dependencies.rst

.. include:: ../common/gsa/download.rst

.. include:: ../common/gsa/build.rst

openvas-smb
-----------

.. include:: ../common/openvas-smb.rst

openvas-scanner
---------------

.. include:: ../common/openvas-scanner/description.rst

.. include:: ../common/openvas-scanner/dependencies.rst

.. include:: ../common/openvas-scanner/download.rst

.. include:: ../common/openvas-scanner/build.rst

ospd-openvas
------------

.. include:: ../common/ospd-openvas/dependencies.rst

.. include:: ./ospd-openvas/download.rst

.. include:: ./ospd-openvas/build.rst

gvm-tools
---------

.. include:: ../common/gvm-tools/dependencies.rst

System Setup for GVM
====================

.. include:: ../common/redis.rst
.. include:: ../common/directory-permissions.rst
.. include:: ../common/sudo-scanning.rst
.. include:: ../common/postgres.rst
.. include:: ../common/admin-user.rst
.. include:: ../common/feed-import-owner.rst
.. include:: ../common/initial-feed-sync.rst
.. include:: ../common/systemd.rst
