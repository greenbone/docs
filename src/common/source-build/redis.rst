Setting up the Redis Data Store
-------------------------------

Looking at the :doc:`/architecture`, the `Redis <https://redis.io/>`_ key/value
storage is used by the scanner (*openvas-scanner* and *ospd-openvas*) for handling
the :term:`VT` information and scan results.

.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Installing the Redis server

     sudo apt install -y redis-server

  .. tab:: Ubuntu
   .. code-block::
     :caption: Installing the Redis server

     sudo apt install -y redis-server

  .. tab:: Fedora
   .. code-block::
     :caption: Installing the Redis server

     sudo dnf install -y redis
     sudo dnf install -y policycoreutils-python-utils
     sudo semanage fcontext -a -f a -t redis_var_run_t -r s0 '/var/run/redis-openvas(/.*)?'

     sudo cat << EOF > /etc/tmpfiles.d/redis-openvas.conf
     d       /var/lib/redis/openvas   0750 redis redis - -
     z       /var/lib/redis/openvas   0750 redis redis - -
     d       /run/redis-openvas       0750 redis redis - -
     z       /run/redis-openvas       0750 redis redis - -
     EOF

     systemd-tmpfiles  --create

     sudo cat << EOF > /etc/systemd/system/redis-server@.service
     [Unit]
     Description=Redis persistent key-value database
     After=network.target
     After=network-online.target
     Wants=network-online.target

     [Service]
     WorkingDirectory=/var/lib/redis/%i
     ExecStart=/usr/bin/redis-server /etc/redis/redis-%i.conf --daemonize no --supervised systemd
     ExecStop=/usr/libexec/redis-shutdown
     Type=notify
     User=redis
     Group=redis
     RuntimeDirectory=%i
     RuntimeDirectoryMode=0755

     [Install]
     WantedBy=multi-user.target
     EOF

  .. tab:: CentOS
   .. code-block::
     :caption: Installing the Redis server

     sudo dnf install -y redis
     sudo dnf install -y policycoreutils-python-utils
     sudo semanage fcontext -a -f a -t redis_var_run_t -r s0 '/var/run/redis-openvas(/.*)?'

     sudo cat << EOF > /etc/tmpfiles.d/redis-openvas.conf
     d       /var/lib/redis/openvas   0750 redis redis - -
     z       /var/lib/redis/openvas   0750 redis redis - -
     d       /run/redis-openvas       0750 redis redis - -
     z       /run/redis-openvas       0750 redis redis - -
     EOF

     systemd-tmpfiles  --create

     sudo cat << EOF > /etc/systemd/system/redis-server@.service
     [Unit]
     Description=Redis persistent key-value database
     After=network.target
     After=network-online.target
     Wants=network-online.target

     [Service]
     WorkingDirectory=/var/lib/redis/%i
     ExecStart=/usr/bin/redis-server /etc/redis/redis-%i.conf --daemonize no --supervised systemd
     ExecStop=/usr/libexec/redis-shutdown
     Type=notify
     User=redis
     Group=redis
     RuntimeDirectory=%i
     RuntimeDirectoryMode=0755

     [Install]
     WantedBy=multi-user.target
     EOF

After installing the Redis server package, a specific configuration for the
*openvas-scanner* must be added.

.. code-block::
  :caption: Adding configuration for running the Redis server for the scanner

  sudo cp $SOURCE_DIR/openvas-scanner-$GVM_VERSION/config/redis-openvas.conf /etc/redis/
  sudo chown redis:redis /etc/redis/redis-openvas.conf
  echo "db_address = /run/redis-openvas/redis.sock" | sudo tee -a /etc/openvas/openvas.conf

.. code-block::
  :caption: Start redis with openvas config

  sudo systemctl start redis-server@openvas.service

.. code-block::
  :caption: Ensure redis with openvas config is started on every system startup

  sudo systemctl enable redis-server@openvas.service


Additionally the *gvm* user must be able to access the redis unix socket at
:file:`/run/redis-openvas/redis.sock`.

.. code-block::
  :caption: Adding the *gvm* user to the redis group

  sudo usermod -aG redis gvm
