---
title: Переход на БД MySQL
---

Этот документ представляет собой руководство по настройке и запуску MySQL для использования с Marzban. Рассмотрены различные варианты настройки, включая MariaDB и Percona Server.

MySQL, Percona Server и MariaDB — три популярных системы управления базами данных (СУБД), основанные на открытом коде. Все они происходят от одного и того же исходного кода MySQL, но с течением времени развились в разные направления с уникальными особенностями. 

## Предварительные требования
Прежде чем начать, убедитесь, что вы добавили себя в группу `docker`, чтобы избежать необходимости использования `sudo` при каждом вызове команд Docker:

```shell
sudo addgroup $(whoami) docker
```

## Шаги настройки

### Шаг 1: Создание тома для данных MySQL

```shell
docker volume create mysql
```

### Шаг 2: Инициализация базы данных

Для инициализации базы данных необходимо запустить контейнер с MySQL, задав следующие переменные окружения:
:::caution
Данные значения приведены справочно.

Заполните содержимое своими значениями.
:::

| Переменная     | Значение                 | Описание                 |
| -------------- | ------------------------ |------------------------ |
| MYSQL_ROOT_PASSWORD | super-puper-password |пароль для суперпользователя MySQL |
| MYSQL_USER   | marzban         |имя пользователя базы данных для Marzban |
| MYSQL_PASSWORD | super-password    |пароль для пользователя базы данных |
| MYSQL_DATABASE  | marzban        |имя базы данных для Marzban |
| MYSQL_ROOT_HOST | 127.0.0.1            |адрес хоста, с которого разрешено подключение суперпользователя. Изменять не требуется. |

#### Варианты запуска контейнера:
:::hint
Рекомендуется использовать LTS версию MariaDB, и стабильные версии других СУБД
:::

Ниже приведены примеры запуска контейнера для каждого из вариантов MySQL, MariaDB и Percona Server.

### MySQL
        ```sh
        docker run -d --rm --name mysql -v /var/lib/marzban/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=super-puper-password -e MYSQL_ROOT_HOST=127.0.0.1 -e MYSQL_DATABASE=marzban -e MYSQL_PASSWORD=super-password -e MYSQL_USER=marzban mysql:8.3 --character_set_server=utf8mb4 --collation_server=utf8mb4_unicode_ci --innodb-redo-log-capacity=134217728 --disable-log-bin --mysqlx=OFF
        ```
### MariaDB
        ```sh
        docker run -d --rm --name mysql -v /var/lib/marzban/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=super-puper-password -e MYSQL_ROOT_HOST=127.0.0.1 -e MYSQL_DATABASE=marzban -e MYSQL_PASSWORD=super-password -e MYSQL_USER=marzban mariadb:lts --character_set_server=utf8mb4 --collation_server=utf8mb4_unicode_ci --innodb-log-file-size=67108864
        ```
### Percona
        ```sh
        docker run -d --rm --name mysql -v /var/lib/marzban/mysql:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=super-puper-password -e MYSQL_ROOT_HOST=127.0.0.1 -e MYSQL_DATABASE=marzban -e MYSQL_PASSWORD=super-password -e MYSQL_USER=marzban percona/percona-server:8.2 --character_set_server=utf8mb4 --collation_server=utf8mb4_unicode_ci --disable-log-bin --innodb-redo-log-capacity=134217728 --mysqlx=OFF
        ```
 



### Шаг 3: Остановка контейнера

После инициализации базы данных контейнер необходимо остановить контейнер, использовав следующую команду, введя пароль суперпользователя по запросу:

### Для MySQL8 и Percona 
```shell
docker exec -it mysql mysqladmin shutdown -u root -p
```
### Для MariaDB 
```shell
docker exec -it mysql mariadb-admin shutdown -u root -p
```

### Шаг 4: Интеграция

Для интеграции MySQL с приложением Marzban через `docker-compose`, необходимо добавить соответствующие сервисы в `docker-compose.yml` файл.
```shell
sudo nano /opt/marzban/docker-compose.yml
```

Ниже приведены примеры конфигураций для каждого из вариантов MySQL, MariaDB и Percona Server.

### MySQL

```yaml
services:
  marzban:
    image: gozargah/marzban:latest
    env_file: .env
    restart: always
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
    depends_on:
      - mysql
  mysql:
    image: mysql:8.3
    network_mode: host
    container_name: mysql
    command:
      - --mysqlx=OFF
      - --bind-address=127.0.0.1
      - --character_set_server=utf8mb4
      - --collation_server=utf8mb4_unicode_ci
      - --disable-log-bin
      - --host-cache-size=0
      - --innodb-open-files=1024
      - --innodb-buffer-pool-size=268435456
    volumes:
      - /var/lib/marzban/mysql:/var/lib/mysql
volumes:
  mysql:
    external: true
    name: mysql
```
### MariaDB

