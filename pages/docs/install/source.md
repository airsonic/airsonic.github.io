---
layout: docs
title: Install Libresonic from source
permalink: /docs/install/source/
---
##### Prerequisites

In order to build, install, and run Libresonic, you will need:
- [A JDK installation, 1.8.x series of OpenJDK or Oracle JDK 8+ should work.](/docs/install/prerequisites)
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
```
libresonic-main/target/libresonic.war
```

Follow the [WAR installation guide](/docs/install/war) to deploy the Libresonic `.war` file.

##### Build Libresonic .deb package

**Work in progress**

##### Build Libresonic .rpm package

**Work in progress**

##### Additional release archives

**Work in progress**
