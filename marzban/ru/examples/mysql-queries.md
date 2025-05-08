---
title: Полезные SQL-запросы
---

::: warning Внимание
При неправильном использовании запросов или триггеров любые повреждения базы данных ложатся на вашу ответственность. Если у вас недостаточно технических знаний, воздержитесь от использования запросов, а особенно триггеров.
:::

# Полезные SQL-запросы
С помощью этого руководства вы сможете выполнять различные операции в вашей базе данных с помощью полезных SQL-запросов, которые недоступны через панель управления.

Вкратце, запрос — это способ задать вопрос базе данных и получить результат, однако многие запросы вместо вывода данных вносят изменения в базу данных. Поэтому обычно вторую группу не называют запросами, но по привычке мы называем их все запросами.

::: warning Внимание
Для использования SQL-запросов необходимо сначала настроить MySQL согласно руководству [Запуск MySQL](https://gozargah.github.io/marzban/fa/examples/mysql) и активировать панель управления базой данных PhpMyAdmin. Также MySQL поддерживается в версиях v0.3.2 и выше.
:::

::: warning Внимание
Если SQL-коды вносят изменения в базу данных вместо того, чтобы просто выводить результат, обязательно сделайте резервную копию согласно документации [Резервное копирование](https://gozargah.github.io/marzban/fa/examples/backup), так как изменения могут быть необратимыми.
:::

## Как вводить запросы
Сначала войдите в панель управления базой данных Marzban, которая по умолчанию работает на порту `8010`. В левой панели выберите `marzban`, затем в верхней части страницы нажмите на раздел `SQL`. Появится белое окно с предварительно заполненным кодом — сначала его удалите, затем введите нужный запрос и, наконец, нажмите кнопку `Go`, расположенную внизу окна.

## Список полезных SQL-запросов

- **Список пользователей, у которых подписка заканчивается в определённый день.**
  
  ```sql
  SELECT * FROM users 
  WHERE expire >= UNIX_TIMESTAMP('2024-06-13 00:00:00') 
    AND expire < UNIX_TIMESTAMP('2024-06-14 00:00:00') 
    AND status = 'active';
  ```
  
  ::: tip Примечание
  Фактически, этот запрос выводит список пользователей, у которых подписка истекает 13 июня; ориентиром служит первая дата.
  :::

- **Список пользователей, у которых подписка истекает до указанной даты.**
  
  ```sql
  SELECT * FROM users 
  WHERE expire < UNIX_TIMESTAMP('2024-03-10') 
    AND status = 'active';
  ```
  
  ::: tip Примечание
  Например, если сегодня 7 марта, а в запросе указана дата 10 марта, то он выведет всех пользователей, у которых осталось 3 дня до истечения подписки.
  :::

- **Список пользователей, у которых осталось менее 2 ГБ от установленного лимита.**
  
  ```sql
  SELECT * FROM users 
  WHERE data_limit - used_traffic < (2 * 1024 * 1024 * 1024)  
    AND status = 'active' 
    AND data_limit IS NOT NULL
  ```

- **Список пользователей, которые использовали 90% своего лимита.**
  
  ```sql
  SELECT * FROM users
  WHERE used_traffic >= 0.9 * data_limit
    AND status = 'active'
    AND data_limit IS NOT NULL;
  ```

- **Список назначенных лимитов (в ГБ) по каждому администратору.**
  
  ```sql
  SELECT admins.username, users.data_limit/1073741824, Count(*)
  FROM admins 
  LEFT JOIN users ON users.admin_id = admins.id
  GROUP BY admins.username, users.data_limit
  ```

- **Просмотр объёма потреблённого трафика администраторов (в ГБ).**
  
  ```sql
  SELECT admins.username, (SUM(users.used_traffic) + IFNULL(SUM(user_usage_logs.used_traffic_at_reset), 0)) / 1073741824
  FROM admins 
  LEFT JOIN users ON users.admin_id = admins.id 
  LEFT JOIN user_usage_logs ON user_usage_logs.user_id = users.id
  GROUP BY admins.username
  ```

- **Объём потреблённого трафика администраторов по каждому узлу (в ГБ).**
  
  ```sql
  SELECT admins.username, nodes.name, SUM(node_user_usages.used_traffic)/1073741824
  FROM nodes
  LEFT JOIN node_user_usages ON node_user_usages.node_id = nodes.id
  LEFT JOIN users ON node_user_usages.user_id = users.id
  LEFT JOIN admins ON users.admin_id = admins.id
  GROUP BY admins.username, nodes.name;
  ```

- **Просмотр количества пользователей для администратора с различными статусами.**
  
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

- **Просмотр названий клиентских программ (User-Agent) активных пользователей с подсчётом количества.**
  
  ```sql
  SELECT SUBSTR(sub_last_user_agent ,1,9), COUNT(*) FROM users
  WHERE status = 'active' GROUP By SUBSTR(sub_last_user_agent ,1,9) 
  ORDER By SUBSTR(sub_last_user_agent ,1,9);
  ```

- **Вывод списка онлайн-пользователей.**
  
  ```sql
  SELECT username
  FROM users
  WHERE TIMESTAMPDIFF(MINUTE, now(), online_at) = 0;
  ```

- **Просмотр пользователей, не активных более 24 часов.**
  
  ```sql
  SELECT username, TIMESTAMPDIFF(HOUR, online_at, NOW()) AS LastOnlineHours
  FROM users
  WHERE TIMESTAMPDIFF(HOUR, online_at, NOW()) >= 24
    AND status = 'active'
  ORDER BY LastOnlineHours DESC;
  ```

- **Список пользователей, обновивших ссылку подписки за последние 24 часа.**
  
  ```sql
  SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users
  WHERE datediff(now(), sub_updated_at) < 1 AND status = 'active' ORDER BY LastUpdate DESC;
  ```

- **Список пользователей, которые не обновляли ссылку подписки за последние 10 дней.**
  
  ```sql
  SELECT username, datediff(now(), sub_updated_at) as LastUpdate FROM users 
  WHERE datediff(now(), sub_updated_at) > 10 AND status = 'active' ORDER BY LastUpdate DESC;
  ```
  
  ::: tip Примечание
  В этом запросе число `10` можно заменить на любое желаемое количество дней.
  :::

- **Список пользователей с отключённым inbound.**
  
  ```sql
  SELECT users.username, proxies.id, exclude_inbounds_association.inbound_tag FROM users INNER JOIN proxies 
  ON proxies.user_id = users.id INNER JOIN exclude_inbounds_association 
  ON exclude_inbounds_association.proxy_id = proxies.id ORDER BY users.username;
  ```

- **Список пользователей, для которых протокол `VMess` отключён.**
  
  ```sql
  SELECT users.username FROM users 
  WHERE users.username not in (SELECT users.username FROM users LEFT JOIN proxies ON proxies.user_id = users.id 
  WHERE proxies.type = 'VMESS');
  ```
  
  ::: tip Примечание
  Для проверки других протоколов просто замените `VMESS` на нужное название (обязательно заглавными буквами).
  :::

- **Список пользователей, использующих определённый узел, отсортированный по убыванию потреблённого трафика.**
  
  ```sql
  SELECT users.id, users.username, SUM(node_user_usages.used_traffic) AS total_used_traffic
  FROM node_user_usages
  INNER JOIN users ON node_user_usages.user_id = users.id
  WHERE node_user_usages.node_id = 100
  GROUP BY users.id, users.username
  ORDER BY total_used_traffic DESC;
  ```
  
  ::: tip Примечание
  Вместо числа `100` укажите id нужного узла, найденный в таблице `nodes`.
  :::

- **Общий объём установленных лимитов для пользователей каждого администратора (в терабайтах).**
  
  ```sql
  SELECT admins.username, SUM(users.data_limit) / 1099511627776 AS total_data_limit_tb
  FROM users
  LEFT JOIN admins ON users.admin_id = admins.id
  GROUP BY admins.username;
  ```

- **Общий объём установленных лимитов для пользователей каждого администратора (в гигабайтах).**
  
  ```sql
  SELECT admins.username, SUM(users.data_limit) / 1073741824 AS total_data_limit_gb
  FROM users
  LEFT JOIN admins ON users.admin_id = admins.id
  GROUP BY admins.username;
  ```

- **Пользователи без ограничения по времени.**
  
  ```sql
  SELECT id, username
  FROM users
  WHERE expire IS NULL;
  ```

- **Пользователи без ограничения по объёму.**
  
  ```sql
  SELECT id, username
  FROM users
  WHERE data_limit IS NULL;
  ```

## Полезные SQL-скрипты
В отличие от запросов, SQL-скрипты вносят изменения в базу данных, а не выводят результат.

- **Перевод пользователей между администраторами.**
  
  ```sql
  UPDATE users SET users.admin_id = 3
  WHERE users.admin_id = 6;
  ```
  
  ::: tip Примечание
  В приведённом примере пользователи с `admin_id = 6` будут переведены на администратора с `id = 3`.
  :::

- **Деактивация всех пользователей определённого администратора.**
  
  ```sql
  UPDATE users SET users.status= 'disabled' 
  WHERE users.admin_id = '1' and users.status= 'active'
  ```

- **Активация всех неактивных пользователей определённого администратора.**
  
  ```sql
  UPDATE users SET users.status= 'active' 
  WHERE users.admin_id = '1' and users.status= 'disabled'
  ```

- **Добавление 1 дня ко времени для пользователей всех администраторов (sudo и non-sudo).**
  
  ```sql
  UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL
  ```

- **Вычитание 1 дня из времени для пользователей всех администраторов (sudo и non-sudo).**
  
  ```sql
  UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL
  ```

- **Добавление 1 дня ко времени для пользователей определённого администратора.**
  
  ```sql
  UPDATE users SET expire=expire+(86400 * 1) WHERE expire IS NOT NULL and admin_id in (100,200)
  ```

- **Вычитание 1 дня из времени для пользователей определённого администратора.**
  
  ```sql
  UPDATE users SET expire=expire-(86400 * 1) WHERE expire IS NOT NULL and admin_id in (100,200)
  ```

- **Добавление 20% от установленного лимита для всех пользователей определённого администратора.**
  
  ```sql
  UPDATE users SET data_limit = data_limit + (data_limit * 20) / 100  WHERE data_limit IS NOT NULL and admin_id in (100,200)
  ```

- **Вычитание 20% от установленного лимита для всех пользователей определённого администратора.**
  
  ```sql
  UPDATE users SET data_limit = data_limit - (data_limit * 20) / 100  WHERE data_limit IS NOT NULL and admin_id in (100,200)
  ```
  
  ::: tip Примечание
  В этих скриптах для изменения процента замените число `20` на нужное значение. Обратите внимание, что к установленному лимиту каждого пользователя прибавляется 20% — например, если лимит составляет 100 ГБ, после выполнения кода он станет 120 ГБ.
  :::

::: tip Примечание
В SQL-скриптах, предназначенных для определённого администратора, необходимо указать id администратора из таблицы базы данных перед выполнением кода. В некоторых случаях может потребоваться указать только имя администратора, поэтому обратите внимание на различия. Если в коде указаны два id в скобках, разделённых запятой, то если у вас один администратор — укажите его id, а если несколько — разделите их запятой.
:::

- **Удаление пользователей, у которых прошло более 30 дней с даты истечения подписки.**
  
  ```sql
  delete from users where datediff(now(),from_unixtime(expire))> 30
  ```
  
  ::: tip Примечание
  Для данного запроса необходимо отключить опцию `enable foreign key checks`.
  :::

- **Удаление всех неактивных пользователей.**
  
  ```sql
  delete from users where status = 'disabled'
  ```

- **Для пользователей с активированным протоколом `VLESS`: если параметр `Flow` не установлен, установить его.**
  
  ```sql
  UPDATE proxies
  SET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision')
  WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = '';
  ```

- **Активация протокола `VMess` для пользователей всех администраторов (sudo и non-sudo).**
  
  ```sql
  INSERT INTO proxies (user_id, type,  settings) 
  SELECT id, "VMess", CONCAT("{""id"": """, CONVERT(UUID() , CHAR) , """}") 
  FROM users;
  ```

- **Деактивация протокола `VMess` для пользователей всех администраторов (sudo и non-sudo).**
  
  ```sql
  DELETE FROM proxies WHERE type = "VMess"
  ```

- **Активация протокола `VMess` для пользователей определённого администратора.**
  
  ```sql
  INSERT INTO proxies (user_id, type,  settings) SELECT id, "VMess", CONCAT("{""id"": """, CONVERT(UUID() , CHAR) , """}") 
  FROM users INNER JOIN admins ON  users.admin_id = admins.id 
  WHERE admins.username = "admin1";
  ```

- **Деактивация протокола `VMess` для пользователей определённого администратора.**
  
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
  Для активации или деактивации других протоколов замените `VMess` на нужное название, а вместо `admin1` укажите имя нужного администратора.
  :::

- **Запрос для активации протокола Trojan.**
  
  ```sql
  INSERT INTO proxies (TYPE, user_id, settings) 
  SELECT 'trojan' AS TYPE, id, CONCAT( '{"password": "', SUBSTRING( CONCAT( CHAR(FLOOR(65 + (RAND() * 26))), CHAR(FLOOR(97 + (RAND() * 26))), CHAR(FLOOR(48 + (RAND() * 10))), CONVERT(SHA2(RAND(), 256) USING utf8mb4)), 1, 22 ), '", "flow": ""}' ) AS settings FROM users WHERE id in ( select id from users where id not in ( select user_id from proxies where type = 'trojan' ) );
  ```

- **Запрос для активации протокола Shadowsocks.**
  
  ```sql
  INSERT INTO proxies (TYPE, user_id, settings) 
  SELECT 'Shadowsocks' AS TYPE, id, CONCAT( '{"password": "', SUBSTRING( CONCAT( CHAR(FLOOR(65 + (RAND() * 26))), CHAR(FLOOR(97 + (RAND() * 26))), CHAR(FLOOR(48 + (RAND() * 10))), CONVERT(SHA2(RAND(), 256) USING utf8mb4)), 1, 22 ), '", "method": "aes-128-gcm"}' ) AS settings FROM users WHERE id in ( select id from users where id not in ( select user_id from proxies where type = 'Shadowsocks' ) );
  ```

- **Активация определённого inbound для пользователей всех администраторов (sudo и non-sudo).**
  
  ```sql
  DELETE FROM exclude_inbounds_association 
  WHERE proxy_id IN (
      SELECT proxies.id
      FROM users
      INNER JOIN admins ON users.admin_id = admins.id
      INNER JOIN proxies ON proxies.user_id = users.id
  ) AND inbound_tag = 'INBOUND_NAME';
  ```

- **Активация определённого inbound для пользователей определённого администратора.**
  
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

- **Деактивация определённого inbound для пользователей всех администраторов (sudo и non-sudo).**
  
  ```sql
  INSERT INTO exclude_inbounds_association (proxy_id, inbound_tag)
  SELECT  proxies.id, "INBOUND_NAME"
  FROM users  INNER JOIN admins ON users.admin_id = admins.id  INNER JOIN proxies ON proxies.user_id = users.id
  ```

- **Деактивация определённого inbound для пользователей определённого администратора.**
  
  ```sql
  INSERT INTO exclude_inbounds_association (proxy_id, inbound_tag)
  SELECT  proxies.id, "INBOUND_NAME"
  FROM users  INNER JOIN admins ON users.admin_id = admins.id  INNER JOIN proxies ON proxies.user_id = users.id
  WHERE admins.username = "ADMIN";
  ```
  
  ::: tip Примечание
  В запросах, связанных с активацией и деактивацией inbound, вместо `INBOUND_NAME` укажите название нужного inbound, а в запросах для определённого администратора вместо `ADMIN` — имя нужного администратора.
  :::

::: warning Внимание
В четырёх приведённых выше запросах для активации или деактивации inbound имейте в виду, что если, например, протокол `Vless` не активирован для пользователей, данные запросы не окажут эффекта. Сначала активируйте соответствующий протокол, затем уже включайте или отключайте нужный inbound.
:::

::: warning Внимание
Если вы используете приведённые выше SQL-скрипты для активации протокола или inbound, и если данный протокол/inbound уже активирован даже для одного пользователя, он будет зарегистрирован повторно, что приведёт к многократному перезапуску Xray на всех узлах. Поэтому, если вы собираетесь активировать определённый протокол или inbound для пользователей, сначала деактивируйте его для всех, а затем активируйте.
:::

- **Если вы использовали запрос для удаления пользователей, рекомендуется выполнить следующие 3 запроса, чтобы очистить записи о прокси, сбросах трафика и настройках exclude для удалённых пользователей, что позволит облегчить базу данных.**

  ```sql
  delete from proxies where user_id not in (select id from users);
  ```
  ```sql
  delete from user_usage_logs where user_id not in (select id from users);
  ```
  ```sql
  delete from exclude_inbounds_association where proxy_id not in (select id from proxies);
  ```
  
  Если у вас нет настроек exclude inbound, третий запрос не удалит ни одной записи.
  
  ::: tip Примечание
  Рекомендуется также очистить таблицу `node_user_usages`.

  В конце выполните оптимизацию таблиц:
  
  - `users`
  - `proxies`
  - `exclude_inbound_association`
  - `user_usages_logs`
  
  Это можно сделать в разделе `Operations` → `Table maintenance` в верхней части страницы.
  :::

::: tip Примечание
Также обязательно регулярно удаляйте неактивных пользователей, так как это влияет на скорость работы панели и может вызывать такие ошибки, как dead lock.
:::

## Полезные SQL-события
События (events) используются для запуска SQL-скриптов в определённое время. Их можно назначать только для запросов, изменяющих базу данных (а не для запросов, которые только выводят результат).

- **SQL-код ниже создаёт событие, которое каждую пятницу в полночь очищает таблицу `node_user_usages`, чтобы объём резервной копии не был чрезмерным и не возникли проблемы с восстановлением. Если у вас большое количество пользователей, можно настроить это событие на ежедневное выполнение.**
  
  ```sql
  CREATE EVENT Clear_NodeUserUsages ON SCHEDULE 
  EVERY 1 WEEK STARTS '2024-05-03 00:00:00' ON COMPLETION NOT PRESERVE ENABLE 
  DO TRUNCATE node_user_usages
  ```

- **Ежедневное событие для установки параметра `Flow` для пользователей, если вы забудете его установить.**
  
  ```sql
  CREATE DEFINER=`root`@`%` EVENT `SetFlow` ON SCHEDULE EVERY 1 DAY STARTS '2024-06-01 01:00:00' ON COMPLETION NOT PRESERVE ENABLE DO 
  UPDATE proxies SET settings = JSON_SET(settings, '$.flow', 'xtls-rprx-vision') 
  WHERE type = 'VLESS' AND JSON_UNQUOTE(JSON_EXTRACT(settings, '$.flow')) = ''; 
  ```

::: tip Примечание
Как отключить событие? После его активации нажмите кнопку `Drop` — событие будет деактивировано. Однако обратите внимание, что переключая все события между `On` и `Off`, вы можете отключить все события сразу.
:::

## Полезные SQL-триггеры
Триггер — это событие, происходящее на таблице, и может быть одного из трёх типов:
  
- При добавлении записи в таблицу.
- При обновлении записи.
- При удалении записи.
  
Для всех этих случаев можно задать триггер, который выполнит определённое действие или полностью предотвратит операцию.

- **Триггер для предотвращения удаления аккаунта определёнными администраторами.**
  
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
  
  Чтобы отключить триггеры, как и события, нажмите кнопку `Drop`.
  
  ::: tip Примечание
  Обратите внимание, что внутри скобок приведены, например, три id. Это зависит от того, для каких администраторов вы хотите применить триггер. Найдите нужный admin id в таблицах базы данных и замените его.
  :::

- **Триггер для деактивации кнопки сброса трафика для администраторов.**
  
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

- **Триггер для установки лимита общего объёма данных для пользователей определённого администратора.**
  
  ```sql
  DELIMITER //

  CREATE TRIGGER Limit_Admin_TotalData
  BEFORE INSERT ON users
  FOR EACH ROW
  BEGIN
      DECLARE total_data_limit BIGINT;

      -- Подсчёт общего лимита данных для всех пользователей данного администратора
      SELECT SUM(data_limit) INTO total_data_limit
      FROM users
      WHERE admin_id = 1;

      -- Проверка, превышает ли общий лимит или равен 1 ТБ
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

      -- Подсчёт общего лимита данных для всех пользователей данного администратора
      SELECT SUM(data_limit) INTO total_data_limit
      FROM users
      WHERE admin_id = 1;

      -- Проверка, превышает ли общий лимит или равен 1 ТБ
      IF total_data_limit >= (1 * 1024 * 1024 * 1024 * 1024) THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Admin has reached the total data limit.';
      END IF;
  END //

  DELIMITER ;
  ```
  
  ::: tip Примечание
  Первый триггер применяется при создании пользователя, второй — при обновлении. Если вы хотите установить лимит объёма для администратора, настройте оба триггера в соответствии с требуемым лимитом.
  :::

  ::: tip Примечание
  Этот триггер ограничивает заданный лимит для выбранного администратора, а не фактически потреблённый объём. То есть сумма лимитов для всех пользователей данного администратора должна быть меньше или равна установленному значению. По умолчанию лимит равен 1 ТБ, но вы можете изменить его, изменив число `1`.
  :::

  ::: tip Примечание
  Если у вас несколько администраторов и вы хотите установить для каждого свой лимит, создайте этот триггер для каждого администратора с уникальным именем, так как два триггера не могут иметь одинаковое имя.
  :::

- **Триггер для ограничения количества пользователей, которых может создать администратор.**
  
  ```sql
  DELIMITER //

  CREATE TRIGGER Limit_Admin_UserCreation
  BEFORE INSERT ON users
  FOR EACH ROW
  BEGIN
      DECLARE user_count INT;

      -- Подсчёт количества пользователей, созданных данным администратором
      SELECT COUNT(*) INTO user_count
      FROM users
      WHERE admin_id = 1;

      -- Если количество пользователей достигает лимита, отменить операцию
      IF user_count = 100 THEN
          SIGNAL SQLSTATE '45000'
          SET MESSAGE_TEXT = 'Admin has reached the limit of users.';
      END IF;
  END //

  DELIMITER ;
  ```
  
  ::: tip Примечание
  В этом триггере установлен лимит в `100`, который вы можете заменить на нужное значение, а также изменить admin id по необходимости.
  :::

- **Триггер для добавления префикса к имени пользователя для определённых администраторов.**
  
  ```sql
  DELIMITER //

  CREATE TRIGGER Add_Prefix_To_Username
  BEFORE INSERT ON users
  FOR EACH ROW
  BEGIN
      -- Если admin_id соответствует одному из указанных
      IF NEW.admin_id IN (50, 100) THEN
          -- Если имя пользователя ещё не начинается с префикса
          IF LEFT(NEW.username, LENGTH('prefix_')) != 'prefix_' THEN
              SET NEW.username = CONCAT('prefix_', NEW.username);
          END IF;
      END IF;
  END //

  DELIMITER ;
  ```
  
  ::: tip Примечание
  Этот триггер добавляет заданный вами префикс к имени пользователя, создаваемого администратором, но применяется только к новым пользователям. Замените `prefix_` на нужный вам префикс.
  :::