```yaml
services:
  marzban:
    image: gozargah/marzban:latest
    env_file: .env
    restart: always
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
    depends_on:
      - mysql
  mysql:
    image: mariadb:lts
    network_mode: host
    container_name: mysql
    command:
      - --bind-address=127.0.0.1
      - --character_set_server=utf8mb4
      - --collation_server=utf8mb4_unicode_ci
      - --host-cache-size=0
      - --innodb-open-files=1024
      - --innodb-buffer-pool-size=268435456
    volumes:
      - /var/lib/marzban/mysql:/var/lib/mysql
volumes:
  mysql:
    external: true
    name: mysql
```
### Percona

```yaml
services:
  marzban:
    image: gozargah/marzban:latest
    env_file: .env
    restart: always
    network_mode: host
    volumes:
      - /var/lib/marzban:/var/lib/marzban
    depends_on:
      - mysql
  mysql:
    image: percona/percona-server:8.2
    network_mode: host
    container_name: mysql
    command:
      - --mysqlx=OFF
      - --bind-address=127.0.0.1
      - --character_set_server=utf8mb4
      - --collation_server=utf8mb4_unicode_ci
      - --disable-log-bin
      - --host-cache-size=0
      - --innodb-open-files=1024
      - --innodb-buffer-pool-size=268435456
    volumes:
      - /var/lib/marzban/mysql:/var/lib/mysql

```





Здесь мы устанавливаем некоторые параметры, рассмотрим их немного подробнее:

| Параметр     | Описание                 |
| -------------- | ------------------------ |
| disable-log-bin  | отключает бинарный лог, что может ускорить работу MySQL, так как уменьшается количество операций записи на диск. Важно отметить, что отключение бинарного лога может повлиять на возможности репликации и восстановления данных. |
| host-cache-size=0   | отключает кэширование информации о хостах, с которых поступают подключения. Это может ускорить MySQL, уменьшая задержку при новых соединениях, особенно в средах с большим количеством подключений         |
| innodb-open-files=1024 | увеличивает количество файлов, которые InnoDB может открыть одновременно. Это позволяет более эффективно управлять параллелизмом, ускоряя обработку запросов, особенно при работе с большим количеством таблиц.    |
| innodb-buffer-pool-size=268435456  | устанавливает размер буфера InnoDB в 256MB (по умолчанию 128MB). Увеличение этого параметра позволяет хранить больше данных и индексов в памяти, что существенно может ускорить чтение и запись, особенно для интенсивных операций. Однако стоит учитывать, что увеличение этого размера на системах с ограниченным объемом RAM может привести к проблемам с производительностью.        |


### Шаг 5: Установка строки подключения к базе данных

В файле `.env`, необходимом для работы вашего приложения, следует указать строку подключения к базе данных, используя данные, заданные при инициализации контейнера:
```shell
sudo nano /opt/marzban/.env
```

Перед заполнением строки подключения, убедитесь, что вы используете правильные учетные данные, заданные в шаге 2, при инициализации контейнера MySQL:

```
SQLALCHEMY_DATABASE_URL = "mysql+pymysql://<имя пользователя для базы Marzban>:<пароль пользователя для базы Marzban>@127.0.0.1:3306/<имя базы Marzban>"
```
:::caution
Данные значения приведены справочно.
:::

| Переменная     | Значение                 | Описание                 |
| -------------- | ------------------------ |------------------------ |
| MYSQL_USER   | marzban         |имя пользователя базы данных для Marzban |
| MYSQL_PASSWORD | super-password    |пароль для пользователя базы данных |
| MYSQL_ROOT_HOST | 127.0.0.1            |адрес хоста |
| MYSQL_DATABASE  | marzban        |имя базы данных для Marzban |


Эта строка позволит вашему приложению подключаться к базе данных MySQL, настроенной в Docker, обеспечивая безопасное и удобное управление данными.

Перезапускаем контейнер
```shell
sudo marzban restart
```
### Шаг 6: Перенос данных из SQLite в MySQL

Процедура переноса данных включает создание дампа данных из вашей старой базы данных SQLite, предоставление этого дампа контейнеру MySQL и, наконец, перенос данных из SQLite в MySQL. Ниже представлены шаги и команды для выполнения этих задач.

#### Создание дампа из старой базы SQLite:
Для выполнения дампа базы данных SQLite, нам потребуется пакет для работы с ней
```shell
sudo apt install sqlite3
```
Создадим дамп с данными из вашей базы данных SQLite, используя следующую команду:

```shell
sqlite3 /var/lib/marzban/db.sqlite3 '.dump --data-only' | sed "s/INSERT INTO \([^ ]*\)/REPLACE INTO \`\\1\`/g" > /tmp/dump.sql
```

