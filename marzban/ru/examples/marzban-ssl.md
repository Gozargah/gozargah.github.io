---
title: Активация SSL в Marzban
---

# Активация SSL в Marzban

При включении SSL в Marzban панель управления и ссылки подписки будут доступны через HTTPS. Существует несколько подходов для активации SSL в Marzban, и ниже представлены три метода в порядке от простого к сложному.

::: tip Примечание
Во всех приведённых ниже примерах файлы `docker-compose.yml` и `.env` можно найти по адресу `/opt/marzban`, а файл `xray_config.json` — по адресу `/var/lib/marzban`.

Если вы устанавливали Marzban вручную, необходимые изменения вам придется внести самостоятельно.
:::

## Активация SSL с помощью Caddy

В этом методе вам не нужно создавать SSL-сертификат — Caddy выполнит всю работу за вас!

- Измените файл `docker-compose.yml` следующим образом:

::: code-group
```yml
services:
  marzban:
    image: gozargah/marzban:latest
    restart: always
    env_file: .env
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
    depends_on:
      - caddy

  caddy:
    image: caddy
    restart: always
    ports:
      - 80:80
      - 443:443
    volumes:
      - /var/lib/marzban:/var/lib/marzban
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_volume:/data
      - caddy_volume:/config

volumes:
  caddy_volume:
```
:::

- Создайте новый файл с именем `Caddyfile` в каталоге `/opt/marzban` и замените `YOUR_DOMAIN` на нужный вам домен или поддомен.

::: warning Внимание
Первая буква в названии файла `Caddyfile` обязательно должна быть заглавной (C).
:::

::: code-group
```caddy
YOUR_DOMAIN {
	reverse_proxy unix//var/lib/marzban/marzban.socket
}
```
:::

::: warning Внимание
Если вы хотите, чтобы домен или поддомен для подписки отличался от домена панели, продублируйте содержимое файла Caddyfile дважды и укажите оба домена или поддомена вместо `YOUR_DOMAIN`.
:::

- Задайте следующие переменные в файле `.env`. Замените `YOUR_DOMAIN` на нужный вам домен или поддомен.

```env
UVICORN_UDS = /var/lib/marzban/marzban.socket
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

- Перезапустите Marzban:

```bash
marzban restart
```

Теперь панель Marzban будет доступна по HTTPS по указанному домену или поддомену.

## Активация SSL с помощью Uvicorn

По умолчанию Marzban запускается с помощью `Uvicorn`, который позволяет задавать SSL-сертификаты.

- Для начала вам необходимо получить файлы сертификата для вашего домена или поддомена. Для этого ознакомьтесь с руководством [Создание SSL-сертификата](issue-ssl-certificate.md).

- После получения файлов сертификата задайте следующие переменные в файле `.env`. Замените `YOUR_DOMAIN` на нужный вам домен или поддомен.

```env
UVICORN_PORT = 443
UVICORN_SSL_CERTFILE = "/var/lib/marzban/certs/YOUR_DOMAIN.cer"
UVICORN_SSL_KEYFILE = "/var/lib/marzban/certs/YOUR_DOMAIN.cer.key"
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

Теперь панель Marzban будет доступна по HTTPS по указанному домену или поддомену.

## Активация SSL с помощью HAProxy

`HAProxy` — один из лучших инструментов для этой задачи. В этом методе Marzban запускается через HTTPS с помощью HAProxy.

- Для начала вам необходимо получить файлы сертификата для вашего домена или поддомена. Для этого ознакомьтесь с руководством [Создание SSL-сертификата](issue-ssl-certificate.md).

- Измените файл `docker-compose.yml` следующим образом:

::: code-group
```yml
services:
  marzban:
      image: gozargah/marzban:latest
      restart: always
      env_file: .env
      network_mode: host
      volumes:
        - /var/lib/marzban:/var/lib/marzban
      depends_on:
        - haproxy
    
  haproxy:
    image: haproxy:latest
    restart: always
    volumes:
      - ./haproxy.cfg:/usr/local/etc/haproxy/haproxy.cfg
      - /var/lib/marzban:/var/lib/marzban
    ports:
      - 80:80
      - 443:443
```
:::

- Создайте новый файл с именем `haproxy.cfg` в каталоге `/opt/marzban` и замените `YOUR_DOMAIN` на нужный вам домен или поддомен.

::: code-group
```cfg
defaults
  mode tcp
  timeout client 30s
  timeout connect 4s
  timeout server 30s

global
  maxconn 10000000

frontend http_frontend
  bind *:80
  mode http
  redirect scheme https code 301 if !{ ssl_fc }

frontend https_frontend
  bind *:443 ssl crt /var/lib/marzban/certs/YOUR_DOMAIN.cer
  default_backend marzban_backend

backend marzban_backend
  server marzban /var/lib/marzban/marzban.socket
```
:::

- Задайте следующие переменные в файле `.env`. Замените `YOUR_DOMAIN` на нужный вам домен или поддомен.

```env
UVICORN_UDS = /var/lib/marzban/marzban.socket
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

- Перезапустите Marzban:

```bash
marzban restart
```

Теперь панель Marzban будет доступна по HTTPS по указанному домену или поддомену.
