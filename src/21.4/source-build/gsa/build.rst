.. tabs::
  .. tab:: Debian

    .. code-block::
      :caption: Building gsa

      cd $SOURCE_DIR/gsa-$GSA_VERSION

      rm -rf build

      yarnpkg
      yarnpkg build


.. code-block::
  :caption: Installing gsa

  sudo mkdir -p $INSTALL_PREFIX/share/gvm/gsad/web/
  sudo cp -r build/* $INSTALL_PREFIX/share/gvm/gsad/web/
