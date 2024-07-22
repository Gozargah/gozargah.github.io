---
title: Xray входящих 
---

# Xray входящих 

В этом документе мы постараемся добавить каждый входящий трафик Xray, который вы можете использовать на Marzban.

## Reality

::: details VLESS TCP REALITY
::: code-group
```json
{
  "tag": "VLESS TCP REALITY",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {},
    "security": "reality",
    "realitySettings": {
      "show": false,
      "dest": "google.com:443",
      "xver": 0,
      "serverNames": [
        "example.com",
        ""
      ],
      "privateKey": "AJPbj4ftkYhB_KG1amEVLG4NK51pdmsCGH6ScU6w62Q",
      "shortIds": [
        "ea1058117be12087"
      ]
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS H2 REALITY
::: code-group
```json
{
  "tag": "VLESS H2 REALITY",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "h2",
    "tcpSettings": {},
    "security": "reality",
    "realitySettings": {
      "show": false,
      "dest": "google.com:443",
      "xver": 0,
      "serverNames": [
        "example.com",
        ""
      ],
      "privateKey": "AJPbj4ftkYhB_KG1amEVLG4NK51pdmsCGH6ScU6w62Q",
      "shortIds": [
        "ea1058117be12087"
      ]
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS GRPC REALITY
::: code-group
```json
{
  "tag": "VLESS GRPC REALITY",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "xyz"
    },
    "security": "reality",
    "realitySettings": {
      "show": false,
      "dest": "google.com:443",
      "xver": 0,
      "serverNames": [
        "example.com",
        ""
      ],
      "privateKey": "AJPbj4ftkYhB_KG1amEVLG4NK51pdmsCGH6ScU6w62Q",
      "shortIds": [
        "ea1058117be12087"
      ]
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## VLESS TLS

::: details VLESS HTTPUpgrade TLS
::: code-group
```json
   {
      "tag": "VLESS HTTPUPGRADE TLS",
      "listen": "0.0.0.0",
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "httpupgrade",
        "httpupgradeSettings": {
          "path": "/"
        },
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
          "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
        }
      },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS SplitHTTP TLS
::: code-group
```json
{
    "tag": "VLESS Splithttp TLS",
    "listen": "0.0.0.0",
    "port": 443,
    "protocol": "vless",
    "settings": {
        "clients": [],
        "decryption": "none"
    },
    "streamSettings": {
        "splithttpSettings": {
            "host": "",
            "path": "/",
            "maxUploadSize": 1000000,
            "maxConcurrentUploads": 10
        },
        "network": "splithttp",
        "security": "tls",
        "tlsSettings": {
            "serverName": "SERVER_NAME",
            "certificates": [
                {
                    "certificateFile": "/var/lib/marzban/certs/fullchain.pem",
                    "keyFile": "/var/lib/marzban/certs/key.pem"
                }
            ],
            "minVersion": "1.2",
              "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
        },
        "sniffing": {
            "enabled": true,
            "destOverride": [
                "http",
                "tls",
                "quic"
            ]
        }
    }
},

```
:::

::: details VLESS WS TLS
::: code-group
```json
{
  "tag": "VLESS WS TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/"
    },
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS GRPC TLS
::: code-group
```json
{
  "tag": "VLESS GRPC TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "vless"
    },
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS TCP TLS
::: code-group
```json
{
  "tag": "VLESS TCP TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## VMess TLS

::: details VMess WS TLS
::: code-group
```json
{
  "tag": "VMESS WS TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/"
    },
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VMess GRPC TLS
::: code-group
```json
{
  "tag": "VMESS GRPC TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "vmess"
    },
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VMess TCP TLS
::: code-group
```json
{
  "tag": "VMESS TCP TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": [],
    "decryption": "none"
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## Trojan TLS

::: details Trojan WS TLS
::: code-group
```json
{
  "tag": "TROJAN WS TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/"
    },
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details Trojan GRPC TLS
::: code-group
```json
{
  "tag": "TROJAN GRPC TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "trojan"
    },
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details Trojan TCP TLS
::: code-group
```json
{
  "tag": "TROJAN TCP TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": [],
    "decryption": "none"
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
      "cipherSuites": "TLS_ECDHE_ECDSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_RSA_WITH_CHACHA20_POLY1305_SHA256:TLS_ECDHE_ECDSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_RSA_WITH_AES_256_GCM_SHA384:TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256:TLS_ECDHE_RSA_WITH_AES_128_GCM_SHA256"
    }
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## VLESS NoTLS 

::: details VLESS HTTPUpgrade NoTLS
::: code-group
```json
   {
      "tag": "VLESS HTTPUPGRADE NoTLS",
      "listen": "0.0.0.0",
      "port": 2095,
      "protocol": "vless",
      "settings": {
        "clients": [],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "httpupgrade",
        "httpupgradeSettings": {
          "path": "/"
        },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS SplitHTTP NoTLS
::: code-group
```json
{
      "tag": "VLESS SplitHTTP NoTLS",
      "listen": "0.0.0.0",
      "port": 443,
      "protocol": "vless",
      "settings": {
        "clients": [],
        "decryption": "none"
      },
      "streamSettings": {
        "network": "splithttp",
        "splithttpSettings":
          {
  "path": "/",
  "host": "xray.com",
  "headers": {
    "key": "value"
  },
  "maxUploadSize": 1000000,
  "maxConcurrentUploads": 10 
}
      },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS WS NoTLS
::: code-group
```json
{
  "tag": "VLESS WS NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/"
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS GRPC NoTLS
::: code-group
```json
{
  "tag": "VLESS GRPC NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "vless"
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VLESS TCP NoTLS
::: code-group
```json
{
  "tag": "VLESS TCP NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## VMess NoTLS 

::: details VMess WS NoTLS
::: code-group
```json
{
  "tag": "VMESS WS NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/"
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VMess GRPC NoTLS
::: code-group
```json
{
  "tag": "VMESS GRPC NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "vmess"
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details VMess TCP NoTLS
::: code-group
```json
{
  "tag": "VMESS TCP NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## Trojan NoTLS 

::: details Trojan WS NoTLS
::: code-group
```json
{
  "tag": "TROJAN WS NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/"
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details Trojan GRPC NoTLS
::: code-group
```json
{
  "tag": "TROJAN GRPC NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "grpc",
    "grpcSettings": {
      "serviceName": "trojan"
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

::: details Trojan TCP NoTLS
::: code-group
```json
{
  "tag": "TROJAN TCP NOTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## VLESS Header

::: details VLESS TCP Header NoTLS
::: code-group
```json
{
  "tag": "VLESS TCP Header NoTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
      "header": {
        "type": "http",
        "request": {
          "method": "GET",
          "path": [
            "/"
          ],
          "headers": {
            "Host": [
              "cloudflare.com"
            ]
          }
        },
        "response": {}
      }
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## VMess Header

::: details VMESS TCP Header NoTLS
::: code-group
```json
{
  "tag": "VMESS TCP Header NoTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
      "header": {
        "type": "http",
        "request": {
          "method": "GET",
          "path": [
            "/"
          ],
          "headers": {
            "Host": [
              "cloudflare.com"
            ]
          }
        },
        "response": {}
      }
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## Trojan Header

::: details Trojan TCP Header NoTLS
::: code-group
```json
{
  "tag": "TROJAN TCP Header NoTLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "tcp",
    "tcpSettings": {
      "header": {
        "type": "http",
        "request": {
          "method": "GET",
          "path": [
            "/"
          ],
          "headers": {
            "Host": [
              "cloudflare.com"
            ]
          }
        },
        "response": {}
      }
    },
    "security": "none"
  },
  "sniffing": {
    "enabled": true,
    "destOverride": [
      "http",
      "tls",
      "quic"
    ]
  }
}
```
:::

## Shadowsocks 

::: details Shadowsocks TCP
::: code-group
```json
{
    "tag": "Shadowsocks TCP",
    "listen": "0.0.0.0",
    "port": 1080,
    "protocol": "shadowsocks",
    "settings": {
        "clients": [],
        "network": "tcp,udp"
    }
}
```
:::
