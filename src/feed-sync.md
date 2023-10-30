
# Feed Sync Guide

This documentation provides instructions on updating the feed for your specific version of the Greenbone Community Edition and installation method. Please note that there is currently a migration from the `/usr/local/sbin/greenbone-feed-sync` bash script to a new Python-based script with the same name: `greenbone-feed-sync`. Also, please note that Kali Linux distribution comes with its own additional bash command script `gvm-feed-update`, yet we do recommend using the native Greenbone feed-sync commands.

If you are unable to achieve feed synchronization after reading this guide, or require further assistance with the feed sync update process, please consult the [Greenbone Community Forum](https://forum.greenbone.net/) or contact our support team for guidance.

## A Note About Deprecated Sync Scripts
The following sync scripts listed below are deprecated and no longer installed by default since gvmd 22.5.0.  If you want to check if you have these scripts installed you can try the following command:
```sh
which <feed-command>
```
-   `greenbone-certdata-sync`: This script is equivalent to greenbone-feed-sync --type CERT, and it was primarily provided for backwards compatibility.  
-   `greenbone-scapdata-sync`: This script is equivalent to greenbone-feed-sync --type SCAP, and it was primarily provided for backwards compatibility.
-   `greenbone-nvt-sync`: This script, written in bash, was used to download vulnerability tests data (nasl and notus files). It is deprecated since openvas-scanner 22.6.0.
-   `/usr/local/sbin/greenbone-feed-sync` or `/usr/sbin/greenbone-feed-sync`: This is the old sync script written in bash to download CERT, SCAP, and GVMD_DATA. It is no longer installed by default since gvmd 22.5.0.

### Deprecated Sync Script Removal
If you have any of the deprecated sync scripts (`greenbone-certdata-sync`, `greenbone-scapdata-sync`, `greenbone-nvt-sync`, `/usr/local/sbin/greenbone-feed-sync` or `/usr/sbin/greenbone-feed-sync`) installed, it is recommended to remove them. This step ensures a clean transition to the new sync script.

## Introduction Of The New Python Feed Sync Script
A new Python-based `greenbone-feed-sync` command now replaces the deprecated feed sync scripts mentioned above. This new script can be run with can be run with **Greenbone version 22.4 and later**, however, older versions are not supported. This new feed sync method will now be installed by default.  

The new script can handle various use cases, including the functionality provided by the `gvm-feed-update` which is provided by the Kali/Debian packagers. Full documentation for the new Python-based feed update script can be found [here](https://github.com/greenbone/greenbone-feed-sync/).

### Installation
Python 3.9 and later is supported. Also note that sycing feeds requires the `rsync` tool being installed and available within the PATH, which is normally installed as part of Greenbone Community Edition's source code and docker container installation methods.

#### Install using pipx
You can install the latest stable release of pontos from the Python Package Index (pypi) using [pipx](https://pypa.github.io/pipx/)
```sh
python3 -m pipx install greenbone-feed-sync
```

#### Install using pip
NOTE: The pip install command does no longer work out-of-the-box in newer distributions like Ubuntu 23.04 because of [PEP 668](https://peps.python.org/pep-0668). Please use the [installation via pipx](https://github.com/greenbone/greenbone-feed-sync/tree/main#install-using-pipx) instead.

You can install the latest stable release of greenbone-feed-sync from the Python Package Index (pypi) using [pip](https://pip.pypa.io/)
```sh
python3 -m pip install greenbone-feed-sync
```

## Updating the Greenbone Feeds

### Determine Which Command Is In Use
Before you can update the Greenbone feed sync, you should check which version of the commands are active when you execute the `greenbone-feed-sync` command.  To do that, use the `which` command to determine the path of the command that is executed.

For example:
```sh
which greenbone-feed-sync
/usr/local/bin/greenbone-feed-sync
```
Once you determine the path of the executed command you can identify whether it is the new Python-based feed sync command or the legacy bash version.  To do that, use the `head` command to print the first line of the script.  This will indicate the interpreter used at execution run-time.

For example:
```sh
# If the new Python-based feed update script is active you will see
head -1 /usr/local/bin/greenbone-feed-sync
#!/usr/bin/python3
```
```sh
# If the legacy bash feed update script is active you will see
head -1 /usr/local/bin/greenbone-feed-sync
#!/bin/sh
```

### Updating Feeds With New Python Script
By default, when no arguments are passed, it runs the sync operation for all types of feed data. To ensure proper execution and permissions, the new Python script must be run with root/sudo permissions, as it will need to change its execution context to the `gvm` or `_gvm` user.
```sh
# Update all feeds with single command
sudo greenbone-feed-sync
```
To update only one feed at a time, the new Python-based command can be used similar to the previous `/usr/sbin/greenbone-feed-sync` bash script command by specifying a  feed type, however, note that the new feed types use lowercase and more options are available.
```sh
# Include the feed type as an argument to update only a specific feed type
greenbone-feed-sync --type <feed-type>
```
The available feed types are:

* `all`: same as using the command without specifying a type
* `nvt`: Fetches any newly available vulnerability tests
* `gvmd-data`: Synchronizes GVM data feed  which includes [???]
* `scap`: Synchronizes SCAP data feed
* `cert`: Synchronizes CERT data feed
* `notus`: Fetch any newly available NOTUS vulnerability tests
* `nasl`: Fetch any newly available NASL vulnerability tests
* `report-format` or `report-formats`: Fetches any newly available scan report formats
* `scan-config` or `scan-configs`: Fetches any newly available scan configurations
* `port-list` or `port-lists`: Fetches any newly available port lists

For other options, see the [full documentation here](https://github.com/greenbone/greenbone-feed-sync/).

### Updating Feeds With Legacy Bash Script

To update the feed sync using the legacy `greenbone-feed-sync` command, the `--type` parameter is **required**.  
```sh
# Update feeds with legacy bash script
sudo -u gvm greenbone-feed-sync --type <feed-type>
```
Using one of the following values to replace **\<feed-type>**:

* `CERT`: Synchronizes CERT data feed
* `SCAP`: Synchronizes SCAP data feed
* `GVMD_DATA`: Synchronizes gvmd data feed

Other arguments that can be passed to the legacy command include:

*  `--version`: Displays the version of the script
*  `--identify`: Displays information about the script, including script ID, name, version, feed name, whether it is restricted or not
*  `--describe`: Displays a description of the script and the feed it synchronizes
*  `--feedversion`: Displays the version of the feed
*  `--selftest`: Performs a self-test to check if all required utilities are available
*  `--feedcurrent`: Checks if the feed is already up to date

### Updating Feeds For Kali Linux Native Installation
Kali Linux includes its own command for feed synchronization.  To update all feeds issue the command as follows
```
┌──(dev㉿kali)-[~]
└─$ sudo gvm-feed-update
```
Please note that the `gvm-feed-update` command mentioned above is not maintained by Greenbone. It is maintained by the Kali/Debian package managers.  Under the hood, the `gvm-feed-update` is a bash script that essentially executes the standard `greenbone-feed-sync --type <feed-type>` scripts provided by Greenbone.  We recommend avoiding the use of `gvm-feed-update` for your feed sync operations.

### Verifying Successfull Feed Sync Update
After the sync operation completes, you can verify the successful update of the feed data. To confirm the updated feed status visit the `/feedstatus` page which can be found under the **Administration** item in the top menu bar of Greenbone's web-interface. If a feed has successfully updated you will see **Current** beside the particular feed.

## Automating Feed Sync Updates
The Greenbone feeds are not automatically synced in the case of a Greenbone Community source code installation, for the Greenbone Community Docker containers, or the Greenbone native Kali Linux installation. The sugested method for  automating the Greenbone feed sync is to create a crontab file to schedule the schedule the appropriate commands.  

If using the new Python-based command, the crontab should be run under the root user context, however, if using the legacy feed sync bash script, the crontab should be created specifcally for the `gvm` or `_gvm` user.

1. [MORE]

2. Determine whether your installation uses the `gvm` or `_gvm` user.  The Kali linux installation is typically the only installation type that uses `_gvm`.  Therefore, you should expect to see either of these output:
```
┌──(dev㉿kali)-[~]
└─$ awk  -F:  '{ print $1}'  /etc/passwd  |  grep gvm
_gvm
```
```
$ awk  -F:  '{ print $1}'  /etc/passwd  |  grep gvm
gvm
```

## Troubleshooting A Connection To The Greenbone Feeds
To trouble shoot a connection to the Greenbone feeds, you can issue the following command from a terminal.
```sh
rsync rsync://feed.community.greenbone.net/community
```
You should see output such as the following:
```sh
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
If you are unable to connect to the Greenbone feeds using the `rsync` command, we suggest you troubleshoot your network connection to identify any potential firewalls, content proxies, or network configurations.  To do this you can try some of the following methods:

### Use nping

The `nping` command is part of the `nmap` tool. It can be used to directly traceroute a TCP connection to a specific port while `traceroute` and `tcptraceroute` cannot be configured to test a specific port. This will help identify port-based firewall rules as well as host/IP-based firewall rules. Note: `nping --tcp` command requires `sudo` or root permissions.
```sh
sudo nping --tcp --traceroute -c 13 -p 873 feed.community.greenbone.net
```
### Use traceroute/tracert
If you cannot install `nmap` on your host, you can try `traceroute` on Linux/Unix based systems or `tracert` for Windows which are both typically installed by default.
```sh
# For Linux/Unix systems
traceroute feed.community.greenbone.net
```
```sh
# For Windows systems
tracert feed.community.greenbone.net
```
