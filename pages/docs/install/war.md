---
layout: docs
title: Tomcat WAR installation
permalink: /docs/install/war/
---
##### Prerequisites

In order to install and run Libresonic with Tomcat, you will need:
- [A JDK installation, 1.8.x series of OpenJDK or Oracle JDK 8+ should work.]({{ site.baseurl }}/docs/install/prerequisites)
- A running [Tomcat](http://tomcat.apache.org/) server. If you're unfamiliar with Tomcat, there are many [guides](https://www.digitalocean.com/community/tags/java?q=How+to+install+tomcat8&type=tutorials) on it.

#### Deploy Libresonic WAR package

##### On Debian 8 / Ubuntu > 16.04

Download the latest Libresonic .war package from the [download page]({{ site.baseurl }}/download), or with the command below:

```
wget {{ site.repo }}/libresonic-v{{ site.stable_version }}.war
```

Create the Libresonic directory and assign ownership to the Tomcat system user (if running tomcat as a service):

```
sudo mkdir /var/libresonic/
sudo chown -R tomcat8:tomcat8 /var/libresonic/
```

Stop the tomcat8 service:

```
sudo systemctl stop tomcat8.service
```

Remove the possible existing libresonic files from the TOMCAT_HOME:

```
sudo rm /var/tomcat8/webapps/libresonic.war
sudo rm -R /var/tomcat8/webapps/libresonic/
sudo rm -R /var/tomcat8/work/-
```

Move the downloaded WAR file in the TOMCAT_HOME/webapps/ folder:

```
sudo mv libresonic-v{{ site.stable_version }}.war /var/tomcat8/webapps/libresonic.war
```

Restart the tomcat8 service:

```
sudo systemctl start tomcat8.service
```

> Note that it may take ~30 seconds after the service restarts for Tomcat to fully deploy the app. You can monitor /var/log/tomcat8/catalina.out for the following message:
```
INFO: Deployment of web application archive /var/lib/tomcat8/webapps/libresonic.war has finished in 46,192 ms
```

Libresonic should be running at [http://localhost:8080/libresonic](http://localhost:8080/libresonic) if installed locally, replace `localhost` with your server IP address if installed remotly.

##### On Red Hat / Fedora

**Work in progress**

##### On Windows

**Work in progress**

##### On MacOS

**Work in progress**
