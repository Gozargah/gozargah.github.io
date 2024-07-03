---
title: وبهوک
description: وبهوک
---

شما می‌توانید یک آدرس وبهوک تنظیم کنید و Marzban به آن آدرس اعلان‌ها را ارسال خواهد کرد.

درخواست‌ها به صورت درخواست‌های POST به آدرس مشخص شده در `WEBHOOK_ADDRESS` با هدر `WEBHOOK_SECRET` ارسال خواهند شد.

مثال یک درخواست ارسال شده از Marzban:

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
انواع مختلف اقدامات: user_created, user_updated, user_deleted, user_limited, user_expired, user_disabled,user_enabled, data_usage_reset, subscription_revoked, reached_usage_percent, reached_days_left
