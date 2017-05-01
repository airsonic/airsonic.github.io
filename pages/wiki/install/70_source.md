---
layout: wiki
title: Source
permalink: /wiki/install/source/
---
## Install from source

### Prerequisites

In order to build, install, and run Libresonic, you will need:
* A recent version of [Maven](http://maven.apache.org/).
* A JDK installation. 1.8.x series of OpenJDK or Oracle JDK 8+ should work.
* Optional: lintian and fakeroot, for .deb package.
* Optional: rpm and rpmlint, for .rpm package.

### Test your system

Confirm your Maven installation:

```
which mvn
```

Confirm that the $JAVA_HOME environment variable is set:

```
echo $JAVA_HOME
```

If Java is installed, but the JAVA_HOME variable not set, be sure to set it before you continue.

### Download Libresonic

Clone the Libresonic repo:

```
git clone https://github.com/Libresonic/libresonic.git
cd libresonic
```

> At the time of this writing, we recommend building from the development branch, as Libresonic has not had a stable release since being forked.
```
git checkout develop
```

### Building

#### Build Libresonic WAR package

Using Maven, build Libresonic:

```
mvn package
```

You should now have a .war file:

```
ls -l libresonic-main/target/libresonic.war
```

Follow the [WAR installation](/wiki/install/war) page to deploy the Libresonic WAR file.

#### Build Libresonic .jar package

You can create a .jar package for standalone installation.

**Work in progress for a detailed wiki**


#### Build Libresonic .deb package

You can create a .deb suitable for installation on Debian / Ubuntu.

```
mvn -P full -pl libresonic-booter -am install
mvn -P full -pl libresonic-installer-debian -am install
```

You should now have a .deb file:

```
ls -l libresonic-installer-debian/target/libresonic-*.deb
```

Follow the [Debian / Ubuntu installation](/wiki/install/deb) page to install the Libresonic .deb package.

#### Build Libresonic .rpm package

Building a RPM package is very similar:

```
$ mvn -P full -pl libresonic-booter -am install
$ mvn -P full,rpm -pl libresonic-installer-rpm -am install
```

You should now have a .rpm file:

```
ls -l libresonic-installer-rpm/target/libresonic-*.rpm
```

Follow the [Red Hat / Fedora installation](/wiki/install/rpm) page to install the Libresonic .rpm package.

#### Additional release archives

Additional release archives can be built using the following commands:

```
$ mvn -Pfull -pl libresonic-assembly assembly:single
```

These archives are built in `libresonic-assembly/targets` and include:

* The source distribution
* The standalone archive (for use without a WAR container)
* The WAR archive (for WAR containers)

Done!
