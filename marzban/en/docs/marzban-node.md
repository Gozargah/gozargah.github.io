---
title: Marzban Node
---

# Marzban Node

Using this guide, you can set up Marzban Node on one or more side servers and connect them to Marzban Panel so that you can use these servers in your configurations. Marzban Node allows you to distribute traffic load among different servers and also provides the ability to use servers with different locations.
Next, we will learn how to connect a node server to multiple Marzban Panels.

## Setting up Marzban Node

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

- Remove the `#` sign behind `SSL_CLIENT_CERT_FILE` and align this line with the ones below. Then, you can delete the two lines related to `SSL_CERT_FILE` and `SSL_KEY_FILE`. After saving the changes, your file will be as follows:

::: code-group
```yml [docker-compose.yml]
services:
  marzban-node:
    # build: .
    image: gozargah/marzban-node:latest
    restart: always
    network_mode: host

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert.pem"

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
4. If you want your Marzban Node's host to be added for all inbounds as a new host, checkmark `Add this node as a new host for every inbound`.

::: tip Note
You can disable this checkmark and manually add the Node server IP only for necessary connections as a host in the `Host Settings` section.
:::

- Finally, click on `Add Node` to add the node. Now the node is ready to use. You can use the Node server IP for desired connections by managing your hosts in the `Host Settings` section.

::: warning Attention
If you have enabled a firewall on the Node server, you need to open ports for both panel connections and inbound ports in the Node server firewall.
:::

## Connecting Marzban Node to Multiple Panels

If you need to connect a Node server to multiple Marzban Panels, you need to add a new node service in the `docker-compose.yml` file for each panel. This can be done in two ways.

::: tip Note
In both configuration options, you can modify port settings used in sample `docker-compose.yml` files to suit your needs. Additionally, you can add as many node services as required in this file.

:::

### First Method: Using Host Network

In this case, you can use all available ports in your environment. Note that in this scenario, all ports used by Xray-Core of the panels will be listened on by the node server. This means that if there is a duplicate port in the Xray core pf the panels, there may be disruptions in node connections or configurations. To avoid this issue, you can configure your settings as needed using [All on one port](https://gozargah.github.io/marzban/en/examples/all-on-one-port) tutorial, or simply follow the second method.

 - Use the following example to add two node services to the `docker-compose.yml` file.

::: details Sample configuration of `docker-compose.yml`
::: code-group
```yml{11,27} [docker-compose.yml]
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
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | As desired |  As desired |

<br>

### Second Method: Using Port Mapping

In this scenario, only specific ports are accessible and duplicate ports on the server node will be prevented. Please note that you should specify the ports used in your services in the `docker-compose.yml` file.

- Use the example below to add two Node services to the `docker-compose.yml` file.


::: details Sample configuration file `docker-compose.yml` 
::: code-group
```yml{7,25} [docker-compose.yml]
services:
  marzban-node-1:
    image: gozargah/marzban-node:latest
    restart: always

    environment:
      SSL_CLIENT_CERT_FILE: "/var/lib/marzban-node/ssl_client_cert_1.pem"

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
|----------------:|-----------:|---------:|
| `Port`           | 2000      |    3000   |
| `API Port`       | 2001      |    3001   |
| `Inbound Ports` | 2053 <br> 2054 | 2096 <br> 2097 |


## Updating Marzban Node

- Enter Marzban Node directory.
```bash
cd Marzban-node
```

- Update Marzban Node using the following command.
```bash
docker compose pull
```

- Finally, restart Marzban Node using the following command.
```bash
docker compose down --remove-orphans; docker compose up -d
```


## Additional Notes

::: tip Note 1
If you want to consider a separate inbound for each node for better node management, you need to add a new inbound in the `Core Settings` with unique `Tags` and `Ports` for each node.
:::

::: tip Note 2
If you intend to use Warp on the node server and you have configured the `docker-compose.yml` file through second method, you must enable Warp through `Xray core`. If you use Wireguard core, Warp will not work on the node server.
:::

::: tip Note 3
If you plan to use TLS-configured settings, you must obtain a certificate for your domain on the node server, then move it to the master server and enter the path of certificate files in the inbound. Also, instead of multiple certificates for multiple subdomains, you can obtain a wildcard certificate for your main domain to cover all subdomains.
:::

::: tip Note 4
The `docker-compose.yml` file is sensitive to indentation and spacing. You can use tools like [yamlchecker](https://yamlchecker.com) to validate your configuration.
:::


::: tip Note 5
If you've made changes in the `docker-compose.yml` file, restart Marzban Node using the following command to apply the changes:
```bash
cd ~/Marzban-node
docker compose down --remove-orphans; docker compose up -d
```
:::

::: tip Note 6
If Marzban Node is not running the latest version of Xray and you wish to manually upgrade or downgrade it for any reason, you can do this by following the tutorial on [Changing Xray Core Version](https://gozargah.github.io/marzban/en/examples/change-xray-version).
 :::
