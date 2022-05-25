The latest version of *gvm-tools* can be installed for each user via the
standard Python installation tool *pip*.

Alternatively to install it system-wide without running *pip* as root user, the
following commands can be used:

```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
    .. code-block::
      :caption: Installing gvm-tools system-wide

      mkdir -p $INSTALL_DIR/gvm-tools

      python3 -m pip install --root=$INSTALL_DIR/gvm-tools --no-warn-script-location gvm-tools

      sudo cp -rv $INSTALL_DIR/gvm-tools/* /

  .. tab:: Fedora/CentOS
    .. code-block::
      :caption: Installing gvm-tools system-wide

      mkdir -p $INSTALL_DIR/gvm-tools

      python3 -m pip install --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR/gvm-tools --no-warn-script-location gvm-tools

      sudo cp -rv $INSTALL_DIR/gvm-tools/* /
```
