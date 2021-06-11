==================
Building GVM 20.08
==================

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

.. note::

  This guide is intended for developers who want to try out the newest features
  and/or want to get familiar with the source code. It is not intended for
  production setups.

.. contents::
  :local:
  :depth: 2

This guide assumes you are using Debian Stable (Buster) as your Linux
distribution. Most likely a Debian derivate like Ubuntu and Kali will work too
with only small adjustments required.

The ``sudo`` command is used for executing commands that require privileged
access on the system.

.. highlight:: shell-session

.. include:: prerequisites.rst


Building and Installing the Components
======================================

gvm-libs
--------

**gvm-libs** is a C library providing basic functionality like XML parsing and
network communication. It is used in **openvas-scanner**, **gvmd** and **gsad**.

.. code-block::
  :caption: Required dependencies for gvm-libs

  sudo apt install \
    libglib2.0-dev \
    libgpgme-dev \
    libgnutls28-dev \
    uuid-dev \
    libssh-gcrypt-dev \
    libhiredis-dev \
    libxml2-dev \
    libpcap-dev \
    libnet1-dev

.. code-block::
  :caption: Optional dependencies for gvm-libs

  sudo apt install \
    libldap2-dev \
    libradcli-dev

gvmd
----

.. code-block::
  :caption: Required dependencies for gvmd

  sudo apt install \
    libglib2.0-dev \
    libgnutls28-dev \
    libpq-dev \
    postgresql-server-dev-11 \
    libical-dev \
    xsltproc


.. code-block::
  :caption: Optional dependencies for gvmd

  sudo apt install \
    texlive-latex-extra \
    texlive-fonts-recommended \
    xmlstarlet \
    zip \
    rpm \
    fakeroot \
    dpkg \
    makensis \
    gnupg \
    gpgsm \
    wget \
    sshpass \
    scp \
    socat \
    snmp \
    python3 \
    smbclient \
    python3-lxml \
    gnutls-bin \
    xml-twig-tools

Details about the optional dependencies can be found at
https://github.com/greenbone/gvmd/blob/gvmd-20.08/INSTALL.md#prerequisites-for-optional-features

gsa
---

.. code-block::
  :caption: Required dependencies for gsa

.. code-block::
  :caption: Optional dependencies for gsa

openvas-smb
-----------

openvas-smb is a helper module for the openvas-scanner. It includes libraries
(openvas-wmiclient/openvas-wincmd) to interface with Microsoft Windows Systems
through the Windows Management Instrumentation API and a winexe binary to
execute processes remotely on that system.

It is an optional dependency of openvas-scanner but is required for scanning
Windows based systems.

.. code-block::
  :caption: Required dependencies for openvas-smb

  sudo apt install \
    libgnutls28-dev \
    libglib2.0-dev \
    libpopt-dev \
    libunistring-dev
    heimdal-dev \
    perl-base

openvas-scanner
---------------

openvas-scanner is a full-featured scan engine that executes a continuously
updated and extended feed of Vulnerability Tests (VTs). The feed consist of
thousands of NASL (Network Attack Scripting Language) scripts which implement
all kind of vulnerability checks.

.. code-block::
  :caption: Required dependencies for openvas

  sudo apt install \
    bison \
    libglib2.0-dev \
    libgnutls28-dev \
    libgcrypt20-dev \
    libpcap-dev \
    libgpgme-dev \
    libksba-dev \
    nmap \
    snmp

.. code-block::
  :caption: Optional dependencies for openvas

ospd-openvas
------------

.. code-block::
  :caption: Required dependencies for ospd-openvas

  sudo apt install \
    python3 \
    python3-pip

gvm-tools
---------

.. code-block::
  :caption: Required dependencies for gvm-tools

  sudo apt install \
    python3 \
    python3-pip

Setup
=====

Redis
-----

.. code-block::

  sudo apt install redis-server
