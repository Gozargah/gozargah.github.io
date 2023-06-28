---
title: فعال سازی CloudFlare Warp
---
# فعال سازی CloudFlare Warp
با استفاده از این آموزش میتوانید برخی محدودیت هایی که از سمت شرکت های بزرگ مثل google و spotify روی IP شما اعمال شده رو برطرف کنید و بدون مشکل از سرویس ها شون استفاده کنید.

# قدم اول : ساخت کانفیگ Wireguard
## روش اول :با استفاده از ویندوز ( پیشنهادی )

- ابتدا باید [این پروژه](https://github.com/ViRb3/wgcf) رر به طور کامل دانلود کنید و اون رو از حالت زیپ خارج کنید.
- سپس باید Asset مورد نیاز رو از بخش [releases](https://github.com/ViRb3/wgcf/releases) دانلود کنید ، این فایل بسته به پردازنده متفاوت می باشد.
- فایل رو کنار دیگر فایل های پروژه در پوشه یکسان قرار بدید.
- نام فایل Asset رو به `wgcf` تغییر بدید.
- حال در قسمت ادرس دهی File Explorer عبارت cmd.exe رو وارد کنید.

![image](https://github.com/Gozargah/gozargah.github.io/assets/50927468/716aa676-9f2b-481f-9c19-127635cc7b58)
- در ترمینال باز شده عبارت `wgcf.exe` رو وارد کنید.
- یک بار دستور `wgcf register` و سپس `wgcf generate` رو وارد کنید.
- فایل جدیدی به اسم `wgcf-profile.conf` ایجاد شده و این فایل Wireguard مورد نیاز ما می باشد.
- حال کانفیگ شما امادست و میتونید از اون استفاده کنید.
## روش دوم : با استفاده از لینوکس 

# قدم دوم : استفاده از Warp+ (اختیاری)
- برای دریافت لایسنس و استفاده از Warp+ میتونید از طریق [این](https://t.me/generatewarpplusbot) بات تلگرام اقدام به دریافت `license_key` کنید.
- بعد از دریافت `license_key` باید اون رو در فایل `wgcf-account.toml` جایگزین کنید.
- سپس با دستور `wgcf update` اطلاعات کانفیگ ها رو بروزرسانی کنید.
- سپس با استفاده از دستور `wgcf generate` فایل کانفیگ جدیدی ایجاد کنید.

# قدم سوم : فعالسازی Warp روی مرزبان
## روش اول : با استفاده از هسته Xray
::: warning توجه
این روش فقط برای نسخه Xray 1.8.3 و یا بالاتر پینهاد میشود ، در نسخه های قدیمی تر احتمالا با مشکل Memory Leak مواجه خواهید شد.
:::
- وارد بخش Core Setting در پنل مرزبان میشیم
- ابتدا یک outbound همانند نمونه اضاغه می کنیم و اطلاعات فایل `wgcf-profile.conf` را در آن جایگذاری می کنیم.
```json
    {
        "tag":"warp",
        "protocol":"wireguard",
        "settings":{
            "secretKey":"Your_Secret_Key",
            "DNS" : "1.1.1.1",
            "address":[
                "172.16.0.2/32",
                "2606:4700:110:8756:9135:af04:3778:40d9/128"
            ],
            "peers":[
                {
                    "publicKey":"bmXOC+F1FxEMF9dyiK2H5/1SUtzH0JuVo51h2wPfgyo=",
                    "endpoint":"engage.cloudflareclient.com:2408"
                }
            ]
        }
    }
```
::: tip نکته
در صئرتی که میخواهید تمام ترافیک به صورت پیش فرض از Warp عبور کنید این Outbound رو اول قرار بدید و دیگه نیازی به انجام مرجله بعد نیست
:::
حال باید وب سایت هایی که میخواهیم از Warp عبور کنند رو در بخش Routing مشخص کنیم

```json
{
    "outboundTag": "warp",
    "domain": [
        "geosite:google"
        "openai.com",
        "ai.com",
        "ipinfo.io",
        "iplocation.net",
        "spotify.com"
    ],
    "type": "field"
}
```
تغییرات رو ذخیره می کنیم ، هم اکنون میتوانید از Warp استفاده کنید.

## روش دوم : با استفاده از هسته Wireguard
