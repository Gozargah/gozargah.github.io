---
title: Настройка MariaDB
---

# Настройка MariaDB

::: tip Замечание
На самом деле база данных MariaDB является форком MySQL и, учитывая, что она меньше нагружает ресурсы сервера, кажется, что она несколько оптимизирована.
:::

::: warning Внимание
MariaDB поддерживается начиная с версии `v0.3.2` и выше.
:::

## Быстрый запуск базы данных MariaDB

- Если вы ещё не установили Marzban, установите его с базой данных `MariaDB` на вашем сервере с помощью следующей команды:
  
  ```bash
  sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
  ```

::: tip Замечание
В процессе установки у вас попросят ввести пароль для базы данных `MariaDB`. Рекомендуется выбрать достаточно надёжный пароль для обеспечения безопасности, или просто нажать Enter, чтобы сгенерировать случайный пароль.
:::

::: tip Замечание
Если вы установите Marzban с базой данных `MariaDB` указанной выше командой, по умолчанию панель управления базой данных `phpMyAdmin` не будет активирована. Поэтому, если вам она нужна, добавьте сервис `phpMyAdmin` в конец файла Docker Marzban согласно приведённым ниже инструкциям.
:::

## Переход на MariaDB (новая установка)

- Если вы установили Marzban с базой данных `SQLite`, с помощью данного руководства вы можете вручную перейти на использование `MariaDB`.

- Необходимо создать сервис для `MariaDB`. Для этого измените файл `docker-compose.yml` следующим образом:

::: code-group
```yml
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
      - --bind-address=127.0.0.1                  # Ограничивает доступ только с localhost для повышения безопасности
      - --character_set_server=utf8mb4            # Устанавливает кодировку UTF-8 для полной поддержки Unicode
      - --collation_server=utf8mb4_unicode_ci     # Задает сопоставление (collation) для Unicode
      - --host-cache-size=0                       # Отключает кэширование хостов для предотвращения DNS-проблем
      - --innodb-open-files=1024                  # Устанавливает ограничение на количество открытых файлов InnoDB
      - --innodb-buffer-pool-size=256M            # Выделяет размер буферного пула для InnoDB
      - --binlog_expire_logs_seconds=1209600      # Устанавливает время жизни бинарного лога на 14 дней (2 недели)
      - --innodb-log-file-size=64M                # Устанавливает размер файла лога InnoDB для балансировки между хранением логов и производительностью
      - --innodb-log-files-in-group=2             # Использует два файла лога для баланса восстановления и дисковой активности
      - --innodb-doublewrite=0                    # Отключает двойную запись (уменьшает дисковую активность, но может увеличить риск потери данных)
      - --general_log=0                           # Отключает общий лог запросов для уменьшения использования дискового пространства
      - --slow_query_log=1                        # Включает лог медленных запросов для выявления проблем с производительностью
      - --slow_query_log_file=/var/lib/mysql/slow.log # Логирует медленные запросы для устранения неполадок
      - --long_query_time=2                       # Устанавливает порог медленного запроса равным 2 секундам
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
Чтобы активировать phpMyAdmin, добавьте его сервис в файл `docker-compose.yml` следующим образом:

::: code-group
```yml
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
      - --bind-address=127.0.0.1                  # Ограничивает доступ только с localhost для повышения безопасности
      - --character_set_server=utf8mb4            # Устанавливает кодировку UTF-8 для полной поддержки Unicode
      - --collation_server=utf8mb4_unicode_ci     # Задает сопоставление (collation) для Unicode
      - --host-cache-size=0                       # Отключает кэширование хостов для предотвращения DNS-проблем
      - --innodb-open-files=1024                  # Устанавливает ограничение на количество открытых файлов InnoDB
      - --innodb-buffer-pool-size=256M            # Выделяет размер буферного пула для InnoDB
      - --binlog_expire_logs_seconds=1209600      # Устанавливает время жизни бинарного лога на 14 дней (2 недели)
      - --innodb-log-file-size=64M                # Устанавливает размер файла лога InnoDB для балансировки между хранением логов и производительностью
      - --innodb-log-files-in-group=2             # Использует два файла лога для баланса восстановления и дисковой активности
      - --innodb-doublewrite=0                    # Отключает двойную запись (уменьшает дисковую активность, но может увеличить риск потери данных)
      - --general_log=0                           # Отключает общий лог запросов для уменьшения использования дискового пространства
      - --slow_query_log=1                        # Включает лог медленных запросов для выявления проблем с производительностью
      - --slow_query_log_file=/var/lib/mysql/slow.log # Логирует медленные запросы для устранения неполадок
      - --long_query_time=2                       # Устанавливает порог медленного запроса равным 2 секундам
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
::: 

