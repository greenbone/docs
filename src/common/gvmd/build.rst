.. code-block::
  :caption: Building gvmd

  mkdir $BUILD_DIR/gvmd && cd $BUILD_DIR/gvmd

  cmake $SOURCE_DIR/gvmd-$GVM_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DLOCALSTATEDIR=/var \
    -DSYSCONFDIR=/etc \
    -DGVM_DATA_DIR=/var \
    -DGVM_RUN_DIR=/run/gvm \
    -DSYSTEMD_SERVICE_DIR=/lib/systemd/system \
    -DDEFAULT_CONFIG_DIR=/etc/default \
    -DLOGROTATE_DIR=/etc/logrotate.d

  make -j6

.. code-block::
  :caption: Installing gvmd

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*
