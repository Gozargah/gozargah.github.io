---
title: Marzban CLI 
---

# Командная строка (CLI)

- Командная строка (CLI) Marzban включает в себя `4` основные команды, каждая из которых имеет подкоманды со специфическими функциями. В этом разделе мы рассмотрим применение каждой из них. Также в конце раздела вы можете увидеть несколько примеров часто используемых команд.

**1. Использование**

- Показывает, как располагаются опции и команды в `marzban cli`.
```
marzban cli [OPTIONS] COMMAND [ARGS]...
```

::: tip Примечание
В этой части термин `[ARGS]`, сокращение от слова `Arguments`, означает размещение различных команд каждой подкоманды в вышеуказанной команде для конкретных целей каждого раздела.
::: 

**2. Опции**

`--help` 
- Используется для просмотра справки по `marzban cli`.
```
marzban cli --help
```

::: tip Примечание
- Если команда имеет несколько опций, и вы при вводе команды указываете только одну из них, система автоматически спросит вас об остальных опциях. Однако вы можете указать все опции последовательно в одной команде, чтобы не отвечать на каждый вопрос по отдельности, и команда будет выполнена немедленно.

- Например, в команде ниже мы добавили имя пользователя, администратора и финальное подтверждение для передачи владения пользователем от одного администратора другому, в результате чего команда будет выполнена немедленно.
```
marzban cli user set-owner -u TEXT --admin TEXT -y
```

- Некоторые опции в команде являются необязательными, поэтому их отсутствие не создаст проблем.
:::

**3. Команды**

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

**1. Использование**

- Показывает, как располагаются опции и команды для команды `admin`.
```
marzban cli admin [OPTIONS] COMMAND [ARGS]...
```

**2. Опции**

`--help` 
- Используется для просмотра справки по команде `admin`.
```
marzban cli admin --help
```

**3. Команды**

`create` 
- Используется для создания администратора.
```
marzban cli admin create
```

`delete`
- Используется для удаления администратора.
```
marzban cli admin delete
```

`import-from-env`
- Используется для импорта администратора `sudo` из файла `env`.
```
marzban cli admin import-from-env
```

`list`
- Используется для отображения списка администраторов.
```
marzban cli admin list
```

`update`
- Используется для обновления данных администратора.
```
marzban cli admin update
```

## `admin create` 

- Используется для создания администратора.

**1. Использование**

- Показывает, как располагаются опции для команды `admin create`.
```
marzban cli admin create [OPTIONS]
```

**2. Опции**

`-u, --username TEXT`

- Используется для указания имени пользователя администратора, вместо `TEXT` нужно ввести желаемое имя пользователя. Обратите внимание, что без параметра `--sudo` в конце команды созданный администратор не будет иметь прав суперпользователя.
```
marzban cli admin create -u TEXT
``` 

`--sudo`
- Используется для создания администратора с правами `sudo`.
```
marzban cli admin create -u TEXT --sudo
```

`--no-sudo`
- Используется для создания администратора без прав `sudo`. Если не указать этот параметр, администратор по умолчанию будет создан без прав суперпользователя.
```
marzban cli admin create -u TEXT --no-sudo
```

`-tg, --telegram-id TEXT`
- Используется для указания числового ID администратора в Telegram.
```
marzban cli admin create -tg TEXT
```

`-dc, --discord-webhook TEXT`
- Используется для webhook в Discord.
```
marzban cli admin create -dc TEXT
```

`--help`
- Используется для просмотра справки по команде `admin create`.
```
marzban cli admin create --help
``` 

## `admin delete`
- Используется для удаления администратора.

**1. Использование**

- Показывает, как располагаются опции для команды `admin delete`.
```
marzban cli admin delete [OPTIONS]
```

**2. Опции**

`-u, --username TEXT`
- Вместо `TEXT` введите имя пользователя нужного администратора.
```
marzban cli admin delete -u TEXT 
```

`-y, --yes`
- При добавлении этой опции финальное подтверждение не запрашивается.
```
marzban cli admin delete -u TEXT -y
```

`--help`
- Используется для просмотра справки по команде `admin delete`.
```
marzban cli admin delete --help
```

## `admin import-from-env`
- Используется для импорта администратора `sudo` из файла `env`.

