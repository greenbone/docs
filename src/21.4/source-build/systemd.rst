Setting up Services for *Systemd*
---------------------------------

`Systemd <https://systemd.io/>`_ is used to start the daemons *ospd-openvas*,
*gvmd* and *gsad*. Therefore, service files are required.

.. code-block:: none
  :caption: Systemd service file for ospd-openvas

  cat << EOF > $BUILD_DIR/ospd-openvas.service
  [Unit]
  Description=OSPd Wrapper for the OpenVAS Scanner (ospd-openvas)
  Documentation=man:ospd-openvas(8) man:openvas(8)
  After=network.target networking.service redis-server@openvas.service
  Wants=redis-server@openvas.service
  ConditionKernelCommandLine=!recovery

  [Service]
  Type=forking
  User=gvm
  Group=gvm
  RuntimeDirectory=ospd
  RuntimeDirectoryMode=2775
  PIDFile=/run/ospd/ospd-openvas.pid
  ExecStart=/usr/local/bin/ospd-openvas --unix-socket /run/ospd/ospd-openvas.sock --pid-file /run/ospd/ospd-openvas.pid --log-file /var/log/gvm/ospd-openvas.log --lock-file-dir /var/lib/openvas --socket-mode 0o770
  SuccessExitStatus=SIGKILL
  Restart=always
  RestartSec=60

  [Install]
  WantedBy=multi-user.target
  EOF

.. code-block::
  :caption: Install systemd service file for ospd-openvas

  sudo cp $BUILD_DIR/ospd-openvas.service /etc/systemd/system/

.. code-block:: none
  :caption: Systemd service file for gvmd

  cat << EOF > $BUILD_DIR/gvmd.service
  [Unit]
  Description=Greenbone Vulnerability Manager daemon (gvmd)
  After=network.target networking.service postgresql.service ospd-openvas.service
  Wants=postgresql.service ospd-openvas.service
  Documentation=man:gvmd(8)
  ConditionKernelCommandLine=!recovery

  [Service]
  Type=forking
  User=gvm
  Group=gvm
  PIDFile=/run/gvmd/gvmd.pid
  RuntimeDirectory=gvmd
  RuntimeDirectoryMode=2775
  ExecStart=/usr/local/sbin/gvmd --osp-vt-update=/run/ospd/ospd-openvas.sock --listen-group=gvm
  Restart=always
  TimeoutStopSec=10

  [Install]
  WantedBy=multi-user.target
  EOF

.. code-block::
  :caption: Install systemd service file for gvmd

  sudo cp $BUILD_DIR/gvmd.service /etc/systemd/system/

.. code-block:: none
  :caption: Systemd service file for gsad

  cat << EOF > $BUILD_DIR/gsad.service
  [Unit]
  Description=Greenbone Security Assistant daemon (gsad)
  Documentation=man:gsad(8) https://www.greenbone.net
  After=network.target gvmd.service
  Wants=gvmd.service

  [Service]
  Type=exec
  User=gvm
  Group=gvm
  RuntimeDirectory=gsad
  RuntimeDirectoryMode=2775
  PIDFile=/run/gsad/gsad.pid
  ExecStart=/usr/local/sbin/gsad --foreground --listen=127.0.0.1 --port=9392 --http-only
  Restart=always
  TimeoutStopSec=10

  [Install]
  WantedBy=multi-user.target
  Alias=greenbone-security-assistant.service
  EOF

.. code-block::
  :caption: Install systemd service file for gsad

  sudo cp $BUILD_DIR/gsad.service /etc/systemd/system/

Afterwards, the services need to be activated and started.

.. code-block::
  :caption: Making systemd aware of the new service files

  sudo systemctl daemon-reload

.. code-block::
  :caption: Ensuring services are run at every system startup

  sudo systemctl enable ospd-openvas
  sudo systemctl enable gvmd
  sudo systemctl enable gsad
