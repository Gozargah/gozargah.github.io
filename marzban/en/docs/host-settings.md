# Host Settings 

The purpose of host settings is to customize configurations.
With host settings, you can create specific configurations for each inbound. Each configuration can have its own settings. The following fields can be modified in host settings.

- Remark
- Address
- Port
- SNI
- Host
- Path 
- Security Layer (TLS, None)
- ALPN (h2, http/1.1)
- Fingerprint

The settings provided in this section lets you assign multiple addresses or domains with different names for each inbound. One use of this section is that if your server is maintained with specific settings, it may be necessary for the user's connection port to be different from the inbound port. Using these settings, you can customize the connection port, SNI, Host, Path, etc. 

By default, the server's IP is set as the address, and default inbound settings (such as port, etc.) are applied to each configuration. To customize configurations, you need to edit this section.

::: info Tip
The host settings have higher priority compared to other settings. The fields configured in this section are prioritized over other settings in generating configurations.
:::

## Variables
To customize configurations, variables have been designed for each field. It is necessary to use variables specific to each field. You can use the following varibles either in Remark section or Address.

::: warning Attention
Please note that variables must be used with `{}` in the fields.
:::

| Variables               | Description                                                         |
| ----------------------- | ------------------------------------------------------------------- |
| `{SERVER_IP}`           | Master Server's IPv4                                                       |
| `{USERNAME}`            | User's Username                                                     |
| `{DATA_USAGE}`          | User's Data Usage                                                   |
| `{DATA_LEFT}`           | User's Remaining Data                                               |
| `{DATA_LIMIT}`          | User's Total Data Limit                                             |
| `{DAYS_LEFT}`           | Remaining Days of the User's Subscription                           |
| `{TIME_LEFT}`           | Remaining Days, Hours, Minutes, Seconds of the User's Subscription  |
| `{EXPIRE_DATE}`         | User's Expiration Date in English Calendar                          |
| `{JALALI_EXPIRE_DATE}`  | User's Expiration Date in Persian Calendar                          |
| `{STATUS_EMOJI}`        | User Status as an Emoji (✅,⌛️,🪫,❌,🔌)                          |
| `{PROTOCOL}`            | Configuration Protocols: Vless, Vmess ,Trojan, Shadowsocks, ...     |
| `{TRANSPORT}`           | Transport Method for the Configuration: TCP, WS, gRPC, ...          |

Example:

| Remark field                                                | Output                               |
| ----------------------------------------------------------- | ------------------------------------ |
| 🚀 Server 1 (\{USERNAME\}) [\{PROTOCOL\} - \{TRANSPORT\}]  | 🚀 Server 1 (user102) [VMess - ws]   |
| Days Left: \{DAYS_LEFT\}                                    |      Dayy Left: 24                   |
| Data Used: \{DATA_LEFT\}/\{DATA_LIMIT\}                     | Data Used: 16.5GB/30GB               |

## Generating Random Phrases

Sometimes, there's a need to generate a random part of the SNI and Host fields. This technique is used in some cases to prevent excessive connections to a specific subdomain. In this scenario, each user connects to a random subdomain.

To utilize this feature, use the `*` character in the SNI and Host fields.

::: warning Attention
Please note that, it is necessary to generate wildcard SSL certificate for your domain in order for this to work.
:::


Example:

| SNI or Host field      |      Configuration's output in the fields           |
| ---------------------- | --------------------------------------------------- |
| `*.example.com`        | 32ks0ef23402.example.com                            |
| `access-*.example.com` | access-laks038fn201.example.com                     |

### Multiple Host or SNI

In case you want to set multiple addresses for Host and SNI, you can separate those addresses with commas. Then, for each user, one of these addresses will be randomly selected.
