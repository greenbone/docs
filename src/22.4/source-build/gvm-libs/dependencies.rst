.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Required dependencies for gvm-libs

     sudo apt install -y \
       libglib2.0-dev \
       libgpgme-dev \
       libgnutls28-dev \
       uuid-dev \
       libssh-gcrypt-dev \
       libhiredis-dev \
       libxml2-dev \
       libpcap-dev \
       libnet1-dev \
       libpaho-mqtt-dev

   .. code-block::
     :caption: Optional dependencies for gvm-libs

     sudo apt install -y \
       libldap2-dev \
       libradcli-dev

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for gvm-libs

     sudo dnf install -y \
       glib2-devel \
       gpgme-devel \
       gnutls-devel \
       libgcrypt-devel \
       libuuid-devel \
       libssh-devel \
       hiredis-devel \
       libxml2-devel \
       libpcap-devel \
       libnet-devel \
       paho-c-devel

   .. code-block::
     :caption: Optional dependencies for gvm-libs

     sudo dnf install -y \
       openldap-devel \
       radcli-devel

