---
title: Marzban CLI 
---

# خط فرمان (CLI)

- خط فرمان (CLI) مرزبان شامل `4` کامند اصلی می‌شود که هر یک از آن‌ها شامل زیرشاخه‌هایی هستند که کاربرد خاصی دارند، بنابراین در این بخش به کاربرد هر یک از آن‌ها می‌پردازیم. همچنین در انتهای این بخش چند نمونه از کامندهایی که کاربرد زیادی دارند را می‌توانید ببینید.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها و کامندها در خصوص `marzban cli` را نشان میدهد.
```
marzban cli [OPTIONS] COMMAND [ARGS]...
```

::: tip نکته
در این قسمت عبارت `[ARGS]` که مخفف کلمه `Arguments` هست به معنای قرار گرفتن کامندهای مختلف هر کدام از زیرشاخه‌ها در کامند بالا برای اهداف به خصوص هر بخش است.
::: 

**2. آپشن‌ها**

`--help` 
- برای دیدن راهنما `marzban cli` استفاده می‌شود.
```
marzban cli --help
```

::: tip نکته
- اگر یک کامند چندین آپشن دارد و شما موقع وارد کردن کامند فقط یکی از آپشن‌ها را در کامند قرار دهید، بصورت خودکار در خصوص سایر آپشن‌ها از شما سوال میپرسه، اما شما می‌توانید آپشن‌ها را پشت سر هم در قالب یک کامند قرار دهید که نیاز به پاسخ دادن تک تک سوالات نداشته باشید در نتیجه کامند وارد شده بلافاصله اجرا خواهد شد.

- به عنوان مثال در کامند زیر ما برای انتقال مالکیت یک کاربر از یک ادمین به ادمین دیگر، یوزنیم کاربر و ادمین مورد نظر و در نهایت تایید نهایی را اضافه کردیم در نتیجه کامند زیر بلافاصله اجرا خواهد شد.
```
marzban cli user set-owner -u TEXT --admin TEXT -y
```

- بودن برخی از آپشن‌ها در کامند اختیاری است در نتیجه نبودن آن‌ها مشکلی ایجاد نخواهد کرد.
:::

**3. کامندها**

`admin`
```
marzban cli admin
```

`completion` 
```
marzban cli completion
```

`subscription` 
```
marzban cli subscription
```

`user`
```
marzban cli user
```

## `admin`

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها و کامندها در خصوص کامند `admin` را نشان میدهد.
```
marzban cli admin [OPTIONS] COMMAND [ARGS]...
```

**2. آپشن‌ها**

`--help` 
- برای دیدن راهنما کامند `admin` استفاده می‌شود.
```
marzban cli admin --help
```

**3. کامندها**

`create` 
- برای ایجاد کردن یک ادمین استفاده می‌شود.
```
marzban cli admin create
```

`delete`
- برای پاک کردن یک ادمین استفاده می‌شود.
```
marzban cli admin delete
```

`import-from-env`
- برای ایمپورت کردن ادمین `sudo` از فایل `env` استفاده می‌شود.
```
marzban cli admin import-from-env
```

`list`
- برای نمایش دادن لیست ادمین‌ها استفاده می‌شود.
```
marzban cli admin list
```

`update`
- برای آپدیت کردن مشخصات یک ادمین استفاده می‌شود.
```
marzban cli admin update
```

## `admin create` 

- برای ایجاد کردن ادمین استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `admin create` را نشان میدهد.
```
marzban cli admin create [OPTIONS]
```

**2. آپشن‌ها**

`-u, --username TEXT`

- برای تعیین یوزرنیم یک ادمین استفاده می‌شود،  به جای عبارت `TEXT` باید یوزرنیم مورد نظر ادمین خود را وارد کنید. توجه داشته باشید بدون عبارت `--sudo` در انتهای کامند، ادمین ساخته شده سودو نخواهد بود.
```
marzban cli admin create -u TEXT
``` 

`--sudo`
- برای ساخت ادمین `sudo` استفاده می‌شود.
```
marzban cli admin create -u TEXT --sudo
```

`--no-sudo`
- برای ساخت ادمین `non-sudo` استفاده می‌شود، که اگر این عبارت را هم قرار ندید ساخت ادمین بصورت پیش فرض غیر سودو خواهد بود.
```
marzban cli admin create -u TEXT --no-sudo
```

`-tg, --telegram-id TEXT`
- برای تعیین آیدی عددی ادمین در تلگرام استفاده می‌شود.
```
marzban cli admin create -tg TEXT
```

`-dc, --discord-webhook TEXT`
- برای وبهوک در دیسکورد استفاده می‌شود.
```
marzban cli admin create -dc TEXT
```

`--help`
- برای دیدن راهنما کامند `admin create` استفاده می‌شود.
```
marzban cli admin create --help
```

## `admin delete`
- برای پاک کردن یک ادمین استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `admin delete` را نشان میدهد.
```
marzban cli admin delete [OPTIONS]
```

