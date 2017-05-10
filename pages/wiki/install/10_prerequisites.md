---
layout: wiki
title: Libresonic prerequisites installation
permalink: /wiki/install/prerequisites/
---
To get Libresonic running, we are going to install OpenJDK 8 or Oracle JDK 8, set the default `JAVA_HOME`, and finally deploy our Libresonic WAR package.

#### Install OpenJDK 8

##### On Debian 8

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

Install openjdk-8-jre package from jessie-backports:

```
sudo apt-get install -t jessie-backports openjdk-8-jre
```

Set default JAVA_HOME by using the command below and choose the right version (1.8.x):

```
sudo update-alternatives --config java
```

> Note that if Tomcat8 didn't get the right JAVA_HOME you can set it in `/etc/default/tomcat8`:
1. List the available Java version:
```
ls -l /usr/bin/jvm/
```
```
default-java -> java-1.8.0-openjdk-amd64
java-1.7.0-openjdk-amd64 -> java-7-openjdk-amd64
java-1.8.0-openjdk-amd64 -> java-8-openjdk-amd64
java-7-openjdk-amd64
java-8-openjdk-amd64
```
2. Open `/etc/default/tomcat8` and paste the right version to these lines:
```
# The home directory of the Java development kit (JDK). You need at least
# JDK version 7. If JAVA_HOME is not set, some common directories for
# OpenJDK and the Oracle JDK are tried.
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```

##### On Ubuntu > 16.04

Install openjdk-8-jre package:

```
sudo apt-get install openjdk-8-jre
```

Set default JAVA_HOME by using the command below and choose the right version (1.8.x):

```
sudo update-alternatives --config java
```
> Note that if Tomcat8 didn't get the right JAVA_HOME you can set it in `/etc/default/tomcat8`:
1. List the available Java version:
```
ls -l /usr/bin/jvm/
```
```
default-java -> java-1.8.0-openjdk-amd64
java-1.7.0-openjdk-amd64 -> java-7-openjdk-amd64
java-1.8.0-openjdk-amd64 -> java-8-openjdk-amd64
java-7-openjdk-amd64
java-8-openjdk-amd64
```
2. Open `/etc/default/tomcat8` and paste the right version to these lines:
```
# The home directory of the Java development kit (JDK). You need at least
# JDK version 7. If JAVA_HOME is not set, some common directories for
# OpenJDK and the Oracle JDK are tried.
JAVA_HOME=/usr/lib/jvm/java-8-openjdk-amd64
```

##### On Red Hat / Fedora

Please follow this [well documented tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-java-on-centos-and-fedora#install-oracle-java-8) to install Java 8  and set default JAVA_HOME on your device.

##### On Windows

Download the JDK 8 .exe package from the [JDK download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

Install the downloaded package.

Then locate the Java installation directory.
> If you didn't change the path during installation, it'll be something like `C:\Program Files\Java\jdk1.8.0_65`

Do one of the following:
- Windows 7 – Right click My Computer and select Properties > Advanced
- Windows 8 – Go to Control Panel > System > Advanced System Settings

Click the Environment Variables button.

Under System Variables, click New.

In the Variable Name field, enter either:
- JAVA_HOME if you installed the JDK (Java Development Kit)
- JRE_HOME if you installed the JRE (Java Runtime Environment)

In the Variable Value field, enter your JDK or JRE installation path.

If the path contains spaces, use the shortened path name.
For example, `C:\Progra~1\Java\jdk1.8.0_65`.
> Note for Windows users on 64-bit systems:
- Progra~1 = `'Program Files'`
- Progra~2 = `'Program Files(x86)'`

Click OK and Apply Changes as prompted

##### On MacOS

Download the JDK 8 .dmg package from the [JDK download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

Install the downloaded package.

Add the following lines to your ` ~/.bash_profile` file:

```
export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"
```
