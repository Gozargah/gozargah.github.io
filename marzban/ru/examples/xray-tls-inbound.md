---
title: فعال‌سازی TLS
---

# فعال‌سازی TLS

به کمک این آموزش، شما می‌توانید لایه TLS را بر روی inboundهای پیکربندی Xray خود فعال کنید.

- برای شروع، شما باید فایل های گواهی را برای دامنه یا ساب‌دامنه‌ی خود دریافت کنید. برای این کار، آموزش [ساخت گواهی SSL](issue-ssl-certificate.md) را مشاهده کنید.

- سپس پیکربندی Xray خود را باز کنید (از بخش Core Settings) و در بخش `streamSettings` هر inbound که مورد نظر شماست، مقدار `security` را به `tls` تغییر داده و فایل های گواهی خود را مطابق مثال زیر در `certificates` وارد کنید.

برای مثال به نمونه زیر توجه کنید.

`YOUR_DOMAIN` را به دامنه یا ساب‌دامنه‌ی مورد نظر خود تغییر دهید.

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
مستندات مربوط به تنظیمات tls را می‌توانید در [اینجا](https://xtls.github.io/config/transport.html#tlsobject) مشاهده کنید 
:::