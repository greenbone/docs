.. note::

  GSA is a JavaScript based web application. For maintaining the JavaScript
  dependencies, `yarn`_ is used.

.. tabs::
  .. tab:: Debian/Ubuntu

    .. note::

      In Debian-based distributions, the package for installing yarn is called
      **yarnpkg**. Be aware that the command to start yarn is also named
      **yarnpkg** when installing from a Debian package.

    .. code-block::
      :caption: Required dependencies for GSA

      sudo apt install -y \
        nodejs \
        yarnpkg

  .. tab:: Fedora
    .. code-block::
      :caption: Install nodejs 14

      sudo dnf module enable nodejs:14 -y
      sudo dnf install -y nodejs yarnpkg nodejs-typescript

  .. tab:: CentOS
   .. code-block::
     :caption: Install nodejs 14

     curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -
     sudo dnf install -y nodejs yarnpkg

.. _yarn: https://classic.yarnpkg.com/
