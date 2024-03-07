
# Feed Sync Guide
This documentation provides instructions on updating the various feeds for your specific Greenbone version and installation method, as well as information about the legacy feed sync scripts, and some tips for troubleshooting a failed feed sync. Please note that different methods are required for completing a feed sync with the official Greenbone Docker containers. Feed sync information for Docker containers can be [found here](https://greenbone.github.io/docs/latest/22.4/container/workflows.html#performing-a-feed-synchronization).

If you are unable to achieve feed synchronization after reading this guide, or require further assistance with the feed sync process, please consult the [Greenbone community forums](https://forum.greenbone.net/) or contact our support team for guidance.

## A Note About Deprecated Sync Scripts
Please note that there is currently a migration from the older set of bash scripts to a new set of Python-based script with the same names, but with added features. Also, please note that older versions of the Kali Linux distribution came with a wrapper script `gvm-feed-update`. However, this script has been depreciated in favor of using the official Greenbone Python scripts directly.

Usually, legacy feed sync scripts can be identified by their location. The depreciated bash scripts are usually found in the `/usr/local/sbin` or `/usr/sbin` directories, while the newer Python-based scripts are typically located in the `/usr/local/bin` or `$HOME/.local/bin` directories, depending on your installation method.

If you want to check which scripts you have installed you can use the `which` command to identify the active script's path:
```{code-block}
:caption: Verify the path of the active feed command executable
which <feed-command-filename>
```
Once you have identified the active feed sync executable path, you can verify whether it is a legacy bash feed sync script, or the newer Python-based script by checking the file header. The first line of the legacy scripts will be `#!/bin/sh` while the newer versions will be `#!/usr/bin/python3`.
```{code-block}
:caption: Check the shebang to determine the script type
head -1 /path/to/<feed-command-filename>
```

### Deprecated Sync Script Removal
If you have any of the deprecated bash scripts installed, it is recommended to delete them. This ensures a clean transition to the new sync script.

### Legacy Feed Sync Filenames
These are the legacy feed sync files and a description of their functionality:

*   `greenbone-feed-sync`: This is the base script. The `--type <TYPE>` argument is required to specify which data to synchronize (CERT, SCAP, or GVMD_DATA).
*   `greenbone-certdata-sync`: This script is equivalent to `greenbone-feed-sync --type CERT`.
*   `greenbone-scapdata-sync`: This script is equivalent to `greenbone-feed-sync --type SCAP`.
*   `greenbone-nvt-sync`: This script is equivalent to `greenbone-feed-sync --type GVMD_DATA`.

## The New Python Feed Sync Scripts
A set of new Python-based scripts have now replaced the deprecated feed sync scripts mentioned above. The new scripts are supported by **Greenbone version 22.4 and later**. However, older versions are not supported. The new Python-based scripts are now installed by default as of **Greenbone Community Edition version 22.5.0**. For backwards compatibility the new Python scripts have identical names to the original bash scripts.

*   `greenbone-feed-sync`: This is the base script. if no `--type` argument is set, all feed types will be updated. The `--type <TYPE>` argument can be used to specify which data to synchronize. A list of available feed types can be [found here](#available-feed-types).
*   `greenbone-certdata-sync`: This script is equivalent to `greenbone-feed-sync --type cert` and is provided for backwards compatibility only.
*   `greenbone-scapdata-sync`: This script is equivalent to `greenbone-feed-sync --type scap` and is provided for backwards compatibility only.
*   `greenbone-nvt-sync`: This script is equivalent to `greenbone-feed-sync --type gvmd-data` and is provided for backwards compatibility only.

More information about executing the scripts can be [found here](#updating-feeds-with-new-python-script).

### Installation
Python 3.9 and later is supported. Also note that sycing feeds requires the `rsync` tool being installed and available within the operating system **PATH**, which is normally configured as part of Greenbone Community Edition's source code and Docker container installation methods.

#### Install using pipx
You can install the latest stable release of **greenbone-feed-sync** from the Python Package Index (pypi) using [pipx](https://pypa.github.io/pipx/).
```{code-block}
:caption: Installing the package via pipx
python3 -m pipx install greenbone-feed-sync
```

#### Install using pip
NOTE: The pip install command no longer works out-of-the-box in newer distributions like Ubuntu 23.04 because of [PEP 668](https://peps.python.org/pep-0668). Please use the [installation via pipx](https://github.com/greenbone/greenbone-feed-sync/tree/main#install-using-pipx) instead.

You can install the latest stable release of **greenbone-feed-sync** from the Python Package Index (pypi) using [pip](https://pip.pypa.io/).
```{code-block}
:caption: Installing the package via python-pip
python3 -m pip install greenbone-feed-sync
```

## Updating the Greenbone Feeds
### Updating Feeds For Greenbone Docker Containers
Please note that different methods are required for completing a feed sync when using the official **Greenbone Docker containers**, which can be [found here](https://greenbone.github.io/docs/latest/22.4/container/workflows.html#performing-a-feed-synchronization).

### Determining The Script Version In Use
If you are unsure of which version of the feed sync script is active, you should check before you execute the `greenbone-feed-sync` command.One way to check is by using the `--version` argument. The legacy bash scripts will output the GVMD version, while the new Python scripts will output the version of the `greenbone-feed-sync` package itself. Otherwise, the script header can help distinguish which file is in use with certainty.

To check the file header, use the `which` command to determine the path of the command that is executed.

For example:
```{code-block}
:caption: Check the path of the active feed sync script
which greenbone-feed-sync
/usr/local/bin/greenbone-feed-sync
```
Once you determine the path of the executed command you can identify whether it is the new Python-based feed sync command or the legacy bash version. To do that, use the `head` command to print the first line of the script. This will indicate the interpreter used at run-time.

For example:
```{code-block}
:caption: If the new Python-based feed update script is active you will see
head -1 /usr/local/bin/greenbone-feed-sync
#!/usr/bin/python3
```
```{code-block}
:caption: If the legacy bash feed update script is active you will see
head -1 /usr/local/sbin/greenbone-feed-sync
#!/bin/sh
```

### Updating Feeds With New Python Script
By default, when no arguments are passed, the new Python `greenbone-feed-sync` will updated all feed types. For standard installations that follow the [official Greenbone source code install instructions](https://greenbone.github.io/docs/latest/22.4/source-build/index.html), or the [Kali Linux native package installation](https://greenbone.github.io/docs/latest/22.4/kali/index.html), the new Python script should be run with `root`/`sudo` permissions, as it will change its execution context appropriately to the `gvm` or `_gvm` user.

However, for non-standard installations that use a different username and group to execute the Greenbone components, the configured username and group context must be changed via the `greenbone-feed-sync.toml` configuration file. A basic example of how to configure a non-standard user via the `.toml` file can be [found here](https://github.com/greenbone/greenbone-feed-sync/blob/main/README.md#usage-on-kali-linux).

```{code-block}
:caption: Update all feeds with single command
sudo greenbone-feed-sync
```
To update only one feed at a time, the new Python-based command can be used similar to the previous `/usr/sbin/greenbone-feed-sync` bash script command by specifying a feed type.
```{code-block}
:caption: Include the feed type as an argument to update only a specific feed type
sudo greenbone-feed-sync --type <feed-type>
```

#### Available Feed Types
The available feed types are:

* `all`: Same as using the command without specifying a type
* `nvt`: Fetches any newly available vulnerability tests
* `gvmd-data`: Synchronizes GVM data feed which includes port lists, scan configs and report formats
* `scap`: Synchronizes SCAP data feed
* `cert`: Synchronizes CERT data feed
* `notus`: Fetch any newly available NOTUS vulnerability tests
* `nasl`: Fetch any newly available NASL vulnerability tests
* `report-format` or `report-formats`: Fetches any newly available scan report formats
* `scan-config` or `scan-configs`: Fetches any newly available scan configurations
* `port-list` or `port-lists`: Fetches any newly available port lists

#### Other Command Line Arguments
All other settings that can be configured via command line arguments can also be configured from a [`.toml`](https://toml.io/en/) file located at `/etc/gvm/greenbone-feed-sync.toml` or via system environment variables. The configuration settings are checked and loaded in that respective order:

1. The `/etc/gvm/greenbone-feed-sync.toml` configuration file
2. System environment variables
3. Command line arguments at runtime

A complete list of settings are [available here](https://github.com/greenbone/greenbone-feed-sync/blob/main/README.md#settings) and full documentation for the new Python-based feed update script can be [found here](https://github.com/greenbone/greenbone-feed-sync/).

The most basic arguments are:

*  `--help`: Displays list of all available command line arguments
*  `--verbose`: Sets verbose output. `-vvv` provides maximum verbosity.
*  `--version`: Displays the version of the script
*  `--identify`: Displays information about the script, including script ID, name, version, feed name, whether it is restricted or not
*  `--describe`: Displays a description of the script and the feed it synchronizes
*  `--feedversion`: Displays the version of the feed
*  `--selftest`: Performs a self-test to check if all required utilities are available
*  `--feedcurrent`: Checks if the feed is already up to date

### Updating Feeds With Legacy Bash Scripts (Not Recommended)
If you absolutely cannot update to the new Python-based feed sync scripts because you are using a version of Greenbone prior to 22.4, or another reason, it's important to note that the legacy bash scripts can be run as the `sudo`/`root` user or the `gvm` user standard installations (`_gvm` on legacy versions of Kali). However, for non-standard installations that use a different username for the Greenbone components, the feed sync script should be run from the appropriate user context. Also, to update the feed sync using the legacy `greenbone-feed-sync` command, the `--type` parameter is **required**.

For example:

```{code-block}
:caption: Update feeds with legacy bash script
sudo -u gvm greenbone-feed-sync --type <feed-type>
```

Using one of the following values to replace **\<feed-type>**:

* `CERT`: Synchronizes CERT data feed
* `SCAP`: Synchronizes SCAP data feed
* `GVMD_DATA`: Synchronizes gvmd data feed

### Updating Feeds For Kali Linux Native Installation
Some older versions of Kali Linux include the `gvm-feed-update` command for feed synchronization. However, the wrapper script has been depreciated in newer versions of Kali and Greenbone's official `greenbone-feed-sync` command must be used instead.

To update all feeds for versions of Kali Linux that include the `gvm-feed-update` script issue the following command can be used:

```
┌──(dev㉿kali)-[~]
└─$ sudo gvm-feed-update
```

Please note that the `gvm-feed-update` command mentioned above is not maintained by Greenbone. It is maintained by the Kali/Debian package managers. Under the hood, the `gvm-feed-update` is a bash script that essentially executes the standard `greenbone-feed-sync --type <feed-type>` scripts provided by Greenbone. We recommend avoiding the use of `gvm-feed-update` for your feed sync operations.

### Configuring The Feed Sync User For Non-Standard Installations
The Python-based feed sync scripts will automatically change context to the `gvm` user in order to process the feeds. Since the Kali native installation uses the `_gvm` user, it comes preconfigured with a `.toml` file which specifies the appropriate user context. The `greenbone-feed-sync` script will look for this configuration file at the locations `~/.config/greenbone-feed-sync.toml` and `/etc/gvm/greenbone-feed-sync.toml`. If you have configured a Greenbone source code installation with a non-standard username and group such as `_gvm` you must add the user and group context to the `/etc/gvm/greenbone-feed-sync.toml` file, configure the appropriate environment variable, or supply the user context via the `--user` and `--group` command line arguments.

### Verifying Successful Feed Sync Update
After the sync operation completes, you can verify the successful update of the feed data by visiting the `/feedstatus` page which can be found under the **Administration** item in the top menu bar of Greenbone's web-interface. If a feed has successfully updated you will see **Current** beside the particular feed and the **Version** column will indicate the date/time of the feed's release.

## Automating Feed Sync Updates
The Greenbone feeds are not automatically synced for the Greenbone Community source code installations, Greenbone Community Docker containers, or Greenbone native Kali Linux installation. The suggested method for automating the Greenbone feed sync is to create a `crontab` file to schedule the feed sync command execution. For standard source-code installations, the `crontab` should be run under the `sudo` or `root` user context.

Please note that different methods are required for completing a feed sync when using the official **Greenbone Docker containers**, which can be [found here](https://greenbone.github.io/docs/latest/22.4/container/workflows.html#performing-a-feed-synchronization). These commands can also be scheduled via `crontab`.

## Troubleshooting A Connection To The Greenbone Feeds
To trouble shoot a connection to the Greenbone feeds, you can issue the following command from a terminal.
```{code-block}
:caption: Verify an rsync connection to the Greenbone feeds
rsync rsync://feed.community.greenbone.net/community
```
You should see output such as the following:
```{code-block}
:caption: Expected output when verifying an rsync connection to the Greenbone feeds
Greenbone community feed server - http://feed.community.greenbone.net/
This service is hosted by Greenbone Networks - http://www.greenbone.net/

All transactions are logged.

If you have any questions, please use the Greenbone community portal.
See https://community.greenbone.net for details.

By using this service you agree to our terms and conditions.

Only one sync per time, otherwise the source ip will be temporarily blocked.

data-objects Greenbone community data objects, see https://community.greenbone.net/
nvt-feed Greenbone community NVT feed, see https://community.greenbone.net/
scap-data  Greenbone community SCAP data feed, see https://community.greenbone.net/
cert-data  Greenbone community CERT data feed, see https://community.greenbone.net/
community-legacy  Greenbone community legacy feed, see https://community.greenbone.net/
community  Greenbone community feed, see https://community.greenbone.net/
```
If you are unable to connect to the Greenbone feeds using the `rsync` command, we suggest you troubleshoot your network connection to identify any firewalls, content proxies, or network configurations that could be blocking the connection. Here are some suggested methods:

### Use nping
The `nping` command is part of the `nmap` tool and is availble for Linux and Windows systems. It can be used to track a TCP connection on a specific port while `traceroute` cannot be configured to test a specific port. This will help identify port-based firewall rules as well as host/IP-based firewall rules that maybe blocking the `rsync` port `873`. Please note `nping --tcp` command requires `sudo` or root permissions. You can find more information at the [nping reference guide](https://nmap.org/book/nping-man.html).
```{code-block}
:caption: Using nping to test the connectivity of port 873
sudo nping --tcp --traceroute -c 13 -p 873 feed.community.greenbone.net
```

### Use tcptraceroute
If you cannot install `nmap` on your host, you can use `tcptraceroute` on Linux/Unix based systems.
```{code-block}
:caption: Using tcptraceroute to test the connectivity of port 873
tcptraceroute -p 873 feed.community.greenbone.net
```
