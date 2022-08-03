.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Required dependencies for openvas-scanner

     sudo apt install -y \
       bison \
       libglib2.0-dev \
       libgnutls28-dev \
       libgcrypt20-dev \
       libpcap-dev \
       libgpgme-dev \
       libksba-dev \
       rsync \
       nmap \
       libjson-glib-dev \
       libbsd-dev

   .. code-block::
     :caption: Debian optional dependencies for openvas-scanner

     sudo apt install -y \
       python3-impacket \
       libsnmp-dev

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for openvas-scanner

     sudo dnf install -y \
       bison \
       glib2-devel \
       gnutls-devel \
       libgcrypt-devel \
       libpcap-devel \
       gpgme-devel \
       libksba-devel \
       rsync \
       nmap \
       json-glib-devel \
       libbsd-devel

   .. code-block::
     :caption: Fedora optional dependencies for openvas-scanner

     sudo dnf install -y \
       python3-impacket \
