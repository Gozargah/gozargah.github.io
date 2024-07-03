---
title: Настройка подключений на одном порту
---



С помощью этого руководства Вы сможете установить все соединения с вашим сервером (панель, TLS-конфигурация и REALITY) через один порт.
Целью этого, является задача сделать подключения к серверу более естественным и обойти ограничения на одном порту.

В этом руководстве мы используем инструмент HAProxy для достижения нашей цели.
:::note
В дальнейшем предполагается, что:

- поддомен панели - `panel.example.com`
- поддомен подписки - `sub.example.com`
- поддомен, связанный с CDN - `cdn.example.com`
- SNI в конфигурации REALITY - `reality_domain.com`

Не забудьте во всех примерах изменить их на свои
:::

Итак, в этом руководстве мы сначала установим и настроим HAProxy, а затем внесем необходимые изменения в конфигурации и панель, чтобы принимать весь трафик на один порт.

## Установка и настройка HAProxy

:::tip
В этом руководстве мы устанавливаем HAProxy непосредственно на сервере; если вы хотите, вы также можете установить его в контейнере Docker.

Кроме того, если в будущем вы планируете применять более сложные правила, не забудьте установить HAProxy из его основного репозитория, а не из репозиториев Linux.
:::

Сначала выполните следующие команды для установки:

```bash
apt update
apt install -y haproxy
```

После установки файл конфигурации HAProxy будет находиться по адресу `/etc/haproxy/haproxy.cfg`.

Откройте этот файл с помощью редактора nano для редактирования.

```bash
nano /etc/haproxy/haproxy.cfg
```

Настройки HAProxy включают один или несколько фронтендов и один или несколько бэкендов.
Каждый фронтенд направляет трафик к одному из бэкендов на основе определенных в нем правил. Понимание этих двух принципов в конфигурации HAProxy помогает нам настроить его более эффективно.

При внимательном рассмотрении этой конфигурации вы заметите, что с ее помощью HAProxy прослушивает порт 443 и принимает весь трафик. Затем, в зависимости от SNI (Server Name Indication) полученного трафика, он перенаправляет его на «локальный» порт сервера, что позволяет нам различать разные виды трафика.

Теперь добавьте следующую конфигурацию в конец файла, внесите необходимые изменения в соответствии с инструкциями и сохраните его.

:::note
Если у Вас панель и подписка на одном домене или на одном домене без саб-доменов, или Вы не используете CDN, Вы можете смело удалять соответсвующие правила и бэкенды
:::
:::tip
Вы можете использовать `or` для перечисления правил:

`use_backend reality if { req.ssl_sni -i end reality_domain.com } or { req.ssl_sni -i end another_reality_domain.com }`
:::

```yaml
listen front
    mode tcp
    bind *:443

    tcp-request inspect-delay 5s
    tcp-request content accept if { req_ssl_hello_type 1 }

    # Правило ухода на бэкенд reality если SNI reality_domain.com
    use_backend reality if { req.ssl_sni -i end reality_domain.com }
    # Правило ухода на бэкенд fallback если SNI cdn.example.com
    use_backend fallback if { req.ssl_sni -i end  cdn.example.com }
    # Правило ухода на бэкенд panel если SNI sub.example.com
    use_backend sub if { req.ssl_sni -i end  sub.example.com }
    # Правило ухода на бэкенд panel если SNI panel.example.com
    use_backend panel if { req.ssl_sni -i end  panel.example.com }

# Обьявляем backend reality c адресом:портом принимаюшей стороны при срабатывания правила
backend reality
    mode tcp
    server srv1 127.0.0.1:12000 send-proxy-v2 tfo
# Обьявляем backend fallback c адресом:портом принимаюшей стороны при срабатывания правила
backend fallback
    mode tcp
    server srv1 127.0.0.1:11000
# Обьявляем backend sub c адресом:портом принимаюшей стороны при срабатывания правила
backend sub
    mode tcp
    server srv1 127.0.0.1:10000
# Обьявляем backend panel c адресом:портом принимаюшей стороны при срабатывания правила
backend panel
    mode tcp
    server srv1 127.0.0.1:10000

```

После замены своих доменов и размещения этой конфигурации в конце указанного файла, выполните следующую команду для перезапуска HAProxy и завершения данного этапа настройки.

```bash
systemctl restart haproxy
```

## Подготовка конфигураций

### Подготовка конфигурации REALITY

Предположим, что вы хотите иметь несколько разных инбаундов для каждого своего узла или несколько разных инбаундов с разными SNI. Если вы просто разместите эти инбаунды один под другим и установите для них одинаковые порты, возникнут проблемы соединения и фактически связь будет невозможна.

Единый порт для конфигураций решает эту проблему. Для этого вам нужно изменить настройки своих конфигураций следующим образом

:::note
обратите внимание на строки 3, 4 и 13
:::

:::danger
Если конфигурация имеет `send-proxy` в конце бэкенда HAProxy , но не имеет `acceptProxyProtocol: true`, соединение не будет установлено.
:::

:::danger
обратите внимание что нужно заменить данные в `dest`, `serverNames`, `privateKey` на свои
:::

:::note
для Reality генерация `privateKey` выполняется

```bash
docker exec marzban-marzban-1 xray x25519
```

:::

```json
{
  "tag": "VLESS_TCP_REALITY",
  "listen": "127.0.0.1",
  "port": 12000,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
      "acceptProxyProtocol": true
    },
    "security": "reality",
    "realitySettings": {
      "show": false,
      "dest": "reality_domain.com:443",
      "xver": 0,
      "serverNames": ["reality_domain.com"],
      "privateKey": "x",
      "shortIds": [""]
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": ["http", "tls"]
  }
}
```

