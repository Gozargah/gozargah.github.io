---
title: Configuration
---

# Configuration

You can find a list of all Marzban's environment variables on this page. You can assign values to all these variables in the `.env` file.

::: tip Quick Installation Path
If you have installed Marzban using the quick installation method, you can find the `.env` file at `/opt/marzban/.env`.
:::


## UVICORN_HOST
- Default value: `0.0.0.0`

The IP addresses the marzban should listen on.

::: tip Note
`0.0.0.0` means all available addresses on the machine.
:::

## UVICORN_PORT
- Default value: `8000`

The port Marzban should listen on.


## UVICORN_UDS

The unix domain socket address which Marzban should listen on.

::: tip Note
If this variable is assigned a value, the `UVICORN_HOST` and `UVICORN_PORT` variables will be ignored.
:::


## UVICORN_SSL_CERTFILE

The path to the SSL certificate file.

(Example: `/path/to/example.com/fullchain.pem`)

## UVICORN_SSL_KEYFILE

The path to the SSL key file.

(Example: `/path/to/example.com/key.pem`)


## XRAY_JSON
- Default value: `xray_config.json`

The path to the xray configuration JSON file.


## XRAY_SUBSCRIPTION_URL_PREFIX

The prefix URL for subscription links.

::: warning Note
If this variable is not set, subscription links will not be sent correctly in the Telegram bot.
:::


## XRAY_SUBSCRIPTION_PATH
- Default value: `sub`

The path for subscription links.


## XRAY_EXECUTABLE_PATH
- Default value: `/usr/local/bin/xray`

The path to the xray executable file.


## XRAY_ASSETS_PATH
- Default value: `/usr/local/share/xray`

The path to the asset files directory for xray (`geoip.dat` and `geosite.dat` files).


## XRAY_EXCLUDE_INBOUND_TAGS

The inbound tags that should not be included in the proxy list and don't require any management.

(Example: `"IBOUND_X INBOUND_Y INBOUND_Z"`)


## XRAY_FALLBACKS_INBOUND_TAG
If you are using an inbound with multiple fallbacks, enter the tag here.


## TELEGRAM_API_TOKEN

The Telegram bot token (obtained from [@botfather](https://t.me/botfather))

## TELEGRAM_ADMIN_ID

The numeric ID of the admin in Telegram (obtained from [@userinfobot](https://t.me/userinfobot))


## TELEGRAM_LOGGER_CHANNEL_ID
The numeric ID of the Telegram bot's log channel.

If assigned a value, the logs related to the Marzban Telegram bot will be sent to this channel. The Marzban Telegram bot must be an admin in this channel.


## TELEGRAM_DEFAULT_VLESS_FLOW
The default flow for the Vless protocol in the Telegram bot.

(Example: `"xtls-rprx-vision"`)


## TELEGRAM_PROXY_URL

To run the Telegram bot with a proxy (in case Telegram servers are blocked on your server).

(Example: `"socks5://127.0.0.1:1080"`)


## DISCORD_WEBHOOK_URL
The Discord webhook address.


## CUSTOM_TEMPLATES_DIRECTORY
- Default value: `app/templates`

The directory for template files.


## CLASH_SUBSCRIPTION_TEMPLATE
- Default value: `clash/default.yml`

The template used to generate Clash configurations.

(Example: [default.yml](https://github.com/Gozargah/Marzban/blob/master/app/templates/clash/default.yml))


## SUBSCRIPTION_PAGE_TEMPLATE
- Default value: `subscription/index.html`

The template used for the subscription information page.

(Example: [index.html](https://github.com/Gozargah/Marzban/blob/master/app/templates/subscription/index.html))


## HOME_PAGE_TEMPLATE
- Default value: `home/index.html`

The template used for the home page.

(Example: [index.html](https://github.com/Gozargah/Marzban/blob/master/app/templates/home/index.html))


## SUB_PROFILE_TITLE
- Default value: `Subscription`

The title of the subscription in the client.

If the client supports this feature and the user does not select a title for the subscription, this value will be used as the subscription title.


## SUB_SUPPORT_URL
The support contact address in the subscription link.

(Example: `"https://t.me/support"`)


## SUB_UPDATE_INTERVAL
- Default value: `12`

The time interval between automatic subscription updates (in hours).

If the client supports this feature, the subscription will be updated every 12 hours.


## SQLALCHEMY_DATABASE_URL
- Default value: `sqlite:///db.sqlite3`

The database address in SQLAlchemy format.

::: tip Guide
See the available formats and drivers for the database address in the [SQLAlchemy documentation](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls).
:::


## WEBHOOK_ADDRESS
- Default value: `DEFAULT`



## WEBHOOK_SECRET
- Default value: `DEFAULT`



## SUDO_USERNAME
::: warning Note
It is strongly recommended to use the Marzban CLI to create an admin and not use this variable.
:::
You can set the username of the super admin from an environment variable.


## SUDO_PASSWORD
::: warning Note
It is strongly recommended to use the Marzban CLI to create an admin and not use this variable.
:::
You can set the password of the super admin from an environment variable.


## DOCS
- Default value: `false`

Enable API documentation at `/docs` and `/redoc`.


## JWT_ACCESS_TOKEN_EXPIRE_MINUTES
- Default value: `1440`

The expiration time of the access token in minutes.

::: tip Note
`0` means 'no expiration'.
:::


## DEBUG
- Default value: `false`

Enable development mode.


## VITE_BASE_API
- Default value: `/api/`

The API route prefix for use in the dashboard (front-end)
