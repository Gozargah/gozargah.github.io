---
title: Marzban CLI 
---

# Marzban CLI 

The Marzban CLI consists of `4` main commands, each with sub-commands that serve specific functions. In this section, we will cover the use of each command. Additionally, at the end of this section, you will find examples of some commonly used commands.

**1. How to Use**

Shows the placement of options and commands for `marzban cli`
```
marzban cli [OPTIONS] COMMAND [ARGS]...
```

::: tip Tip
In this section, `[ARGS]`, short for `Arguments` refers to the placement of various sub-command arguments within the main command above, each serving a specific purpose in its respective section.
::: 

**2. Options**

`--help` 
- Used to view the help for `marzban cli`
```
marzban cli --help
```

::: tip Tip
- If a command has multiple options and you only specify one, it will automatically prompt you for the other options. However, you can include all options in a single command to avoid answering each prompt individually, which allows the command to execute immediately.

- For example, in the following command, we set a user's ownership transfer from one admin to another by adding the username, the target admin, and a final confirmation. This allows the command to execute right away:

```
marzban cli user set-owner -u TEXT --admin TEXT -y
```

- Some options in the command are optional, so their absence will not cause any issues.
:::

**3. Commands**

`admin`
```
marzban cli admin
```

`completion` 
```
marzban cli completion
```

`subscription` 
```
marzban cli subscription
```

`user`
```
marzban cli user
```

## `admin`

**1. How to Use**

- Shows the placement of options and commands for the `admin` command.
```
marzban cli admin [OPTIONS] COMMAND [ARGS]...
```

**2. Options**

`--help` 
- Used to view the help for the `admin` command.
```
marzban cli admin --help
```

**3. Commands**

`create` 
- Used to create an admin.
```
marzban cli admin create
```

`delete`
- Used to delete an admin.
```
marzban cli admin delete
```

`import-from-env`
- Used to import a `sudo` admin from `env` file.
```
marzban cli admin import-from-env
```

`list`
- Used to display the list of admins.
```
marzban cli admin list
```

`update`
- Used to update the details of an admin.
```
marzban cli admin update
```

## `admin create` 
- Used to create an admin.

**1. How to Use**

- Shows the placement of options and commands for the `admin create` command.
```
marzban cli admin create [OPTIONS]
```

**2. Options**

`-u, --username TEXT`

- Used to set the username for an admin. Replace the phrase `TEXT` with the desired username of your admin. Note that without the `--sudo `phrase at the end of the command, the created admin will not have sudo privileges.
```
marzban cli admin create -u TEXT
``` 

`--sudo`
- Used to create a `sudo` admin.
```
marzban cli admin create -u TEXT --sudo
```

`--no-sudo`
- Used to create a `non-sudo` admin, which is the default even if this phrase is not included.
```
marzban cli admin create -u TEXT --no-sudo
```

`-tg, --telegram-id TEXT`
- Used to set the ID number of the admin in Telegram.
```
marzban cli admin create -tg TEXT
```

`-dc, --discord-webhook TEXT`
- Used for setting the webhook in Discord.
```
marzban cli admin create -dc TEXT
```

`--help`
- Used to view the help for the `admin create` command.
```
marzban cli admin create --help
```

## `admin delete`
- Used to delete an admin.

**1. How to Use**

- Shows the placement of options and commands for the `admin delete` command.
```
marzban cli admin delete [OPTIONS]
```

**2. Options**

`-u, --username TEXT`
- Replace the phrase `TEXT` with the admin's username.
```
marzban cli admin delete -u TEXT 
```

`-y, --yes`
- By adding this option, final confirmation will not be requested from you.
```
marzban cli admin delete -u TEXT -y
```

`--help`
- Used to view the help for the `admin delete` command.
```
marzban cli admin delete --help
```

## `admin import-from-env`
- Used to import a `sudo` admin from `env` file.

**1. How to Use**

