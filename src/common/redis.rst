Redis
-----

.. code-block::

  sudo apt install redis-server

.. code-block::

  sudo cp $SOURCE_DIR/openvas-scanner-$GVM_VERSION/config/redis-openvas.conf /etc/redis/
  sudo chown redis:redis /etc/redis/redis-openvas.conf
  echo "db_address = /run/redis-openvas/redis.sock" | sudo tee -a /etc/openvas/openvas.conf
  sudo systemctl start redis-server@openvas.service
