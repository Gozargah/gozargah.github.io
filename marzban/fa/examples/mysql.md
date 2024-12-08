---
title: راه‌اندازی MySQL
---

# راه‌اندازی MySQL
به کمک این آموزش، شما می‌توانید دیتابیس پیشفرض مرزبان (SQLite) را به MySQL تغییر دهید.

- همچنین اگر هنوز مرزبان را نصب نکرده‌اید، می‌توانید با آموزش بخش اول مرزبان را از ابتدا با دیتابیس MySQL راه‌اندازی کنید.

::: warning توجه
MySQL در نسخه `v0.3.2` و بالاتر پشتیبانی می‌شود.
:::

::: tip نکته
در تمام آموزش های پایین، فایل‌ های `docker-compose.yml` و `.env` در مسیر `/opt/marzban‍‍‍` و `xray_config.json` در مسیر `/var/lib/marzban` ‌می‌توانید پیدا کنید.

در صورتی که مرزبان را به صورت دستی نصب کرده‌اید، باید تغییرات مورد نیاز را شخصاً انجام دهید.
:::


## راه‌اندازی سریع دیتابیس MySQL

- اگر هنوز مرزبان را نصب نکرده‌اید، با دستور زیر می‌توانید مرزبان را از ابتدا با دیتابیس `MySQL` راه‌اندازی کنید.

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql
```

::: tip نکته
رمز برای دیتابیس `MySQL` در حین راه‌اندازی از شما پرسیده خواهد شد، پیشنهاد می‌شود برای حفظ امنیت دیتابیس خود رمز نسبتا قوی انتخاب کنید، همچنین می‌توانید اینتر را بزنید تا یک رمز بصورت رندوم تعیین شود.
:::

::: tip نکته
اگر با دستور بالا مرزبان را با دیتابیس `MySQL` راه‌اندازی کنید، بصورت پیش‌فرض پنل مدیریت دیتابیس `phpMyAdmin` فعال نشده است، از این رو اگر به آن احتیاج دارید طبق توضیحات زیر فقط سرویس `phpMyAdmin` را به انتهای فایل داکر مرزبان اضافه کنید.
:::

## تغییر دیتابیس به MySQL (نصب تازه)

- باید یک سرویس برای MySQL ایجاد کنید. برای این کار، فایل `docker-compose.yml` به شکل زیر تغییر دهید.

::: code-group
```yml{9-10,12-21} [docker-compose.yml]
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

::: tip نکته
ممکن است پس از ری‌استارت کردن مرزبان فرآیند مایگریشن کامل انجام نشده باشد، می‌توانید به جای ری‌استارت کردن، مرزبان را با دستور زیر خاموش و روشن کنید.
```bash
marzban down && marzban up
```
:::

