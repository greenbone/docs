# Troubleshooting

This page contains hints for troubleshooting of generic issues with the
Greenbone Community Edition.

- For source build specific troubleshooting see
[Troubleshooting the source build](./22.4/source-build/troubleshooting.md).
- For community container specific troubleshooting see [Troubleshooting the community containers](./22.4/container/troubleshooting.md).

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
