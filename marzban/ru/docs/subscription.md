---
title: Subscription
---


# Subscription 

Using this tutorial, you can enable subscription links in Marzban. The subscription feature in Marzban allows you to access all your configurations on different clients. Additionally, by adding or removing inbounds or making changes in the `Host Settings`, you can easily access your new configurations by updating the subscription link.

## Enabling Subscription Link

1. To enable the subscription link, first, you need to follow this tutorial [How to generate SSL](https://gozargah.github.io/marzban/examples/issue-ssl-certificate) to generate an SSL certificate for your domain. Then, follow the instructions on this tutorial [Activating SSL in Marzban](https://gozargah.github.io/marzban/examples/marzban-ssl) to activate SSL in Marzban so that your Marzban dashboard and subscription link will be accessible via `https` which provides encrypted data transfer for enhanced security.

2. If you do not intend to separate the domain for panel and the subscription link, activating SSL will automatically enable the subscription link. However, if you want to have separate domains for each, you need to obtain a Multi SSL certificate so that the certificate works for both your domains. Also, you need to uncomment the following code in the `.env` by removing the initial #, then specify your desired subdomain for the subscription link.

```env
XRAY_SUBSCRIPTION_URL_PREFIX = https://YOUR_DOMAIN:PORT
```

::: warning Attention 
If you have assigned a port other than 443 for your panel, it is necessary to include the panel port in the above variable. Additionally, If you are using the Telegram bot, it's essential to specify the above variable. Otherwise, If you copy the user's sub-link via the Telegram bot, the format will be incorrect.
:::

3. Finally, to apply changes, restart Marzban using the following command.

```bash
marzban restart
```

Now, your subscription link is activated, and after creating a user in Marzban panel or Telegram bot, you can use it.

::: tip  Tip 
Some of the subscription link variables are explained in the [Configuration](https://gozargah.github.io/marzban/en/docs/configuration) tutorial. Refer to the configuration tutorial to read their descriptions.
:::

## Subscription Page

The subscription page allows you to have a custom page for placing various clients regarding different operating systems and tutorials related to them. A sample subscription page developed by one of the Marzban community members is introduced below.

1. Download the subscription page template using the following command.

```bash
sudo wget -N -P /var/lib/marzban/templates/subscription/  https://raw.githubusercontent.com/x0sina/marzban-sub/main/index.html
```

2. Then, uncomment the following values in the `.env` file located in the `/opt/marzban/` directory by removing the initial #.

```env
CUSTOM_TEMPLATES_DIRECTORY="/var/lib/marzban/templates/"
SUBSCRIPTION_PAGE_TEMPLATE="subscription/index.html"
```

3. Finally, to apply changes, restart Marzban using the following command.

```bash
marzban restart
```

Now, simply enter one of the users' subscription link into your browser to display the subscription page.

::: tip Tip
To change the default language, refer to the end of the code in html file and place your desired language in the select tag at the top. In the example below, English is the default language.
```html 
<select id="countries" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white :focus:ring-blue-500 :focus:border blue-500">
  <option value="en">English</option>
  <option value="fa">فارسی</option>
  <option value="ru">Русский</option>
</select>
```
:::