- Shows the placement of options and commands for the `admin import-from-env` command.
```
marzban cli admin import-from-env [OPTIONS]
```

**2. Options**

`-y, --yes`
- By adding this option, final confirmation will not be requested from you.
```
marzban cli admin import-from-env -y
```

`--help`
- Used to view the help for the `admin import-from-env` command.
```
marzban cli admin import-from-env --help
```

## `admin list`
- Used to display the list of admins.

**1. How to Use**

- Shows the placement of options and commands for the `admin list` command.
```
marzban cli admin list [OPTIONS]
```

**2. Options**

`-o, --offset INTEGER`
- This option is used to view the list of admins starting from a specific number, which you should replace with the phrase `ITEMS`. For example, if you enter the number `10`, it will not display the first ten admins.
```
marzban cli admin list -o ITEMS
```

`-l, --limit INTEGER`
- Replace the phrase `ITEMS` with the number of admins you want to display.
```
marzban cli admin list -l ITEMS
```

`-u, --username TEXT`
- Replace the phrase `TEXT` with the admin's username.
```
marzban cli admin list -u TEXT
```

`--help`
- Used to view the help for the `admin list` command.
```
marzban cli admin list --help
```

## `admin update`
- Used to update the details of an admin.

**1. How to Use**

- Shows the placement of options and commands for the `admin update` command.
```
marzban cli admin update [OPTIONS]
```

**2. Options**

`-u, --username TEXT`
- Replace the phrase `TEXT` with the username of your admin.
```
marzban cli admin update -u TEXT 
```

`--help`
- Used to view the help for the `admin update` command.
```
marzban cli admin update --help
```

## `subscription`

**1. How to Use**

- Shows the placement of options and commands for the `subscription` command.
```
marzban cli subscription [OPTIONS] COMMAND [ARGS]...
```

**2. Options**

`--help`
- Used to view the help for the `subscription` command.
```
marzban cli subscription --help
```

**3. Commands**

`get-config`
- Used to get the proxies of a user.
```
marzban cli subscription get-config
```

`get-link`
- Used to get a user's subscription link.
```
marzban cli subscription get-link
```

## `subscription get-config`
- Used to get the proxies of a user.

**1. How to Use**

- Shows the placement of options for the `subscription get-config` command.
```
marzban cli subscription get-config [OPTIONS]
```

**2. Options**

`-u, --username TEXT`
- Replace the phrase `TEXT` with the user's username.
```
marzban cli subscription get-config -u TEXT
```

`-f, --format [v2ray|clash]`
- View a user's proxies in the `v2ray` or `clash` format.
```
marzban cli subscription get-config -u TEXT -f [v2ray|clash]
```

`-o, --output TEXT`
- Save a user's proxies in the `v2ray` or `clash` format to a file.
```
marzban cli subscription get-config -u TEXT -f v2ray -o v2ray_config.json
```
```
marzban cli subscription get-config -u TEXT -f clash -o clash_config.yaml
```

`--base64`
- View a user's proxies in a custom format that is encoded with `base64`.
```
marzban cli subscription get-config -u TEXT -f [v2ray|clash] --base64
```

`--help`
- Used to view the help for the `subscription get-config` command.
```
marzban cli subscription get-config --help
```

## `subscription get-link`
- Used to get a user's subscription link.

**1. How to Use**

- Shows the placement of options for the `subscription get-link` command.
```
marzban cli subscription get-link [OPTIONS]
```

**2. Options**

`-u, --username TEXT`
- Replace the phrase `TEXT` with the user's username.
```
marzban cli subscription get-link -u TEXT 
```

`--help`
- Used to view the help for the `subscription get-link` command.
```
marzban cli subscription get-link --help
```

## `user`

**1. How to Use**

- Shows the placement of options and commands for the `user` command.
```
marzban cli user [OPTIONS] COMMAND [ARGS]...
```

**2. Options**

`--help` 
- Used to view the help for the `user` command.
```
marzban cli user --help
```

**3. Commands**

