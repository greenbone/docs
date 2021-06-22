Setup PostgreSQL
----------------

The `PostgreSQL <https://www.postgresql.org/>`_ database is used as a central
storage for user and scan information.


.. code-block::
  :caption: Install PostgreSQL server

  sudo apt install -y postgresql

.. code-block::
  :caption: Setup PostgreSQL User and Database

  sudo -u postgres bash
  createuser -DRS gvm
  createdb -O gvm gvmd
  exit

.. code-block::
  :caption: Setup database permissions and extensions

  sudo -u postgres bash
  psql gvmd
  create role dba with superuser noinherit;
  grant dba to gvm;

  create extension "uuid-ossp";
  create extension "pgcrypto";
  exit
  exit