С этими изменениями ваши инбаунды будут слушать не на 0.0.0.0, а на 127.0.0.1, и вы сможете создавать любое количество инбаундов с разными локальными портами и разделять их в HAProxy на основе SNI.

### Подготовка конфигураций с TLS

Чтобы иметь все типы конфигураций с TLS, например для CDN, на одном порту, мы используем fallback xray-core.

Сначала нам понадобится fallback инбаунд. Для этого вы можете использовать следующий пример инбаунда:

```json
{
  "tag": "TROJAN_FALLBACK_INBOUND",
  "port": 11000,
  "protocol": "trojan",
  "settings": {
    "clients": [],
    "decryption": "none",
    "fallbacks": [
      {
        "path": "/lw",
        "dest": "@vless-ws",
        "xver": 2
      },
      {
        "path": "/mw",
        "dest": "@vmess-ws",
        "xver": 2
      },
      {
        "path": "/tw",
        "dest": "@trojan-ws",
        "xver": 2
      }
    ]
  },
  "streamSettings": {
    "network": "tcp",
    "security": "tls",
    "tlsSettings": {
      "serverName": "SERVER_NAME",
      "certificates": [
        {
          "ocspStapling": 3600,
          "certificateFile": "/var/lib/marzban/certs/fullchain.pem",
          "keyFile": "/var/lib/marzban/certs/key.pem"
        }
      ],
      "minVersion": "1.2",
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256",
      "alpn": ["http/1.1"]
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": ["http", "tls"]
  }
}
```

Для лучшего использования этой возможности полезно понять ее концепцию и работу.

fallback работает следующим образом: если входящий трафик соответствует этому инбаунду, он принимается, а если нет, он перенаправляется на другие инбаунды в соответствии с путем (path). Поэтому, после размещения этого инбаунда с fallback, мы определяем несколько других инбаундов, каждый с указанным путем (если у вас уже есть такие инбаунды, достаточно изменить значение listen на предопределенные значения (`@vless-ws`, `@vmess-ws` и `@trojan-ws`) и добавить их путь в инбаунд с fallback.

Итак, инбаунд с fallback отправляет трафик на другие инбаунды в зависимости от пути каждого из входящих трафиков:

- `path = /lw -> listen: "@vless-ws"`
- `path = /mw -> listen: "@vmess-ws"`
- `path = /tw -> listen: "@trojan-ws"`

Итак, в соответствии с приведенным выше примером, вам просто нужно сделать разделы listen и path ваших конфигураций входящих соответствующими конфигурации fallback, чтобы все конфигурации выполнялись на одном порту.

Пример таких конфигураций:

```json
{
    "tag": "VLESS_WS_INBOUND",
    "listen": "@vless-ws",
    "protocol": "vless",
    "settings": {
        "clients": [],
        "decryption": "none"
        },
    "streamSettings": {
        "network": "ws",
        "security": "none",
        "wsSettings": {
            "acceptProxyProtocol": true,
            "path": "/lw"
            }
        },
    "sniffing": {
        "enabled": true,
        "destOverride": [
            "http",
            "tls"
            ]
        }
},
{
    "tag": "VMESS_WS_INBOUND",
    "listen": "@vmess-ws",
    "protocol": "vmess",
    "settings": {
        "clients": []
        },
    "streamSettings": {
        "network": "ws",
        "security": "none",
        "wsSettings": {
        "acceptProxyProtocol": true,
            "path": "/mw"
            }
        },
    "sniffing": {
    "enabled": true,
    "destOverride": [
        "http",
        "tls"
        ]
    }
},
{
    "tag": "TROJAN_WS_INBOUND",
    "listen": "@trojan-ws",
    "protocol": "trojan",
    "settings": {
        "clients": []
    },
    "streamSettings": {
        "network": "ws",
        "security": "none",
            "wsSettings": {
                "acceptProxyProtocol": true,
                "path": "/tw"
            }
        },
    "sniffing": {
        "enabled": true,
        "destOverride": [
            "http",
            "tls"
            ]
        }
}
```

:::tip
Использование fallback увеличивает нагрузку на сервер. Вы можете установить разные поддомены для каждой из ваших конфигураций и использовать один и тот же HAProxy без необходимости перехода к однопортовым конфигурациям с TLS.
:::

Теперь, если вы использовали этот метод для объединения ваших входящих с помощью fallback, откройте файл `.env` и установите следующую переменную равной вашему тегу входящего fallback:

```
XRAY_FALLBACKS_INBOUND_TAG = "TROJAN_FALLBACK_INBOUND"
```

## Подготовка панели управления

Как уже упоминалось, нашей целью является наличие всех коммуникаций, включая панель управления (ссылку на подписку), на одном порту.

Ранее мы настроили параметры, относящиеся к панели управления, в конфигурации HAProxy, и в этом этапе достаточно сделать порт, на котором слушает панель, согласованным с HAProxy. Для этого вам просто нужно внести изменения в файл `.env` и установить переменные, указанные ниже, равными определенному значению (или тому, что вы ввели в HAProxy):

```
UVICORN_HOST = "127.0.0.1"
UVICORN_PORT = 10000
```

Теперь перезапустите Marzban:

```bash
marzban restart
```

## Подготовка хоста

Поскольку порт, указанный в inbound, является локальным портом, и фактически весь трафик идет на ваш сервер через порт 443, необходимо изменить порт на 443 в разделе хоста для созданных вами конфигураций, иначе порты по умолчанию устанавливаются для локальных конфигураций.

Так же Вы должны настроить свои TLS конфигурации

## Дополнительные замечания

:::danger
Настройки, связанные с HAProxy, должны быть выполнены на всех узлах сервера, или вы можете определить отдельные входящие для некоторых узлов сервера и прослушивать их напрямую на 0.0.0.0
:::
