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