::: tip نکته
اگر از [اسکریپت بک‌آپ](https://gozargah.github.io/marzban/fa/examples/backup) استفاده می‌کنید، لازم هست پس مهاجرت به `MySQL` اسکریپت بک‌آپ را مجدد اجرا کنید، در غیر این صورت بک‌آپ دیتابیس `MySQL` را در فایل بک‌آپ نخواهید داشت.
:::

## تغییر رمز phpMyAdmin

`1` ابتدا به پنل مدیریت دیتابیس خودتون که بصورت پیش فرض روی پورت `8010` ران شده لاگین کنید.

`2` قسمت `User accounts` را بزنید.

`3` سپس در دو قسمتی که مربوط به `root` هستند روی `Edit Privileges` بزنید، دقت کنید که این فرایند که در مراحل بعد نیز توضیح داده می‌شود را باید برای هر دو قسمت انجام دهید.

`4` سپس روی قسمت `Change password` بزنید.

`5` در نهایت رمز جدید خودتون رو در دو باکس `Enter` و `Re-type` بزنید بعد دکمه `Go` را بزنید.

`6` پس از انجام مراحل بالا رمز جدید را در فایل `env` در دو متغیر مربوط به دیتابیس `MySQL` جایگزین کنین و بعد حتما مرزبان را ری‌استارت کنید.

::: tip نکته
اگر از [اسکریپت بک‌آپ](https://gozargah.github.io/marzban/fa/examples/backup) استفاده می‌کنید بعد از تغییر رمز دیتابیس `MySQL` لازم هست که اسکریپت رو مجدد اجرا کنید در غیر این صورت فرایند بکاپ گرفتن به علت تغییر رمز انجام نخواهد شد.
:::

::: tip نکته
پیشنهاد می‌شود پورت پیش‌فرض پنل مدیریت دیتابیس `phpMyAdmin` را به پورت دیگری تغییر دهید تا یک قدم در جهت حفظ امنیت دیتابیس خود بردارید.
:::

## راه‌اندازی phpMyAdmin برای سرورهای ARM

- اگر معماری `CPU` سرور شما `ARM` باشد که شامل `arm64` یا `aarch64` است، و سرویس `phpMyAdmin` را با نمونه بالا فعال سازی کردین، در لاگ های مرزبان که با دستور `marzban logs` قابل مشاهده است ارورهایی را خواهید دید که مربوط به ساپورت نشدن `phpMyAdmin` برای `CPU` سرور شماست. همچنین اگر دستور `marzban status` را بزنید، سرویس `phpMyAdmin` در حالت `restarting` قرار دارد. 

- برای اطمینان کامل از نوع معماری `CPU` سرور می توانید با اسکریپت زیر یک نمای کلی از مشخصات سرور خودتان را مشاهده کنید که جلوی بخش `Arch` نوع `CPU` قابل مشاهده است.

```bash
wget -qO- bench.sh | bash
```

- از این رو، باید سرویس `phpMyAdmin` را در فایل `docker-compose.yml` مانند زیر قرار دهید که در آن از ایمیج متفاوت استفاده شده است.

```yml{24} [docker-compose.yml]
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
    image: arm64v8/phpmyadmin:latest
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

- در نهایت مرزبان را با دستور زیر ریستارت کنید تا ایمیج ذکر شده `Pull` شود.
```bash
marzban restart
```
حالا اگر دستور زیر را وارد کنید سرویس `phpMyAdmin` باید در حالت `running` قرار داشته باشد.
```bash
marzban status
```

## راه‌اندازی phpMyAdmin به صورت HTTPS

- ابتدا با دستور زیر هاپروکسی را روی سرور خود نصب کنید.
```bash
apt update
apt install -y haproxy
```

::: details پیکربندی HAProxy
این پیکر بندی را به انتهای فایل هاپروکسی که در `/etc/haproxy/haproxy.cfg` قرار دارد اضافه کنید.

```cfg
frontend https_front
    bind *:8010 ssl crt /etc/ssl/certs/haproxy.pem
    default_backend https_back

backend https_back
    server phpmyadmin 127.0.0.1:80 check
```
:::

- هاپروکسی را ری‌استارت کنید.
```bash
sudo service haproxy restart
```

- سپس با دستور زیر فایل `Cert` و `Key` سرتیفیکت دامنه خود را تبدیل به یک فایل کنید.

```bash
cat /your-cert-path/fullchain.pem /your-key-path/key.pem > /etc/ssl/certs/haproxy.pem
```

- سپس بخش مربوط به سرویس `phpMyAdmin` را مطابق پیکربندی زیر قرار دهید.
::: details پیکربندی داکر

::: code-group
```yml{28-34} [docker-compose.yml]
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
      UPLOAD_LIMIT: 1024M
    depends_on:
      - mysql
    ports:
      - "8010:80"
```
:::

- مرزبان را ری‌استارت کنید.
```bash
marzban restart
```

::: tip نکته
پورت `80` روی سرور مستر شما نباید توسط سرویس دیگری درگیر باشد.
:::

## رفع ارور موقع خروجی گرفتن از دیتابیس SQLite

اگر موقع مهاجرت به MySQL برای خروجی گرفتن از دیتابیس قبلی با ارور زیر مواجه شدید:

`Unknown option "--data-only" on ".dump"`

به این معناست که نسخه قدیمی از `sqlite` روی سرور شما نصب است. برای حل این مشکل باید از راه دیگری ورژن بالاتری از `sqlite` را نصب کنیم.

- دستور اول
```bash
sudo apt update && sudo apt upgrade -y
```
- دستور دوم
```bash
sudo apt-get install build-essential
```
- دستور سوم
```bash
wget https://www.sqlite.org/2023/sqlite-autoconf-3430200.tar.gz
```
- دستور چهارم
```bash
tar -xvf sqlite-autoconf-3430200.tar.gz && cd sqlite-autoconf-3430200
```
- پیکربندی و کامپایل سورس کد (این مرحله ممکن است 3 الی 4 دقیقه طول بکشد)
```bash
./configure
```
```bash
make
```
- حذف نسخه قدیمی `SQLite`
```bash
sudo apt-get purge sqlite3
```
- نصب نسخه جدید
```bash
sudo make install
```
- به‌روزرسانی متغیر `PATH`
```bash
export PATH="/usr/local/bin:$PATH"
```
- بررسی نسخه نصب شده
```bash
sqlite3 --version
```
اگر همه چیز را درست انجام داده باشید، نسخه جدید باید `3.43.2` باشد.
- اضافه کردن متغیر `PATH` به فایل `bashrc` برای ماندگاری

فایل `~/.bashrc` را با `nano` باز کنید.
```bash
nano ~/.bashrc
```
- سپس خط زیر را به انتهای فایل اضافه کنید.
```bash
export PATH="/usr/local/bin:$PATH"
```
- اعمال تغییرات فایل `bashrc`
```bash
source ~/.bashrc
```
- حالا مجدد خروجی بگیرید و ادامه مراحل آموزش مهاجرت به MySQL را انجام دهید.