Эта команда выполняет дамп данных из файла db.sqlite3, находящегося в каталоге /var/lib/marzban, конвертирует инструкции INSERT INTO в REPLACE INTO для обеспечения совместимости с MySQL и сохраняет результат в файл /tmp/dump.sql.

#### Предоставление пути к дампу для MySQL:

Далее, перенесите созданный дамп в контейнер MySQL с помощью команды:

```shell
cd /opt/marzban && docker compose cp /tmp/dump.sql mysql:/dump.sql
```

Переходите в каталог вашего проекта Marzban /opt/marzban и используйте docker compose cp для копирования файла дампа в контейнер mysql.

####  Перенос данных из SQLite в MySQL:

Перед выполнением переноса данных, убедитесь, что вы используете правильные учетные данные, заданные в шаге 2, при инициализации контейнера MySQL:
:::caution
Данные значения приведены справочно.
:::

| Переменная     | Значение                 | Описание                 |
| -------------- | ------------------------ |------------------------ |
| MYSQL_USER   | marzban         |имя пользователя базы данных для Marzban |
| MYSQL_PASSWORD | super-password    |пароль для пользователя базы данных |
| MYSQL_ROOT_HOST | 127.0.0.1            |адрес хоста |
| MYSQL_DATABASE  | marzban        |имя базы данных для Marzban |


:::note
Важно, что в этой команде пароль указывается непосредственно после -p без пробела, что является стандартной практикой для MySQL.
:::

Теперь вы можете выполнить перенос данных, запустив следующую команду в контейнере MySQL:

```shell
docker compose exec mysql mysql -u <имя пользователя для базы Marzban> -p<пароль пользователя для базы Marzban> -h 127.0.0.1 <имя базы Marzban> -e "SET FOREIGN_KEY_CHECKS = 0; SET NAMES utf8mb4; SOURCE /dump.sql;"
```

После выполнения команды начнется процесс переноса данных. 


## Сервис PhpMyAdmin для серверов ARM

- Если архитектура процессора вашего сервера ARM, включающая `arm64` или `aarch64`, и вы активировали сервис `PhpMyAdmin` согласно приведенному выше примеру, вы увидите ошибки в логах Marzban, которые можно просмотреть с помощью команды `marzban logs`, указывающие на то, что `PhpMyAdmin` не поддерживается для процессора вашего сервера. Также, если вы выполните команду `marzban status`, сервис `PhpMyAdmin` будет находиться в состоянии `restarting`.

- Чтобы точно определить архитектуру процессора сервера, вы можете использовать следующий скрипт, который покажет общие характеристики вашего сервера, где в разделе `Arch` будет указана архитектура процессора.

```bash
wget -qO- bench.sh | bash
```

- В этом случае необходимо изменить сервис `PhpMyAdmin` в файле `docker-compose.yml` следующим образом, используя другой образ.

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

- В конце перезапустите Marzban, чтобы загрузить указанный образ.
```bash
marzban restart
```
Теперь, если вы выполните следующую команду, сервис `PhpMyAdmin` должен быть в состоянии `running`.
```bash
marzban status
```

## Устранение ошибки при создании дампа из базы данных SQLite

Если при миграции на MySQL вы столкнулись с ошибкой:

`Unknown option "--data-only" on ".dump"`

это означает, что на вашем сервере установлена старая версия `sqlite`. Чтобы решить эту проблему, необходимо установить более новую версию `sqlite`.

- Первая команда
```bash
sudo apt update && sudo apt upgrade -y
```
- Вторая команда
```bash
sudo apt-get install build-essential
```
- Третья команда
```bash
wget https://www.sqlite.org/2023/sqlite-autoconf-3430200.tar.gz
```
- Четвертая команда
```bash
tar -xvf sqlite-autoconf-3430200.tar.gz && cd sqlite-autoconf-3430200
```
- Настройка и компиляция исходного кода (этот шаг может занять 3-4 минуты)
```bash
./configure
```
```bash
make
```
- Удаление старой версии `SQLite`
```bash
sudo apt-get purge sqlite3
```
- Установка новой версии
```bash
sudo make install
```
- Обновление переменной `PATH`
```bash
export PATH="/usr/local/bin:$PATH"
```
- Проверка установленной версии
```bash
sqlite3 --version
```
Если все сделано правильно, версия должна быть `3.43.2`.
- Добавление переменной `PATH` в файл `bashrc` для сохранения изменений

Откройте файл `~/.bashrc` с помощью `nano`.
```bash
nano ~/.bashrc
```
- Затем добавьте следующую строку в конец файла.
```bash
export PATH="/usr/local/bin:$PATH"
```
- Примените изменения в файле `bashrc`
```bash
source ~/.bashrc
```
- Теперь снова создайте дамп и продолжайте следовать инструкциям по миграции на MySQL.

