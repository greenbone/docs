.. code-block::
  :caption: Installing notus-scanner

  cd $SOURCE_DIR/notus-scanner-$NOTUS_VERSION

  mkdir -p $INSTALL_DIR/notus-scanner

  python3 -m venv $BUILD_DIR/notus-scanner-build-env --system-site-packages && \
    source $BUILD_DIR/notus-scanner-build-env/bin/activate && \
    python3 -m pip install --prefix $INSTALL_PREFIX --root=$INSTALL_DIR/notus-scanner --no-warn-script-location . && \
    deactivate

  sudo cp -rv $INSTALL_DIR/notus-scanner/* /

