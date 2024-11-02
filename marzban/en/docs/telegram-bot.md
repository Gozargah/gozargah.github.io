---
title: Telegram Bot 
---

# Telegram Bot

Using this guide, you can set up the Marzban Telegram bot to manage your users not only through the Marzban panel but also via the Telegram bot. Some of the bot's features are listed down below.

- Panel statistics with more details, such as download and upload traffic, and real-time download and upload speed
- The ability to make changes for all users, such as adding or reducing the number of days or allocated data limit
- Deleting all expired users or users that their data limit is reached
- Disabling or enabling an inbound for all users
- Creating users by user-templates 
- Subscrption last user agent 
- Restarting `Xray`

## Setup

`1`You need to create a Telegram bot through [BotFather](https://t.me/BotFather) and copy the bot token to use it in the next step.

`2` Since access to this bot will only be available to you or a limited list of administrators, you need to specify the Telegram IDs of those who are authorized to use it. To get your own Telegram ID, refer to the [UserInfoBot](https://t.me/userinfobot).

::: tip Tip 
If you want the panel logs to be separate, create a channel and send a message in it, then forward that message to the bot mentioned in step two to receive the channel ID. To ensure the logs are sent to the channel, the Telegram bot must be a member and an admin of the channel.
:::

`3` Now you need to define all the variables in Marzban. To do this, you need to enable the variables in the `.env` file by removing the leading `#` comments from them and entering the required values in the file.

| Variables                    |                  Usage                                                      |
|------------------------------|-----------------------------------------------------------------------------|
| `TELEGRAM_API_TOKEN`         | The token for the Telegram bot                                              |       
| `TELEGRAM_ADMIN_ID` | The ID number of the admin in Telegram (if you need multiple admins to access the bot, specify their IDs separated by commas)                                                                       |
| `TELEGRAM_LOGGER_CHANNEL_ID` | The ID number of the channel for panel logs, if desired                     |  
| `TELGRAM_DEFAULT_VLESS_FLOW`  | Sets the default flow for the Vless protocol in the Telegram bot           |    
| `TELEGRAM_PROXY_URL`       | Runs the bot through a proxy (if Telegram servers are blocked on your server) |

`4` Then, restart Marzban using the following command to apply the changes.

  ```bash
  marzban restart
  ```

- Finally, The bot will be available to you by entering the `/start` command.
