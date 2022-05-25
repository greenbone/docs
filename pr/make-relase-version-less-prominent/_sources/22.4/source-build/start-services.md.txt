### Starting the Greenbone Community Edition Services

```{important}
When the feed content has been downloaded, the new data must be loaded by
the corresponding daemons. This may take several minutes up to hours, especially
for the initial loading of the data. Without loaded data, scans will contain
incomplete and erroneous results.
```

After starting the Greenbone Community Edition services via systemd, the running
daemons will pick up the feed content and load the data automatically.

```{warning}
Please be aware, even if the {command}`systemctl start` commands are returning
immediately, the **first startup** of the services may take several minutes
or even hours!
```

```{code-block}
:caption: Finally starting the services

sudo systemctl start notus-scanner
sudo systemctl start ospd-openvas
sudo systemctl start gvmd
sudo systemctl start gsad
```

```{code-block}
:caption: Ensuring services are run at every system startup

sudo systemctl enable notus-scanner
sudo systemctl enable ospd-openvas
sudo systemctl enable gvmd
sudo systemctl enable gsad
```

```{code-block}
:caption: Checking the status of the services

sudo systemctl status notus-scanner
sudo systemctl status ospd-openvas
sudo systemctl status gvmd
sudo systemctl status gsad
```
