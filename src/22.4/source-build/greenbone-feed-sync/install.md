The latest version of *greeenbone-feed-sync* can be installed by using standard
Python installation tool *pip*.

To install it system-wide for all users without running *pip* as root user, the
following commands can be used:

```{eval-rst}
.. tabs::
  .. tab:: Debian/Fedora/CentOS
    .. code-block::
      :caption: Installing greenbone-feed-sync system-wide for all users

      mkdir -p $INSTALL_DIR/greenbone-feed-sync

      python3 -m pip install --prefix $INSTALL_PREFIX --root=$INSTALL_DIR/greenbone-feed-sync --no-warn-script-location greenbone-feed-sync

      sudo cp -rv $INSTALL_DIR/greenbone-feed-sync/* /

  .. tab:: Ubuntu
    .. code-block::
      :caption: Installing greenbone-feed-sync system-wide for all users

      mkdir -p $INSTALL_DIR/greenbone-feed-sync

      python3 -m pip install --root=$INSTALL_DIR/greenbone-feed-sync --no-warn-script-location greenbone-feed-sync

      sudo cp -rv $INSTALL_DIR/greenbone-feed-sync/* /
```
