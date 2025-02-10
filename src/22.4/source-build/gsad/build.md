```{code-block}
:caption: Building gsad

mkdir -p $BUILD_DIR/gsad

cmake \
  -S $SOURCE_DIR/gsad-$GSAD_VERSION \
  -B $BUILD_DIR/gsad \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release \
  -DSYSCONFDIR=/etc \
  -DLOCALSTATEDIR=/var \
  -DGVMD_RUN_DIR=/run/gvmd \
  -DGSAD_RUN_DIR=/run/gsad \
  -DGVM_LOG_DIR=/var/log/gvm \
  -DLOGROTATE_DIR=/etc/logrotate.d

cmake --build $BUILD_DIR/gsad -j$(nproc)
```

```{code-block}
:caption: Installing gsad

mkdir -p $INSTALL_DIR/gsad && cd $BUILD_DIR/gsad

make DESTDIR=$INSTALL_DIR/gsad install

sudo cp -rv $INSTALL_DIR/gsad/* /
```
