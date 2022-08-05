.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Building gvmd

     mkdir -p $BUILD_DIR/gvmd && cd $BUILD_DIR/gvmd

     cmake $SOURCE_DIR/gvmd-$GVMD_VERSION \
       -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
       -DCMAKE_BUILD_TYPE=Release \
       -DLOCALSTATEDIR=/var \
       -DSYSCONFDIR=/etc \
       -DGVM_DATA_DIR=/var \
       -DGVMD_RUN_DIR=/run/gvmd \
       -DOPENVAS_DEFAULT_SOCKET=/run/ospd/ospd-openvas.sock \
       -DGVM_FEED_LOCK_PATH=/var/lib/gvm/feed-update.lock \
       -DSYSTEMD_SERVICE_DIR=/lib/systemd/system \
       -DLOGROTATE_DIR=/etc/logrotate.d

     make -j$(nproc)

  .. tab:: Fedora
   .. code-block::
     :caption: Building gvmd

     mkdir -p $BUILD_DIR/gvmd && cd $BUILD_DIR/gvmd

     cmake $SOURCE_DIR/gvmd-$GVMD_VERSION \
       -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
       -DCMAKE_BUILD_TYPE=Release \
       -DLOCALSTATEDIR=/var \
       -DSYSCONFDIR=/etc \
       -DGVM_DATA_DIR=/var \
       -DGVMD_RUN_DIR=/run/gvmd \
       -DOPENVAS_DEFAULT_SOCKET=/run/ospd/ospd-openvas.sock \
       -DGVM_FEED_LOCK_PATH=/var/lib/gvm/feed-update.lock \
       -DSYSTEMD_SERVICE_DIR=/lib/systemd/system \
       -DLOGROTATE_DIR=/etc/logrotate.d

     sudo mkdir /usr/include/postgresql
     sudo cp /usr/include/libpq-fe.h /usr/include/postgresql/libpq-fe.h

     make -j$(nproc)

  .. tab:: CentOS
   .. code-block::
     :caption: Building gvmd

     mkdir -p $BUILD_DIR/gvmd && cd $BUILD_DIR/gvmd

     cmake $SOURCE_DIR/gvmd-$GVMD_VERSION \
       -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
       -DCMAKE_BUILD_TYPE=Release \
       -DLOCALSTATEDIR=/var \
       -DSYSCONFDIR=/etc \
       -DGVM_DATA_DIR=/var \
       -DGVMD_RUN_DIR=/run/gvmd \
       -DOPENVAS_DEFAULT_SOCKET=/run/ospd/ospd-openvas.sock \
       -DGVM_FEED_LOCK_PATH=/var/lib/gvm/feed-update.lock \
       -DSYSTEMD_SERVICE_DIR=/lib/systemd/system \
       -DLOGROTATE_DIR=/etc/logrotate.d

     sudo mkdir /usr/include/postgresql
     sudo cp /usr/include/libpq-fe.h /usr/include/postgresql/libpq-fe.h

     make -j$(nproc)

.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Installing gvmd

     make DESTDIR=$INSTALL_DIR install

     sudo cp -rv $INSTALL_DIR/* /

     rm -rf $INSTALL_DIR/*

  .. tab:: Fedora
   .. code-block::
     :caption: Installing gvmd

     make DESTDIR=$INSTALL_DIR install

     sudo cp -rv $INSTALL_DIR/* /

     rm -rf $INSTALL_DIR/*

     sudo rm /usr/include/postgresql/libpq-fe.h && sudo rmdir /usr/include/postgresql

  .. tab:: CentOS
   .. code-block::
     :caption: Installing gvmd

     make DESTDIR=$INSTALL_DIR install

     sudo cp -rv $INSTALL_DIR/* /

     rm -rf $INSTALL_DIR/*

     sudo rm /usr/include/postgresql/libpq-fe.h && sudo rmdir /usr/include/postgresql

