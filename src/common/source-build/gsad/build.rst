.. code-block::
  :caption: Building gsad

  mkdir -p $BUILD_DIR/gsad && cd $BUILD_DIR/gsad

  cmake $SOURCE_DIR/gsad-$GSAD_VERSION \
    -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
    -DCMAKE_BUILD_TYPE=Release \
    -DSYSCONFDIR=/etc \
    -DLOCALSTATEDIR=/var \
    -DGVMD_RUN_DIR=/run/gvmd \
    -DGSAD_RUN_DIR=/run/gsad \
    -DLOGROTATE_DIR=/etc/logrotate.d

  make -j$(nproc)

.. code-block::
  :caption: Installing gsad

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  
