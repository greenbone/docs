```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
     :caption: Required dependencies for gvm-libs

     sudo apt install -y \
       libcjson-dev \
       libcurl4-gnutls-dev \
       libgcrypt-dev \
       libglib2.0-dev \
       libgnutls28-dev \
       libgpgme-dev \
       libhiredis-dev \
       libnet1-dev \
       libpaho-mqtt-dev \
       libpcap-dev \
       libssh-dev \
       libxml2-dev \
       uuid-dev

   .. code-block::
     :caption: Optional dependencies for gvm-libs

     sudo apt install -y \
       libldap2-dev \
       libradcli-dev

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for gvm-libs

     sudo dnf install -y \
       cjson-devel \
       glib2-devel \
       gnutls-devel \
       gpgme-devel \
       hiredis-devel \
       libcurl-devel \
       libgcrypt-devel \
       libnet-devel \
       libpcap-devel \
       libssh-devel \
       libuuid-devel \
       libxml2-devel \
       paho-c-devel

   .. code-block::
     :caption: Optional dependencies for gvm-libs

     sudo dnf install -y \
       openldap-devel \
       radcli-devel

  .. tab:: CentOS
   .. code-block::
     :caption: Required dependencies for gvm-libs

     sudo dnf install -y \
       cjson-devel \
       glib2-devel \
       gnutls-devel \
       gpgme-devel \
       hiredis-devel \
       libcurl-devel \
       libgcrypt-devel \
       libnet-devel \
       libpcap-devel \
       libssh-devel \
       libuuid-devel \
       libxml2-devel \
       uuid-devel

   .. code-block::
     :caption: Optional dependencies for gvm-libs

     sudo dnf install -y \
       openldap-devel \
       radcli-devel
```
