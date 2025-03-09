---
title: Настройка MariaDB
---

# Настройка MariaDB

::: tip Примечание
База данных MariaDB является форком базы данных MySQL, и поскольку она меньше нагружает ресурсы сервера, она кажется более оптимизированной.
:::

::: warning Внимание
MariaDB поддерживается в версии `v0.3.2` и выше.
:::

## Быстрая настройка базы данных MariaDB

- Если вы еще не установили Marzban, установите его с базой данных `MariaDB` на вашем сервере с помощью следующей команды.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
```

::: tip Примечание
Во время установки вас попросят ввести пароль для базы данных `MariaDB`. Для обеспечения безопасности вашей базы данных рекомендуется выбрать достаточно сложный пароль. Вы также можете нажать Enter, чтобы был сгенерирован случайный пароль.
:::

::: tip Примечание
Если вы настраиваете Marzban с базой данных `MariaDB` с помощью приведенной выше команды, панель управления базой данных `phpMyAdmin` по умолчанию не активирована. Если она вам нужна, добавьте сервис `phpMyAdmin` в конец файла docker-compose Marzban, как описано ниже.
:::


## Изменение базы данных на MariaDB (новая установка)

- Если вы установили Marzban с базой данных `SQLite`, с помощью этой инструкции вы можете вручную изменить базу данных на `MariaDB`.

- Вам нужно создать сервис для `MariaDB`. Для этого измените файл `docker-compose.yml` следующим образом.

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
      - /var/lib/marzban/mysql:/var/lib/mysql
    healthcheck:
      test: ["CMD", "healthcheck.sh", "--connect", "--innodb_initialized"]
      start_period: 10s
      start_interval: 3s
      interval: 10s
      timeout: 5s
      retries: 3
```
:::

::: details Активация phpMyAdmin
Для активации phpMyAdmin добавьте его сервис в файл `docker-compose.yml`, как показано ниже.

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
      - /var/lib/marzban/mysql:/var/lib/mysql
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

С этим сервисом phpMyAdmin будет доступен на порту 8010 вашего сервера.

Имя пользователя для входа будет root. Пароль вы определите далее в инструкции.
:::

- Установите следующие переменные в файле `.env`.

Измените `DB_PASSWORD` на желаемый пароль для базы данных.

::: warning Внимание
- ‍‍`DB_PASSWORD` должен быть одинаковым в обеих переменных.
- Для `STRONG_PASSWORD` установите другой пароль.
- Следующие переменные используются в сервисе MariaDB и не существуют в переменных Marzban по умолчанию, поэтому вам нужно добавить их в файл `.env‍` самостоятельно.
:::

```env
SQLALCHEMY_DATABASE_URL="mysql+pymysql://marzban:DB_PASSWORD@127.0.0.1:3306/marzban"
MYSQL_ROOT_PASSWORD=STRONG_PASSWORD
MYSQL_DATABASE=marzban
MYSQL_USER=marzban
MYSQL_PASSWORD=DB_PASSWORD
```
- Затем закомментируйте следующий код, относящийся к базе данных `SQLite`, добавив `#` в начало строки.
```
# SQLALCHEMY_DATABASE_URL = "sqlite:////var/lib/marzban/db.sqlite3"
```

- Перезапустите Marzban.

```bash
marzban restart
```

Теперь информация Marzban будет храниться в MariaDB (в директории `/var/lib/marzban/mysql`).


## Миграция на MariaDB (перенос данных)

::: warning Внимание
Эта операция может занять некоторое время, поэтому заранее сделайте необходимые приготовления.
:::

Для переноса данных и изменения базы данных Marzban с SQLite на MariaDB выполните следующие шаги.

‍- Выполните шаги, указанные в разделе [Изменение базы данных на MariaDB](mariadb.md#изменение-базы-данных-на-mariadb-новая-установка).

- После перезапуска Marzban выполните следующую команду для создания дампа из предыдущей базы данных.

``` bash
sqlite3 /var/lib/marzban/db.sqlite3 '.dump --data-only' | sed "s/INSERT INTO \([^ ]*\)/REPLACE INTO \`\\1\`/g" > /tmp/dump.sql
```

- Перейдите в директорию `/opt/marzban`.

``` bash
cd /opt/marzban
```

- Выполните следующую команду для создания копии файла `dump.sql` в контейнере MariaDB.

``` bash
docker compose cp /tmp/dump.sql mariadb:/dump.sql
```

- Выполните следующую команду для переноса данных в MariaDB.

::: tip Руководство
На этом этапе вам нужно ввести пароль базы данных, который вы ранее установили вместо `STRONG_PASSWORD`.
:::
``` bash
docker compose exec mariadb mysql -u root -p -h 127.0.0.1 marzban -e "SET FOREIGN_KEY_CHECKS = 0; SET NAMES utf8mb4; SOURCE dump.sql;"
```

- Удалите файл `/tmp/dump.sql`.

``` bash
rm /tmp/dump.sql
```

- Перезапустите Marzban.

``` bash
marzban restart
```

Теперь данные из вашей предыдущей базы данных перенесены в MariaDB.

::: tip Примечание
Возможно, после перезапуска Marzban процесс миграции не был полностью завершен. Вместо перезапуска вы можете выключить и включить Marzban с помощью следующей команды.
```bash
marzban down && marzban up
```
:::

::: tip Примечание
Другие важные моменты, связанные с панелью управления базой данных `phpMyAdmin` и устранением ошибок в документации [Настройка MySQL](https://gozargah.github.io/marzban/ru/examples/mysql) также присутствуют и полностью совпадают с базой данных `MariaDB`.
:::
