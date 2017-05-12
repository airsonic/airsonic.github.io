---
layout: docs
title: Install Libresonic from source
permalink: /docs/install/source/
---
##### Prerequisites

In order to build, install, and run Libresonic, you will need:
- [A JDK installation, 1.8.x series of OpenJDK or Oracle JDK 8+ should work.]({{ site.baseurl }}/docs/install/prerequisites)
- A recent version of [Maven](http://maven.apache.org/).
- Optional: lintian and fakeroot, for .deb package.
- Optional: rpm and rpmlint, for .rpm package.

#### Test your system

Confirm your Maven installation:

```
which mvn
```

Confirm that the `$JAVA_HOME` environment variable is set:

```
echo $JAVA_HOME
```

If Java is installed, but the `JAVA_HOME` variable not set, be sure to set it before you continue.

#### Download Libresonic

Clone the Libresonic repo:

```
git clone https://github.com/Libresonic/libresonic.git
cd libresonic
```

> If you want to build the development version, change the branch to `develop`
```
git checkout develop
```

#### Building

##### Build Libresonic .war package

Using Maven, build Libresonic:

```
mvn clean package
```

You should now have a `.war` file:

```
ls -l libresonic-main/target/libresonic.war
```

Follow the [WAR installation guide](/docs/install/war) to deploy the Libresonic `.war` file.

##### Build Libresonic .deb package

**Work in progress**
**This section is not up to date**

You can create a `.deb` suitable for installation on Debian / Ubuntu.

```
mvn -P full -pl libresonic-booter -am install
mvn -P full -pl libresonic-installer-debian -am install
```

You should now have a `.deb` file:

```
ls -l libresonic-installer-debian/target/libresonic--.deb
```

Follow the [Debian / Ubuntu installation guide](/docs/install/deb) to install the Libresonic `.deb` package.

##### Build Libresonic .rpm package

**Work in progress**
**This section is not up to date**

Building a `.rpm` package is very similar:

```
$ mvn -P full -pl libresonic-booter -am install
$ mvn -P full,rpm -pl libresonic-installer-rpm -am install
```

You should now have a `.rpm` file:

```
ls -l libresonic-installer-rpm/target/libresonic--.rpm
```

Follow the [Red Hat / Fedora installation guide](/docs/install/rpm) to install the Libresonic `.rpm` package.

##### Additional release archives

**Work in progress**
**This section is not up to date**

Additional release archives can be built using the following commands:

```
$ mvn -Pfull -pl libresonic-assembly assembly:single
```

These archives are built in `libresonic-assembly/targets` and include:

- The source distribution
- The WAR archive (for WAR containers or for standalone use)
