---
title: مرزبان نود
---


# مرزبان نود

مرزبان نود (Marzban Node) به شما اجازه می‌دهد تا بار ترافیکی را میان سرورهای مختلف پخش کنید و همچنین امکان استفاده از سرورهایی با لوکیشن‌های متفاوت را فراهم می‌کند. به کمک مطالب این صفحه شما می‌توانید مرزبان نود را روی یک یا چندین سرور جانبی پیکربندی و راه‌اندازی کرده، و آنها را به پنل مرزبان متصل کنید تا بتوانید از این سرورها در کانفیگ‌های خود استفاده نمایید.
در ادامه نیز نحوه اتصال نود به چند پنل مرزبان را مشاهده خواهید کرد.


## راه‌اندازی مرزبان نود

- پس از وارد شدن به ترمینال سرور نود، ابتدا با دستور زیر سرور را آپدیت و برنامه‌های مورد نیاز را نصب کنید.
```bash
apt-get update; apt-get install curl socat git -y
```

- داکر را نصب کنید.
```bash
curl -fsSL https://get.docker.com | sh
```

- مرزبان نود را کلون کرده و سپس فولدر آن را ایجاد کنید.
```bash
git clone https://github.com/Gozargah/Marzban-node
mkdir /var/lib/marzban-node 
```

