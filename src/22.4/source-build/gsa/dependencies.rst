.. note::

  GSA is a JavaScript based web application. For maintaining the JavaScript
  dependencies `yarn`_ is used. In Debian based distributions the package for
  installing yarn is called **yarnpkg**. Also be aware the command to start yarn
  is also named **yarnpkg** when installing from a Debian package.

.. code-block::
  :caption: Debian install nodejs 14

  export NODE_VERSION=node_14.x
  export KEYRING=/usr/share/keyrings/nodesource.gpg
  export DISTRIBUTION="$(lsb_release -s -c)"

  curl -fsSL https://deb.nodesource.com/gpgkey/nodesource.gpg.key | gpg --dearmor | sudo tee "$KEYRING" >/dev/null
  gpg --no-default-keyring --keyring "$KEYRING" --list-keys

  echo "deb [signed-by=$KEYRING] https://deb.nodesource.com/$NODE_VERSION $DISTRIBUTION main" | sudo tee /etc/apt/sources.list.d/nodesource.list
  echo "deb-src [signed-by=$KEYRING] https://deb.nodesource.com/$NODE_VERSION $DISTRIBUTION main" | sudo tee -a /etc/apt/sources.list.d/nodesource.list


  sudo apt update
  sudo apt install -y nodejs

.. code-block::
  :caption: Install yarn

  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
  echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

  sudo apt update
  sudo apt install -y yarn

.. _yarn: https://classic.yarnpkg.com/

.. code-block::
  :caption: Fedora install nodejs 14

  sudo dnf module enable nodejs:14 -y
  sudo dnf install -y nodejs yarnpkg nodejs-typescript

