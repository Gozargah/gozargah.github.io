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

## Connecting Marzban Node to Multiple Panels

If you need to connect a Node server to multiple Marzban Panels, you need to add a new node service in the `docker-compose.yml` file for each panel. This can be done in two ways.

::: tip Note
In both configuration options, you can modify port settings used in sample `docker-compose.yml` files to suit your needs. Additionally, you can add as many node services as required in this file.

:::

### First Method: Using Host Network

In this case, you can use all available ports in your environment. Note that in this scenario, all ports used by Xray-Core of the panels will be listened on by the node server. This means that if there is a duplicate port in the Xray core pf the panels, there may be disruptions in node connections or configurations. To avoid this issue, you can configure your settings as needed using [All on one port](https://gozargah.github.io/marzban/en/examples/all-on-one-port) tutorial, or simply follow the second method.

 - Use the following example to add two node services to the `docker-compose.yml` file.

::: details Sample configuration of `docker-compose.yml`
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

- Then get the necessary certificates from the panels and place them in the specified paths.
- Proceed to run Marzban Node
```bash
docker compose up -d
```

- The connection ports of the node for the panels and the specified ports for the inbounds will be as follows:

| Variable | Panel 1 | Panel 2 |
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | As desired |  As desired |

<br>

### Second Method: Using Port Mapping

In this scenario, only specific ports are accessible and duplicate ports on the server node will be prevented. Please note that you should specify the ports used in your services in the `docker-compose.yml` file.

- Use the example below to add two Node services to the `docker-compose.yml` file.


::: details Sample configuration file `docker-compose.yml` 
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

- Once you have received the necessary certificates from the panels and placed them in the specified paths, proceed to run Marzban Node.

- The connection ports of the node for the panels and the specified ports for the inbounds will be as follows:

| Variable | Panel 1 | Panel 2 |
|----------------:|-----------:|---------:|
| `Port`           | 2000      |    3000   |
| `API Port`       | 2001      |    3001   |
| `Inbound Ports` | 2053 <br> 2054 | 2096 <br> 2097 |


## Updating Marzban Node

- Enter Marzban Node directory.
```bash
cd Marzban-node
```

- Update Marzban Node using the following command.
```bash
docker compose pull
```

- Finally, restart Marzban Node using the following command.
```bash
docker compose down --remove-orphans; docker compose up -d
```


## Additional Notes

::: tip Note 1
If you want to consider a separate inbound for each node for better node management, you need to add a new inbound in the `Core Settings` with unique `Tags` and `Ports` for each node.
:::

::: tip Note 2
If you intend to use Warp on the node server and you have configured the `docker-compose.yml` file through second method, you must enable Warp through `Xray core`. If you use Wireguard core, Warp will not work on the node server.
:::

::: tip Note 3
If you plan to use TLS-configured settings, you must obtain a certificate for your domain on the node server, then move it to the master server and enter the path of certificate files in the inbound. Also, instead of multiple certificates for multiple subdomains, you can obtain a wildcard certificate for your main domain to cover all subdomains.
:::

::: tip Note 4
The `docker-compose.yml` file is sensitive to indentation and spacing. You can use tools like [yamlchecker](https://yamlchecker.com) to validate your configuration.
:::


::: tip Note 5
If you've made changes in the `docker-compose.yml` file, restart Marzban Node using the following command to apply the changes:
```bash
cd ~/Marzban-node
docker compose down --remove-orphans; docker compose up -d
```
:::

::: tip Note 6
If Marzban Node is not running the latest version of Xray and you wish to manually upgrade or downgrade it for any reason, you can do this by following the tutorial on [Changing Xray Core Version](https://gozargah.github.io/marzban/en/examples/change-xray-version).
 :::
