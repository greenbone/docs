```{code-block}
:caption: Downloading the pg-gvm sources

curl -f -L https://github.com/greenbone/pg-gvm/archive/refs/tags/v$PG_GVM_VERSION.tar.gz -o $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION.tar.gz
curl -f -L https://github.com/greenbone/pg-gvm/releases/download/v$PG_GVM_VERSION/pg-gvm-$PG_GVM_VERSION.tar.gz.asc -o $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION.tar.gz.asc
```

```{code-block}
:caption: Verifying the source file

gpg --verify $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION.tar.gz.asc $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION.tar.gz
```

The output of the last command should be similar to:

```{include} /22.4/source-build/verify.md
```

If the signature is valid the tarball can be extracted.

```
tar -C $SOURCE_DIR -xvzf $SOURCE_DIR/pg-gvm-$PG_GVM_VERSION.tar.gz
```
