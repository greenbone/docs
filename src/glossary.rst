Glossary
========

.. glossary::

  gvmd
    Management daemon shipped with GVM 10 and later. Abbreviation for
    **G**\reenbone **V**\ulnerability **M**\anager **D**\aemon.

  openvassd
    Scanner daemon used by GVM 10 and before. It listens for incoming
    connections and starts scan processes to run the actual vulnerability tests.
    It collects the results and reports them to the management daemon. With the
    GVM 11 release, it has been converted to the :term:`openvas` application by
    removing the daemon and replacing the communication protocol.
    Abbreviation for **OpenVAS** **S**\canner **D**\aemon.

  openvas
    Scanner application executable to run vulnerability tests against targets
    and to store scan results into a Redis database. Used in
    GVM 11 and later. It has originated from the :term:`openvassd`.

  OSPd
    A `framework <https://github.com/greenbone/ospd>`_ for several scanner
    daemons speaking the :term:`Open Scanner Protocol (OSP) <OSP>`.

  ospd-openvas
    A :term:`OSP <OSP>` scanner daemon managing the :term:`openvas <openvas>`
    executable for reporting scan results to the management daemon :term:`gvmd`.
    Used in GVM 11 and later.

  gsad
    A web server providing the :term:`Greenbone Security Assistant <GSA>` web
    application.

  GSA
    The Greenbone Security Assistant (GSA) web application to control scans and
    access vulnerability information via a web interface in a browser.

  GOS
    Greenbone Operating System, the operating system of the
    :term:`Greenbone Enterprise` Appliance. It provides the commercial version
    of the :term:`GVM framework <GVM>` with enterprise support and features.

  GSM
    Greenbone Security Manager is the former name of our commercial product line
    :term:`Greenbone Enterprise` as hardware or virtual appliances.

  GMP
    The Greenbone Management Protocol (GMP) is an XML-based communication
    protocol provided by :term:`gvmd`. It provides an API to create, read, update
    and delete scans and vulnerability information.

  OSP
    The Open Scanner Protocol is an XML-based communication protocol provided by
    :term:`ospd-openvas`. It provides an API to start scans, get :term:`VT`
    information and to receive scan results.

  GVM
    The :term:`Greenbone Community Edition` consists of several services. This
    software framework has been released as Greenbone Vulnerability Management (GVM).
    It is developed as part of the commercial :term:`Greenbone Enterprise`
    product line. Sometimes referred to as the OpenVAS framework.

  Greenbone Community Edition
    The Greenbone Community Edition covers the actual releases of the Greenbone
    application stack for vulnerability scanning and vulnerability management
    :term:`GVM` provided as open-source software to the community.
    The Greenbone Community Edition is adopted by external third parties, e.g., if the
    :term:`GVM` stack is provided by a Linux distribution, it is build from
    the Greenbone Community Edition.

  Greenbone Enterprise
    Greenbone Enterprise is the `Greenbone product line for on-premises solutions
    <https://www.greenbone.net/en/product-comparison/>`_.
    Included are virtual or hardware Greenbone Enterprise Appliances with the
    :term:`Greenbone Operating System (GOS)<GOS>`,
    the :term:`Greenbone Vulnerability Management (GVM) framework <GVM>`, and
    the :term:`Greenbone Enterprise Feed`.

  Greenbone Community Feed
    The Greenbone Community Feed is the freely available feed for vulnerability
    information licensed as open-source. It contains basic scan configurations,
    report formats, port lists and the most important vulnerability tests. The
    provided data is updated on a daily basis with no warranty or promises for
    fixes or completeness.

  Greenbone Enterprise Feed
    The Greenbone Enterprise Feed is the commercial feed provided by
    Greenbone Networks containing additional enterprise features like
    vulnerability tests for enterprise products, policy and compliance checks,
    extensive reports formats and special scan configurations.
    The feed comes with a service-level agreement ensuring support, quality
    assurance and availability.

  VT
    Vulnerability Tests (VTs), also known as Network Vulnerability Tests
    (NVTs), are scripts written in the NASL programming language to detect
    vulnerabilities at remote hosts.
