---
title: Настройки окружения
---


В данном разделе мы ознакомимся с Вами с конфигурацией проекта

# Конфигурация

Вы можете найти список всех переменных окружения Marzban на этой странице. Вы можете присвоить значения всем этим переменным в файле `.env`.

::: tip Быстрый путь установки
Если вы установили Marzban с помощью метода быстрой установки, вы можете найти файл `.env` по пути `/opt/marzban/.env`.
:::



## Настройки UVICORN

### UVICORN_HOST

Привязка приложения к хосту (по умолчанию: `0.0.0.0`)  
:::hint
0.0.0.0 означает все доступные адреса на машине.
:::

### UVICORN_PORT

Привязка приложения к порту (по умолчанию: `8000`)

### UVICORN_UDS

Привязка приложения к UNIX domain socket

:::hint
Если значение установлено, переменные `UVICORN_HOST` и `UVICORN_PORT` игнорируются.
:::

### UVICORN_SSL_CERTFILE

Адрес файла сертификата SSL.

:::hint
Пример: `/var/lib/marzban/certs/fullchain.pem`
:::

### UVICORN_SSL_KEYFILE

Адрес файла ключа SSL.

:::hint
Пример: `/var/lib/marzban/cert/key.pem`
:::

## Настройки XRAY

### XRAY_JSON:

Адрес файла JSON конфигурации Xray. (по умолчанию: `xray_config.json`)

### XRAY_SUBSCRIPTION_URL_PREFIX:

Префикс адреса подписки.

:::caution
Если эта переменная не задана, ссылки на подписки в Telegram-боте не будут отправляться правильно.
:::

### XRAY_SUBSCRIPTION_PATH

значение по умолчанию: `sub`

Путь к странице полписки

:::hint
Пример: "SomeRandomSUB"
:::

### XRAY_EXECUTABLE_PATH

Адрес исполняемого файла Xray.

Значение по умолчанию: `/usr/local/bin/xray`

### XRAY_ASSETS_PATH

Путь к папке с файлами ресурсов для Xray (файлы geoip.dat и geosite.dat)

Значение по умолчанию: `/usr/local/share/xray`

### XRAY_EXCLUDE_INBOUND_TAGS

Теги входящих соединений, которые не требуют управления и не должны быть включены в список прокси.

:::hint
Пример: "`IBOUND_X INBOUND_Y INBOUND_Z`"
:::

### XRAY_FALLBACKS_INBOUND_TAG

Если вы используете входящее соединение с несколькими резервными вариантами, укажите здесь его тег.

## Настройки Telegram

### TELEGRAM_API_TOKEN

Токен Telegram-бота (полученный от @botfather)

### TELEGRAM_ADMIN_ID

Числовой идентификатор администратора в Telegram (полученный от @userinfobot)

### TELEGRAM_PROXY_URL

URL прокси для запуска Telegram-бота (если серверы Telegram заблокированы на вашем сервере).

:::hint
Пример: "`socks5://127.0.0.1:1080`"
:::

## Настройки Шаблонов

### CUSTOM_TEMPLATES_DIRECTORY

Путь к папке с пользовательскими шаблонами.

Значение по умолчанию: `app/templates`

### CLASH_SUBSCRIPTION_TEMPLATE

Шаблон для создания конфигурации Clash.

Значение по умолчанию: `clash/default.yml`


:::hint
Пример: [default.yml](https://github.com/Gozargah/Marzban/blob/master/app/templates/clash/default.yml))
:::

### SUBSCRIPTION_PAGE_TEMPLATE

Шаблон страницы подписки
Значение по умолчанию: `subscription/index.html`

(Пример: [index.html](https://github.com/Gozargah/Marzban/blob/master/app/templates/subscription/index.html))

### HOME_PAGE_TEMPLATE

Шаблон главной страницы.

Значение по умолчанию: `home/index.html`

(Пример: [index.html](https://github.com/Gozargah/Marzban/blob/master/app/templates/home/index.html))

### SINGBOX_SUBSCRIPTION_TEMPLATE

Шаблон конфига Sing-Box
Значение по умолчанию: `singbox/default.json`

[https://github.com/Gozargah/Marzban/tree/master/app/templates/singbox](https://github.com/Gozargah/Marzban/blob/master/app/templates/singbox/default.json)

### SINGBOX_MUX_CONFIGURATION

Настройки MUX для Sing-box

Значение по умолчанию: `singbox/mux_config.json`

[https://github.com/Gozargah/Marzban/tree/master/app/templates/singbox](https://github.com/Gozargah/Marzban/blob/master/app/templates/singbox/mux_config.json)

## Настройки Подписки

### SUB_PROFILE_TITLE

Заголовок подписки на клиенте

:::hint
Пример: `Susbcription`
:::

### SUB_SUPPORT_URL

Ссылка-поддержки в подписке на клиенте

:::hint
Пример: `https://t.me/support`
:::

### SUB_UPDATE_INTERVAL

Период авто-обновления подписки на клиенте

:::hint
Пример: `1`

установит период авто-обновления в 1 час
:::

## Настройки БД

### SQLALCHEMY_DATABASE_URL

URL базы данных для SQLAlchemy.

Значение по умолчанию: `sqlite:///db.sqlite3`
::: tip Совет
См. доступные форматы и драйверы для адреса базы данных в [SQLAlchemy documentation](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls).
:::

## Настройки Разработчика

### WEBHOOK_ADDRESS

Значение по умолчанию: `DEFAULT`
:::hint
Вы можете задать несколько адресов через `,`
:::

### WEBHOOK_SECRET

Значение по умолчанию: `DEFAULT`

### SUDO_USERNAME:

:::caution
Настоятельно рекомендуется использовать CLI-интерфейс для создания администратора и не использовать эту переменную.
:::

### SUDO_PASSWORD

:::caution
Настоятельно рекомендуется использовать CLI-интерфейс для создания администратора и не использовать эту переменную.
:::

### DOCS

Активация документации API по адресам `/docs` и `/redoc`.

Значение по умолчанию: `false`

### JWT_ACCESS_TOKEN_EXPIRE_MINUTES

Время истечения срока действия доступного токена в минутах.

Значение по умолчанию: `1440`

:::hint
0 означает "без истечения срока действия".
:::

### DEBUG

Активация режима разработки (development).

Значение по умолчанию: `false`

### VITE_BASE_API

Префикс пути API для использования в панели управления (фронт-энд).

Значение по умолчанию: `/api/`
