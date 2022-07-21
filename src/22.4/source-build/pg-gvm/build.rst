.. code-block::
  :caption: Building pg-gvm

  mkdir -p $BUILD_DIR/pg-gvm && cd $BUILD_DIR/pg-gvm

  cmake $SOURCE_DIR/gvmd-$GVMD_VERSION \
    -DCMAKE_BUILD_TYPE=Release sudo make install

.. code-block::
  :caption: Installing pg-gvm

  sudo make install

