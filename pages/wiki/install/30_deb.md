---
layout: wiki
title: Debian / Ubuntu
permalink: /wiki/install/deb/
---
##  Install Libresonic on Debian / Ubuntu

To get Libresonic running on Debian / Ubuntu we are going to install OpenJDK 8, then we will download the .deb package and install it.

### Install OpenJDK 8

#### On Debian 8

Open your `/etc/apt/source.list`:

```
sudo nano /etc/apt/source.list
```

Add the backports repo to it:

```
deb http://ftp.fr.debian.org/debian/ jessie-backports main contrib
```

Update your package list:

```
sudo apt-get update
```

Install openjdk-8-jre package:

```
sudo apt-get install -t jessie-backports openjdk-8-jre
```

Set default JAVA_HOME by using the command below and choose the right version (1.8.x):

```
sudo update-alternatives --config java
```

#### On Ubuntu > 16.04

Install  openjdk-8-jre package:

```
sudo apt-get install openjdk-8-jre
```

Set default JAVA_HOME by using the command below and choose the right version (1.8.x):

```
sudo update-alternatives --config java
```

### Install Libresonic package

Download the latest Libresonic .deb package from the [download page](/download), or with the command below:

```
wget https://libresonic.org/download/latest.deb -O libresonic.deb
```

Then install the package:

```
sudo dpkg -i libresonic.deb
```

Libresonic should be running at [http://localhost:4040](http://localhost:4040) if installed locally, replace `localhost` with your server IP address if installed remotely.
