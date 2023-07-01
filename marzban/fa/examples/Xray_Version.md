---
title: تغییر ورژن Xray
---
#  تغییر ورژن Xray
با استفاده از این روش می توانید به استفاده از نسخه های جدیدتر و یا قدیمی تر `Xray-core` روی مرزبان استفاده کنید. 

# قدم اول : دانلود نسخه Xray مورد نظر روی سرور 

::: details پیش نیاز های Debian
در صورتی که از `Debian` استفاده می کنید احتمالا `unzip` و `wget` روی سیستم عامل شما نصب نیست و باید اونها رو نصب کنید.

::: code-group
```bash [Terminal]
apt install wget
apt install unzip
```
:::

- ابتدا باید از [این صفحه](https://github.com/XTLS/Xray-core/releases) لینک دانلود نسخه مورد نظر تون رو انتخاب کنید.
- برای مثال ما در اینجا نسخه `1.8.3` رو انتخاب می کنیم.
- یک پوشه برای `Xray` ایجاد می کنیم.
```bash
mkdir /var/lib/xray
```
وارد پوشه شوید.
```bash
cd /var/lib/xray
```
با دستور `wget` فایل رو دانلود کنید.
```bash
wget https://github.com/XTLS/Xray-core/releases/download/v1.8.3/Xray-linux-64.zip
```
سپس فایل رو از حالت Zip خارج می کنیم.
```bash
unzip Xray-linux-64.zip
```

# قدم دوم : تغییر در فایل های مرزبان

## Marzban
ابتدا متغیر `XRAY_EXECUTABLE_PATH` رو در فایل `.env` مقدار دهی می کنیم.
```bash
XRAY_EXECUTABLE_PATH = "/var/lib/xray/xray"
```
سپس در فایل `docker-compose.yml` اجازه دسترسی به این مسیر رو به داکر میدیم.
```yml
services:
  marzban:
    image: gozargah/marzban:latest
    restart: always
    env_file: .env
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
      - /var/lib/xray:/var/lib/xray
```
سپس مرزبان رو ری استارت می کنیم.
```bash
marzban restart
```

## Marzban-Node
- ابتدا باید به فایل `docker-compose.yml` بخش `environment` اضافه کنیم و در آن متغیر `XRAY_EXECUTABLE_PATH` رو مقدار دهی کنیم.
- همچنین باید اجازه دسترسی به این مسیر رو به داکر بدیم.
```yml
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host
    environment:
      XRAY_EXECUTABLE_PATH: "/var/lib/xray/xray"
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/xray:/var/lib/xray
```
سپس مرزبان نود رو ری استارت می کنیم.
```bash
docker compose down
docker compose up -d
```
