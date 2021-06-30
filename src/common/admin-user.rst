Setting up an Admin User
------------------------

For accessing and configuring the vulnerability data, an administrator user needs
to be created. This user can log in via the Greenbone Security Assistant (GSA)
web interface. They will have access to all data and will later be configured to
act as the *Feed Import Owner*.

On Debian systems the locations :file:`/sbin`, :file:`/usr/sbin` and
:file:`/usr/local/sbin` are not in the :envvar:`PATH` of normal users. To run
*gvmd* which is located in :file:`/usr/local/sbin` the :envvar:`PATH`
environment variable should be adjusted.

.. code-block::
  :caption: Adjusting PATH for running gvmd

  export PATH=$PATH:/usr/local/sbin

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
