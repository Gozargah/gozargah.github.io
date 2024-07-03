---
title: Marzban Node
---

## Введение

**Marzban Node** - это приложение на Python, предоставляющее сервис для управления экземпляром ядра Xray.
Приложение разработано с учетом требований безопасности и использует взаимную аутентификацию самоподписанными SSL-сертификатами, для связи между панелью и ее клиентами(узлами).

В зависимости от Вашего выбора, приложение может использовать или RPyC для удаленных вызовов процедур, или REST, используя стандартные HTTP-методы (GET, POST, PUT, DELETE и т.д.) для выполнения различных операций.

С помощью этого руководства вы можете создать узел Marzban Node на дополнительном сервере и подключить его к панели.

## Настройка Marzban Node

:::note
Обратите внимание, что и Ваша панель и узел должны быть обновлены до последних `latest` версий
:::

- Обновляем сервер и устанавливаем необходимый софт
```bash
apt-get update; apt-get upgrade -y; apt-get install curl socat git -y
```

- Устанавливаем на сервер Docker.
```bash
curl -fsSL https://get.docker.com | sh
```

- Клонируем репозиторий и создаем папку для ключа.
```bash
git clone https://github.com/Gozargah/Marzban-node
mkdir /var/lib/marzban-node
mkdir /var/lib/marzban
```

- Чтобы установить безопасное соединение между Marzban Node и Marzban Panel, вам необходимо внести определенные изменения в файл docker-compose.yml. Итак, перейдите в основной каталог Marzban Node и откройте этот файл для редактирования.
```bash
cd ~/Marzban-node
nano docker-compose.yml
```

– Удалите знак `#` после `SSL_CLIENT_CERT_FILE` и совместите эту строку со строками ниже. Затем вы можете удалить две строки, относящиеся к SSL_CERT_FILE и SSL_KEY_FILE. 
- Также мы сразу подключим еще одну папку, где могут храниться логи, если настроено логирование на основном сервере.
- А еще мы сразу перейдем на использование REST метода подключения. 
После сохранения изменений ваш файл будет иметь следующий вид:

::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"
      SERVICE_PROTOCOL: rest

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
:::

::: tip Дополнительная информация по переменным
Доступные переменные окружения
| Переменная     | Описание  | Значение по умолчанию |
| -------------- | -------------------- | -----------|
| `SERVICE_PORT`  | Сервисный порт |62050|
| `XRAY_API_PORT`   | Порт API xray-core         |62051|
| `XRAY_EXECUTABLE_PATH` | Путь к исполняемым файлам xray    |/usr/local/bin/xray|
| `XRAY_ASSETS_PATH`  | Путь к ассетам xray        |/usr/local/share/xray|
| `SSL_CERT_FILE` | Сертификат узла для связи с панелью            |/var/lib/marzban-node/ssl_cert.pem|
| `SSL_KEY_FILE`  | Ключ сертификата для связи с панелью   |/var/lib/marzban-node/ssl_key.pem|
| `SSL_CLIENT_CERT_FILE`  | Сертификат панели для связи с узлом   |/var/lib/marzban-node/ssl_client_cert.pem|
| `SERVICE_PROTOCOL`  | Сервисный протокол   |rpyc|
| `DEBUG`  | Вывод отладочной информации   |false|
:::

- Теперь перейдите в раздел «Настройки узла» на панели Marzban.
Затем нажмите «Добавить новый узел Mazrban» и добавьте новый узел.

- Если вы нажмете кнопку «Показать сертификат», вы увидите сертификат, необходимый для подключения узла. Скопируйте этот сертификат и продолжайте следовать инструкциям с терминала вашего узла-сервера.

<img src="https://github.com/mdjvd/gozargah.github.io/assets/116950557/bee4bbf0-f811-4b20-af28-adee270b469d"
     style="display:block;float:none;margin-left:auto;margin-right:auto;width:47%">
<br>

- Создадим файл для хранения сертификата и вставим туда сертификат, который был скопирован из панели.
```bash
nano /var/lib/marzban-node/ssl_client_cert.pem
```
 
- Запустим контейнер с нодой.
```bash
docker compose up -d
```
Теперь вернемся в основную панель

- Вернувшись в панель заполняем недостающие поля:

Заполняем данные узла:

   - Name - Имя узла;
   - Adress - IP адрес узла. (для подключения к узлам, не рекомендуется использовать Доменные имена, подключайтесь всегда по IP)
   - Port - Оставляем по умолчанию, если не изменяли их.
   - Оставляем галку, если хотим добавить узел в качестве нового хоста во все входящие

::: tip Рекомендация
Вы можете отключить эту галочку и вручную добавлять IP-адрес Node-сервера только для необходимых подключений в качестве хоста в разделе «Настройки хоста».
:::

- Наконец, нажмите `Добавить узел`, чтобы добавить узел. Теперь узел готов к использованию. Вы можете использовать IP-адрес Node-сервера для желаемых подключений, управляя своими хостами в разделе `Настройки хоста`.

