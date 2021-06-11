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


Building and Installing the Components
======================================

gvm-libs
--------

.. include:: ../common/gvm-libs/description.rst

.. include:: ../common/gvm-libs/dependencies.rst

gvmd
----

.. include:: ../common/gvmd/dependencies.rst

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/gvmd-21.04/INSTALL.md#prerequisites-for-optional-features

gsa
---

.. include:: ../common/gsa/dependencies.rst

openvas-smb
-----------

.. include:: ../common/openvas-smb.rst

openvas-scanner
---------------

.. include:: ../common/openvas-scanner/description.rst

.. include:: ../common/openvas-scanner/dependencies.rst

ospd-openvas
------------

.. include:: ../common/ospd-openvas/dependencies.rst

gvm-tools
---------

.. include:: ../common/gvm-tools/dependencies.rst

Setup
=====

.. include:: ../common/redis.rst

