---
title: مسدود سازی سایت ها
---

# مسدود سازی سایت های ایرانی 
به کمک این آموزش میتونید سایت های ایرانی رو مسدود بکنید هدف از این کار جلوگیری از لو رفتن آیپی سرور شما و فیلتر شدنش هست برای این کار کافیه مراحل زیر رو برای سرور اصلی و یا node که در آخر صفحه توضیح داده شده انجام بدید.

## دستورات سرور اصلی
### قدم اول: دانلود فایل ها و ساخت پوشه های مورد نیاز
ابتدا با دستور زیر پوشه `assets` رو ایجاد کنید.
``` bash
mkdir -p /var/lib/marzban/assets/
```
### قدم دوم: دانلود فایل ها و تنظیم فایل env
سپس دستورات زیر رو برای دانلود فایل های مورد نظر در ترمینال سرور وارد کنید.
``` bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```
حالا فایل `.env` رو باید ویرایش کنین و مقدار متغیر `XRAY_ASSETS_PATH` رو به `"/var/lib/marzban/assets/"` تغییر بدید برای این کار میتونین از دستور nano و یا vim در لینوکس استفاده کنید.
``` bash
nano /opt/marzban/.env
```
``` bash
XRAY_ASSETS_PATH = "/var/lib/marzban/assets/"
```

::: tip نکته
اگر دستور nano براتون فعال نبود داخل توزیع های دبیان بیس ( اوبونتو و ... ) میتونید با دستور زیر nano رو نصب بکنید
apt install nano
:::

### قدم سوم: تنظیم و جایگذاری قوانین
دیگه وقت تنظیم کردن مرزبانه :) وارد پنلتون بشید و در قسمت `Core Settings` به قسمت `routing` برید و بخش `routing` رو مطابق نمونه زیر پر کنید یا کلا بخش `routing` رو پاک کنید و مقدار زیر رو جایگزین کنید.
(توجه کنید که فقط بخش routing رو باید پاک کنید. اگر کلا تا انتهای فایل پاک کردین باید یدونه { به آخرش اضافه کنید. )
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
الان همه کارها انجام شده و برای اینکه تغییرات اعمال بشه باید مرزبان ری استارت بشه برای این کار از دستور زیر استفاده کنید.
``` bash
marzban restart
```

## دستورات سرور node

### قدم اول: دانلود فایل ها و ساخت پوشه های مورد نیاز
ابتدا با دستور زیر پوشه `assets` رو ایجاد کنید.
``` bash
mkdir -p /var/lib/marzban/assets/
```
### قدم دوم: دانلود فایل ها
سپس دستورات زیر رو برای دانلود فایل های مورد نظر در ترمینال سرور وارد کنید.
``` bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```
 ### قدم سوم: تنظیم فایل docker-sompose.yml
 وارد پوشه `Marzban-node` بشید
``` bash
cd Marzban-node
```
با دستور زیر فایل `docker-compose.yml` رو باز کنید
``` bash
nano docker-compose.yml
```
محتوای فایل `docker-compose.yml` رو همانند زیر تنظیم و یا حذف و مقادیر زیر رو اعمال کنید

::: code-group
``` [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban/assets:/usr/local/share/xray
```
:::

### قدم چهارم: اعمال تغییرات
الان همه کارها انجام شده و برای اینکه تغییرات اعمال بشه باید مرزبان ری استارت بشه برای این کار از دستور زیر استفاده کنید.
``` bash
marzban restart
```
