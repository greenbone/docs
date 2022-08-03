.. code-block::
  :caption: Debian required dependencies for gsad

  sudo apt install -y \
    libmicrohttpd-dev \
    libxml2-dev \
    libglib2.0-dev \
    libgnutls28-dev

.. code-block::
  :caption: Fedora required dependencies for gsad

  firewall-cmd --add-port=9392/tcp
  firewall-cmd --runtime-to-permanent
  sudo dnf install -y \
    glib2-devel \
    gnutls-devel \
    libmicrohttpd-devel \
    libxml2-devel

