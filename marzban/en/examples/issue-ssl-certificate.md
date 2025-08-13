---
title: SSL certificate
---

# SSL certificate
The following instructions are related to obtaining an SSL certificate for use in Marzban.

::: warning Note
Certificate files must be accessible at `/var/lib/marzban/certs` so that Marzban can access them.

In the following examples, the files will be installed at this address.
:::

::: warning Note
Before obtaining an SSL certificate, you must register your domain's DNS records.
:::

## Receiving a certificate with acme.sh

- To use the standalone method, install socat using the following command.

```bash
apt install curl socat -y
```

::: tip Note
If you have already installed socat, you do not need to perform this step.
:::

- With the following configuration, install [acme.sh](https://github.com/acmesh-official/acme.sh).

`YOUR_EMAIL` Change it to your email address.

::: tip Note
If you have already installed acme.sh, you do not need to perform this step.
:::

```bash
curl https://get.acme.sh | sh -s email=YOUR_EMAIL
```

- To receive a certificate, please follow the steps below.

`YOUR_DOMAIN` Replace this with your own domain or subdomain.

```bash

export DOMAIN=YOUR_DOMAIN

mkdir -p /var/lib/marzban/certs

~/.acme.sh/acme.sh \
  --issue --force --standalone -d "$DOMAIN" \
  --fullchain-file "/var/lib/marzban/certs/$DOMAIN.cer" \
  --key-file "/var/lib/marzban/certs/$DOMAIN.cer.key"

```

## Receipt of registered mail on Cloudflare

- If Damneh is registered on Cloudflare and the above methods do not work, use the manual method.

  `example.com` Change it to your own domain name.

   - After installing Acme, perform the following steps
```
curl https://get.acme.sh
```

1. First step:
```
~/.acme.sh/acme.sh --issue -d example.com --dns \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```
- After completing the two steps shown below, you will be given the following amount.

  ![image](https://github.com/Gozargah/gozargah.github.io/assets/67644313/538c8341-fa77-4b06-96a4-73c29f3e0ded)

2. Front foot:
Go to Notepad and create a txt file and enter the amounts as shown in the image below.

![image](https://github.com/Gozargah/gozargah.github.io/assets/67644313/dad9c59a-da1f-440b-aa6e-ad524aff212a)

3. Sum:
  Please obtain the following certificate
```
~/.acme.sh/acme.sh --renew -d example.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

- In the last file, your certificate is at the following address

`/root/.acme.sh/example.com_ecc/fullchain.cer`

- The file is stored at the following address

`/root/.acme.sh/example.com_ecc/example.com.key`
