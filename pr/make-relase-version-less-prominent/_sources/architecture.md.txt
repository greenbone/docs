## Architecture

The Greenbone Community Edition consists of a framework with several services.
It is developed as part of the commercial [Greenbone Enterprise] product line.

The Greenbone Community Edition was originally built as a community project
named [OpenVAS] and is primarily developed and forwarded by [Greenbone].

The architecture for the Greenbone Community Edition is grouped into three major parts:

- Executable scanner applications that run vulnerability tests (VT) against
  target systems
- Greenbone Vulnerability Management Daemon (gvmd)
- Greenbone Security Assistant (GSA) with the Greenbone Security Assistant
  Daemon (gsad)

The following figure shows an overview of the architecture for the 22.4 release.

> :::{figure} images/greenbone-community-22.4-architecture.png
> :alt: Greenbone Community Edition Architecture
>
> Architecture in release 22.4
> :::

The Greenbone Community Edition is released under open-source licenses. By using
it, Linux distributions can create and provide the software components in the
form of installation packages.

### Greenbone Vulnerability Management Daemon (gvmd)

The [Greenbone Vulnerability Management Daemon (gvmd)] – also called Greenbone Vulnerability 
Manager is the central service that consolidates plain vulnerability scanning into 
a full vulnerability management solution. gvmd controls the OpenVAS Scanner via Open 
Scanner Protocol (OSP).

The service itself offers the XML-based, {term}`Greenbone Management Protocol (GMP)<GMP>`. 
gvmd also controls an SQL database (PostgreSQL) where all configuration and scan result data is 
centrally stored. Furthermore, gvmd also handles user management including permissions
control with groups and roles. And finally, the service has an internal runtime
system for scheduled tasks and other events.

### Greenbone Security Assistant (GSA)

The [Greenbone Security Assistant (GSA)] is the web interface that a
user controls scans and accesses vulnerability information with. It is the main
contact point for a user. It connects to gvmd via the web server [Greenbone
Security Assistant Daemon (gsad)][greenbone security assistant daemon (gsad)] to provide a full-featured web application for
vulnerability management. The communication occurs using the
{term}`Greenbone Management Protocol (GMP)<GMP>` with which the user can also
communicate directly by using different tools.

### OpenVAS Scanner

The main scanner [OpenVAS Scanner] is a full-featured scan engine that executes
{term}`Vulnerability Tests (VTs) <VT>` against target systems. For this, it uses
the daily updated and comprehensive feeds: the full-featured, extensive, commercial
{term}`Greenbone Enterprise Feed <Greenbone Enterprise Feed>` or the free
available {term}`Greenbone Community Feed <Greenbone Community Feed>`.

The scanner consists of the components [ospd-openvas] and [openvas-scanner].
The OpenVAS Scanner is controlled via {term}`OSP`. The OSP Daemon for the
OpenVAS Scanner (ospd-openvas) communicates with gvmd via OSP: VT data is
collected, scans are started and stopped, and scan results are transferred to
gvmd via ospd.

### Notus Scanner

The [Notus Scanner] scans during every regular scan, so no user interaction is
necessary. It offers better performance due to less system resource
consumption and thus, faster scanning.

The Notus Scanner replaces the logic of potentially all NASL-based local
security checks (LSCs). A comparison of installed software on a host against a
list of known vulnerable software is done instead of running a VT script for
each LSC.

The regular OpenVAS Scanner loads each NASL LSC individually and executes it
one by one for every host. A single known vulnerability is then compared with
the installed software. This is repeated for all LSCs.

With the Notus Scanner, the list of installed software is loaded in the same
way, but is directly compared with all known vulnerable software for the
operating system of the scanned host. This eliminates the need to run the
LSCs because the information about the known vulnerable software is collected
in one single list and not distributed in individual NASL scripts.

### Additional Software

The [Greenbone Vulnerability Management Tools (gvm-tools)] are a collection of
tools that help with remote controlling Greenbone Community Edition installations
or Greenbone Enterprise Appliances. The tools aid in accessing the communication
protocols {term}`GMP (Greenbone Management Protocol)<GMP>` and
{term}`OSP (Open Scanner Protocol)<OSP>`.

This module is comprised of interactive and non-interactive clients.
The programming language Python is supported directly for interactive scripting.
But it is also possible to issue remote GMP/OSP commands without programming in
Python.

[greenbone]: https://www.greenbone.net/en/
[greenbone enterprise]: https://www.greenbone.net/en/products/
[greenbone security assistant (gsa)]: https://github.com/greenbone/gsa
[greenbone security assistant daemon (gsad)]: https://github.com/greenbone/gsad
[greenbone vulnerability management tools (gvm-tools)]: https://github.com/greenbone/gvm-tools
[greenbone vulnerability manager (gvmd)]: https://github.com/greenbone/gvmd
[notus scanner]: https://github.com/greenbone/notus-scanner
[openvas]: https://www.openvas.org/
[openvas scanner]: https://github.com/greenbone/openvas-scanner
[openvas-scanner]: https://github.com/greenbone/openvas-scanner
[ospd-openvas]: https://github.com/greenbone/ospd-openvas
