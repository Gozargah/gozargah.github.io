---
title: Core
---

# Core

Since Marzban panel is based on the `Xray-core`, this document aims to explain the practical aspects of `Xray` that you can use in the `Core Settings` section of the panel, so you will be familiar with it's useful features.

## DNS

To set up `DNS` in the `Core Settings` section of the Marzban panel, simply add the following section at the beginning.

```json{5-10} [xray-config.json]
{
  "log": {
    "loglevel": "info"
  },
  "dns": {
    "servers": [
      "1.1.1.1"
    ],
    "queryStrategy": "UseIPv4"
  },
  "inbounds": [
```

In the example above, we used Cloudflare’s `DNS`. Different types of `DNS` and their uses are described below.

|  `DNS` Type     |     Provider      |      Use Case                                                  |
| ---------------- | ---------------- | ------------------------------------------------               |
| `1.1.1.1`        |    `Cloudflare`  |      Speed, privacy, and security                              |
| `1.1.1.3`        |    `Cloudflare`  | Blocking adult content, suitable for family use                |
| `1.1.1.2`        |    `Cloudflare`  | Blocking Malware                |
| `1.0.0.2`        |    `Cloudflare`  | Blocking adult content and Malware                |
| `8.8.8.8`        |    `Google`      | Reliable due to Google’s extensive global services             |
| `8.8.4.4`        |    `Google`      |  Backup `DNS` for Google’s primary DNS service                   |
| `9.9.9.9`        |    `Quad9`       |  Focuses on security and blocking access to malicious domains  |
| `208.67.222.222` |    `OpenDNS`     |  Protection against phishing and customizable settings         |      
| `208.67.222.123` |    `OpenDNS`     |  Blocking adult content, suitable for family use                |


## Inbounds

The `Inbounds` section in the `Xray-core` defines how the proxy service handles incoming connections. Each `Inbound` specifies a listener that receives connections on a designated port and applies specific protocols or rules to manage them.

