```
mkdir -p $INSTALL_DIR/openvasd/usr/local/bin
cd $SOURCE_DIR/openvas-scanner-$OPENVAS_DAEMON/rust/src/openvasd
cargo build --release

cd $SOURCE_DIR/openvas-scanner-$OPENVAS_DAEMON/rust/src/scannerctl
cargo build --release

sudo cp -v ../../target/release/openvasd $INSTALL_DIR/openvasd/usr/local/bin/
sudo cp -v ../../target/release/scannerctl $INSTALL_DIR/openvasd/usr/local/bin/
sudo cp -rv $INSTALL_DIR/openvasd/* /
```
