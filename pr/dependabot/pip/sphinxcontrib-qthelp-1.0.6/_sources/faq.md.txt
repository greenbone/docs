# Frequently Asked Questions (FAQ)

## Greenbone, GVM and OpenVAS – How are they connected?

For a comprehensive background see {doc}`History of OpenVAS <history>`.

## Where can I ask questions and get support?

Support is only provided for the Greenbone Enterprise product line.
Besides that, the Greenbone Community can be reached at the [community forum]
to ask question. In this forum, several Greenbone developers try to help on a
voluntary basis.

## Can you help with my issue on Kali, Cent OS, XYZ distribution?

Greenbone doesn't provide any packages for any Linux distribution besides the
commercial Greenbone OS. If you have installed the Greenbone Community Edition
from your distribution like Kali Linux, an external package repository
or even some random docker image, Greenbone was not involved in providing this
installation method to you.

The development of the Greenbone Community Edition and packaging for a
distribution or container image is completely independent. Therefore, our
software provided from these sources may be heavily adjusted, outdated or even
completely broken. If you have issues with the software, please contact the
provider of the packages first and create a ticket at their issue tracker. How
to contact the provider depends and varies.


## Please help me with the installation of OpenVAS and also advise me on the recommended OS platform.

This is very similar to [Can you help with my issue on Kali, Cent OS, XYZ distribution](#can-you-help-with-my-issue-on-kali-cent-os-xyz-distribution).
Greenbone can't provide installation docs for the many available Linux
distributions available. Setups, configurations, build systems, packaging tools,
available software, best practices, ... diverge to much to offer *official*
packages, scripts or anything else from Greenbone. We offer this Greenbone Community Edition
documentation and the [community forum] for discussing setup problems. Therefore,
Greenbone also does not recommend any distribution nor do we prefer one
distribution over the other. Most of the time, we are not even aware which
distribution ships which version of our software.

## Can you help me updating my OpenVAS installation?

This is also very similar to [Can you help with my issue on Kali, Cent OS, XYZ distribution](#can-you-help-with-my-issue-on-kali-cent-os-xyz-distribution).

We are **not** able to offer any help on updating installations done via any
**external** source like Kali packages, Cent OS packages, some other guide or
some random docker images because we are not aware of their specific needs and
changes! Please contact the author(s) of your installation method.

## Which release contains which component?

It was often confusing to find out which software component of the
{term}`Greenbone Community Edition` belongs to which release. Additionally, the
{term}`Greenbone OS <GOS>` used in the [Greenbone Enterprise TRIAL](https://www.greenbone.net/en/testnow/)
had a different versioning scheme than the Community Edition. The following
table contains an overview which component in which version belongs to a
release.

| Release | GOS | gvmd | GMP | GSA  | gvm-libs | OpenVAS Scanner | Notus Scanner | Status | Release Date |
|:--------|----:|------|-----|-----:|----------|-----------------|:-------------:|:------:|--------------|
| [Greenbone Community Edition 22.4](https://forum.greenbone.net/t/greenbone-community-edition-22-4-stable-initial-release-2022-07-25/12638) | 22.04.y | 22.x.y | 22.4 | 22.x.y | 22.x.y | 22.x.y | 22.x.y | stable | 2022-07-25 |
| [GVM 21.4](https://forum.greenbone.net/t/gvm-21-04-stable-initial-release-2021-04-16/8942) | 21.04.y | 21.4.y | 21.4 | 21.4.y | 21.4.y | 21.4.y | - | oldstable | 2021-04-16 |
| [GVM 20.08](https://forum.greenbone.net/t/gvm-20-08-stable-initial-release-2020-08-12/6312) | [20.08](https://forum.greenbone.net/t/greenbone-os-20-08-0-released/6535) | 20.8.y | 20.8 | 20.8.y | 20.8.y | 20.8.y | - | end-of-life (since 2021-12-02) | 2020-08-12 |
| [GVM 11](https://forum.greenbone.net/t/gvm-11-stable-initial-release-2019-10-14/3674) | 6.0.y | 9.0.y | 9.0 | 9.0.y | 11.0.y | 7.0.y | - |end-of-life (since 2020-12-31) | 2019-10-14 |
| [GVM 10](https://forum.greenbone.net/t/gvm-10-old-stable-initial-release-2019-04-05/208) | 5.0.y | 8.0.y | 8.0 | 8.0.y | 10.0.y | 6.0.y | - | end-of-life (since 2020-12-31) | 2019-04-05 |
| [OpenVAS  9](https://forum.greenbone.net/t/gvm-9-end-of-life-initial-release-2017-03-07/211) | 4.x.y | openvas-manager 7.0.y | OMP 7 | 7.0.y | openvas-libraries 9.0.y | 5.1.y | - | end-of-life | 2017-03-07 |

## My self-compiled version isn't working as expected. Can you help me?

All questions should be handled at the [community forum]
but please be aware that your questions are answered on a voluntary basis. Therefore,
please don't expect immediate responses. The community forum is for individuals
to exchange experiences and problems about a [Free Software](https://en.wikipedia.org/wiki/Free_software)
project and not to get instant advises from the developers or professional
support to fix your current issue.

If you are using a self-compiled version of the Greenbone software stack not build from this
guide or packages from an external third party like a distribution please always
check if you can reproduce the same behavior with the [Greenbone Enterprise TRIAL Virtual Machine](https://www.greenbone.net/en/testnow/)
If we are able to reproduce your issue it will be much easier to fix.

## Can I mix components from different releases?

Short answer: **no**. You must **never** mix versions of our components from
different releases. Often people try to use version e.g. the scanner from the
main branch in combination with a release version of the other components like
gvmd to check if their failing scan works with a newer version. While it may
work for some components in most circumstances it is very likely to break for
gvmd, ospd, ospd-openvas and openvas-scanner. These components interact with
each other a lot and rely on public and private interfaces that change with
**every** release. Internal incompatible changes even might happen in bugfix
releases. Therefore never mix components from different releases. Always use the
latest releases or the same release branches. In the release announcements of
the [community forum], we always update the linked released versions which should
be used and are known to work flawlessly.

## I am looking for an overview about OpenVAS.

See {doc}`Greenbone, GVM, OpenVAS and How They Are Connected <history>` for some
background about Greenbone OpenVAS.

Our software consists of several software components. All components
are free software and can be found at [GitHub](https://github.com/greenbone/).

For an overview of the components and their connections, please take a look at
the {doc}`Architecture <architecture>`.

[community forum]: https://forum.greenbone.net

## My scan does not show any results

After a finished scan your report doesn't contain any results or errors.

Some common issues if scans doesn't return any results are:

1. The targets are not answering to an **ICMP Echo Request** -> Check the
   **Alive Test** setting of your target definition and try some of the other
   available methods. Further reading:

   - [Greenbone Enterprise Appliance documentation - Hosts not found](https://docs.greenbone.net/GSM-Manual/gos-22.04/en/scanning.html#hosts-not-found)
   - [Greenbone Enterprise Appliance documentation - Creating a target](https://docs.greenbone.net/GSM-Manual/gos-22.04/en/scanning.html#creating-a-target)
   - [Greenbone Enterprise Appliance documentation - Alive Test](https://docs.greenbone.net/GSM-Manual/gos-22.04/en/scanning.html#alive-test)

2. You're using a custom scan configuration which doesn't include the following
   two VTs from the **Port scanners** family.

   - [Nmap (NASL wrapper) - OID: 1.3.6.1.4.1.25623.1.0.14259](https://secinfo.greenbone.net/nvt/1.3.6.1.4.1.25623.1.0.14259)
   - [Ping Host - OID: 1.3.6.1.4.1.25623.1.0.100315](https://secinfo.greenbone.net/nvt/1.3.6.1.4.1.25623.1.0.100315)

    Further reading [here](https://community.greenbone.net/t/hint-self-created-scan-configs-copy-of-empty-scan-config-showing-no-results/331)

3. You're using a [Port List](https://docs.greenbone.net/GSM-Manual/gos-22.04/en/performance.html#selecting-a-port-list-for-a-task)
   which isn't optimal for your environment:

    e.g. a ``All TCP and All UDP`` port list might be responsible for your
    portscan to time out causing your scan to not return any results at all.
    It is suggested to start with a smaller port list like e.g. ``All IANA TCP``.

4. **SELinux** is enabled and blocking the scanner from doing its job.

5. You don't have **nmap** installed or not available within your **PATH**.

For further debugging / logging the mentioned **Nmap (NASL wrapper)** and
**Ping Host** VTs allow to configure various settings:

* Ping Host
    1. **Report about unreachable Hosts** configured to **yes**: include notes
      if a remote host is considered as dead / not reachable and the reason why.
    2. **Log failed nmap calls** and **Log nmap output** configured to **yes**:
      Logs additional output if nmap was used.

* Nmap (NASL wrapper)
    1. **Log nmap output** configured to **yes**: Log additional output if nmap
      was used.

## I still fail to see/understand the concept of `greenbone-feed-sync --type` vs `greenbone-nvt-sync`/`greenbone-certdata-sync`/`greenbone-scapdata-sync` vs `gvm-feed-update`

**gvm-feed-update** is **NOT** maintained by Greenbone and is therefore not used
anywhere in our docs or in code provided by Greenbone. It is maintained by the
Kali/Debian packagers and just calls the standard `greenbone-*-sync` scripts.

**greenbone-certdata-sync** is just the same as [`greenbone-feed-sync --type CERT`](https://github.com/greenbone/gvmd/blob/v22.5.0/tools/greenbone-certdata-sync.in).
It is/was only provided for backwards compatibility and does not get installed
(by default) anymore since [`gvmd` 22.5.0](https://github.com/greenbone/gvmd/releases/tag/v22.5.0).

**greenbone-scapdata-sync** is just the same as [`greenbone-feed-sync --type SCAP`](https://github.com/greenbone/gvmd/blob/v22.5.0/tools/greenbone-scapdata-sync.in).
 It is/was only provided for backwards compatibility and does not get installed
 (by default) anymore since [`gvmd` 22.5.0](https://github.com/greenbone/gvmd/releases/tag/v22.5.0).

**greenbone-nvt-sync** is the *old* sync script written in bash to download the
vulnerability tests data (:file:`.nasl` and :file:`.notus` files). It is deprecated since
[`openvas-scanner` 22.6.0](https://github.com/greenbone/openvas-scanner/releases/tag/v22.6.0).

**/usr/sbin/greenbone-feed-sync** is the *old* sync script written in bash to
download the CERT, SCAP and GVMD data. It does not get installed
(by default) anymore since [`gvmd` 22.5.0](https://github.com/greenbone/gvmd/releases/tag/v22.5.0).

There is a new **greenbone-feed-sync** script written in Python to replace all
of the above scripts, see the announcement at [https://forum.greenbone.net/t/new-greenbone-feed-sync-script/13925](https://forum.greenbone.net/t/new-greenbone-feed-sync-script/13925).
This script is used in the build-from-source guide already but has not been
picked up by the distributions yet. Hopefully, it will arrive at the
distributions in the next months. It even supports the `gvm-feed-update` use
case because by default, if no arguments are passed, `--type all` is run which
downloads all feed data types.
