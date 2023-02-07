The latest version of *greeenbone-feed-sync* can be installed by using standard
Python installation tool *pip*.

To install it system-wide for all users without running *pip* as root user, the
following commands can be used:

.. code-block::
  :caption: Installing greenbone-feed-sync system-wide for all users

  mkdir -p $INSTALL_DIR/greenbone-feed-sync

  python3 -m venv $BUILD_DIR/greenbone-feed-sync-build-env --system-site-packages && \
    source $BUILD_DIR/greenbone-feed-sync-build-env/bin/activate && \
    python3 -m pip install --prefix $INSTALL_PREFIX --root=$INSTALL_DIR/greenbone-feed-sync --no-warn-script-location greenbone-feed-sync && \
    deactivate

  sudo cp -rv $INSTALL_DIR/greenbone-feed-sync/* /
