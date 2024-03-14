---
title: راه‌اندازی
---

# راه‌اندازی مرزبان


## نصب سریع (پیشنهادی)
::: tip نکات قبل از نصب
با اجرای دستور نصب سریع :
- داکر بر روی ماشین شما نصب خواهد شد و مرزبان به کمک داکر اجرا خواهد شد.
- دستور `marzban` بر روی ماشین شما در دسترس خواهد بود.
- داده های مرزبان در مسیر `/var/lib/marzban` ذخیره خواهند شد.
- فایل های اپلیکیشن مرزبان (`docker-compose.yml` و `.env`) در مسیر `/opt/marzban` ذخیره خواهند شد.
:::
ابتدا دستور زیر را اجرا کنید.

```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
::: tip بعد از نصب
- لاگ های مرزبان نمایش داده خواهد شد که با فشردن `Ctrl+C` می‌توانید آن را متوقف کنید.
- داشبورد به صورت پیشفرض روی پورت ۸۰۰۰ اجرا خواهد شد که می‌توانید از طریق آدرس `http://YOUR_SERVER_IP:8000/dashboard/` وارد آن شوید.
:::

در مرحله بعد، با اجرای دستور زیر یک ادمین سودو (مدیر کل) بسازید.
```bash
marzban cli admin create --sudo
```

حالا می‌توانید با نام‌کاربری و گذرواژه‌ای که تعیین کردید وارد داشبورد مرزبان شوید.

همچنین، برای مشاهده راهنمای اسکریپت مرزبان می‌توانید دستور زیر را اجرا کنید.
```bash
marzban --help
```

برای تغییر تنظیمات پیش‌فرض، ‌می‌توانید با باز کردن فایل `/opt/marzban/.env` متغیر های مورد نظر خود را تغییر داده و مرزبان را با دستور زیر ری‌استارت کنید.

::: details ویرایش فایل با nano
ساده‌ترین راه ویرایش فایل `.env` استفاده از ویرایشگر `nano` هست.
با دستور زیر فایل را باز کنید.
```bash
nano /opt/marzban/.env
```
تغییرات خود را اعمال کنید و با فشردن `Ctrl+s` فایل را ذخیره کنید. سپس با فشردن ‍‍‍‍`Ctrl+x` از محیط ویرایشگر خارج شوید.
:::
```bash
marzban restart
```

برای مشاهده لیست متغیر ها، به بخش [پیکربندی](configuration.md) مراجعه کنید.

## نصب دستی (پیشرفته)

::: warning توجه
نصب مرزبان به صورت دستی به افراد غیر حرفه‌ای پیشنهاد نمیشه. اگر حوصله مطالعه مستندات را دارید و یا با محیط برنامه نویسی و لینوکس آشنایی دارید نصب به این روش رو امتحان کنید.

همچنین در نصب دستی، اسکریپت مرزبان موجود نیست و برای آپدیت باید با `git` آشنایی داشته باشید.
:::

ابتدا باید Xray را بر روی ماشین خود نصب کنید.
پیشنهاد میشه با اسکریپت [Xray-install](https://github.com/XTLS/Xray-install) این کار را انجام دهید.

```bash
bash -c "$(curl -L https://github.com/XTLS/Xray-install/raw/main/install-release.sh)" @ install
```

سپس پروژه را clone کنید و پیش‌نیاز ها را نصب کنید.
::: warning توجه
مرزبان با پایتون 3.8 و نسخه های بالاتر از آن سازگار است.
در صورت امکان، پایتون 3.10 پیشنهاد می‌شود.
:::

::: details نصب pip
در صورتی که دستور `pip` روی ماشین شما نصب نیست، با اجرای دستور زیر آن را نصب کنید.
```bash
wget -qO- https://bootstrap.pypa.io/get-pip.py | python3 -
```
:::

::: details نصب در virtualenv
در صورتی که برنامه نویس هستید و با محیط مجازی آشنایی دارید، پیشنهاد میشه از [Virtualenv](https://pypi.org/project/virtualenv/) استفاده کنید.
```bash
python3 -m pip install virtualenv
python3 -m virtualenv .venv
# activation
source .venv/bin/activate
# deactivation
deactivate
```
:::

```bash
git clone https://github.com/Gozargah/Marzban.git
cd Marzban
python3 -m pip install -r requirements.txt
```

حالا برای اجرای ساخت دیتابیس، دستور زیر را اجرا کنید.
```bash
alembic upgrade head
```

یک کپی از فایل `.env.example` با نام `.env` بسازید. از این فایل می‌توانید برای تعیین متغیر های محیطی استفاده کنید. برای اطلاعات بیشتر بخش [پیکربندی](configuration.md) را مشاهده کنید.

```bash
cp .env.example .env
```

برای استفاده از `marzban-cli` باید آن را به یک فایل در `$PATH` خود لینک و قابل اجرا (executable) کنید و تکمیل خودکار (auto-completion) آن را نصب کنید:

```bash
sudo ln -s $(pwd)/marzban-cli.py /usr/bin/marzban-cli
sudo chmod +x /usr/bin/marzban-cli
marzban-cli completion install
```

برای ساخت ادمین سودو (مدیر کل) به کمک `marzban-cli`، دستور زیر را جرا کنید.

```bash
marzban-cli admin create --sudo
```

حالا می‌توانید با اجرای دستور زیر مرزبان را اجرا کنید.

```bash
python3 main.py
```
مرزبان به طور پیش‌فرض روی پورت ۸۰۰۰ اجرا خواهد شد. ( شما می‌توانید با تغییر مقدار `UVICORN_PORT` آن را تغییر دهید. )

::: details نصب سرویس مرزبان در systemctl
برای نصب سرویس مرزبان می‌توانید از اسکریپت `install_service.sh` در فایل های مرزبان استفاده کنید.
```bash
sudo chmod +x install_service.sh
sudo ./install_service.sh
# enable and start marzban service
sudo systemctl enable --now marzban.service
```
:::

::: details مرزبان پشت nginx
```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name marzban.example.com;

    ssl_certificate      /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key  /etc/letsencrypt/live/example.com/privkey.pem;

    location ~* /(dashboard|api|docs|redoc|openapi.json) {
        proxy_pass http://0.0.0.0:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
:::
