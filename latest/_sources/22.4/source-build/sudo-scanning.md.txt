### Setting up *sudo* for Scanning

For vulnerability scanning, it is required to have several capabilities for which
only root users are authorized, e.g., creating raw sockets. Therefore, a
configuration will be added to allow the users of the *gvm* group to run the
*openvas-scanner* application as root user via *sudo*.

```{warning}
Make sure that only necessary users have access to the *gvm* group. Each user
of the *gvm* group can manipulate the Vulnerability Test (VT) scripts
(.nasl files). These scripts are run with root privileges and therefore can
be used for exploits. See
[https://csal.medium.com/pentesters-tricks-local-privilege-escalation-in-openvas-fe933d7f161f](https://csal.medium.com/pentesters-tricks-local-privilege-escalation-in-openvas-fe933d7f161f).
```

```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu/Fedora
    .. code-block:: none

      echo "%gvm ALL = NOPASSWD: /usr/local/sbin/openvas" | sudo tee /etc/sudoers.d/gvm \
      && sudo chmod 0440 /etc/sudoers.d/gvm

  .. tab:: CentOS
    .. code-block:: none

      sudo visudo

      ...

      # Allow /usr/local path
      Defaults    secure_path = /sbin:/bin:/usr/sbin:/usr/bin:/usr/local/sbin:/usr/local/bin

      # allow users of the gvm group run openvas
      %gvm ALL = NOPASSWD: /usr/local/sbin/openvas
```
