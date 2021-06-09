Building GVM 20.08
##################

Building the GVM stack from source requires knowledge about 

* using a terminal
* shell programming basic
* installing software via apt
* using a C compiler
* using CMake and make
* the `Linux File System Hierarchy <https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard>`_
* running services via systemd

To follow this guide you also should have a basic knowledge about the
:doc:`GVM architecture <architecture>`.

This guide assumes you are using Debian Stable (Buster) as your Linux
distribution. Most likely a Debian derivate like Ubuntu and Kali will work too
with only small adjustments required.

The ``sudo`` command is used for executing commands that require privileged
access on the system.

.. note::

  Please follow the guide step by step. Later steps might require settings or
  output of a previous command.

.. highlight:: shell-session

.. include:: prerequisites.rst

Building and Installing the Components
======================================

gvm-libs
--------

**gvm-libs** is a C library providing basic functionality like XML parsing and
network communication. It is used in **openvas-scanner**, **gvmd** and **gsad**.
