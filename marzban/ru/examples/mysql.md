---
title: راه‌اندازی MySQL
---

# راه‌اندازی MySQL
به کمک این آموزش، شما می‌توانید دیتابیس پیشفرض مرزبان (SQLite) را به MySQL تغییر دهید.

::: warning توجه
MySQL در نسخه `v0.3.2` و بالاتر پشتیبانی می‌شود.
:::

::: tip نکته
در تمام آموزش های پایین، فایل‌ های `docker-compose.yml` و `.env` در مسیر `/opt/marzban‍‍‍` و `xray_config.json` در مسیر `/var/lib/marzban` ‌می‌توانید پیدا کنید.

در صورتی که مرزبان را به صورت دستی نصب کرده‌اید، باید تغییرات مورد نیاز را شخصاً انجام دهید.
:::


## تغییر دیتابیس به MySQL (نصب تازه)

- باید یک سرویس برای MySQL ایجاد کنید. برای این کار، فایل `docker-compose.yml` به شکل زیر تغییر دهید.

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
      - mysql

  mysql:
    image: mysql:latest
    restart: always
    env_file: .env
    network_mode: host
    environment:
      MYSQL_DATABASE: marzban
    volumes:
      - /var/lib/marzban/mysql:/var/lib/mysql
```
:::

::: details فعال‌سازی phpMyAdmin
برای فعال کردن phpMyAdmin، سرویس آن را مانند زیر به فایل `docker-compose.yml` اضافه کنید.

::: code-group
```yml{22-31} [docker-compose.yml]
services:
  marzban:
    image: gozargah/marzban:latest
    restart: always
    env_file: .env
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
    depends_on:
      - mysql

  mysql:
    image: mysql:latest
    restart: always
    env_file: .env
    network_mode: host
    command: --bind-address=127.0.0.1 --mysqlx-bind-address=127.0.0.1 --disable-log-bin
    environment:
      MYSQL_DATABASE: marzban
    volumes:
      - /var/lib/marzban/mysql:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin/phpmyadmin:latest
    restart: always
    env_file: .env
    network_mode: host
    environment:
      PMA_HOST: 127.0.0.1
      APACHE_PORT: 8010
      UPLOAD_LIMIT: 1024M
    depends_on:
      - mysql
```

با این سرویس، phpMyAdmin روی پورت 8010 سرور شما در دسترس خواهد بود.

نام کاربری ورود، root خواهد بود. password را در ادامه آموزش شما تعیین خواهید کرد.
:::

- متغیر های زیر را در فایل `.env` مقداردهی کنید.

`DB_PASSWORD` را به پسورد دلخواه خود برای دیتابیس تغییر دهید.

::: warning توجه
- ‍‍`DB_PASSWORD` در هر دو متغییر باید به یک مقدار یکسان تغییر کند.
- متغیر ‍`MYSQL_ROOT_PASSWORD‍` در سرویس MySQL استفاده می‌شود و در متغیر های پیش‌فرض مرزبان وجود ندارد، در نتیجه خودتان باید آن را به فایل `.env‍` اضافه کنید.
:::

```env
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:DB_PASSWORD@127.0.0.1/marzban"
MYSQL_ROOT_PASSWORD = DB_PASSWORD
```
- بعد کد زیر رو که مربوط به دیتابیس sqlite هست رو با اضافه کردن # به اول آن کامنت کنین.
```
#SQLALCHEMY_DATABASE_URL = "sqlite:////var/lib/marzban/db.sqlite3"
```

- مرزبان را ری‌استارت کنید.

```bash
marzban restart
```

از این پس، اطلاعات مرزبان در MySQL (در مسیر `/var/lib/marzban/mysql`) ذخیره خواهد شد.


## مهاجرت به MySQL (انتقال اطلاعات)

::: warning توجه
این عملیات ممکن است کمی طول بکشد، در نتیجه از قبل هاهنگی های لازم را انجام دهید.
:::

برای انتقال اطلاعات و تغییر دیتابیس مرزبان از SQLite به MySQL باید مراحل زیر را انجام دهید.

‍- مراحل ذکر شده [تغییر دیتابیس به MySQL](mysql.md#تغییر-دیتابیس-به-mysql-نصب-تازه) را انجام دهید.

- پس از ری‌استارت شدن مرزبان، دستور زیر را اجرا کنید تا از دیتابیس قبلی خروجی بسازید.

``` bash
sqlite3 /var/lib/marzban/db.sqlite3 '.dump --data-only' | sed "s/INSERT INTO \([^ ]*\)/REPLACE INTO \`\\1\`/g" > /tmp/dump.sql
```

- وارد دایرکتوری `/opt/marzban` شوید.

``` bash
cd /opt/marzban
```

- دستور زیر را اجرا کنید تا یک کپی از فایل `dump.sql` در کانتینر MySQL ایجاد کنید.

``` bash
docker compose cp /tmp/dump.sql mysql:/dump.sql
```

- دستور زیر را اجرا کنید تا اطلاعات را به MySQL انتقال دهید.

::: tip راهنما
در این مرحله شما نیاز دارید تا password دیتابیس که قبل‌تر به جای `DB_PASSWORD` قرار داده‌اید را وارد کنید.
:::
``` bash
docker compose exec mysql mysql -u root -p -h 127.0.0.1 marzban -e "SET FOREIGN_KEY_CHECKS = 0; SET NAMES utf8mb4; SOURCE dump.sql;"
```

- فایل `/tmp/dump.sql` را پاک کنید.

``` bash
rm /tmp/dump.sql
```

- مرزبان را ری‌استارت کنید.

``` bash
marzban restart
```

حالا اطلاعات دیتابیس قبلی شما به MySQL انتقال داده شده است.
