*openvas-smb* is a helper module for *openvas-scanner*. It includes libraries
(openvas-wmiclient/openvas-wincmd) to interface with Microsoft Windows Systems
through the Windows Management Instrumentation API and a winexe binary to
execute processes remotely on that system.

It is an optional dependency of *openvas-scanner* but is required for scanning
Windows-based systems.

```{warning}
*openvas-smb* doesn't work on CentOS at the moment!
It is not a hard requirement.
```

```{code-block}
:caption: Setting the openvas-smb version to use

export OPENVAS_SMB_VERSION=22.5.3
```

```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
     :caption: Required dependencies for openvas-smb

     sudo apt install -y \
       gcc-mingw-w64 \
       libgnutls28-dev \
       libglib2.0-dev \
       libpopt-dev \
       libunistring-dev \
       heimdal-dev \
       perl-base

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for openvas-smb

     sudo dnf install -y \
       glib2-devel \
       gnutls-devel \
       popt-devel \
       mingw64-gcc \
       libunistring-devel \
       heimdal-devel \
       perl

       cp /usr/lib64/heimdal/lib/pkgconfig/heimdal-gssapi.pc /lib64/pkgconfig/heimdal-gssapi.pc
       cp /usr/lib64/heimdal/lib/pkgconfig/heimdal-krb5.pc /lib64/pkgconfig/heimdal-krb5.pc
```

```{code-block}
:caption: Downloading the openvas-smb sources

curl -f -L https://github.com/greenbone/openvas-smb/archive/refs/tags/v$OPENVAS_SMB_VERSION.tar.gz -o $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz
curl -f -L https://github.com/greenbone/openvas-smb/releases/download/v$OPENVAS_SMB_VERSION/openvas-smb-v$OPENVAS_SMB_VERSION.tar.gz.asc -o $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz.asc
```

```{code-block}
:caption: Verifying the source file

gpg --verify $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz.asc $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz
```

The output of the last command should be similar to:

```{include} /22.4/source-build/verify.md
```

If the signature is valid, the tarball can be extracted.

```
tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION.tar.gz
```

```{code-block}
:caption: Building openvas-smb

mkdir -p $BUILD_DIR/openvas-smb && cd $BUILD_DIR/openvas-smb

cmake $SOURCE_DIR/openvas-smb-$OPENVAS_SMB_VERSION \
  -DCMAKE_INSTALL_PREFIX=$INSTALL_PREFIX \
  -DCMAKE_BUILD_TYPE=Release

make -j$(nproc)
```

```{code-block}
:caption: Installing openvas-smb

mkdir -p $INSTALL_DIR/openvas-smb

make DESTDIR=$INSTALL_DIR/openvas-smb install

sudo cp -rv $INSTALL_DIR/openvas-smb/* /
```
