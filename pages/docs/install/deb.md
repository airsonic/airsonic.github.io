---
layout: docs
title: Install Libresonic on Debian / Ubuntu
permalink: /docs/install/deb/
---
##### Prerequisites

In order to install and run Libresonic, you will need:
- [A JDK installation, 1.8.x series of OpenJDK or Oracle JDK 8+ should work.](/docs/install/prerequisites)

#### Install Libresonic package

Download the latest Libresonic .deb package from the [download page](/download), or with the command below:

```
wget {{ site.repo }}/libresonic-v{{ site.stable_version }}.deb
```

Then install the package:

```
sudo dpkg -i libresonic-v{{ site.stable_version }}.deb
```

Libresonic should be running at [http://localhost:8080](http://localhost:8080) if installed locally, replace `localhost` with your server IP address if installed remotely.
