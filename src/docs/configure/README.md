---
title: Configuration documentation
---
## Airsonic software properties

Airsonic has some system-wide configuration. These configurations are stored in the `airsonic.properties` file.

The `airsonic.properties` file parameters are simple key-value pairs stored in a list.

::: warning WARNING
It is **recommended** that these parameters are changed through the web interface settings page.
:::

However, they can also be modified directly here.

- Shutdown your server first.
- Modify the `airsonic.properties` (which can be found in your `airsonic.home` folder).
- Restart it for changes to take effect.

Here is a sample of the `airsonic.properties` file :

```properties
# Airsonic preferences.

JWTKey=XXXXXXXXXXXXXXXXXXXXXXX
SettingsChanged=XXXXXXXXXXXXXXXXXXXXXXX
MediaLibraryStatistics=1512 4850 62662 486912890569 15485585
LastScanned=XXXXXXXXXXXXXXXXXXXXXXX
IndexString=A B C D E F G H I J K L M N O P Q R S T U V W X-Z(XYZ)
IgnoredArticles=The El La Los Las Le Les
Shortcuts=New Incoming Podcast
PlaylistFolder=/var/playlists
MusicFileTypes=mp3 ogg oga aac m4a flac wav wma aif aiff ape mpc shn
VideoFileTypes=flv avi mpg mpeg mp4 m4v mkv mov wmv ogv divx m2ts
CoverArtFileTypes2=cover.jpg cover.png cover.gif folder.jpg jpg jpeg gif png
SortAlbumsByYear=true
GettingStartedEnabled=false
WelcomeTitle=Airsonic
WelcomeSubtitle=
WelcomeMessage2=
LoginMessage=
Theme=default
LocaleLanguage=en
LocaleCountry=
LocaleVariant=
IndexCreationInterval=3
IndexCreationHour=3
FastCacheEnabled=false
OrganizeByFolderStructure=true
DownloadBitrateLimit=0
UploadBitrateLimit=0
LdapEnabled=false
LdapUrl=ldap://host.domain.com:389/cn=Users,dc=domain,dc=com
LdapSearchFilter=(sAMAccountName={0})
LdapManagerDn=
LdapAutoShadowing=false
SmtpServer=smtp.mail.net
SmtpEncryption=SSL/TLS
SmtpPort=465
SmtpUser=info@exemple.net
SmtpFrom=info@exemple.net
SmtpPassword=XXXXXXXXXXXXXXXXXXXXXXX
```

## Java/Frameworks parameters

When running the standalone package (Docker, Homebrew are based on a standalone installation), some settings for the JVM or the underlying framework can be changed. Simply add `-D${PARAMETER}=${ARGUMENT}` to the `java` command line right before the `-jar` argument.

Here is an example for linux (windows users will want to use their OS specific path syntax i.e. `C:\\your\path`):

```java
java -Dairsonic.home=/var/airsonic -jar airsonic.war
```

### Common parameters

Here a some commonly used parameters:

| Parameter                    | Example                             | Default       | Description                                                                                |
| ---------------------------- | ----------------------------------- | ------------- | ------------------------------------------------------------------------------------------ |
| `server.port`                | `-Dserver.port=8080`                | 8080          | Port the standalone package listens on.                                                    |
| `server.address`             | `-Dserver.address=127.0.0.1`        | 127.0.0.1     | Address the standalone package listens on.                                                 |
| `server.context-path`        | `-Dserver.context-path=`            |               | URL path the standalone package listens on. (:anger: No trailing `/`)                      |
| `server.use-forward-headers` | `-Dserver.use-forward-headers=true` | false         | Use reverse proxy forwarded headers.                                                       |
| `airsonic.home`              | `-Dairsonic.home=/var/airsonic`     | /var/airsonic | Airsonic home folder where will be stored all airsonic data.                               |
| `mx`                         | `-Xmx512m`                          | 64m           | Allocate memory for Airsonic's Java process.                                               |
| `java.awt.headless`          | `-Djava.awt.headless=true`          | false         | Don't load UI libraries and reduce memory usage. (:anger: Jukebox require those libraries) |

