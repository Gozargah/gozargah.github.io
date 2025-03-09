---
title: Настройка MySQL
---

# Настройка MySQL
С помощью этой инструкции вы можете изменить базу данных Marzban по умолчанию (SQLite) на MySQL.

- Также, если вы еще не установили Marzban, вы можете следовать инструкциям в первом разделе, чтобы установить Marzban с базой данных MySQL с самого начала.

::: warning Внимание
MySQL поддерживается в версии `v0.3.2` и выше.
:::

::: tip Примечание
Во всех примерах ниже файлы `docker-compose.yml` и `.env` находятся в директории `/opt/marzban‍‍‍`, а `xray_config.json` в директории `/var/lib/marzban`.

Если вы установили Marzban вручную, вам нужно будет внести необходимые изменения самостоятельно.
:::


## Быстрая настройка базы данных MySQL

- Если вы еще не установили Marzban, вы можете установить его с базой данных `MySQL` с самого начала с помощью следующей команды.

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql
```

::: tip Примечание
Во время установки вас попросят ввести пароль для базы данных `MySQL`. Для обеспечения безопасности вашей базы данных рекомендуется выбрать достаточно сложный пароль. Вы также можете нажать Enter, чтобы был сгенерирован случайный пароль.
:::

::: tip Примечание
Если вы настраиваете Marzban с базой данных `MySQL` с помощью приведенной выше команды, панель управления базой данных `phpMyAdmin` по умолчанию не активирована. Если она вам нужна, добавьте сервис `phpMyAdmin` в конец файла docker-compose Marzban, как описано ниже.
:::

## Изменение базы данных на MySQL (новая установка)

- Вам нужно создать сервис для MySQL. Для этого измените файл `docker-compose.yml` следующим образом.

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
    image: mysql:lts
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

::: details Активация phpMyAdmin
Для активации phpMyAdmin добавьте его сервис в файл `docker-compose.yml`, как показано ниже.

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
    image: mysql:lts
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

С этим сервисом phpMyAdmin будет доступен на порту 8010 вашего сервера.

Имя пользователя для входа будет root. Пароль вы определите далее в инструкции.
:::

- Установите следующие переменные в файле `.env`.

Измените `DB_PASSWORD` на желаемый пароль для базы данных.

::: warning Внимание
- ‍‍`DB_PASSWORD` должен быть одинаковым в обеих переменных.
- Переменная ‍`MYSQL_ROOT_PASSWORD‍` используется в сервисе MySQL и не существует в переменных Marzban по умолчанию, поэтому вам нужно добавить ее в файл `.env‍` самостоятельно.
:::

```env
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://root:DB_PASSWORD@127.0.0.1/marzban"
MYSQL_ROOT_PASSWORD = DB_PASSWORD
```
- Затем закомментируйте следующий код, относящийся к базе данных sqlite, добавив # в начало строки.
```
#SQLALCHEMY_DATABASE_URL = "sqlite:////var/lib/marzban/db.sqlite3"
```

- Перезапустите Marzban.

```bash
marzban restart
```

Теперь информация Marzban будет храниться в MySQL (в директории `/var/lib/marzban/mysql`).


## Миграция на MySQL (перенос данных)

::: warning Внимание
Эта операция может занять некоторое время, поэтому заранее сделайте необходимые приготовления.
:::

Для переноса данных и изменения базы данных Marzban с SQLite на MySQL выполните следующие шаги.

‍- Выполните шаги, указанные в разделе [Изменение базы данных на MySQL](mysql.md#изменение-базы-данных-на-mysql-новая-установка).

- После перезапуска Marzban выполните следующую команду для создания дампа из предыдущей базы данных.

``` bash
sqlite3 /var/lib/marzban/db.sqlite3 '.dump --data-only' | sed "s/INSERT INTO \([^ ]*\)/REPLACE INTO \`\\1\`/g" > /tmp/dump.sql
```

- Перейдите в директорию `/opt/marzban`.

``` bash
cd /opt/marzban
```

- Выполните следующую команду для создания копии файла `dump.sql` в контейнере MySQL.

``` bash
docker compose cp /tmp/dump.sql mysql:/dump.sql
```

- Выполните следующую команду для переноса данных в MySQL.

::: tip Руководство
На этом этапе вам нужно ввести пароль базы данных, который вы ранее установили вместо `DB_PASSWORD`.
:::
``` bash
docker compose exec mysql mysql -u root -p -h 127.0.0.1 marzban -e "SET FOREIGN_KEY_CHECKS = 0; SET NAMES utf8mb4; SOURCE dump.sql;"
```

- Удалите файл `/tmp/dump.sql`.

``` bash
rm /tmp/dump.sql
```

- Перезапустите Marzban.

``` bash
marzban restart
```

Теперь данные из вашей предыдущей базы данных перенесены в MySQL.

::: tip Примечание
Возможно, после перезапуска Marzban процесс миграции не был полностью завершен. Вместо перезапуска вы можете выключить и включить Marzban с помощью следующей команды.
```bash
marzban down && marzban up
```
:::

::: tip Примечание
Если вы используете [скрипт резервного копирования](https://gozargah.github.io/marzban/ru/examples/backup), после миграции на `MySQL` вам нужно снова запустить скрипт, иначе резервная копия базы данных `MySQL` не будет включена в файл резервной копии.
:::

## Изменение пароля phpMyAdmin

`1` Сначала войдите в панель управления базой данных, которая по умолчанию запущена на порту `8010`.

`2` Нажмите на раздел `User accounts`.

`3` Затем нажмите на `Edit Privileges` в двух разделах, относящихся к `root`. Обратите внимание, что этот процесс, который также объясняется в следующих шагах, нужно выполнить для обоих разделов.

`4` Затем нажмите на раздел `Change password`.

`5` Наконец, введите свой новый пароль в два поля `Enter` и `Re-type`, затем нажмите кнопку `Go`.

`6` После выполнения вышеуказанных шагов замените новый пароль в файле `env` в двух переменных, связанных с базой данных `MySQL`, а затем обязательно перезапустите Marzban.

::: tip Примечание
Если вы используете [скрипт резервного копирования](https://gozargah.github.io/marzban/ru/examples/backup), после изменения пароля базы данных `MySQL` вам нужно снова запустить скрипт, иначе процесс резервного копирования не будет выполнен из-за изменения пароля.
:::

::: tip Примечание
Рекомендуется изменить порт по умолчанию для панели управления базой данных `phpMyAdmin` на другой порт, чтобы сделать шаг в направлении обеспечения безопасности вашей базы данных.
:::

## Настройка phpMyAdmin для серверов ARM

- Если архитектура `CPU` вашего сервера `ARM`, которая включает `arm64` или `aarch64`, и вы активировали сервис `phpMyAdmin` с помощью приведенного выше примера, вы увидите ошибки в логах Marzban, которые можно просмотреть с помощью команды `marzban logs`. Эти ошибки связаны с тем, что `phpMyAdmin` не поддерживает `CPU` вашего сервера. Также, если вы выполните команду `marzban status`, сервис `phpMyAdmin` будет находиться в состоянии `restarting`.

- Для полной уверенности в типе архитектуры `CPU` вашего сервера вы можете использовать следующий скрипт, чтобы увидеть общий обзор характеристик вашего сервера, где тип `CPU` можно увидеть в разделе `Arch`.

```bash
wget -qO- bench.sh | bash
```

- Поэтому вам нужно разместить сервис `phpMyAdmin` в файле `docker-compose.yml` как показано ниже, где используется другой образ.

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
    image: mysql:lts
    restart: always
    env_file: .env