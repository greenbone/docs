```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
    .. code-block::
      :caption: Installing openvas-scanner

      cd $SOURCE_DIR/openvas-scanner-$NOTUS_VERSION/rust/openvasd

      cargo build --release

      sudo cp -v ../target/release/openvasd /usr/local/bin/

  .. tab:: Fedora/CentOS
    .. code-block::
      :caption: Installing openvas-scanner


      cd $SOURCE_DIR/openvas-scanner-$NOTUS_VERSION/rust/openvasd

      cargo build --release

      sudo cp -v ../target/release/openvasd /usr/local/bin/
```
