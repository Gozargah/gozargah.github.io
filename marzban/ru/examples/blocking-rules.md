---
title: Блокировка сайтов
---

# Блокировка иранских сайтов 
С помощью этой инструкции вы можете заблокировать иранские сайты. Цель этого - предотвратить раскрытие IP-адреса вашего сервера и его блокировку. Для этого достаточно выполнить следующие шаги для мастер-сервера и сервера Marzban Node, которые объяснены в конце инструкции.

## Команды для мастер-сервера

### Шаг первый: Загрузка файлов и создание необходимых папок

Сначала создайте папку `assets` с помощью следующей команды.

``` bash
mkdir -p /var/lib/marzban/assets/
```

### Шаг второй: Загрузка файлов и настройка файла env

Затем введите следующие команды в терминале сервера для загрузки нужных файлов.
``` bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```

Теперь откройте файл `.env` с помощью следующей команды.

```bash
nano /opt/marzban/.env
```
Измените значение переменной `XRAY_ASSETS_PATH` на значение, указанное в коде ниже.

``` bash
XRAY_ASSETS_PATH = "/var/lib/marzban/assets/"
```

### Шаг третий: Настройка и применение правил

Теперь пора настроить Marzban :) Войдите в свою панель и в разделе `Core Settings` перейдите к разделу `routing` и заполните раздел `routing` согласно примеру ниже или полностью удалите раздел `routing` и замените его следующим значением.
(Обратите внимание, что вы должны удалить только раздел `routing`. Если вы удалили всё до конца файла, вам нужно добавить { в конец.)

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

::: warning Внимание
Обязательно проверьте, что значение `tag` протокола `blackhole` в разделе `outbounds` равно `blackhole`.
:::

### Шаг четвертый: Применение изменений

Наконец, для применения изменений перезапустите Marzban с помощью следующей команды.

``` bash
marzban restart
```

## Команды для сервера Marzban Node

### Шаг первый: Загрузка файлов и создание необходимых папок

Сначала создайте папку `assets` с помощью следующей команды.
``` bash
mkdir -p /var/lib/marzban/assets/
```

### Шаг второй: Загрузка файлов

Затем введите следующие команды в терминале сервера для загрузки нужных файлов.

``` bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```

 ### Шаг третий: Настройка файла docker-compose.yml

 Перейдите в папку `Marzban-node`.

``` bash
cd Marzban-node
```

Откройте файл `docker-compose.yml` с помощью следующей команды.

``` bash
nano docker-compose.yml
```

Добавьте следующую строку в раздел `volumes` в файле `docker-compose.yml`, как показано в примере.

::: code-group
```yml [docker-compose.yml]
      - /var/lib/marzban/assets:/usr/local/share/xray
```
:::

::: details Пример конфигурации файла `docker-compose.yml`
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

::: warning Внимание 
Файл `docker-compose.yml` чувствителен к выравниванию строк и пробелам.
:::

### Шаг четвертый: Применение изменений

Наконец, для применения изменений перезапустите Marzban Node с помощью следующей команды.

``` bash
docker compose down && docker compose up -d
```
