---
title: کوئری‌ های کاربردی SQL
---

::: warning توجه
در صورت استفاده نادرست از کوئری و یا تریگر ها هرگونه خرابی دیتابیس به عهده خود فرد می باشد ، در صورت نداشتن دانش فنی، از استفاده کوئری و علی الخصوص تریگر ها خود داری کنید.
:::

# کوئری های کاربردی SQL
به کمک این آموزش، شما می‌توانید از طریق کوئری های کاربردی `SQL` در دیتابیس خود کارهای مختلفی را انجام بدید که در فضای پنل ممکن نیست. 

به صورت خلاصه کوئری یعنی پرسیدن یک سوال از دیتابیس و خروجی گرفتن، ولی خیلی از کوئری‌ها به جای خروجی دادن، در دیتابیس تغییر ایجاد می‌کنن لذا اصولا به دسته دوم کوئری نمیگن و صرفاً از روی عادت همه را کوئری خطاب می‌کنیم.

::: warning توجه
برای استفاده کردن از کوئری های `SQL` لازم است تا اول `MySQL` را طبق آموزش [راه‌اندازی MySQL](https://gozargah.github.io/marzban/fa/examples/mysql) راه‌اندازی کرده باشید و پنل مدیریت دیتابیس `PhpMyAdmin` را نیز فعال کرده باشید، همچنین `MySQL` در نسخه `v0.3.2` و بالاتر پشتیبانی می‌شود. 
:::

::: warning توجه
در خصوص کدهای `SQL` که به جای خروجی دادن به شما، در دیتابیس تغییر خاصی ایجاد می کنند لازم است تا قبلا از وارد کردن آن ها طبق داکیومنت [بک‌آپ گرفتن](https://gozargah.github.io/marzban/fa/examples/backup) بک‌آپ بگیرید، چونکه ممکن است تغییراتی در دیتابیس ایجاد شود که بازگشت آن ها به قبل امکان پذیر نباشد.
:::

## نحوه وارد کردن کوئری
ابتدا به پنل مدیریت دیتابیس مرزبان که به صورت پیش فرض روی پورت `8010` ران میشه لاگین کنید. در منوی سمت چپ روی `marzban` بزنید بعد بالای صفحه قسمت `SQL` و یک باکس سفید میاد که یک کد پیش فرض نوشته شده، اول آن را پاک می‌کنیم و بعد کوئری را وارد می‌کنیم و در نهایت دکمه `Go` که پایین باکس قرار دارد را می‌زنیم.

## لیست کوئری‌ های کاربردی SQL

- لیست کاربرانی که اشتراک آن‌ها در یک روز تعیین شده تمام می‌شود.
```sql
SELECT * FROM users 
WHERE expire >= UNIX_TIMESTAMP('2024-06-13 00:00:00') 
  AND expire < UNIX_TIMESTAMP('2024-06-14 00:00:00') 
  AND status = 'active';
```
::: tip نکته
در واقع با این کوئری، ما لیست یوزرهایی که `13` ژوئن اشتراک آن‌ها تمام می‌شود را می‌بینیم، تاریخ اولی ملاک هست.
:::

- لیست کاربرانی که تا تاریخ مشخصی زمانشان به اتمام میرسد.
```sql
SELECT * FROM users 
WHERE expire < UNIX_TIMESTAMP('2024-03-10') 
  AND status = 'active';
```

::: tip نکته
فرضا `7` مارس هست توی کوئری بالا `10` مارس تعیین شده پس تمام کاربرانی که `3` روز از زمان آنها باقی مانده را خروجی میدهد. 
:::

- لیست کاربرانی که کمتر از `2` گیگابایت از حجم شان باقی مانده است.
```sql
SELECT * FROM users 
WHERE data_limit - used_traffic < (2 * 1024 * 1024 * 1024)  
  AND status = 'active' 
  AND data_limit IS NOT NULL
```

- لیست کاربرانی که `90` درصد حجم خود را مصرف کرده‌اند.
```sql
SELECT * FROM users
WHERE used_traffic >= 0.9 * data_limit
  AND status = 'active'
  AND data_limit IS NOT NULL;
```

- لیست حجم‌های زده شده به تفکیک هر ادمین
```sql
SELECT admins.username, users.data_limit/1073741824, Count(*)
FROM admins 
LEFT JOIN users ON users.admin_id = admins.id
GROUP BY admins.username, users.data_limit
```

- مشاهده حجم مصرفی ادمین‌ها
```sql
SELECT admins.username, (SUM(users.used_traffic) + IFNULL(SUM(user_usage_logs.used_traffic_at_reset), 0)) / 1073741824
FROM admins 
LEFT JOIN users ON users.admin_id = admins.id 
LEFT JOIN user_usage_logs ON user_usage_logs.user_id = users.id
Group By admins.username
```

- میزان مصرف ادمین‌ها از هر نود
```sql
SELECT admins.username, nodes.name, SUM(node_user_usages.used_traffic)/1073741824
FROM nodes
LEFT JOIN node_user_usages ON node_user_usages.node_id = nodes.id
LEFT JOIN users ON node_user_usages.user_id = users.id
LEFT JOIN admins ON users.admin_id = admins.id
GROUP BY admins.username, nodes.name;
```

- مشاهده تعداد کاربران یک ادمین همراه با وضعیت‌های مختلف آن‌ها
```sql
SELECT
    COUNT(*) AS total_users,
    SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_users,
    SUM(CASE WHEN status = 'expired' THEN 1 ELSE 0 END) AS expired_users,
    SUM(CASE WHEN status = 'limited' THEN 1 ELSE 0 END) AS limited_users,
    SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, now(), online_at) = 0 THEN 1 ELSE 0 END) AS online_users
FROM users
WHERE admin_id = ADMIN_ID;
```

- مشاهده اسم کلاینت کاربران به تعداد
```sql
SELECT SUBSTR(sub_last_user_agent ,1,9), COUNT(*) FROM users
WHERE status = 'active' GROUP By SUBSTR(sub_last_user_agent ,1,9) 
ORDER By SUBSTR(sub_last_user_agent ,1,9);
```

- مشاهده کاربران آنلاین و تعداد آن‌ها
```sql
SELECT username
FROM users
WHERE TIMESTAMPDIFF(MINUTE, now(), online_at) = 0;
```

- مشاهده کاربران آفلاین به مدت 24 ساعت یا بیشتر
```sql
SELECT username, TIMESTAMPDIFF(HOUR, online_at, NOW()) AS LastOnlineHours
FROM users
WHERE TIMESTAMPDIFF(HOUR, online_at, NOW()) >= 24
  AND status = 'active'
ORDER BY LastOnlineHours DESC;
```

- لیست کاربرانی که در `1` روز اخیر لینک سابسکریپشن خود را آپدیت کردند.
```sql
SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users
WHERE datediff(now(), sub_updated_at) < 1 AND status = 'active' ORDER BY LastUpdate DESC;
```

- لیست کاربرانی که در `10` روز اخیر لینک سابسکریپشن خود را آپدیت نکردند.
```sql
SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users 
WHERE datediff(now(), sub_updated_at) > 10 AND status = 'active' ORDER BY LastUpdate DESC;
```

::: tip نکته
در کوئری بالا جای عدد `10` تعداد روز دلخواه را بگذارید. 
:::

- لیست کاربرانی که اینباند غیرفعال دارند.
```sql
SELECT users.username, proxies.id, exclude_inbounds_association.inbound_tag FROM users INNER JOIN proxies 
ON proxies.user_id = users.id INNER JOIN exclude_inbounds_association 
ON exclude_inbounds_association.proxy_id = proxies.id ORDER BY users.username;
```

- لیست کاربرانی که پروتکل `Vmess` برای آن‌ها غیر فعال است.
```sql
SELECT users.username FROM users 
WHERE users.username not in (SELECT users.username FROM users LEFT JOIN proxies ON proxies.user_id = users.id 
WHERE proxies.type = 'VMESS');
```

::: tip نکته
 در خصوص کوئری بالا اگر قصد دارید پروتکل‌های دیگر را چک کنید فقط اسم پروتکل را عوض کنید و حتما حروف بزرگ باشد.
:::

- لیست کاربرانی که از یک نود خاص استفاده کرده‌اند به ترتیب بیشترین مصرف به کمترین مصرف
```sql
SELECT users.id, users.username, SUM(node_user_usages.used_traffic) AS total_used_traffic
FROM node_user_usages
INNER JOIN users ON node_user_usages.user_id = users.id
WHERE node_user_usages.node_id = 100
GROUP BY users.id, users.username
ORDER BY total_used_traffic DESC;
```
::: tip نکته
جای عدد `100` عدد نود آیدی را از تیبل `nodes` پیدا کرده و جایگزین کنید.
:::

-  مجموع حجم‌های تعیین شده توسط ادمین‌ها بر حسب ترابایت
```sql
SELECT admins.username, SUM(users.data_limit) / 1099511627776 AS total_data_limit_tb
FROM users
LEFT JOIN admins ON users.admin_id = admins.id
GROUP BY admins.username;
```

-  مجموع حجم‌های تعیین شده توسط ادمین‌ها بر حسب گیگابایت
```sql
SELECT admins.username, SUM(users.data_limit) / 1073741824 AS total_data_limit_gb
FROM users
LEFT JOIN admins ON users.admin_id = admins.id
GROUP BY admins.username;
```

- کاربرهایی که محدودیت زمان ندارند
```sql
SELECT id, username
FROM users
WHERE expire IS NULL;
```

- کاربرهایی که محدودیت حجم ندارند
```sql
SELECT id, username
FROM users
WHERE data_limit IS NULL;
```

## اسکریپت های کاربردی SQL
اسکریپت های `SQL` بر خلاف کوئری ها به جای خروجی دادن به شما در دیتابیس تغییر ایجاد می‌کنند.

- جابجایی کاربران بین ادمین‌ها
```sql
UPDATE users SET users.admin_id = 3
WHERE users.admin_id = 6;
```

::: tip نکته
در نمونه بالا کاربران ادمینی که آیدی او در تیبل دیتابیس 6 هست به ادمینی که آیدی او 3 هست منتقل شده است.
:::

- غیر فعال کردن تمام کاربران یک ادمین خاص
```sql
UPDATE users SET users.status= 'disabled' 
WHERE users.admin_id = '1' and users.status= 'active'
```

- فعال کردن تمام کاربران غیر فعال یک ادمین خاص
```sql
UPDATE users SET users.status= 'active' 
WHERE users.admin_id = '1' and users.status= 'disabled'
```

- اضافه کردن `1` روز به زمان کاربران همه ادمین‌ها سودو و غیر سودو
```sql
UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL
```

- کم کردن `1` روز از زمان کاربران همه ادمین‌ها سودو و غیر سودو
```sql
UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL
```

- اضافه کردن `1` روز به زمان کاربران یک ادمین خاص
```sql
UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL and admin_id in (100,200)
```

- کم کردن `1` روز از زمان کاربران یک ادمین خاص
```sql
UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL and admin_id in (100,200)
```

- اضافه کردن `20` درصد از حجم تعیین شده همه کاربران یک ادمین خاص به آن ها
```sql
UPDATE users SET data_limit = data_limit + (data_limit * 20) / 100  WHERE data_limit IS NOT NULL and admin_id in (100,200)
```

- کم کردن `20` درصد از حجم تعیین شده همه کاربران یک ادمین خاص از آن ها
```sql
UPDATE users SET data_limit = data_limit - (data_limit * 20) / 100  WHERE data_limit IS NOT NULL and admin_id in (100,200)
```

::: tip نکته
در خصوص دو اسکریپت `SQL` بالا برای تغییر درصد، عدد `20` را به عدد دلخواه تغییر دهید. دقت کنید بیست درصد از حجم تعیین شده برای هر کاربر به آن اضافه خواهد شد، برای مثال اگر حجم تعیین شده کاربری `100` گیگابایت باشد، بعد از اجرا کردن کد بالا حجم او `120` گیگابایت خواهد بود.
:::

::: tip نکته
در خصوص اسکریپت های `SQL` که برای یک ادمین خاص هستند لازم است تا آیدی ادمین در تیبل دیتابیس را وارد کنید بعد کد را ران کنید، در بعضی کدها ممکن است صرفا یوزنیم ادمین لازم باشد پس تفاوت این دو نوع کد را تشخیص دهید. همچنین در بعضی کدها برای مثال دو آیدی در پرانتز با کاما بین آن ها آمده است، اگر یک ادمین دارید صرفا آیدی یک ادمین را بگذارید و اگر بیش از یک ادمین دارید، به تعداد ادمین ها آن ها را با کاما از هم جدا کنید.
:::

- حذف کاربرانی که بیشتر از `30` روز از تاریخ انقضا آن‌ها گذشته 
```sql
delete from users where datediff(now(),from_unixtime(expire))> 30
```

::: tip نکته
در خصوص مورد بالا باید تیک `enable foreign key checks` خاموش باشد.
:::

- حذف همه کاربرانی که غیرفعال شده‌اند.
```sql
delete from users where status = 'disabled'
```

- کاربرانی که پروتکل `Vless` را فعال دارند اگر `Flow`  برای آن‌ها ست نشده باشه برای آن‌ها ست می‌کند.
```sql
UPDATE proxies
SET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision')
WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = '';
```

- فعال کردن پروتکل `Vmess` برای کاربران همه ادمین‌ها سودو و غیر سودو
```sql
INSERT INTO proxies (user_id, type,  settings) 
SELECT id, "VMess", CONCAT("{""id"": """, CONVERT(UUID() , CHAR) , """}") 
FROM users;
```

- غیرفعال کردن پروتکل `Vmess` برای کاربران همه ادمین‌ها سودو و غیر سودو
```sql
DELETE FROM proxies WHERE type = "VMess"
```

- فعال کردن پروتکل `Vmess` برای کاربران یک ادمین خاص 
```sql
INSERT INTO proxies (user_id, type,  settings) SELECT id, "VMess", CONCAT("{""id"": """, CONVERT(UUID() , CHAR) , """}") 
FROM users inner join admins ON  users.admin_id = admins.id 
WHERE admins.username = "admin1";
```

- غیرفعال کردن پروتکل `Vmess` برای کاربران یک ادمین خاص
```sql
DELETE proxies
FROM proxies
WHERE type = 'VMess' and proxies.id in (
    SELECT p.id
    FROM
    (
        SELECT proxies.id
        FROM proxies 
        INNER JOIN users ON proxies.user_id = users.id
        INNER JOIN admins ON users.admin_id = admins.id
        WHERE admins.username = 'admin1'
    ) AS p
);
```

::: tip نکته
در خصوص فعال یا غیرفعال کردن پروتکل‌ها برای سایر پروتکل‌ها خودتون می‌تونین جای `VMess` قرار بدید و وارد کنید. همچنین جای `admin1` یوزنیم ادمین مورد نظر خود را قرار بدید و وارد کنید.
:::

- کوئری برای فعال کردن پروتکل تروجان
```sql
INSERT INTO proxies (TYPE, user_id, settings) 
SELECT 'trojan' AS TYPE, id, CONCAT( '{"password": "', SUBSTRING( CONCAT( CHAR(FLOOR(65 + (RAND() * 26))), CHAR(FLOOR(97 + (RAND() * 26))), CHAR(FLOOR(48 + (RAND() * 10))), CONVERT(SHA2(RAND(), 256) USING utf8mb4)), 1, 22 ), '", "flow": ""}' ) AS settings FROM users WHERE id in ( select id from users where id not in ( select user_id from proxies where type = 'trojan' ) );
```

- کوئری برای فعال کردن پروتکل شدوساکس
```sql
INSERT INTO proxies (TYPE, user_id, settings) 
SELECT 'Shadowsocks' AS TYPE, id, CONCAT( '{"password": "', SUBSTRING( CONCAT( CHAR(FLOOR(65 + (RAND() * 26))), CHAR(FLOOR(97 + (RAND() * 26))), CHAR(FLOOR(48 + (RAND() * 10))), CONVERT(SHA2(RAND(), 256) USING utf8mb4)), 1, 22 ), '", "method": "aes-128-gcm"}' ) AS settings FROM users WHERE id in ( select id from users where id not in ( select user_id from proxies where type = 'Shadowsocks' ) );
```

- فعال کردن یک اینباند خاص برای کاربران همه ادمین‌ها سودو و غیر سودو
```sql
DELETE FROM exclude_inbounds_association 
WHERE proxy_id IN (
    SELECT proxies.id
    FROM users
    INNER JOIN admins ON users.admin_id = admins.id
    INNER JOIN proxies ON proxies.user_id = users.id
) AND inbound_tag = 'INBOUND_NAME';
```

- فعال کردن یک اینباند خاص برای کاربران یک ادمین خاص
```sql
DELETE FROM exclude_inbounds_association 
WHERE proxy_id IN (
    SELECT proxies.id
    FROM users
    INNER JOIN admins ON users.admin_id = admins.id
    INNER JOIN proxies ON proxies.user_id = users.id
    WHERE admins.username = 'ADMIN'
) AND inbound_tag = 'INBOUND_NAME';
```

- غیرفعال کردن یک اینباند خاص برای کاربران همه ادمین‌ها سودو و غیر سودو
```sql
INSERT INTO exclude_inbounds_association (proxy_id, inbound_tag)
SELECT  proxies.id, "INBOUND_NAME"
FROM users  INNER JOIN admins ON users.admin_id = admins.id  INNER JOIN proxies ON proxies.user_id = users.id
```

- غیرفعال کردن یک اینباند خاص برای کاربران یک ادمین خاص
```sql
INSERT INTO exclude_inbounds_association (proxy_id, inbound_tag)
SELECT  proxies.id, "INBOUND_NAME"
FROM users  INNER JOIN admins ON users.admin_id = admins.id  INNER JOIN proxies ON proxies.user_id = users.id
Where admins.username = "ADMIN";
```

::: tip نکته
در کوئری‌ها بالا که در خصوص فعال و غیرفعال کردن اینباند هست لازمه که جای `INBOUND_NAME` اسم اینباند مورد نظرتون را بگذارید و فقط در کوئری‌های مربوط به یک ادمین خاص یوزنیم ادمین مورد نظرتون را جای `ADMIN` قرار بدید.
:::

::: warning توجه
در چهار کوئری‌ بالا که برای فعال یا غیرفعال کردن اینباند هست لازمه بدانید اگر به عنوان مثال پروتکل `Vless` برای کاربران فعال نباشد کوئری‌ های بالا برای فعال کردن اینباند تاثیری نخواهند داشت پس اول باید آن پروتکل به خصوص فعال باشد بعد اینباند آن پروتکل دلخواه را فعال یا غیرفعال کنید.
:::

::: warning توجه
دقت کنید اگر از اسکریپت‌های `SQL` بالا برای فعال کردن پروتکل یا اینباند استفاده ‌می‌کنید، اگر آن اینباند یا پروتکل از قبل حتی برای یک کاربر فعال باشه، تکراری ثبت میشه و باعث میشه `Xray` تمام نودهای شما مکررا ریستارت بشه لذا اگر قصد دارید پروتکل یا اینباند خاصی را برای کاربران فعال کنید، اول برای همه آن را غیرفعال کنید تا اگر از قبل برای کسی فعال بوده غیرفعال شود و سپس برای همه فعال کنید.
:::

- اگر از کوئری برای پاک کردن یوزرها استفاده کردید، پیشنهاد می‌شود که `3` کوئری زیر اجرا بشه تا پروکسی‌ها و ریست حجم‌ها و اکسکلود‌های کاربرهای حذف شده پاک شود در نتیجه دیتابیس سبک‌تر شود.

```sql
delete from proxies where user_id not in (select id from users);
```
```sql
delete from user_usage_logs where user_id not in (select id from users);
```
```sql
delete from exclude_inbounds_association where proxy_id not in (select id from proxies);
```
- اگر `exclude inbound` نداشته باشید کوئری سوم هیچ رکوردی را پاک نخواهد کرد.

::: tip نکته
- پیشنهاد میشه جدول `node_user_usages` رو هم `empty` بزنید. 

در آخر پیشنهاد میشه بعد از انجام مراحل بالا، روی جدول‌های 

`users`

`proxies `

`exclude_inbound_association` 

`user_usages_logs`

گزینه `optimize table` رو نیز بزنید.

- این بخش را در بالای صفحه قسمت `Operations` بعد بخش `Table maintenance` می‌توانید پیدا کنید.
:::

::: tip نکته
همچنین حتما بصورت دوره‌ای کاربرهای غیرفعال را پاک کنید چراکه در سرعت پنل و باگ‌های ناشناخته از قبیل `dead lock` تاثیر خواهد داشت.
:::

## ایونت‌ های کاربردی SQL
ایونت‌ها برای سکریپت‌های `SQL` که می‌خوایم در زمان خاصی اجرا بشن کاربرد دارن و فقط برای کوئری‌هایی که در دیتابیس تغییری ایجاد می‌کنن، میشه ایونت قرار داد و برای کوئری‌هایی که خروجی میدن نمیشه این کار را انجام داد.

- کد `SQL` زیر یک `Event` میسازه که هر جمعه ساعت `12` شب جدول `node_user_usages` را خالی می‌کنه که حجم بکاپ‌تون بالا نره و برای بازگردانی بکاپ با مشکل مواجه نشوید. کسانی که تعداد کاربر بالا دارند می‌توانند این `Event` را برای هر شب تنظیم کنند. 
```sql
CREATE EVENT Clear_NodeUserUsages ON SCHEDULE 
EVERY 1 WEEK STARTS '2024-05-03 00:00:00' ON COMPLETION NOT PRESERVE ENABLE 
DO TRUNCATE node_user_usages
```

- ایونت روزانه برای ست کردن `Flow` چنانچه فراموش کنید برای کاربر بگذارید.
```sql
CREATE DEFINER=`root`@`%` EVENT `SetFlow` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-01 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO 
UPDATE proxies SET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision') 
WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = ''; 
```

::: tip نکته
چطور یک ایونت را خاموش کنیم؟ بعد از فعال کردن اون بالا دکمه `Drop` را بزنین غیرفعال می‌شود ، اما توجه داشته باشید اگر دکمه `On` و `Off` کنید کلیه `Event` ها غیرفعال می‌شوند. 
:::

## تریگر های کاربردی SQL
::: tip نکته
تریگر یک رویداد هست که روی جدول رخ میده و شامل سه نوع می‌شود.

- موقع اضافه کردن رکورد به جدول 
- موقع ویرایش رکورد 
- موقع حذف رکورد 

روی این سه حالت میشه تریگر زد که کار خاصی انجام بشه یا کلا جلوی آن را گرفت. 
:::

- تریگر برای جلوگیری از حذف اکانت توسط ادمین‌های خاص
```sql
DELIMITER //

CREATE TRIGGER admin_delete
BEFORE DELETE ON users
FOR EACH ROW
BEGIN
    IF OLD.admin_id IN (100, 200, 300) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Deletion not allowed.';
    END IF;
END //

DELIMITER ;
```
برای غیرفعال کردن تریگر‌ها مثل ایونت‌ها دکمه `Drop` را بزنید غیرفعال می‌شود. 

::: tip نکته
دقت کنین داخل پرانتز برای مثال سه تا آیدی ذکر شده ، این بستگی به شما داره که بخواید روی چندتا از ادمین‌هاتون این تریگر را اعمال کنید، آیدی ادمین مورد نظرتون را از تیبل‌های دیتابیس پیدا کرده و جایگزین کنید.
:::

- تریگر برای غیرفعال کردن دکمه ریست حجم برای ادمین‌ها
```sql
DELIMITER //

CREATE TRIGGER admin_edit_permission 
BEFORE UPDATE ON users 
FOR EACH ROW 
BEGIN
    IF NEW.used_traffic <> OLD.used_traffic AND NEW.used_traffic = 0 THEN
        IF OLD.admin_id IN (3, 4) THEN
            SIGNAL SQLSTATE '45000'
            SET MESSAGE_TEXT = 'Edit is not allowed.';
        END IF;    
    END IF;
END;
//

DELIMITER ;
```

- تریگر برای تعیین حجم برای ادمین‌ها

```sql
DELIMITER //

CREATE TRIGGER Limit_Admin_TotalData
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    DECLARE total_data_limit BIGINT;

    -- Calculate the total data limit of all users created by the admin
    SELECT SUM(data_limit) INTO total_data_limit
    FROM users
    WHERE admin_id = 1;

    -- Check if the total data limit exceeds or equals 1 TB
    IF total_data_limit >= (1 * 1024 * 1024 * 1024 * 1024) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Admin has reached the total data limit.';
    END IF;
END //

DELIMITER ;
```

```sql
DELIMITER //

CREATE TRIGGER Limit_Admin_TotalData_Update
BEFORE UPDATE ON users
FOR EACH ROW
BEGIN
    DECLARE total_data_limit BIGINT;

    -- Calculate the total data limit of all users created by the admin
    SELECT SUM(data_limit) INTO total_data_limit
    FROM users
    WHERE admin_id = 1;

    -- Check if the total data limit exceeds or equals 1 TB
    IF total_data_limit >= (1 * 1024 * 1024 * 1024 * 1024) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Admin has reached the total data limit.';
    END IF;
END //

DELIMITER ;
```

::: tip نکته
تریگر اول برای ایجاد محدودیت هنگام ساخت کاربر و تریگر دوم برای ایجاد محدودیت هنگام ویرایش هست، در نتیجه اگر قصد دارید برای ادمین محدودیت حجم بگذارید، لازم است هر دو تریگر را متناسب با میزان محدودیت دلخواه وارد کنید.
:::

::: tip نکته
این تریگر حجم معین شده را برای ادمین موردنظر محدود می‌کند نه حجم مصرفی، به این معنا که جمع کل حجم تعیین شده برای کاربرهای ادمین باید کمتر یا مساوی با لیمیت تعیین شده توسط شما باشد. حجم پیش فرض در تریگر 1 ترابایت تعیین شده که با تغییر عدد 1 می‌توانید آن را تغییر دهید.
:::

::: tip نکته
دقت کنید اگر چند ادمین دارید و قصد دارید برای هر کدام لیمیت متفاوت تعیین کنید، باید این تریگر را با ادمین آیدی موردنظر و همچنین نام متفاوت وارد کنید چون دو تریگر هم نام را نمی‌توانید وارد کنید.
:::

- تریگر برای تعیین لیمیت تعداد کاربرهایی که ادمین می‌تواند ایجاد کند.
```sql
DELIMITER //

CREATE TRIGGER Limit_Admin_UserCreation
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    DECLARE user_count INT;

    -- Calculate the number of users created by the admin
    SELECT COUNT(*) INTO user_count
    FROM users
    WHERE admin_id = 1;

    -- Check if the number of users created by the admin exceeds the limit
    IF user_count = 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Admin has reached the limit of users.';
    END IF;
END //

DELIMITER ;
```

::: tip نکته
در تریگر بالا لیمیت 100 تعیین شده که می‌توانید تعداد دلخواه خود و همچنین ادمین آیدی مورد نظر را جایگزین کرده بعد وارد کنید.
:::

- تریگر برای تعیین پیشوند یوزرنیم برای ادمین‌ها
```sql
DELIMITER //

CREATE TRIGGER Add_Prefix_To_Username
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    -- Check if the admin_id is one of the specific admins
    IF NEW.admin_id IN (50, 100) THEN
        -- Check if the username does not already start with the prefix
        IF LEFT(NEW.username, LENGTH('prefix_')) != 'prefix_' THEN
            SET NEW.username = CONCAT('prefix_', NEW.username);
        END IF;
    END IF;
END //

DELIMITER ;
```

::: tip نکته
تریگر بالا پیشوند مورد نظر شما را برای کاربرهایی که ادمین ایجاد می‌کند قرار می‌دهد، دقت کنید پیشوند فقط برای کاربرهای جدید اعمال می‌شود. پیشوند مورد نظر خود را جای کلمه `prefix` قرار دهید بعد وارد کنید.
::: 