The inbounds specified in the `Core Settings` define the proxies for in Marzban. The incoming connections are managed based on this section. A list of practical inbounds can be found in this document: [Xray Inbounds](https://gozargah.github.io/marzban/en/docs/xray-inbounds).

- Next, we'll analyze the different sections of an inbound.

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
      "privateKey": "oNDJxLaAiXojgAcdW5gzwuQB_gMYL0DXfRnqswUKvTE",
      "publicKey": "oVRY8h7Njgw25j3CNhaJVMUys378tTvecrSRbrB3gyo"
      "shortIds": [
        "2ebd6e17dec6a5d9"
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

::: tip tag
```json
"tag": "VLESS TCP REALITY"
```
The tag is used to identify a specific inbound. It helps you distinguish between inbounds, especially in complex configurations or when you have multiple inbounds, making it easier to manage them.
::: 

::: tip listen
```json
"listen": "0.0.0.0"
```
The IP address that `Xray-Core` should listen to `0.0.0.0` means that `Xray-Core` listens on all available IP addresses on the server.
::: 

::: tip port
```json
"port": 443
```
The network port that `Xray-Core` should listen on. Port `443` is typically used for `HTTPS` traffic and is set here as the input for the `VLESS` protocol.
::: 

::: tip protocol
```json
"protocol": "vless"
```
The protocol used for this inbound is `vless`, which is a modern and secure protocol for data transmission.
::: 

::: tip settings
```json
"settings": {
  "clients": [],
  "decryption": "none"
}
```

This section contains specific settings for the `vless` protocol.

- The `clients` section lists the authorized users allowed to connect.

- The `decryption` section specifies the decryption method.
:::

::: tip streamSettings
```json
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
    "privateKey": "oNDJxLaAiXojgAcdW5gzwuQB_gMYL0DXfRnqswUKvTE",
    "publicKey": "oVRY8h7Njgw25j3CNhaJVMUys378tTvecrSRbrB3gyo",
    "shortIds": [
      "2ebd6e17dec6a5d9"
    ]
  }
}

```
Settings related to stream and network protocols:

- The `network` section specifies the type of network used for data transmission. Here, `tcp` is chosen.

- The `tcpSettings` section contains specific `TCP` settings. It is empty here, meaning default settings are used.

- The `security` section indicates the type of security used for this connection which is `Reality` for this inbound. Reality is a technology for enhanced security.

- The `realitySettings` section includes specific settings for `Reality` technology.

- The `show` section determines whether information about this connection should be displayed or not. `false` means it will not be displayed.

- The `dest` section specifies the final destination used for simulation or obfuscation, set to `google.com:443` here.

- The `xver` section indicates the protocol version, with 0 meaning the initial version.

- The `serverNames` section lists the server names, which should include the domain you intend to use.

- The `privateKey` section contains the private key for encryption and security, which is a long, random key.

- The `publicKey` section is used for encrypting information and is publicly accessible. It can be used to encrypt data.

- The shortIds section contains short identifiers for unique identification, which includes a random ID.

- Regarding the publicKey section, note that it is not necessary to include it in the inbound settings. By including the `privateKey`, Marzban will automatically generate the publicKey for your proxy. We included it here solely to explain the different sections of this inbound.
::: 

::: tip sniffing
```json
"sniffing": {
  "enabled": true,
  "destOverride": [
    "http",
    "tls",
    "quic"
  ]
}
```
Traffic sniffing settings:

- The `enabled` section indicates whether traffic sniffing is enabled. `true` means it is enabled.

- The `destOverride` section lists the protocols that are ignored during traffic sniffing, including `http`, `tls`, and `quic`.

- In the `destOverride` section, ignoring protocols means that `Xray-Core` processes these protocols directly instead of performing deep analysis and simulation of their traffic. This can improve efficiency and simplify traffic management, reducing the need for complex processing for certain protocols and thus consuming fewer system resources. 
:::


## Outbounds

The `Outbounds` and `Routing` sections are closely connected to define how traffic is managed and directed. The `Routing` section uses `Rules` to determine how different types of traffic should be handled, while the `Outbounds` section specifies the destinations or actual proxies to which the traffic is directed.

This integrated approach allows you to manage traffic flexibly and dynamically, providing precise control over how and where traffic is directed. The `Outbounds` section defines the available destinations or proxies, including details about their protocols and configurations. Each `Outbound` is identified by a unique tag.

<br>

::: tip freedom
The `freedom` protocol is designed to bypass censorship or routing restrictions in specific network environments. It is a useful tool in Xray-core that ensures unrestricted internet access by allowing traffic to flow freely without interference from intermediary network layers.
:::

```json
    {
      "protocol": "freedom",
      "settings": {},
      "tag": "DIRECT"
    },
```
<br>

::: tip blackhole
The `blackhole` protocol effectively acts as a "black hole" for packets, discarding traffic without processing or responding. You can use this for specific purposes.
:::

```json
    {
      "protocol": "blackhole",
      "settings": {},
      "tag": "BLOCK"
    },
```
<br>

::: tip IPv4
For example, by adding the following `Outbound`, you can prioritize the use of `IPv4` to prevent `403` errors on various platforms. The `freedom` protocol is likely already included in your outbounds; if so, simply add the `settings` section to it.
:::

```json
  "outbounds": [
    {
      "protocol": "freedom",
      "settings": {
  "domainStrategy": "ForceIPv4"
      },
      "tag": "direct"
    },
```

## Routing & Rules

As previously mentioned, in the `Xray-core`, the `Routing` section, along with its rules, includes various settings that determine how incoming traffic should be managed and to which destination it should be sent.

If you look at the example below, we used `Routing` to send desired domains to the outbound with the `BLOCK` tag, which uses the `blackhole` protocol. As a result, requests to these sites will not reach their destination.

```json
{
  "domain": [
    "www.speedtest.net",
    "fast.com"
  ],
  "outboundTag": "BLOCK",
  "type": "field"
},
```
