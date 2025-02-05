---
title: Установка
---

# Установка Marzban


## Быстрая установка (Рекомендовано)
::: tip Заметки
Выполнив команду быстрой установки:
- Docker будет установлен на вашем сервере, и Marzban будет выполняться в Docker.
- Команда `marzban` будет доступна на вашем сервере.
- Данные Marzban будут храниться в директории `/var/lib/marzban`.
- Файлы приложения Marzban (`docker-compose.yml` и `.env`) Будут храниться в директории `/opt/marzban`.
:::
Сначала, запустите данную команду

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```

::: tip После установки
- На экране появится логи Marzban, которые можно остановить, нажав `Ctrl+C`.
- По умолчанию панель будет работать на порту 8000, и вы можете получить доступ к ней через `http://YOUR_SERVER_IP:8000/dashboard/`.
:::

Далее создайте администратора, выполнив следующую команду.
```bash
marzban cli admin create --sudo
```

Теперь вы можете войти в панель Marzban, используя заданные вами имя пользователя и пароль.

Чтобы просмотреть руководство по скрипту Marzban, вы можете выполнить следующую команду:
```bash
marzban --help
```

Чтобы изменить настройки по умолчанию, вы можете открыть файл `/opt/marzban/.env` и изменить нужные переменные. Затем перезапустите Marzban с помощью следующей команды.


::: details Редактирование файла с помощью nano
Самый простой способ отредактировать файл `.env` - использовать редактор `nano`. Откройте файл с помощью следующей команды.
``bash
nano /opt/marzban/.env
```
Примените изменения и сохраните файл, нажав `Ctrl+s`. Затем выйдите из редактора, нажав `Ctrl+x`.
:::
```bash
marzban restart
```

To view the list of variables, refer to the [Configuration](configuration.md) section.

## Ручная установка (Продвинутая)

::: warning Внимание
Ручная установка Marzban не рекомендуется для непрофессионалов. Если у вас хватит терпения изучить документацию или вы знакомы со средой программирования и Linux, попробуйте установить таким способом.

Также, при ручной установке скрипт Marzban недоступен, и вам необходимо быть знакомым с `git` для обновлений.
:::

Сначала вам нужно установить Xray на ваш сервер.
Рекомендуется сделать это с помощью скрипта [Xray-install](https://github.com/XTLS/Xray-install).

```bash
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```

Затем клонируйте репозиторий и установите необходимые условия.
::: warning Внимание
Marzban совместим с Python 3.8 и более поздними версиями. Если возможно, рекомендуется использовать Python 3.10.
:::

::: details Установка pip
Если команда pip не установлена на вашем сервере, установите его, выполнив следующую команду.

```bash
wget -qO- https://bootstrap.pypa.io/get-pip.py | python3 -
```
:::


::: details Установка в virtualenv 
Если вы программист и знакомы с virtualenv, рекомендуется использовать [Virtualenv](https://pypi.org/project/virtualenv/)
```bash
python3 -m pip install virtualenv
python3 -m virtualenv .venv
# activation
source .venv/bin/activate
# deactivation
deactivate
```
:::

```bash
git clone https://github.com/Gozargah/Marzban.git
cd Marzban
python3 -m pip install -r requirements.txt
```

Теперь, чтобы создать базу данных, выполните следующую команду.
```bash
alembic upgrade head
```
Создайте копию файла `.env.example` с именем `.env`. Вы можете использовать этот файл для установки переменных окружения. Для получения дополнительной информации смотрите раздел [Конфигурация](configuration.md).

```bash
cp .env.example .env
```

Чтобы использовать `marzban-cli`, вам нужно связать его с файлом в вашем `$PATH`, сделать его исполняемым и установить автозаполнение:


```bash
sudo ln -s $(pwd)/marzban-cli.py /usr/bin/marzban-cli
sudo chmod +x /usr/bin/marzban-cli
marzban-cli completion install
```

Чтобы создать администратора (суперпользователя) с `marzban-cli`, выполните следующую команду.

```bash
marzban-cli admin create --sudo
```

Теперь вы можете запустить Marzban, выполнив следующую команду.

```bash
python3 main.py
```

По умолчанию Marzban будет работать на порту 8000. (Вы можете изменить его, изменив значение `UVICORN_PORT`).


::: details Установка службы Marzban в systemctl
Для установки службы Marzban можно использовать скрипт install_service.sh в файлах Marzban.

```bash
sudo chmod +x install_service.sh
sudo ./install_service.sh
# enable and start marzban service
sudo systemctl enable --now marzban.service
```
:::

::: details Marzban с Nginx (SSL включен)
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name marzban.example.com;

    ssl_certificate      /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/example.com/privkey.pem;

    location ~* /(dashboard|api|docs|redoc|openapi.json) {
        proxy_pass http://0.0.0.0:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
:::
