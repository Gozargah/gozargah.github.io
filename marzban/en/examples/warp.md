---
title: فعال سازی CloudFlare Warp
---

# فعال سازی CloudFlare Warp

با استفاده از این آموزش میتوانید برخی محدودیت هایی که از سمت شرکت های بزرگ مثل google و spotify روی IP شما اعمال شده رو برطرف کنید و بدون مشکل از سرویس ها شون استفاده کنید.

::: warning
توجه داشته باشید برای کانفیگ های Warp محدودیت اتصال حداکثر 5 دستگاه همزمان وجود دارد ، برای حل مشکل میتوانید از چند کانفیگ استفاده کنید.
:::

## قدم اول : ساخت کانفیگ Wireguard

### روش اول :با استفاده از ویندوز

- ابتدا باید `Asset` مورد نیاز رو از بخش [releases](https://github.com/ViRb3/wgcf/releases) دانلود کنید ، این فایل بسته به پردازنده متفاوت می باشد.
- نام فایل `Asset` رو به `wgcf` تغییر بدید.
- حالا در قسمت ادرس دهی File Explorer عبارت `cmd.exe` رو وارد کنید.

![image](https://github.com/Gozargah/gozargah.github.io/assets/50927468/fb9f3eae-8390-45a5-a7b3-c50db4aa82a1)

- در ترمینال باز شده عبارت `wgcf.exe` رو وارد کنید.
- یک بار دستور `wgcf.exe register` و سپس `wgcf.exe generate` رو وارد کنید.
- فایل جدیدی به اسم `wgcf-profile.conf` ایجاد شده و این فایل `Wireguard` مورد نیاز ما می باشد.
- کانفیگ شما امادست و میتونید از اون استفاده کنید.

### روش دوم : با استفاده از لینوکس

- ابتدا باید `Asset` مورد نیاز رو از بخش [releases](https://github.com/ViRb3/wgcf/releases) دانلود کنید ، این فایل بسته به پردازنده متفاوت می باشد.
- با دستور `wget` میتوانید این کار را انجام دهید.
```bash
wget https://github.com/ViRb3/wgcf/releases/download/v2.2.19/wgcf_2.2.19_linux_amd64
```
مسیر فایل رو به `/usr/bin/` تغییر داده و اسم اون رو به `wgcf` تغییر بدید.
```bash
mv wgcf_2.2.19_linux_amd64 /usr/bin/wgcf
chmod +x /usr/bin/wgcf
```
سپس با استفاده از این 2 دستور کانفیگ رو ایجاد کنید.
```bash
wgcf register
wgcf generate
```
فایلی با نام `wgcf-profile.conf` ساخته شده و این کانفیگ مورد نیاز ما می باشد.

## قدم دوم : استفاده از Warp+ (اختیاری)

- برای دریافت لایسنس و استفاده از Warp+ میتونید از طریق [این](https://t.me/generatewarpplusbot) بات تلگرام اقدام به دریافت `license_key` کنید.
- بعد از دریافت `license_key` باید اون رو در فایل `wgcf-account.toml` جایگزین کنید.
::: tip نکته
 این تغییر رو میتونید در لینوکس با `nano` و در ویندوز با `Notepad` و یا هر نرم افزار دیگه ای انجام بدید.
:::
::: details Windows
برای استفاده از کامند ها روی ویندوز نیاز دارید به جای استفاده از کامند `wgcf` از `wgcf.exe` استفاده کنید.
:::
سپس باید اطلاعات کانفیگ ها رو بروزرسانی کنید.
```bash
wgcf update
```
سپس باید فایل کانفیگ جدیدی ایجاد کنید.
```bash
wgcf generate
```

## قدم سوم : فعالسازی Warp روی مرزبان

### روش اول : با استفاده از هسته Xray

::: warning توجه
- این روش فقط برای نسخه Xray 1.8.3 و یا بالاتر پیشنهاد میشود ، در نسخه های قدیمی تر احتمالا با مشکل Memory Leak مواجه خواهید شد.
- در صورتی که ورژن `Xray` شما پایین تر از این نسخه می باشد می توانید به کمک [ اموزش تغییر ورژن Xray-core](/examples/change-xray-version) ورژن `Xray` خودتون رو ارتقا بدید.
:::

- وارد بخش Core Setting در پنل مرزبان شوید.
- ابتدا یک outbound همانند نمونه اضافه می کنیم و اطلاعات فایل `wgcf-profile.conf` را در آن جایگذاری می کنیم.

```json
{
  "tag": "warp",
  "protocol": "wireguard",
  "settings": {
    "secretKey": "Your_Secret_Key",
    "DNS": "1.1.1.1",
    "address": ["172.16.0.2/32", "2606:4700:110:8756:9135:af04:3778:40d9/128"],
    "peers": [
      {
        "publicKey": "bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=",
        "endpoint": "engage.cloudflareclient.com:2408"
      }
    ],
    "kernelMode": false
  }
}
```

::: tip نکته
در صورتی که میخواهید تمام ترافیک به صورت پیش فرض از Warp عبور کنید این Outbound رو اول قرار بدید و دیگه نیازی به انجام مرحله بعد نیست.
:::

### روش دوم : با استفاده از هسته Wireguard

ابتدا باید پیش نیاز های استفاده از Wireguard رو روی سرور نصب کنید.

```bash
sudo apt install wireguard-dkms wireguard-tools resolvconf
```

سپس باید عبارت `Table = off` رو مثل نمونه به فایل Wireguard اضافه کنید.

```conf
[Interface]
PrivateKey = Your_Private_Key
Address = 172.16.0.2/32
Address = 2606:4700:110:8a1a:85ef:da37:b891:8d01/128
DNS = 1.1.1.1
MTU = 1280
Table = off
[Peer]
PublicKey = bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=
AllowedIPs = 0.0.0.0/0
AllowedIPs = ::/0
Endpoint = engage.cloudflareclient.com:2408
```

::: warning توجه
در صورت عدم اضافه کردن `Table = off` دسترسی شما به سرور قطع خواهد شد و دیگر نمیتوانید به سرور متصل شوید و باید از طریق وب سایت دیتاسنتر خود به سرور وارد شده و اتصال به `Warp` رو قطع کنید تا بتونید دوباره به صورت عادی ارتباط برقرار کنید.
:::

- سپس نام فایل رو از `wgcf-profile.conf` به `warp.conf` تغییر بدید.
- فایل رو در پوشه `/etc/Wireguard` در سرور قرار بدید.
- با دستور پایین Wireguard رو فعال کنید.

```bash
sudo systemctl enable --now wg-quick@warp
```

با این دستور نیز می‌توانید `Warp` را غیر فعال کنید

```bash
sudo systemctl disable --now wg-quick@warp
```

- وارد بخش Core Setting در پنل مرزبان شوید.
- ابتدا یک outbound همانند نمونه اضافه کنید.

```json
{
  "tag": "warp",
  "protocol": "freedom",
  "streamSettings": {
    "sockopt": {
      "tcpFastOpen": true,
      "interface": "warp"
    }
  }
}
```

::: tip نکته
در صورتی که میخواهید تمام ترافیک به صورت پیش فرض از Warp عبور کنید این Outbound رو اول قرار بدید و دیگه نیازی به انجام مرحله بعد نیست.
:::

## قدم چهارم : تنظیمات بخش routing

ابتدا یک `rule` در بخش `routing` همانند نمونه اضافه می کنیم.

```json
{
  "outboundTag": "warp",
  "domain": [],
  "type": "field"
}
```

حال باید وب سایت های دلخواه خودتون رو مثل نمونه اضافه کنید.

```json
{
    "outboundTag": "warp",
    "domain": [
        "geosite:google",
        "openai.com",
        "ai.com",
        "ipinfo.io",
        "iplocation.net",
        "spotify.com"
    ],
    "type": "field"
}
```

تغییرات رو ذخیره می کنیم ، هم اکنون میتوانید از `Warp` استفاده کنید.
::: details Marzban-Node

- در صورتی که با کمک هسته xray از `Warp` استفاده می کنید نیاز به انجام تغییر در نود ندارید و به صورت اتوماتیک در نود نیز اعمال می شود.

- در صورتی که از هسته `Wireguard` استفاده می کنید باید مرحله سوم ، روش دوم رو روی نود هم انجام دهید.
  :::