- برای برقراری ارتباط امن میان نود و پنل مرزبان، لازم است در فایل `docker-compose.yml` تغییراتی اعمال شود. پس وارد فولدر اصلی مرزبان نود شده، و این فایل را برای ویرایش باز کنید.
```bash
cd ~/Marzban-node
nano docker-compose.yml
```
::: tip نکته 
فایل`docker-compose.yml` به راستای خطوط و فاصله‌گذاری‌ها حساس است. برای صحت‌سنجی پیکربندی خود می‌توانید از ابزار [yamlchecker](https://yamlchecker.com) کمک بگیرید.
:::

- با حذف `#` از پشت عبارت `SSL_CLIENT_CERT_FILE` آن را از حالت کامنت خارج کنید و این خط را با خط بالا در یک راستا قرار دهید. در صورت تمایل می‌توانید دو خط مربوط به `SSL_CERT_FILE` و `SSL_KEY_FILE` را حذف کنید. 

- اگر از نسخه‌ 0.4.4 و جدیدتر مرزبان استفاده می‌کنید، می‌توانید با فعالسازی پروتکل `rest` پایداری اتصال نودها را بهبود دهید. برای این کار با حذف `#` خط مربوطه را از حالت کامنت خارج کنید.

پس از ذخیره تغییرات، در نهایت محتویات فایل شما به این صورت خواهد بود:

::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    # env_file: .env
    environment:
      SSL_CERT_FILE: "/var/lib/marzban-node/ssl_cert.pem"
      SSL_KEY_FILE: "/var/lib/marzban-node/ssl_key.pem"
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::

::: tip نکته
اگر قصد تغییر پورت‌های اتصال نود به مرزبان را دارید، می‌توانید دو متغیر  `XRAY_API_PORT` و `SERVICE_PORT` را به بخش `environment` در این فایل اضافه کنید و پورت‌های مد نظر خود را قرار دهید.
([مشاهده نمونه پیکربندی](marzban-node.md#حالت-اول-با-استفاده-از-host-network))
:::

::: details استفاده از فایل `.env` (اختیاری)
در صورت تمایل می‌توانید متغیرهای محیطی مرزبان نود را از فایل `.env` تنظیم کنید.

یک کپی از فایل `.env.example` بسازید، آن را برای ویرایش باز کنید و تغییرات مورد نیاز را در این فایل انجام دهید.
```bash
cp .env.example .env
nano .env
```

فایل `docker-compose.yml` را به صورت زیر تنظیم کنید.
::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host
    env_file: .env
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::

- اکنون در پنل خود از طریق منو وارد بخش `Node Settings` شوید.
سپس با کلیک بر روی `Add New Mazrban Node` یک نود جدید اضافه کنید.

- با کلیک بر روی دکمه `Show Certificate` سرتیفیکیت مورد نیاز برای اتصال نود را مشاهده خواهید کرد. این سرتیفیکیت را کپی کنید و ادامه مراحل را از ترمینال سرور نود دنبال نمایید.

<img src="https://github.com/user-attachments/assets/397daac8-3cd7-4980-834c-44063b37296f"
     style="display:block;float:none;margin-left:auto;margin-right:auto;width:50%">
<br>

- با دستور زیر فایل سرتیفیکیت را ایجاد کرده و محتوای کپی شده را را درون آن قرار دهید.
```bash
nano /var/lib/marzban-node/ssl_client_cert.pem
```
 
- سپس مرزبان نود را اجرا کنید.
```bash
docker compose up -d
```


-  به پنل مرزبان بازگردید و بخش‌های مختلف را به صورت زیر تکمیل کنید:

1. در قسمت `Name` یک نام دلخواه برای نود انتخاب کنید.
2. در قسمت `Address` آی‌پی سرور نود را قرار دهید.
3. پورت‌های پیشفرض اتصال نود شامل `Port` و `API Port` را بدون تغییر باقی بگذارید. مقدار پیشفرض به ترتیب `62050` و `62051` است.
4. در قسمت `Usage Ratio` می‌توانید ضریب مصرف نود را تغییر دهید. مقدار پیشفرض `1` است.
5. در صورتی که می‌خواهید آی‌پی سرور نود برای همه اینباندها به عنوان یک هاست اضافه شود، تیک `Add this node as a new host for every inbound` را فعال کنید.

::: tip نکته
شما می‌توانید این تیک را غیرفعال کرده و از سرور نود تنها برای اینباندهای مورد نیاز در بخش `Host Settings` استفاده کنید.
:::

- در نهایت با کلیک بر روی `Add Node` نود را اضافه کنید. حالا مرزبان نود آماده استفاده است. شما می‌توانید با مدیریت هاست‌های خود در بخش `Host Settings` سرور نود را برای اینباندهای مورد نظر به کار بگیرید.

::: warning توجه
در صورتی که در سرور نود فایروال فعال کرده‌اید، لازم است پورت‌های اتصال نود به پنل و همچنین پورت‌های اینباندها را در فایروال سرور نود باز کنید.
:::

## اتصال مرزبان نود به چند پنل

در صورتی که نیاز دارید یک سرور نود را به چند پنل مرزبان متصل کنید، لازم است در فایل `docker-compose.yml` به ازای هر پنل، یک سرویس نود اضافه نمایید. این کار به دو حالت قابل انجام است.

::: tip نکته
شما می‌توانید در هر دو حالت پیکربندی، پورت‌های استفاده شده در نمونه فایل‌های `docker-compose.yml` را مطابق نیاز خود تغییر دهید. همچنین می‌توانید در این فایل به تعداد مورد نیاز، سرویس نود اضافه کنید.
:::

### حالت اول: با استفاده از Host Network

در این حالت شما در اینباندهای خود امکان استفاده از تمامی پورت‌های در دسترس را دارید. توجه داشته باشید که در این حالت تمامی پورت‌های استفاده شده در Xray-Core پنل‌ها، در سرور نود Listen خواهند شد. این بدین معناست که در صورت وجود پورت تکراری در هسته‌ی Xray پنل‌ها، امکان اختلال در اتصال نود و یا کانفیگ‌ها وجود دارد. برای مواجه نشدن با این مشکل می‌توانید در صورت لزوم کانفیگ‌های خود را [تک‌پورت](https://gozargah.github.io/marzban/examples/all-on-one-port#یک-پورت-برای-همه) کنید، و یا از حالت دوم اقدام نمایید.

 - از نمونه زیر برای اضافه کردن دو سرویس نود به فایل `docker-compose.yml` استفاده کنید. 

::: details نمونه پیکربندی فایل `docker-compose.yml`
::: code-group
```yml{11,28} [docker-compose.yml]
services:
  marzban-node-1:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SERVICE_PORT: 2000
      XRAY_API_PORT: 2001
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban


  marzban-node-2:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SERVICE_PORT: 3000
      XRAY_API_PORT: 3001
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
:::

- سپس سرتیفیکیت مورد نیاز را از پنل‌ها دریافت نموده و هر کدام را در مسیری که در نمونه مشخص شده است قرار دهید.
- مرزبان نود را اجرا کنید.
```bash
docker compose up -d
```

- پورت‌های اتصال نود به پنل‌ها و پورت‌های قابل استفاده در اینباندها به شرح زیر خواهد بود:

| متغیر          | پنل اول | پنل دوم |
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | دلخواه  |  دلخواه |

<br>

### حالت دوم: با استفاده از Port Mapping

در این حالت، فقط پورت‌های معین شده قابل استفاده هستند و از وجود پورت‌های تکراری در سرور نود جلوگیری خواهد شد. توجه داشته باشید که شما باید پورت‌های مورد استفاده در اینباندهای خود را در فایل `docker-compose.yml` مانند نمونه قرار دهید.

 - از نمونه زیر برای اضافه کردن دو سرویس نود به فایل `docker-compose.yml` استفاده کنید. 


::: details نمونه پیکربندی فایل `docker-compose.yml`
::: code-group
```yml{7,26} [docker-compose.yml]
services:
  marzban-node-1:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 2000:62050
      - 2001:62051
      - 2053:2053
      - 2054:2054


  marzban-node-2:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 3000:62050
      - 3001:62051
      - 2096:2096
      - 2097:2097
```
:::      

- پس از دریافت سرتیفیکیت‌های مورد نیاز از پنل‌ها و قرار دادن آنها در مسیرهای مشخص شده، مرزبان نود را اجرا کنید.

- پورت‌های اتصال نود به پنل‌ها و پورت‌های قابل استفاده در اینباندها به شرح زیر خواهد بود:


| متغیر          | پنل اول   |  پنل دوم  |
|----------------:|-----------:|---------:|
| `Port`           | 2000      |    3000   |
| `API Port`       | 2001      |    3001   |
| `Inbound Ports` | 2053 <br> 2054 | 2096 <br> 2097 |

::: tip نکته 
اگر در سرور نود قصد استفاده از وارپ دارید و فایل `docker-compose.yml` را با حالت `Port Mapping` پیکربندی کرده‌اید، می‌بایست وارپ را [با هسته `Xray`](https://gozargah.github.io/marzban/examples/warp#قدم-سوم-فعالسازی-warp-روی-مرزبان) فعال کنید. در صورت استفاده از هسته `Wireguard` وارپ در سرور نود کار نخواهد کرد.
:::

## آپدیت مرزبان نود

برای آپدیت مرزبان نود، دستورات زیر را به ترتیب اجرا کنید.

```bash
cd ~/Marzban-node
docker compose pull
docker compose down --remove-orphans; docker compose up -d
```


## نکات تکمیلی

::: tip نکته اول
در صورت اعمال تغییر در فایل `docker-compose.yml` با دستور زیر مرزبان نود را ری‌استارت کنید.
```bash
cd ~/Marzban-node
docker compose down --remove-orphans; docker compose up -d
```

برای مشاهده لاگ‌های مرزبان نود از دستور زیر استفاده کنید.
```bash
cd ~/Marzban-node
docker compose logs -f
```
:::

::: tip نکته دوم
برای تغییر نسخه `Xray-core` مرزبان نود، به آموزش [تغییر ورژن Xray-core](/examples/change-xray-version.md) رجوع کنید.
:::

::: tip نکته سوم
 برای مدیریت بهتر بر دسترسی کاربران به نودهای مختلف، می‌توانید برای هر نود یک اینباند مجزا با `Tag` و `Port` متفاوت در `Core Settings` اضافه کنید و اینباند مد نظر را برای کاربر فعال یا غیرفعال کنید.
:::

::: tip نکته چهارم
چنان‌چه قصد استفاده از کانفیگ‌های TLSدار را دارید، می‌بایست برای دامنه خود در سرور نود سرتیفیکیت گرفته، سپس آن را به سرور اصلی منتقل کنید و مسیر فایل‌های سرتیفیکیت را در اینباند وارد نمایید. همچنین به جای چند سرتیفیکیت برای چند سابدامین، می‌توانید یک سرتیفیکیت `Wildcard` برای دامنه اصلی خود بگیرید تا برای همه سابدامین‌ها مورد استفاده قرار گیرد.
:::



## پیکربندی  


لیست متغیرهای محیطی مرزبان نود را در این قسمت مشاهده می‌کنید. شما می‌توانید تمام این متغیرها در فایل `docker-compose.yml` و یا `.env` مربوط به مرزبان نود مقداردهی کنید.

::: details Environment Variables
### SERVICE_PORT
- مقدار پیش‌فرض: `62050`

پورت سرویس مرزبان نود

### XRAY_API_PORT 
- مقدار پیش‌فرض: `62051`

پورت Xray Api

### XRAY_EXECUTABLE_PATH 
- مقدار پیش‌فرض: `/usr/local/bin/xray`

آدرس فایل اجرایی xray

### XRAY_ASSETS_PATH 
- مقدار پیش‌فرض: `/usr/local/share/xray`

آدرس پوشه فایل های asset برای xray (فایل های `geoip.dat` و `geosite.dat`)

### SSL_CERT_FILE 
- مقدار پیش‌فرض: `/var/lib/marzban-node/ssl_cert.pem`

آدرس فایل certificate گواهی SSL

### SSL_KEY_FILE
- مقدار پیش‌فرض: `/var/lib/marzban-node/ssl_key.pem`

آدرس فایل key گواهی SSL

### SSL_CLIENT_CERT_FILE 

آدرس فایل certificate کاربر 

### DEBUG  
- مقدار پیش‌فرض: `False`

فعالسازی حالت توسعه (development)

### SERVICE_PROTOCOL  
- مقدار پیش‌فرض: `rpyc`

پروتکل سرویس مرزبان نود

:::
