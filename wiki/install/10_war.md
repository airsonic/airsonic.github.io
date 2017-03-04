---
layout: wiki
title: WAR
permalink: /wiki/install/war/
---
## WAR installation

To get Libresonic running with a Tomcat server, we are going to install OpenJDK 8 or Oracle JDK 8, set the default JAVA_HOME, and finally deploy our Libresonic WAR package.

#### Prerequisites

In order to install and run Libresonic, you will need:
* A running [Tomcat](http://tomcat.apache.org/) server. If you're unfamiliar with Tomcat, there are many [guides](https://www.digitalocean.com/community/tags/java?q=How+to+install+tomcat8&type=tutorials) on it.

### Install OpenJDK 8 and set default JAVA_HOME

* #### On Debian 8

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

    Install openjdk-8-jre package:

    ```
    sudo apt-get install -t jessie-backports openjdk-8-jre
    ```

    Set default JAVA_HOME by using the command below and choose the right version (1.8.x):

    ```
    sudo update-alternatives --config java
    ```

* #### On Ubuntu > 16.04

    Install openjdk-8-jre package:

    ```
    sudo apt-get install openjdk-8-jre
    ```

    Set default JAVA_HOME by using the command below and choose the right version (1.8.x):

    ```
    sudo update-alternatives --config java
    ```

* #### On Red Hat / Fedora

    Please follow this [well documented tutorial](https://www.digitalocean.com/community/tutorials/how-to-install-java-on-centos-and-fedora#install-oracle-java-8) to install Java 8  and set default JAVA_HOME on your device.


* #### On Windows

    Download the JDK 8 .exe package from the [JDK download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

    Install the downloaded package.

    Then locate the Java installation directory.
    >If you didn't change the path during installation, it'll be something like `C:\Program Files\Java\jdk1.8.0_65`

    Do one of the following:
    * Windows 7 – Right click My Computer and select Properties > Advanced
    * Windows 8 – Go to Control Panel > System > Advanced System Settings

    Click the Environment Variables button.

    Under System Variables, click New.

    In the Variable Name field, enter either:
    * JAVA_HOME if you installed the JDK (Java Development Kit)
    * JRE_HOME if you installed the JRE (Java Runtime Environment)

    In the Variable Value field, enter your JDK or JRE installation path .

    If the path contains spaces, use the shortened path name.
    For example, `C:\Progra~1\Java\jdk1.8.0_65`.
    >Note for Windows users on 64-bit systems:
    * Progra~1 = `'Program Files'`
    * Progra~2 = `'Program Files(x86)'`

    Click OK and Apply Changes as prompted

* #### On MacOS

    Download the JDK 8 .dmg package from the [JDK download page](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).

    Install the downloaded package.

    Add the following lines to your ` ~/.bash_profile` file:

    ```
    export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"
    ```

### Deploy our Libresonic WAR package

* #### On Debian 8 / Ubuntu > 16.04

    Download the latest Libresonic .war package from the [download page](/download), or with the command below:

    ```
    wget https://libresonic.org/download/latest.war
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
    sudo rm -R /var/tomcat8/work
    ```

    Move the downloaded WAR file in the TOMCAT_HOME/webapps/ folder:

    ```
    sudo mv latest.war /var/tomcat8/webapps/libresonic.war
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

    Done!

* #### On Red Hat / Fedora

    **Work in progress for a detailed wiki**

* #### On Windows

    **Work in progress for a detailed wiki**

* #### On MacOS

    **Work in progress for a detailed wiki**
