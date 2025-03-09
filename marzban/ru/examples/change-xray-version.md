---
title: Изменение версии Xray
---


# Изменение версии Xray
С помощью инструкций ниже вы можете изменить версию ядра `Xray-core` в Marzban или Marzban Node.

::: tip Примечание
Во всех примерах ниже файлы `docker-compose.yml` и `.env` находятся в директории `/opt/marzban‍‍‍`, а `xray_config.json` в директории `/var/lib/marzban`.

Если вы установили Marzban вручную, вам нужно будет внести необходимые изменения самостоятельно.
:::


## Загрузка Xray-core
::: warning Предварительные требования
Далее вам понадобятся пакеты `unzip` и `wget`.
Для их установки используйте следующую команду.

В `Ubuntu` и `Debian`:
```bash
apt install wget unzip
```

В `CentOS` 
```bash
sudo yum install wget unzip
```
:::

- Создайте папку для `Xray` и перейдите в неё. 
```bash
mkdir -p /var/lib/marzban/xray-core && cd /var/lib/marzban/xray-core
```
- Скопируйте ссылку для скачивания нужной версии `Xray` со страницы [загрузок Xray-core](https://github.com/XTLS/Xray-core/releases) и загрузите её с помощью `wget` в директорию `/var/lib/marzban/xray-core`.
- Например, для загрузки последней версии `Xray` используйте следующую команду.
```bash
wget https://github.com/XTLS/xray-core/releases/latest/download/Xray-linux-64.zip
```
- Распакуйте файл и удалите архив.
```bash
unzip Xray-linux-64.zip
rm Xray-linux-64.zip
```

## Изменение ядра Marzban

Установите переменную `XRAY_EXECUTABLE_PATH` в файле `.env`.
```bash
XRAY_EXECUTABLE_PATH = "/var/lib/marzban/xray-core/xray"
```

Перезапустите Marzban.
```bash
marzban restart
```

::: details Изменение ядра в Marzban Node
В Marzban Node также необходимо установить ‍‍`XRAY_EXECUTABLE_PATH` как показано ниже и добавить папку `/var/lib/marzban/` в сервис.


::: code-group
```yml{8,11} [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host
    environment:
      XRAY_EXECUTABLE_PATH: "/var/lib/marzban/xray-core/xray"
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
Затем перезапустите сервис.
:::
