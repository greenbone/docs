Prerequisites
=============

.. note::

  Please follow the guide step by step. Later steps might require settings or
  output of a previous command.

The command ``sudo`` is used for executing commands that require privileged
access on the system.

Creating a User and a Group
---------------------------

The services provided by the Greenbone Community Edition should run as a dedicated user and
group. Therefore a `gvm` user and a group with the same name will be created.

.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
      :caption: Creating a gvm system user and group

      sudo useradd -r -M -U -G sudo -s /usr/sbin/nologin gvm

  .. tab:: Fedora/CentOS
   .. code-block::
      :caption: Creating a gvm system user and group

      sudo useradd -r -M -U -G wheel -s /usr/sbin/nologin gvm

Adjusting the Current User
--------------------------

To allow the current user to run *gvmd* he must be added to the *gvm* group.
To make the group change effective either logout and login again or use
:command:`su`.

.. code-block::
  :caption: Add current user to gvm group

  sudo usermod -aG gvm $USER

  su $USER

Setting the PATH
----------------

On Debian systems the locations :file:`/sbin`, :file:`/usr/sbin` and
:file:`/usr/local/sbin` are not in the :envvar:`PATH` of normal users. To run
*gvmd* which is located in :file:`/usr/local/sbin` the :envvar:`PATH`
environment variable should be adjusted.

.. code-block::
  :caption: Adjusting PATH for running gvmd

  export PATH=$PATH:/usr/local/sbin

Choosing an Install Prefix
--------------------------

Before building the software stack, a (root) directory must be chosen where
the built software will finally be installed. For example, when building packages,
the distribution developers set this path to :file:`/usr`.

By default, it is :file:`/usr/local` which is also used in this guide. This
directory will be stored in an environment variable :envvar:`INSTALL_PREFIX`
to be able to reference it later.

.. code-block::
  :caption: Setting an install prefix environment variable

  export INSTALL_PREFIX=/usr/local

Creating a Source, Build and Install Directory
----------------------------------------------

To separate the sources and the build artifacts, a source and a build directory
must be created.

This source directory will be used later in this guide via
an environment variable :envvar:`SOURCE_DIR`. Accordingly, a variable
:envvar:`BUILD_DIR` will be set for the build directory. Both can be set to any
directory to which the current user has write permissions. Therefore
directories in the current user's home directory are chosen in this guide.

.. code-block::
  :caption: Choosing a source directory

  export SOURCE_DIR=$HOME/source
  mkdir -p $SOURCE_DIR

.. code-block::
  :caption: Choosing a build directory

  export BUILD_DIR=$HOME/build
  mkdir -p $BUILD_DIR

Additionally, an install directory will be set as an environment variable
:envvar:`INSTALL_DIR`. It is used as a temporary installation directory
before moving all built artifacts to the final destination.

.. code-block::
  :caption: Choosing a temporary install directory

  export INSTALL_DIR=$HOME/install
  mkdir -p $INSTALL_DIR

Choosing the Installation Source
--------------------------------

For building the GVM software stack, three different sources can be chosen
depending on the desired stability:

* Building from release `tarballs`_
* Building from git tags
* Building from release branches

Linux distributions use the release `tarballs`_ because it is the most common
and well known method to share source code.

Newer build systems may stick with the git tags.

If you are a developer and very familiar with building from source already, you
may also try out using the git release branches. These have the
advantage that they contain the newest fixes which may not yet be included in the
release tarballs or git tags. As a downside, the release branches may
contain only partially fixed issues and need to be updated more often.

This guide will use the tarballs to build the software.

.. _tarballs: https://en.wikipedia.org/wiki/Tar_(computing)

Installing Common Build Dependencies
------------------------------------

For downloading, configuring, building and installing the Greenbone Community
Edition components, several tools and applications are required. To install this
requirements the following commands can be used:

