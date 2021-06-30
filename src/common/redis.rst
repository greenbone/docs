Setting up the Redis Data Store
-------------------------------

Looking at the :doc:`../architecture`, the `Redis <https://redis.io/>`_ key/value
storage is used by the scanner (*openvas-scanner* and *ospd-openvas*) for handling
the :term:`VT` information and scan results.

.. code-block::
  :caption: Installing the Redis server

  sudo apt install -y redis-server

After installing the Redis server package, a specific configuration for the
*openvas-scanner* must be added.

.. code-block::
  :caption: Adding configuration for running the Redis server for the scanner

  sudo cp $SOURCE_DIR/openvas-scanner-$GVM_VERSION/config/redis-openvas.conf /etc/redis/
  sudo chown redis:redis /etc/redis/redis-openvas.conf
  echo "db_address = /run/redis-openvas/redis.sock" | sudo tee -a /etc/openvas/openvas.conf

  # start redis with openvas config
  sudo systemctl start redis-server@openvas.service

  # ensure redis with openvas config is started on every system startup
  sudo systemctl enable redis-server@openvas.service


Additionally the *gvm* user must be able to access the redis unix socket at
:file:`/run/redis-openvas/redis.sock`.

.. code-block::
  :caption: Adding the *gvm* user to the redis group

  sudo usermod -aG redis gvm
