---
title: اسکریپت مرزبان
---

# اسکریپت مرزبان

اسکریپت‌های مرزبان برای راه‌اندازی پنل مرزبان یا مرزبان نود در این بخش وجود دارند.

## راه‌اندازی پنل مرزبان

- با دستور زیر مرزبان را روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
- با دستور زیر فقط اسکریپت را نصب کنید تا کامندهای مرزبان را داشته باشید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install-script
```
- دستور زیر یک نمونه برای نصب ورژن خاصی از مرزبان است.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install v0.5.2
```
::: tip نکته
- برای دیدن همه کامندهای مرزبان از کامند زیر استفاده کنید.
```bash
marzban help
```
:::
- با دستور زیر ورژن دولوپر مرزبان را روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install dev
```
::: warning توجه
- ورژن دولوپر مرزبان مداوم در حال تغییر و آزمایش است، از این رو فقط برای کسانی پیشنهاد می‌شود که دانش برنامه‌نویسی دارند، پس اگر کاربر ساده هستید این ورژن را نصب نکنید چراکه ممکنه تغییرات باعث ایجاد باگ در عملکرد پنل و همینطور دیتابیس شما بشود.
:::

## راه‌اندازی مرزبان نود

- با دستور زیر مرزبان نود را روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install
```
- با دستور زیر مرزبان نود را با اسم دلخواه خودتان روی سرور نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install --name marzban-node2
```
- با دستور زیر فقط اسکریپت را نصب کنید تا کامندهای مرزبان نود را داشته باشید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install-script
```
::: tip نکته
- برای دیدن همه کامندهای مرزبان نود از کامند زیر استفاده کنید.
```bash
marzban-node help
```
:::
