---
title: Xray Inbounds
---

# Xray Inbounds

In this document we'll try to add every Xray inbound that you can use on Marzban.

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
      "path": "/",
      "headers": {
        "Host": ""
      }
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
          "ocspStapling": 3600,
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
}
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

::: details VMess HTTPUpgrade TLS
::: code-group
```json
{
  "tag": "VMESS HTTPUPGRADE TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "httpupgrade",
    "httpupgradeSettings": {
      "path": "/",
      "headers": {
        "Host": ""
      }
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

::: details VMess SplitHTTP TLS
::: code-group
```json
{
  "tag": "VMESS Splithttp TLS",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "vmess",
  "settings": {
    "clients": []
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
          "ocspStapling": 3600,
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
}
```
:::

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

::: details Trojan WS TLS Fake Certificate
::: code-group
```json
{
  "tag": "Trojan WS TLS Fake Certificate",
  "listen": "0.0.0.0",
  "port": 2083,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "ws",
    "security": "tls",
    "tlsSettings": {
      "certificates": [
        {
          "certificate": [
            "-----BEGIN CERTIFICATE-----",
            "MIIBvTCCAWOgAwIBAgIRAIY9Lzn0T3VFedUnT9idYkEwCgYIKoZIzj0EAwIwJjER",
            "MA8GA1UEChMIWHJheSBJbmMxETAPBgNVBAMTCFhyYXkgSW5jMB4XDTIzMDUyMTA4",
            "NDUxMVoXDTMzMDMyOTA5NDUxMVowJjERMA8GA1UEChMIWHJheSBJbmMxETAPBgNV",
            "BAMTCFhyYXkgSW5jMFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEGAmB8CILK7Q1",
            "FG47g5VXg/oX3EFQqlW8B0aZAftYpHGLm4hEYVA4MasoGSxRuborhGu3lDvlt0cZ",
            "aQTLvO/IK6NyMHAwDgYDVR0PAQH/BAQDAgWgMBMGA1UdJQQMMAoGCCsGAQUFBwMB",
            "MAwGA1UdEwEB/wQCMAAwOwYDVR0RBDQwMoILZ3N0YXRpYy5jb22CDSouZ3N0YXRp",
            "Yy5jb22CFCoubWV0cmljLmdzdGF0aWMuY29tMAoGCCqGSM49BAMCA0gAMEUCIQC1",
            "XMIz1XwJrcu3BSZQFlNteutyepHrIttrtsfdd05YsQIgAtCg53wGUSSOYGL8921d",
            "KuUcpBWSPkvH6y3Ak+YsTMg=",
            "-----END CERTIFICATE-----"
          ],
          "key": [
            "-----BEGIN RSA PRIVATE KEY-----",
            "MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg7ptMDsNFiL7iB5N5",
            "gemkQUHIWvgIet+GiY7x7qB13V6hRANCAAQYCYHwIgsrtDUUbjuDlVeD+hfcQVCq",
            "VbwHRpkB+1ikcYubiERhUDgxqygZLFG5uiuEa7eUO+W3RxlpBMu878gr",
            "-----END RSA PRIVATE KEY-----"
          ]
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
      "tls"
    ]
  }
}
```
:::

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

## Fallback TLS

::: details Fallback TLS
::: code-group
```json
{
  "tag": "TROJAN FALLBACK TLS",
  "port": 443,
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
      },
      {
        "path": "/lt",
        "dest": "@vless-tcp",
        "xver": 2
      },
      {
        "path": "/mt",
        "dest": "@vmess-tcp",
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
      "alpn": [
        "h2",
        "http/1.1"
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
},
{
  "tag": "VLESS TCP TLS Header",
  "listen": "@vless-tcp",
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "tcp",
    "security": "none",
    "tcpSettings": {
      "acceptProxyProtocol": true,
      "header": {
        "type": "http",
        "request": {
          "path": [
            "/lt"
          ]
        }
      }
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
},
{
  "tag": "VMESS TCP TLS Header",
  "listen": "@vmess-tcp",
  "protocol": "vmess",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "tcp",
    "security": "none",
    "tcpSettings": {
      "acceptProxyProtocol": true,
      "header": {
        "type": "http",
        "request": {
          "path": [
            "/mt"
          ]
        }
      }
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
},
{
  "tag": "VLESS WS TLS",
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
      "tls",
      "quic"
    ]
  }
},
{
  "tag": "VMESS WS TLS",
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
      "tls",
      "quic"
    ]
  }
},
{
  "tag": "TROJAN WS TLS",
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
      "path": "/",
      "headers": {
        "Host": ""
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

::: details VLESS SplitHTTP NoTLS
::: code-group
```json
{
  "tag": "VLESS SplitHTTP NoTLS",
  "listen": "0.0.0.0",
  "port": 8080,
  "protocol": "vless",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "splithttp",
    "splithttpSettings": {
      "host": "",
      "path": "/",
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
  "port": 8080,
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
  "port": 8080,
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

::: details VMess HTTPUpgrade NoTLS
::: code-group
```json
{
  "tag": "VMESS HTTPUPGRADE NoTLS",
  "listen": "0.0.0.0",
  "port": 2095,
  "protocol": "vmess",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "httpupgrade",
    "httpupgradeSettings": {
      "path": "/",
      "headers": {
        "Host": ""
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

::: details VMess SplitHTTP NoTLS
::: code-group
```json
{
  "tag": "VMESS SplitHTTP NoTLS",
  "listen": "0.0.0.0",
  "port": 8080,
  "protocol": "vmess",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "splithttp",
    "splithttpSettings": {
      "host": "",
      "path": "/",
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

::: details VMess WS NoTLS
::: code-group
```json
{
  "tag": "VMESS WS NOTLS",
  "listen": "0.0.0.0",
  "port": 8080,
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
  "port": 8080,
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
  "port": 8080,
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
  "port": 8080,
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

## Fallback NoTLS 

::: details Fallback NoTLS 
::: code-group
```json
{
  "tag": "TROJAN FALLBACK NoTLS",
  "port": 8080,
  "protocol": "trojan",
  "settings": {
    "clients": [],
    "decryption": "none",
    "fallbacks": [
      {
        "path": "/vl",
        "dest": "@vless-ws",
        "xver": 2
      },
      {
        "path": "/vm",
        "dest": "@vmess-ws",
        "xver": 2
      }
    ]
  },
  "streamSettings": {
    "network": "tcp",
    "security": "none"
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
  "tag": "VLESS WS NoTLS",
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
      "path": "/vless"
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
},
{
  "tag": "VMESS WS NoTLS",
  "listen": "@vmess-ws",
  "protocol": "vmess",
  "settings": {
    "clients": [],
    "decryption": "none"
  },
  "streamSettings": {
    "network": "ws",
    "security": "none",
    "wsSettings": {
      "acceptProxyProtocol": true,
      "path": "/vmess"
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

::: details VLESS WS Header NoTLS
::: code-group
```json
{
  "tag": "VLESS WS Header NoTLS",
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
      "path": "/",
      "headers": {
        "Host": "cloudflare.com"
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

::: details VMess TCP Header NoTLS
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

::: details VMess WS Header NoTLS
::: code-group
```json
{
  "tag": "VMESS WS Header NoTLS",
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
      "path": "/",
      "headers": {
        "Host": "cloudflare.com"
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

::: details Trojan WS Header NoTLS
::: code-group
```json
{
  "tag": "TROJAN WS Header NoTLs",
  "listen": "0.0.0.0",
  "port": 443,
  "protocol": "trojan",
  "settings": {
    "clients": []
  },
  "streamSettings": {
    "network": "ws",
    "wsSettings": {
      "path": "/",
      "headers": {
        "Host": "cloudflare.com"
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
