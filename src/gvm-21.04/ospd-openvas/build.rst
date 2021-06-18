.. code-block::
  :caption: Installing ospd

  cd $SOURCE_DIR/ospd-$GVM_VERSION

  python3 -m pip install . --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR

.. code-block::
  :caption: Installing ospd-openvas

  cd $SOURCE_DIR/ospd-openvas-$GVM_VERSION

  python3 -m pip install . --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR --no-warn-script-location

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*
