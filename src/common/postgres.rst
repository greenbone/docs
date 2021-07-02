Setting up PostgreSQL
---------------------

The `PostgreSQL <https://www.postgresql.org/>`_ database management system is
used as a central storage for user and scan information. *gvmd* connects to
a PostgreSQL database and queries the data. This database must be created
and configured.

.. code-block::
  :caption: Installing the PostgreSQL server

  sudo apt install -y postgresql

If necessary the PostgreSQL database server needs to be started manually

.. code-block::
  :caption: Starting the PostgreSQL database server

  sudo systemctl start postgresql@11-main

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

  create extension "uuid-ossp";
  create extension "pgcrypto";
  exit
  exit
