---
title: Marzban Node
---


# Marzban Node

Marzban Node позволяет распределять трафик между различными серверами, а также дает возможность использовать серверы с разными локациями. С помощью материалов этой страницы вы сможете настроить и запустить Marzban Node на одном или нескольких дополнительных серверах и подключить их к панели Marzban, чтобы использовать эти серверы в своих конфигурациях.
Далее вы также увидите, как подключить ноду к нескольким панелям Marzban.

## Быстрая установка (рекомендуется)

- Установите Marzban Node на свой сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install
```
- Установите Marzban Node с желаемым именем с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install --name marzban-node2
```
- Установите только скрипт, чтобы иметь доступ к командам Marzban Node:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install-script
```
::: tip Примечание
- Чтобы увидеть все команды Marzban Node, используйте следующую команду:
```bash
marzban-node help
```
:::

::: tip Примечание
Описание команд Marzban Node можно найти в документации [Скрипт Marzban](https://gozargah.github.io/marzban/ru/docs/marzban-script).
:::

## Ручная установка (продвинутая)

- После входа в терминал сервера ноды, сначала обновите сервер и установите необходимые программы с помощью следующей команды:
```bash
apt-get update; apt-get install curl socat git -y
```

- Установите Docker:
```bash
curl -fsSL https://get.docker.com | sh
```

- Клонируйте Marzban Node и создайте его папку:
```bash
git clone https://github.com/Gozargah/Marzban-node
mkdir /var/lib/marzban-node 
```

- Для установки безопасного соединения между нодой и панелью Marzban необходимо внести изменения в файл `docker-compose.yml`. Перейдите в основную папку Marzban Node и откройте этот файл для редактирования:
```bash
cd ~/Marzban-node
nano docker-compose.yml
```
::: tip Примечание 
Файл `docker-compose.yml` чувствителен к выравниванию строк и пробелам. Для проверки правильности вашей конфигурации вы можете использовать инструмент [yamlchecker](https://yamlchecker.com).
:::

- Удалите `#` перед строкой `SSL_CLIENT_CERT_FILE`, чтобы раскомментировать ее, и выровняйте эту строку с верхней строкой. При желании вы можете удалить две строки, относящиеся к `SSL_CERT_FILE` и `SSL_KEY_FILE`. 

- Если вы используете версию 0.4.4 или новее Marzban, вы можете улучшить стабильность соединения нод, активировав протокол `rest`. Для этого удалите `#` перед соответствующей строкой.

После сохранения изменений, содержимое вашего файла будет выглядеть следующим образом:

::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    # env_file: .env
    environment:
      SSL_CERT_FILE: "/var/lib/marzban-node/ssl_cert.pem"
      SSL_KEY_FILE: "/var/lib/marzban-node/ssl_key.pem"
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::

