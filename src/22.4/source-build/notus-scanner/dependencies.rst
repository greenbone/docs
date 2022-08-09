.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Required dependencies for notus-scanner

     sudo apt install -y \
       python3 \
       python3-pip \
       python3-setuptools \
       python3-paho-mqtt \
       python3-psutil \
       python3-gnupg

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for notus-scanner

     INSTALL_PREFIX=/usr
     sudo dnf install -y \
       python3 \
       python3-pip \
       python3-setuptools \
       python3-paho-mqtt \
       python3-psutil \
       python3-gnupg

  .. tab:: CentOS
   .. code-block::
     :caption: Required dependencies for notus-scanner

     sudo dnf install -y \
       python3 \
       python3-pip \
       python3-setuptools \
       python3-wheel \
       python3-psutil

