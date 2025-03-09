---
title: Активация CloudFlare Warp
---

# Активация CloudFlare Warp

С помощью этой инструкции вы сможете обойти некоторые ограничения, наложенные на ваш IP крупными компаниями, такими как Google и Spotify, и без проблем пользоваться их сервисами.

::: warning
Обратите внимание, что для конфигураций Warp существует ограничение на одновременное подключение максимум 5 устройств. Для решения этой проблемы вы можете использовать несколько конфигураций.
:::

## Шаг первый: Создание конфигурации Wireguard

### Первый способ: С использованием Windows

- Сначала вам нужно скачать необходимый `Asset` из раздела [releases](https://github.com/ViRb3/wgcf/releases), этот файл зависит от вашего процессора.
- Переименуйте файл `Asset` в `wgcf`.
- Теперь в адресной строке File Explorer введите `cmd.exe`.

![image](https://github.com/Gozargah/gozargah.github.io/assets/50927468/fb9f3eae-8390-45a5-a7b3-c50db4aa82a1)

- В открывшемся терминале введите `wgcf.exe`.
- Один раз введите команду `wgcf.exe register`, а затем `wgcf.exe generate`.
- Будет создан новый файл с именем `wgcf-profile.conf`, и это необходимый нам файл `Wireguard`.
- Ваша конфигурация готова, и вы можете её использовать.

### Второй способ: С использованием Linux

- Сначала вам нужно скачать необходимый `Asset` из раздела [releases](https://github.com/ViRb3/wgcf/releases), этот файл зависит от вашего процессора.
- Вы можете сделать это с помощью команды `wget`.

Для процессоров архитектуры AMD64:
```bash
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.22/wgcf_2.2.22_linux_amd64
```
Для процессоров архитектуры ARM64:
```bash
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.22/wgcf_2.2.22_linux_arm64
```
Измените путь файла на `/usr/bin/` и переименуйте его в `wgcf`.

Для процессоров архитектуры AMD64:
```bash
mv wgcf_2.2.22_linux_amd64 /usr/bin/wgcf
chmod +x /usr/bin/wgcf
```
Для процессоров архитектуры ARM64:
```bash
mv wgcf_2.2.22_linux_arm64 /usr/bin/wgcf
chmod +x /usr/bin/wgcf
```
Затем создайте конфигурацию с помощью этих двух команд.
```bash
wgcf register
wgcf generate
```
Будет создан файл с именем `wgcf-profile.conf`, и это необходимая нам конфигурация.

## Шаг второй: Использование Warp+ (опционально)

- Для получения лицензии и использования Warp+ вы можете получить `license_key` через [этот](https://t.me/generatewarpplusbot) телеграм-бот.
- После получения `license_key` вам нужно заменить его в файле `wgcf-account.toml`.
::: tip Примечание
 Это изменение вы можете сделать в Linux с помощью `nano`, а в Windows с помощью `Notepad` или любого другого редактора.
:::
::: details Windows
Для использования команд в Windows вам нужно использовать `wgcf.exe` вместо `wgcf`.
:::
Затем вам нужно обновить информацию конфигурации.
```bash
wgcf update
```
Затем вам нужно создать новый файл конфигурации.
```bash
wgcf generate
```

## Шаг третий: Активация Warp в Marzban

### Первый способ: С использованием ядра Xray

::: warning Внимание
- Этот метод рекомендуется только для версии Xray 1.8.3 или выше, в более старых версиях вы, вероятно, столкнетесь с проблемой утечки памяти (Memory Leak).
- Если версия вашего `Xray` ниже этой версии, вы можете обновить версию `Xray` с помощью [инструкции по изменению версии Xray-core](/examples/change-xray-version).
:::

- Перейдите в раздел Core Setting в панели Marzban.
- Сначала добавляем outbound, как в примере, и вставляем в него информацию из файла `wgcf-profile.conf`.

```json
{
  "tag": "warp",
  "protocol": "wireguard",
  "settings": {
    "secretKey": "Your_Secret_Key",
    "DNS": "1.1.1.1",
    "address": ["172.16.0.2/32", "2606:4700:110:8756:9135:af04:3778:40d9/128"],
    "peers": [
      {
        "publicKey": "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=",
        "endpoint": "engage.cloudflareclient.com:2408"
      }
    ],
    "kernelMode": false
  }
}
```

::: tip Примечание
Если вы хотите, чтобы весь трафик по умолчанию проходил через Warp, поместите этот Outbound первым, и вам не нужно выполнять следующий шаг.
:::

### Второй способ: С использованием ядра Wireguard

Сначала вам нужно установить на сервер необходимые компоненты для использования Wireguard.

```bash
sudo apt install wireguard-dkms wireguard-tools resolvconf
```
Если вы используете Ubuntu 24, для установки wireguard используйте следующую команду.
```bash
sudo apt install wireguard
```
Затем вам нужно добавить выражение `Table = off` в файл Wireguard, как в примере.

```conf
[Interface]
PrivateKey = Your_Private_Key
Address = 172.16.0.2/32
Address = 2606:4700:110:8a1a:85ef:da37:b891:8d01/128
DNS = 1.1.1.1
MTU = 1280
Table = off
[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0
Endpoint = engage.cloudflareclient.com:2408
```

::: warning Внимание
Если не добавить `Table = off`, ваш доступ к серверу будет прерван, и вы больше не сможете подключиться к серверу. Вам придется войти на сервер через веб-сайт вашего дата-центра и отключить соединение с `Warp`, чтобы снова установить нормальное соединение.
:::

- Затем переименуйте файл с `wgcf-profile.conf` на `warp.conf`.
- Поместите файл в папку `/etc/wireguard` на сервере.

```bash
sudo mv wgcf-profile.conf /etc/wireguard/warp.conf
```
- Активируйте Wireguard с помощью следующей команды.

```bash
sudo systemctl enable --now wg-quick@warp
```

С помощью этой команды вы также можете отключить `Warp`

```bash
sudo systemctl disable --now wg-quick@warp
```

- Перейдите в раздел Core Setting в панели Marzban.
- Сначала добавьте outbound, как в примере.

```json
{
  "tag": "warp",
  "protocol": "freedom",
  "streamSettings": {
    "sockopt": {
      "tcpFastOpen": true,
      "interface": "warp"
    }
  }
}
```

::: tip Примечание
Если вы хотите, чтобы весь трафик по умолчанию проходил через Warp, поместите этот Outbound первым, и вам не нужно выполнять следующий шаг.
:::

## Шаг четвертый: Настройка раздела routing

Сначала добавляем `rule` в раздел `routing`, как в примере.

```json
{
  "outboundTag": "warp",
  "domain": [],
  "type": "field"
}
```

Теперь вам нужно добавить желаемые веб-сайты, как в примере.

```json
{
    "outboundTag": "warp",
    "domain": [
        "geosite:google",
        "openai.com",
        "ai.com",
        "ipinfo.io",
        "iplocation.net",
        "spotify.com"
    ],
    "type": "field"
}
```

Сохраняем изменения, теперь вы можете использовать `Warp`.
::: details Marzban-Node

- Если вы используете `Warp` с помощью ядра xray, вам не нужно вносить изменения в ноду, и они будут применены автоматически.

- Если вы используете ядро `Wireguard`, вам нужно выполнить шаг третий, второй способ, также на ноде.
  :::
