---
layout: wiki
title: Migrate
permalink: /wiki/migrate/
---
## Migrating from Subsonic to Libresonic

This guide helps you to migrate your data from Subsonic to Libresonic. It has been tested with Subsonic 5 to Libresonic 6.

#### Install Libresonic

Install Libresonic as described in the [install wiki](/wiki/install).

#### Migrate to Libresonic

After installation of Libresonic, the database needs to be migrated. In preperation for that, stop the Libresonic service.

If you ran Subsonic before, your data will be (by default) stored in `/var/subsonic`. Assuming you did not use Libresonic before, we will delete all data from Libresonic:

> WARNING: Deletes all Libresonic data
```
sudo rm -r /var/libresonic
```

We then copy Subsonic data to Libresonic location. Be aware that a couple of files need to be renamed:

```
sudo cp -a /var/subsonic /var/libresonic
sudo mv /var/libresonic/subsonic_sh.log libresonic_sh.log
sudo mv /var/libresonic/subsonic.log libresonic.log
sudo mv /var/libresonic/subsonic.properties libresonic.properties
sudo mv /var/libresonic/db/subsonic.backup /var/libresonic/db/libresonic.backup
sudo mv /var/libresonic/db/subsonic.data /var/libresonic/db/libresonic.data
sudo mv /var/libresonic/db/subsonic.lck /var/libresonic/db/libresonic.lck
sudo mv /var/libresonic/db/subsonic.log /var/libresonic/db/libresonic.log
sudo mv /var/libresonic/db/subsonic.properties /var/libresonic/db/libresonic.properties
sudo mv /var/libresonic/db/subsonic.script /var/libresonic/db/libresonic.script
```

Then start Libresonic service again.

Your old settings will still be there. --If you wish--, you can delete subsonic data:

```
sudo rm -r /var/subsonic
```
