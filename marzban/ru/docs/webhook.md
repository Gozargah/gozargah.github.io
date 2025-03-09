---
title: Marzban Webhook 
---

# Webhook 

- Если вам нужен способ автоматического управления событиями пользователей, webhook'и предоставляют гибкое решение. Webhook позволяет получать уведомления о различных событиях, таких как создание пользователя, обновления или истечение срока действия, которые могут быть использованы для интеграции с внешними системами.

- **Отслеживание событий**: Получение уведомлений о событиях пользователя, таких как создание пользователя, обновления, ограничения и т.д.

- **Интеграция с внешними системами**: Автоматизация действий, таких как обновление базы данных, отправка оповещений или выполнение других процессов в ответ на события в Marzban.

::: tip Примечание
Если вы обычный пользователь, вам не понадобится этот раздел.
:::

## **Шаг 1: Настройка URL webhook'а**

- Сначала укажите `URL`, куда вы хотите получать уведомления, в файле `env`.
```env
WEBHOOK_ADDRESS = "http://127.0.0.1:9000/,http://127.0.0.1:9001/"
```

- Чтобы добавить секретный ключ для подтверждения запроса, установите `WEBHOOK_SECRET`.
```env
WEBHOOK_SECRET = "something-very-very-secret"
```

- Теперь Marzban будет отправлять запросы на этот `URL`, когда происходит определенное событие для пользователя.

 - С помощью следующей переменной очередь уведомлений проверяется каждые `30` секунд, затем отправляется в webhook.

```env
JOB_SEND_NOTIFICATIONS_INTERVAL = 30
```
- С помощью следующей переменной вы можете указать `URL` Discord для webhook'а.
```env
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/xxxxxxx"
```

## **Шаг 2: Обработка полученных уведомлений**

- Ваш сервер, который получает webhook'и, должен обрабатывать запросы с содержимым `JSON`. Каждый запрос включает заголовок `x-webhook-secret` (если настроен) для безопасности, а также детали события в `payload`. Вот пример `payload JSON`:

```
{
  "username": "example_user",
  "action": "user_created",
  "enqueued_at": 1680506457.636369,
  "tries": 0
}
```

- `username`: Имя пользователя, связанное с событием
- `action`: Тип события (например, `user_created`, `user_updated`)
- `enqueued_at`: Время возникновения события
- `tries`: Количество попыток в случае неудачной отправки уведомления

**Типы событий:**

- Поле `action` может иметь следующие значения:

- `user_created`: Когда создается пользователь
- `user_updated`: Когда обновляются детали пользователя
- `user_deleted`: Когда удаляется пользователь
- `user_limited`: Когда у пользователя заканчивается объем трафика
- `user_expired`: Когда истекает срок действия учетной записи пользователя
- `user_disabled` / `user_enabled`: Когда пользователь деактивируется или активируется

## **Шаг 3: Пример кода для получения webhook'а**

- Вот пример использования `Python` и `Flask` для настройки сервера, который подтверждает webhook-уведомления Marzban:
::: details Пример кода
::: code-group
```code
from flask import Flask, request, jsonify
import hmac
import hashlib

app = Flask(__name__)
WEBHOOK_SECRET = 'your-secret-key'

def verify_signature(data, signature):
    expected_signature = hmac.new(WEBHOOK_SECRET.encode(), data, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected_signature, signature)

@app.route('/webhook', methods=['POST'])
def webhook():
    signature = request.headers.get('x-webhook-secret')
    if not signature or not verify_signature(request.data, signature):
        return jsonify({"error": "Invalid signature"}), 403

    payload = request.json
    print("Received event:", payload['action'], "for user:", payload['username'])
    
    # Process the event
    if payload['action'] == 'user_created':
        # Code to handle user creation
        pass
    elif payload['action'] == 'user_updated':
        # Code to handle user update
        pass
    # Additional event actions

    return jsonify({"status": "success"}), 200

if __name__ == '__main__':
    app.run(port=5000)
```
:::

## Пример запроса, отправленного из Marzban:

::: details Пример запроса
::: code-group 
```code
Headers:
Host: 0.0.0.0:9000
User-Agent: python-requests/2.28.1
Accept-Encoding: gzip, deflate
Accept: */*
Connection: keep-alive
x-webhook-secret: something-very-very-secret
Content-Length: 107
Content-Type: application/json



Body:
{"username": "marzban_test_user", "action": "user_updated", "enqueued_at": 1680506457.636369, "tries": 0}
```
::: 