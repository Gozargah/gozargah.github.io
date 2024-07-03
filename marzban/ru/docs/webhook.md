---
title: Webhook
description: Webhook
---

Вы можете установить webhook адрес и Marzban будет отправлять уведомления на него.

Запросы будут отправлены в виде POST запроса на адрес, указанный в `WEBHOOK_ADDRESS` `WEBHOOK_SECRET`заголовках `x-webhook-secret`.

Пример запроса, отправленного из Marzban:

```http
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
[{"username": "marzban_test_user", "action": "user_updated", "enqueued_at": 1680506457.636369, "tries": 0}]
```

Различные типы действий: `user_created`, `user_updated`, `user_deleted`, `user_limited`, `user_expired`, `user_disabled`,`user_enabled`, `data_usage_reset`, `subscription_revoked`, `reached_usage_percent`, `reached_days_left`
