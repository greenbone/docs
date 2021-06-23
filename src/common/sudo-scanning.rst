Setting up *sudo* for Scanning
------------------------------

For vulnerability scanning, it is required to have several capabilities for which
only root users are authorized, e.g., creating raw sockets. Therefore, a
configuration will be added to allow the users of the *gvm* group to run the
*openvas-scanner* application as root user via *sudo*.

.. warning::

  Make sure that only necessary users have access to the *gvm* group. Each user
  of the *gvm* group has access to can manipulate the Vulnerability Test (VT) scripts
  (.nasl files). These scripts are run with root privileges and therefore can 
  be used for exploits. See
  `<https://csal.medium.com/pentesters-tricks-local-privilege-escalation-in-openvas-fe933d7f161f>`_.

.. code-block:: none

  sudo visudo

  ...

  # allow users of the gvm group run openvas
  %gvm ALL = NOPASSWD: /usr/local/sbin/openvas
