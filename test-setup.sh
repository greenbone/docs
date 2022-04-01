#!/bin/bash

set -e

source ./test-env.sh

$APT_INSTALL sudo

$SUDO useradd -r -M -U -G sudo -s /usr/sbin/nologin gvm

$SUDO usermod -aG gvm $USER

su $USER

# setup redis

$APT_INSTALL redis-server

$SUDO cp $SOURCE_DIR/openvas-scanner-$GVM_VERSION/config/redis-openvas.conf /etc/redis/
$SUDO chown redis:redis /etc/redis/redis-openvas.conf
echo "db_address = /run/redis-openvas/redis.sock" | $SUDO tee -a /etc/openvas/openvas.conf

$SUDO usermod -aG redis gvm

# adjust permissions
$SUDO chown -R gvm:gvm /var/lib/gvm
$SUDO chown -R gvm:gvm /var/lib/openvas
$SUDO chown -R gvm:gvm /var/log/gvm
$SUDO chown -R gvm:gvm /run/gvmd
$SUDO chown -R gvm:gvm /run/gsad
$SUDO chown -R gvm:gvm /run/ospd

$SUDO chmod -R g+srw /var/lib/gvm
$SUDO chmod -R g+srw /var/lib/openvas
$SUDO chmod -R g+srw /var/log/gvm

$SUDO chown gvm:gvm /usr/local/sbin/gvmd
$SUDO chmod 6750 /usr/local/sbin/gvmd

$SUDO chown gvm:gvm /usr/local/bin/greenbone-nvt-sync
$SUDO chmod 740 /usr/local/sbin/greenbone-feed-sync
$SUDO chown gvm:gvm /usr/local/sbin/greenbone-*-sync
$SUDO chmod 740 /usr/local/sbin/greenbone-*-sync

# postgres
$APT_INSTALL postgresql

if [ $HAS_SYSTEMD -eq 1 ]; then
    $SUDO systemctl start postgresql@13-main
else
    pg_ctlcluster 13-main start
fi

sudo -u postgres createuser -DRS gvm
sudo -u postgres createdb -O gvm gvmd
sudo -u postgres psql gvmd -c 'create role dba with superuser noinherit;'
sudo -u postgres psql gvmd -c 'grant dba to gvm;'
sudo -u postgres psql gvmd -c 'create extension "uuid-ossp";'
sudo -u postgres psql gvmd -c 'create extension "pgcrypto";'

# setup gvmd
gvmd --create-user=admin --password=admin
gvmd --modify-setting 78eceaec-3385-11ea-b237-28d24461215b --value `gvmd --get-users --verbose | grep admin | awk '{print $2}'`

# start services
if [ $HAS_SYSTEMD -eq 1 ]; then
    $SUDO systemctl start redis-server@openvas.service
    $SUDO systemctl enable redis-server@openvas.service

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

    $SUDO cp $BUILD_DIR/ospd-openvas.service /etc/systemd/system/

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

    $SUDO cp $BUILD_DIR/gvmd.service /etc/systemd/system/

    cat << EOF > $BUILD_DIR/gsad.service
[Unit]
Description=Greenbone Security Assistant daemon (gsad)
Documentation=man:gsad(8) https://www.greenbone.net
After=network.target gvmd.service
Wants=gvmd.service

[Service]
Type=forking
User=gvm
Group=gvm
RuntimeDirectory=gsad
RuntimeDirectoryMode=2775
PIDFile=/run/gsad/gsad.pid
ExecStart=/usr/local/sbin/gsad --listen=127.0.0.1 --port=9392 --http-only
Restart=always
TimeoutStopSec=10

[Install]
WantedBy=multi-user.target
Alias=greenbone-security-assistant.service
EOF

    $SUDO cp $BUILD_DIR/gsad.service /etc/systemd/system/

    $SUDO systemctl daemon-reload

    $SUDO systemctl enable ospd-openvas
    $SUDO systemctl enable gvmd
    $SUDO systemctl enable gsad

    $SUDO systemctl start ospd-openvas
    $SUDO systemctl start gvmd
    $SUDO systemctl start gsad
else
    # likely in docker container
fi
