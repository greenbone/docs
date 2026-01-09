Building the Greenbone Community Edition from source requires knowledge about:

- Using a terminal
- Shell programming basics
- Installing software via *apt* or *dnf*
- Using a C compiler
- Using *CMake* and *make*
- The [Linux File System Hierarchy](https://en.wikipedia.org/wiki/Filesystem_Hierarchy_Standard)
- Running services via *systemd*

Additionally, a basic knowledge about the {doc}`architecture </architecture>`
of the Greenbone Community Edition is required to follow this guide.

:::{note}
This guide is intended for developers who want to try out the newest features
and/or want to get familiar with the source code. It is not intended for
production setups.

Currently the docs support the following distributions

- **Debian stable** [(trixie)](https://www.debian.org/releases/stable)
- **Ubuntu 24.04 LTS**
- **Fedora 38**
- **CentOS 9 Stream**

Most likely, other Debian derivatives like Mint and Kali will also work with
only minor adjustments required.
:::
