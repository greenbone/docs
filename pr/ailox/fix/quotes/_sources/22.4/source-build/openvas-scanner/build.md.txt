```{code-block}
:caption: Building openvas-scanner

mkdir -p $BUILD_DIR/openvas-scanner

cmake \
  -S $SOURCE_DIR/openvas-scanner-$OPENVAS_SCANNER_VERSION \
  -B $BUILD_DIR/openvas-scanner \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release \
  -DSYSCONFDIR=/etc \
  -DLOCALSTATEDIR=/var \
  -DOPENVAS_FEED_LOCK_PATH=/var/lib/openvas/feed-update.lock \
  -DOPENVAS_RUN_DIR=/run/ospd

cmake --build $BUILD_DIR/openvas-scanner -j$(nproc)
```

```{code-block}
:caption: Installing openvas-scanner

mkdir -p $INSTALL_DIR/openvas-scanner && cd $BUILD_DIR/openvas-scanner

make DESTDIR=$INSTALL_DIR/openvas-scanner install

sudo cp -rv $INSTALL_DIR/openvas-scanner/* /
```

As of version 23.0 the `openvasd_server` configuration needs to be set to a running `OpenVASD` instance.

```{code-block}
printf "table_driven_lsc = yes\n" | sudo tee /etc/openvas/openvas.conf
printf "openvasd_server = http://127.0.0.1:3000\n" | sudo tee -a /etc/openvas/openvas.conf
```
