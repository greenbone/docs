Setting up an Admin User
------------------------

For accessing and configuring the vulnerability data, an administrator user needs
to be created. This user can log in via the Greenbone Security Assistant (GSA)
web interface. They will have access to all data and will later be configured to
act as the *Feed Import Owner*.

.. code-block::
  :caption: Creating an administrator user with generated password

  gvmd --create-user=admin

The new administrator user's password is printed on success. An administrator user can
later create further users or administrators via the GSA web interface.

To create the administrator user with a password of your choice instead of the generated
password, the following command can be used:

.. code-block::
  :caption: Creating an administrator user with provided password

  gvmd --create-user=admin --password=<password>

If the output doesn't show

.. code-block:: none

  User created.

you need to look at the :file:`/var/log/gvm/gvmd.log` for errors.
