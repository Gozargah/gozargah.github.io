---
title: Активация SSL в Marzban
---

# Активация SSL в Marzban

При активации SSL в Marzban, панель управления и ссылка на подписку будут доступны через https.
Существуют различные подходы к активации SSL в Marzban, ниже мы рассмотрим три метода в порядке от простого к сложному.

::: tip Примечание
Во всех примерах ниже файлы `docker-compose.yml` и `.env` находятся в директории `/opt/marzban‍‍‍`, а `xray_config.json` в директории `/var/lib/marzban`.

Если вы установили Marzban вручную, вам нужно будет внести необходимые изменения самостоятельно.
:::


## Активация SSL с помощью Caddy

В этом методе вам не нужно создавать SSL-сертификат, Caddy сделает всю работу за вас!


- Измените файл `docker-compose.yml` следующим образом.

::: code-group
```yml{9-10,12-22,24-25} [docker-compose.yml]
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

- Создайте новый файл с именем ‍`Caddyfile` в директории `/opt/marzban` и замените `YOUR_DOMAIN` на ваш домен или поддомен.

::: warning Внимание
Первая буква в имени файла `Caddyfile` обязательно должна быть заглавной `C`.
:::

::: code-group
```caddy [Caddyfile]
YOUR_DOMAIN {
	reverse_proxy unix//var/lib/marzban/marzban.socket
}
:::


::: warning Внимание
Если вы хотите, чтобы домен или поддомен подписки отличался от панели, в файле Caddyfile разместите приведенное выше содержимое дважды одно под другим и замените `YOUR_DOMAIN` на оба домена или поддомена.
:::

- Установите следующие переменные в файле `.env`.

Замените `YOUR_DOMAIN` на ваш домен или поддомен.

```env
UVICORN_UDS = /var/lib/marzban/marzban.socket
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

- Перезапустите Marzban.

```bash
marzban restart
```

Теперь панель управления Marzban будет доступна по адресу вашего домена или поддомена через https.


## Активация SSL с помощью Uvicorn

Marzban по умолчанию запускается с помощью `Uvicorn`. Кроме того, `Uvicorn` позволяет вам определить файлы SSL-сертификатов.

- Для начала вам нужно получить файлы сертификатов для вашего домена или поддомена. Для этого ознакомьтесь с инструкцией [Создание SSL-сертификата](issue-ssl-certificate.md).

- После создания файлов SSL-сертификатов установите следующие переменные в файле `.env`.

Замените `YOUR_DOMAIN` на ваш домен или поддомен.

```env
UVICORN_PORT = 443
UVICORN_SSL_CERTFILE = "/var/lib/marzban/certs/YOUR_DOMAIN.cer"
UVICORN_SSL_KEYFILE = "/var/lib/marzban/certs/YOUR_DOMAIN.cer.key"
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

Теперь панель управления Marzban будет доступна по адресу вашего домена или поддомена через https.


## Активация SSL с помощью HAProxy

`HAProxy` - один из лучших инструментов для этой задачи. В этом методе мы запускаем Marzban через https с помощью `HAProxy`.

- Для начала вам нужно получить файлы сертификатов для вашего домена или поддомена. Для этого ознакомьтесь с инструкцией [Создание SSL-сертификата](issue-ssl-certificate.md).


- Измените файл `docker-compose.yml` следующим образом.

::: code-group
```yml{9-10,12-20} [docker-compose.yml]
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

- Создайте новый файл с именем ‍`haproxy.cfg` в директории `/opt/marzban` и замените `YOUR_DOMAIN` на ваш домен или поддомен.

::: code-group
```cfg [haproxy.cfg]
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
:::

- Установите следующие переменные в файле `.env`.

Замените `YOUR_DOMAIN` на ваш домен или поддомен.

```env
UVICORN_UDS = /var/lib/marzban/marzban.socket
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

- Перезапустите Marzban.

```bash
marzban restart
```

Теперь панель управления Marzban будет доступна по адресу вашего домена или поддомена через https.
