.. code-block::
  :caption: Building gsa

  cd $SOURCE_DIR/gsa-$GSA_VERSION

  rm -rf build

  yarn
  yarn build


.. code-block::
  :caption: Installing gsa

  sudo mkdir -p $INSTALL_PREFIX/share/gvm/gsad/web/
  sudo cp -r build/* $INSTALL_PREFIX/share/gvm/gsad/web/

