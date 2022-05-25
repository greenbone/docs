```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
     :caption: Required dependencies for gsad

     sudo apt install -y \
       libbrotli-dev \
       libglib2.0-dev \
       libgnutls28-dev \
       libmicrohttpd-dev \
       libxml2-dev

  .. tab:: Fedora/CentOS
   .. code-block::
     :caption: Required dependencies for gsad

     sudo firewall-cmd --add-port=9392/tcp
     sudo firewall-cmd --runtime-to-permanent

     sudo dnf install -y \
       glib2-devel \
       gnutls-devel \
       libmicrohttpd-devel \
       libxml2-devel
```