.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
      :caption: Installing common build dependencies

      sudo apt update
      sudo apt install --no-install-recommends --assume-yes \
        build-essential \
        curl \
        cmake \
        pkg-config \
        python3 \
        python3-pip \
        gnupg

  .. tab:: Fedora
   .. code-block::
      :caption: Installing common build dependencies

      sudo dnf upgrade -y
      sudo dnf groupinstall 'Development Tools' -y
      sudo dnf install -y \
        cmake \
        python3-pip \
        tar \
        gcc-c++

      sudo tee /etc/ld.so.conf.d/local.conf <<EOF
      /usr/local/lib
      /usr/local/lib64
      EOF

      sudo ldconfig

      sudo dnf remove net-snmp net-snmp-devel
      sudo dnf install -y \
        systemd \
        gcc \
        openssl-devel \
        bzip2-devel \
        elfutils-devel \
        libselinux-devel \
        elfutils-libelf-devel \
        rpm-devel \
        perl-devel \
        procps \
        python3-devel \
        python3-setuptools \
        chrpath \
        mariadb-connector-c-devel

      curl -O https://netcologne.dl.sourceforge.net/project/net-snmp/net-snmp/5.9.1/net-snmp-5.9.1.tar.gz
      tar xzf net-snmp-5.9.1.tar.gz
      cd net-snmp-5.9.1
      ./configure
      make -j$(nproc)
      sudo make install

  .. tab:: CentOS
   .. code-block::
      :caption: Installing common build dependencies

      sudo dnf config-manager --set-enabled crb
      sudo dnf install -y epel-release epel-next-release
      sudo dnf upgrade -y
      sudo dnf groupinstall 'Development Tools' -y
      sudo dnf install -y \
        cmake \
        python3-pip \
        tar \
        gcc-c++ \
        doxygen \
        xmltoman

      sudo tee /etc/ld.so.conf.d/local.conf <<EOF
      /usr/local/lib
      /usr/local/lib64
      EOF

      sudo ldconfig

      sudo dnf remove net-snmp net-snmp-devel
      sudo dnf install -y \
        systemd \
        gcc \
        openssl-devel \
        bzip2-devel \
        elfutils-devel \
        libselinux-devel \
        elfutils-libelf-devel \
        rpm-devel \
        perl-devel \
        procps \
        python3-devel \
        python3-setuptools \
        chrpath \
        mariadb-connector-c-devel

      curl -O https://netcologne.dl.sourceforge.net/project/net-snmp/net-snmp/5.9.1/net-snmp-5.9.1.tar.gz
      tar xzf net-snmp-5.9.1.tar.gz
      cd net-snmp-5.9.1
      ./configure
      make -j$(nproc)
      sudo make install

      curl -o paho.mqtt.c.tar.gz https://codeload.github.com/eclipse/paho.mqtt.c/tar.gz/refs/tags/v1.3.10
      tar xzf paho.mqtt.c.tar.gz
      cd paho.mqtt.c-1.3.10
      mkdir build && cd build
      cmake ..
      make -j$(nproc)
      sudo make install

Importing the Greenbone Signing Key
-----------------------------------

To validate the integrity of the downloaded source files,
`GnuPG <https://www.gnu.org/>`_ is used. It requires downloading the
Greenbone Community Signing public key and importing it into the current user's
keychain.

.. code-block::
  :caption: Importing the Greenbone Community Signing key

  curl -f -L https://www.greenbone.net/GBCommunitySigningKey.asc -o /tmp/GBCommunitySigningKey.asc
  gpg --import /tmp/GBCommunitySigningKey.asc

For understanding the validation output of the gpg tool, it is best to mark the
Greenbone Community Signing key as fully trusted.

.. code-block::
  :caption: Setting the trust level for the Greenbone Community Signing key

  echo "8AE4BE429B60A59B311C2E739823FAA60ED1E580:6:" > /tmp/ownertrust.txt
  gpg --import-ownertrust < /tmp/ownertrust.txt
