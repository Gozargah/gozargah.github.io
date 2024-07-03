
---
title: CLI
description: CLI
---

# Marzban Commands

Marzban provides a set of commands for managing the application instance.
Below is a detailed overview of the available commands.

## Commands

### `up`

Starts all necessary application services.

Use this command to initialize all Marzban components.

```bash
sudo marzban up
```

### `down`

Stops all running services.

This is a safe way to stop all processes related to Marzban.

```bash
sudo marzban down
```

### `restart`

Restarts all services.

This command is useful for applying configuration changes.

```bash
sudo marzban restart
```

### `status`

Displays the current status of all application services.

Use this command to check if the necessary services are active.

```bash
sudo marzban status
```

### `logs`

Shows logs for all services.

This can be useful for debugging and identifying potential issues.

```bash
sudo marzban logs
```

### `cli`

Provides access to the Marzban command line interface for performing specific tasks.

```bash
sudo marzban cli
```

### `install`

Installs Marzban on your system.

This command prepares everything needed to run the application.

```bash
sudo marzban install
```

### `update`

Updates the application to the latest version.

It is recommended to update regularly to use the latest features and fixes.

```bash
sudo marzban update
```

### `uninstall`

Uninstalls Marzban from your system.

```bash
sudo marzban uninstall
```

## CLI

**Usage**:

```console
$ [OPTIONS] COMMAND [ARGS]...
```

**Options**:

- `--help`: Show this message and exit.

**Commands**:

- `admin`
- `subscription`
- `user`

### `admin`

**Usage**:

```console
$ admin [OPTIONS] COMMAND [ARGS]...
```

**Options**:

- `--help`: Show this message and exit.

**Commands**:

- `create`: Creates an admin
- `delete`: Deletes the specified admin
- `import-from-env`: Imports a superadmin from environment variables
- `list`: Displays a table of admins
- `update`: Updates the specified admin

#### `admin create`

Creates an admin

The password can also be set via the `MARZBAN_ADMIN_PASSWORD` environment variable for non-interactive use.

**Usage**:

```console
$ admin create [OPTIONS]
```

**Options**:

- `-u, --username TEXT`: [required]
- `--sudo / --no-sudo`
- `--help`: Show this message and exit.

#### `admin delete`

Deletes the specified admin

Confirmation can be skipped using the `--yes/-y` option.

**Usage**:

```console
$ admin delete [OPTIONS]
```

**Options**:

- `-u, --username TEXT`: [required]
- `-y, --yes`: Skips confirmation
- `--help`: Show this message and exit.

#### `admin import-from-env`

Imports a superadmin from environment variables

Confirmation can be skipped using the `--yes/-y` option.

What does this command do?

- Creates a superadmin according to `SUDO_USERNAME` and `SUDO_PASSWORD`.
- Links any user who does not have an `admin_id` to the imported superadmin.

**Usage**:

```console
$ admin import-from-env [OPTIONS]
```

**Options**:

- `-y, --yes`: Skips confirmation
- `--help`: Show this message and exit.

#### `admin list`

Displays a table of admins

**Usage**:

```console
$ admin list [OPTIONS]
```

**Options**:

- `-o, --offset INTEGER`
- `-l, --limit INTEGER`
- `-u, --username TEXT`: Search by username
- `--help`: Show this message and exit.

#### `admin update`

Updates the specified admin

NOTE: This command CANNOT be used in non-interactive mode.

**Usage**:

```console
$ admin update [OPTIONS]
```

**Options**:

- `-u, --username TEXT`: [required]
- `--help`: Show this message and exit.

### `subscription`

**Usage**:

```console
$ subscription [OPTIONS] COMMAND [ARGS]...
```

**Options**:

- `--help`: Show this message and exit.

**Commands**:

- `get-config`: Generates a subscription configuration.
- `get-link`: Outputs the subscription link for the specified user.

#### `subscription get-config`

Generates a subscription configuration.

Generates a subscription configuration for the specified user in the specified format.

The output will be written to the output file if `output-file` is specified, otherwise it will be shown in the terminal.

**Usage**:

```console
$ subscription get-config [OPTIONS]
```

**Options**:

- `-u, --username TEXT`: [required]
- `-f, --format [v2ray|clash]`: [required]
- `-o, --output TEXT`: Writes the generated configuration to a file, if specified
- `--base64`: Encodes the output in base64 format, if specified
- `--help`: Show this message and exit.

#### `subscription get-link`

Outputs the subscription link for the specified user.

NOTE: The `XRAY_SUBSCRIPTION_URL_PREFIX` environment variable must be set for this command to work properly.

**Usage**:

```console
$ subscription get-link [OPTIONS]
```

**Options**:

- `-u, --username TEXT`: [required]
- `--help`: Show this message and exit.

### `user`

**Usage**:

```console
$ user [OPTIONS] COMMAND [ARGS]...
```

**Options**:

- `--help`: Show this message and exit.

**Commands**:

- `list`: Displays a table of users
- `set-owner`: Transfers user ownership

#### `user list`

Displays a table of users

NOTE: Sorting is currently unavailable.

**Usage**:

```console
$ user list [OPTIONS]
```

**Options**:

- `-o, --offset INTEGER`
- `-l, --limit INTEGER`
- `-u, --username TEXT`: Search by username
- `--status [active|disabled|limited|expired]`
- `--admin, --owner TEXT`: Search by admin-owner username
- `--help`: Show this message and exit.

#### `user set-owner`

Transfers user ownership

NOTE: This command requires additional confirmation for users who already have an owner.

**Usage**:

```console
$ user set-owner [OPTIONS]
```

**Options**:

- `-u, --username TEXT`
- `--admin, --owner TEXT`: Admin username
- `-y, --yes`: Skips confirmation
- `--help`: Show this message and exit.
