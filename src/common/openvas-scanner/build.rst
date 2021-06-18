.. code-block::
  :caption: Building openvas-scanner

  mkdir $BUILD_DIR/openvas-scanner && cd $BUILD_DIR/openvas-scanner

  cmake $SOURCE_DIR/openvas-scanner-$GVM_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DSYSCONFDIR=/etc \
    -DLOCALSTATEDIR=/var \
    -DOPENVAS_FEED_LOCK_PATH=/var/lib/openvas/feed-update.lock \
    -DOPENVAS_RUN_DIR=/var/run/ospd

  make -j6

.. code-block::
  :caption: Installing openvas-scanner

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*
