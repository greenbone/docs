## Setting up an Admin User

```{warning}
By default, a user *admin* with the password *admin* is created. This is insecure
and it is highly recommended to set a new password.
```

To update the administrator user with a password of your choice instead of the
generated password, the following command can be used:

```{code-block} shell
---
caption: Updating password of administrator user
---
docker compose -f $DOWNLOAD_DIR/docker-compose.yml \
    exec -u gvmd gvmd gvmd --user=admin --new-password='<password>'
```

```{note}
Please be aware if your password includes special characters like `$` it needs
to be quoted in single quotes.
```
