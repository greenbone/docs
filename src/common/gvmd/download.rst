.. code-block::
  :caption: Download of the gvm-libs sources

  curl -L https://github.com/greenbone/gvmd/archive/refs/tags/v$GVM_VERSION.tar.gz -o $SOURCE_DIR/gvmd-$GVM_VERSION.tar.gz
  curl -L https://github.com/greenbone/gvmd/releases/download/v$GVM_VERSION/gvmd-$GVM_VERSION.tar.gz.asc -o $SOURCE_DIR/gvmd-$GVM_VERSION.tar.gz.sig

.. code-block::
  :caption: Verifying the source file

  gpg --verify $SOURCE_DIR/gvmd-$GVM_VERSION.tar.gz.sig $SOURCE_DIR/gvmd-$GVM_VERSION.tar.gz

The output of the last command should be similar to

.. code-block:: none

  gpg: Signature made Fri Apr 16 08:31:02 2021 UTC
  gpg:                using RSA key 9823FAA60ED1E580
  gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]

If the signature is valid the tarball can be extracted

.. code-block::

  tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/gvmd-$GVM_VERSION.tar.gz
