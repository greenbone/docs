.. tabs::
  .. tab:: Debian/Fedora/CentOS
    .. code-block::
      :caption: Installing notus-scanner

      cd $SOURCE_DIR/notus-scanner-$NOTUS_VERSION

      mkdir -p $INSTALL_DIR/notus-scanner

      python3 -m pip install --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR/notus-scanner --no-warn-script-location .

      sudo cp -rv $INSTALL_DIR/notus-scanner/* /

  .. tab:: Ubuntu
    .. code-block::
      :caption: Installing notus-scanner

      cd $SOURCE_DIR/notus-scanner-$NOTUS_VERSION

      mkdir -p $INSTALL_DIR/notus-scanner

      python3 -m pip install --root=$INSTALL_DIR/notus-scanner --no-warn-script-location .

      sudo cp -rv $INSTALL_DIR/notus-scanner/* /