**2. آپشن‌ها**

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم ادمین مورد نظر خود را وارد کنید.
```
marzban cli admin delete -u TEXT 
```

`-y, --yes`
- با اضافه کردن این آپشن، تایید نهایی از شما خواسته نمی‌شود.
```
marzban cli admin delete -u TEXT -y
```

`--help`
- برای دیدن راهنما کامند `admin delete` استفاده می‌شود.
```
marzban cli admin delete --help
```

## `admin import-from-env`
- برای ایمپورت کردن ادمین `sudo` از فایل `env` استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `admin import-from-env` را نشان میدهد.
```
marzban cli admin import-from-env [OPTIONS]
```

**2. آپشن‌ها**

`-y, --yes`
- با اضافه کردن این آپشن، تایید نهایی از شما خواسته نمی‌شود.
```
marzban cli admin import-from-env -y
```

`--help`
- برای دیدن راهنما کامند `admin import-from-env` استفاده می‌شود.
```
marzban cli admin import-from-env --help
```

## `admin list`
- برای نمایش دادن لیست ادمین‌ها استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `admin list` را نشان میدهد.
```
marzban cli admin list [OPTIONS]
```

**2. آپشن‌ها**

`-o, --offset INTEGER`
- از این آپشن برای دیدن لیست ادمین‌ها از یک تعداد خاص به بعد استفاده میشه که تعداد رو باید جای عبارت `ITEMS` جایگزین کنید، به عنوان مثال اگر عدد `10` را وارد کنید ده ادمین اول را به شما نمایش نخواهد داد.
```
marzban cli admin list -o ITEMS
```

`-l, --limit INTEGER`
- تعداد ادمین‌هایی که میخواین نمایش داده بشه رو جای عبارت `ITEMS` جایگزین کنید.
```
marzban cli admin list -l ITEMS
```

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم ادمین مورد نظر خود را وارد کنید.
```
marzban cli admin list -u TEXT
```

`--help`
- برای دیدن راهنما کامند `admin list` استفاده می‌شود.
```
marzban cli admin list --help
```

## `admin update`
- برای آپدیت کردن مشخصات یک ادمین استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `admin update` را نشان میدهد.
```
marzban cli admin update [OPTIONS]
```

**2. آپشن‌ها**

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم ادمین مورد نظر خود را وارد کنید.
```
marzban cli admin update -u TEXT 
```

`--help`
- برای دیدن راهنما کامند `admin update` استفاده می‌شود.
```
marzban cli admin update --help
```

## `subscription`

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها و کامندها در خصوص کامند `subscription` را نشان میدهد.
```
marzban cli subscription [OPTIONS] COMMAND [ARGS]...
```

**2. آپشن‌ها**

`--help`
- برای دیدن راهنما کامند `completion subscription` استفاده می‌شود.
```
marzban cli subscription --help
```

**3. کامندها**

`get-config`
- برای دریافت پروکسی‌های یک کاربر استفاده می‌شود.
```
marzban cli subscription get-config
```

`get-link`
- برای دریافت لینک سابسکریپشن یک کاربر استفاده می‌شود.
```
marzban cli subscription get-link
```

## `subscription get-config`
- برای دریافت پروکسی‌های یک کاربر استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `subscription get-config` را نشان میدهد.
```
marzban cli subscription get-config [OPTIONS]
```

**2. آپشن‌ها**

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم کاربر مورد نظر خود را وارد کنید.
```
marzban cli subscription get-config -u TEXT
```

`-f, --format [v2ray|clash]`
- پروکسی‌های یک کاربر را با قالب `v2ray` یا `clash` ببینید.
```
marzban cli subscription get-config -u TEXT -f [v2ray|clash]
```

`-o, --output TEXT`
- پروکسی‌های یک کاربر را با قالب `v2ray` یا `clash` در یک فایل ذخیره کنید.
```
marzban cli subscription get-config -u TEXT -f v2ray -o v2ray_config.json
```
```
marzban cli subscription get-config -u TEXT -f clash -o clash_config.yaml
```

`--base64`
- دیدن پروکسی‌های یک کاربر با قالب دلخواه که با `base64` رمزنگاری شده‌اند.
```
marzban cli subscription get-config -u TEXT -f [v2ray|clash] --base64
```

`--help`
- برای دیدن راهنما کامند `subscription get-config` استفاده می‌شود.
```
marzban cli subscription get-config --help
```

## `subscription get-link`
- برای دریافت لینک سابسکریپشن یک کاربر استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `subscription get-link` را نشان میدهد.
```
marzban cli subscription get-link [OPTIONS]
```

**2. آپشن‌ها**

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم کاربر مورد نظر خود را وارد کنید.
```
marzban cli subscription get-link -u TEXT 
```

`--help`
- برای دیدن راهنما کامند `subscription get-link` استفاده می‌شود.
```
marzban cli subscription get-link --help
```

## `user`

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها و کامندها در خصوص کامند `user` را نشان میدهد.
```
marzban cli user [OPTIONS] COMMAND [ARGS]...
```

