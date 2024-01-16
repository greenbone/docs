## Community Feed Synchronization

The Kali Linux Greenbone CE installation includes its own feed-sync script `gvm-feed-update` which acts as a wrapper for the various `greenbone-feed-sync` commands. However, this script is not maintained by Greeenbone and any bugs should be reported to the [Kali Linux Bug Tracker](https://bugs.kali.org/main_page.php). The `gvm-feed-update` script must be executed with superuser privileges:

```bash
sudo gvm-feed-update
```

The standard `greenbone-feed-sync` commands, can also be executed directly. A detailed guide on using the `greenbone-feed-sync` command is [available here](../source-build/feed-sync.md).
