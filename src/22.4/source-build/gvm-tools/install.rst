The latest version of *gvm-tools* can be installed for each user via the
standard Python installation tool *pip*.

.. code-block::
  :caption: Installing gvm-tools for the current user

  python3 -m pip install --user gvm-tools

To install it system-wide without running *pip* as root user, the following
commands can be used:

.. code-block::
  :caption: Installing gvm-tools system-wide

  mkdir -p $INSTALL_DIR/gvm-tools

  python3 -m venv $BUILD_DIR/gvm-tools-build-env --system-site-packages && \
    source $BUILD_DIR/gvm-tools-build-env/bin/activate && \
    python3 -m pip install --prefix $INSTALL_PREFIX --root=$INSTALL_DIR/gvm-tools --no-warn-script-location gvm-tools && \
    deactivate

  sudo cp -rv $INSTALL_DIR/gvm-tools/* /

