.. code-block::
  :caption: Building gvm-libs

  mkdir -p $BUILD_DIR/gvm-libs && cd $BUILD_DIR/gvm-libs

  cmake $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DSYSCONFDIR=/etc \
    -DLOCALSTATEDIR=/var \
    -DGVM_PID_DIR=/run/gvm

  make -j$(nproc)

.. code-block::
  :caption: Installing gvm-libs

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*

