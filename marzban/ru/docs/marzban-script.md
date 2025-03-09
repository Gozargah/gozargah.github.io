---
title: Скрипт Marzban
---

# Скрипт Marzban

В этом разделе представлены скрипты Marzban для установки панели Marzban или Marzban Node.

## Установка панели Marzban

- Установите Marzban с базой данных `SQLite` на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
- Установите Marzban с базой данных `MySQL` на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql
```
- Установите Marzban с базой данных `MariaDB` на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
```
::: tip Примечание
- Если у вас небольшое количество пользователей и нод, база данных `SQLite` подойдет для вас. Однако для большого количества пользователей и нод настоятельно рекомендуется устанавливать Marzban с базой данных `MySQL`. База данных `SQLite` всегда имеет одно соединение, и если у вас много пользователей и нод, это приведет к большему количеству подключений к базе данных, и, вероятно, ваша база данных будет заблокирована.
:::
::: tip Примечание
- В настоящее время нет необходимой документации по базе данных `MariaDB` и скрипту резервного копирования для нее, поэтому используйте ее только если у вас достаточно знаний для ее использования.
:::
- Следующая команда является примером установки определенной версии Marzban с базой данных `SQLite`:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --version v0.5.2
```
- Следующая команда является примером установки определенной версии Marzban с базой данных `MySQL`:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --version v0.5.2
```
- Следующая команда является примером установки определенной версии Marzban с базой данных `MariaDB`:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --version v0.5.2
```
::: warning Внимание
База данных MySQL поддерживается в версии `v0.3.2` и выше.
:::
- Установите версию для разработчиков Marzban с базой данных `SQLite` на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --dev
```
- Установите версию для разработчиков Marzban с базой данных `MySQL` на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --dev
```
- Установите версию для разработчиков Marzban с базой данных `MariaDB` на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --dev
```
::: warning Внимание
- Версия для разработчиков Marzban постоянно меняется и тестируется, поэтому она рекомендуется только для тех, кто имеет опыт программирования. Если вы обычный пользователь, не устанавливайте эту версию, так как изменения могут вызвать ошибки в работе панели и вашей базы данных.
:::
- Установите только скрипт, чтобы иметь доступ к командам Marzban:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install-script
```
::: tip Примечание
- Чтобы увидеть все команды Marzban, используйте следующую команду:
```bash
marzban help
```
:::

## Установка Marzban Node

- Установите Marzban Node на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install
```
- Установите Marzban Node с желаемым именем на ваш сервер с помощью следующей команды:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install --name marzban-node2
```
- Установите только скрипт, чтобы иметь доступ к командам Marzban Node:
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install-script
```
::: tip Примечание
- Чтобы увидеть все команды Marzban Node, используйте следующую команду:
```bash
marzban-node help
```
:::

## Команды Marzban

- Чтобы увидеть список команд Marzban, введите следующую команду:
```
marzban help
```
- Чтобы запустить Marzban, используйте следующую команду:
```
marzban up
```
- Чтобы остановить Marzban, используйте следующую команду:
```
marzban down 
```
- Чтобы перезапустить Marzban, используйте следующую команду:
```
marzban restart 
```
- Чтобы проверить статус Marzban, используйте следующую команду:
```
marzban status 
```
- Чтобы просмотреть логи Marzban, используйте следующую команду:
```
marzban logs 
```
- Чтобы получить доступ к командной строке (CLI) Marzban, используйте следующую команду:
```
marzban cli 
```
- Чтобы обновить Marzban, используйте следующую команду:
```
marzban update 
```
- Чтобы удалить Marzban с вашего сервера, используйте следующую команду:
```
marzban uninstall 
```
- Чтобы отредактировать Docker-конфигурацию Marzban, используйте следующую команду:
```
marzban edit 
```
- Чтобы отредактировать файл `.env` Marzban, используйте следующую команду:
```
marzban edit-env
```
- Чтобы настроить сервис резервного копирования Marzban, используйте следующую команду:
```
marzban backup-service
```
- Чтобы создать мгновенную резервную копию, используйте следующую команду:
```
marzban backup
```
- Чтобы изменить версию ядра `Xray` в Marzban, используйте следующую команду:
```
marzban core-update 
```
::: tip Примечание
При вводе вышеуказанной команды будут показаны только последние `10` версий ядра `Xray`. Если вы хотите использовать определенную версию ядра `Xray`, введите букву `m`, а затем введите желаемую версию в следующем формате:
```
v1.8.24
```
:::

## Команды Marzban Node

- Чтобы увидеть список команд Marzban Node, введите следующую команду:
```
marzban-node help 
```
- Чтобы запустить Marzban Node, используйте следующую команду:
```
marzban-node up 
```
- Чтобы остановить Marzban Node, используйте следующую команду:
```
marzban-node down 
```
- Чтобы перезапустить Marzban Node, используйте следующую команду:
```
marzban-node restart 
```
- Чтобы проверить статус Marzban Node, используйте следующую команду:
```
marzban-node status 
```
- Чтобы просмотреть логи Marzban Node, используйте следующую команду:
```
marzban-node logs 
```
- Чтобы обновить Marzban Node, используйте следующую команду:
```
marzban-node update 
```
- Чтобы удалить Marzban Node с вашего сервера, используйте следующую команду:
```
marzban-node uninstall 
```
- Чтобы отредактировать Docker-конфигурацию Marzban Node, используйте следующую команду:
```
marzban-node edit 
```
- Чтобы изменить версию ядра `Xray` в Marzban Node, используйте следующую команду:
```
marzban-node core-update 
```
::: tip Примечание
При вводе вышеуказанной команды будут показаны только последние `5` версий ядра `Xray`. Если вы хотите использовать определенную версию ядра `Xray`, введите букву `m`, а затем введите желаемую версию в следующем формате:
```
v1.8.24
```
::: 