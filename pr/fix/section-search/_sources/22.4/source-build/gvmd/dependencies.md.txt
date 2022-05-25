```{eval-rst}
.. tabs::
  .. tab:: Debian/Ubuntu
   .. code-block::
     :caption: Required dependencies for gvmd

     sudo apt install -y \
       libbsd-dev \
       libcjson-dev \
       libglib2.0-dev \
       libgnutls28-dev \
       libgpgme-dev \
       libical-dev \
       libpq-dev \
       postgresql-server-dev-all \
       rsync \
       xsltproc

   .. code-block::
     :caption: Optional dependencies for gvmd

     sudo apt install -y --no-install-recommends \
       dpkg \
       fakeroot \
       gnupg \
       gnutls-bin \
       gpgsm \
       nsis \
       openssh-client \
       python3 \
       python3-lxml \
       rpm \
       smbclient \
       snmp \
       socat \
       sshpass \
       texlive-fonts-recommended \
       texlive-latex-extra \
       wget \
       xmlstarlet \
       zip

  .. tab:: Fedora
   .. code-block::
     :caption: Required dependencies for gvmd

     sudo dnf install -y \
       glib2-devel \
       gnutls-devel \
       postgresql-server-devel \
       libical-devel \
       xsltproc \
       rsync \
       libbsd-devel \
       gpgme-devel

   .. code-block::
     :caption: Optional dependencies for gvmd

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
       mingw64-nsis \
       gnupg \
       wget \
       sshpass \
       socat \
       samba-client \
       python3-lxml \
       gnutls-utils

  .. tab:: CentOS
   .. code-block::
     :caption: Required dependencies for gvmd

     sudo dnf install -y \
       glib2-devel \
       gnutls-devel \
       postgresql-server-devel \
       libical-devel \
       libxslt \
       rsync \
       libbsd-devel \
       gpgme-devel

   .. code-block::
     :caption: Optional dependencies for gvmd

     sudo dnf install -y --setopt=install_weak_deps=False \
       texlive* \
       gnupg2-smime \
       openssh-clients \
       xmlstarlet \
       zip \
       rpm \
       fakeroot \
       dpkg \
       gnupg \
       wget \
       sshpass \
       socat \
       samba-client \
       python3-lxml \
       gnutls-utils
```
