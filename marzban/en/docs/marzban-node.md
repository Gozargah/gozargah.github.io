---
title: Marzban Node
---

# Marzban Node

Marzban Node allows you to distribute traffic load among different servers and enables the use of servers with various locations. Using this guide, you can configure and set up the Marzban Node on one or more side servers and connect them to the Marzban panel so that you can utilize these servers in your configurations. You will also see how to connect a node to multiple Marzban panels down below.

## Setup Marzban Node (Script)

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

::: tip Tip
Marzban-node commands are thoroughly explained in [Marzban Script](https://gozargah.github.io/marzban/en/docs/marzban-script) document.
:::

## Setup Marzban Node (Manual)

- After logging into the node server terminal, first update the server with the following command and install necessary programs.
```bash
apt-get update; apt-get upgrade -y; apt-get install curl socat git -y
```

- Install Docker.
```bash
curl -fsSL https://get.docker.com | sh
```

- Clone the repository and then create a folder for it.
```bash
git clone https://github.com/Gozargah/Marzban-node
mkdir /var/lib/marzban-node 
```

- To establish a secure connection between Marzban Node and Marzban Panel, you need to make certain changes in the `docker-compose.yml` file. So, navigate to the main directory of Marzban Node and open this file for editing.
```bash
cd ~/Marzban-node
nano docker-compose.yml
```

::: tip Tip
The `docker-compose.yml` file is sensitive to indentation and spacing. You can use tools like [yamlchecker](https://yamlchecker.com) to validate your configuration.
:::

- Remove the `#` sign behind `SSL_CLIENT_CERT_FILE` and align this line with the ones below. Then, you can delete the two lines related to `SSL_CERT_FILE` and `SSL_KEY_FILE`. 

- If you are using Marzban `v0.4.4` or any version above that, you can improve the stability of node connections by enabling the `REST` protocol. To do this, uncomment the corresponding line by removing the `#` at the beginning.

After saving the changes, your file will be as follows:

::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    # env_file: .env
    environment:
      SSL_CERT_FILE: "/var/lib/marzban-node/ssl_cert.pem"
      SSL_KEY_FILE: "/var/lib/marzban-node/ssl_key.pem"
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::

::: tip Tip
If you intend to change the connection ports of the node to Marzban, you can add the two variables `XRAY_API_PORT` and `SERVICE_PORT` to the `environment` section in this file and specify your desired ports.
:::

::: details Using `.env` (Optional)
If you wish, you can set the Marzban Node environment variables from the `.env` file.

Create a copy of the `.env.example` file, open it for editing, and make the necessary changes in this file.
```bash
cp .env.example .env
nano .env
```

Then configure `docker-compose.yml` as it is down below.
::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host
    env_file: .env
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::


- Now go to the `Node Settings` section in your Marzban Panel.
Then, click on `Add New Mazrban Node`, and add a new node.

- If you click on `Show Certificate` button, you will see the certificate required for node connection. Copy this certificate and continue following the steps from the terminal of your node server.

<img src="https://github.com/mdjvd/gozargah.github.io/assets/116950557/bee4bbf0-f811-4b20-af28-adee270b469d"
     style="display:block;float:none;margin-left:auto;margin-right:auto;width:47%">
<br>

- Create the certificate file with the following command and paste it there.
```bash
nano /var/lib/marzban-node/ssl_client_cert.pem
```
 
- Then run the command in Marzban Node directory.
```bash
docker compose up -d
```


- Return to the Marzban Panel and complete the different sections as follows:

1. In the `Name` section, choose your desired name for the node.
2. Enter the IP address of the node in the `Address` section.
3. Leave default connection ports for the node including `Port` and `API Port` unchanged.
4. In the `Usage Ratio` section, you can change the node consumption coefficient. The default value is `1`.
5. If you want your Marzban Node's host to be added for all inbounds as a new host, checkmark `Add this node as a new host for every inbound`.

::: tip Note
You can disable this checkmark and manually add the Node server IP only for necessary connections as a host in the `Host Settings` section.
:::

- Finally, click on `Add Node` to add the node. Now the node is ready to use. You can use the Node server IP for desired connections by managing your hosts in the `Host Settings` section.

::: warning Attention
If you have enabled a firewall on the Node server, you need to open ports for both panel connections and inbound ports in the Node server firewall.
:::

## Connect Marzban Node to Multiple Panels

If you need to connect a Node server to multiple Marzban Panels, you need to add a new node service in the `docker-compose.yml` file for each panel. This can be done in two ways.

::: tip Note
In both configuration options, you can modify port settings used in sample `docker-compose.yml` files to suit your needs. Additionally, you can add as many node services as required in this file.

:::

### First Method: Using Host Network

In this case, you can use all available ports in your environment. Note that in this scenario, all ports used by Xray-Core of the panels will be listened on by the node server. This means that if there is a duplicate port in the Xray core pf the panels, there may be disruptions in node connections or configurations. To avoid this issue, you can configure your settings as needed using [All on one port](https://gozargah.github.io/marzban/en/examples/all-on-one-port) tutorial, or simply follow the second method.

 - Use the following example to add two node services to the `docker-compose.yml` file.

::: details Sample configuration of `docker-compose.yml`
::: code-group
```yml{11,28} [docker-compose.yml]
services:
  marzban-node-1:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SERVICE_PORT: 2000
      XRAY_API_PORT: 2001
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban


  marzban-node-2:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SERVICE_PORT: 3000
      XRAY_API_PORT: 3001
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban
```
:::

- Then get the necessary certificates from the panels and place them in the specified paths.
- Proceed to run Marzban Node
```bash
docker compose up -d
```

- The connection ports of the node for the panels and the specified ports for the inbounds will be as follows:

| Variable | Panel 1 | Panel 2 |
|----------------|---------|-------|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | As desired |  As desired |

<br>

### Second Method: Using Port Mapping

In this scenario, only specific ports are accessible and duplicate ports on the server node will be prevented. Please note that you should specify the ports used in your services in the `docker-compose.yml` file.

- Use the example below to add two Node services to the `docker-compose.yml` file.


::: details Sample configuration file `docker-compose.yml` 
::: code-group
```yml{7,26} [docker-compose.yml]
services:
  marzban-node-1:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 2000:62050
      - 2001:62051
      - 2053:2053
      - 2054:2054


  marzban-node-2:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_2.pem"
      SERVICE_PROTOCOL: "rest"

    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
      - /var/lib/marzban:/var/lib/marzban

    ports:
      - 3000:62050
      - 3001:62051
      - 2096:2096
      - 2097:2097
```
:::      

- Once you have received the necessary certificates from the panels and placed them in the specified paths, proceed to run Marzban Node.

- The connection ports of the node for the panels and the specified ports for the inbounds will be as follows:

| Variable | Panel 1 | Panel 2 |
|----------------|-----------|---------|
| `Port`           | 2000      |    3000   |
| `API Port`       | 2001      |    3001   |
| `Inbound Ports` | 2053 <br> 2054 | 2096 <br> 2097 |

::: tip Tip 
If you intend to use Warp on the node server and have configured the `docker-compose.yml` file with the `Port Mapping` mode, you need to enable Warp with the `Xray` core. Warp will not work on the node server if you are using the `Wireguard` core.
:::

## Update Marzban Node

- To update the Marzban Node, execute the following commands in order.
```bash
cd ~/Marzban-node
docker compose pull
docker compose down --remove-orphans; docker compose up -d
```


## Additional Tips

::: tip Tip One
If you've made changes in the `docker-compose.yml` file, restart Marzban Node using the following command to apply the changes:
```bash
cd ~/Marzban-node
docker compose down --remove-orphans; docker compose up -d
```
To view the logs of the Marzban Node, use the following command.
```bash
cd ~/Marzban-node
docker compose logs -f
```
:::

::: tip Tip Two
If Marzban Node is not running the latest version of Xray and you wish to manually upgrade or downgrade it for any reason, you can do this by following the tutorial on [Changing Xray Core Version](https://gozargah.github.io/marzban/en/examples/change-xray-version).
:::

::: tip Tip Three
If you want to consider a separate inbound for each node for better node management, you need to add a new inbound in the `Core Settings` with unique `Tags` and `Ports` for each node.
:::

::: tip Tip Four
If you plan to use TLS-configured settings, you must obtain a certificate for your domain on the node server, then move it to the master server and enter the path of certificate files in the inbound. Also, instead of multiple certificates for multiple subdomains, you can obtain a wildcard certificate for your main domain to cover all subdomains.
:::

## Configuration

You can see the list of Marzban Node environment variables in this section. You can set all of these variables in the `docker-compose.yml` file or the `.env` file related to the Marzban Node.

::: details Environment Variables
### SERVICE_PORT
- Default value: `62050`

Service port for the Marzban Node

### XRAY_API_PORT 
- Default value: `62051`

Port for the Xray API

### XRAY_EXECUTABLE_PATH 
- Default value: `/usr/local/bin/xray`

Path to the Xray executable file

### XRAY_ASSETS_PATH 
- Default value: `/usr/local/share/xray`

Path to the asset files folder for Xray (files `geoip.dat` and `geosite.dat`).

### SSL_CERT_FILE 
- Default value: `/var/lib/marzban-node/ssl_cert.pem`

Path to the SSL certificate file

### SSL_KEY_FILE
- Default value: `/var/lib/marzban-node/ssl_key.pem`

Path to the SSL certificate key file

### SSL_CLIENT_CERT_FILE 

Path to the user certificate file

### DEBUG  
- Default value: `False`

Enable development mode

### SERVICE_PROTOCOL  
- Default value: `rpyc`

Service protocol for the Marzban Node

:::