`list`
- Used to view the list of users.
```
marzban cli user list
```

`set-owner`
- Used to change the ownership of a user from one admin to another.
```
marzban cli user set-owner
```

## `user list`
- Used to view the list of users.

**1. How to Use**

- Shows the placement of options for the `user list` command.
```
marzban cli user list [OPTIONS]
```

**2. Options**

`-o, --offset INTEGER`
- This option is used to view the list of users starting from a specific number, which you should replace with the phrase `ITEMS`. For example, if you enter the number `100`, it will not display the first hundred users.
```
marzban cli user list -o ITEMS
```

`-l, --limit INTEGER`
- Replace the phrase `ITEMS` with the number of users you want to display.
```
marzban cli user list -l ITEMS
```

`-u, --username TEXT`
- Replace the phrase `TEXT` with the user's username.
```
marzban cli user list -u TEXT
```

`-s, --search TEXT `
- Replace the phrase `TEXT` with the user's username; this option will also search for the entered phrase in the users' notes box.
```
marzban cli user list -s TEXT
```

`--status [active|disabled|limited|expired|on_hold]`
- Used to view the list of users who have one of these `5` statuses.
```
marzban cli user list --status [active|disabled|limited|expired|on_hold]
```

`--admin, --owner TEXT `
- Used to view the list of users of a specific admin, Replace the phrase `TEXT` with the username of your admin.
```
marzban cli user list --admin TEXT
```

`--help`
- Used to view the help for the `user list` command.
```
marzban cli user list --help
```

## `user set-owner`
- Used to change the ownership of a user from one admin to another.

**1. How to Use**

- Shows the placement of options for the `user set-owner` command.
```
marzban cli user set-owner [OPTIONS]
```

**2. Options**

`-u, --username TEXT`
- Replace the phrase `TEXT` with the user's username.
```
marzban cli user set-owner -u TEXT
```

`--admin, --owner TEXT`
- Replace the phrase `TEXT` with the desired username of your admin.
```
marzban cli user set-owner --admin TEXT
```

`-y, --yes`
- By adding this option, final confirmation will not be requested from you.
```
marzban cli user set-owner -u TEXT --admin TEXT -y
```

`--help`
- Used to view the help for the `user set-owner` command.
```
marzban cli user set-owner --help
```

## `completion`

**1. How to Use**

- Shows the placement of options and commands for the `completion` command.
```
marzban cli completion [OPTIONS] COMMAND [ARGS]...
```

**2. Options**

`--help` 
- Used to view the help for the `completion` command.
```
marzban cli completion --help
```

**3. Commands**

`install`
```
marzban cli completion install
```

`show`
```
marzban cli completion show
```


## `completion install`

**1. How to Use**

- Shows the placement of options for the `completion install` command.
```
marzban cli completion install [OPTIONS]
```

**2. Options**

`--shell [bash|zsh|fish|powershell|pwsh]`
```
marzban cli completion install --shell [bash|zsh|fish|powershell|pwsh]
```

`--help`
- Used to view the help for the `completion install` command.
```
marzban cli completion install --help
```

## `completion show`

**1. How to Use**

- Shows the placement of options for the `completion show` command.
```
marzban cli completion show [OPTIONS]
```

**2. Options**

`--shell [bash|zsh|fish|powershell|pwsh]`
```
marzban cli completion show --shell [bash|zsh|fish|powershell|pwsh]
```

`--help`
- Used to view the help for the `completion show` command.
```
marzban cli completion show --help
```

## `examples` 
- Several examples of commonly used commands related to `marzban cli`

- Used to create a `sudo` admin
```
marzban cli admin create --sudo
```

- Used to create a `non-sudo` admin
```
marzban cli admin create 
```

- Used to delete an admin
```
marzban cli admin delete 
```

- Used to change the panel password if forgotten
```
marzban cli admin update
```

- Used to change user ownership from one admin to another
```
marzban cli user set-owner 
```
