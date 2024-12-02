---
title: Marzban Script
---

# Marzban Script 

In this section, you can see scripts in order to setup Marzban or Marzban-node.

## Setup Marzban Panel  

- Install Marzban with the `SQLite` database on your server using this command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install
```
- Install Marzban with the `MySQL` database on your server using this command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql
```
- Install Marzban with the `MariaDB` database on your server using this command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb
```
::: tip Tip
- If you have a small number of users, the `SQLite` database is suitable for you. However, for a large number of users, it is strongly recommended to set up Marzban with the `MySQL` database.
:::
::: tip Tip
- Currently, there is no detailed explanation for the `MariaDB` database or its backup script. Therefore, only use it if you have sufficient knowledge of working with it.
:::
- This is an example for installing a specific version of Marzban with the `SQLite` database.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install v0.5.2
```
- This is an example for installing a specific version of Marzban with the `MySQL` database.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --version v0.5.2
```
- - This is an example for installing a specific version of Marzban with the `MariaDB` database.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --version v0.5.2
```
::: warning Warning
- MySQL database is supported in version `v0.3.2` and later.
:::
- To install the developer version of Marzban with the `SQLite` database on your server, use the following command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install dev
```
- To install the developer version of Marzban with the `MySQL` database on your server, use the following command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mysql --dev
```
- To install the developer version of Marzban with the `MariaDB` database on your server, use the following command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install --database mariadb --dev
```
::: warning Warning
- The developer version of Marzban is constantly changing and under testing, so it is only recommended for those with programming knowledge. If you are a simple user, do not install this version as the changes may cause bugs in the performance of the panel and your database.
:::
- You can only install this script (marzban command) on your server by using this command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban.sh)" @ install-script
```
::: tip Tip
- Use the following command to view all Marzban commands.
```bash
marzban help
```
:::

## Setup Marzban-node 

- Install Marzban-node on your server using this command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install
```
- Install Marzban-node on your server using this command with custom name.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install --name marzban-node2
```
- Or you can only install this script (marzban-node command) on your server by using this command.
```bash
sudo bash -c "$(curl -sL https://github.com/Gozargah/Marzban-scripts/raw/master/marzban-node.sh)" @ install-script
```
::: tip Tip
- Use the following command to view all Marzban-node commands.
```bash
marzban-node help
```
:::

## Marzban Commands 

- Use the following command to view all Marzban commands.
```
marzban help
```
- Turn Marzban on using this command.
```
marzban up
```
- Turn Marzban off using this command.
```
marzban down 
```
- Restart Marzban using this command.
```
marzban restart 
```
- View Marzban's status using the this command.
```
marzban status 
```
- View Marzban's logs using this command.
```
marzban logs 
```
- Access Marzban CLI using this command.
```
marzban cli 
```
- Update Marzban using this command.
```
marzban update 
```
- Delete Marzban from your server using this command.
```
marzban uninstall 
```
- Edit Marzban's Docker configuration using this command.
```
marzban edit 
```
- - Edit Marzban's `.env` file using this command.
```
marzban edit-env
```
- Change `Xray` core version of Marzban using this command.
```
marzban core-update 
```
::: tip Tip
By entering the above command, only the last five versions of the `Xray` core will be displayed. If you intend to use a specific version of the `Xray` core, you need to enter the letter `m` and then enter your desired version as shown below
```
v1.8.24
```
:::

## Marzban-node Commands 

- Use the following command to view all Marzban-node commands.
```
marzban-node help 
```
- Turn Marzban-node on using this command.
```
marzban-node up 
```
- Turn Marzban-node off using this command.
```
marzban-node down 
```
- Restart Marzban-node using this command.
```
marzban-node restart 
```
- View Marzban-node's status using the this command.
```
marzban-node status 
```
- View Marzban-node's logs using this command.
```
marzban-node logs 
```
- Update Marzban-node using this command.
```
marzban-node update 
```
- Delete Marzban-node from your server using this command.
```
marzban-node uninstall 
```
- Edit Marzban-node's docker using this command.
```
marzban-node edit 
```
- Change `Xray` core version of Marzban-node using this command.
```
marzban-node core-update 
```
::: tip Tip
By entering the above command, only the last five versions of the `Xray` core will be displayed. If you intend to use a specific version of the `Xray` core, you need to enter the letter `m` and then enter your desired version as shown below
```
v1.8.24
```
:::
