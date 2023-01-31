## Introduction

This document provides a guide for running the {term}`Greenbone Community Edition`
from pre-build container images using [Docker]. It consists of a distributed
service {doc}`architecture </architecture>`, where each service is run in a
dedicated container. The orchestration of these services is done via a [docker-compose]
file.

With the Greenbone Community Containers, it is possible to scan your local network
independent of the underlying operating system, installed software and
tool chains.

