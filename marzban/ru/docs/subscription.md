---
title: Подписки
---


Marzban включает в себя уникальную возможность, предоставления конфигов для подключения пользователя в удобном формате - так называемая система подписки.

Основными плюсами использования данной системы, является обеспечние единой точки входа для пользователя и безшовность проводимых изменений, а так же множеством других.

## Формат ссылки

Подписка доступна для пользователя по опредленному пути (ссылке), которая складывается из следующих частей:

```
https://{XRAY_SUBSCRIPTION_URL_PREFIX}/{XRAY_SUBSCRIPTION_PATH}/{JWT_TOKEN}/{KEY}
```

:::caution
Используйте только `https`
:::
Разберем составляющие этой ссылки:

### XRAY_SUBSCRIPTION_URL_PREFIX

:::note
Является обязательным значением.
:::

Префикс адреса подписки.

Значение задается в `.env`

Пример: `"https://domain.com"`

В случае, если Вы используете wildcard домены, Вы можете определить генерацию случайной строки (соли) для XRAY_SUBSCRIPTION_URL_PREFIX.

Пример: `"https://*.domain.com"`

При генерации получив случайную строку длиной 16 символов

Пример: `"830aa395df41ae5a.domain.com"` или `"b7559f58668ab457.domain.com"`

### XRAY_SUBSCRIPTION_PATH

:::note
Является обязательным значением.
:::

Префикс адреса подписки.

Значение задается в `.env`

значение по умолчанию: `sub`

Пример: `"sub"`

### JWT_TOKEN

:::note
Является обязательным значением.
:::
Значение генерируется автоматически

JWT токен состоит из трех частей, разделенных точкой, закодированных с использованием Base64URL:

**HEADER**

Заголовок содержит метаданные о типе токена (JWT) и используемом алгоритме подписи (HMAC с SHA-256).

Пример:

```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

После кодирования Base64URL:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```

**PAYLOAD**

Полезная нагрузка содержит claims с данными, закодированными в JWT. В этом случае, она включает:

- sub: имя пользователя
- access: права доступа
- iat: время выдачи токена в формате Unix timestamp

Пример:

```json
{
  "sub": "VPutin",
  "access": "subscription",
  "iat": 1621357861
}
```

После кодирования Base64URL:

```
eyJzdWIiOiJ1c2VyMTIzIiwiYWNjZXNzIjoic3Vic2NyaXB0aW9uIiwiaWF0IjoxNjIxMzU3ODYxfQ
```

**SIGNATURE**

Создается на основе закодированных заголовка, полезной нагрузки и секретного ключа с использованием указанного в заголовке алгоритма и служит для проверки целостности токена.

Пример:

```
V0mqTFVz6S_av6UxZ5MFEskUThxHbLaXHxmEEvbxczM
```

Таким образом, полный JWT токен будет выглядеть следующим образом:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ1c2VyMTIzIiwiYWNjZXNzIjoic3Vic2NyaXB0aW9uIiwiaWF0IjoxNjIxMzU3ODYxfQ.V0mqTFVz6S_av6UxZ5MFEskUThxHbLaXHxmEEvbxczM
```

Токены передаются между клиентом и сервером для идентификации пользователя без необходимости постоянно хранить эту информацию на сервере.

### KEY

:::note
Опциональное значение
:::
С помощью обьявленных в конце ссылки ключей, Вы можете воспользоваться дополнительными возможностями

#### /info

```
https://{XRAY_SUBSCRIPTION_URL_PREFIX}/{XRAY_SUBSCRIPTION_PATH}/{JWT_TOKEN}/info
```

Формат вывода: JSON

C помощью данного ключа Вы можете получить всю информацию о пользовательской подписке, включая все данные сущности `user` этого пользователя.

#### /usage

```
https://{XRAY_SUBSCRIPTION_URL_PREFIX}/{XRAY_SUBSCRIPTION_PATH}/{JWT_TOKEN}/usage
```

Формат вывода: JSON

C помощью данного ключа Вы можете получить всю информацию о потребленном трафике пользователя, включая все данные узлов.

#### /CLIENT_TYPE

```
https://{XRAY_SUBSCRIPTION_URL_PREFIX}/{XRAY_SUBSCRIPTION_PATH}/{JWT_TOKEN}/{CLIENT_TYPE}
```

Доступные типы клиентов: `sing-box`,`clash-meta`,`clash`,`outline`,`v2ray`, `v2ray-json`

Получение опредленного типа подписки, сгенерированного для указанного потребителя

## Подписка

Система подписки, динамически отдает содержимое в зависимости от выполнения некоторых условий.

Ниже, мы рассмотрим все доступные варианты:

### WEB

Получая в `accept_header` значение `"text/html"`, мы понимаем, что запрос к ссылке исходит от веб браузера,
предоставляя ему на выходе рендер шаблона по умолчанию (или заданного Вами, кастомного шаблона) в виде html файла.

<LinkCard
  title="Шаблон по умолчанию"

href="https://github.com/Gozargah/Marzban/blob/master/app/templates/subscription/index.html"
/>

Для применения собственного шаблона, Вам необходимо использовать 2 перменные в файле `.env`:

- `CUSTOM_TEMPLATES_DIRECTORY`
- `SUBSCRIPTION_PAGE_TEMPLATE`

В данном виде шаблона для рендера используется шаблонизатор jinja, с полной поддержкой его синтаксиса.

Доступная сущность для взаимодействия: `user`

Пример:

```html
<html>
  {% include style.css %}
  <center>
    {% if user.status == 'active' %}
    <b>Ваша подписка активна</b>
    {% endif %}
  </center>
