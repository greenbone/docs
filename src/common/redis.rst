Redis
-----

.. code-block::

  sudo apt install redis-server

.. code-block::

  sudo cp config/redis-openvas.conf /etc/redis/
  sudo chown redis:redis /etc/redis/redis-openvas.conf
  sudo echo "db_address = /run/redis-openvas/redis.sock" > /etc/openvas/openvas.conf
  sudo systemctl start redis-server@openvas.service
