---
title: Создание SSL-сертификата
---

# Создание SSL-сертификата
Инструкции ниже относятся к получению SSL-сертификата для использования в Marzban.

::: warning Внимание
Файлы сертификатов должны быть доступны по адресу `/var/lib/marzban/certs`, чтобы Marzban мог получить к ним доступ.

Во всех примерах ниже файлы будут установлены по этому адресу.
:::

::: warning Внимание
Перед получением SSL-сертификата вы должны зарегистрировать DNS-записи домена.
:::

## Получение сертификата с помощью acme.sh

- Из-за использования метода standalone установите socat с помощью следующей команды.

```bash
apt install curl socat -y
```

::: tip Примечание
Если вы уже установили socat, этот шаг можно пропустить.
:::

- Установите [acme.sh](https://github.com/acmesh-official/acme.sh) с помощью следующей команды.

Замените `YOUR_EMAIL` на свой email.

::: tip Примечание
Если вы уже установили acme.sh, этот шаг можно пропустить.
:::

```bash
curl https://get.acme.sh | sh -s email=YOUR_EMAIL
```

- Для получения сертификата выполните следующие команды по порядку.

Замените `YOUR_DOMAIN` на ваш домен или поддомен.

```bash

export DOMAIN=YOUR_DOMAIN

mkdir -p /var/lib/marzban/certs

~/.acme.sh/acme.sh \
  --issue --force --standalone -d "$DOMAIN" \
  --fullchain-file "/var/lib/marzban/certs/$DOMAIN.cer" \
  --key-file "/var/lib/marzban/certs/$DOMAIN.cer.key"

```

## Получение сертификата для домена, зарегистрированного на Cloudflare

- Если домен зарегистрирован на Cloudflare и вышеуказанные методы не работают, используйте ручной метод

  Замените `example.com` на ваш домен

  - После установки acme выполните следующие шаги
 
```
curl https://get.acme.sh | sh -s email=YOUR_EMAIL
```

1. Первый шаг:
```
~/.acme.sh/acme.sh --issue -d example.com --dns \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```
- После выполнения вам будут предоставлены два значения, как показано на изображении ниже

  ![image](https://github.com/Gozargah/gozargah.github.io/assets/67644313/538c8341-fa77-4b06-96a4-73c29f3e0ded)

2. Второй шаг:
Перейдите в Cloudflare и создайте запись типа txt, введя значения, как показано на изображении ниже

![image](https://github.com/Gozargah/gozargah.github.io/assets/67644313/dad9c59a-da1f-440b-aa6e-ad524aff212a)

3. Третий шаг:
  Получите сертификат с помощью следующей команды
```
~/.acme.sh/acme.sh --renew -d example.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

- В итоге файл сертификата вашего домена будет сохранен по адресу

`/root/.acme.sh/example.com_ecc/fullchain.cer`

- А файл приватного ключа будет сохранен по адресу

`/root/.acme.sh/example.com_ecc/example.com.key`