::: tip Примечание
Если вы хотите изменить порты подключения ноды к Marzban, вы можете добавить две переменные `XRAY_API_PORT` и `SERVICE_PORT` в секцию `environment` в этом файле и установить желаемые порты.
([Смотреть пример конфигурации](marzban-node.md#первый-способ-с-использованием-host-network))
:::

::: details Использование файла `.env` (опционально)
При желании вы можете настроить переменные окружения Marzban Node через файл `.env`.

Создайте копию файла `.env.example`, откройте его для редактирования и внесите необходимые изменения в этот файл:
```bash
cp .env.example .env
nano .env
```

Настройте файл `docker-compose.yml` следующим образом:
::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host
    env_file: .env
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::

- Теперь в вашей панели перейдите в раздел `Node Settings` через меню.
Затем нажмите на `Add New Mazrban Node`, чтобы добавить новую ноду.

- Нажав на кнопку `Show Certificate`, вы увидите сертификат, необходимый для подключения ноды. Скопируйте этот сертификат и продолжите следующие шаги в терминале сервера ноды.

<img src="https://github.com/user-attachments/assets/397daac8-3cd7-4980-834c-44063b37296f"
     style="display:block;float:none;margin-left:auto;margin-right:auto;width:50%">
<br>

- Создайте файл сертификата следующей командой и вставьте в него скопированное содержимое:
```bash
nano /var/lib/marzban-node/ssl_client_cert.pem
```
 
- Затем запустите Marzban Node:
```bash
docker compose up -d
```


- Вернитесь в панель Marzban и заполните различные поля следующим образом:

1. В поле `Name` выберите желаемое имя для ноды.
2. В поле `Address` укажите IP-адрес сервера ноды.
3. Оставьте порты подключения ноды по умолчанию, включая `Port` и `API Port`. Значения по умолчанию - `62050` и `62051` соответственно.
4. В поле `Usage Ratio` вы можете изменить коэффициент использования ноды. Значение по умолчанию - `1`.
5. Если вы хотите добавить IP-адрес сервера ноды как хост для всех входящих соединений, активируйте флажок `Add this node as a new host for every inbound`.

::: tip Примечание
Вы можете отключить этот флажок и использовать сервер ноды только для нужных входящих соединений в разделе `Host Settings`.
:::

- Наконец, нажмите `Add Node`, чтобы добавить ноду. Теперь Marzban Node готов к использованию. Вы можете управлять своими хостами в разделе `Host Settings` и использовать сервер ноды для нужных входящих соединений.

::: warning Внимание
Если на сервере ноды активирован файрвол, необходимо открыть порты подключения ноды к панели, а также порты входящих соединений в файрволе сервера ноды.
:::

## Подключение Marzban Node к нескольким панелям

Если вам нужно подключить один сервер ноды к нескольким панелям Marzban, необходимо добавить сервис ноды в файл `docker-compose.yml` для каждой панели. Это можно сделать двумя способами.

::: tip Примечание
В обоих способах конфигурации вы можете изменить порты, используемые в примерах файлов `docker-compose.yml`, в соответствии с вашими потребностями. Также вы можете добавить в этот файл столько сервисов ноды, сколько необходимо.
:::

### Первый способ: с использованием Host Network

В этом случае вы можете использовать все доступные порты в ваших входящих соединениях. Обратите внимание, что в этом случае все порты, используемые в Xray-Core панелей, будут прослушиваться на сервере ноды. Это означает, что при наличии повторяющихся портов в ядре Xray панелей возможны проблемы с подключением ноды или конфигураций. Чтобы избежать этой проблемы, вы можете при необходимости сделать ваши конфигурации [однопортовыми](https://gozargah.github.io/marzban/examples/all-on-one-port#один-порт-для-всех) или использовать второй способ.

::: details Пример конфигурации файла `docker-compose.yml`
::: code-group
```yml{11,28} [docker-compose.yml]
services:
  marzban-node-1:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SERVICE_PORT: 2000
      XRAY_API_PORT: 2001
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban


  marzban-node-2:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SERVICE_PORT: 3000
      XRAY_API_PORT: 3001
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
:::

- Затем получите необходимые сертификаты из панелей и поместите каждый из них в путь, указанный в примере.
- Запустите Marzban Node:
```bash
docker compose up -d
```

- Порты подключения ноды к панелям и порты, доступные для использования во входящих соединениях, будут следующими:

| Переменная      | Первая панель | Вторая панель |
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | любые  |  любые |

<br>

### Второй способ: с использованием Port Mapping

В этом случае доступны только определенные порты, что предотвращает появление повторяющихся портов на сервере ноды. Обратите внимание, что вы должны указать порты, используемые в ваших входящих соединениях, в файле `docker-compose.yml`, как показано в примере.

::: details Пример конфигурации файла `docker-compose.yml`
::: code-group
```yml{7,26} [docker-compose.yml]
services:
  marzban-node-1:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 2000:62050
      - 2001:62051
      - 8880:8880
      - 8881:8881
      - 8882:8882


  marzban-node-2:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 3000:62050
      - 3001:62051
      - 8883:8883
      - 8884:8884
      - 8885:8885
```
:::

- Затем получите необходимые сертификаты из панелей и поместите каждый из них в путь, указанный в примере.
- Запустите Marzban Node:
```bash
docker compose up -d
```

- Порты подключения ноды к панелям и порты, доступные для использования во входящих соединениях, будут следующими:

| Переменная      | Первая панель | Вторая панель |
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | 8880-8882  |  8883-8885 |
</rewritten_file>

