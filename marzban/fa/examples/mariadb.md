---
title: راه‌اندازی MariaDB
---

# راه‌اندازی MariaDB

::: tip نکته
در واقع دیتابیس MariaDB یک فورک از دیتابیس MySQL است و با توجه به اینکه منابع سرور را کمتر درگیر می‌کند به نظر میرسد تا حدودی بهینه‌تر است.
:::

::: warning توجه
MariaDB در نسخه `v0.3.2` و بالاتر پشتیبانی می‌شود.
:::

## راه‌اندازی سریع دیتابیس MariaDB

- اگر هنوز مرزبان را نصب نکرده‌اید، با دستور زیر مرزبان را با دیتابیس `MariaDB` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
```

::: tip نکته
رمز برای دیتابیس `MariaDB` در حین راه‌اندازی از شما پرسیده خواهد شد، پیشنهاد می‌شود برای حفظ امنیت دیتابیس خود رمز نسبتا قوی انتخاب کنید، همچنین می‌توانید اینتر را بزنید تا یک رمز بصورت رندوم تعیین شود.
:::

::: tip نکته
اگر با دستور بالا مرزبان را با دیتابیس `MariaDB` راه‌اندازی کنید، بصورت پیش‌فرض پنل مدیریت دیتابیس `phpMyAdmin` فعال نشده است، از این رو اگر به آن احتیاج دارید طبق توضیحات زیر فقط سرویس `phpMyAdmin` را به انتهای فایل داکر مرزبان اضافه کنید.
:::


## تغییر دیتابیس به MariaDB (نصب تازه)

- اگر مرزبان را با دیتابیس `SQLite` نصب کرده‌اید با کمک این آموزش می‌توانید دیتابیس‌ را بصورت دستی به `MariaDB` تغییر دهید.

- باید یک سرویس برای `MariaDB` ایجاد کنید. برای این کار، فایل `docker-compose.yml` به شکل زیر تغییر دهید.

::: code-group
```yml{10-12,14-48} [docker-compose.yml]
services:
  marzban:
    image: gozargah/marzban:latest
    restart: always
    env_file: .env
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
      - /var/lib/marzban/logs:/var/lib/marzban-node
    depends_on:
      mariadb:
        condition: service_healthy

  mariadb:
    image: mariadb:lts
    env_file: .env
    network_mode: host
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_ROOT_HOST: '%'
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    command:
      - --bind-address=127.0.0.1                  # Restricts access to localhost for increased security
      - --character_set_server=utf8mb4            # Sets UTF-8 character set for full Unicode support
      - --collation_server=utf8mb4_unicode_ci     # Defines collation for Unicode
      - --host-cache-size=0                       # Disables host cache to prevent DNS issues
      - --innodb-open-files=1024                  # Sets the limit for InnoDB open files
      - --innodb-buffer-pool-size=256M            # Allocates buffer pool size for InnoDB
      - --binlog_expire_logs_seconds=1209600      # Sets binary log expiration to 14 days (2 weeks)
      - --innodb-log-file-size=64M                # Sets InnoDB log file size to balance log retention and performance
      - --innodb-log-files-in-group=2             # Uses two log files to balance recovery and disk I/O
      - --innodb-doublewrite=0                    # Disables doublewrite buffer (reduces disk I/O; may increase data loss risk)
      - --general_log=0                           # Disables general query log to reduce disk usage
      - --slow_query_log=1                        # Enables slow query log for identifying performance issues
      - --slow_query_log_file=/var/lib/mysql/slow.log # Logs slow queries for troubleshooting
      - --long_query_time=2                       # Defines slow query threshold as 2 seconds
    volumes:
      - /var/lib/mysql/marzban:/var/lib/mysql
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      start_period: 10s
      start_interval: 3s
      interval: 10s
      timeout: 5s
      retries: 3
```
:::

::: details فعال‌سازی phpMyAdmin
برای فعال کردن phpMyAdmin، سرویس آن را مانند زیر به فایل `docker-compose.yml` اضافه کنید.

::: code-group
```yml{50-60} [docker-compose.yml]
services:
  marzban:
    image: gozargah/marzban:latest
    restart: always
    env_file: .env
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
      - /var/lib/marzban/logs:/var/lib/marzban-node
    depends_on:
      mariadb:
        condition: service_healthy

  mariadb:
    image: mariadb:lts
    env_file: .env
    network_mode: host
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_ROOT_HOST: '%'
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    command:
      - --bind-address=127.0.0.1                  # Restricts access to localhost for increased security
      - --character_set_server=utf8mb4            # Sets UTF-8 character set for full Unicode support
      - --collation_server=utf8mb4_unicode_ci     # Defines collation for Unicode
      - --host-cache-size=0                       # Disables host cache to prevent DNS issues
      - --innodb-open-files=1024                  # Sets the limit for InnoDB open files
      - --innodb-buffer-pool-size=256M            # Allocates buffer pool size for InnoDB
      - --binlog_expire_logs_seconds=1209600      # Sets binary log expiration to 14 days (2 weeks)
      - --innodb-log-file-size=64M                # Sets InnoDB log file size to balance log retention and performance
      - --innodb-log-files-in-group=2             # Uses two log files to balance recovery and disk I/O
      - --innodb-doublewrite=0                    # Disables doublewrite buffer (reduces disk I/O; may increase data loss risk)
      - --general_log=0                           # Disables general query log to reduce disk usage
      - --slow_query_log=1                        # Enables slow query log for identifying performance issues
      - --slow_query_log_file=/var/lib/mysql/slow.log # Logs slow queries for troubleshooting
      - --long_query_time=2                       # Defines slow query threshold as 2 seconds
    volumes:
      - /var/lib/mysql/marzban:/var/lib/mysql
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      start_period: 10s
      start_interval: 3s
      interval: 10s
      timeout: 5s
      retries: 3

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
      - mariadb
