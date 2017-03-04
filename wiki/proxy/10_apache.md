---
layout: wiki
title: Set up Apache
permalink: /wiki/proxy/apache/
---
## Setting up Apache

Create a new virtual host file :

```
sudo nano /etc/apache2/sites-available/libresonic.conf
```

Paste the following configuration in the virtual host file :

```apache
<VirtualHost *:80>
    ServerName        example.com
    ErrorDocument     404 /404.html
    DocumentRoot      /var/www
    ProxyPass         /libresonic http://127.0.0.1:4040/libresonic
    ProxyPassReverse  /libresonic http://127.0.0.1:4040/libresonic
</VirtualHost>
```
You will need to make a couple of changes in the configuration file :
* Replace `exemple.com` with your own domain name.
* Change `/libresonic` following your libresonic server path.
* Change `http://127.0.0.1:4040/libresonic` following you libresonic server location, port and path.

Activate the host :
```
sudo a2ensite libresonic.conf
```

Restart the Apache2 service :
```
sudo systemctl restart apache2.service
```

Done !
