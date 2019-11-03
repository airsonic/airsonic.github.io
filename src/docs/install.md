---
title: Install
prev: /docs/
next: /docs/configure/
---
##  Prerequisites :rocket:

In order to install and run Airsonic, you will need:
- A Java environment JDK, version 8 or later, using either [OpenJDK](https://openjdk.java.net/) or Oracle JDK.
- *Optional*: A running [Tomcat](http://tomcat.apache.org/) server.

::: warning
If you are running Airsonic on an **ARM** platform and you experience extremely long startup times (~ 20-30 minutes), you should install Oracle's JDK/JRE. [There are known performance issues with OpenJDK under ARM](https://github.com/airsonic/airsonic/issues/283).
:::

## Get the package

### Download the package :rocket:

Download the latest Airsonic .war package from the [Github releases page](https://github.com/airsonic/airsonic/releases/), or with the command below:

```sh
wget https://github.com/airsonic/airsonic/releases/download/v10.4.2/airsonic.war
```

Download and import [`Andrew DeMaria`](https://github.com/muff1nman) public key:

```sh
gpg --keyserver keyserver.ubuntu.com --recv 0A3F5E91F8364EDF
```

Download the signed checksums file and verify the previously download .war package:

```sh
wget https://github.com/airsonic/airsonic/releases/download/v10.4.2/artifacts-checksums.sha.asc
gpg --verify artifacts-checksums.sha.asc
sha256sum -c artifacts-checksums.sha.asc
```

:rocket: [Jump to package installation](#install-the-package)

### Build the package from sources

In order to build Airsonic, you will need:
- A recent version of [Maven](http://maven.apache.org/).

#### Test your system

Confirm your Maven installation:

```sh
which mvn
```

Confirm that the `$JAVA_HOME` environment variable is set:

```sh
echo $JAVA_HOME
```

If Java is installed, but the `$JAVA_HOME` variable not set, be sure to set it before you continue.

#### Clone airsonic

Clone the Airsonic repo:

```sh
git clone https://github.com/airsonic/airsonic.git
cd airsonic
```

Airsonic version are tagged so you simply need to checkout the version you need:

> `master` being our current develop branch

```sh
git checkout master
## or
git checkout v10.4.2
```

#### Building the war package

Using Maven, build Airsonic:

```sh
mvn clean package
```

You should now have a `.war` file:

```sh
ls -l airsonic-main/target/airsonic.war
```
```sh
airsonic-main/target/airsonic.war
```

## Install the package

If you don't know which installation method you should pick, odds are that the [standalone version](#as-standalone) is the right choice for you.

### As standalone :rocket:

Setup a dedicated airsonic user:

```sh
sudo useradd --system airsonic
```

Create the `airsonic.home` directory and assign ownership to the airsonic user:

```sh
sudo mkdir /var/airsonic/
sudo chown -R airsonic:airsonic /var/airsonic/
```

Now you can simply run java against the `airsonic.war` package:

```sh
sudo -u airsonic java -jar airsonic.war
```

Airsonic should be running at [http://localhost:8080](http://localhost:8080) if installed locally, replace `localhost` with your server IP address if installed remotely.

#### Systemd :rocket:

To go a bit further than just running the airsonic manually, one can setup integration with [Systemd](https://www.freedesktop.org/wiki/Software/systemd/). Systemd is an init system for most linux systems. It allows one to run airsonic on boot.

By following these systemd setup instructions, Airsonic will be available at [http://localhost:8080/airsonic](http://localhost:8080/airsonic). The root URL can be configured later.

Setup the systemd service:

```sh
wget https://raw.githubusercontent.com/airsonic/airsonic/master/contrib/airsonic.service -O /etc/systemd/system/airsonic.service
systemctl daemon-reload
systemctl start airsonic.service
systemctl enable airsonic.service
wget https://raw.githubusercontent.com/airsonic/airsonic/master/contrib/airsonic-systemd-env -O /etc/sysconfig/airsonic
```

::: warning
On Debian systems you need to replace `/etc/sysconfig` with `/etc/default` at line 5)
:::

Review or modify any startup settings in `/etc/sysconfig/airsonic`.

:rocket: [Jump to transcoder installation](#install-the-transcoder)

### With Tomcat

Create the Airsonic directory and assign ownership to the Tomcat system user (if running tomcat as a service):

```sh
sudo mkdir /var/airsonic/
sudo chown -R tomcat8:tomcat8 /var/airsonic/
```

Stop the tomcat8 service:

```sh
sudo systemctl stop tomcat8.service
```

Remove the possible existing airsonic files from the `TOMCAT_HOME`:

```sh
sudo rm /var/lib/tomcat8/webapps/airsonic.war
sudo rm -R /var/lib/tomcat8/webapps/airsonic/
sudo rm -R /var/lib/tomcat8/work/*
```

Move the downloaded WAR file in the `TOMCAT_HOME/webapps/` folder and assign ownership to the Tomcat system user:

```sh
sudo mv airsonic.war /var/lib/tomcat8/webapps/airsonic.war
sudo chown tomcat8:tomcat8 /var/lib/tomcat8/webapps/airsonic.war
```

Restart the tomcat8 service:

```sh
sudo systemctl start tomcat8.service
```
::: tip
It may take ~30 seconds after the service restarts for Tomcat to fully deploy the app. You can monitor `/var/log/tomcat8/catalina.out` for the following message:

`INFO: Deployment of web application archive /var/lib/tomcat8/webapps/airsonic.war has finished in 46,192 ms`
:::

Airsonic should be running at [http://localhost:8080/airsonic](http://localhost:8080/airsonic) if installed locally, replace `localhost` with your server IP address if installed remotly.

## Install the transcoder :rocket:

Transcoders are used by Airsonic to convert media from their on disk format to a format that can be consumed by clients. This is done not only for compatibility but also to save bandwidth when dealing with heavier file types. For example, although your library might use the flac format, bandwidth can be saved by converting to mp3 before transmission.

Create a `transcode` directory within your `airsonic.home` directory:

```sh
mkdir /var/airsonic/transcode
```

Within the `transcode` directory symlink to ffmpeg and verify correct permissions:

```sh
cd /var/airsonic/transcode/
ln -s /usr/bin/ffmpeg
chown -h airsonic:airsonic ffmpeg
ls -alh
```
```sh
lrwxrwxrwx 1 airsonic airsonic   15 mai    4 19:57 ffmpeg -> /usr/bin/ffmpeg
```

## Docker installation :ship:

### Prerequisites

In order to install and run Airsonic using [Docker](https://www.docker.com/), a working installation of Docker is required.

If you do not have Docker installed, you may follow [these instructions](https://docs.docker.com/engine/installation/) to install it on your system.

Verify that Docker is installed by running

```sh
$ docker -v
Docker version 17.06.0-ce, build 02c1d87
```

### Optional: Build from source

Ensure that you have a working jdk, maven installed, and access to docker via the user you're using:

```sh
$ javac -version
javac 1.8.0_212
$ which mvn
/usr/bin/mvn
$ docker ps
CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
```

Using maven, build Airsonic with the docker profile:

```sh
$ mvn clean package -P docker
...
[INFO] Reactor Summary:
[INFO]
[INFO] Airsonic 10.4.0-SNAPSHOT ........................... SUCCESS [  0.245 s]
[INFO] Subsonic REST API .................................. SUCCESS [  1.652 s]
[INFO] Sonos API .......................................... SUCCESS [  1.745 s]
[INFO] Airsonic Main ...................................... SUCCESS [04:57 min]
[INFO] Airsonic Docker Image 10.4.0-SNAPSHOT .............. SUCCESS [ 11.098 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
...
```

Note the new docker image:

```sh
$ docker images | grep airsonic
airsonic/airsonic               10.4.0-SNAPSHOT     1f1ca2aaa170        About a minute ago   225 MB
```

### Run the docker image :ship:

Running the Airsonic Docker container is straight forward. Simply execute the command below. If no local version is found, the command will pull the latest version of airsonic from docker hub and run it.

```sh
docker run -p 4040:4040 -d airsonic/airsonic
```

You should be able to access Airsonic on [http://localhost:4040](http://localhost:4040) after a couple of seconds.

::: warning
When running Docker this way all changes you make to Airsonic will be lost when stopping the container. Use [Volumes](#persisting_data) to persist data when the container is stopped.
:::

### Persisting Data :ship:

The Airsonic Docker file provides various mount points for volumes. You can see which by checking out the [Dockerfile](https://github.com/airsonic/airsonic/blob/master/install/docker/Dockerfile).

Attach volumes to your docker container when starting the container like so:

```sh
docker run \
  -v data:/airsonic/data \
  -v music:/airsonic/music \
  -v playlists:/airsonic/playlists \
  -v podcasts:/airsonic/podcasts \
  -p 4040:4040 \
  -d \
  airsonic/airsonic
```

You can find additional information regarding volumes [here](https://docs.docker.com/engine/admin/volumes/volumes/). Inspect volumes by running, for example `docker volume inspect data`.

:ship: [Jump to docker advanced configuration](./configure/#docker-configuration)

## Homebrew installation

This page describes how to run install Airsonic with Homebrew on macOS [Airsonic Homeprew tap](https://github.com/airsonic/homebrew-airsonic/).

This installation method is designed for easy install and upgrades, and uses sane defaults. It might not work as well for very particular / special configurations.

### Prerequisites

Please see the [previous prerequisites section](#prerequisites)

### Install the tap

The Airsonic formula currently resides in a custom project tap. It will be submitted to the official Homebrew formula repo at a future date.

```
brew tap airsonic/airsonic
brew install airsonic
```

Here is a brief list of the runtime flags used, for reference.

```
Xmx512m
Dlogging.file=#{var}/log/airsonic.log
Dlogging.level.root=ERROR
Dserver.host=0.0.0.0
Dserver.port=4040
Dserver.context-path=/
Dairsonic.home=#{airsonic.home}
Djava.awt.headless=true
```

### Run in background

#### Using Homebrew Services (preferred)

Run the following command:
```
brew services start airsonic
```

##### Using launchd (headless)

Run the following command:
```
cp `(brew --prefix)`/Cellar/airsonic/v10.4.2/homebrew.mxcl.airsonic.plist /Library/LaunchDaemons/
```
