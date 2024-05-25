---
title: مسدود سازی سایت ها
---

# مسدود سازی سایت‌های ایرانی 
به کمک این آموزش می‌توانید سایت‌های ایرانی را مسدود کنید. هدف از این کار جلوگیری از لو رفتن آیپی سرور شما و فیلتر شدن آن است برای این کار کافی‌ست مراحل زیر را برای سرور مستر و سرور مرزبان نود که در آخر آموزش توضیح داده شده انجام دهید.

## دستورات سرور مستر

### قدم اول: دانلود فایل‌ها و ساخت پوشه‌های مورد نیاز

ابتدا با دستور زیر پوشه `assets` را ایجاد کنید.

``` bash
mkdir -p /var/lib/marzban/assets/
```

### قدم دوم: دانلود فایل‌ها و تنظیم فایل env

سپس دستورات زیر را برای دانلود فایل‌های مورد نظر در ترمینال سرور وارد کنید.
``` bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```

حالا با دستور زیر فایل `.env` را باز کنید.

```bash
nano /opt/marzban/.env
```
مقدار متغیر `XRAY_ASSETS_PATH` را به مقدار تعیین شده در کد زیر تغییر دهید.

``` bash
XRAY_ASSETS_PATH = "/var/lib/marzban/assets/"
```

### قدم سوم: تنظیم و جایگذاری قوانین

دیگه وقت تنظیم کردن مرزبانه :) وارد پنل‌تون بشین و در قسمت `Core Settings` به قسمت `routing` برید و بخش `routing` را مطابق نمونه زیر پر کنید یا کلا بخش `routing` را پاک کنید و مقدار زیر را جایگزین کنید.
(توجه کنید که فقط بخش routing را باید پاک کنید. اگر کلا تا انتهای فایل پاک کردین باید یدونه { به آخرش اضافه کنید.)

``` json
    "routing": {
        "domainStrategy": "IPIfNonMatch",
        "rules": [
            {
                "type": "field",
                "outboundTag": "blackhole",
                "ip": [
                    "geoip:private",
                    "geoip:ir"
                ]
            },
            {
                "type": "field",
                "port": 53,
                "network": "tcp,udp",
                "outboundTag": "DNS-Internal"
            },
            {
                "type": "field",
                "outboundTag": "blackhole",
                "protocol": [
                    "bittorrent"
                ]
            },
            {
                "outboundTag": "blackhole",
                "domain": [
                    "geosite:category-ir",
                    "ext:iran.dat:ir",
                    "regexp:.*\\.ir$",
                    "snapp",
                    "digikala",
                    "tapsi",
                    "blogfa",
                    "bank",
                    "sb24.com",
                    "sheypoor.com",
                    "tebyan.net",
                    "beytoote.com",
                    "telewebion.com",
                    "Film2movie.ws",
                    "Setare.com",
                    "Filimo.com",
                    "Torob.com",
                    "Tgju.org",
                    "Sarzamindownload.com",
                    "downloadha.com",
                    "P30download.com",
                    "Sanjesh.org",
                    "domain:intrack.ir",
                    "domain:divar.ir",
                    "domain:irancell.ir",
                    "domain:yooz.ir",
                    "domain:iran-cell.com",
                    "domain:irancell.i-r",
                    "domain:shaparak.ir",
                    "domain:learnit.ir",
                    "domain:yooz.ir",
                    "domain:baadesaba.ir",
                    "domain:webgozar.ir",
                    "domain:dt.beyla.site"
                ],
                "type": "field"
            }
        ]
    }
```

::: warning توجه
حتما چک کنید که مقدار tag پروتکل blackhole در بخش outbounds برابر با blackhole باشد.
:::

### قدم چهارم: اعمال تغییرات

در نهایت برای اعمال تغییرات با دستور زیر مرزبان را ریستارت کنید.

``` bash
marzban restart
```

## دستورات سرور مرزبان نود

### قدم اول: دانلود فایل‌ها و ساخت پوشه‌های مورد نیاز

ابتدا با دستور زیر پوشه `assets` را ایجاد کنید.
``` bash
mkdir -p /var/lib/marzban/assets/
```

### قدم دوم: دانلود فایل‌ها

سپس دستورات زیر را برای دانلود فایل های مورد نظر در ترمینال سرور وارد کنید.

``` bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```

 ### قدم سوم: تنظیم فایل docker-compose.yml

 وارد پوشه `Marzban-node` شوید.

``` bash
cd Marzban-node
```

با دستور زیر فایل `docker-compose.yml` را باز کنید.

``` bash
nano docker-compose.yml
```

خط زیر را مانند نمونه به بخش `volumes` در فایل `docker-compose.yml` اضافه کنید.

::: code-group
```yml [docker-compose.yml]
      - /var/lib/marzban/assets:/usr/local/share/xray
```
:::

::: details نمونه پیکربندی فایل `docker-compose.yml`
::: code-group
```yml{13} [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban/assets:/usr/local/share/xray
```
:::

::: warning توجه 
فایل `docker-compose.yml` به راستای خطوط و فاصله‌گذاری‌ها حساس است.
:::

### قدم چهارم: اعمال تغییرات

در نهایت برای اعمال تغییرات با دستور زیر مرزبان را ریستارت کنید.

``` bash
docker compose down && docker compose up -d
```
