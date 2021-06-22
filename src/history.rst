Greenbone, GVM, OpenVAS and How They Are Connected
==================================================

When the OpenVAS project was created, it only consisted of an engine for scanning
vulnerabilities.

Shortly after that, Greenbone Networks was founded to achieve
professional support for vulnerability scanning. Greenbone started to lead the
development, added several software components and turned OpenVAS into a
vulnerability management solution still keeping the values of free software.

After several years it became obvious that using OpenVAS as the brand name for
the open source project and funding nearly all development of the project was not
recognized from the outside. Therefore, after the release of the OpenVAS 9
framework, it got renamed to Greenbone Vulnerability Management (GVM) and
released as Greenbone Source Edition (GSE). Since GVM 10 the term OpenVAS is
only used for the scanner component as it was at the beginning of the project.

History of the OpenVAS project
==============================

In 2005, the developers of the vulnerability scanner Nessus decided to
discontinue the work under Open Source licenses and switch to a proprietary
business model.

At this point, developers from Intevation and DN-Systems (the two companies
which would later found Greenbone Networks) already contributed developments to
Nessus, focussing on client tools. The works were primarily supported by the
German Federal Office for Information Security (BSI)

In 2006, several forks of Nessus were created as a reaction to the
discontinuation of the Open Source solution. Of these forks, only one continued
to show activity: OpenVAS, the Open Vulnerability Assessment System. OpenVAS was
registered as a project at Software in the Public Interest, Inc. to hold and
protect the domain "openvas.org".

The years 2006 and 2007 had little activity beyond clean-ups of the status quo.
But in late 2008, the company Greenbone Networks GmbH, based in Osnabrück,
Germany was founded to push forward OpenVAS. Essentially, Greenbone's business
plan was about 3 cornerstones:

    1. Go beyond plain vulnerability scanning towards a comprehensive
       vulnerability management solution.
    2. Create a turn-key appliance product for enterprise customers.
    3. Continue the Open Source concept of creating transparent security
       technology.

Also in 2008, two further companies became active, Secpod from India and
Security Space from Canada. Both of them had a focus on contributing
vulnerability tests, and teamed up with Greenbone to start producing a reliable
and up-to-date feed of vulnerability tests. This started with removing any
source code and vulnerability tests where the license was not clear or not
compatible. Several thousands of vulnerability tests were eliminated for a clean
starting point. Shortly after this, the feed content was growing quickly and
steadily.

In 2009, Greenbone added the first additional modules to build a vulnerability
management solution. The web interface and the central management service were
developed from scratch, defining generic protocols as their API. At the same
time, the OpenVAS scanner was carefully improved, and quickly lost compatibility
with its ancestor. All the Open Source works were published under the brand
"OpenVAS". The first "Greenbone Security Manager" appliance products entered the
market in the spring of 2010.

In the years 2010 to 2016, the commercial product was systematically improved
and extended, and so were the Open Source modules as well. The vulnerability
management was extended to carry daily updated security advisories, contributed
to the public with a GPL-compatible license from German CERTs DFN-CERT and
CERT-Bund, a division at the Federal Office for Information Security (BSI) who
supported OpenVAS in various ways over these years.

In March 2017, the so-called OpenVAS framework reached version 9. Many new
modules and numerous features were added during the release cycles. Some hundred
thousands lines of code were produced and there was almost no day without a
couple of published code improvements by a growing developer team.

The year 2017 marked the beginning of a new era: First of all, Greenbone became
visible as the driving force behind OpenVAS, reducing the brand confusion. This
included several activities, the most essential one the renaming of the
"OpenVAS framework" to "Greenbone Vulnerability Management" (GVM), of which the
OpenVAS Scanner is one of many modules. It also lead to "GVM-10" as the
successor of "OpenVAS-9". No license changes happened, all modules remained
Open Source.

The second big change in 2017 was about the feed service. Apart from the
branding confusion, several companies were integrating the technology and feed
and passing it off as their work or claiming to be an alternative to Greenbone's
product at a better price. Only a minority of them properly complied with the
GPL licenses. None of them cooperates with Greenbone commercially. For achieving
better visibility, less misunderstanding and better distinction from other
OpenVAS-based products, the public feed was renamed to "Greenbone Community
Feed" and the feed development was internalized. Furthermore, the release scheme
changed from a 14-days delay to a daily publication without delay where now
vulnerability tests for enterprise products are not included anymore.

The third big change towards the new era was the transition to a modern
infrastructure, namely GitHub and a community forum. The whole transition was
completed in 2018 and boosted both productivity and community activity.

In 2019 the branding separation was completed. OpenVAS now represents the actual
vulnerability scanner as it did originally and the "S" in "OpenVAS" now stands
for "Scanner" rather than "System". These changes are accompanied by an updated
OpenVAS logo. The framework where OpenVAS is embedded is the Greenbone
Vulnerability Management (GVM).

OpenVAS released with GVM-10 receives numerous performance optimization to
address the challenge of a growing number of vulnerability tests, scanning
target networks of increasing size and heterogeneity.

OpenVAS released with GVM-11 introduces substantial architectural changes: The
former service "openvassd" is turned into a command line tool "openvas". It is
controlled by the service layer ospd-openvas. This concept essentially replaces
the old stateful, permanent and proprietary OTP (OpenVAS Transfer Protocol) by
the new state-less, request-response XML-based and generic OSP (Open Scanner
Protocol).
