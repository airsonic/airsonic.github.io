---
layout: wiki
title: Source
permalink: /wiki/install/source/
---
## Install from source

### Prerequisites

In order to build, install, and run Libresonic, you will need:
* A recent version of Maven.
* A JDK installation. 1.8.x series of OpenJDK or Oracle JDK 8+ should work.

### Test your system

Confirm your Maven installation:

'''
which mvn
'''

Confirm that the $JAVA_HOME environment variable is set:

'''
echo $JAVA_HOME
'''

If Java is installed, but the JAVA_HOME variable not set, be sure to set it before you continue.

### Download and Build Libresonic

Clone the Libresonic repo:

'''
git clone https://github.com/Libresonic/libresonic.git
cd libresonic
'''

At the time of this writing, we recommend building from the development branch, as Libresonic has not had a stable release since being forked.

'''
git checkout develop
'''

Using Maven, build Libresonic:

'''
mvn package
'''

You should now have a war file:

'''
ls libresonic-main/target/libresonic.war
'''

Follow the [WAR installation](/wiki/install/war) page to deploy Libresonic.
