---
title: تغییر ورژن Xray
---


#  تغییر ورژن Xray
با استفاده از آموزش های زیر می‌توانید نسخه هسته `Xray-core` خود را در مرزبان یا مرزبان نود تغییر دهید.

::: tip نکته
در تمام مثال های پایین، فایل‌ های `docker-compose.yml` و `.env` در مسیر `/opt/marzban‍‍‍` و `xray_config.json` در مسیر `/var/lib/marzban` ‌می‌توانید پیدا کنید.

در صورتی که مرزبان را به صورت دستی نصب کرده‌اید، باید تغییرات مورد نیاز را شخصاً انجام دهید.
:::


## دانلود Xray-core
::: warning پیش‌ نیاز ها
در ادامه شما به پکیج های `unzip` و `wget` نیاز خواهید‌ داشت.
برای نصب آن ها از دستور زیر استفاده کنید.

در `Ubuntu` و `Debian`:
```bash
apt install wget unzip
```

در `CentOS` 
```bash
sudo yum install wget unzip
```
:::

- یک پوشه برای `Xray` ایجاد کنید و وارد آن شوید. 
```bash
mkdir -p /var/lib/marzban/xray-core && cd /var/lib/marzban/xray-core
```
- لینک دانلود نسخه مورد نظر `Xray` را از صفحه [دانلود های Xray-core](https://github.com/XTLS/Xray-core/releases) کپی کرده و به کمک `wget` در مسیر `/var/lib/marzban/xray-core` دانلود کنید.
- به عنوان مثال، برای دانلود آخرین نسخه `Xray` از دستور زیر استفاده کنید.
```bash
wget https://github.com/XTLS/xray-core/releases/latest/download/Xray-linux-64.zip
```
- فایل را از حالت فشرده خارج کنید و فایل فشرده رو پاک کنید.
```bash
unzip Xray-linux-64.zip
rm Xray-linux-64.zip
sudo chmod +x xray
```

## تغییر هسته مرزبان

متغیر `XRAY_EXECUTABLE_PATH` رو در فایل `.env` مقدار دهی کنید.
```bash
XRAY_EXECUTABLE_PATH = "/var/lib/marzban/xray-core/xray"
```

مرزبان را ری‌استارت کنید.
```bash
marzban restart
```

::: details تغییر هسته در مرزبان نود
در مرزبان نود هم به همین ترتیب، باید ‍‍`XRAY_EXECUTABLE_PATH` را مانند زیر مقدار‌دهی کنید و پوشه `/var/lib/marzban/` را به سرویس اضافه کنید.


::: code-group
```yml{8,11} [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host
    environment:
      XRAY_EXECUTABLE_PATH: "/var/lib/marzban/xray-core/xray"
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
و سپس سرویس را ری‌استارت کنید.
:::
