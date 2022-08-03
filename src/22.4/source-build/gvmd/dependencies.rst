.. code-block::
  :caption: Debian required dependencies for gvmd

  sudo apt install -y \
    libglib2.0-dev \
    libgnutls28-dev \
    libpq-dev \
    postgresql-server-dev-13 \
    libical-dev \
    xsltproc \
    rsync \
    libbsd-dev \
    libgpgme-dev


.. code-block::
  :caption: Debian optional dependencies for gvmd

  sudo apt install -y --no-install-recommends \
    texlive-latex-extra \
    texlive-fonts-recommended \
    xmlstarlet \
    zip \
    rpm \
    fakeroot \
    dpkg \
    nsis \
    gnupg \
    gpgsm \
    wget \
    sshpass \
    openssh-client \
    socat \
    snmp \
    python3 \
    smbclient \
    python3-lxml \
    gnutls-bin \
    xml-twig-tools

.. code-block::
  :caption: Fedora required dependencies for gvmd

  sudo dnf install -y \
    glib2-devel \
    gnutls-devel \
    postgresql-server-devel \
    libical-devel \
    xsltproc \
    rsync \
    libbsd-devel \
    gpgme-devel

  sudo mkdir /usr/include/postgresql
  sudo cp /usr/include/libpq-fe.h /usr/include/postgresql/libpq-fe.h

.. code-block::
  :caption: Fedora optional dependencies for gvmd

  sudo dnf install -y --setopt=install_weak_deps=False \
    texlive-scheme-medium \
    texlive-fontawesome \
    texlive-fontmfizz \
    texlive-fonts-churchslavonic \
    texlive-fontsetup \
    texlive-fontsize \
    texlive-fonttable \
    fontawesome-fonts \
    gnupg2-smime \
    openssh-clients \
    xmlstarlet \
    zip \
    rpm \
    fakeroot \
    dpkg \
    nsis \
    gnupg \
    wget \
    sshpass \
    socat \
    samba-client \
    python3-lxml \
    gnutls-utils \
    perl-XML-Twig

