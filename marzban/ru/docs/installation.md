---
title: Installation
---

# Marzban Installation


## Quick Installation (Recommended)
::: tip Pre-installation Notes
By running the quick installation command:
- Docker will be installed on your machine and Marzban will be executed using Docker.
- The `marzban` command will be available on your machine.
- Marzban data will be stored in the `/var/lib/marzban` directory.
- Marzban application files (`docker-compose.yml` and `.env`) will be stored in the `/opt/marzban` directory.
:::
First, execute the following command.

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```

::: tip After Installation
- The Marzban logs will be displayed, and you can stop it by pressing `Ctrl+C`.
- The dashboard will be running on port 8000 by default, and you can access it through `http://YOUR_SERVER_IP:8000/dashboard/`.
:::

Next, create a sudo admin by executing the following command.
```bash
marzban cli admin create --sudo
```

Now you can log in to the Marzban dashboard using the username and password you have set.

To view the Marzban script guide, you can execute the following command:
```bash
marzban --help
```

To modify the default settings, you can open the `/opt/marzban/.env` file and change the desired variables. Then, restart Marzban using the following command.

::: details Editing the file with nano
The easiest way to edit the `.env` file is to use the `nano` editor. Open the file with the following command.
```bash
nano /opt/marzban/.env
```
Apply your changes and save the file by pressing `Ctrl+s`. Then, exit the editor by pressing `Ctrl+x`.
:::
```bash
marzban restart
```

To view the list of variables, refer to the [Configuration](configuration.md) section.

## Manual Installation (Advanced)

::: warning Attention
Manual installation of the Marzban is not recommended for non-professionals. If you have the patience to study the documentation or are familiar with the programming environment and Linux, try installing this way.

Also, in manual installation, the Marzban script is not available and you need to be familiar with `git` for updates.
:::

First, you need to install Xray on your machine.
It is recommended to do this with the [Xray-install](https://github.com/XTLS/Xray-install) script.

```bash
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```

Then clone the project and install the prerequisites.
::: warning Attention
Marzban is compatible with Python 3.8 and higher versions. If possible, Python 3.10 is recommended.
:::

::: details Install pip
If the pip command is not installed on your machine, install it by running the following command.

```bash
wget -qO- https://bootstrap.pypa.io/get-pip.py | python3 -
```
:::


::: details Install in virtualenv If you are a programmer and are familiar with the virtual environment, it is recommended to use [Virtualenv](https://pypi.org/project/virtualenv/)
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

Now to build the database, run the following command.
```bash
alembic upgrade head
```

Create a copy of the `.env.example` file named `.env`. You can use this file to set environment variables. For more information, see the [Configuration](configuration.md) section.

```bash
cp .env.example .env
```

To use `marzban-cli`, you need to link it to a file in your `$PATH`, make it executable, and install its auto-completion:


```bash
sudo ln -s $(pwd)/marzban-cli.py /usr/bin/marzban-cli
sudo chmod +x /usr/bin/marzban-cli
marzban-cli completion install
```

To create a sudo admin (superuser) with `marzban-cli`, run the following command.
```bash
marzban-cli admin create --sudo
```

Now you can run Marzban by running the following command.

```bash
python3 main.py
```
Marzban will run on port 8000 by default. (You can change it by changing the value of `UVICORN_PORT`.)


::: details Install the Marzban service in systemctl
To install the Marzban service, you can use the install_service.sh script in the Marzban files.

```bash
sudo chmod +x install_service.sh
sudo ./install_service.sh
# enable and start marzban service
sudo systemctl enable --now marzban.service
```
:::

::: details Marzban with Nginx (SSL enabled)
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
