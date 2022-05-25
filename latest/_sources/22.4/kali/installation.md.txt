## Installing Greenbone Community Edition on Kali Linux

### Quick Start Install

For those who want a quick start guide, here is an overview of the standard installation process:

> 1. Update Kali Linux with `sudo apt update`.
> 2. Install Greenbone Community Edition with `sudo apt install gvm`.
> 3. Configure Greenbone Community Edition with `sudo gvm-setup` and note the provided *admin* password from the output
> 4. Check the install status with `gvm-check-setup`.
> 5. Visit [https://127.0.0.1:9392](https://127.0.0.1:9392) and log in using the credentials output in step 3.
> 6. Verify the feed status before starting your first scan.

### Detailed Installation Instructions

In this section includes a more detailed look at each step of the installation process.

### 1. Update Kali Linux

The first step is to update the system's local package lists for repositories and PPAs (Personal Package Archives). Kali Linux is a "rolling" distribution which means that it continuously updates all of its software (the kernel, libraries, applications, and other system software) to the latest versions without requiring a complete OS reinstallation. Rolling releases typically offer the latest versions of software soon after they are released.

Therefore, It's highly advised to also do a full package `upgrade` before installing `gvm` since Greenbone Community Edition requires the newest version of PostgreSQL. If you are having trouble upgrading and configuring PostgreSQL during the installation process, see the [troubleshooting section](troubleshooting.md).

```{warning} System upgrades may result in changes to the existing kernel, libraries, and software that could interfere with existing functionality. Before doing an upgrade you should make a complete backup of all critical files on your system including the contents of your PostgreSQL database.
```
```{code-block}
:caption: Full package list update and system upgrade
sudo apt update && sudo apt upgrade
```

### 2. Install Greenbone Community Edition

Greenbone Community Edition and required dependencies can be installed with a single command:

```bash
sudo apt install gvm -y
```
Note that this is the same as executing the command:
```bash
sudo apt install openvas -y
```

### 3. Run The Automatic Configuration Script

After installing the required packages, a configuration script must be run to complete the installation. To run the automatic configuration execute the command:

```{note}
During `gvm-setup` you must record the default password created for the admin user.
```

```bash
sudo gvm-setup
```

### 4. Verify The Installation

The Kali Linux native installation includes a script to verify the installed services. This script can be run using the command:

```bash
sudo gvm-check-setup
```

If your installation has been successfully configured, you will see the following message at the end of the verification out:

```
It seems like your GVM-22.5.0 installation is OK.
```

#### Starting And Stopping Greenbone Community Edition

The following commands can be used to start and stop Greenbone Community Edition and all its required services:

```{code-block}
:caption: Start all services
sudo gvm-start
```

```{code-block}
:caption: Stop all services
sudo gvm-stop
```

### 5. Log Into The Greenbone Web Interface

Once the installation is complete you can log into the {term}`GSA` web interface by visiting [https://127.0.0.1:9392](https://127.0.0.1:9392) in your browser and providing the default admin credentials from step 3.

### 6. Verify The Feed Status

Before starting the first scan, Greenbone needs to parse the vulnerability feeds and store them into the `gvmd` PostgreSQL database, otherwise, it will not be able to initialize or complete scans without errors. This process is initialized during the setup stage, but typically takes anywhere from a few minutes to several hours to complete, depending on your system resources.

The feed status can be checked by going to the `Feed Status` page from the `Administration` section in the top menu bar.
