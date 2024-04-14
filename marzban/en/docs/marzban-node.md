---
title: Marzban Node

# Marzban Node

With the help of this tutorial, you can set up Marzban Node on one or more side servers and connect them to the Marzban panel so that you can use these servers in your configurations. Marzban Node allows you to distribute traffic load among different servers and also provides the ability to use servers with different locations.
Next, we will learn how to connect a node server to multiple Marzban panels.

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

- To establish a secure connection between the node and the border panel, changes need to be made in the `docker-compose.yml` file. So, navigate to the main folder of Border Patrol Node and open this file for editing.
```bash
cd ~/Marzban-node
nano docker-compose.yml
```

- Remove the `#` sign at the beginngog of the phrase `SSL_CLIENT_CERT_FILE` and align this line with the one below. After saving the changes, your file content will be as follows:

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
      SSL_CERT_FILE: "/var/lib/marzban-node/ssl_cert.pem"
      SSL_KEY_FILE: "/var/lib/marzban-node/ssl_key.pem"
    volumes:
      - /var/lib/marzban-node:/var/lib/marzban-node
```
:::


- Now go to the `Node Settings` section through the menu in your panel.
Then, by clicking on `Add New Mazrban Node`, add a new node.

- By clicking on the `Show Certificate` button, you will see the certificate required for connecting to the node. Copy this certificate and continue following the steps from the terminal of your node server.

<img src="https://github.com/mdjvd/gozargah.github.io/assets/116950557/bee4bbf0-f811-4b20-af28-adee270b469d"
     style="display:block;float:none;margin-left:auto;margin-right:auto;width:47%">
<br>

- Create a certificate file with the following command and paste the copied content inside it.
```bash
nano /var/lib/marzban-node/ssl_client_cert.pem
```
 
- Then run the command.
```bash
docker compose up -d
```


- Return to the Marzban Panel and complete the different sections as follows:

1. In the `Name` section, choose a desired name for the node.
2. Enter the IP address of the node in the `Address` section.
3. Leave default connection ports for the node including `Port` and `API Port` unchanged.
4. If you want your node's border host to be added for all inbound connections as a new host, checkmark 'Add this node as a new host for every inbound'.

::: tip Note
You can disable this checkbox and add the Node server IP only for necessary connections as a host in the `Host Settings` section.
:::

- Finally, click on `Add Node` to add the node. Now the node is ready to use. You can use the Node server IP for desired connections by managing your hosts in the `Host Settings` section.

::: warning Attention
If you have enabled a firewall on the Node server, you need to open ports for both panel connections and inbound ports in the Node server firewall.
:::

## Connecting Marzban Node to Multiple Panels

If you need to connect a Node server to multiple Border panels, you need to add a new node service in the `docker-compose.yml` file for each panel. This can be done in two ways.

::: tip Note
In both configuration options, you can modify port settings used in sample `docker-compose.yml` files according to your needs. Additionally, you can add as many node services as required in this file.

:::

### First case: Using Host Network

In this case, you have the ability to use all available ports in your environment. Note that in this situation, all ports used by Xray-Core panels will be listened on by the node server. This means that if there is a duplicate port in the Xray core panels, there may be disruptions in node connections or configurations. To avoid this issue, you can configure your settings as needed using [single-port](https://gozargah.github.io/marzban/examples/all-on-one-port#یک-پورت-برای-همه), or take action from the second mode.

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
      SSL_CERT_FILE: "/var/lib/marzban-node/ssl_cert.pem"
      SSL_KEY_FILE: "/var/lib/marzban-node/ssl_key.pem"
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

- Then obtain the required certificate from the panels and place each one in the specified path as indicated in the sample.
- Run Border Node.
```bash
docker compose up -d
```

- The connection ports of the node to the panels and the usable ports in these enclosures are as follows:

| Variable | Panel 1 | Panel 2 |
|----------------:|---------:|-------:|
| `Port`           | 2000    |   3000  |
| `API Port`      | 2001    |   3001  |
| `Inbound Ports` | As desired |  As desired |

<br>

### Second Scenario: Using Port Mapping

In this scenario, only specific ports are usable and duplicate ports on the server node will be prevented. Please note that you should specify the ports used in your services in the `docker-compose.yml` file.

- Use the example below to add two Node services to the `docker-compose.yml` file.


::: Sample configuration file `docker-compose.yml` details
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

- After receiving the required certificates from the panels and placing them in the specified paths, run the Border Node.

- The connection ports of the node to the panels and the usable ports in these bundles will be as follows:

| Variable | Panel 1 | Panel 2 |
|----------------:|-----------:|---------:|
| `Port`           | 2000      |    3000   |
| `API Port`       | 2001      |    3001   |
| `Inbound Ports` | 2053 <br> 2054 | 2096 <br> 2097 |


## Updating the marzban node

- We enter the Marzban node folder.
```bash
cd Marzban-node
```

- We update the node version with the following command.
```bash
docker compose pull
```

- Finally, we restart the marzban node with the following command.
```bash
docker compose down --remove-orphans; docker compose up -d
```


## Additional Notes

::: tip Note 1
If you want to consider a separate inbound for each node for better node management, you need to add a new inbound with different `Tag` and `Port` in the `Core Settings`.
:::

::: tip Note 2
If you intend to use Warp on the node server and have configured the `docker-compose.yml` file in the second mode, you must enable Warp with the `Xray core`. If using Wireguard core, Warp will not work on the node server.
:::

::: tip Note 3
If you plan to use TLS-configured settings, you must obtain a certificate for your domain on the node server, then transfer it to the main server and enter the path of certificate files in the inbound. Also, instead of multiple certificates for multiple subdomains, you can get a wildcard certificate for your main domain to be used for all subdomains.
:::

::: tip Note 4
The `docker-compose.yml` file is sensitive to indentation and spacing. You can use tools like [yamlchecker](https://yamlchecker.com) to validate your configuration.
:::

::: tip Note 5
After making changes in the `docker-compose.yml` file, restart Marzban Node with this command:
bash
cd ~/Marzban-node
docker compose down --remove-orphans; docker compose up -d
```
:::

::: tip Note 6
Regarding Xray version, if Marzban Node is not on the latest version of Xray and you want to manually upgrade it or downgrade it for any reason through changing Xray-core version according to documentation.
 :::
