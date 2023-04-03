### Setting up PostgreSQL

The [PostgreSQL](https://www.postgresql.org/) database management system is
used as a central storage for user and scan information. *gvmd* connects to
a PostgreSQL database and queries the data. This database must be created
and configured.

```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
     :caption: Installing the PostgreSQL server

     sudo apt install -y postgresql

  .. tab:: Fedora/CentOS
   .. code-block::
     :caption: Installing the PostgreSQL server

     sudo dnf install -y postgresql-server postgresql-contrib
```

If necessary the PostgreSQL database server needs to be started manually

```{eval-rst}
.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Starting the PostgreSQL database server

     sudo systemctl start postgresql@13-main

  .. tab:: Ubuntu
   .. code-block::
     :caption: Starting the PostgreSQL database server

     sudo systemctl start postgresql@14-main

  .. tab:: Fedora/CentOS
   .. code-block::
     :caption: Starting the PostgreSQL database server

     sudo postgresql-setup --initdb --unit postgresql
     sudo systemctl start postgresql
```

For setting up the PostgreSQL database it is required to become the postgres
user.

```{code-block}
:caption: Changing to the postgres user

sudo -u postgres bash
```

```{code-block}
:caption: Setting up PostgreSQL user and database for the Greenbone Community Edition

createuser -DRS gvm
createdb -O gvm gvmd
```

```{code-block}
:caption: Setting up database permissions and extensions

psql gvmd -c "create role dba with superuser noinherit; grant dba to gvm;"

exit
```