```

با این سرویس، phpMyAdmin روی پورت 8010 سرور شما در دسترس خواهد بود.

نام کاربری ورود، root خواهد بود. password را در ادامه آموزش شما تعیین خواهید کرد.
:::

- متغیر های زیر را در فایل `.env` مقداردهی کنید.

`DB_PASSWORD` را به پسورد دلخواه خود برای دیتابیس تغییر دهید.

::: warning توجه
- ‍‍`DB_PASSWORD` در هر دو متغییر باید به یک مقدار یکسان تغییر کند.
- `STRONG_PASSWORD` را یک رمز متفاوت تعیین کنید.
- متغیرهای زیر در سرویس MariaDB استفاده می‌شود و در متغیر های پیش‌فرض مرزبان وجود ندارد، در نتیجه خودتان باید آن‌ها را به فایل `.env‍` اضافه کنید.
:::

```env
SQLALCHEMY_DATABASE_URL="mysql+pymysql://marzban:DB_PASSWORD@127.0.0.1:3306/marzban"
MYSQL_ROOT_PASSWORD=STRONG_PASSWORD
MYSQL_DATABASE=marzban
MYSQL_USER=marzban
MYSQL_PASSWORD=DB_PASSWORD
```
- بعد کد زیر رو که مربوط به دیتابیس `SQLite` هست رو با اضافه کردن `#` به اول آن کامنت کنید.
```
# SQLALCHEMY_DATABASE_URL = "sqlite:////var/lib/marzban/db.sqlite3"
```

- مرزبان را ری‌استارت کنید.

```bash
marzban restart
```

از این پس، اطلاعات مرزبان در MariaDB (در مسیر `/var/lib/mysql/marzban`) ذخیره خواهد شد.


## مهاجرت به MariaDB (انتقال اطلاعات)

::: warning توجه
این عملیات ممکن است کمی طول بکشد، در نتیجه از قبل هاهنگی های لازم را انجام دهید.
:::

برای انتقال اطلاعات و تغییر دیتابیس مرزبان از SQLite به MariaDB باید مراحل زیر را انجام دهید.

‍- مراحل ذکر شده [تغییر دیتابیس به MariaDB](mariadb.md#تغییر-دیتابیس-به-mariadb-نصب-تازه) را انجام دهید.

- پس از ری‌استارت شدن مرزبان، دستور زیر را اجرا کنید تا از دیتابیس قبلی خروجی بسازید.

``` bash
sqlite3 /var/lib/marzban/db.sqlite3 '.dump --data-only' | sed "s/INSERT INTO \([^ ]*\)/REPLACE INTO \`\\1\`/g" > /tmp/dump.sql
```

- وارد دایرکتوری `/opt/marzban` شوید.

``` bash
cd /opt/marzban
```

- دستور زیر را اجرا کنید تا یک کپی از فایل `dump.sql` در کانتینر MariaDB ایجاد کنید.

``` bash
docker compose cp /tmp/dump.sql mariadb:/dump.sql
```

- دستور زیر را اجرا کنید تا اطلاعات را به MariaDB انتقال دهید.

::: tip راهنما
در این مرحله شما نیاز دارید تا password دیتابیس که قبل‌تر به جای `STRONG_PASSWORD` قرار داده‌اید را وارد کنید.
:::
``` bash
docker compose exec mariadb mysql -u root -p -h 127.0.0.1 marzban -e "SET FOREIGN_KEY_CHECKS = 0; SET NAMES utf8mb4; SOURCE dump.sql;"
```

- فایل `/tmp/dump.sql` را پاک کنید.

``` bash
rm /tmp/dump.sql
```

- مرزبان را ری‌استارت کنید.

``` bash
marzban restart
```

حالا اطلاعات دیتابیس قبلی شما به MariaDB انتقال داده شده است.

::: tip نکته
ممکن است پس از ری‌استارت کردن مرزبان فرآیند مایگریشن کامل انجام نشده باشد، می‌توانید به جای ری‌استارت کردن، مرزبان را با دستور زیر خاموش و روشن کنید.
```bash
marzban down && marzban up
```
:::

::: tip نکته
اگر از [اسکریپت بک‌آپ](https://gozargah.github.io/marzban/fa/examples/backup) استفاده می‌کنید، لازم هست پس مهاجرت به `MariaDB` اسکریپت بک‌آپ را مجدد اجرا کنید، در غیر این صورت بک‌آپ دیتابیس `MariaDB` را در فایل بک‌آپ نخواهید داشت.
:::



## نکات تکمیلی

::: tip نکته
سایر نکات در خصوص پنل مدیریت دیتابیس `phpMyAdmin` و همچنین رفع ارورها در داکیومنت [راه‌اندازی MySQL](https://gozargah.github.io/marzban/fa/examples/mysql) وجود دارند و مراحل‌ کاملا مشابه با دیتابیس `MariaDB` می‌باشد.
:::