**1. Использование**

- Показывает, как располагаются опции для команды `admin import-from-env`.
```
marzban cli admin import-from-env [OPTIONS]
```

**2. Опции**

`-y, --yes`
- При добавлении этой опции финальное подтверждение не запрашивается.
```
marzban cli admin import-from-env -y
```

`--help`
- Используется для просмотра справки по команде `admin import-from-env`.
```
marzban cli admin import-from-env --help
```

## `admin list`
- Используется для отображения списка администраторов.

**1. Использование**

- Показывает, как располагаются опции для команды `admin list`.
```
marzban cli admin list [OPTIONS]
```

**2. Опции**

`-o, --offset INTEGER`
- Эта опция используется для просмотра списка администраторов, начиная с определенного количества. Количество нужно указать вместо `ITEMS`. Например, если ввести число `10`, первые десять администраторов не будут показаны.
```
marzban cli admin list -o ITEMS
```

`-l, --limit INTEGER`
- Укажите количество администраторов для отображения вместо `ITEMS`.
```
marzban cli admin list -l ITEMS
```

`-u, --username TEXT`
- Вместо `TEXT` введите имя пользователя нужного администратора.
```
marzban cli admin list -u TEXT
```

`--help`
- Используется для просмотра справки по команде `admin list`.
```
marzban cli admin list --help
```

## `admin update`
- Используется для обновления данных администратора.

**1. Использование**

- Показывает, как располагаются опции для команды `admin update`.
```
marzban cli admin update [OPTIONS]
```

**2. Опции**

`--help`
- Используется для просмотра справки по команде `admin update`.
```
marzban cli admin update --help
``` 

## `subscription`

**1. Использование**

- Показывает, как располагаются опции и команды для команды `subscription`.
```
marzban cli subscription [OPTIONS] COMMAND [ARGS]...
```

**2. Опции**

`--help`
- Используется для просмотра справки по команде `subscription`.
```
marzban cli subscription --help
```

**3. Команды**

`get-config`
- Используется для получения прокси пользователя.
```
marzban cli subscription get-config
```

`get-link`
- Используется для получения ссылки на подписку пользователя.
```
marzban cli subscription get-link
```

## `subscription get-config`
- Используется для получения прокси пользователя.

**1. Использование**

- Показывает, как располагаются опции для команды `subscription get-config`.
```
marzban cli subscription get-config [OPTIONS]
```

**2. Опции**

`-u, --username TEXT`
- Вместо `TEXT` введите имя пользователя нужного пользователя.
```
marzban cli subscription get-config -u TEXT
```

`-f, --format [v2ray|clash]`
- Просмотр прокси пользователя в формате `v2ray` или `clash`.
```
marzban cli subscription get-config -u TEXT -f [v2ray|clash]
```

`-o, --output TEXT`
- Сохранение прокси пользователя в формате `v2ray` или `clash` в файл.
```
marzban cli subscription get-config -u TEXT -f v2ray -o v2ray_config.json
```
```
marzban cli subscription get-config -u TEXT -f clash -o clash_config.yaml
```

`--base64`
- Просмотр прокси пользователя в выбранном формате, зашифрованном в `base64`.
```
marzban cli subscription get-config -u TEXT -f [v2ray|clash] --base64
```

`--help`
- Используется для просмотра справки по команде `subscription get-config`.
```
marzban cli subscription get-config --help
```

## `subscription get-link`
- Используется для получения ссылки на подписку пользователя.

**1. Использование**

- Показывает, как располагаются опции для команды `subscription get-link`.
```
marzban cli subscription get-link [OPTIONS]
```

**2. Опции**

`-u, --username TEXT`
- Вместо `TEXT` введите имя пользователя нужного пользователя.
```
marzban cli subscription get-link -u TEXT 
```

`--help`
- Используется для просмотра справки по команде `subscription get-link`.
```
marzban cli subscription get-link --help
```

## `user`

**1. Использование**

- Показывает, как располагаются опции и команды для команды `user`.
```
marzban cli user [OPTIONS] COMMAND [ARGS]...
```

**2. Опции**

`--help` 
- Используется для просмотра справки по команде `user`.
```
marzban cli user --help
```

**3. Команды**

