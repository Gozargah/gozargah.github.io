---
title: پیکربندی
---

# پیکربندی

لیست تمامی متغیرهای محیطی مرزبان را در این صفحه مشاهده میکنید. شما می‌توانید تمام این متغیرها در فایل `.env` مقداردهی کنید.

::: tip مسیر فایل `.env` در نصب سریع
اگر به روش نصب سریع مرزبان را نصب کرده‌اید، فایل `.env` را می‌توانید در مسیر `/opt/marzban/.env` پیدا کنید. 
:::


## UVICORN_HOST
- مقدار پیش‌فرض: `0.0.0.0`

آیپی آدرسی که مرزبان روی آن اجرا میشود.

::: tip نکته
`0.0.0.0` به معنای تمام آدرس های موجود ماشین است.
:::

## UVICORN_PORT
- مقدار پیش‌فرض: `8000`

پورتی که مرزبان روی آن اجرا میشود.


## UVICORN_UDS

آدرس unix domain socket که مرزبان روی آن اجرا میشود.

::: tip نکته
در صورت مقداردهی، متغیر های `UVICORN_HOST` و `UVICORN_PORT` نادیده گرفته می‌شوند.
:::


## UVICORN_SSL_CERTFILE

آدرس فایل certificate گواهی SSL

(مثال: `/path/to/example.com/fullchain.pem`)

## UVICORN_SSL_KEYFILE
آدرس فایل key گواهی SSL

(مثال: `/path/to/example.com/key.pem`)


## XRAY_JSON
- مقدار پیش‌فرض: `xray_config.json`

آدرس فایل json پیکربندی xray


## XRAY_SUBSCRIPTION_URL_PREFIX

آدرس پیشوند لینک سابسکریپشن

::: warning توجه
در صورتی که این متغیر تعیین نشود، لینک سابسکریپشن ها در ربات تلگرام به درستی ارسال نخواهد شد.
:::


## XRAY_EXECUTABLE_PATH
- مقدار پیش‌فرض: `/usr/local/bin/xray`

آدرس فایل اجرایی xray


## XRAY_ASSETS_PATH
- مقدار پیش‌فرض: `/usr/local/share/xray`

آدرس پوشه فایل های asset برای xray (فایل های `geoip.dat` و `geosite.dat`)


## XRAY_EXCLUDE_INBOUND_TAGS

تگ inboundهایی که نیازی به مدیریت و وجود آنها در لیست پروکسی ها نیست.

(مثال: `"IBOUND_X INBOUND_Y INBOUND_Z"`)


## XRAY_FALLBACKS_INBOUND_TAG
در صورتی که از یک inbound با تعدادی fallback استفاده میکنید، تگ آن را در اینجا وارد کنید.


## TELEGRAM_API_TOKEN

توکن ربات تلگرام (دریافت از [@botfather](https://t.me/botfather))	


## TELEGRAM_ADMIN_ID

آیدی عددی ادمین در تلگرام (دریافت از [@userinfobot](https://t.me/userinfobot))


## TELEGRAM_PROXY_URL

برای اجرای ربات تلگرام با پروکسی (در صورتی که در سرور شما سرور های تلگرام مسدود شده‌اند.)

(مثال: `"socks5://127.0.0.1:1080"`)


## CUSTOM_TEMPLATES_DIRECTORY
- مقدار پیش‌فرض: `app/templates`
پوشه‌ی فایل های template


## CLASH_SUBSCRIPTION_TEMPLATE
- مقدار پیش‌فرض: `clash/default.yml`

template مورد استفاده برای تولید کانفیگ های Clash

(مثال: [default.yml](https://github.com/Gozargah/Marzban/blob/master/app/templates/clash/default.yml))


## SUBSCRIPTION_PAGE_TEMPLATE
- مقدار پیش‌فرض: `subscription/index.html`

template مورد استفاده برای صفحه اطلاعات سابسکریپشن

(مثال: [index.html](https://github.com/Gozargah/Marzban/blob/master/app/templates/subscription/index.html))


## HOME_PAGE_TEMPLATE
- مقدار پیش‌فرض: `home/index.html`

template مورد استفاده برای صفحه اصلی

(مثال: [index.html](https://github.com/Gozargah/Marzban/blob/master/app/templates/home/index.html))



## SQLALCHEMY_DATABASE_URL
- مقدار پیش‌فرض: `sqlite:///db.sqlite3`

آدرس دیتابیس در قابل آدرس های SQLAlchemy

::: tip راهنما
فرمت و درایور های موجود برای آدرس دیتابیس را در [مستندات SQLAlchemy](https://docs.sqlalchemy.org/en/20/core/engines.html#database-urls) مشاهده کنید.
:::


## WEBHOOK_ADDRESS
- مقدار پیش‌فرض: `DEFAULT`



## WEBHOOK_SECRET
- مقدار پیش‌فرض: `DEFAULT`



## SUDO_USERNAME
::: warning توجه
به شدت توصیه میشه تا از مرزبان cli برای ساخت ادمین استفاده کنید و از این متغیر استفاده نکنید.
:::
شما می توانید نام کاربری ادمین کل را از متغیر محیطی تنظیم کنید.


## SUDO_PASSWORD
::: warning توجه
به شدت توصیه میشه تا از مرزبان cli برای ساخت ادمین استفاده کنید و از این متغیر استفاده نکنید.
:::
شما می توانید گذرواژه ادمین کل را از متغیر محیطی تنظیم کنید.


## DOCS
- مقدار پیش‌فرض: `false`

فعال‌سازی مستندات API در آدرس `/docs` و ‍`/redoc`


## JWT_ACCESS_TOKEN_EXPIRE_MINUTES
- مقدار پیش‌فرض: `1440`

مدت زمان انقضا توکن دسترسی بر مبنی دقیقه

::: tip نکته
`0` به معنای 'بدون انقضا' است.
:::


## DEBUG
- مقدار پیش‌فرض: `false`

فعالسازی حالت توسعه (development)


## VITE_BASE_API
- مقدار پیش‌فرض: `/api/`

پیشوند مسیر API برای استفاده در داشبورد (front-end)