::: tip NOTE
A full list of parameters can be found on the [spring-boot reference](https://docs.spring.io/spring-boot/docs/1.4.5.RELEASE/reference/htmlsingle/#common-application-properties) website. Not all parameters apply to airsonic, the important section is the **# EMBEDDED SERVER CONFIGURATION** section.
:::

## Tomcat specific configuration

When running Airsonic with tomcat some parameters cannot be set using Java args but need to be direclty changed in tomcat.

### Set Java/Frameworks parameters

As described in the [RUNNING.txt](http://tomcat.apache.org/tomcat-8.0-doc/RUNNING.txt) doc provided by tomcat, you can create a file named `setenv.sh` or for windows `setenv.bat` in the Tomcat home `bin` folder to  modify the java args.

Simply add the parameter like this `-D${PARAMETER}=${ARGUMENT}`.

Here is an example of a `setenv.sh` file (`setenv.bat` has slightly different syntax):

```sh
export JAVA_OPTS="$JAVA_OPTS -Dairsonic.home=/var/airsonic"
```

### Tomcat port

First you need to locate `server.xml` which by default should be in the ``${TOMCAT_HOME}/conf/`` folder (e.g. for Debian it will be `/var/lib/tomcat8/conf/server.xml`).

Then find the following similar statement:

```xml
<!-- Define a non-SSL HTTP/1.1 Connector on port 8180 -->
   <Connector port="8080" maxHttpHeaderSize="8192"
              maxThreads="150" minSpareThreads="25" maxSpareThreads="75"
              enableLookups="false" redirectPort="8443" acceptCount="100"
              connectionTimeout="20000" disableUploadTimeout="true" />

```
Or
```xml
<!-- A "Connector" represents an endpoint by which requests are received
     and responses are returned. Documentation at :
     Java HTTP Connector: /docs/config/http.html (blocking & non-blocking)
     Java AJP  Connector: /docs/config/ajp.html
     APR (HTTP/AJP) Connector: /docs/apr.html
     Define a non-SSL HTTP/1.1 Connector on port 8080
-->
<Connector port="8080" protocol="HTTP/1.1"
           connectionTimeout="20000"
           redirectPort="8443" />
```

Tomcat’s `server.xml` file cites it’s runs on port 8080. Change the `Connector port="8080"` port to any other port number.

Finally save the `server.xml` file and restart tomcat8.

### Context path

Locate `server.xml` which by default should be in the ``${TOMCAT_HOME}/conf/`` folder (e.g. for Debian it will be `/var/lib/tomcat8/conf/server.xml`).

You will need to add the following right above the `</Host>` tag:

```xml
<Context path="" docBase="airsonic" debug="0" reloadable="true">
  <WatchedResource>WEB-INF/web.xml</WatchedResource>
</Context>
<Context path="ROOT" docBase="ROOT"> <!-- Default set of monitored resources -->
  <WatchedResource>WEB-INF/web.xml</WatchedResource>
</Context>
```

Finally save the `server.xml` file and restart tomcat8.

## Homebrew specific configuration

Use your favorite text editor and open `$(brew --prefix)/Cellar/airsonic/v10.4.2/homebrew.mxcl.airsonic.plist`

Edit any of the following properties:

```xml
<string>-Xmx512m</string>  <!-- Max Memory -->
<string>-Dlogging.file=/usr/local/var/log/airsonic.log</string>
<string>-Dlogging.level.root=ERROR</string>
<string>-Dserver.host=0.0.0.0</string>
<string>-Dserver.port=4040</string>
<string>-Dserver.context-path=/</string>  <!-- localhost:port/context-path, e.g.: /airsonic -->
<string>-Dairsonic.home=/usr/local/var/airsonic</string>
<string>-Djava.awt.headless=true</string>
<string>-jar</string>
<string>/usr/local/Cellar/airsonic/v10.4.2/airsonic.war</string>
```

### Docker specific configuration

Configuring Airsonic is best done using the web-interface.

Regardless, you may at one point wish to configure Airsonic using the [properties file](#airsonic-software-properties).

You may adjust the `airsonic.properties` file directly. You can find it in the data volume that was attached to the container. Before making any changes to the file make sure that the Airsonic container is stopped.

If you did not supply another volume mountpoint the file will reside in `/var/lib/docker/volumes/data/_data`. You need administrator rights to modify it.

```sh
sudo nano /var/lib/docker/volumes/data/_data/airsonic.properties
```

Another way to configure Airsonic is by passing start-up arguments to the container when executing `docker run`. You may use the environment variable `JAVA_OPTS` to pass properties to Airsonic.

```sh
docker run \
  -p 4040:4040 \
  -e JAVA_OPTS="-DDatabaseMysqlMaxlength=512 -DDatabaseConfigType=embed ..." \
  airsonic/airsonic
```

View the docker container [start-up script](https://github.com/airsonic/airsonic/blob/master/install/docker/run.sh) for additional information.







# Main log file

Airsonic ouput log messages into a file called `airsonic.log` located in the `AIRSONIC_HOME` folder.

## Change log level using Tomcat

One can change the defaults log level by modifying the default application inner configuration.

This application configuration is located in a file called `application.properties` packaged into the Airsonic.war file. Fortunately, there are ways to override the default configuration without having to modify the `application.properties` inner file.

Those interested in details can have a look at [this spring.io document](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-external-config.html#boot-features-external-config-application-property-files).

## Change log level running standalone

Running Airsonic as a standalone application means that you don't deploy Airsonic to a servlet container but run it via a command that looks like this for short :

> **NOTE**: See [stand-alone installation doc](/docs/install/war-standalone/) for more details

```
java -jar airsonic.war
```

In that case you can add your own `application.properties` file in a `config` subdirectory to override the default application configuration.

Suppose that you'd like to change the default log level to DEBUG. Follow these steps:

- create a `config` folder beside the `airsonic.war` file
- create a `config/application.properties` empty file
- add the following line into this file

```
logging.level.root=DEBUG
```

- restart Airsonic

The `config/application.properties` file can contain any logging configuration directive.
You can fine tune the log level on any java package by adding a line like:

```
logging.level.package=LEVEL
```

where package must be replaced with a real java package name, and LEVEL must be replaced with a real level code.

Allowed levels are:
- `ERROR`
- `WARN`
- `INFO`
- `DEBUG`
- `TRACE`

Interesting packages to watch for are:

```
# Set Airsonic-specific loggers to 'DEBUG'
logging.level.org.airsonic=DEBUG

# Set all loggers to 'DEBUG' (warning: generates a lot of logs)
logging.level.root=DEBUG

# Set up SQL logging (warning: may leak passwords/keys/personal data)
logging.level.org.springframework.jdbc.core.JdbcTemplate=DEBUG
logging.level.org.springframework.jdbc.core.StatementCreatorUtils=TRACE
```


Jukebox might not always work out-of-the-box and may require some additional tweaking. If you get no sound output while trying to play via the Jukebox, you might need to tweak the audio device being picked up by Java sound.

### Finding device name

You can run the folowing Java program to get a list of all the audio devices in your system:

```java
import java.io.*;
import javax.sound.sampled.*;

public class audioDevList {
    public static void main(String args[]) {
        Mixer.Info[] mixerInfo =
            AudioSystem.getMixerInfo();
            System.out.println("Available mixers:");
            for(int cnt = 0; cnt < mixerInfo.length;cnt++) {
                System.out.println(mixerInfo[cnt].getName());
        }
    }
}
```

Sample output:
```
Available mixers:
Port HDMI [hw:0]
Port PCH [hw:1]
default [default]
HDMI [plughw:0,3]
HDMI [plughw:0,7]
HDMI [plughw:0,8]
HDMI [plughw:0,9]
HDMI [plughw:0,10]
PCH [plughw:1,0]
```

# Using sound.properties

You can then generate a `sound.properties` file accordingly with your devicename:

```
javax.sound.sampled.Clip=#PCH [plughw:1,0]
javax.sound.sampled.Port=#Port PCH [hw:1]
javax.sound.sampled.SourceDataLine=#PCH [plughw:1,0]
javax.sound.sampled.TargetDataLine=#PCH [plughw:1,0]
```

Copy the `sound.properties` file to `/usr/lib/jvm/java-1.8-openjdk/jre/lib/sound.properties`. Change `java-1.8-openjdk` depending on your java installation.

# Using Java parameters

You can pass the devicename as parameter into the launch script/service file:

```
-Djavax.sound.sampled.Clip=#PCH [plughw:1,0]
-Djavax.sound.sampled.Port=#Port PCH [hw:1]
-Djavax.sound.sampled.SourceDataLine=#PCH [plughw:1,0]
-Djavax.sound.sampled.TargetDataLine=#PCH [plughw:1,0]
```

# Using Docker

- Ensure that the docker user (passed through `--user` in the docker run) command has access to the `/dev/snd` device. Typically this can be done on most distros by adding the user to the `audio` group. You can alternatively use the `--group-add` flag to add the `audio` group the the user.
- Pass the `--device /dev/snd` argument for docker run. See the [docker documentation](https://docs.docker.com/engine/reference/run/#runtime-privilege-and-linux-capabilities) for more details.
- You can mount a copy of the previous `sound.properties` file to `/usr/lib/jvm/java-1.8-openjdk/jre/lib/sound.properties`
 inside the container.

All of the above might result in an invocation like the following:

```sh
docker run \
    -v /home/airsonic/music:/music \
    -v /home/airsonic/config:/config \
    -v /home/airsonic/podcasts:/podcasts \
    -v /home/airsonic/playlists:/playlists \
    --group-add audio \
    --device /dev/snd \
    -v /home/airsonic/sound.properties:/usr/lib/jvm/java-1.8-openjdk/jre/lib/sound.properties \
    -p 4040:4040 \
    airsonic/airsonic
```

# Use Jukebox with Pulseaudio

The point of this configuration is to force pulseaudio to use mixed ALSA output `alsa_output.dmix` (if it's available in your system). To check what sink is being used use `pactl list sinks`.

Configure java machine as stated above to get Jukebox working

Configure pulseaudio alsa module to use dmix device by default (remember to edit an apropriate `*.pa` file, `/etc/pulse/default.pa` if your pulseaudio instance is being autospawn by clients or `/etc/pulse/system.pa` if you run pulseaudio in system mode):

```
load-module module-alsa-sink device=dmix
load-module module-alsa-source device=snoop
```

Configure pulseaudio to use dmix output by default.

```sh
set-default-sink asla_output.dmix
```


Airsonic supports requiring anybody attempting to reset a user's password to
solve a [CAPTCHA](https://en.wikipedia.org/wiki/CAPTCHA), making it more
difficult for attackers to automatically cause passwords to be reset. Versions
10.1.2 and older supported this by default, but did so using a service that
stopped working at the end of March 2018 (making it impossible for users to
reset their passwords).

The new CAPTCHA support is disabled by default because it requires additional
configuration. This documentation will walk through the process.

## Configuring

The settings controlling CAPTCHA use can be found in the advanced settings pane
of the Airsonic web interface.

![A screenshot of the settings page, containing a "require CAPTCHA for account
recovery" checkbox which is unchecked, and two text entry fields for a reCAPTCHA
site and secret key which are both empty.](captcha-settings.png)

Checking the box will cause the CAPTCHA to be shown on the password reset page;
if the site and secret keys are not provided Airsonic will use default testing
keys which will cause a warning to be shown on the CAPTCHA and make all
verifications pass. While this configuration is not any more secure, the mere
presence of a CAPTCHA (even if it does nothing) may deter some unsophisticated
attackers.

To obtain reCAPTCHA keys it is necessary to register with Google, [here](https://www.google.com/recaptcha/admin/).
Register a new site with any label (the
label merely identifies a site in the admin console) and select "reCAPTCHA v2"
as the type.

![A screenshot of a sample reCAPTCHA registration form. The label field reads
"My Airsonic Site" and the radio button next to "reCAPTCHA v2" is
selected.](captcha-registration.png)

After registering, the reCAPTCHA admin panel will show site and secret keys.
Copy these into the Airsonic settings; the other information for client and
server-side integration is unnecessary because Airsonic already implements those
integrations.

## Testing

It is possible to test CAPTCHA configuration by logging out of Airsonic and
selecting "Forgotten your password?" on the login page. If the CAPTCHA is
enabled and correctly configured, the page should include a "I'm not a robot"
widget like below.

![A form to enter an email address and send a new password, with a reCAPTCHA
widget below containing a checkbox and the label "I'm not a
robot."](captcha-in-situ.png)