</html>
```

### V2ray

Доступный ключ `/v2ray`.

При несовпадении наименования в заголовке `user_agent` перечисленным, специфичным клиентам, мы понимаем,
что запрос к ссылке исходит от v2ray приложения, которому на выходе, мы предоставляем сгенерированный plain текст, c закодированными в base64 ссылками подключения

```
protocol://$(uuid)@remote-host:remote-port?<protocol-specific fields><transport-specific fields><tls-specific fields>#$(descriptive-text)
```

<LinkCard title="Стандарт" href="https://github.com/XTLS/Xray-core/issues/91" />

Дополнительно, будут переданны заголовки, которые, в свою очередь, в том или инном обьеме, будут интерпретированы клиентом.

#### profile-web-page-url

Заголовок включающий ссылку-подписки

Пример:

```
profile-web-page-url: https://{XRAY_SUBSCRIPTION_URL_PREFIX}/{XRAY_SUBSCRIPTION_PATH}/{JWT_TOKEN}
```

#### support-url

Заголовок включающий ссылку позволяющая пользователю перейти на соответствующую домашнюю страницу.

Для применения собственного значения, Вам необходимо задать перменную `SUB_SUPPORT_URL` в файле `.env`:

Пример:

```
support-url: https://mybestvpnintheworld.com
```

#### profile-title

Имя профиля в кодировке base64 UTF8

Пример:

```
profile-title: base64:0YXRg9C5
```

#### profile-update-interval

Интервал автоматического обновления файла конфигурации

Для применения собственного значения, Вам необходимо задать перменную `SUB_UPDATE_INTERVAL` в файле `.env`:

Пример:

```
profile-update-interval: 1
```

#### subscription-userinfo

Информация о трафике и истечении срока действия

Значения генерируются автоматическии

Пример:

```
subscription-userinfo: upload=0; download=4460105213; total=2147483648; expire=1710442799
```

### V2ray-json

Доступный ключ `/v2ray-json`.
:::caution
Данный вариант распространения находится в разработке.
Доступен только в `dev` ветке панели.
Совместим на данный момент только с Streisand >= `1.6.12` и v2rayNG >= `1.8.16`
:::
При запросе к ссылке с использованием ключа `/v2ray-json`, на выходе, Вы получите сгенерированный json файл вида

```json
[
    {...},
    {...},
    {...}
]
```

Содержащий в каждом элементе массива полностью валидный json хоста, на основе базового или заданного Вами шаблона

<LinkCard
  title="Шаблон по умолчанию"
  href="https://github.com/Gozargah/Marzban/blob/dev/app/templates/v2ray/default.json"
/>

Согласно утвержденного стандарта конфигурации json

<LinkCard
  title="Стандарт"
  href="https://xtls.github.io/Xray-docs-next/en/config/"
/>

Для применения собственного шаблона, Вам необходимо использовать 2 перменные в файле `.env`:

- `CUSTOM_TEMPLATES_DIRECTORY`
- `V2RAY_SUBSCRIPTION_TEMPLATE`

Дополнительно, будут переданны заголовки, которые, в свою очередь, в том или инном обьеме, будут интерпретированы клиентом.

#### profile-web-page-url

Заголовок включающий ссылку-подписки

Пример:

```
profile-web-page-url: https://{XRAY_SUBSCRIPTION_URL_PREFIX}/{XRAY_SUBSCRIPTION_PATH}/{JWT_TOKEN}
```

#### support-url

Заголовок включающий ссылку позволяющая пользователю перейти на соответствующую домашнюю страницу.

Для применения собственного значения, Вам необходимо задать перменную `SUB_SUPPORT_URL` в файле `.env`:

Пример:

```
support-url: https://mybestvpnintheworld.com
```

#### profile-title

Имя профиля в кодировке base64 UTF8

Пример:

```
profile-title: base64:0YXRg9C5
```

#### profile-update-interval

Интервал автоматического обновления файла конфигурации

Для применения собственного значения, Вам необходимо задать перменную `SUB_UPDATE_INTERVAL` в файле `.env`:

Пример:

```
profile-update-interval: 1
```

#### subscription-userinfo

Информация о трафике и истечении срока действия

Значения генерируются автоматическии

Пример:

```
subscription-userinfo: upload=0; download=4460105213; total=2147483648; expire=1710442799
```

### Sing-Box

При запросе к ссылке через клиент на базе Sing-box, или с испольованием ключа `/sing-box`, пользователь получит валидный json, построенный на шаблоне


`https://github.com/Gozargah/Marzban/blob/master/app/templates/singbox/default.json`


Для применения собственного шаблона, Вам необходимо использовать 2 перменные в файле `.env`:

- `CUSTOM_TEMPLATES_DIRECTORY`
- `SINGBOX_SUBSCRIPTION_TEMPLATE`

### Clash

### OUTLINE