**2. آپشن‌ها**

`--help` 
- برای دیدن راهنما کامند `user` استفاده می‌شود.
```
marzban cli user --help
```

**3. کامندها**

`list`
- برای دیدن لیست کاربرها استفاده می‌شود.
```
marzban cli user list
```

`set-owner`
- برای تغییر مالکیت یک کاربر از یک ادمین به ادمین دیگر استفاده می‌شود.
```
marzban cli user set-owner
```

## `user list`
- برای دیدن لیست کاربرها استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `user list` را نشان میدهد.
```
marzban cli user list [OPTIONS]
```

**2. آپشن‌ها**

`-o, --offset INTEGER`
- از این آپشن برای دیدن لیست کاربرها از یک تعداد خاص به بعد استفاده میشه که تعداد رو باید جای عبارت `ITEMS` جایگزین کنید، به عنوان مثال اگر عدد `100` را وارد کنید صد کاربر اول را به شما نمایش نخواهد داد.
```
marzban cli user list -o ITEMS
```

`-l, --limit INTEGER`
- تعداد کاربرهایی که میخواین نمایش داده بشه رو جای عبارت `ITEMS` جایگزین کنید.
```
marzban cli user list -l ITEMS
```

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم کاربر مورد نظر خود را وارد کنید.
```
marzban cli user list -u TEXT
```

`-s, --search TEXT `
- به جای عبارت `TEXT` یوزرنیم کاربر مورد نظر خود را وارد کنید، این آپشن عبارت وارد شده توسط شما را در باکس نوت کاربرها نیز جستجو می‌کند.

```
marzban cli user list -s TEXT
```

`--status [active|disabled|limited|expired|on_hold]`
- برای دیدن لیست کاربرهایی که یکی از این `5` وضعیت را دارند.
```
marzban cli user list --status [active|disabled|limited|expired|on_hold]
```

`--admin, --owner TEXT `
```
marzban cli user list --admin TEXT
```

`--help`
- برای دیدن راهنما کامند `user list` استفاده می‌شود.
```
marzban cli user list --help
```

## `user set-owner`
- برای تغییر مالکیت یک کاربر از یک ادمین به ادمین دیگر استفاده می‌شود.

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `user set-owner` را نشان میدهد.
```
marzban cli user set-owner [OPTIONS]
```

**2. آپشن‌ها**

`-u, --username TEXT`
- به جای عبارت `TEXT` یوزرنیم کاربر مورد نظر خود را وارد کنید.
```
marzban cli user set-owner -u TEXT
```

`--admin, --owner TEXT`
- به جای عبارت `TEXT` یوزرنیم ادمین مورد نظر خود را وارد کنید.
```
marzban cli user set-owner --admin TEXT
```

`-y, --yes`
- با اضافه کردن این آپشن، تایید نهایی از شما خواسته نمی‌شود.
```
marzban cli user set-owner -u TEXT --admin TEXT -y
```

`--help`
- برای دیدن راهنما کامند `user set-owner` استفاده می‌شود.
```
marzban cli user set-owner --help
```

## `completion`

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها و کامندها در خصوص کامند `completion` را نشان میدهد.
```
marzban cli completion [OPTIONS] COMMAND [ARGS]...
```

**2. آپشن‌ها**

`--help` 
- برای دیدن راهنما کامند `completion` استفاده می‌شود.
```
marzban cli completion --help
```

**3. کامندها**

`install`
```
marzban cli completion install
```

`show`
```
marzban cli completion show
```


## `completion install`

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `completion install` را نشان میدهد.
```
marzban cli completion install [OPTIONS]
```

**2. آپشن‌ها**

`--shell [bash|zsh|fish|powershell|pwsh]`
```
marzban cli completion install --shell [bash|zsh|fish|powershell|pwsh]
```

`--help`
- برای دیدن راهنما کامند `completion install` استفاده می‌شود.
```
marzban cli completion install --help
```

## `completion show`

**1. نحوه استفاده**

- نحوه قرار گرفتن آپشن‌ها در خصوص کامند `completion show` را نشان میدهد.
```
marzban cli completion show [OPTIONS]
```

**2. آپشن‌ها**

`--shell [bash|zsh|fish|powershell|pwsh]`
```
marzban cli completion show --shell [bash|zsh|fish|powershell|pwsh]
```

`--help`
- برای دیدن راهنما کامند `completion show` استفاده می‌شود.
```
marzban cli completion show --help
```

## `examples` 
- چند نمونه از کامندهای مربوط به `marzban cli` که کاربرد زیادی دارند.

- ساخت ادمین سودو
```
marzban cli admin create --sudo
```

- ساخت ادمین غیر سودو
```
marzban cli admin create 
```

- حذف کردن ادمین
```
marzban cli admin delete 
```

- تغییر رمز پنل در صورت فراموش کردن
```
marzban cli admin update
```

- تغییر مالکیت کاربر یک ادمین به ادمین دیگر
```
marzban cli user set-owner 
```
