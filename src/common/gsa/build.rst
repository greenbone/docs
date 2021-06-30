.. code-block::
  :caption: Building gsa

  mkdir $BUILD_DIR/gsa && cd $BUILD_DIR/gsa

  cmake $SOURCE_DIR/gsa-$GSA_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DSYSCONFDIR=/etc \
    -DLOCALSTATEDIR=/var

  make -j6

.. code-block::
  :caption: Installing gsa

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*

