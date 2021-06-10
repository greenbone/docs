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
stored in an environment variable `INSTALL_PREFIX` to be able to reference it
later.

.. code-block::

  export INSTALL_PREFIX=/opt/gvm

Creating a Build and Install Directory
--------------------------------------

To separate the sources and the build artifacts a build directory has to be
created. This build directory will be used later in this guide via an
environment variable. It can be set to an arbitrary directory where your current
user has write permissions to. Therefore a directory in the current users home
directory is chosen in this guide.

.. code-block::

  export BUILD_DIR=$HOME/build
  mkdir -p $BUILD_DIR

Additionally a install directory will be set as an environment variable. It is
used as a temporary installation directory before moving all built artifacts
into the final destination.

.. code-block::

  export INSTALL_DIR=$HOME/install
  mkdir -p $INSTALL_DIR

Choosing the Installation Source
--------------------------------

For building the GVM software stack three different sources can be chosen
depending on the desired stability.

* building from release `tarballs <tarball>`_
* building from git tags
* building from release branches

Linux distributions use the release `tarballs <tarball>`_ because that's the
most common and oldest method to share source code. Newer build systems might
stick with the git tags. Because this guide is intended for developers familiar
with building from source already the following sections will use the release
branches. The release branches have the advantage that they contain the newest
fixed which might not be included in the release tarballs or git tags yet. As
a downside they might contain only partly fixed issues and require to update
more often.

.. _tarball: https://en.wikipedia.org/wiki/Tar_(computing)
