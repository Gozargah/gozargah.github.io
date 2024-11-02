---
title: Marzban Webhook 
---

# Webhook 

- اگر به روشی برای مدیریت خودکار رویدادهای کاربران نیاز دارید، وب‌هوک‌ها یک راه‌حل منعطف را فراهم می‌کنند. وب‌هوک به شما این امکان را میدهد که در مورد رویدادهای مختلف، مانند ایجاد کاربر، به‌روزرسانی‌ها یا انقضا، اعلان‌هایی دریافت کنید که می‌تواند برای ادغام با سیستم‌های خارجی استفاده شود.

- **پیگیری رویدادها**: دریافت اعلان‌ها در مورد رویدادهای کاربر مانند ایجاد کاربر، به‌روزرسانی، محدودیت‌ها و غیره.

- **ادغام با سیستم‌های خارجی**: خودکار کردن اقداماتی مانند به‌روزرسانی یک دیتابیس، ارسال هشدارها یا انجام فرآیندهای دیگر در پاسخ به رویدادها در مرزبان.

::: tip نکته
اگر شما یک کاربر ساده هستید، به این بخش نیازی نخواهید نداشت.
:::

## **مرحله اول: پیکربندی URL وب‌هوک**

- اول `URL` جایی که می‌خواهید اعلان‌ها را دریافت کنید را در فایل `env` تعیین کنید.
```env
WEBHOOK_ADDRESS = "http://127.0.0.1:9000/,http://127.0.0.1:9001/"
```

- برای افزودن یک کلید مخفی برای تأیید درخواست، `WEBHOOK_SECRET` را تنظیم کنید.
```env
WEBHOOK_SECRET = "something-very-very-secret"
```

- حالا، مرزبان زمانی که یک رویداد خاص برای کاربر اتفاق بیفتد درخواست‌ها را به این `URL` ارسال خواهد کرد.

 - با استفاده از متغیر زیر هر `30` ثانیه صف نوتیفیکیشن‌ها چک میشه بعد برای وب‌هوک ارسال میشود.

```env
JOB_SEND_NOTIFICATIONS_INTERVAL = 30
```
- با استفاده از متغیر زیر میتوانید `URL` دیسکورد برای وب‌هوک تعیین کنید.
```env
DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/xxxxxxx"
```

## **مرحله دوم: پردازش اعلان‌های دریافتی**

- سرور شما که وب‌هوک‌ها را دریافت می‌کند باید درخواست‌ها با محتوای `JSON` را مدیریت کند. هر درخواست شامل یک هدر `x-webhook-secret` (در صورت تنظیم) برای امنیت و همچنین جزئیات مربوط به رویداد در `payload` است. در اینجا یک نمونه `payload JSON` آورده شده است.

```
{
  "username": "example_user",
  "action": "user_created",
  "enqueued_at": 1680506457.636369,
  "tries": 0
}
```

- `username`: نام کاربری مرتبط با رویداد
- `action`: نوع رویداد (مثلاً `user_created`، `user_updated`)
- `enqueued_at`: زمان وقوع رویداد
- `tries`: تعداد تلاش‌ها در صورت عدم موفقیت در ارسال اعلان

**انواع رویدادها:**

- قسمت `action` ممکن است دارای مقادیر زیر باشد

- `user_created`: زمانی که یک کاربر ایجاد می‌شود.
- `user_updated`: زمانی که جزئیات کاربر به‌روزرسانی می‌شود.
- `user_deleted`: زمانی که یک کاربر حذف می‌شود.
- `user_limited`: زمانی که حجم کاربر به پایان میرسد.
- `user_expired`: زمانی که حساب کاربر منقضی می‌شود.
- `user_disabled` / `user_enabled`: زمانی که یک کاربر غیرفعال یا فعال می‌شود.

## **مرحله سوم: کد نمونه برای دریافت یک وب‌هوک**

- در اینجا یک مثال با استفاده از `Python` و `Flask` برای راه‌اندازی یک سرور که اعلان‌های وب‌هوک مرزبان را تأیید می‌کند آورده شده است.
::: details کد نمونه
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

## نمونه‌ای از درخواست ارسال شده از مرزبان:

::: details نمونه درخواست
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
