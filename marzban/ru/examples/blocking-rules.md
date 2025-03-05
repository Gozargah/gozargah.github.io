---
title: Блокировка сайтов
---

# Блокировка иранских сайтов  
С помощью этого руководства вы сможете заблокировать иранские сайты. Цель данного процесса — предотвратить утечку IP-адреса вашего сервера и его последующую блокировку. Для этого достаточно выполнить следующие шаги как на мастер-сервере, так и на сервере ноды Marzban (подробности в конце руководства).

## Команды для мастер-сервера

### Шаг первый: Загрузка файлов и создание необходимых папок

Сначала создайте папку `assets` с помощью следующей команды:

```bash
mkdir -p /var/lib/marzban/assets/
```

### Шаг второй: Загрузка файлов и настройка файла env

Затем выполните следующие команды в терминале сервера для загрузки необходимых файлов:
```bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```

Теперь откройте файл `.env` с помощью следующей команды:

```bash
nano /opt/marzban/.env
```

Измените значение переменной `XRAY_ASSETS_PATH` на следующее:

```bash
XRAY_ASSETS_PATH = "/var/lib/marzban/assets/"
```

### Шаг третий: Настройка и применение правил

Теперь время настроить Marzban :) Войдите в вашу панель управления, перейдите в раздел `Core Settings`, затем в подраздел `routing` и заполните его согласно примеру ниже. Либо полностью удалите раздел `routing` и замените его следующим содержимым.  
*(Обратите внимание, что удалять нужно только раздел routing. Если вы удалите всё до конца файла, не забудьте добавить одну фигурную скобку `{` в конце.)*

```json
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
Обязательно убедитесь, что значение тега протокола `blackhole` в разделе outbounds установлено как `blackhole`.
:::

### Шаг четвертый: Применение изменений

Чтобы применить изменения, перезапустите Marzban с помощью следующей команды:

```bash
marzban restart
```

## Команды для сервера ноды Marzban

### Шаг первый: Загрузка файлов и создание необходимых папок

Сначала создайте папку `assets` с помощью следующей команды:
```bash
mkdir -p /var/lib/marzban/assets/
```

### Шаг второй: Загрузка файлов

Затем выполните следующие команды в терминале сервера для загрузки необходимых файлов:

```bash
wget -O /var/lib/marzban/assets/geosite.dat https://github.com/v2fly/domain-list-community/releases/latest/download/dlc.dat
wget -O /var/lib/marzban/assets/geoip.dat https://github.com/v2fly/geoip/releases/latest/download/geoip.dat
wget -O /var/lib/marzban/assets/iran.dat https://github.com/bootmortis/iran-hosted-domains/releases/latest/download/iran.dat
```

### Шаг третий: Настройка файла docker-compose.yml

Перейдите в папку `Marzban-node`:

```bash
cd Marzban-node
```

Откройте файл `docker-compose.yml` с помощью следующей команды:

```bash
nano docker-compose.yml
```

Добавьте следующую строку в раздел `volumes` файла `docker-compose.yml`, как показано в примере:

::: code-group
```yml
      - /var/lib/marzban/assets:/usr/local/share/xray
```
:::

::: details Пример конфигурации файла `docker-compose.yml`
::: code-group
```yml
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
Файл `docker-compose.yml` чувствителен к отступам и пробелам.
:::

### Шаг четвертый: Применение изменений

Чтобы применить изменения, перезапустите Marzban с помощью следующей команды:

```bash
marzban restart
``` 
