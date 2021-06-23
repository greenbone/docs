.. code-block::
  :caption: Downloading the ospd sources

  curl -L https://github.com/greenbone/ospd/archive/refs/tags/v$GVM_VERSION.tar.gz -o $SOURCE_DIR/ospd-$GVM_VERSION.tar.gz
  curl -L https://github.com/greenbone/ospd/releases/download/v$GVM_VERSION/ospd-$GVM_VERSION.tar.gz.sig -o $SOURCE_DIR/ospd-$GVM_VERSION.tar.gz.sig

.. code-block::
  :caption: Downloading the ospd-openvas sources

  curl -L https://github.com/greenbone/ospd-openvas/archive/refs/tags/v$GVM_VERSION.tar.gz -o $SOURCE_DIR/ospd-openvas-$GVM_VERSION.tar.gz
  curl -L https://github.com/greenbone/ospd-openvas/releases/download/v$GVM_VERSION/ospd-openvas-$GVM_VERSION.tar.gz.sig -o $SOURCE_DIR/ospd-openvas-$GVM_VERSION.tar.gz.sig

.. code-block::
  :caption: Verifying the source files

  gpg --verify $SOURCE_DIR/ospd-$GVM_VERSION.tar.gz.sig $SOURCE_DIR/ospd-$GVM_VERSION.tar.gz
  gpg --verify $SOURCE_DIR/ospd-openvas-$GVM_VERSION.tar.gz.sig $SOURCE_DIR/ospd-openvas-$GVM_VERSION.tar.gz

The output of the last command should be similar to:

.. code-block:: none

  gpg: Signature made Fri Apr 16 08:31:02 2021 UTC
  gpg:                using RSA key 9823FAA60ED1E580
  gpg: Good signature from "Greenbone Community Feed integrity key" [ultimate]

If the signatures are valid, the tarballs can be extracted.

.. code-block::

  tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/ospd-$GVM_VERSION.tar.gz
  tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/ospd-openvas-$GVM_VERSION.tar.gz
