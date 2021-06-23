Setting up an Admin User
------------------------

For accessing and configuring the vulnerability data an administrator user needs
to be created. This user can login via the Greenbone Security Assistant (GSA)
web frontend. He will have access to all data and later configured to act as the
*Feed Import Owner*.

.. code-block::
  :caption: Creating an administrator user with generated password

  gvmd --create-user=admin

The new admin user's password is printed on success. An administrator user can
later create further users or administrators via the GSA web application.

To create the admin user with a password of your choice instead of the generated
password the following command can be used:

.. code-block::
  :caption: Creating and administrator user with provided password

  gvmd --create-user=admin --password=<password>
