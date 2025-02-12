---
title: Скрипт Marzban
---

# Скрипт Marzban

В этом разделе вы можете ознакомиться со скриптами для настройки Marzban или Marzban-node.

## Установка панели Marzban

- Установите Marzban с базой данных `SQLite` на вашем сервере, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
- Установите Marzban с базой данных `MySQL` на вашем сервере, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql
```
- Установите Marzban с базой данных `MariaDB` на вашем сервере, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
```
::: tip Совет
- Если у вас небольшое количество пользователей и узлов, база данных `SQLite` вам подойдет. Однако для большого числа пользователей и узлов настоятельно рекомендуется устанавливать Marzban с базой данных `MySQL`. `SQLite` всегда работает с одним соединением, и при большом количестве пользователей и узлов это приведет к большему числу подключений к базе данных, что, вероятно, вызовет блокировку базы данных.
:::
::: tip Совет
- В настоящее время отсутствует подробное описание работы с базой данных `MariaDB` и ее скриптом резервного копирования. Поэтому используйте ее только, если обладаете достаточными знаниями для работы с ней.
:::
- Это пример установки конкретной версии Marzban с базой данных `SQLite`.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --version v0.5.2
```
- Это пример установки конкретной версии Marzban с базой данных `MySQL`.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --version v0.5.2
```
- Это пример установки конкретной версии Marzban с базой данных `MariaDB`.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --version v0.5.2
```
::: warning Предупреждение
- База данных MySQL поддерживается с версии `v0.3.2` и выше.
:::
- Чтобы установить версию для разработчиков Marzban с базой данных `SQLite` на вашем сервере, используйте следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --dev
```
- Чтобы установить версию для разработчиков Marzban с базой данных `MySQL` на вашем сервере, используйте следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --dev
```
- Чтобы установить версию для разработчиков Marzban с базой данных `MariaDB` на вашем сервере, используйте следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --dev
```
::: warning Предупреждение
- Версия для разработчиков Marzban постоянно меняется и находится в стадии тестирования, поэтому рекомендуется только для пользователей с программными знаниями. Если вы обычный пользователь, не устанавливайте эту версию, так как изменения могут вызвать ошибки в работе панели и вашей базы данных.
:::
- Вы можете установить этот скрипт (команда marzban) на вашем сервере, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install-script
```
::: tip Совет
- Используйте следующую команду для просмотра всех команд Marzban.
```bash
marzban help
```
:::

## Установка Marzban-node

- Установите Marzban-node на вашем сервере, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install
```
- Установите Marzban-node на вашем сервере с указанием произвольного имени, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install --name marzban-node2
```
- Или вы можете установить этот скрипт (команда marzban-node) на вашем сервере, используя следующую команду.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install-script
```
::: tip Совет
- Используйте следующую команду для просмотра всех команд Marzban-node.
```bash
marzban-node help
```
:::

## Команды Marzban

- Используйте следующую команду для просмотра всех команд Marzban.
```
marzban help
```
- Включите Marzban, используя следующую команду.
```
marzban up
```
- Выключите Marzban, используя следующую команду.
```
marzban down 
```
- Перезапустите Marzban, используя следующую команду.
```
marzban restart 
```
- Просмотрите статус Marzban, используя следующую команду.
```
marzban status 
```
- Просмотрите логи Marzban, используя следующую команду.
```
marzban logs 
```
- Получите доступ к CLI Marzban, используя следующую команду.
```
marzban cli 
```
- Обновите Marzban, используя следующую команду.
```
marzban update 
```
- Удалите Marzban с вашего сервера, используя следующую команду.
```
marzban uninstall 
```
- Отредактируйте Docker-конфигурацию Marzban, используя следующую команду.
```
marzban edit 
```
- Отредактируйте файл `.env` Marzban, используя следующую команду.
```
marzban edit-env
```
- Настройте сервис резервного копирования Marzban, используя следующую команду.
```
marzban backup-service
```
- Сделайте немедленное резервное копирование, используя следующую команду.
```
marzban backup
```
- Измените версию ядра `Xray` в Marzban, используя следующую команду.
```
marzban core-update 
```
::: tip Совет
При вводе вышеуказанной команды будут отображаться только последние `10` версий ядра `Xray`. Если вы хотите использовать определенную версию ядра `Xray`, введите букву `m`, а затем укажите нужную версию, как показано ниже:
```
v1.8.24
```
:::

## Команды Marzban-node

- Используйте следующую команду для просмотра всех команд Marzban-node.
```
marzban-node help 
```
- Включите Marzban-node, используя следующую команду.
```
marzban-node up 
```
- Выключите Marzban-node, используя следующую команду.
```
marzban-node down 
```
- Перезапустите Marzban-node, используя следующую команду.
```
marzban-node restart 
```
- Просмотрите статус Marzban-node, используя следующую команду.
```
marzban-node status 
```
- Просмотрите логи Marzban-node, используя следующую команду.
```
marzban-node logs 
```
- Обновите Marzban-node, используя следующую команду.
```
marzban-node update 
```
- Удалите Marzban-node с вашего сервера, используя следующую команду.
```
marzban-node uninstall 
```
- Отредактируйте Docker-конфигурацию Marzban-node, используя следующую команду.
```
marzban-node edit 
```
- Измените версию ядра `Xray` в Marzban-node, используя следующую команду.
```
marzban-node core-update 
```
::: tip Совет
При вводе вышеуказанной команды будут отображаться только последние пять версий ядра `Xray`. Если вы хотите использовать определенную версию ядра `Xray`, введите букву `m`, а затем укажите нужную версию, как показано ниже:
```
v1.8.24
```
:::
