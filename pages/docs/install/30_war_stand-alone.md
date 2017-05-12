---
layout: docs
title: Stand-alone WAR installation
permalink: /docs/install/war-standalone/
---
If you'd prefer not to use a Tomcat container, you can also run Libresonic as a standalone application.
Note that, in that case, libresonic will available at `http://localhost:8080` (and not `http://localhost:8080/libresonic`).

##### Prerequisites

In order to install and run Libresonic, you will need:
- [A JDK installation, 1.8.x series of OpenJDK or Oracle JDK 8+ should work.]({{ site.baseurl }}/docs/install/prerequisites)
- A running [Tomcat](http://tomcat.apache.org/) server. If you're unfamiliar with Tomcat, there are many [guides](https://www.digitalocean.com/community/tags/java?q=How+to+install+tomcat8&type=tutorials) on it.

#### Run Libresonic WAR package

Download the latest Libresonic .war package from the [download page](/download), or with the command below:

```
wget {{ site.repo }}/libresonic-v{{ site.stable_version }}.war
```

Create the Libresonic directory and assign ownership to the user that will run Libresonic:

```
sudo mkdir /var/libresonic/
sudo chown -R $USER:$GROUP /var/libresonic/
```

Now you can simply run java against the libresonic.war package:

```
java -jar libresonic.war
```

Libresonic should be running at [http://localhost:8080](http://localhost:8080) if installed locally, replace `localhost` with your server IP address if installed remotely.
