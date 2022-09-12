.. code-block::
  :caption: Installing ospd-openvas

  cd $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION

  python3 -m pip install . --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR --no-warn-script-location

  sudo cp -rv $INSTALL_DIR/* /

  