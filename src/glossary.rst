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
    of the :term:`Greenbone Community Edition` with enterprise support and
    features.

  GSM
    Greenbone Security Manager (GSM) is the former name of our commercial
    product line :term:`Greenbone Enterprise` as hardware or virtual appliances.

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
    software framework has been named Greenbone Vulnerability Management (GVM)
    in the past.

  Greenbone Community Edition
    The Greenbone Community Edition covers the actual releases of the Greenbone
    application framework for vulnerability scanning and vulnerability
    management provided as open-source software to the community. The Greenbone
    Community Edition is adopted by external third parties, e.g., if the
    software framework is provided by a Linux distribution, it is build from the
    Greenbone Community Edition. It is developed as part of the commercial
    :term:`Greenbone Enterprise` product line. Sometimes referred to as the
    OpenVAS framework.

  Greenbone Community Containers
    Container images that are pre-build on `GitHub <https://github.com/greenbone>`_
    and available via `dockerhub <https://hub.docker.com/u/greenbone>`_. These
    images can be used to run the newest versions of the :term:`Greenbone Community Edition`
    without having to care about the operating system, compiler and build
    tool chains.

  Greenbone Enterprise
    Greenbone Enterprise is the `Greenbone product line for on-premises solutions
    <https://www.greenbone.net/en/product-comparison/>`_.
    Included are virtual or hardware Greenbone Enterprise Appliances with the
    :term:`Greenbone Operating System (GOS)<GOS>`,
    the :term:`Greenbone Vulnerability Management (GVM) framework <GVM>`, and
    the :term:`Greenbone Enterprise Feed`.

  Greenbone Community Feed
    The `Greenbone Community Feed <https://www.greenbone.net/en/feed-comparison/>`_
    is the freely available feed for vulnerability information licensed as open-source.
    It contains basic scan configurations, report formats, port lists and the
    most important vulnerability tests. The provided data is updated on a daily
    basis with no warranty or promises for fixes or completeness.

  Greenbone Enterprise Feed
    The `Greenbone Enterprise Feed <https://www.greenbone.net/en/feed-comparison/>`_
    is the commercial feed provided by Greenbone Networks containing additional
    enterprise features like vulnerability tests for enterprise products, policy
    and compliance checks, extensive reports formats and special scan configurations.
    The feed comes with a service-level agreement ensuring support, quality
    assurance and availability.

  VT
    Vulnerability Tests (VTs), also known as Network Vulnerability Tests
    (NVTs), are scripts written in the NASL programming language to detect
    vulnerabilities at remote hosts.

  SCAP
    Abbreviation for `Security Content Automation Protocol <https://csrc.nist.gov/projects/security-content-automation-protocol/>`_.
    It is used for providing :term:`CPE` and :term:`CVE` data via the Greenbone
    Enterprise and Community Feeds.

  CPE
    Abbreviation for `Common Platform Enumeration <https://csrc.nist.gov/Projects/Security-Content-Automation-Protocol/Specifications/cpe>`_.
    Common Platform Enumeration (CPE) is a standardized method of describing and
    identifying classes of applications, operating systems, and hardware devices
    present among an enterprise's computing assets.

  CVE
    Abbreviation for `Common Vulnerabilities and Exposures <https://www.cve.org/>`_.
    It provides unique, common identifiers for publicly known information-security
    vulnerabilities in publicly released software packages.

  notus-scanner
    A new scanner that got introduced in the 22.4 release to improve the so-called
    local security checks. Local security checks are comparisons of
    vulnerable and installed versions of a software. Before notus-scanner, all
    checks have been implemented in nasl scripts and each nasl script ran in an
    own openvas-scanner process. With notus-scanner, checks are run in one go per
    host.
