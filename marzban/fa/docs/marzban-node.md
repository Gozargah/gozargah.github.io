---
title: راه‌اندازی Marzban Node
---

# راه‌اندازی Marzban Node
به کمک این آموزش، شما می‌توانید مرزبان نود روی یک سرور ایجاد کنین و آن راه به پنل مرکزی وصل کنین.

- اول دستور زیر را اجرا کنید تا سوکت ، کرل و گیت نصب شود.
```
apt install socat -y && apt install curl socat -y && apt install git -y
```
- مرزبان نود را کلون کنید.
```
git clone https://github.com/Gozargah/Marzban-node 
```
- وارد دایرکتوری Marzban-node شوید.
```
cd Marzban-node 
```
- داکر رو نصب کنید.
```
curl -fsSL https://get.docker.com | sh
```
- مرزبان نود را ران کنید.
```
docker compose up -d
```
- بعد سرتیفیکت مربوط به نود رو بگیرید.
```
cat /var/lib/marzban-node/ssl_cert.pem
```

## وصل کردن Marzban Node به پنل مرزبان

- وارد پنل شوید و از طریق منو همبرگری بالا سمت راست Node Settings را بزنید.
- سپس روی Add New Mazrban Node بزنید.
- بعد متغیرها رو به صورت زیر مقدار دهی کنید.

Name: اسم دلخواه برای نود

Address: آیپی سرور نود

Port: 62050

API Port: 62051 

Certificate: همان سرتیفیکت مرزبان نود که در مرحله آخر بخش قبل گرفتید

::: tip نکته
در صورتی که میخواین مرزبان نود شما برای همه اینباندها به عنوان یک هاست اضافه بشه تیک Add this node as a new host for every inbound 
 رو بزنید و بعد در Host Settings قسمت Address آیپی سرور نود رو قرار بدید. اگر نمیخواین نود برای همه اینباندها اضافه بشه لازم است که یک اینباند مجزا در Core Settings اضافه کنید و در Host Settings آیپی نود رو قرار بدید.
:::

حالا مرزبان نود شما به پنل مرزبان وصل شده است.

---
در صورتی که خواستید مرزبان نود را ریستارت کنید به شکل زیر عمل کنید.

- اول وارد دایرکتوری Marzban-node شوید.
```
cd Marzban-node
```
- سپس دستور زیر را اجرا کنید.

```
docker compose down && docker compose up -d
```
