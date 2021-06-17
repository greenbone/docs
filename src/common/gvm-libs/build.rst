.. code-block::
  :caption: Building gvm-libs

  mkdir $BUILD_DIR/gvm-libs
  cd $BUILD_DIR/gvm-libs

  cmake $SOURCE_DIR/gvm-libs-$GVM_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DSYSCONFDIR=/etc \
    -DLOCALSTATEDIR=/var \
    -DGVM_PID_DIR=/var/run/gvm

  make -j6

.. code-block::
  :caption: Installing gvm-libs

  make DESTDIR=$INSTALL_DIR install

