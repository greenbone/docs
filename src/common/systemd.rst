Starting Services with Systemd
------------------------------

`Systemd <https://systemd.io/>`_ is used to start the daemons ospd-openvas,
gvmd and gsad. Therefore service files are required.

.. code-block:: none
  :caption: Systemd Service File for ospd-openvas

  cat << EOF > $BUILD_DIR/ospd-openvas.service
  [Unit]
  Description=OpenVAS Wrapper of the Greenbone Vulnerability Management (ospd-openvas)
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
  ExecStart=/usr/local/bin/ospd-openvas --unix-socket /run/ospd/ospd.sock --pid-file /run/ospd/ospd-openvas.pid --log-file /var/log/gvm/ospd-openvas.log --lock-file-dir /var/lib/openvas
  SuccessExitStatus=SIGKILL
  # This works asynchronously, but does not take the daemon down during the reload so it's ok.
  Restart=always
  RestartSec=60

  [Install]
  WantedBy=multi-user.target
  EOF

  sudo cp $BUILD_DIR/ospd-openvas.service /etc/systemd/system/

.. code-block:: none
  :caption: Systemd Service File for gvmd

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
  PIDFile=/run/gvm/gvmd.pid
  RuntimeDirectory=gvm
  RuntimeDirectoryMode=2775
  ExecStart=/usr/local/sbin/gvmd --osp-vt-update=/run/ospd/ospd.sock
  Restart=always
  TimeoutStopSec=10

  [Install]
  WantedBy=multi-user.target
  EOF

  sudo cp $BUILD_DIR/gvmd.service /etc/systemd/system/

.. code-block:: none
  :caption: Systemd Service File for gsad

  cat << EOF > $BUILD_DIR/greenbone-security-assistant.service
  [Unit]
  Description=Greenbone Security Assistant (gsad)
  Documentation=man:gsad(8) https://www.greenbone.net
  After=network.target gvmd.service
  Wants=gvmd.service

  [Service]
  Type=forking
  User=gvm
  Group=gvm
  PIDFile=/run/gvm/gsad.pid
  ExecStart=/usr/local/sbin/gsad --listen=127.0.0.1 --port=9392
  Restart=always
  TimeoutStopSec=10

  [Install]
  WantedBy=multi-user.target
  Alias=gsad.service
  EOF

  sudo cp $BUILD_DIR/greenbone-security-assistant.service /etc/systemd/system/

Afterwards the services need to be activated and started.

.. code-block::
  :caption: Make systemd aware of the new service files

  systemctl daemon-reload

.. code-block::
  :caption: Ensure services are run at every system startup

  systemctl enable ospd-openvas
  systemctl enable gvmd
  systemctl enable gsad

.. warning::

  Please be aware the **first startup** of the services may take several minutes
  or even hours!

  At the first start the scanner needs to load all :term:`VTs<VT>` into redis
  and gvmd must process the CERT and SCAP data.  gvmd requests all VT
  information from the scanner after they are loaded by the scanner. The scan
  configs are only available if a *Feed Import Owner* is set, gvmd can connect
  to the scanner and the VTs are fully loaded by both services.

.. code-block::
  :caption: Finally start the services

  systemctl start ospd-openvas
  systemctl start gvmd
  systemctl start gsad
