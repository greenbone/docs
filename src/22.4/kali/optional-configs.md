## Optional Configurations

The Greenbone CE Kali Linux installation relies on the sub-system components as the [source code installation](/22.4/source-build/index.md) and all configuration options are available. Here we will cover some common custom configurations.

### Configure Remote Access To The Web Interface

By default Greenbone CE is installed with only `localhost` access to the {term}`GSA` web interface. This means Greenbone CE can only be accessed via the IP address `127.0.0.1`. To enable remote access to the web interface, the {term}`gsad` systemd service file must be modified.

```{code-block}
:caption: Find the location of the gsad.sevice file
sudo find / -name gsad.service -type f
```  

Edit the contents of the `gsad.service` systemd service file:

```{code-block}
:caption: Use nano to edit the gsad.sevice file
nano /usr/lib/systemd/service/gsad.service
```

Change the value of the `--listen` argument to `0.0.0.0` and optionally change the value of `--port` to the standard SSL/TLS port 443:

```diff
-ExecStart=/usr/local/sbin/gsad --foreground --listen=127.0.0.1 --port=9392
+ExecStart=/usr/local/sbin/gsad --foreground --listen=0.0.0.0 --port=443
```

### Setting A Password Policy

The password policy configuration file defines the rules for user passwords such as minimum length, complexity, and expiration period, ensuring that all user passwords adhere to the desired security standards.

```{code-block}
:caption: Edit the Greenbone CE password policy configuration
nano /etc/gvm/pwpolicy.conf
```
