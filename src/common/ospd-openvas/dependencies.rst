.. code-block::
  :caption: Required dependencies for ospd-openvas
  
  echo 'deb http://deb.debian.org/debian buster-backports main' >/etc/apt/sources.list.d/backports.list
  sudp apt update

  sudo apt install -y \
    python3 \
    python3-pip \
    python3-setuptools \
    python3-packaging \
    python3-wrapt \
    python3-cffi \
    python3-psutil/buster-backports \
    python3-lxml \
    python3-defusedxml \
    python3-paramiko \
    python3-redis
