# Changelog

All notable changes to this documentation will be listed in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Calendar Versioning](https://calver.org).

## Latest
* Add workflow page for source builds
* Add documentation for updating source builds
* Don't expose MQTT broker port in docker compose setup by default
* Add workflow for source builds on howto access GSA/gsad remotely
* Only run gsad on 127.0.0.1 for the community containers setup
* Add workflow for container setup on howto access GSA/gsad remotely
* Fix log warning from tini init server in the ospd-openvas container
* Fix manual feed sync workflow for the container setup
* Update gvm-libs to 22.7.3
* Update gvmd to 23.0.1
* Update gsad to 22.7.0
* Update GSA to 22.8.0
* Update openvas-scanner to 22.7.6
* Update ospd-openvas to 22.6.1
* Add general troubleshooting page

## 23.9.0 - 23-09-23
* Update pg-gvm to 22.6.1
* Improve description of GSA and its build process in the source build
* Use Debian 12 bookworm also for the community container docs
* Update ospd-openvas to 22.6.0
* Update notus-scanner to 22.6.0
* Update openvas-scanner to 22.7.5
* Update gvmd to 22.9.0
* Update gsad to 22.6.0
* Update GSA to 22.7.0
* Update gvm-libs to 22.7.1
* Replace docker-compose v1 with Docker Compose v2

## 23.7.0 – 23-07-25
* Update gvmd to 22.6.0
* Update gsad to 22.5.1
* Update GSA to 22.5.3
* Update ospd-openvas to 22.5.3
* Update openvas-scanner to 22.7.3
* Update pg-gvm to 22.6.0
* Remove *Setting the Version* chapter
* Document how to configure a mail transport agent (MTA) for the community
  containers
* Add section about redis-socket error to troubleshooting chapter of the
  community containers

## 23.6.2 – 23-06-27
* Update to use Debian 12 (bookworm)
* Install GSA from pre-built distributable files
* Update openvas-smb to 22.5.3
* Update gvmd to 22.5.0
* Update pg-gvm to 22.5.1
* Update gsad to 22.5.0
* Removed adjusting permissions for greenbone-feed-sync script unnecessarily
* Enable services only after first feed sync
* Update source build instructions for Fedora 38

## 23.6.1 – 23-06-15
* Update gvm-libs to 22.6.3
* Update notus-scanner to 22.5.0
* Update openvas-scanner to 22.7.2
* Update ospd-openvas to 22.5.1
* Update FAQ about which release contains which version
* Don't install old `greenbone-nvt-sync` script anymore

## 23.6.0 – 23-06-15
* Fix tab title in *Setting up sudo for Scanning* section from Debian/CentOS to
  Debian/Ubuntu.
* Update notus-scanner to 22.4.5
* Change all documents to use markdown instead of rst
* Change current working directory before setting up postgres database
* Add a section about update help to FAQ

## 23.3.0 – 23-03-08
* Unify the directory layout of the documentation files
* Use distinct installation directories for each component
* Add missing python3-gnupg as dependency to ospd-openvas
* Don't display copy button for GPG verification output
* Fix PostgreSQL setup and make it possible to copy and paste the corresponding
  commands again
* Use new `greenbone-feed-sync` script for the feed data download
* Use ospd-openvas 22.4.6, notus-scanner 22.4.4 and gvm-libs 22.4.4
* Remove 21.4 from the architecture docs
* Try to fix installation of `ospd-openvas`, `notus-scanner`, `gvm-tools` and
  `greenbone-feed-sync` again due to issues with distributions patching Python
  installation paths. See [discuss.python.org](https://discuss.python.org/t/linux-distro-patches-to-sysconfig-are-changing-pip-install-prefix-outside-virtual-environments/18240)
  for more details.
* Switch *Choosing an Install Prefix* and *Setting the PATH* section in source
  build to allow using $INSTALL_PREFIX when setting the $PATH.

## 23.1.1 – 23-01-31
* Set `table_drive_lsc = yes` setting for openvas scanner to enable local
  security checks scanning via notus scanner
* Remove docs for 21.04 because it is end-of-life and wont get any updates
  anymore.
* Extend FAQ for no results after finished scan
* Update systemd service files to start the daemons in foreground to avoid
  issues with systemd tracking the started processes
* Use ospd-openvas 22.4.5
* Update ospd-openvas.service file to depend on the mosquitto and notus-scanner
  services

## 23.1.0 – 23-01-13
* Fix installing ospd-openvas and notus-scanner on Debian 11
* Update components to 22.4.1 release

## 22.12.0 – 22-12-27
* Fix setting executable permission for setup and install script after the
  download
* Check for docker being installed in setup and install script
* Download the setup and install script to the current working directory
* Add license header to docker startup script
* Fix variable name typo in docker startup script
* Fix the checks for required programs in the setup script
* Use ospd-openvas 22.4.2 for 22.4 source build
* Add HTML and Open Graph meta information
* Fix: Remove -rf statements within `$INSTALL_DIR` to prevent deletion of root.
* Update gsad systemd service file to start gsad in foreground to avoid issues
  with systemd tracking the started processes
* Add: docker init process to prevent nmap, grep zombie processes in the
  ospd-openvas container
* Add troubleshooting for ospd-openvas connection issue with containers
* Add troubleshooting pages for source builds
* Add hostname to ospd-openvas container, to avoid error
  Could not get a bpf, ethernet address used in non-ether expression
* Extend troubleshooting for source build
* Update docker compose requirement to 1.29.0

## 22.8.2 – 22-08-31
* Improve feed sync documentation for source build
* Use feed data containers for feed sync in Greenbone Community Containers docs
* Extract workflows and troubleshooting to own pages for Greenbone Community
  Container docs
* Require docker-compose 1.27.0 or later to avoid issues with the ospd-openvas
  startup
* Use notus-scanner 22.4.1 and ospd-openvas 22.4.1 for 22.4 source build

## 22.8.1 – 2022-08-29
* Add workflow for exposing the gvmd unix socket from the container
* Add an API page for links to our other community documentation
* Fix path of the notus-scanner product advisories directory for the 22.4
  container setup
* Add gvm-tools container and usage workflow documentation

## 22.8.0 – 2022-08-16
* Fix Community Container setup and start script
* Fix installing yarn from third party debian package repository
* Improve and extend feed sync chapters for community containers
* Use openvas-smb 22.4.0 for both releases
* Add installation instructions for Fedora (35 and 26), CentOS 9 and
  Ubuntu 22.04
* Use new [sphinx theme](https://pradyunsg.me/furo/) for a cleaner structure and
  new features like dark mode

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
