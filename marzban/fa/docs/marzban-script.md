---
title: اسکریپت مرزبان
---

# اسکریپت مرزبان

اسکریپت‌های مرزبان برای راه‌اندازی پنل مرزبان یا مرزبان نود در این بخش وجود دارند.

## راه‌اندازی پنل مرزبان

- با دستور زیر مرزبان را با دیتابیس `SQLite` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
- با دستور زیر مرزبان را با دیتابیس `MySQL` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql
```
- با دستور زیر مرزبان را با دیتابیس `MariaDB` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
```
::: tip نکته
- اگر تعداد کاربرها و نودهای شما کم است دیتابیس `SQLite` برای شما مناسب است، اما برای تعداد کاربرها و نودهای زیاد حتما پیشنهاد می‌شود مرزبان را با دیتابیس `MySQL` راه‌اندازی کنید. دیتابیس `SQLite` همیشه تک کانکشن است و اگر تعداد کاربرها و نودهای شما زیاد باشد باعث کانکشن بیشتر به دیتابیس میشه و به احتمال زیاد دیتابیس‌تون قفل خواهد شد.
:::
::: tip نکته
- فعلا توضیحات لازم در خصوص دیتابیس `MariaDB` و همچنین اسکریپت بک‌آپ برای آن وجود ندارد، در نتیجه فقط در صورتی استفاده کنید که دانش کافی برای استفاده از آن را دارید.
:::
- دستور زیر یک نمونه برای نصب ورژن خاصی از مرزبان با دیتابیس `SQLite` است.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install v0.5.2
```
- دستور زیر یک نمونه برای نصب ورژن خاصی از مرزبان با دیتابیس `MySQL` است.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --version v0.5.2
```
- دستور زیر یک نمونه برای نصب ورژن خاصی از مرزبان با دیتابیس `MariaDB` است.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --version v0.5.2
```
::: warning توجه
دیتابیس MySQL در نسخه `v0.3.2` و بالاتر پشتیبانی می‌شود.
:::
- با دستور زیر ورژن دولوپر مرزبان را با دیتابیس `SQLite` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --dev
```
- با دستور زیر ورژن دولوپر مرزبان را با دیتابیس `MySQL` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --dev
```
- با دستور زیر ورژن دولوپر مرزبان را با دیتابیس `MariaDB` روی سرور خود نصب کنید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --dev
```
::: warning توجه
- ورژن دولوپر مرزبان مداوم در حال تغییر و آزمایش است، از این رو فقط برای کسانی پیشنهاد می‌شود که دانش برنامه‌نویسی دارند، پس اگر کاربر ساده هستید این ورژن را نصب نکنید چراکه ممکنه تغییرات باعث ایجاد باگ در عملکرد پنل و همینطور دیتابیس شما بشود.
:::
- با دستور زیر فقط اسکریپت را نصب کنید تا کامندهای مرزبان را داشته باشید.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install-script
```
::: tip نکته
- برای دیدن همه کامندهای مرزبان از کامند زیر استفاده کنید.
```bash
marzban help
```
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

## کامندهای مرزبان 

- با وارد کردن دستور زیر لیست کامندهای مرزبان را ببینید.
```
marzban help
```
- با استفاده از دستور زیر مرزبان را روشن کنید.
```
marzban up
```
- با استفاده از دستور زیر مرزبان را خاموش کنید.
```
marzban down 
```
- با استفاده از دستور زیر مرزبان را ریستارت کنید.
```
marzban restart 
```
- با استفاده از دستور زیر وضعیت مرزبان را ببینید.
```
marzban status 
```
- با استفاده از دستور زیر لاگ‌های مرزبان را ببینید.
```
marzban logs 
```
با استفاده از دستور زیر به خط فرمان (CLI) مرزبان دسترسی خواهید داشت.
```
marzban cli 
```
- با استفاده از دستور زیر مرزبان را آپدیت کنید.
```
marzban update 
```
- با استفاده از دستور زیر مرزبان را از سرور خود پاک کنید.
```
marzban uninstall 
```
- با استفاده از دستور زیر داکر مرزبان را ویرایش کنید.
```
marzban edit 
```
- با استفاده از دستور زیر فایل `.env` مرزبان را ویرایش کنید.
```
marzban edit-env
```
- با استفاده از دستور زیر ورژن هسته `Xray` مرزبان را تغییر دهید.
```
marzban core-update 
```
::: tip نکته
با وارد کرد کامند بالا فقط `10` ورژن آخر هسته `Xray` برای شما نمایش داده خواهد شد، اگر قصد دارید ورژن خاصی از هسته `Xray` را استفاده کنید باید حرف `m` را وارد کنید و سپس ورژن مورد نظر خود را بصورت زیر وارد کنید.
```
v1.8.24
```
:::

## کامندهای مرزبان نود

- با وارد کردن دستور زیر لیست کامندهای مرزبان نود را ببینید.
```
marzban-node help 
```
- با استفاده از دستور زیر مرزبان نود را روشن کنید.
```
marzban-node up 
```
- با استفاده از دستور زیر مرزبان نود را خاموش کنید.
```
marzban-node down 
```
- با استفاده از دستور زیر مرزبان نود را ریستارت کنید.
```
marzban-node restart 
```
- با استفاده از دستور زیر وضعیت مرزبان نود را ببینید.
```
marzban-node status 
```
- با استفاده از دستور زیر لاگ‌های مرزبان نود را ببینید.
```
marzban-node logs 
```
- با استفاده از دستور زیر مرزبان نود را آپدیت کنید.
```
marzban-node update 
```
- با استفاده از دستور زیر مرزبان نود را از سرور خود پاک کنید.
```
marzban-node uninstall 
```
- با استفاده از دستور زیر داکر مرزبان نود را ویرایش کنید.
```
marzban-node edit 
```
با استفاده از دستور زیر ورژن هسته `Xray` مرزبان نود را تغییر دهید.
```
marzban-node core-update 
```
::: tip نکته
با وارد کرد کامند بالا فقط `5` ورژن آخر هسته `Xray` برای شما نمایش داده خواهد شد، اگر قصد دارید ورژن خاصی از هسته `Xray` را استفاده کنید باید حرف `m` را وارد کنید و سپس ورژن مورد نظر خود را بصورت زیر وارد کنید.
```
v1.8.24
```
:::
