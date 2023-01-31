.. code-block::
  :caption: Installing ospd-openvas

  cd $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION

  mkdir -p $INSTALL_DIR/ospd-openvas

  python3 -m venv $BUILD_DIR/ospd-openvas-build-env --system-site-packages && \
    source $BUILD_DIR/ospd-openvas-build-env/bin/activate && \
    python3 -m pip install --prefix $INSTALL_PREFIX --root=$INSTALL_DIR/ospd-openvas --no-warn-script-location . && \
    deactivate

  sudo cp -rv $INSTALL_DIR/ospd-openvas/* /
