Building the web application GSA requires the installation of several JavaScript
dependencies. These dependencies have to be downloaded automatically by *yarn*
(or *npm*) during the build process.

.. code-block::
  :caption: Downloading the gsa sources

  curl -f -L https://github.com/greenbone/gsa/archive/refs/tags/v$GSA_VERSION.tar.gz -o $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz
  curl -f -L https://github.com/greenbone/gsa/releases/download/v$GSA_VERSION/gsa-$GSA_VERSION.tar.gz.asc -o $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz.asc

.. code-block::
  :caption: Verifying the source files

  gpg --verify $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz.asc $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz

The output of both commands should be similar to:

.. include:: /common/verify.rst

If the signatures are valid, the two tarballs can be extracted.

.. code-block::

  tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/gsa-$GSA_VERSION.tar.gz