С этим сервисом phpMyAdmin будет доступен на порту 8010 вашего сервера.

Имя пользователя для входа будет **root**, а пароль вы зададите позже согласно инструкциям.
  
- Задайте следующие переменные в файле `.env`.

Замените `DB_PASSWORD` на желаемый пароль для базы данных.

::: warning Внимание
- Переменная `DB_PASSWORD` должна быть одинаковой в обоих случаях.
- Для переменной `STRONG_PASSWORD` выберите другой, более надёжный пароль.
- Следующие переменные используются в сервисе MariaDB и отсутствуют в стандартных переменных Marzban, поэтому вам необходимо добавить их в файл `.env`.
:::

```env
SQLALCHEMY_DATABASE_URL="mysql+pymysql://marzban:DB_PASSWORD@127.0.0.1:3306/marzban"
MYSQL_ROOT_PASSWORD=STRONG_PASSWORD
MYSQL_DATABASE=marzban
MYSQL_USER=marzban
MYSQL_PASSWORD=DB_PASSWORD
```

- Затем закомментируйте (добавив `#` в начало строки) следующий код, относящийся к базе данных `SQLite`:

```
# SQLALCHEMY_DATABASE_URL = "sqlite:////var/lib/marzban/db.sqlite3"
```

- Перезапустите Marzban:

```bash
marzban restart
```

С этого момента данные Marzban будут сохраняться в MariaDB (в каталоге `/var/lib/marzban/mysql`).

## Миграция на MariaDB (перенос данных)

::: warning Внимание
Эта операция может занять некоторое время, поэтому заранее примите необходимые меры предосторожности.
:::

Для переноса данных и перехода базы данных Marzban с SQLite на MariaDB выполните следующие шаги:

- Выполните шаги, описанные в разделе [Переход на MariaDB (новая установка)](mariadb.md#تغییر-دیتابیس-به-mariadb-نصب-تازه).

- После перезапуска Marzban выполните следующую команду для создания дампа предыдущей базы данных:

```bash
sqlite3 /var/lib/marzban/db.sqlite3 '.dump --data-only' | sed "s/INSERT INTO \([^ ]*\)/REPLACE INTO \`\\1\`/g" > /tmp/dump.sql
```

- Перейдите в каталог `/opt/marzban`:

```bash
cd /opt/marzban
```

- Выполните следующую команду, чтобы скопировать файл `dump.sql` в контейнер MariaDB:

```bash
docker compose cp /tmp/dump.sql mariadb:/dump.sql
```

- Выполните следующую команду для переноса данных в MariaDB:

::: tip Руководство
На этом этапе вам потребуется ввести пароль базы данных, который вы ранее установили вместо `STRONG_PASSWORD`.
:::
```bash
docker compose exec mariadb mysql -u root -p -h 127.0.0.1 marzban -e "SET FOREIGN_KEY_CHECKS = 0; SET NAMES utf8mb4; SOURCE dump.sql;"
```

- Удалите файл `/tmp/dump.sql`:

```bash
rm /tmp/dump.sql
```

- Перезапустите Marzban:

```bash
marzban restart
```

Теперь данные из вашей предыдущей базы данных перенесены в MariaDB.

::: tip Замечание
Возможно, после перезапуска Marzban процесс миграции не завершится полностью. Вместо простого перезапуска вы можете выполнить остановку и запуск Marzban следующей командой:
```bash
marzban down && marzban up
```
:::

::: tip Замечание
Если вы используете [скрипт резервного копирования](https://gozargah.github.io/marzban/fa/examples/backup), после миграции на `MariaDB` необходимо снова запустить скрипт резервного копирования, иначе резервная копия базы данных MariaDB не будет создана.
:::

## Дополнительные замечания

::: tip Замечание
Дополнительные советы по работе с панелью управления базой данных `phpMyAdmin`, а также по устранению ошибок, описанных в документации [Запуск MySQL](https://gozargah.github.io/marzban/fa/examples/mysql), применимы и для базы данных MariaDB.
:::
