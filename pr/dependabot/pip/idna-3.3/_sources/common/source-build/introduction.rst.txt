Building the Greenbone Community Edition stack from source requires knowledge
about:

* Using a terminal
* Shell programming basic
* Installing software via *apt*
* Using a C compiler
* Using *CMake* and *make*
* The `Linux File System Hierarchy <https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard>`_
* Running services via *systemd*

Additionally, a basic knowledge about the :doc:`architecture </architecture>`
of the Greenbone Community Edition is required to follow this guide.

.. note::

  This guide is intended for developers who want to try out the newest features
  and/or want to get familiar with the source code. It is not intended for
  production setups.

  It assumes that **Debian Stable** is used as the Linux distribution. Most
  likely, a Debian derivate like Ubuntu and Kali will also work with only minor
  adjustments required.
