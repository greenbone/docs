.. code-block::
  :caption: Building gvmd

  mkdir -p $BUILD_DIR/gvmd && cd $BUILD_DIR/gvmd

  cmake $SOURCE_DIR/gvmd-$GVMD_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DLOCALSTATEDIR=/var \
    -DSYSCONFDIR=/etc \
    -DGVM_DATA_DIR=/var \
    -DGVM_RUN_DIR=/run/gvm \
    -DOPENVAS_DEFAULT_SOCKET=/run/ospd/ospd-openvas.sock \
    -DGVM_FEED_LOCK_PATH=/var/lib/gvm/feed-update.lock \
    -DSYSTEMD_SERVICE_DIR=/lib/systemd/system \
    -DDEFAULT_CONFIG_DIR=/etc/default \
    -DLOGROTATE_DIR=/etc/logrotate.d

  make -j$(nproc)

.. code-block::
  :caption: Installing gvmd

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*
