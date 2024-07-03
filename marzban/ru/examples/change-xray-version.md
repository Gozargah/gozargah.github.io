---
title: Смена версии xray-core
description: В данном руководстве мы сменим версию xray-core

---

## Вы можете использовать скрипт:
```bash
bash <(wget -qO- https://raw.githubusercontent.com/DigneZzZ/marzban_core_change/main/change.sh)
```

## С помощью руководства ниже, Вы сможете изменить ядро вашего Xray-core в Marzban или Marzban Node.

## Смена ядра на сервере панели

1. Устанаваливаем нужный софт


    ```bash
    sudo apt install wget unzip
    ```


2. Создаем папку для Xray и переходим в нее.

    ```bash
    sudo mkdir -p /var/lib/marzban/xray-core && cd /var/lib/marzban/xray-core
    ```

3. Скачиваем нужную версию Xray с помощью wget.

    ```bash
    wget https://github.com/XTLS/Xray-core/releases/download/v1.8.13/Xray-linux-64.zip
    ```

4. Извлекаем содержимое и удаляем  архив.

    ```bash
    unzip Xray-linux-64.zip && rm Xray-linux-64.zip
    ```


5. Указываем панели путь к исполняемым файлам
    ```bash
    sudo nano /opt/marzban/.env
    ```
    ```diff
    // /opt/marzban/.env
    +XRAY_EXECUTABLE_PATH = /var/lib/marzban/xray-core/xray
    ```

6. Перезапускаем Marzban.

    ```bash
    sudo marzban restart
    ```

## Смена ядра на сервере узла
Используемые файлы:

Выполняем шаги с 1-4.

5. Устанавливаем значение переменной `XRAY_EXECUTABLE_PATH` 

    ```bash
    sudo nano ~/Marzban-node/docker-compose.yml
    ```

    ```yaml
    // ~/Marzban-node/docker-compose.yml
    services:
      marzban-node:
        image: gozargah/marzban-node:latest
        restart: always
        network_mode: host

        volumes:
          - /var/lib/marzban-node:/var/lib/marzban-node
          - /var/lib/marzban:/var/lib/marzban

        environment:
          SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"
          SERVICE_PROTOCOL: rest
          XRAY_EXECUTABLE_PATH: "/var/lib/marzban/xray-core/xray"

    ```
6. Перезапускаем узел
    ```bash
    cd ~/Marzban-node
    docker compose down --remove-orphans; docker compose up -d
    ```
