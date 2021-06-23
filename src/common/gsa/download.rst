Building the web application GSA requires the installation of several JavaScript
dependencies. These dependencies can be downloaded automatically by *yarn* (or
*npm*) during the build process.

However, for offline build and reliability, all GSA
releases provide a tarball with all required dependencies that can be used to
avoid additional downloads via *yarn*.

.. code-block::
  :caption: Downloading the gsa sources

  curl -L https://github.com/greenbone/gsa/archive/refs/tags/v$GVM_VERSION.tar.gz -o $SOURCE_DIR/gsa-$GVM_VERSION.tar.gz
  curl -L https://github.com/greenbone/gsa/releases/download/v$GVM_VERSION/gsa-$GVM_VERSION.tar.gz.sig -o $SOURCE_DIR/gsa-$GVM_VERSION.tar.gz.sig
  curl -L https://github.com/greenbone/gsa/releases/download/v$GVM_VERSION/gsa-node-modules-$GVM_VERSION.tar.gz -o $SOURCE_DIR/gsa-node-modules-$GVM_VERSION.tar.gz
  curl -L https://github.com/greenbone/gsa/releases/download/v$GVM_VERSION/gsa-node-modules-$GVM_VERSION.tar.gz.sig -o $SOURCE_DIR/gsa-node-modules-$GVM_VERSION.tar.gz.sig

.. code-block::
  :caption: Verifying the source files

  gpg --verify $SOURCE_DIR/gsa-$GVM_VERSION.tar.gz.sig $SOURCE_DIR/gsa-$GVM_VERSION.tar.gz
  gpg --verify $SOURCE_DIR/gsa-node-modules-$GVM_VERSION.tar.gz.sig $SOURCE_DIR/gsa-node-modules-$GVM_VERSION.tar.gz

The output of both commands should be similar to:

.. code-block:: none

  gpg: Signature made Fri Apr 16 08:31:02 2021 UTC
  gpg:                using RSA key 9823FAA60ED1E580
  gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]

If the signatures are valid, the two tarballs can be extracted.

.. code-block::

  tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/gsa-$GVM_VERSION.tar.gz
  tar -C $SOURCE_DIR/gsa-$GVM_VERSION/gsa -xvzf $SOURCE_DIR/gsa-node-modules-$GVM_VERSION.tar.gz
