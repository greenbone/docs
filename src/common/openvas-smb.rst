openvas-smb is a helper module for the openvas-scanner. It includes libraries
(openvas-wmiclient/openvas-wincmd) to interface with Microsoft Windows Systems
through the Windows Management Instrumentation API and a winexe binary to
execute processes remotely on that system.

It is an optional dependency of openvas-scanner but is required for scanning
Windows based systems.

.. code-block::
  :caption: Required dependencies for openvas-smb

  sudo apt install \
    libgnutls28-dev \
    libglib2.0-dev \
    libpopt-dev \
    libunistring-dev
    heimdal-dev \
    perl-base
