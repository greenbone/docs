Adjusting Permissions
---------------------

For a system-wide multi-user installation, it must be ensured that the
directory permissions are set correctly and are matching the group setup.
All users of the group *gvm* should be able to read and write logs, lock files
and data like VTs.

.. code-block::
  :caption: Adjusting directory permissions

  sudo chown -R gvm:gvm /var/lib/gvm
  sudo chown -R gvm:gvm /var/lib/openvas
  sudo chown -R gvm:gvm /var/log/gvm
  sudo chown -R gvm:gvm /run/gvm

  sudo chmod -R g+srw /var/lib/gvm
  sudo chmod -R g+srw /var/lib/openvas
  sudo chmod -R g+srw /var/log/gvm

To allow all users of the group *gvm* access to the postgres database via the
various *gvmd* commands, the permissions of the *gvmd* executable will be adjusted
to always run as the *gvm* user and under the *gvm* group.

.. code-block::
  :caption: Adjusting gvmd permissions

  sudo chown gvm:gvm /usr/local/sbin/gvmd
  sudo chmod 6750 /usr/local/sbin/gvmd

Additionally the feed sync script permissions should be adjusted to only allow
*gvm* user to execute them. Otherwise the permissions of the synced files will
be broken.

.. code-block::
  :caption: Adjusting feed sync script permissions

  sudo chown gvm:gvm /usr/local/bin/greenbone-nvt-sync
  sudo chmod 740 /usr/local/sbin/greenbone-feed-sync
  sudo chown gvm:gvm /usr/local/sbin/greenbone-*-sync
  sudo chmod 740 /usr/local/sbin/greenbone-*-sync
