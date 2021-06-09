GVM Architecture
****************

The Greenbone Vulnerability Management (GVM) is a framework of several services.
It is developed as part of the commercial product line `Greenbone Professional Edition`_.
The following figure shows an overview of the architecture for GVM 20.08 and
GVM 21.04.

.. figure:: images/gvm-architecture.png
  :alt: GVM Architecture

  Architecture of GVM 20.08 and 21.04.

GVM is grouped into three major parts

* scanner
* manager
* web frontend


The scanner consists of the components `ospd-openvas`_ and `openvas-scanner`_.
The communication protocol used for the scanner is named **Open Scanner Protocol
(OSP)**.

The manager is a single component using a PostgreSQL database as backend called
`gvmd`_.

The frontend consists of the web server gsad providing also the web based API
and the web application `Greenbone Security Assistant (GSA) <gsa>`_

.. _Greenbone Professional Edition: https://www.greenbone.net/en/solutions/
.. _ospd-openvas: https://github.com/greenbone/ospd-openvas
.. _openvas-scanner: https://github.com/greenbone/openvas-scanner
.. _gvmd: https://github.com/greenbone/gvmd
.. _gsa: https://github.com/greenbone/gsa
