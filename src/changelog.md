# Changelog

All notable changes to this documentation will be listed in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org).

## Latest
* Fix Community Container setup and start script
* Fix installing yarn from third party debian package repository
* Improve and extend feed sync chapters for community containers

## 22.7.0 – 2022-07-25
* Update docs for supporting 22.4 release

## 22.5.0 – 2022-05-30
* New Greenbone Community Containers documentation
* Update index page, history, architecture, faq and glossary for adjusted terms
  and naming.
* Allow to copy & paste commands via a button click
* Re-arrange page structure and therefore the URLs of the documents

## 22.3.3 – 2022-03-31
* Fix setting cmake parameter of runtime directory for gvmd
* Fix starting the correct postgresql cluster

## 22.3.2 – 2022-03-30
* The build guide uses Debian Stable (Bullseye)
* Fix installing dependencies of gvmd and openvas-scanner for Debian Bullseye
* Remove obsolete cmake parameter when building gvm-libs to avoid a warning

## 22.3.1 – 2022-03-21
* Fix runtime directory for gvmd in systemd service file
* Add runtime directory and mode for gsad in systemd service file

## 22.3.0 – 2022-03-07
* Fix source paths for gsad
* Fix build and installation of GSA
* Add hint about yarn package on Debian
* Fix PIDFile settings in systemd service files for gsad and gvmd

## 22.2.0 – 2022-02-24
* Drop GVM 20.8.
* Split of GSA and gsad
* Merge of ospd and ospd-openvas

## 21.10.1 – 2021-10-13
* Drop usage of gsa-node-modules. These tarballs are only useful for specific
  nodejs versions.

## 21.10.0 – 2021-10-12
* Update for GVM 21.4.3 and 20.8.4 releases
* Mark GVM 20.08 as end-of-life. User should switch to 21.04.

## 21.8.0 – 2021-08-05
* Update for GVM 21.4.2 and 20.8.3 releases
* Changed feed look file location to `/var/lib/gvm/feed-update.lock`. This file
  is used by `gvmd` and `greenbone-feed-sync`
* Add option `-f` to all curl commands to fail if an URL is not available
* Change permission of `/run/gvm initially` because otherwise `gvmd` can't create
  the admin user

## 21.7.0 – 2021-07-05
* Initial version
