---
title: Update Airsonic
---

# Download the new version

Follow the [installation documentation](./install/#download-the-package) to get the latest Airsonic package.

# Update Airsonic

## Standalone

When running standalone, replacing the `.war` package and a simple restart should be enough.

With systemd:
```sh
systemctl airsonic restart
```

## Tomcat

When using Tomcat, do the following.

Stop the tomcat8 service:

```sh
sudo systemctl stop tomcat8
```

Replace the old `.war` package with the new one, and remove the existing airsonic files from the TOMCAT_HOME:
```sh
sudo mv airsonic.war /var/lib/tomcat8/webapps/airsonic.war
sudo chown tomcat8:tomcat8 /var/lib/tomcat8/webapps/airsonic.war
sudo rm -R /var/lib/tomcat8/webapps/airsonic/
sudo rm -R /var/lib/tomcat8/work/*
```

And finally restart tomcat8:
```sh
sudo systemctl start tomcat8
```
