---
title: Migrating from Subsonic to Airsonic
---
# Migrating from Subsonic

This guide helps you to migrate your data from Subsonic to Airsonic. It has been tested with Subsonic 5 to Airsonic 6.

## Install Airsonic

Install Airsonic as described [here](../install/)

## Migrate to Airsonic

After installation of Airsonic, the database needs to be migrated. In preperation for that, stop the Airsonic.

If you ran Subsonic before, your data will be (by default) stored in `/var/subsonic`. Assuming you did not use Airsonic before, we will delete all data from Airsonic:

::: danger DANGER
This will deletes all your Airsonic data.
:::

```sh
sudo rm -R /var/airsonic
```

We then copy Subsonic data to Airsonic location. Be aware that a couple of files need to be renamed:

```sh
sudo cp -a /var/subsonic /var/airsonic
sudo mv /var/airsonic/subsonic_sh.log /var/airsonic/airsonic_sh.log
sudo mv /var/airsonic/subsonic.log /var/airsonic/airsonic.log
sudo mv /var/airsonic/subsonic.properties /var/airsonic/airsonic.properties
sudo mv /var/airsonic/db/subsonic.backup /var/airsonic/db/airsonic.backup
sudo mv /var/airsonic/db/subsonic.data /var/airsonic/db/airsonic.data
sudo mv /var/airsonic/db/subsonic.lck /var/airsonic/db/airsonic.lck
sudo mv /var/airsonic/db/subsonic.log /var/airsonic/db/airsonic.log
sudo mv /var/airsonic/db/subsonic.properties /var/airsonic/db/airsonic.properties
sudo mv /var/airsonic/db/subsonic.script /var/airsonic/db/airsonic.script
```

Change the `/var/airsonic` owner to use that will run airsonic (e.g. tomcat8 or airsonic):

```sh
sudo chown -R airsonic:airsonic /var/airsonic
```

Then start Airsonic again.

Your old settings will still be there. **If you wish**, you can delete subsonic data:

```sh
sudo rm -R /var/subsonic
```
