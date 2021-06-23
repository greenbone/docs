Setting up PostgreSQL
---------------------

The `PostgreSQL <https://www.postgresql.org/>`_ database is used as a central
storage for user and scan information.


.. code-block::
  :caption: Installing the PostgreSQL server

  sudo apt install -y postgresql

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
