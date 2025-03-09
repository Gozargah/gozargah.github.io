---
title: Полезные SQL-запросы
---

::: warning Внимание
В случае неправильного использования запросов или триггеров, любое повреждение базы данных будет на вашей ответственности. Если у вас нет технических знаний, воздержитесь от использования запросов и особенно триггеров.
:::

# Полезные SQL-запросы
С помощью этого руководства вы сможете выполнять различные операции в своей базе данных через `SQL`-запросы, которые невозможно выполнить через интерфейс панели.

Если кратко, запрос — это вопрос к базе данных, на который мы получаем ответ, но многие запросы вместо вывода данных вносят изменения в базу данных. Строго говоря, ко второй категории термин "запрос" не применяется, но по привычке мы всё называем запросами.

::: warning Внимание
Для использования `SQL`-запросов необходимо сначала настроить `MySQL` согласно руководству [Настройка MySQL](https://gozargah.github.io/marzban/fa/examples/mysql) и активировать панель управления базой данных `PhpMyAdmin`. Также обратите внимание, что `MySQL` поддерживается в версии `v0.3.2` и выше.
:::

::: warning Внимание
Для SQL-кодов, которые вносят изменения в базу данных, необходимо предварительно создать резервную копию согласно документации [Резервное копирование](https://gozargah.github.io/marzban/fa/examples/backup), так как некоторые изменения могут быть необратимыми.
:::

## Как вводить запросы
Сначала войдите в панель управления базой данных Marzban, которая по умолчанию работает на порту `8010`. В меню слева нажмите на `marzban`, затем вверху страницы выберите раздел `SQL`. Появится белое поле с каким-то кодом по умолчанию. Сначала удалите этот код, затем введите свой запрос и, наконец, нажмите кнопку `Go`, которая находится под полем ввода.

## Список полезных SQL-запросов

- Список пользователей, подписка которых истекает в определенный день.
```sql
SELECT * FROM users 
WHERE expire >= UNIX_TIMESTAMP('2024-06-13 00:00:00') 
  AND expire < UNIX_TIMESTAMP('2024-06-14 00:00:00') 
  AND status = 'active';
```
::: tip Примечание
Фактически, с помощью этого запроса мы видим список пользователей, чья подписка истекает `13` июня. Первая дата является определяющей.
:::

- Список пользователей, подписка которых истекает до определенной даты.
```sql
SELECT * FROM users 
WHERE expire < UNIX_TIMESTAMP('2024-03-10') 
  AND status = 'active';
```

::: tip Примечание
Например, если сегодня `7` марта, а в запросе указано `10` марта, то будут выведены все пользователи, у которых осталось `3` дня подписки.
:::

- Список пользователей, у которых осталось менее `2` гигабайт трафика.
```sql
SELECT * FROM users 
WHERE data_limit - used_traffic < (2 * 1024 * 1024 * 1024)  
  AND status = 'active' 
  AND data_limit IS NOT NULL
```

- Список пользователей, которые использовали `90%` своего трафика.
```sql
SELECT * FROM users
WHERE used_traffic >= 0.9 * data_limit
  AND status = 'active'
  AND data_limit IS NOT NULL;
```

- Список объемов трафика, установленных для каждого администратора
```sql
SELECT admins.username, users.data_limit/1073741824, Count(*)
FROM admins 
LEFT JOIN users ON users.admin_id = admins.id
GROUP BY admins.username, users.data_limit
```

- Просмотр использованного трафика администраторами
```sql
SELECT admins.username, (SUM(users.used_traffic) + IFNULL(SUM(user_usage_logs.used_traffic_at_reset), 0)) / 1073741824
FROM admins 
LEFT JOIN users ON users.admin_id = admins.id 
LEFT JOIN user_usage_logs ON user_usage_logs.user_id = users.id
Group By admins.username
```

- Объем использования администраторами каждого узла
```sql
SELECT admins.username, nodes.name, SUM(node_user_usages.used_traffic)/1073741824
FROM nodes
LEFT JOIN node_user_usages ON node_user_usages.node_id = nodes.id
LEFT JOIN users ON node_user_usages.user_id = users.id
LEFT JOIN admins ON users.admin_id = admins.id
GROUP BY admins.username, nodes.name;
```

- Просмотр количества пользователей администратора с их различными статусами
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

- Просмотр имен клиентов пользователей по количеству
```sql
SELECT SUBSTR(sub_last_user_agent ,1,9), COUNT(*) FROM users
WHERE status = 'active' GROUP By SUBSTR(sub_last_user_agent ,1,9) 
ORDER By SUBSTR(sub_last_user_agent ,1,9);
```

- Просмотр онлайн-пользователей и их количества
```sql
SELECT username
FROM users
WHERE TIMESTAMPDIFF(MINUTE, now(), online_at) = 0;
```

- Просмотр пользователей, не бывших в сети 24 часа или более
```sql
SELECT username, TIMESTAMPDIFF(HOUR, online_at, NOW()) AS LastOnlineHours
FROM users
WHERE TIMESTAMPDIFF(HOUR, online_at, NOW()) >= 24
  AND status = 'active'
ORDER BY LastOnlineHours DESC;
```

- Список пользователей, обновивших свою подписку за последний `1` день.
```sql
SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users
WHERE datediff(now(), sub_updated_at) < 1 AND status = 'active' ORDER BY LastUpdate DESC;
```

- Список пользователей, не обновлявших свою подписку последние `10` дней.
```sql
SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users 
WHERE datediff(now(), sub_updated_at) > 10 AND status = 'active' ORDER BY LastUpdate DESC;
```

::: tip Примечание
В приведенном выше запросе замените число `10` на желаемое количество дней.
:::

- Список пользователей с неактивными входящими соединениями.
```sql
SELECT users.username, proxies.id, exclude_inbounds_association.inbound_tag FROM users INNER JOIN proxies 
ON proxies.user_id = users.id INNER JOIN exclude_inbounds_association 
ON exclude_inbounds_association.proxy_id = proxies.id ORDER BY users.username;
```

- Список пользователей, у которых отключен протокол `Vmess`.
```sql
SELECT users.username FROM users 
WHERE users.username not in (SELECT users.username FROM users LEFT JOIN proxies ON proxies.user_id = users.id 
WHERE proxies.type = 'VMESS');
```

::: tip Примечание
Для проверки других протоколов в приведенном выше запросе просто измените имя протокола и убедитесь, что оно написано заглавными буквами.
:::

- Список пользователей, использовавших определенный узел, отсортированный по объему использования от наибольшего к наименьшему
```sql
SELECT users.id, users.username, SUM(node_user_usages.used_traffic) AS total_used_traffic
FROM node_user_usages
INNER JOIN users ON node_user_usages.user_id = users.id
WHERE node_user_usages.node_id = 100
GROUP BY users.id, users.username
ORDER BY total_used_traffic DESC;
```
::: tip Примечание
Вместо числа `100` найдите ID узла в таблице `nodes` и подставьте его.
:::

- Общий объем трафика, установленный администраторами в терабайтах
```sql
SELECT admins.username, SUM(users.data_limit) / 1099511627776 AS total_data_limit_tb
FROM users
LEFT JOIN admins ON users.admin_id = admins.id
GROUP BY admins.username;
```

- Общий объем трафика, установленный администраторами в гигабайтах
```sql
SELECT admins.username, SUM(users.data_limit) / 1073741824 AS total_data_limit_gb
FROM users
LEFT JOIN admins ON users.admin_id = admins.id
GROUP BY admins.username;
```

- Пользователи без ограничения времени
```sql
SELECT id, username
FROM users
WHERE expire IS NULL;
```

- Пользователи без ограничения трафика
```sql
SELECT id, username
FROM users
WHERE data_limit IS NULL;
```

## Полезные SQL-скрипты
SQL-скрипты, в отличие от запросов, вносят изменения в базу данных вместо вывода информации.

- Перемещение пользователей между администраторами
```sql
UPDATE users SET users.admin_id = 3
WHERE users.admin_id = 6;
```

::: tip Примечание
В приведенном выше примере пользователи администратора с ID 6 в таблице базы данных переведены к администратору с ID 3.
:::

- Отключение всех пользователей определенного администратора
```sql
UPDATE users SET users.status= 'disabled' 
WHERE users.admin_id = '1' and users.status= 'active'
```

- Активация всех отключенных пользователей определенного администратора
```sql
UPDATE users SET users.status= 'active' 
WHERE users.admin_id = '1' and users.status= 'disabled'
```

- Добавление `1` дня к сроку действия для пользователей всех администраторов (судо и не-судо)
```sql
UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL
```

- Уменьшение срока действия на `1` день для пользователей всех администраторов (судо и не-судо)
```sql
UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL
```

- Добавление `1` дня к сроку действия для пользователей определенного администратора
```sql
UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL and admin_id in (100,200)
```

- Уменьшение срока действия на `1` день для пользователей определенного администратора
```sql
UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL and admin_id in (100,200)
```

- Увеличение объема трафика на `20%` для всех пользователей определенного администратора
```sql
UPDATE users SET data_limit = data_limit + (data_limit * 20) / 100  WHERE data_limit IS NOT NULL and admin_id in (100,200)
```

- Уменьшение объема трафика на `20%` для всех пользователей определенного администратора
```sql
UPDATE users SET data_limit = data_limit - (data_limit * 20) / 100  WHERE data_limit IS NOT NULL and admin_id in (100,200)
```

::: tip Примечание
В двух приведенных выше SQL-скриптах для изменения процента замените число `20` на желаемое. Обратите внимание, что двадцать процентов от установленного объема будет добавлено каждому пользователю. Например, если установленный объем для пользователя составляет `100` гигабайт, после выполнения вышеприведенного кода его объем будет составлять `120` гигабайт.
:::

::: tip Примечание
Для SQL-скриптов, предназначенных для определенного администратора, необходимо ввести ID администратора из таблицы базы данных, а затем запустить код. В некоторых кодах может потребоваться только имя пользователя администратора, так что различайте эти два типа кодов. Также в некоторых кодах, например, указаны два ID в скобках, разделенные запятыми. Если у вас один администратор, просто укажите ID одного администратора, а если у вас более одного администратора, укажите их количество, разделив их запятыми.
:::

- Удаление пользователей, срок действия которых истек более `30` дней назад
```sql
delete from users where datediff(now(),from_unixtime(expire))> 30
```

::: tip Примечание
Для вышеуказанного случая галочка `enable foreign key checks` должна быть выключена.
:::

- Удаление всех деактивированных пользователей.
```sql
delete from users where status = 'disabled'
```

- Для пользователей с активным протоколом `Vless`, если для них не настроен `Flow`, будет установлено значение.
```sql
UPDATE proxies
SET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision')
WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = '';
```

- Активация протокола `Vmess` для пользователей всех администраторов (судо и не-судо)
```sql
INSERT INTO proxies (user_id, type,  settings) 
SELECT id, "VMess", CONCAT("{""id"": """, CONVERT(UUID() , CHAR) , """}") 
FROM users;
```

- Деактивация протокола `Vmess` для пользователей всех администраторов (судо и не-судо)
```sql
DELETE FROM proxies WHERE type = "VMess"
```

- Активация протокола `Vmess` для пользователей определенного администратора
```sql
INSERT INTO proxies (user_id, type,  settings) SELECT id, "VMess", CONCAT("{""id"": """, CONVERT(UUID() , CHAR) , """}") 
FROM users inner join admins ON  users.admin_id = admins.id 
WHERE admins.username = "admin1";
```

- Деактивация протокола `Vmess` для пользователей определенного администратора
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

::: tip Примечание
Для активации или деактивации протоколов вы можете заменить `VMess` на другие протоколы. Также замените `admin1` на имя пользователя нужного вам администратора.
:::

- Запрос для активации протокола Trojan
```sql
INSERT INTO proxies (TYPE, user_id, settings) 
SELECT 'trojan' AS TYPE, id, CONCAT( '{"password": "', SUBSTRING( CONCAT( CHAR(FLOOR(65 + (RAND() * 26))), CHAR(FLOOR(97 + (RAND() * 26))), CHAR(FLOOR(48 + (RAND() * 10))), CONVERT(SHA2(RAND(), 256) USING utf8mb4)), 1, 22 ), '", "flow": ""}' ) AS settings FROM users WHERE id in ( select id from users where id not in ( select user_id from proxies where type = 'trojan' ) );
```

- Запрос для активации протокола Shadowsocks
```sql
INSERT INTO proxies (TYPE, user_id, settings) 
SELECT 'Shadowsocks' AS TYPE, id, CONCAT( '{"password": "', SUBSTRING( CONCAT( CHAR(FLOOR(65 + (RAND() * 26))), CHAR(FLOOR(97 + (RAND() * 26))), CHAR(FLOOR(48 + (RAND() * 10))), CONVERT(SHA2(RAND(), 256) USING utf8mb4)), 1, 22 ), '", "method": "aes-128-gcm"}' ) AS settings FROM users WHERE id in ( select id from users where id not in ( select user_id from proxies where type = 'Shadowsocks' ) );
```

- Активация определенного входящего соединения для пользователей всех администраторов (судо и не-судо)
```sql
DELETE FROM exclude_inbounds_association 
WHERE proxy_id IN (
    SELECT proxies.id
    FROM users
    INNER JOIN admins ON users.admin_id = admins.id
    INNER JOIN proxies ON proxies.user_id = users.id
) AND inbound_tag = 'INBOUND_NAME';
```

- Активация определенного входящего соединения для пользователей определенного администратора
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

- Деактивация определенного входящего соединения для пользователей всех администраторов (судо и не-судо)
```sql
INSERT INTO exclude_inbounds_association (proxy_id, inbound_tag)
SELECT  proxies.id, "INBOUND_NAME"
FROM users  INNER JOIN admins ON users.admin_id = admins.id  INNER JOIN proxies ON proxies.user_id = users.id
```

- Деактивация определенного входящего соединения для пользователей определенного администратора
```sql
INSERT INTO exclude_inbounds_association (proxy_id, inbound_tag)
SELECT  proxies.id, "INBOUND_NAME"
FROM users  INNER JOIN admins ON users.admin_id = admins.id  INNER JOIN proxies ON proxies.user_id = users.id
Where admins.username = "ADMIN";
```

::: tip Примечание
В вышеприведенных запросах для активации и деактивации входящих соединений необходимо заменить `INBOUND_NAME` на имя нужного входящего соединения, а для запросов, относящихся к определенному администратору, замените `ADMIN` на имя пользователя нужного администратора.
:::

::: warning Внимание
В четырех приведенных выше запросах для активации или деактивации входящих соединений важно знать, что если, например, протокол `Vless` не активирован для пользователей, запросы для активации входящего соединения не окажут эффекта. Поэтому сначала должен быть активирован конкретный протокол, а затем вы можете активировать или деактивировать входящее соединение этого протокола.
:::

::: warning Внимание
Обратите внимание, если вы используете приведенные выше SQL-скрипты для активации протокола или входящего соединения, и если этот протокол или входящее соединение уже активировано для хотя бы одного пользователя, произойдет дублирование, что приведет к постоянному перезапуску `Xray` на всех ваших узлах. Поэтому, если вы хотите активировать определенный протокол или входящее соединение для пользователей, сначала деактивируйте его для всех, чтобы избежать проблем с теми, у кого он уже активирован, а затем активируйте его для всех.
:::

- Если вы использовали запрос для удаления пользователей, рекомендуется выполнить следующие `3` запроса для удаления прокси, сброса объема использования и исключения для удаленных пользователей, что в результате сделает базу данных легче.

```sql
delete from proxies where user_id not in (select id from users);
```
```sql
delete from user_usage_logs where user_id not in (select id from users);
```
```sql
delete from exclude_inbounds_association where proxy_id not in (select id from proxies);
```
- Если у вас нет исключенных входящих соединений, третий запрос не удалит ни одной записи.

::: tip Примечание
- Также рекомендуется применить операцию `empty` к таблице `node_user_usages`.

В конце, после выполнения вышеуказанных шагов, рекомендуется нажать на опцию `optimize table` для таблиц:

`users`

`proxies `

`exclude_inbound_association` 

`user_usages_logs`

- Этот раздел можно найти в верхней части страницы в разделе `Operations`, затем в разделе `Table maintenance`.
:::

::: tip Примечание
Также обязательно периодически удаляйте неактивных пользователей, так как это повлияет на скорость панели и неизвестные ошибки, такие как `dead lock`.
:::

## Полезные SQL-события
События используются для SQL-скриптов, которые мы хотим выполнять в определенное время, и они применимы только к запросам, которые вносят изменения в базу данных, а не к запросам, которые выводят данные.

- Следующий SQL-код создает `Event`, который каждую пятницу в полночь (`12` часов) очищает таблицу `node_user_usages`, чтобы объем вашей резервной копии не увеличивался и вы не столкнулись с проблемами при восстановлении. Пользователи с большим количеством пользователей могут настроить это `Event` на ежедневное выполнение.
```sql
CREATE EVENT Clear_NodeUserUsages ON SCHEDULE 
EVERY 1 WEEK STARTS '2024-05-03 00:00:00' ON COMPLETION NOT PRESERVE ENABLE 
DO TRUNCATE node_user_usages
```

- Ежедневное событие для установки `Flow`, если вы забыли установить его для пользователя.
```sql
CREATE DEFINER=`root`@`%` EVENT `SetFlow` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-01 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO 
UPDATE proxies SET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision') 
WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = ''; 
```

::: tip Примечание
Как отключить событие? После его активации нажмите кнопку `Drop`, и оно будет деактивировано. Однако имейте в виду, что если вы нажмете кнопки `On` и `Off`, все `Events` будут деактивированы.
:::

## Полезные SQL-триггеры
::: tip Примечание
Триггер — это событие, которое происходит в таблице и включает три типа:

- При добавлении записи в таблицу
- При редактировании записи
- При удалении записи

На эти три случая можно установить триггер для выполнения определенного действия или предотвращения действия.
:::

- Триггер для предотвращения удаления аккаунта определенными администраторами
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
Для деактивации триггеров, как и для событий, нажмите кнопку `Drop`, и триггер будет деактивирован.

::: tip Примечание
Обратите внимание, что в скобках указаны три ID для примера. Это зависит от вас, на скольких администраторов вы хотите применить этот триггер. Найдите ID нужного администратора в таблицах базы данных и замените их.
:::

- Триггер для отключения кнопки сброса объема для администраторов
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

- Триггер для установки лимита объема для администраторов

```sql
DELIMITER //

CREATE TRIGGER Limit_Admin_TotalData
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    DECLARE total_data_limit BIGINT;

    -- Подсчет общего лимита данных всех пользователей, созданных администратором
    SELECT SUM(data_limit) INTO total_data_limit
    FROM users
    WHERE admin_id = 1;

    -- Проверка, превышает ли или равен общий лимит данных 1 ТБ
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

    -- Подсчет общего лимита данных всех пользователей, созданных администратором
    SELECT SUM(data_limit) INTO total_data_limit
    FROM users
    WHERE admin_id = 1;

    -- Проверка, превышает ли или равен общий лимит данных 1 ТБ
    IF total_data_limit >= (1 * 1024 * 1024 * 1024 * 1024) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Admin has reached the total data limit.';
    END IF;
END //

DELIMITER ;
```

::: tip Примечание
Первый триггер предназначен для ограничения при создании пользователя, а второй - для ограничения при редактировании. Следовательно, если вы хотите установить лимит объема для администратора, необходимо ввести оба триггера в соответствии с желаемым лимитом.
:::

::: tip Примечание
Этот триггер ограничивает определенный объем для указанного администратора, а не использованный объем. Это означает, что сумма всех установленных объемов для пользователей администратора должна быть меньше или равна лимиту, установленному вами. Объем по умолчанию в триггере установлен на 1 терабайт, который вы можете изменить, изменив число 1.
:::

::: tip Примечание
Обратите внимание, что если у вас несколько администраторов и вы хотите установить разные лимиты для каждого из них, вы должны ввести этот триггер с ID соответствующего администратора и другим именем, поскольку вы не сможете ввести два триггера с одинаковым именем.
:::

- Триггер для установки лимита на количество пользователей, которых администратор может создать.
```sql
DELIMITER //

CREATE TRIGGER Limit_Admin_UserCreation
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    DECLARE user_count INT;

    -- Подсчет количества пользователей, созданных администратором
    SELECT COUNT(*) INTO user_count
    FROM users
    WHERE admin_id = 1;

    -- Проверка, превышает ли количество пользователей, созданных администратором, лимит
    IF user_count = 100 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Admin has reached the limit of users.';
    END IF;
END //

DELIMITER ;
```

::: tip Примечание
В приведенном выше триггере установлен лимит 100, вы можете заменить его на желаемое количество, а также заменить ID администратора на нужный вам.
:::

- Триггер для установки префикса имени пользователя для администраторов
```sql
DELIMITER //

CREATE TRIGGER Add_Prefix_To_Username
BEFORE INSERT ON users
FOR EACH ROW
BEGIN
    -- Проверка, является ли admin_id одним из указанных администраторов
    IF NEW.admin_id IN (50, 100) THEN
        -- Проверка, не начинается ли имя пользователя уже с префикса
        IF LEFT(NEW.username, LENGTH('prefix_')) != 'prefix_' THEN
            SET NEW.username = CONCAT('prefix_', NEW.username);
        END IF;
    END IF;
END //

DELIMITER ;
```

::: tip Примечание
Приведенный выше триггер добавляет нужный вам префикс к пользователям, которых создает администратор. Обратите внимание, что префикс применяется только к новым пользователям. Замените слово `prefix` на нужный вам префикс.
::: 
