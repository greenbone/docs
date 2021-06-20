Directory permissions
---------------------

.. code-block::
  :caption: Adjusting directory permissions

  sudo chgrp -R gvm /var/lib/gvm
  sudo chgrp -R gvm /var/log/gvm
  sudo chgrp -R gvm /var/run/gvm
  sudo chgrp -R gvm /var/lib/openvas

  sudo chmod g+w /var/log/gvm
  sudo chmod -R g+srw /var/lib/openvas
