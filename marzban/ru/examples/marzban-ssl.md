---
title: فعال‌سازی SSL در مرزبان
---

# فعال‌سازی SSL در مرزبان

با فعال کردن SSL در مرزبان، داشبورد و لینک سابسکریپشن از طریق https در دسترس خواهد بود.
رویکرد های متفاوتی برای فعال‌سازی SSL در مرزبان وجود دارد که در زیر به سه روش آن به ترتیب از ساده به پیچیده اشاره میکنیم.

::: tip نکته
در تمام مثال های پایین، فایل‌ های `docker-compose.yml` و `.env` در مسیر `/opt/marzban‍‍‍` و `xray_config.json` در مسیر `/var/lib/marzban` ‌می‌توانید پیدا کنید.

در صورتی که مرزبان را به صورت دستی نصب کرده‌اید، باید تغییرات مورد نیاز را شخصاً انجام دهید.
:::


## فعال‌سازی SSL با Caddy

در این روش، شما نیازی به ساخت گواهی SSL ندارید، Caddy تمام کار را برای شما انجام می‌دهد!


- فایل `docker-compose.yml` به شکل زیر تغییر دهید.

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

- فایل جدیدی به نام ‍`Caddyfile` در مسیر `/opt/marzban` ایجاد کنید و `YOUR_DOMAIN` را به دامنه یا ساب‌دامنه‌ی مورد نظر خود تغییر دهید.

::: warning توجه
حرف اول در نام فایل `Caddyfile` حتما باید `C` بزرگ باشد.
:::

::: code-group
```caddy [Caddyfile]
YOUR_DOMAIN {
	reverse_proxy unix//var/lib/marzban/marzban.socket
}
:::


::: warning توجه
اگر می‌خواهید دامنه یا ساب‌دامنه‌ی سابسکریپشن از پنل متفاوت باشد، در فایل Caddyfile خود محتوای بالا رو دوبار زیرهم قرار داده و جفت دامنه یا ساب‌دامنه‌ها را بجای `YOUR_DOMAIN` قرار دهید.
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
