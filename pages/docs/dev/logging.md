---
layout: docs
title: Manage Libresonic logs
permalink: /docs/dev/logging/
---

This guide explains how to manage Libresonic logs.

### Main log file

Libresonic ouput log messages into a file called `libresonic.log` located in the `LIBRESONIC_HOME` folder.

#### Change log level using Tomcat

One can change the defaults log level by modifying the default application inner configuration.

This application configuration is located in a file called `application.properties` packaged into the Libresonic.war file. Fortunately, there are ways to override the default configuration without having to modify the `application.properties` inner file.

Those interested in details can have a look at [this spring.io document](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html#boot-features-external-config-application-property-files).

#### Change log level running standalone

Running Libresonic as a standalone application means that you don't deploy Libresonic to a servlet container but run it via a command that looks like this for short :

> Note: See [stand-alone installation doc](/docs/install/war-standalone/) for more details

```
java -jar libresonic.war
```

In that case you can add your own `application.properties` file in a `config` subdirectory to override the default application configuration.

Suppose that you'd like to change the default log level to DEBUG. Follow these steps :

- create a `config` folder beside the `libresonic.war` file
- create a `config/application.properties` empty file
- add the following line into this file

```
logging.level.root=DEBUG
```

- restart Libresonic

The `config/application.properties` file can contain any logging configuration directive.
You can fine tune the log level on any java package by adding a line like :

```
logging.level.package=LEVEL
```

where package must be replaced with a real java package name, and LEVEL must be replaced with a real level code.

Allowed levels are :
- `ERROR`
- `WARN`
- `INFO`
- `DEBUG`
- `TRACE`
