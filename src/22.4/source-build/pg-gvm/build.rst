.. tabs::
  .. tab:: Debian
    .. code-block::
      :caption: Building pg-gvm

      mkdir -p $BUILD_DIR/pg-gvm && cd $BUILD_DIR/pg-gvm

      cmake $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION \
        -DCMAKE_BUILD_TYPE=Release

      make -j$(nproc)

  .. tab:: Ubuntu
    .. code-block::
      :caption: Building pg-gvm

      mkdir -p $BUILD_DIR/pg-gvm && cd $BUILD_DIR/pg-gvm

      cmake $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION \
        -DCMAKE_BUILD_TYPE=Release \
        -DPostgreSQL_TYPE_INCLUDE_DIR=/usr/include/postgresql

      make -j$(nproc)

  .. tab:: Fedora/CentOS
    .. code-block::
      :caption: Building pg-gvm

      mkdir -p $BUILD_DIR/pg-gvm && cd $BUILD_DIR/pg-gvm

      cmake $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION \
        -DCMAKE_BUILD_TYPE=Release

      make -j$(nproc)

.. code-block::
  :caption: Installing pg-gvm

  make DESTDIR=$INSTALL_DIR install

  sudo cp -rv $INSTALL_DIR/* /

  rm -rf $INSTALL_DIR/*

