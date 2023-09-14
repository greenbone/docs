```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
      :caption: Building gvm-libs

      mkdir -p $BUILD_DIR/gvm-libs && cd $BUILD_DIR/gvm-libs

      cmake $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION \
        -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
        -DCMAKE_BUILD_TYPE=Release \
        -DSYSCONFDIR=/etc \
        -DLOCALSTATEDIR=/var

      make -j$(nproc)
  .. tab:: Fedora/CentOS
   .. code-block::
      :caption: Building gvm-libs
 
      mkdir -p $BUILD_DIR/gvm-libs && cd $BUILD_DIR/gvm-libs

      cmake $SOURCE_DIR/gvm-libs-$GVM_LIBS_VERSION \
        -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
        -DCMAKE_BUILD_TYPE=Release \
        -DSYSCONFDIR=/etc \
        -DLOCALSTATEDIR=/var \
        -DCMAKE_C_FLAGS="-O2" \
        -DCMAKE_C_FLAGS_RELEASE="-O2"

      make -j$(nproc)
```

```{code-block}
:caption: Installing gvm-libs

mkdir -p $INSTALL_DIR/gvm-libs

make DESTDIR=$INSTALL_DIR/gvm-libs install

sudo cp -rv $INSTALL_DIR/gvm-libs/* /
```
