---
title: Активация TLS
---

# Активация TLS

С помощью этой инструкции вы сможете активировать слой TLS для входящих соединений (inbound) в конфигурации Xray.

- Для начала вам необходимо получить файлы сертификатов для вашего домена или поддомена. Для этого изучите инструкцию [Создание SSL-сертификата](issue-ssl-certificate.md).

- Затем откройте конфигурацию Xray (из раздела Core Settings) и в разделе `streamSettings` каждого нужного inbound измените значение `security` на `tls` и добавьте ваши файлы сертификатов в `certificates`, как показано в примере ниже.

Обратите внимание на следующий пример.

Замените `YOUR_DOMAIN` на ваш домен или поддомен.

```json{3-13}
"streamSettings": {
    "network": "ws",
    "security": "tls",
    "tlsSettings": {
        "certificates": [
            {
                "certificateFile": "/var/lib/marzban/certs/YOUR_DOMAIN.cer",
                "keyFile": "/var/lib/marzban/certs/YOUR_DOMAIN.cer.key"
            }
        ],
        "minVersion": "1.2",
        "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
}
```

::: info tlsSettings
Документацию по настройкам TLS вы можете найти [здесь](https://xtls.github.io/config/transport.html#tlsobject)
::: 