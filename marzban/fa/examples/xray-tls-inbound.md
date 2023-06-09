---
title: فعال‌سازی TLS
---

# فعال‌سازی TLS

با فعال کردن SSL در مرزبان، داشبورد و لینک سابسکریپشن از طریق https در دسترس خواهد بود.
رویکرد های متفاوتی برای فعال‌سازی SSL در مرزبان وجود دارد که در زیر به سه روش آن به ترتیب از ساده به پیچیده اشاره میکنیم.

## فعال‌سازی SSL با Uvicorn

مرزبان به صورت پیش‌فرض به کمک `Uvicorn` اجرا می‌شود. همچنین `Uvicorn` به شما امکان تعریف فایل های گواهی SSL را می‌دهد.

- برای شروع، شما باید فایل های گواهی را برای دامنه یا ساب‌دامنه‌ی خود دریافت کنید. برای این کار، آموزش [ساخت گواهی SSL](issue-ssl-certificate.md) را مشاهده کنید.

- بعد از ساخت فایل های گواهی SSL، متغیر های زیر را در فایل `.env` مقداردهی کنید.

`YOUR_DOMAIN` را به دامنه یا ساب‌دامنه‌ی مورد نظر خود تغییر دهید.

```env
UVICORN_PORT = 443
UVICORN_SSL_CERTFILE = "/var/lib/marzban/certs/YOUR_DOMAIN.cer"
UVICORN_SSL_KEYFILE = "/var/lib/marzban/certs/YOUR_DOMAIN.cer.key"
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

حالا داشبورد مرزبان در آدرس دامنه یا ساب‌دامنه‌ی شما از طریق https در دسترس خواهد بود.


## فعال‌سازی SSL با HAProxy

`HAProxy` یکی از بهترین ابزار ها برای انجام این کار هست. در این روش مرزبان را با کمک `HAProxy` روی https اجرا می‌کنیم.

- برای شروع، شما باید فایل های گواهی را برای دامنه یا ساب‌دامنه‌ی خود دریافت کنید. برای این کار، آموزش [ساخت گواهی SSL](issue-ssl-certificate.md) را مشاهده کنید.


- فایل `docker-compose.yml` به شکل زیر تغییر دهید.

::: code-group
```yml{8-9,11-20} [docker-compose.yml]
marzban:
    image: gozargah/marzban:latest
    restart: always
    env_file: .env
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
    depends_on:
      - haproxy

services:
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

- فایل جدیدی به نام ‍`haproxy.cfg` در مسیر `/opt/marzban` ایجاد کنید و `YOUR_DOMAIN` را به دامنه یا ساب‌دامنه‌ی مورد نظر خود تغییر دهید.

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

- متغیر های زیر را در فایل `.env` مقداردهی کنید.

`YOUR_DOMAIN` را به دامنه یا ساب‌دامنه‌ی مورد نظر خود تغییر دهید.

```env
UVICORN_UDS = /var/lib/marzban/marzban.socket
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN
```

- مرزبان را ری‌استارت کنید.

```bash
marzban restart
```

حالا داشبورد مرزبان در آدرس دامنه یا ساب‌دامنه‌ی شما از طریق https در دسترس خواهد بود.