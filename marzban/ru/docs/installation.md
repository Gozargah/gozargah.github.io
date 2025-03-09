---
title: Установка
---

# Установка Marzban


## Быстрая установка (рекомендуется)
::: tip Примечания перед установкой
При выполнении команды быстрой установки:
- Docker будет установлен на вашу машину, и Marzban будет запущен с помощью Docker.
- Команда `marzban` будет доступна на вашей машине.
- Данные Marzban будут храниться в директории `/var/lib/marzban`.
- Файлы приложения Marzban (`docker-compose.yml` и `.env`) будут храниться в директории `/opt/marzban`.
:::
Сначала выполните следующую команду.

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
::: tip После установки
- Будут отображаться логи Marzban, которые можно остановить, нажав `Ctrl+C`.
- Панель управления по умолчанию будет запущена на порту 8000, и вы можете получить к ней доступ по адресу `http://YOUR_SERVER_IP:8000/dashboard/`.
:::

Затем создайте администратора с правами sudo (главного администратора), выполнив следующую команду.
```bash
marzban cli admin create --sudo
```

Теперь вы можете войти в панель управления Marzban, используя имя пользователя и пароль, которые вы указали.

Кроме того, вы можете просмотреть справку по скрипту Marzban, выполнив следующую команду.
```bash
marzban --help
```

Чтобы изменить настройки по умолчанию, вы можете открыть файл `/opt/marzban/.env`, изменить нужные переменные и перезапустить Marzban с помощью следующей команды.

::: details Редактирование файла с помощью nano
Самый простой способ редактирования файла `.env` - использование редактора `nano`.
Откройте файл с помощью следующей команды.
```bash
nano /opt/marzban/.env
```
Внесите изменения и сохраните файл, нажав `Ctrl+s`. Затем выйдите из редактора, нажав `Ctrl+x`.
:::
```bash
marzban restart
```

Чтобы просмотреть список переменных, обратитесь к разделу [Конфигурация](configuration.md).

## Ручная установка (продвинутая)

::: warning Внимание
Ручная установка Marzban не рекомендуется для неопытных пользователей. Если у вас есть терпение читать документацию или вы знакомы с программированием и Linux, попробуйте этот метод установки.

Также при ручной установке скрипт Marzban недоступен, и для обновления вам нужно знать, как использовать `git`.
:::

Сначала вам нужно установить Xray на вашу машину.
Рекомендуется сделать это с помощью скрипта [Xray-install](https://github.com/XTLS/Xray-install).

```bash
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```

Затем клонируйте проект и установите зависимости.
::: warning Внимание
Marzban совместим с Python 3.8 и более новыми версиями.
По возможности рекомендуется Python 3.10.
:::

::: details Установка pip
Если команда `pip` не установлена на вашей машине, установите ее, выполнив следующую команду.
```bash
wget -qO- https://bootstrap.pypa.io/get-pip.py | python3 -
```
:::

::: details Установка в virtualenv
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

Теперь для создания базы данных выполните следующую команду.
```bash
alembic upgrade head
```

Создайте копию файла `.env.example` с именем `.env`. Вы можете использовать этот файл для установки переменных окружения. Для получения дополнительной информации см. раздел [Конфигурация](configuration.md).

```bash
cp .env.example .env
```

Чтобы использовать `marzban-cli`, вы должны связать его с файлом в вашем `$PATH`, сделать его исполняемым и установить автозавершение:

```bash
sudo ln -s $(pwd)/marzban-cli.py /usr/bin/marzban-cli
sudo chmod +x /usr/bin/marzban-cli
marzban-cli completion install
```

Чтобы создать администратора с правами sudo (главного администратора) с помощью `marzban-cli`, выполните следующую команду.

```bash
marzban-cli admin create --sudo
```

Теперь вы можете запустить Marzban, выполнив следующую команду.

```bash
python3 main.py
```
Marzban по умолчанию будет запущен на порту 8000. (Вы можете изменить это, изменив значение `UVICORN_PORT`.)

::: details Установка службы Marzban в systemctl
Для установки службы Marzban вы можете использовать скрипт `install_service.sh` из файлов Marzban.
```bash
sudo chmod +x install_service.sh
sudo ./install_service.sh
# включение и запуск службы marzban
sudo systemctl enable --now marzban.service
```
:::

::: details Marzban за nginx
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