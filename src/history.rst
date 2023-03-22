Greenbone, GVM, OpenVAS and How They Are Connected
==================================================

When the OpenVAS project was launched, it only consisted of an engine for scanning
vulnerabilities.

Shortly after that, the company Greenbone was founded to achieve
professional support for vulnerability scanning. Greenbone started to lead the
development of OpenVAS, added several software components and turned OpenVAS
into a vulnerability management solution while keeping the values of free
software. This vulnerability management solution was later named
:term:`Greenbone Vulnerability Management (GVM)<GVM>` to reflect the origins and
brand changes. Therefore, after the release of the OpenVAS 9
framework, the following releases got named GVM.

With this in mind, Greenbone OpenVAS could mean

* a vulnerability scanner (OpenVAS Scanner),
* a name for a software framework of several components (GVM),
* a software project led by Greenbone (Greenbone Source Edition),
* a source code release of a vulnerability management solution (OpenVAS 9, GVM 20.08), or
* a community of users and developers (Greenbone Community)

depending on the context.

To have a unique name we decided to use the term
:term:`Greenbone Community Edition` as an umbrella for all Open Source/Free
Software efforts of the company Greenbone in 2022.

History of the OpenVAS project
==============================

In 2005, the developers of the vulnerability scanner Nessus decided to
discontinue the work under open-source licenses and switch to a proprietary
business model.

At this point, developers from Intevation and DN-Systems – the two companies
which would later found the Greenbone AG – were already contributing
developments to Nessus, focusing on client tools. The works were primarily
supported by the German Federal Office for Information Security (BSI).

In 2006, several forks of Nessus were created in response to the
discontinuation of the open-source solution. Of these forks, only one has continued
to show activity: OpenVAS, the Open Vulnerability Assessment System. OpenVAS was
registered as a project at Software in the Public Interest, Inc. to hold and
protect the domain "openvas.org".

The years 2006 and 2007 brought little activity other than cleanups of the status quo.
But in late 2008, the Greenbone AG, based in Osnabrück,
Germany was founded to drive OpenVAS forward. Essentially, Greenbone's business
plan was about 3 cornerstones:

    1. Go beyond plain vulnerability scanning towards a comprehensive
       vulnerability management solution.
    2. Create a turn-key appliance product for enterprise customers.
    3. Continue the open-source concept of creating a transparent security
       technology.

Also in 2008, two further companies became active: Secpod from India and
Security Space from Canada. Both of them had a focus on contributing
vulnerability tests, and teamed up with Greenbone to start producing
a reliable and up-to-date feed of vulnerability tests. This started with removing
any source code and vulnerability tests where the license was not clear or not
compatible. Several thousands of vulnerability tests were eliminated to get a clean
starting point. Shortly after, the feed content grew quickly and steadily.

In 2009, Greenbone added the first additional modules to build a vulnerability
management solution. The web interface and the central management service were
developed from scratch, with generic protocols defined as their API. At the same
time, the OpenVAS scanner was carefully improved and quickly lost compatibility
with its ancestor. All open-source work was branded "OpenVAS". The first
"Greenbone Security Manager" appliance products entered the market in spring 2010.

In the years 2010 to 2016, the commercial product was systematically improved
and extended, and so were the open-source modules. The vulnerability
management was extended to include daily updated security advisories, which were
made available to the public with a GPL-compatible license by the German CERTs
DFN-CERT and CERT-Bund, a division of the BSI.

In March 2017, the OpenVAS framework reached version 9. Many new
modules and numerous features were added during the release cycles. Several hundreds
of thousands of lines of code were produced and there was almost no day without a
couple of released code improvements by a growing development team.

The year 2017 marked the beginning of a new era: first of all, Greenbone became
visible as the driving force behind OpenVAS, by introducing several naming changes. This
included several activities, the most essential one using the term
:term:`Greenbone Vulnerability Management" (GVM)<GVM>` instead of "OpenVAS framework"
for the releases. Since then the OpenVAS Scanner is only one of many modules. This
led to "GVM-10" as the successor of "OpenVAS-9". There were no license changes,
all modules remained free and open-source software.

The second major change in 2017 involved the feed service. Apart from the
branding confusion, several companies integrated the technology and feed, passing
it off as their work or claiming to be an alternative to Greenbone's product at
a better price. Only a minority of them contributed to the project and properly
complied with the GPL licenses. None of them cooperates with Greenbone commercially. To achieve better visibility, less misunderstanding,
and better differentiation from other OpenVAS-based products, the public feed
was renamed to :term:`Greenbone Community Feed` and the feed development was internalized.
Furthermore, the release scheme has been changed from a 14-day delay to a daily
publication without delay, now excluding vulnerability tests for enterprise products.

The third major change to the new era was the transition to a modern
infrastructure, namely GitHub and a community forum. The whole transition was
completed in 2018 and boosted both productivity and community activity.

The OpenVAS Scanner released with GVM-10 received numerous performance optimization
to meet the challenge of a growing number of vulnerability tests scanning
target networks of increasing size and heterogeneity.

GVM-11 introduced substantial architectural changes: the former service
:term:`openvassd` was turned into a command-line tool :term:`openvas`. It is
controlled by the service layer :term:`ospd-openvas`.
This concept essentially replaces the old stateful, permanent and proprietary
OTP (OpenVAS Transfer Protocol) by the new stateless, request-response
XML-based and generic :term:`OSP (Open Scanner Protocol)<OSP>`.

With GVM 20.08, the release versioning changed to `Calendar Versioning <https://calver.org/>`_.
Most important change in this release was to ship and sync the gvmd object data
consisting of the report formats, port lists, policies and scan configs with the
feed.

Besides removing legacy features like GMP scanners, the 21.4 release got support
for CVSSv3/CVSSv3.1.

The 22.4 release added the Notus Scanner.
