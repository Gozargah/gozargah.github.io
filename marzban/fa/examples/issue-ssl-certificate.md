---
title: ساخت گواهی SSL
---

# ساخت گواهی SSL
آموزش های پایین مربوط به دریافت گواهی SSL برای استفاده در مرزبان است.

::: warning توجه
فایل های گواهی باید در آدرس `/var/lib/marzban/certs` در دسترس باشند تا مرزبان بتواند به آنها دسترسی داشته باشد.

در تمام مثال های پایین، فایل ها در این آدرس نصب خواهند شد.
:::

::: warning توجه
شما باید قبل از اقدام به دریافت گواهی SSL، رکورد های DNS دامنه را ثبت کرده باشید.
:::

## دریافت گواهی با acme.sh

- با دستور زیر، [acme.sh](https://github.com/acmesh-official/acme.sh) را نصب کنید.

`YOUR_EMAIL` را به ایمیل خود تغییر دهید.

::: tip نکته
در صورتی که acme.sh را قبلا نصب کرده‌اید، دیگر نیازی به انجام این مرحله نیست.
:::

```bash
curl https://get.acme.sh | sh -s email=YOUR_EMAIL
```

- برای دریافت گواهی، دستورات زیر را به ترتیب اجرا کنید.

`YOUR_DOMAIN` را به دامنه یا ساب‌دامنه‌ی مورد نظر خود تغییر دهید.

```bash

export DOMAIN=YOUR_DOMAIN

mkdir -p /var/lib/marzban/certs

~/.acme.sh/acme.sh \
  --issue --force --standalone -d "$DOMAIN" \
  --fullchain-file "/var/lib/marzban/certs/$DOMAIN.cer" \
  --key-file "/var/lib/marzban/certs/$DOMAIN.cer.key"

```

## دریافت گواهی دامنه ثبت شده بر کلودفلر

- اگر دامنه بر روی کلودفلر ثبت شده و روش های بالا پاسخگو نبود، از حالت دستی استفاده کنید

  `example.com` را به دامنه خود تغییر دهید

  - بعد از نصب acme مراحل زیر را اجرا کنید
 
```
curl https://get.acme.sh
```

1. قدم اول:
```
~/.acme.sh/acme.sh --issue -d example.com --dns \
 --yes-I-know-dns-manual-mode-enough-go-ahead-please
```
- بعد از اجرا دو مقدار مانند عکس زیر به شما داده میشود

  ![image](https://github.com/Gozargah/gozargah.github.io/assets/67644313/538c8341-fa77-4b06-96a4-73c29f3e0ded)

2. قدم دوم:
به کلودفلر رفته و یک رکورد از تایپ txt ایجاد کنید و مقادیر را مانند عکس زیر وارد کنید

![image](https://github.com/Gozargah/gozargah.github.io/assets/67644313/dad9c59a-da1f-440b-aa6e-ad524aff212a)

3. قدم سوم:
  با دستور زیر سرتیفیکیت را دریافت کنید
```
~/.acme.sh/acme.sh --renew -d example.com \
  --yes-I-know-dns-manual-mode-enough-go-ahead-please
```

- در آخر فایل سرتیفیکیت دامین شما در آدرس زیر

`/root/.acme.sh/example.com_ecc/fullchain.cer`

- و فایل پرایوت کی در آدرس زیر ذخیره میشود

`/root/.acme.sh/example.com_ecc/example.com.key`
