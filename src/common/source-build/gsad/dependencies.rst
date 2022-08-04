.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Required dependencies for gsad

     sudo apt install -y \
       libmicrohttpd-dev \
       libxml2-dev \
       libglib2.0-dev \
       libgnutls28-dev

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for gsad

     sudo firewall-cmd --add-port=9392/tcp
     sudo firewall-cmd --runtime-to-permanent

     sudo dnf install -y \
       glib2-devel \
       gnutls-devel \
       libmicrohttpd-devel \
       libxml2-devel