`list`
- Используется для просмотра списка пользователей.
```
marzban cli user list
```

`set-owner`
- Используется для передачи владения пользователем от одного администратора другому.
```
marzban cli user set-owner
```

## `user list`
- Используется для просмотра списка пользователей.

**1. Использование**

- Показывает, как располагаются опции для команды `user list`.
```
marzban cli user list [OPTIONS]
```

**2. Опции**

`-o, --offset INTEGER`
- Эта опция используется для просмотра списка пользователей, начиная с определенного количества. Количество нужно указать вместо `ITEMS`. Например, если ввести число `100`, первые сто пользователей не будут показаны.
```
marzban cli user list -o ITEMS
```

`-l, --limit INTEGER`
- Укажите количество пользователей для отображения вместо `ITEMS`.
```
marzban cli user list -l ITEMS
```

`-u, --username TEXT`
- Вместо `TEXT` введите имя пользователя нужного пользователя.
```
marzban cli user list -u TEXT
```

`-s, --search TEXT `
- Вместо `TEXT` введите имя пользователя нужного пользователя. Эта опция также ищет введенный текст в заметках пользователей.
```
marzban cli user list -s TEXT
```

`--status [active|disabled|limited|expired|on_hold]`
- Для просмотра списка пользователей с одним из этих `5` статусов.
```
marzban cli user list --status [active|disabled|limited|expired|on_hold]
```

`--admin, --owner TEXT `
- Показывает пользователей определенного администратора. Вместо `TEXT` введите имя пользователя нужного администратора.
```
marzban cli user list --admin TEXT
```

`--help`
- Используется для просмотра справки по команде `user list`.
```
marzban cli user list --help
```

## `user set-owner`
- Используется для передачи владения пользователем от одного администратора другому.

**1. Использование**

- Показывает, как располагаются опции для команды `user set-owner`.
```
marzban cli user set-owner [OPTIONS]
```

**2. Опции**

`-u, --username TEXT`
- Вместо `TEXT` введите имя пользователя нужного пользователя.
```
marzban cli user set-owner -u TEXT
```

`--admin, --owner TEXT`
- Вместо `TEXT` введите имя пользователя нужного администратора.
```
marzban cli user set-owner --admin TEXT
```

`-y, --yes`
- При добавлении этой опции финальное подтверждение не запрашивается.
```
marzban cli user set-owner -u TEXT --admin TEXT -y
```

`--help`
- Используется для просмотра справки по команде `user set-owner`.
```
marzban cli user set-owner --help
```

## `completion`

**1. Использование**

- Показывает, как располагаются опции и команды для команды `completion`.
```
marzban cli completion [OPTIONS] COMMAND [ARGS]...
```

**2. Опции**

`--help` 
- Используется для просмотра справки по команде `completion`.
```
marzban cli completion --help
```

**3. Команды**

`install`
```
marzban cli completion install
```

`show`
```
marzban cli completion show
```


## `completion install`

**1. Использование**

- Показывает, как располагаются опции для команды `completion install`.
```
marzban cli completion install [OPTIONS]
```

**2. Опции**

`--shell [bash|zsh|fish|powershell|pwsh]`
```
marzban cli completion install --shell [bash|zsh|fish|powershell|pwsh]
```

`--help`
- Используется для просмотра справки по команде `completion install`.
```
marzban cli completion install --help
```

## `completion show`

**1. Использование**

- Показывает, как располагаются опции для команды `completion show`.
```
marzban cli completion show [OPTIONS]
```

**2. Опции**

`--shell [bash|zsh|fish|powershell|pwsh]`
```
marzban cli completion show --shell [bash|zsh|fish|powershell|pwsh]
```

`--help`
- Используется для просмотра справки по команде `completion show`.
```
marzban cli completion show --help
```

## `examples` 
- Несколько примеров часто используемых команд `marzban cli`.

- Создание администратора с правами sudo
```
marzban cli admin create --sudo
```

- Создание администратора без прав sudo
```
marzban cli admin create 
```

- Удаление администратора
```
marzban cli admin delete 
```

- Изменение пароля панели в случае его забывания
```
marzban cli admin update
```

- Передача владения пользователем от одного администратора другому
```
marzban cli user set-owner 
```