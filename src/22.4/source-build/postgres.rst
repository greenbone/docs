Setting up PostgreSQL
---------------------

The `PostgreSQL <https://www.postgresql.org/>`_ database management system is
used as a central storage for user and scan information. *gvmd* connects to
a PostgreSQL database and queries the data. This database must be created
and configured.

.. code-block::
  :caption: Debian installing the PostgreSQL server

  sudo apt install -y postgresql

.. code-block::
  :caption: Fedora installing the PostgreSQL server

  sudo dnf install -y postgresql-server postgresql-contrib

If necessary the PostgreSQL database server needs to be started manually

.. code-block::
  :caption: Debian starting the PostgreSQL database server

  sudo systemctl start postgresql@13-main

.. code-block::
  :caption: Fedora starting the PostgreSQL database server

  sudo postgresql-setup --initdb --unit postgresql
  sudo systemctl start postgresql

.. code-block::
  :caption: Setting up PostgreSQL user and database

  sudo -u postgres bash
  createuser -DRS gvm
  createdb -O gvm gvmd
  exit

.. code-block::
  :caption: Setting up database permissions and extensions

  sudo -u postgres bash
  psql gvmd
  create role dba with superuser noinherit;
  grant dba to gvm;

  exit
  exit
