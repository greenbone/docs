## Troubleshooting A Kali Linux Installation

Here are some common issues encountered during installation and steps to fix them.

### Upgrading The Default PostgreSQL Version

If you encounter an error regarding the PostgreSQL version when running `sudo gvm-setup`, you must upgrade the installed version of PostgreSQL to the newest version required by the Kali native `gvm` package. In the example below shows the upgrade from PostgreSQL version 15 to version 16, but these steps will work to upgrade between any versions.

[MORE: Can this be avoided by doing `sudo apt upgrade` before installation?]

```{code-block}
:caption: Error indicating the need to upgrade your PostgreSQL cluster
┌──(dev㉿kali)-[~]
└─$ sudo gvm-setup       

[>] Starting PostgreSQL service
[-] ERROR: The default PostgreSQL version (15) is not 16 that is required by libgvmd
[-] ERROR: libgvmd needs PostgreSQL 16 to use the port 5432
[-] ERROR: Use pg_upgradecluster to update your PostgreSQL cluster
```   

To complete the Greenbone CE setup you must:

1. Migrate PostgreSQL settings and data to a new upgraded cluster
2. Configure the new cluster to use port `5432`
3. Install the newest pg-gvm extension
4. Fix the gmvd database COLLATION mismatch
5. Resolve Any Outstanding Dependencies
6. Complete the Greenbone CE Setup

### 1. Upgrade PostgreSQL Cluster

```{warning} You should consider the contents of your existing PostgreSQL database and complete any backups of that data before you complete the following steps. It's also important to consider that upgrading Kali Linux packages could disrupt the functionality of your system.
```

You can list all existing PostgreSQL clusters using the command `pg_lsclusters`.  

 ```{code-block}
 :caption: Listing the existing PostgreSQL clusters
┌──(dev㉿kali)-[~]
└─$ pg_lsclusters      
Ver Cluster Port Status Owner    Data directory              Log file
15  main    5432 online postgres /var/lib/postgresql/15/main /var/log/postgresql/postgresql-15-main.log
16  main    5433 online postgres /var/lib/postgresql/16/main /var/log/postgresql/postgresql-16-main.log
```

The output above shows two online clusters listening on ports `5432` and `5433`. Since the target cluster `16/main` already exists, it must be temporarily deleted to avoid the error `Error: target cluster 16/main already exists`. The existence of the `16/main` cluster does not necessarily mean that the old cluster has already been upgraded; it simply means that a cluster for that version is present.

```{code-block}
:caption: Trying to upgrade to an existing cluster will fail.
┌──(dev㉿kali)-[~]
└─$ sudo pg_upgradecluster 15 main 16
Error: target cluster 16/main already exists
```

To complete the upgrade, the `16/main` cluster must first be stopped and deleted.

```bash
sudo pg_ctlcluster 16 main stop
sudo pg_dropcluster 16 main
```

Now upgrade the old cluster to a new one. The `pg_upgradecluster` command migrates databases from the old cluster to the new cluster.

```{code-block}
:caption: The basic syntax of the pg_upgradecluster command.
pg_upgradecluster [options] oldversion oldclustername [newversion]
```

To upgrade your PostgreSQL cluster, you should use the following command:

```bash
sudo pg_upgradecluster 15 main
```

If you do not need the older PostgreSQL cluster, you should delete it.

```bash
sudo pg_dropcluster 15 main
```

And remove the PostgreSQL 15 packages

```bash
sudo apt autoremove
```

Now only the new PostgreSQL cluster exists.

```{code-block}
:caption: Listing the existing PostgreSQL clusters
┌──(dev㉿kali)-[~]
└─$ pg_lsclusters                   
Ver Cluster Port Status Owner    Data directory              Log file
16  main    5433 online postgres /var/lib/postgresql/16/main /var/log/postgresql/postgresql-16-main.log
```
### 2. Configure The PostgreSQL Port

Typically, the `pg_upgradecluster` will also configure the new version of PostgreSQL to use the standard port `5432`, which is required by Greenbone CE. However, if the port is not automatically changed, you must change it manually by editing the `postgresql.conf` configuration file and restarting the PostgreSQL systemd service. On Kali the `postgresql.conf` configuration file is located in the `/etc/postgresql/<version>/main` directory, but to be sure you can issue a command to locate the configuration file.

```bash
sudo -u postgres psql -c 'SHOW config_file'
```

```{code-block}
:caption: Executing command to locate the PostgreSQL config file
┌──(dev㉿kali)-[~]
└─$ sudo -u postgres psql -c 'SHOW config_file'

               config_file               
-----------------------------------------
 /etc/postgresql/16/main/postgresql.conf
(1 row)
```

Edit the configuration file and change the connection settings port to `5432` and restart the PostgreSQL port.

```{code-block}
:caption: Use nano to edit the postgresql.conf file
sudo nano /etc/postgresql/16/main/postgresql.conf
```

```diff
# - Connection Settings -

#listen_addresses = 'localhost'         # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost'; use '*' for all
                                        # (change requires restart)
-port = 5433                             # (change requires restart)
+port = 5432                             # (change requires restart)
max_connections = 100                   # (change requires restart)
#reserved_connections = 0               # (change requires restart)
#superuser_reserved_connections = 3     # (change requires restart)
```

```{code-block}
:caption: Restart the PostgreSQL systemd service
sudo systemctl restart postgresql
```

### 3. Install The Newest pg-gvm Extension For PostgreSQL

When upgrading PostgreSQL cluster to a newer version, the `pg-gvm` package must also be updated. If you do not update this package before running `sudo gvm-check-setup`, you will encounter the following error when rebuilding the `gvmd` database:

```{code-block}
:caption: Missing pg-gvm extention error when running gvm-check-setup
[*] Creating extension pg-gvm
ERROR:  extension "pg-gvm" is not available
DETAIL:  Could not open extension control file "/usr/share/postgresql/16/extension/pg-gvm.control": No such file or directory.
HINT:  The extension must first be installed on the system where PostgreSQL is running.
```

You can find all available versions of `pg-gvm` using the `apt-cache search` command:

```{code-block}
:caption: Searching the Linux package repository for all versions of pg-gvm
┌──(dev㉿kali)-[~]
└─$ apt-cache search pg-gvm              
postgresql-16-pg-gvm - PostgreSQL extension for ical object manipulation
```

After updating the aptitude package repository is `postgresql-16-pg-gvm` which matches the new PostgreSQL version. So, you need to install that package:

```bash
sudo apt install postgresql-16-pg-gvm -y
```

### 4. Fixing The gvmd COLLATION Version Mismatch

During a PostgreSQL cluster upgrade you may encounter a COLLATION mismatch warning. This warning must be resolved before `gvm-setup` can be completed.

```{code-block}
:caption: Error message indicating a COLLATION version mismatch
WARNING:  database "gvmd" has a collation version mismatch
DETAIL:  The database was created using collation version 2.36, but the operating system provides version 2.37.
HINT:  Rebuild all objects in this database that use the default collation and run ALTER DATABASE gvmd REFRESH COLLATION VERSION, or build PostgreSQL with the right library version.
```

To fix the collation mismatch, login to the `psql` command line and execute the suggested commands to update all databases in the cluster.  This will at least include the `gvmd` and `postgres` databases.

```{code-block}
:caption: Become the postgres user to access the psql shell as a superadmin
sudo su postgres
```

```{code-block}
:caption: Start the PostgreSQL shell
psql
```

```{code-block}
:caption: Update each database COLLATION version
postgres=# ALTER DATABASE postgres REFRESH COLLATION VERSION;
NOTICE:  changing version from 2.36 to 2.37
ALTER DATABASE
postgres=# ALTER DATABASE gvmd REFRESH COLLATION VERSION;
NOTICE:  changing version from 2.36 to 2.37
ALTER DATABASE
postgres-# \q
postgres@kali:/home/dev$ exit
```

### 5. Resolve Any Outstanding Dependencies

In order to complete the database cluster migration, you may also need to update various outdated extensions depending on the particular changes between PostgreSQL versions. For example, when migrating between PostgreSQL 15 and 16, the `pgcrypto` module must be updated. To update any unresolved dependencies...


```bash
sudo apt install pgcrypto

```  

### 6. Complete The Greenbone CE Setup

You can now run the `gvm-setup` command to complete the setup.

```
sudo gvm-setup
```

```{note}
During setup it's important to note and record the default password created for the GVM admin user.
```

```{code-block}
:caption: The admin password is included in gvm-setup output
[+] Done
[*] Please note the password for the admin user
[*] User created with password 'ff006a29-8977-4ffa-882c-cd430fdc9bb8'.

[>] You can now run gvm-check-setup to make sure everything is correctly configured
```

## Other Common Setup Errors

```{note}
Here are some other common setup errors you may encounter when installing Greenbone CE from the native Kali Linux package. In most cases, hints are available in the `gvm-setup` and `gvm-check-setup` command output.
```

### ERROR: extention "pg-gvm" is not available

[See the instructions here](#3-install-the-newest-pg-gvm-extension-for-postgresql) to find and install the latest version of `pg-gvm`.

### ERROR: No users found

If you encounter the error **ERROR: No users found.** when running `sudo gvm-check-setup`, you will need to create at least one an admin user. Replace `<your-password>` with your own password.

```bash
sudo runuser -u _gvm -- gvmd --create-user=admin --password=<your-password>
```

### ERROR: The Postgresql DB does not exist

If the PostgreSQL database was not created during initial setup of Greenbone CE, or not transferred when migrating to a new cluster, you must manually create the database with the following command:

```
sudo runuser -u postgres -- /usr/share/gvm/create-postgresql-database
```

### ERROR: Required systemd service did not start

If the ospd-openvas service or any other required Greenbone `systemd` services did not start during the setup or initialization, you can attempt to manually start the process.  Here is an example for troubleshooting the `ospd-openvas` systemd service, but you can use this process for other services as well:

```{code-block}
:caption: Try to manually start the service
sudo systemctl start ospd-openvas
```

If the service still fails to start properly, you can check for errors using the following methods:

```{code-block}
:caption: Display the systemd service status including any errors
sudo systemctl status ospd-openvas | less
```

```{code-block}
:caption: View detailed system logs with extended output
journalctl -xe
```

```{code-block}
:caption: View most recent items in the ospd-openvas log file
tail -20 /var/log/gvm/ospd-openvas.log
```

```{note}
You can find all the Greenbone CE log files in the `/var/log/gvm` directory.
```

### ERROR: The client certificate file of GVM is not valid

If the required SSL/TLS certificates failed to generate during the standard setup process, or if the existing certificates are not valid any longer, you must generate the necessary SSL/TLS certificate files. The script `gvm-manage-certs` is used for managing the certificates required by Greenbone CE.

```{code-block}
:caption: Generate all required SSL/TLS certificates
sudo runuser -u _gvm -- gvm-manage-certs -a -f
```

### ERROR: Database is wrong version. You have installed a new gvmd version

When upgrading Greenbone CE, you may need to also update the `gvmd` PostgreSQL database schema. You can update the `gvmd` database to the with the following command:

```bash
sudo runuser -u _gvm -- gvmd --migrate
```

### ERROR: No postgresql version uses the port 5432.

Greenbone Community Edition requires a PostgreSQL connection on port 5432. [See instructions here](#2-configure-the-postgresql-port) to change the PostgreSQL port.
