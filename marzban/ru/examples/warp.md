---
title: Настройка WARP
description: В данном руководстве мы осуществим настройку подключений через cloudflare warp

---

Используя это руководство, вы можете снять некоторые ограничения, налагаемые крупными компаниями, такими как Google, Spotify и т.п., на IP-адрес Вашего сервера и без проблем получать доступ к ним, используя мощности Cloudflare WARP

:::note
Для WARP+ есть ограничение на 5 устройств, но в нашем контексте, устройством будет являться сервер.
Соответсвенно, он разрешит подключение с пяти серверов.

Например: центральный сервер и четыре узла.

Клиентов, которые подключены к этим серверам может быть сколько угодно.
:::

## Вариант 1

### Создание конфигурации Wireguard

Для начала вам необходимо скачать нужный [`Asset`](https://github.com/ViRb3/wgcf/releases) из раздела релизов , этот файл разный в зависимости от процессора.

```bash
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.22/wgcf_2.2.22_linux_amd64
```

Перемещаем скачанный файл в `/usr/bin/` и меняем его имя на `wgcf`

```bash
mv wgcf_2.2.22_linux_amd64 /usr/bin/wgcf && chmod +x /usr/bin/wgcf
```

Затем создайте конфигурацию, используя эти две команды

```bash
wgcf register
wgcf generate
```

Вы создали файл конфигурации `wgcf-profile.conf`

### Использование Warp+ (необязательно)

Чтобы получить лицензию и использовать Warp+, вы можете получить `license key` через [этого](https://t.me/generatewarpplusbot) Telegram-бота

После его получения необходимо заменить `license_key` в файле `wgcf-account.toml`

Затем вам необходимо обновить информацию о конфигурации.

```bash
wgcf update
```

Затем вам нужно создать новый файл конфигурации.

```bash
wgcf generate
```

### Активация WARP в Marzban

Вам необходимо отредактировать ваш `xray_config.json` добавив в него новый `OUTBOUND` как в примере ниже, заполнив его данными из`wgcf-profile.conf`

```json
// /var/lib/marzban/xray_config.json
{
  "tag": "WARP",
  "protocol": "wireguard",
  "settings": {
    "secretKey": "",
    "DNS": "1.1.1.1",
    "address": ["172.16.0.2/32", "2606:4700:110:8381:7328:468f:78ff:a1f5/128"],
    "peers": [
      {
        "publicKey": "",
        "endpoint": "engage.cloudflareclient.com:2408"
      }
    ],
    "kernelMode": false
  }
}
```

### Настройки раздела маршрутизации

Вам необходимо отредактировать ваш `xray_config.json` добавив в него новый `RULES` как в примере ниже, указав, какие сайты будут отправлять через `WARP`

```json
// /var/lib/marzban/xray_config.json
{
  "outboundTag": "WARP",
  "domain": ["geosite:google", "geosite:openai"],
  "type": "field"
}
```

## Вариант 2

### Создание тунеля

Устанавливаем WARP-cli

```bash
cd && bash <(curl -fsSL git.io/warp.sh) proxy
```

### Активация WARP в Marzban

Вам необходимо отредактировать ваш `xray_config.json` добавив в него новый `OUTBOUND` как в примере ниже

```json
// /var/lib/marzban/xray_config.json
{
  "tag": "warp",
  "protocol": "socks",
  "settings": {
    "servers": [
      {
        "address": "127.0.0.1",
        "port": 40000
      }
    ]
  }
}
```

### Настройки раздела маршрутизации

Вам необходимо отредактировать ваш `xray_config.json` добавив в него новый `RULES` как в примере ниже, указав, какие сайты будут отправлять через `WARP`

```json
// /var/lib/marzban/xray_config.json
{
  "outboundTag": "warp",
  "domain": ["geosite:google", "geosite:openai"],
  "type": "field"
}
```
