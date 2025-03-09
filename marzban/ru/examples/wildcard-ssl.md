---
title: Получение wildcard ssl
---

# Применение
Используя этот тип `ssl`, вы можете создать сертификат один раз для всех ваших поддоменов и не нужно будет создавать отдельный сертификат для каждого из них.

::: warning Внимание
Файлы сертификатов должны быть доступны по адресу `/var/lib/marzban/certs`, чтобы Marzban мог получить к ним доступ.

Во всех примерах ниже файлы будут установлены по этому адресу.
:::

::: warning Внимание
Для получения этого типа `ssl` ваш домен обязательно должен быть на `Cloudflare`.
:::

## Установка необходимых компонентов
```shell
apt install socat certbot
curl https://get.acme.sh | sh
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
```

## Создание папки для сертификатов

::: warning Внимание
Если директория уже существует, не выполняйте следующую команду.
:::

```shell
mkdir /var/lib/marzban/certs/
```

## Ввод необходимой информации
Значение `CF_Key` - это `Global API Key` вашего аккаунта Cloudflare.

::: warning Внимание
Никогда не передавайте свой `Global API Key` другим лицам.
:::

Значение `CF_Email` - это ваш email, на который зарегистрирован аккаунт Cloudflare.

```shell
export CF_Key="exampleglobalapikey1234"
export CF_Email="example@gmail.com"
```

## Создание сертификата
Для создания сертификата замените домен в команде ниже и выполните её

```shell
~/.acme.sh/acme.sh --issue -d 'domain.xxx' -d '*.domain.xxx' --dns dns_cf --key-file /var/lib/marzban/certs/key.pem --fullchain-file /var/lib/marzban/certs/fullchain.pem
```

::: details Получение сертификата для нескольких доменов одновременно
Если вы используете несколько разных доменов, вы можете использовать этот метод для получения одного сертификата для всех них

Добавьте свои домены к предыдущей команде в следующем формате
```
-d 'domain.xxx' -d '*.domain.xxx'
```
Пример для 2 доменов 
```
~/.acme.sh/acme.sh --issue -d 'domain1.xxx' -d '*.domain1.xxx' -d 'domain2.xxx' -d '*.domain2.xxx' --dns dns_cf --key-file /var/lib/marzban/certs/key.pem --fullchain-file /var/lib/marzban/certs/fullchain.pem
```

:::