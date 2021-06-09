Prerequisites
=============

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
the build software will be installed into. For example when building packages
the distribution developers are setting this path to `/usr`. By default it is
`/usr/local`. For this guide we try to separate the GVM software from other
system wide installed applications by using `/opt/gvm`. This directory will be
stored in an environment variable `INSTALL_PREFIX` to be able to reference it
later.

.. code-block::

  export INSTALL_PREFIX=/opt/gvm

Now the directory should be created and the necessary permissions should be set.

.. code-block::

  sudo mkdir -p $INSTALL_PREFIX
  sudo chown gvm.gvm $INSTALL_PREFIX

Creating a Build Directory
--------------------------

To separate the sources and the build artifacts a build directory has to be
created. This build directory will be used later in this guide via an
environment variable. It can be set to an arbitrary directory where your current
user has write permissions to. Therefore a directory in the current users home
directory is chosen in this guide.

.. code-block::

  export BUILD_DIR=$HOME/build
  mkdir -p $BUILD_DIR

Choosing the Installation Source
--------------------------------

release branches
release tarballs
