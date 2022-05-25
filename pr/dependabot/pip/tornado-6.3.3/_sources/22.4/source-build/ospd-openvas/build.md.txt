```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
    .. code-block::
      :caption: Installing ospd-openvas

      cd $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION

      mkdir -p $INSTALL_DIR/ospd-openvas

      python3 -m pip install --root=$INSTALL_DIR/ospd-openvas --no-warn-script-location .

      sudo cp -rv $INSTALL_DIR/ospd-openvas/* /

  .. tab:: Fedora/CentOS
    .. code-block::
      :caption: Installing ospd-openvas

      cd $SOURCE_DIR/ospd-openvas-$OSPD_OPENVAS_VERSION

      mkdir -p $INSTALL_DIR/ospd-openvas

      python3 -m pip install --prefix=$INSTALL_PREFIX --root=$INSTALL_DIR/ospd-openvas --no-warn-script-location .

      sudo cp -rv $INSTALL_DIR/ospd-openvas/* /
```
