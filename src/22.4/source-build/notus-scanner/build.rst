.. code-block::
  :caption: Installing notus-scanner

  cd $SOURCE_DIR/notus-scanner-$NOTUS_VERSION

  python3 -m pip install . --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR --no-warn-script-location

  sudo cp -rv $INSTALL_DIR/* /

  rm -rfi $INSTALL_DIR/*
