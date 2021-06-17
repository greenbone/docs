Prerequisites
=============

.. note::

  Please follow the guide step by step. Later steps might require settings or
  output of a previous command.

Choosing a User and Group
-------------------------

The services provided by the GVM framework should run as a dedicated user and
group. Therefore a `gvm` user and a group with the same name will be created.

.. code-block::

  sudo addgroup --system gvm
  sudo adduser --system --disabled-password --no-create-home --ingroup gvm gvm

Choosing an Install Prefix
--------------------------

Before building the software stack a (root) directory needs to be chosen where
the built software will be finally installed into. For example when building packages
the distribution developers are setting this path to `/usr`. By default it is
`/usr/local`. For this guide we try to separate the GVM software from other
system wide installed applications by using `/opt/gvm`. This directory will be
stored in an environment variable :envvar:`INSTALL_PREFIX` to be able to
reference it later.

.. code-block::

  export INSTALL_PREFIX=/opt/gvm

Creating a Source, Build and Install Directory
----------------------------------------------

To separate the sources and the build artifacts a source and a build directory
have to be created. This source directory will be used later in this guide via
an environment variable :envvar:`SOURCE_DIR`. Accordingly for the build
directory a :envvar:`BUILD_DIR` variable will be set. Both can be set to an
arbitrary directory where your current user has write permissions to. Therefore
directories in the current users home directory are chosen in this guide.

.. code-block::
  :caption: Choosing a source directory

  export SOURCE_DIR=$HOME/source
  mkdir -p $SOURCE_DIR

.. code-block::
  :caption: Choosing a build directory

  export BUILD_DIR=$HOME/build
  mkdir -p $BUILD_DIR

Additionally a install directory will be set as an environment variable
:envvar:`INSTALL_DIR` too. It is used as a temporary installation directory
before moving all built artifacts into the final destination.

.. code-block::
  :caption: Choosing a temporary install directory

  export INSTALL_DIR=$HOME/install
  mkdir -p $INSTALL_DIR

Choosing the Installation Source
--------------------------------

For building the GVM software stack three different sources can be chosen
depending on the desired stability.

* building from release `tarballs`_
* building from git tags
* building from release branches

Linux distributions use the release `tarballs`_ because that's the most common
and well known method to share source code.

Newer build systems might stick with the git tags.

If you are a developer and very familiar with building from source already you
might also try out using the git release branches. The release branches have the
advantage that they contain the newest fixes which might not be included in the
release tarballs or git tags yet. As a downside they might contain only partly
fixed issues and require to update more often.

This guide will use the tarballs to build the software.

.. _tarballs: https://en.wikipedia.org/wiki/Tar_(computing)

Installing common build dependencies
------------------------------------

.. code-block::

  sudo apt update
  sudo apt install --no-install-recommends --assume-yes \
    build-essential \
    curl \
    cmake \
    pkg-config \
    python3 \
    python3-pip \
    gnupg

Importing Greenbone Signing key
-------------------------------

To validate the integrity of the downloaded source files
`GnuPG <https://www.gnu.org/>`_ is used. It requires downloading the
Greenbone Community Signing public key and importing it into the current users
keychain.

.. code-block::
  :caption: Import Greenbone Community Signing key

  curl -O https://www.greenbone.net/GBCommunitySigningKey.asc
  gpg --import GBCommunitySigningKey.asc

.. code-block:: none
  :caption: Setting trustlevel for the Greenbone Community Signing key

  gpg --edit-key 9823FAA60ED1E580

  pub  rsa4096/9823FAA60ED1E580
     created: 2017-09-06  expires: never       usage: SC
     trust: unknown       validity: unknown
  [ unknown] (1). Greenbone Community Feed integrity key

  gpg> trust

  pub  rsa4096/9823FAA60ED1E580
     created: 2017-09-06  expires: never       usage: SC
     trust: unknown       validity: unknown
  [ unknown] (1). Greenbone Community Feed integrity key

  Please decide how far you trust this user to correctly verify other users' keys
  (by looking at passports, checking fingerprints from different sources, etc.)

    1 = I don't know or won't say
    2 = I do NOT trust
    3 = I trust marginally
    4 = I trust fully
    5 = I trust ultimately
    m = back to the main menu

  Your decision? 5
  Do you really want to set this key to ultimate trust? (y/N) y

  pub  rsa4096/9823FAA60ED1E580
     created: 2017-09-06  expires: never       usage: SC
     trust: ultimate      validity: ultimate
  [ultimate] (1). Greenbone Community Feed integrity key

  gpg> quit
