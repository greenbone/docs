*OpenVASD* is used for detecting vulnerable products.

Currently only the [notus](https://greenbone.github.io/scanner-api/#/notus/notus_run) service is integrated into gvmd.
That means that `openvas` is using `openvasd` for static version checks if a scan with ssh credentials is started and packages got found.

If you want to enable the full functionality you either need to adapt the `openvasd.service` file and remove the `--mode service_notus` flag and create a [configuration file](https://github.com/greenbone/openvas-scanner/blob/main/rust/examples/openvasd/config.example.toml) within `/etc/openvasd/openvasd.toml` or adapt the [arguments](https://github.com/greenbone/openvas-scanner/tree/main/rust/src/openvasd#options) within `openvasd.service` if you don't want to create a configuration file.

For more information see:

- <https://greenbone.github.io/scanner-api/>
- <https://github.com/greenbone/openvas-scanner/tree/main/rust/src/openvasd>
- <https://github.com/greenbone/openvas-scanner/blob/main/rust/examples/openvasd/config.example.toml>
