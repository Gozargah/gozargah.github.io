---
title: Подключение SSL
description: Подключение SSL
sidebar:
  order: 4
---


Если включить SSL в Marzban, панель управления и ссылка на подписку будут доступны через https.

## SSL с помощью Uvicorn

Marzban запускается по умолчанию с помощью`Uvicorn`, он же позволяет вам определять файлы сертификатов SSL.

Используемые файлы:


После создания файлов сертификатов SSL установите в файле `.env` следующие переменные .


1. Открываем файл настроек
	```bash
	sudo nano /opt/marzban/.env
	```

2. Устанавливаем новые значения
   :::tip
   если Вы испольузете wildcard домен, Вы можете использовать установить знак `*` в переменной `XRAY_SUBSCRIPTION_URL_PREFIX`,
   например `https://*.DOMAIN.com`, вместо которого система будет подставлять случайное значение, например `https://830aa395df41ae5a.DOMAIN.com`
   :::
   ```diff
   -UVICORN_PORT = 8000
   +UVICORN_PORT = 443
   -# UVICORN_SSL_CERTFILE = "/var/lib/marzban/certs/example.com/fullchain.pem"
   -# UVICORN_SSL_KEYFILE = "/var/lib/marzban/certs/example.com/key.pem"
   +UVICORN_SSL_CERTFILE = "/var/lib/marzban/certs/fullchain.pem"
   +UVICORN_SSL_KEYFILE = "/var/lib/marzban/certs/key.pem"
   -# XRAY_SUBSCRIPTION_URL_PREFIX = "https://example.com"
   +XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
   ```
3. Сохраняем внесенные изменения

   Для того, что бы изменения вступили в силу, необходимо перезапустить панель

   ```bash
   sudo marzban restart
   ```
