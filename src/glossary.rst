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

  GOS
    Greenbone Operating System, the operating system of the
    :term:`GSM appliances <GSM>`. It provides the commercial version of the
    :term:`GVM framework <GVM>` with enterprise support and features.

  GSM
    The commercial product line `Greenbone Security Manager
    <https://www.greenbone.net/en/product-comparison/>`_ available as hardware or
    virtual appliances.

  GMP
    The `Greenbone Management Protocol
    <https://community.greenbone.net/t/about-the-greenbone-management-protocol-gmp-category/83>`_,
    an XML-based communication protocol provided by :term:`gvmd`.

  OSP
    The `Open Scanner Protocol
    <https://community.greenbone.net/t/about-the-open-scanner-protocol-osp-category/98>`_,
    an XML-based communication protocol provided by
    `OSPd <https://github.com/greenbone/ospd>`_-based scanners.

  GVM
    The `Greenbone Vulnerability Management (GVM)
    <https://community.greenbone.net/t/about-gvm-architecture/1231>`_ is a
    framework of several services. It is developed as part of the commercial
    product line :term:`Greenbone Security Manager <GSM>`. Formerly known as
    OpenVAS.

  GSE
    The `Greenbone Source Edition (GSE)
    <https://community.greenbone.net/t/about-the-greenbone-source-edition-gse-category/176>`_
    covers the actual source codes of the Greenbone application stack
    for vulnerability scanning and vulnerability management :term:`GVM`.
    The source edition is adopted by external third parties, e.g., if the
    :term:`GVM` stack is provided by a Linux distribution, it is build from
    the Greenbone Source Edition.

  GPE
    The `Greenbone Professional Edition (GPE)
    <https://community.greenbone.net/t/about-the-greenbone-professional-edition-category/146>`_
    is the Greenbone product line for on-premises solutions.
    Included are virtual or hardware :term:`Greenbone Security Manager (GSM) <GSM>`
    appliances with the :term:`Greenbone Operating System (GOS)<GOS>`,
    the :term:`Greenbone Vulnerability Management (GVM) framework <GVM>`, and
    the :term:`Greenbone Security Feed (GSF) <GSF>`.

  GCF
    The Greenbone Community Feed (GCF) is the freely available feed for vulnerability
    information licensed as Open Source. It contains basic scan configurations,
    report formats, port lists and the most important vulnerability tests. The
    provided data is updated on a daily basis with no warranty or promises for
    fixes or completeness.

  GSF
    The Greenbone Security Feed (GSF) is the commercial feed provided by
    Greenbone Networks containing additional enterprise features like policy and
    compliance checks, extensive reports formats and special scan configurations.
    The feed comes with a service-level agreement ensuring support, quality
    assurance and availability.

  VT
    Vulnerability Tests (VTs), also known as Network Vulnerability Tests
    (NVTs), are scripts written in the NASL programming language to detect
    vulnerabilities at remote hosts.
