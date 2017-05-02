---
layout: wiki
title: Set up Haproxy
permalink: /wiki/proxy/haproxy/
---
## Setting up Haproxy

Open the haproxy configuration file :
```
sudo nano /etc/haproxy/haproxy.cfg
```

Add these lines in your default section :

```haproxy
default

    # Use HTTP protocole
    mode http
```

Add these lines to the end :

```haproxy
frontend https

    # Listen on the HTTPS and HTTP ports
    bind :80
    bind :443 ssl crt /etc/haproxy/certs/cert_key.pem

    # Bind URL with the right backend
    acl is_libresonic  path_beg -i /libresonic
    use_backend libresonic-backend if is_libresonic

backend libresonic-backend

    # Rewrite all redirects to use HTTPS, similar to what Nginx does in the
    # proxy_redirect directive.
    http-response replace-value Location ^http://(.*)$ https://\1

    # (OPTIONAL) Force HTTPS
    redirect scheme https if !{ ssl_fc }

    # Forward requests to Libresonic server
    server libresonic 127.0.0.1:4040 check
```
You will need to make a couple of changes in the configuration file :
* Be sure to set the right path to your `cert_key.pem` files.
* Change `/libresonic` following your libresonic server path.
* Change `127.0.0.1:4040` following you libresonic server location and port.

Restart the Haproxy service :
```
sudo systemctl restart haproxy.service
```
