---
title: کوئری‌ های کاربردی SQL
---


# کوئری های کاربردی SQL
به کمک این آموزش، شما می‌توانید از طریق کوئری های کاربردی `SQL` در دیتابیس خود کارهای مختلفی رو انجام بدید که در فضای پنل ممکن نیست. 

به صورت خلاصه کوئری یعنی پرسیدن یک سوال از دیتابیس و خروجی گرفتن، ولی خیلی از کوئری‌ها به جای خروجی دادن، در دیتابیس تغییر ایجاد می‌کنن لذا اصولا به دسته دوم کوئری نمیگن و صرفاً از روی عادت همه رو کوئری خطاب می‌کنیم.

::: warning توجه
برای استفاده کردن از کوئری های `SQL` لازم است تا اول `MySQL` را طبق آموزش [راه‌اندازی MySQL](https://gozargah.github.io/marzban/fa/examples/mysql) راه‌اندازی کرده باشید و پنل مدیریت دیتابیس `PhpMyAdmin` را نیز فعال کرده باشید، همچنین `MySQL` در نسخه `v0.3.2` و بالاتر پشتیبانی می‌شود. 
:::

## نحوه وارد کردن کوئری
ابتدا به پنل مدیریت دیتابیس مرزبان که به صورت پیش فرض روی پورت `8010` ران میشه لاگین کنید. در منوی سمت چپ روی `marzban` بزنید بعد بالای صفحه قسمت `SQL` و یک باکس سفید میاد که یک کد پیش فرض نوشته شده، اول آن را پاک می‌کنیم و بعد کوئری را وارد می‌کنیم و در نهایت دکمه `Go` که پایین باکس قرار دارد را می‌زنیم.

## لیست کوئری‌ های کاربردی SQL
- دیدن لیست کاربرانی که تا تاریخ مشخصی زمانشان به اتمام میرسد
```sql
SELECT * FROM users WHERE expire < UNIX_TIMESTAMP('2024-03-10') and  status = 'active';
```
::: tip نکته
فرضا ۷ مارس هست توی کوئری بالا ۱۰ مارس تعیین شده پس تمام کاربرانی که ۳ روز از زمان آنها باقی مانده را خروجی میدهد. 
:::
- دیدن لیست کاربرانی که کمتر از 2 گیگابایت از حجم شان باقی مانده
```sql
SELECT * FROM users WHERE (data_limit - used_traffic) < (2*1024*1024*1024) and status = 'active' and data_limit IS NOT NULL;
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
- دیدن اسم کلاینت کاربران به تعداد
```sql
SELECT SUBSTR(sub_last_user_agent ,1,9), COUNT(*) FROM users
WHERE status = 'active' GROUP By SUBSTR(sub_last_user_agent ,1,9) 
ORDER By SUBSTR(sub_last_user_agent ,1,9);
```
- دیدن کاربران آنلاین و تعداد آن‌ها
```sql
SELECT username
FROM users
WHERE TIMESTAMPDIFF(MINUTE, now(), online_at) = 0;
```
- دیدن لیست کاربرانی که X روز لینک سابسکریپشن خودشون و آپدیت نزدن 
```sql
SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users 
WHERE datediff(now(), sub_updated_at) > 10 AND status = 'active' ORDER BY LastUpdate DESC;
```
::: tip نکته
در کوئری بالا جای عدد 10 تعداد روز دلخواه را بگذارید. 
:::
- دیدن لیست کاربرانی که اینباند غیرفعال دارن
```sql
SELECT users.username, proxies.id, exclude_inbounds_association.inbound_tag FROM users 
INNER JOIN proxies ON proxies.user_id = users.id  INNER JOIN exclude_inbounds_association ON exclude_inbounds_association.proxy_id = proxies.id 
ORDER BY users.username;
```
- دیدن لیست کاربرانی که پروتکل `Vmess` براشون غیر فعاله
```sql
SELECT users.username FROM users
WHERE users.username not in (SELECT users.username
FROM users  LEFT JOIN proxies ON proxies.user_id = users.id
WHERE proxies.type = 'VMESS');
```
::: tip نکته
 در خصوص کوئری بالا اگر پروتکل‌های دیگه رو می‌خواین چک کنین فقط اسم پروتکل رو عوض کنین و حتما حروف بزرگ باشد.
:::

## اسکریپت های کاربردی SQL
اسکریپت های `SQL` بر خلاف کوئری ها به جای خروجی دادن به شما در دیتابیس تغییر ایجاد می‌کنند.

- جابجایی کاربران بین ادمین‌ها
```sql
UPDATE users SET users.admin_id = 3
WHERE users.admin_id = 6;
```
- غیر فعال کردن تمام کاربران یک ادمین خاص
```sql
UPDATE users SET users.status= 'disabled' 
WHERE users.admin_id = '1' and and users.status= 'active'
```
- فعال کردن تمام کاربران غیر فعال یک ادمین خاص
```sql
UPDATE users SET users.status= 'active' 
WHERE users.admin_id = '1' and users.status= 'disabled'
```
- اضافه کردن 1 روز به زمان همه کاربران 
```sql
UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL
```
- کم کردن 1 روز از زمان همه کاربران 
```sql
UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL
```
- حذف کاربرانی که بیشتر از ۳۰ روز از تاریخ انقضاشون گذشته 
```sql
delete from users where datediff(now(),from_unixtime(expire))> 30
```
::: tip نکته
در خصوص مورد بالا باید تیک `enable foreign key checks` خاموش باشد.
:::
- کاربرهایی که پروتکل `Vless` رو فعال دارن و `Flow` ست نشده باشه براشون ست می‌کنه
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
- فعال کردن پروتوکل `Vmess` برای کاربران یک ادمین خاص 
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
در خصوص فعال یا غیرفعال کردن پروتکل‌ها برای سایر پروتکل‌ها خودتون می‌تونین جای Vmess قرار بدید و وارد کنید. همچنین جای admin1 یوزنیم ادمین مورد نظر خودتون رو قرار بدید و وارد کنید.
:::
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
در کوئری‌ها بالا که در خصوص فعال و غیرفعال کردن اینباند هست لازمه که جای `INBOUND_NAME` اسم اینباند مورد نظرتون رو بزارین و فقط در کوئری‌های مربوط به یک ادمین خاص یوزنیم ادمین مورد نظرتون رو جای `ADMIN` قرار بدید.
:::
::: warning توجه
در چهار کوئری‌ بالا که برای فعال یا غیرفعال کردن اینباند هست لازمه بدونین اگر به عنوان مثال پروتکل `Vless` برای کاربران فعال نباشد کوئری‌ های بالا برای فعال کردن اینباند تاثیری نخواهند داشت پس اول باید اون پروتکل به خصوص فعال باشد بعد اینباند آن پروتکل دلخواه را فعال یا غیرفعال کنید.
:::

## ایونت‌ های کاربردی SQL
ایونت‌ها برای سکریپت‌های `SQL` که می‌خوایم در زمان خاصی اجرا بشن کاربرد دارن و فقط برای کوئری‌هایی که در دیتابیس تغییری ایجاد می‌کنن، میشه ایونت قرار داد و برای کوئری‌هایی که خروجی میدن نمیشه این کار را انجام داد.

- کد `SQL` زیر یک `Event` میسازه که هر جمعه ساعت 12 شب جدول `node_user_usages` رو خالی می‌کنه که حجم بکاپ‌تون بالا نره و برای برگردوندن بکاپ با مشکل مواجه نشوید. کسانی که تعداد کاربر بالا دارند می‌توانند این `Event` را برای هر شب تنظیم کنند. 
```sql
CREATE EVENT Clear_NodeUserUsages ON SCHEDULE 
EVERY 1 WEEK STARTS '2024-05-03 00:00:00' ON COMPLETION NOT PRESERVE ENABLE 
DO TRUNCATE node_user_usages
```
- ایونت روزانه برای ست کردن `Flow` چنانچه فراموش کنید برای کاربر بزارید
```sql
CREATE DEFINER=`root`@`%` EVENT `SetFlow` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-01 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO UPDATE proxiesSET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision')
WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = ''
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

روی این سه حالت میشه تریگر زد که کار خاصی انجام بشه یا کلا جلوشو گرفت. 
:::

- تریگر برای جلوگیری از حذف اکانت توسط ادمین‌های خاص
```sql
CREATE TRIGGER admin_delete BEFORE DELETE ON users FOR EACH ROW IF OLD.admin_id IN (100, 200, 300) THEN
    SIGNAL SQLSTATE '45000'    SET MESSAGE_TEXT = 'Deletion not allowed.';
END IF
```
برای غیرفعال کردن تریگر‌ها مثل ایونت‌ها دکمه `Drop` را بزنید غیرفعال می‌شود. 
::: tip نکته
دقت کنین داخل پرانتز برای مثال سه تا آیدی ذکر شده ، این بستگی به شما داره که بخواید روی چندتا از ادمین‌هاتون این تریگر رو اعمال کنید، آیدی ادمین مورد نظرتون رو از تیبل‌های دیتابیس پیدا کرده و جایگزین کنید.
:::
