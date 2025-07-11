---
title: Установка
---

# Установка Marzban

## Быстрая установка (рекомендуется)
::: tip Замечания перед установкой
При выполнении команды быстрой установки:
- Docker будет установлен на вашей машине, и Marzban будет запускаться с использованием Docker.
- Команда `marzban` станет доступна на вашей машине.
- Данные Marzban будут сохраняться в каталоге `/var/lib/marzban`.
- Файлы приложения Marzban (`docker-compose.yml` и `.env`) будут храниться в каталоге `/opt/marzban`.
:::
Сначала выполните следующую команду.

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```

::: tip После установки
- Будут отображаться логи Marzban, и вы сможете остановить его, нажав `Ctrl+C`.
- Панель управления будет работать по умолчанию на порту 8000, и вы можете получить к ней доступ по адресу `http://YOUR_SERVER_IP:8000/dashboard/`.
:::

Затем создайте администратора с привилегиями sudo, выполнив следующую команду.
```bash
marzban cli admin create --sudo
```

Теперь вы можете войти в панель управления Marzban, используя заданное имя пользователя и пароль.

Чтобы просмотреть руководство по скриптам Marzban, выполните следующую команду:
```bash
marzban --help
```

Чтобы изменить настройки по умолчанию, откройте файл `/opt/marzban/.env` и измените нужные переменные. Затем перезапустите Marzban, выполнив следующую команду.

::: details Редактирование файла с помощью nano
Проще всего редактировать файл `.env` с помощью редактора `nano`. Откройте файл командой:
```bash
nano /opt/marzban/.env
```
Внесите необходимые изменения и сохраните файл, нажав `Ctrl+s`. Затем выйдите из редактора, нажав `Ctrl+x`.
:::
```bash
marzban restart
```

Чтобы просмотреть список переменных, обратитесь к разделу [Конфигурация](configuration.md).

## Ручная установка (для продвинутых)

::: warning Внимание
Ручная установка Marzban не рекомендуется для непрофессионалов. Если у вас есть терпение изучить документацию или вы хорошо знакомы с программной средой и Linux, попробуйте установить таким способом.

Кроме того, при ручной установке скрипт Marzban недоступен, и вам необходимо знать `git` для обновлений.
:::

Сначала необходимо установить Xray на вашу машину. Рекомендуется сделать это с помощью скрипта [Xray-install](https://github.com/XTLS/Xray-install).

```bash
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```

Затем клонируйте проект и установите необходимые зависимости.
::: warning Внимание
Marzban совместим с Python 3.8 и выше. При возможности рекомендуется использовать Python 3.10.
:::

::: details Установка pip
Если на вашей машине не установлена команда pip, установите её, выполнив следующую команду.

```bash
wget -qO- https://bootstrap.pypa.io/get-pip.py | python3 -
```
:::

::: details Установка в виртуальном окружении
Если вы программист и знакомы с виртуальными окружениями, рекомендуется использовать [Virtualenv](https://pypi.org/project/virtualenv/).
```bash
python3 -m pip install virtualenv
python3 -m virtualenv .venv
# активация
source .venv/bin/activate
# деактивация
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

Чтобы использовать `marzban-cli`, необходимо создать символическую ссылку на него в вашем `$PATH`, сделать его исполняемым и установить автодополнение:

```bash
sudo ln -s $(pwd)/marzban-cli.py /usr/bin/marzban-cli
sudo chmod +x /usr/bin/marzban-cli
marzban-cli completion install
```

Чтобы создать администратора с привилегиями sudo (суперпользователя) с помощью `marzban-cli`, выполните следующую команду.
```bash
marzban-cli admin create --sudo
```

Теперь вы можете запустить Marzban, выполнив следующую команду.

```bash
python3 main.py
```
По умолчанию Marzban будет работать на порту 8000. (Вы можете изменить это, изменив значение переменной `UVICORN_PORT`.)

::: details Установка сервиса Marzban в systemctl
Чтобы установить сервис Marzban, вы можете использовать скрипт `install_service.sh`, входящий в состав файлов Marzban.

```bash
sudo chmod +x install_service.sh
sudo ./install_service.sh
# включение и запуск сервиса Marzban
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
