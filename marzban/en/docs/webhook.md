---
title: Webhook
description: Webhook
---

You can set a webhook address, and Marzban will send notifications to it.

Requests will be sent as POST requests to the address specified in the `WEBHOOK_ADDRESS` with the `WEBHOOK_SECRET` header.

Example of a request sent from Marzban:

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
Different action types: `user_created`, `user_updated`, `user_deleted`, `user_limited`, `user_expired`, `user_disabled`,`user_enabled`, `data_usage_reset`, `subscription_revoked`, `reached_usage_percent`, `reached_days_left`
