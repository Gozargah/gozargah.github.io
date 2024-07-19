---
title: دریافت wildcard ssl
---

# کاربرد
با استفاده از این نوع `ssl` میتواند با یک بار ساخت سرتیفیکیت برای تمامی ساب دامنه هاتون سرتیفیکیت گرفته و نیاز نداشته باشد برای هر کدام یک سرتیفیکیت جدا بسازید.

::: warning توجه
فایل های گواهی باید در آدرس `/var/lib/marzban/certs` در دسترس باشند تا مرزبان بتواند به آنها دسترسی داشته باشد.

در تمام مثال های پایین، فایل ها در این آدرس نصب خواهند شد.
:::

::: warning توجه
برای دریافت این نوع `ssl` دامنه شما حتما باید روی `Cloudflare` باشد.
:::

## نصب پیش نیاز ها
```shell
apt install socat certbot
curl https://get.acme.sh | sh
~/.acme.sh/acme.sh --set-default-ca --server letsencrypt
```

## ساخت پوشه سرتیفیکیت ها

::: warning توجه
در صورتی که آدرس از قبل وجود داره از اجرای دستور بعدی خودداری کنید.
:::

```shell
mkdir /var/lib/marzban/certs/
```

## وارد کردن اطلاعات مورد نیاز
مقدار `CF_Key` همان `Global API Key` اکانت Cloudflare شما می باشد.

::: warning توجه
به هیچ عنوان `Global API Key` خود را در اختیار دیگران قرار ندهید.
:::

مقدار `CF_Email` همان ایمیل شماست که اکانت کلودفلر شما بر روی آن ثبت شده.

```shell
export CF_Key="exampleglobalapikey1234"
export CF_Email="example@gmail.com"
```

## ساخت سرتیفیکیت
برای ساخت سرتیفیکیت دامنه خود را در دستور زیر جایگزین کرده و دستور را اجرا کنید

```shell
~/.acme.sh/acme.sh --issue -d 'domain.xxx' -d '*.domain.xxx' --dns dns_cf --key-file /var/lib/marzban/certs/key.pem --fullchain-file /var/lib/marzban/certs/fullchain.pem
```

::: details دریافت سرتیفیکیت برای چند دامنه به طور همزمان
در صورتی که از چندین دامنه مختلف استفاده می کنید می توانید با استفاده از این روش یک سرتیفیکیت برای تمام اون ها دریافت کنید

دامنه های خود را به صورت زیر به دستور قبلی اضافه کنید
```
-d 'domain.xxx' -d '*.domain.xxx'
```
مثال برای 2 دامنه 
```
~/.acme.sh/acme.sh --issue -d 'domain1.xxx' -d '*.domain1.xxx' -d 'domain2.xxx' -d '*.domain2.xxx' --dns dns_cf --key-file /var/lib/marzban/certs/key.pem --fullchain-file /var/lib/marzban/certs/fullchain.pem
```

:::