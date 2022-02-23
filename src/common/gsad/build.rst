.. code-block::
  :caption: Building gsa

  mkdir -p $BUILD_DIR/gsa && cd $BUILD_DIR/gsa

  cmake $SOURCE_DIR/gsa-$GSA_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DSYSCONFDIR=/etc \
    -DLOCALSTATEDIR=/var \
    -DGVM_RUN_DIR=/run/gvm \
    -DGSAD_PID_DIR=/run/gvm \
    -DLOGROTATE_DIR=/etc/logrotate.d

  make -j$(nproc)

.. code-block::
  :caption: Installing gsa

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*

