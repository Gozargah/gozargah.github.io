---
title: Получение SSL
---



Рекомендуется получить и настроить сертификат для обеспечения безопасности передачи данных панели и защиты от атак "человек-по-середине", работы TLS подключений, функционирования подписок и многого другого.

:::caution
Перед получением SSL-сертификата настройте DNS-записи вашего домена (A и/или AAAA записи).

Если вы только что зарегистрировали домен и добавили DNS-записи, возможно, потребуется время для их обновления. Статус можно проверить на https://www.whatsmydns.net.
:::

:::note
Для новых и существующих доменов рекомендуется использовать NS сервера Cloudflare и управлять DNS-записями через их сервисы.
:::


## Получение сертификата с acme.sh


1. Установка необходимого ПО
	```bash
	sudo apt install cron socat
	```
2. Установка acme.sh
	:::note
	`EMAIL` — ваш email (можно указать любой).
	:::
	```bash
	curl https://get.acme.sh | sh -s email=EMAIL
	```
3. Создание директории для сертификатов

    ```bash
    sudo mkdir -p /var/lib/marzban/certs/
    ```

4. Получение сертификатов
   :::note
   Замените `DOMAIN` на ваш домен или субдомен.
   :::
   ```bash
	~/.acme.sh/acme.sh --set-default-ca --server letsencrypt --issue --standalone -d DOMAIN \
	--key-file /var/lib/marzban/certs/key.pem \
	--fullchain-file /var/lib/marzban/certs/fullchain.pem
	```


## Получение WILDCARD сертификата с acme.sh


1. Установка необходимого ПО
	```bash
	sudo apt install cron socat
	```
2. Установка acme.sh
	:::note
	`EMAIL` — ваш email (можно указать любой).
	:::
	```bash
	curl https://get.acme.sh | sh -s email=EMAIL
	```

3. Создание директории для сертификатов

   ```bash
   sudo mkdir -p /var/lib/marzban/certs/
   ```

4. Получение ключа API Cloudflare

   Получите Global API Key в аккаунте Cloudflare для автоматической настройки DNS-записей.

5. Настройка переменных окружения

   ```bash
   export CF_Key="ваш_cloudflare_api_key"
   export CF_Email="ваш_cloudflare_email"
   ```

6. Выпуск wildcard сертификата
   :::note
   Замените `DOMAIN` на ваш домен.
   :::
   ```bash
   ~/.acme.sh/acme.sh --set-default-ca --server letsencrypt --issue --dns dns_cf \
   -d DOMAIN \
   -d *.DOMAIN \
   --key-file /var/lib/marzban/certs/key.pem \
   --fullchain-file /var/lib/marzban/certs/fullchain.pem
   ```


## Дополнительные советы

:::tip
Для просмотра списка выпущенных сертификатов:

```bash
~/.acme.sh/acme.sh --list
```

:::

:::tip
Для ручного продления сертификатов:

Вы должны перечислить все домены, которые хотите продлить

```bash
~/.acme.sh/acme.sh --renew -d DOMAIN --force
```

:::
