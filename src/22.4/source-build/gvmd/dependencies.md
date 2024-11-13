```{eval-rst}
.. tabs::
  .. tab:: Debian
   .. code-block::
     :caption: Required dependencies for gvmd

     sudo apt install -y \
       libglib2.0-dev \
       libgnutls28-dev \
       libpq-dev \
       postgresql-server-dev-15 \
       libical-dev \
       xsltproc \
       rsync \
       libbsd-dev \
       libgpgme-dev


   .. code-block::
     :caption: Optional dependencies for gvmd

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
       gnutls-bin

  .. tab:: Ubuntu
   .. code-block::
     :caption: Required dependencies for gvmd

     sudo apt install -y \
       libglib2.0-dev \
       libgnutls28-dev \
       libpq-dev \
       postgresql-server-dev-14 \
       libical-dev \
       xsltproc \
       rsync \
       libbsd-dev \
       libgpgme-dev


   .. code-block::
     :caption: Optional dependencies for gvmd

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
       gnutls-bin

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