::: warning Внимание
Если вы включили брандмауэр на сервере Node, вам необходимо открыть порты как для подключений к панели, так и для входящих портов в брандмауэре сервера Node.
:::


## Подключение узла Marzban к нескольким панелям

Если вам нужно подключить сервер узла к нескольким панелям Marzban, вам нужно добавить новую службу узла в файл `docker-compose.yml` для каждой панели. Это можно сделать двумя способами.

::: tip Примечание
В обоих вариантах конфигурации вы можете изменить настройки портов, используемые в образцах файлов `docker-compose.yml`, в соответствии с вашими потребностями. Кроме того, вы можете добавить столько служб узлов, сколько потребуется, в этот файл.
:::

### Первый способ: использование хост-сети

В этом случае вы можете использовать все доступные порты в вашей среде. Обратите внимание, что в этом сценарии все порты, используемые Xray-Core панелей, будут прослушиваться сервером узла. Это означает, что если в ядре Xray панелей есть дублирующийся порт, могут возникнуть сбои в соединениях или конфигурациях узла. Чтобы избежать этой проблемы, вы можете настроить свои настройки, используя учебник [Все на одном порту](https://gozargah.github.io/marzban/en/examples/all-on-one-port), или просто следовать второму методу.

- Используйте следующий пример для добавления двух служб узлов в файл `docker-compose.yml`.

::: details Пример конфигурации `docker-compose.yml`
::: code-group
```yml{11,27} [docker-compose.yml]
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

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
:::

- Затем получите необходимые сертификаты с панелей и поместите их в указанные пути.
- Запустите узел Marzban
```bash
docker compose up -d
```

- Порты подключения узла для панелей и указанные порты для входящих подключений будут следующими:

| Переменная | Панель 1 | Панель 2 |
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | По желанию |  По желанию |

<br>

### Второй способ: использование сопоставления портов

В этом сценарии доступны только определенные порты, и дублирующиеся порты на сервере узла будут предотвращены. Обратите внимание, что вам нужно указать используемые порты в файле `docker-compose.yml`.

- Используйте пример ниже для добавления двух служб узлов в файл `docker-compose.yml`.


::: details Пример конфигурации `docker-compose.yml`
::: code-group
```yml{7,25} [docker-compose.yml]
services:
  marzban-node-1:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 2000:62050
      - 2001:62051
      - 2053:2053
      - 2054:2054


  marzban-node-2:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 3000:62050
      - 3001:62051
      - 2096:2096
      - 2097:2097
```
:::

- После того как вы получите необходимые сертификаты с панелей и поместите их в указанные пути, запустите узел Marzban.

- Порты подключения узла для панелей и указанные порты для входящих подключений будут следующими:

| Переменная | Панель 1 | Панель 2 |
|----------------:|-----------:|---------:|
| `Port`           | 2000      |    3000   |
| `API Port`       | 2001      |    3001   |
| `Inbound Ports` | 2053 <br> 2054 | 2096 <br> 2097 |


## Обновление узла Marzban

- Перейдите в каталог узла Marzban.
```bash
cd Marzban-node
```

- Обновите узел Marzban с помощью следующей команды.
```bash
docker compose pull
```

- Наконец, перезапустите узел Marzban с помощью следующей команды.
```bash
docker compose down --remove-orphans; docker compose up -d
```


## Дополнительные заметки

::: tip Примечание 1
Если вы хотите рассмотреть отдельный входящий для каждого узла для лучшего управления узлом, вам нужно добавить новый входящий в `Core Settings` с уникальными `Tags` и `Ports` для каждого узла.
:::

::: tip Примечание 2
Если вы намерены использовать Warp на сервере узла и настроили файл `docker-compose.yml` через второй метод, вам необходимо включить Warp через `Xray core`. Если вы используете Wireguard core, Warp не будет работать на сервере узла.
:::

::: tip Примечание 3
Если вы планируете использовать настройки с конфигурацией TLS, вы должны получить сертификат для вашего домена на сервере узла, затем переместить его на мастер-сервер и ввести путь к файлам сертификатов в входящем. Также вместо множества сертификатов для нескольких поддоменов вы можете получить сертификат с подстановочным знаком для вашего основного домена, чтобы охватить все поддомены.
:::

::: tip Примечание 4
Файл `docker-compose.yml` чувствителен к отступам и пробелам. Вы можете использовать инструменты, такие как [yamlchecker](https://yamlchecker.com), чтобы проверить вашу конфигурацию.
:::

::: tip Примечание 5
Если вы внесли изменения в файл `docker-compose.yml`, перезапустите узел Marzban с помощью следующей команды, чтобы применить изменения:
```bash
cd ~/Marzban-node
docker compose down --remove-orphans; docker compose up -d
```
:::

::: tip Примечание 6
Если узел Marzban не использует последнюю версию Xray и вы хотите вручную обновить или понизить её по какой-либо причине, вы можете сделать это, следуя учебнику [Изменение версии Xray Core](https://gozargah.github.io/marzban/en/examples/change-xray-version).
:::
