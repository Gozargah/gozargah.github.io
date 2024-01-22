---
title: ربات تلگرام
---
# ربات مدیریت پنل مرزبان 


::: tip نکته 

اگر قصد استفاده از ربات داخلی تلگرام را ندارید، می توانید از این مرحله صرف نظر کنید

::: 


- علاوه بر این، برای تعامل با پنل مرزبان، مدیریت آن و دریافت اطلاعیه های مهم سیستم، می توانید ربات تلگرام ادمین را فعال کنید

::: tip نکته


- این ربات برای فروش اشتراک در نظر گرفته نشده است

- اگر می خواهید فعالیت های تجاری انجام دهید
- چندین بات تلگرام برای مرزبان وجود داره که بعضی رایگان و بعضی پولی هستند
  
  :::
  
- ما اینجا دوتا را معرفی میکنیم

- 1 بات تلگرام [میرزا](https://github.com/mahdigholipour3/botmirzapanel) [ رایگان و اشتراکی ]

- 2 بات تلگرام [govfuck](https://github.com/govfvck/Marzbot-free) [ رایگان و اشتراکی ]

  ::: tip نکته 

- دو مورد اخر دو نسخه دارن هم رایگان هم اشتراکی که البته اپشن‌های نسخه اشتراکی قطعا متفاوت است
  
کدوم بهتره؟ بستگی به شما داره که کیفیت و آپشن‌های متعدد براتون اهمیت داشته باشه یا رایگان بودنش. اگر اشتراکی می‌خواین شخصا مورد آخر یعنی govfuck رو پیشنهاد می‌کنم اما انتخاب با شماست


::: 


## دریافت توکن ربات

برای ایجاد ربات و دریافت توکن، از ربات استاندارد [BotFather](https://t.me/BotFather) استفاده می کنیم

 
 <img src="https://github.com/Ebi-xd/gozargah.github.io/blob/master/marzban/public/images/IMG_20240121_231537_105.jpg" style="display:block; margin:auto; width:100%" />

 

- با دستور /start ربات اجرا میکنیم

- با  /newbot یک ربات جدید ایجاد میکنیم
- یک اسم برای ربات انتخاب میکنیم 
- و در اخر یک نام کاربری برای ربات خود انتخاب کنیم
- باید به «bot» ختم شود  مانند این، برای مثال: Gozargahbot یا Gozargah_bot

  به عنوان مثال 



   <img src="https://github.com/Ebi-xd/gozargah.github.io/blob/master/marzban/public/images/InShot_20240122_000824372.jpg" style="display:block; margin:auto; width:100%" />

- در خروجی پیامی حاوی یک نشانی یا به اصطلاح (توکن) دریافت میکنیم

 <img src="https://github.com/Ebi-xd/gozargah.github.io/blob/master/marzban/public/images/InShot_20240122_000735286.jpg" style="display:block; margin:auto; width:100%" />
 
- این مقدار را یادداشت کنیم و به تنظیمات بعدی برویم
## دریافت شناسه (های) مدیر
- از آنجایی که دسترسی به این ربات تنها برای شما یا لیست محدودی از مدیران در دسترس خواهد بود، باید به صراحت شناسه تلگرام افرادی که مجاز به استفاده از آن هستند را مشخص کنیم

  دریافت آیدی تلگرام از ربات [ID Bot](https://t.me/username_to_id_bot) استفاده می کنیم

<img src="https://github.com/Ebi-xd/gozargah.github.io/blob/master/marzban/public/images/IMG_20240122_002516_573.jpg"
style="display:block; margin:auto; width:100%" />

- ربات استارت کنید 
<img src="https://github.com/Ebi-xd/gozargah.github.io/blob/master/marzban/public/images/InShot_20240122_002251256.jpg" style="display:block; margin:auto; width:100%" />

- در خروجی پیامی حاویYour ID  دریافت میکنیم
- این مقدار را یادداشت کنیم و به تنظیمات بعدی برویم

## را اندازی .env
  
  

- اکنون باید تمام این داده ها را در مرزبان مشخص کنیم
- برای این کار باید متغیرهای مربوطه را در فایل .envبا برداشتن  کامنت `#`یا اضافه کردن آنها به انتهای فایل و تخصیص مقادیر به دست آمده قبلی در فایل تنظیم کنیم

  
| متغیر                    |  معنی  |
|----------------:|-----------:|
| `TELEGRAM_API_TOKEN`           | توکن API دریافت شده در BotFather لازم       |       
| `TELEGRAM_ADMIN_ID`       | شناسه سرپرست الزامی است ، اگر نیاز به دسترسی به چندین سرپرست دارید، شناسه آنها را مشخص کنید و با کاما `,`از هم جدا کنید       |
| `TELEGRAM_LOGGER_CHANNEL_ID` | کانال اختیاری برای لاگ های پنل        |  
| `TELGRAM_DEFAULT_VLESS_FLOW`  | اختیاری ، مقدار flow برای اینباند VLESS فعال میکند   |    
| `TELEGRAM_PROXY_URL`       | آدرس پروکسی TG اختیاری
 
<br>

- پس از آن، برای اعمال تغییرات، باید مرزبان را مجددا راه اندازی کنید

  ```
  sudo marzban restart
  ```

## راه اندازی

- پس از راه اندازی مجدد مرزبان، می توانید به رباتی که قبلا ساخته اید بروید وشروع به استفاده کنید

<img src="https://github.com/Ebi-xd/gozargah.github.io/blob/master/marzban/public/images/InShot_20240122_000735286.jpg" style="display:block; margin:auto; width:100%" />
  
