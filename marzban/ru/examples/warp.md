---
title: Активация CloudFlare Warp
---

# Активация CloudFlare Warp

С помощью этого руководства вы можете устранить некоторые ограничения, наложенные на ваш IP крупными компаниями, такими как Google и Spotify, и без проблем пользоваться их сервисами.

::: warning
Обратите внимание, что для конфигураций Warp существует ограничение на одновременное подключение максимум 5 устройств. Чтобы обойти это ограничение, можно использовать несколько конфигураций.
:::

## Шаг первый: Создание конфигурации Wireguard

### Способ первый: с использованием Windows

- Сначала скачайте необходимый `Asset` из раздела [releases](https://github.com/ViRb3/wgcf/releases); этот файл различается в зависимости от процессора.
- Переименуйте скачанный файл в `wgcf`.
- Затем в адресной строке Проводника введите `cmd.exe`.

![image](https://github.com/Gozargah/gozargah.github.io/assets/50927468/fb9f3eae-8390-45a5-a7b3-c50db4aa82a1)

- В открывшемся терминале введите команду `wgcf.exe`.
- Выполните команду `wgcf.exe register`, а затем `wgcf.exe generate`.
- Будет создан новый файл с именем `wgcf-profile.conf`, который является необходимой конфигурацией для Wireguard.
- Ваша конфигурация готова, и вы можете её использовать.

### Способ второй: с использованием Linux

- Сначала скачайте необходимый `Asset` из раздела [releases](https://github.com/ViRb3/wgcf/releases); этот файл различается в зависимости от процессора.
- Вы можете выполнить эту задачу с помощью команды `wget`.

Для процессоров с архитектурой AMD64:
```bash
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.22/wgcf_2.2.22_linux_amd64
```
Для процессоров с архитектурой ARM64:
```bash
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.22/wgcf_2.2.22_linux_arm64
```
Переместите скачанный файл в каталог `/usr/bin/` и переименуйте его в `wgcf`.

Для архитектуры AMD64:
```bash
mv wgcf_2.2.22_linux_amd64 /usr/bin/wgcf
chmod +x /usr/bin/wgcf
```
Для архитектуры ARM64:
```bash
mv wgcf_2.2.22_linux_arm64 /usr/bin/wgcf
chmod +x /usr/bin/wgcf
```
Затем создайте конфигурацию, выполнив следующие две команды:
```bash
wgcf register
wgcf generate
```
Будет создан файл с именем `wgcf-profile.conf`, который является необходимой конфигурацией.

## Шаг второй: Использование Warp+ (необязательно)

- Чтобы получить лицензию и воспользоваться Warp+, вы можете обратиться к [этому](https://t.me/generatewarpplusbot) Telegram-боту для получения `license_key`.
- После получения `license_key` замените его в файле `wgcf-account.toml`.
::: tip Примечание
Эту замену можно выполнить в Linux с помощью `nano` или в Windows с помощью `Notepad` (или любого другого текстового редактора).
:::
::: details Windows
Для использования команд в Windows вместо команды `wgcf` используйте `wgcf.exe`.
:::
Затем обновите данные конфигурации:
```bash
wgcf update
```
После этого создайте новый конфигурационный файл:
```bash
wgcf generate
```

## Шаг третий: Активация Warp в Marzban

### Способ первый: с использованием ядра Xray

::: warning Внимание
- Этот метод рекомендуется только для версии Xray 1.8.3 и выше; в более старых версиях возможно возникновение проблемы утечки памяти.
- Если ваша версия Xray ниже указанной, вы можете обновить её с помощью [руководства по смене версии Xray-core](/examples/change-xray-version).
:::

- Перейдите в раздел Core Setting в панели управления Marzban.
- Сначала добавьте outbound, как в примере, и вставьте в него данные из файла `wgcf-profile.conf`.

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
Если вы хотите, чтобы весь трафик по умолчанию проходил через Warp, разместите этот outbound первым, и выполнение следующих шагов станет необязательным.
:::

### Способ второй: с использованием ядра Wireguard

Сначала установите необходимые компоненты для использования Wireguard на сервере.

```bash
sudo apt install wireguard-dkms wireguard-tools resolvconf
```
Если вы используете Ubuntu 24, для установки Wireguard выполните команду:
```bash
sudo apt install wireguard
```
Затем добавьте строку `Table = off` в файл конфигурации Wireguard, как в примере:

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
Если не добавить строку `Table = off`, вы потеряете доступ к серверу. В таком случае вам придется зайти через сайт вашего дата-центра и отключить соединение с Warp, чтобы восстановить обычное подключение.
:::

- Переименуйте файл `wgcf-profile.conf` в `warp.conf`.
- Переместите файл в каталог `/etc/wireguard` на сервере.

```bash
sudo mv wgcf-profile.conf /etc/wireguard/warp.conf
```
- Активируйте Wireguard с помощью команды:

```bash
sudo systemctl enable --now wg-quick@warp
```

Чтобы деактивировать Warp, выполните команду:

```bash
sudo systemctl disable --now wg-quick@warp
```

- Перейдите в раздел Core Setting в панели управления Marzban.
- Добавьте outbound, как в примере:

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
Если вы хотите, чтобы весь трафик по умолчанию проходил через Warp, разместите этот outbound первым, и выполнение следующих шагов станет необязательным.
:::

## Шаг четвёртый: Настройка раздела routing

Сначала добавьте правило в разделе routing, как в примере:

```json
{
  "outboundTag": "warp",
  "domain": [],
  "type": "field"
}
```

Затем добавьте нужные вам сайты, как в примере:

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

Сохраните изменения — теперь вы можете использовать Warp.
::: details Marzban-Node

- Если вы используете Warp с помощью ядра Xray, изменения автоматически применяются и на ноде.
- Если вы используете ядро Wireguard, то аналогичные изменения (Шаг третий, Способ второй) нужно выполнить и на ноде.
:::
