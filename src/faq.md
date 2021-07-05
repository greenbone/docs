# Frequently Asked Questions (FAQ)

```{contents}
---
local: true
depth: 2
---
```

## Greenbone, GVM and OpenVAS how are they connected

For a comprehensive background see {doc}`History of OpenVAS <history>`.

## GVM, GSE, GSM TRIAL, GCF, GSF, GSM, GPE,  ... what are these things about

See [Solution Comparison paper](https://www.greenbone.net/wp-content/uploads/Solution_Comparison_EN.pdf)
and the {doc}`glossary`.

## Can you help to update my GVM version on Kali, Cent OS, XYZ distribution

[https://community.greenbone.net/t/openvas-showing-503-error/5465/4](https://community.greenbone.net/t/openvas-showing-503-error/5465/4)

Greenbone doesn't provide any packages for any Linux distribution besides the
commercial Greenbone OS. If you have installed GVM software from your
distribution, an external package repository or even a docker image Greenbone
wasn't involved in providing this installation method to you. The software from
these sources may be heavily adjusted, outdated or even completely broken.
Therefore if you have issues with the software please contact the provider of
the packages first and create a ticket at their issue tracker. How to contact
the provider really depends and varies.

We are **not** able to offer any help on updating packages from **any** external
source like Kali, Cent OS, Docker Image, ....!

## Please help me installing GVM and please advise on recommended platform OS too

This is very similar to [Can you help to update my GVM version on Kali, Cent OS, XYZ distribution](#heading--heading--update-my-gvm-version).
Greenbone can't provide installation docs for the many available Linux
distributions available. Setups, configurations, build systems, packaging tools,
available software, best practices, ... diverge to much to offer *official*
packages, scripts or anything else from Greenbone. We offer this installation
documentation and the [community forum](https://community.greenbone.net)
for discussing setup problems. Therefore Greenbone also doesn't recommend any
distribution nor do we prefer one distribution over the other. Most of the time
we are even not aware which distribution ships which version of our software.

## Which release contains which component? GOS version vs. GSE version?

It was often confusing to find out which software component of the
{term}`Greenbone Source Edition <GSE>` belongs to which GVM release.
Additionally the [Greenbone OS](https://community.greenbone.net/t/about-the-greenbone-os-gos-category/214)
used in the [GSM Trial Virtual Machine](https://community.greenbone.net/t/setting-up-the-greenbone-security-manager-trial-gsm-trial-virtual-machine/6939)
had a different versioning scheme then GVM. We are aware of this and therefore
with the 20.08 release we changed our versioning scheme to
[Calendar Versioning](https://calver.org/). With this change all software
components (besides the extra software openvas-smb, gvm-tools and python-gvm),
GVM and GOS are using the same major and minor version.

| GVM | GOS | gvmd | GMP | GSA  | gvm-libs | scanner | status | release |
|:--------|-------:|---------|--------|--------:|-------------|------------|----------|------------|
| [GVM 21.04](https://community.greenbone.net/t/gvm-21-04-stable-initial-release-2021-04-16/8942) | 21.04| 21.4 | 21.4 | 21.4 | 21.4 | 21.4| stable | 2021-04-16 |
| [GVM 20.08](https://community.greenbone.net/t/gvm-20-08-stable-initial-release-2020-08-12/6312) | [20.08](https://community.greenbone.net/t/greenbone-os-20-08-0-released/6535) | gvmd 20.8 | 20.8 | 20.8 | 20.8 | 20.8| old stable | 2020-08-12 |
| [GVM 11](https://community.greenbone.net/t/gvm-11-stable-initial-release-2019-10-14/3674) | 6 |  9 | 9 | 9 | 11 | 7 | end-of-life (since 31.12.2020) | 2019-10-14 |
| [GVM 10](https://community.greenbone.net/t/gvm-10-old-stable-initial-release-2019-04-05/208) | 5 | 8 | 8 |8 | 10 | 6 | end-of-life (since 31.12.2020) | 2019-04-05 |
| [OpenVAS  9](https://community.greenbone.net/t/gvm-9-end-of-life-initial-release-2017-03-07/211) | 4 | openvas-manager 7 | OMP 7 | 7 | openvas-libraries 9 | 5.1 | end-of-life | 2017-03-07 |

## My self compiled version of GVM isn't working as expected. Can you help me?

All questions should be handled at the [community forum]
but please are aware your questions are answered on voluntary basis. Therefore
please don't expect immediate responses. The community forum is for individuals
to exchange experiences and problems about a [Free Software](https://en.wikipedia.org/wiki/Free_software)
project and not to get instance advises from the developers or professional
support to fix your current issue.

If you are using a self-compiled version of our GVM stack not build from this
guide or packages from an external third party like a distribution please always
check if you can reproduce the same behavior with the
[GSM Trial VM](https://community.greenbone.net/t/setting-up-the-greenbone-security-manager-trial-gsm-trial-virtual-machine/6939).
If we are able to reproduce your issue it will be much easier to fix.

## Can I mix components from different releases?

Short answer **no**. You must **never** mix versions of our components from
different releases. Often people try to use version e.g. the scanner from the
master branch in combination with a release version of the other components like
gvmd to check if their failing scan works with a newer version. While it may
work for some components in most circumstances it is very likely to break for
gvmd, ospd, ospd-openvas and openvas-scanner. These components interact with
each other a lot and rely on public and private interfaces that change with
**every** release. Internal incompatible changes even might happen in bugfix
releases. Therefore never mix components from different releases. Always use the
latest releases or the same release branches. In the release announcements of
the [community forum] we always update the linked released versions which should
be used and are known to work flawlessly.

## I am looking for an overview about OpenVAS

The thing you are looking for is named Greenbone Vulnerability Management (GVM)
now. openvas is only the name of the scanner application nowadays. GVM consists
of several software components and openvas is only one of them. All components
are free software and can be found at [GitHub](https://github.com/greenbone/).

For an overview of the components and their connections please take a look at
the {doc}`Architecture <architecture>`.

[community forum]: https://community.greenbone.net
