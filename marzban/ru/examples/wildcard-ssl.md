---
title: Получение wildcard SSL
---

# Применение

Используя этот тип SSL, вы можете, создав один сертификат, получить сертификат для всех ваших поддоменов, и вам не придётся создавать отдельный сертификат для каждого из них.

::: warning Внимание
Файлы сертификатов должны находиться по адресу `/var/lib/marzban/certs`, чтобы Marzban мог получить к ним доступ.

Во всех приведённых ниже примерах файлы будут установлены в этот каталог.
:::

::: warning Внимание
Для получения этого типа SSL ваш домен обязательно должен быть на Cloudflare.
:::

## Установка необходимых зависимостей
```shell
apt install socat certbot
curl https://get.acme.sh | sh
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
```

## Создание папки для сертификатов

::: warning Внимание
Если данный каталог уже существует, не запускайте следующую команду.
:::

```shell
mkdir /var/lib/marzban/certs/
```

## Ввод необходимых данных
Значение `CF_Key` – это ваш `Global API Key` аккаунта Cloudflare.

::: warning Внимание
Ни в коем случае не передавайте ваш `Global API Key` другим лицам.
:::

Значение `CF_Email` – это ваш email, на который зарегистрирован ваш аккаунт Cloudflare.

```shell
export CF_Key="exampleglobalapikey1234"
export CF_Email="example@gmail.com"
```

## Создание сертификата
Для создания сертификата замените в команде ниже ваш домен и выполните команду

```shell
~/.acme.sh/acme.sh --issue -d 'domain.xxx' -d '*.domain.xxx' --dns dns_cf --key-file /var/lib/marzban/certs/key.pem --fullchain-file /var/lib/marzban/certs/fullchain.pem
```

::: details Получение сертификата для нескольких доменов одновременно
Если вы используете несколько различных доменов, вы можете получить один сертификат для всех них, используя этот метод.

Добавьте ваши домены к предыдущей команде следующим образом:
```
-d 'domain.xxx' -d '*.domain.xxx'
```
Пример для 2 доменов:
```
~/.acme.sh/acme.sh --issue -d 'domain1.xxx' -d '*.domain1.xxx' -d 'domain2.xxx' -d '*.domain2.xxx' --dns dns_cf --key-file /var/lib/marzban/certs/key.pem --fullchain-file /var/lib/marzban/certs/fullchain.pem
```
:::
