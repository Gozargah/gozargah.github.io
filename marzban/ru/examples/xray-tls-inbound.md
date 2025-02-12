---
title: Активация TLS
---

# Активация TLS

С помощью этого руководства вы можете активировать слой TLS для inbound-конфигураций Xray.

- Для начала вам необходимо получить файлы сертификата для вашего домена или поддомена. Для этого ознакомьтесь с руководством [Создание SSL-сертификата](issue-ssl-certificate.md).

- Затем откройте конфигурацию Xray (в разделе Core Settings) и в разделе `streamSettings` для каждого нужного вам inbound измените параметр `security` на `tls` и добавьте файлы сертификата в параметр `certificates` согласно примеру ниже.

Например, обратите внимание на следующий пример.

Замените `YOUR_DOMAIN` на нужный вам домен или поддомен.

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
Документацию по настройкам TLS вы можете посмотреть [здесь](https://xtls.github.io/config/transport.html#tlsobject)
:::
