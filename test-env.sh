if [ $(id -u) -eq 0 ]; then
    SUDO=""
    APT_UPDATE="apt update"
    APT_INSTALL="apt install -y --no-install-recommends --no-install-suggests"
else
    SUDO=sudo
    APT_UPDATE="sudo apt update"
    APT_INSTALL="sudo apt install -y --no-install-recommends --no-install-suggests"
fi

HAS_SYSTEMD=1
which systemd >/dev/null || HAS_SYSTEMD=0

export INSTALL_PREFIX=/usr/local
export PATH=$PATH:$INSTALL_PREFIX/sbin

export SOURCE_DIR=$HOME/source
export BUILD_DIR=$HOME/build
export INSTALL_DIR=$HOME/install

export GVM_VERSION=21.4.4
export GVM_LIBS_VERSION=$GVM_VERSION
export GVMD_VERSION=21.4.5
export GSA_VERSION=$GVM_VERSION
export GSAD_VERSION=$GVM_VERSION
export OPENVAS_SMB_VERSION=21.4.0
export OPENVAS_SCANNER_VERSION=$GVM_VERSION
export OSPD_OPENVAS_VERSION=$GVM_VERSION
