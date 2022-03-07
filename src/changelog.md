# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org).

## 22.3.0 - 2022-03-07
* Fix source paths for gsad
* Fix build and installation of GSA
* Add hint about yarn package on Debian
* Fix PIDFile settings in systemd service files for gsad and gvmd

## 22.2.0 - 2022-02-24
* Drop GVM 20.8.
* Split of GSA and gsad
* Merge of ospd and ospd-openvas

## 21.10.1 - 2021-10-13
* Drop usage of gsa-node-modules. These tarballs are only useful for specific
  nodejs versions.

## 21.10.0 - 2021-10-12
* Update for GVM 21.4.3 and 20.8.4 releases
* Mark GVM 20.08 as end-of-life. User should switch to 21.04.

## 21.8.0 - 2021-08-05
* Update for GVM 21.4.2 and 20.8.3 releases
* Changed feed look file location to `/var/lib/gvm/feed-update.lock`. This file
  is used by `gvmd` and `greenbone-feed-sync`
* Add option `-f` to all curl commands to fail if an URL is not available
* Change permission of `/run/gvm initially` because otherwise `gvmd` can't create
  the admin user

## 21.7.0 - 2021-07-05
* Initial version
