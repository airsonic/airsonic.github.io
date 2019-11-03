---
title: Setting up a reverse proxy
---
# Some knowledge base

A reverse proxy is a public-facing web server sitting in front of an internal server such as Airsonic. The Airsonic server never communicates with the outside ; instead, the reverse proxy handles all HTTP(S) requests and forwards them to Airsonic.

This is useful in many ways, such as gathering all web configuration in the same place. It also handles some options (HTTPS) much better than the bundled Airsonic server or a servlet container such as Tomcat.

This guide assumes you already have a working Airsonic installation after following the [installation guide](../install/).

# Prerequisites

This guide assumes you already have a TLS certificate. [Let's Encrypt](https://letsencrypt.org/getting-started/) currently provides such certificates for free using the [certbot software](https://certbot.eff.org/).

# Configure Airsonic

A few settings should be [tweaked via Spring Boot or the Tomcat configuration](../configure/):

  - Set the `context path` to `/airsonic` or anything you like.
  - Set the correct `address` to listen to.
  - Set the correct `port` to listen to.

# Reverse proxy configuration

## How it works

Airsonic expects proxies to provide information about their incoming URL so that Airsonic can craft it when needed.
To do so, Airsonic looks for the following HTTP headers:

 - `X-Forwarded-Host`
   - Provides server name and optionally port in the case that the proxy is on a non-standard port
 - `X-Forwarded-Proto`
   - Tells Airsonic whether to craft an HTTP or HTTPS url
 - `X-Forwarded-Server`
   - This is only a fallback in the case that `X-Forwarded-Host` is not available

Currently this is used wherever, `NetworkService#getBaseUrl` is called. A couple notable places include:

- Stream urls
- Share urls
- Coverart urls

## Setting up Apache

The following configurations works for HTTPS (with an HTTP redirection).

Create a new virtual host file:

```
sudo nano /etc/apache2/sites-available/airsonic.conf
```

Paste the following configuration in the virtual host file:

@[code lang=apacheconf highlight={2,3,8,9,11,15,16}](@/src/docs/proxy/apache.conf)

You will need to make a couple of changes in the configuration file:
- Replace `example.com` with your own domain name.
- Be sure to set the right path to your `cert.pem` and `key.pem` files.
- Change `/airsonic` following your airsonic server path.
- Change `http://127.0.0.1:8080/airsonic` following you airsonic server location, port and path.

::: tip
You could only add ProxyPass and ProxyPassReverse lines to your existing configuration:
```apacheconf
ProxyPass         /airsonic http://127.0.0.1:8080/airsonic
ProxyPassReverse  /airsonic http://127.0.0.1:8080/airsonic
```
:::

Activate the host:

```sh
sudo a2ensite airsonic.conf
```

Activate apache2 proxy, proxy_http and ssl module:

```sh
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod ssl
sudo a2enmod headers
```

Restart the Apache2 service:

```sh
sudo systemctl restart apache2.service
```

# Setting up Nginx

The following configurations works for HTTPS (with an HTTP redirection).

Create a new virtual host file:

```
sudo nano /etc/nginx/sites-available/airsonic
```

Paste the following configuration in the virtual host file:
@[code lang=nginx highlight={2,3,8,9,11,15,16}](@/src/docs/proxy/nginx.conf)

You will need to make a couple of changes in the configuration file:
- Replace `example.com` with your own domain name.
- Be sure to set the right path to your `cert.pem` and `key.pem` files.
- Change `/airsonic` following your airsonic server path.
- Change `http://127.0.0.1:8080` following you airsonic server location and port.
> **NOTE**:  you could only add the "location /airsonic" section to your existing configuration:
```nginx
# Proxy to the Airsonic server
location /airsonic {
    proxy_set_header X-Real-IP         $remote_addr;
    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto https;
    proxy_set_header X-Forwarded-Host  $http_host;
    proxy_set_header Host              $http_host;
    proxy_max_temp_file_size           0;
    proxy_pass                         http://127.0.0.1:8080;
    proxy_redirect                     http:// https://;
}
```
You will also need to make sure Tomcat uses the correct headers for redirects. Stop your Airsonic server or docker image and:
```
nano /path/to/airsonic/config/airsonic.properties
```
Add the following line to the bottom of the file:
```
server.use-forward-headers=true
```
Ctrl+X to save and exit the file, and restart your Airsonic server or docker image.

> **NOTE**:  you may face some `Content-Security-Policy` issues. To fix this add the following line to your configuration:
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' www.gstatic.com; img-src 'self' *.akamaized.net; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; frame-src 'self'; object-src 'none'";
```

Activate the host by creating a symbolic link between the sites-available directory and the sites-enabled directory:

```
sudo ln -s /etc/nginx/sites-available/airsonic /etc/nginx/sites-enabled/airsonic
```

Restart the Nginx service:

```
sudo systemctl restart nginx.service
```

# Setting up HAProxy


The following configurations works for HTTPS (with an HTTP redirection).

Open the haproxy configuration file:

```
sudo nano /etc/haproxy/haproxy.cfg
```

@[code highlight={2,3,8,9,11,15,16}](@/src/docs/proxy/haproxy.cfg)


Add these lines in your default section:

```
default

    # Use HTTP protocole
    mode http
```

Add these lines to the end:

```
frontend https

    # Listen on the HTTPS and HTTP ports
    bind :80
    bind :443 ssl crt /etc/haproxy/certs/cert_key.pem

    # Add X-Headers necessary for HTTPS; include:[port] if not running on port 443
    http-request set-header X-Forwarded-Host %[req.hdr(Host)]
    http-request set-header X-Forwarded-Proto https

    # (OPTIONAL) Force HTTPS
    redirect scheme https if !{ ssl_fc }

    # Bind URL with the right backend
    acl is_airsonic  path_beg -i /airsonic
    use_backend airsonic-backend if is_airsonic

backend airsonic-backend

    # Rewrite all redirects to use HTTPS, similar to what Nginx does in the
    # proxy_redirect directive.
    http-response replace-value Location ^http://(.*)$ https://\1

    # Forward requests to Airsonic server
    server airsonic 127.0.0.1:8080 check
```

You will need to make a couple of changes in the configuration file:
- Be sure to set the right path to your `cert_key.pem` files.
- Change `/airsonic` following your airsonic server path.
- Change `127.0.0.1:8080` following you airsonic server location and port.

Restart the Haproxy service:

```
sudo systemctl restart haproxy.service
```

# Set up Caddy


The following configuration works for HTTPS (with an HTTP redirection).

Create a new virtual host file (assumes /etc/caddy/caddy.conf is your main file, and includes all `*.conf` files in /etc/caddy/caddy.conf.d/ directory):

```
sudo nano /etc/caddy/caddy.conf.d/airsonic.conf
```

Paste the following configuration in the virtual host file:

@[code lang=caddy highlight={}](@/src/docs/proxy/caddy.conf)

You will also need to make sure Tomcat uses the correct headers for redirects. Stop your Airsonic server or docker image and:
```
nano /path/to/airsonic/config/airsonic.properties
```
Add the following line to the bottom of the file:
```
server.use-forward-headers=true
```
Ctrl+X to save and exit the file, and restart your Airsonic server or docker image.

Check the Caddy config for validity, and then restart the Caddy service:

```
caddy -conf /etc/caddy/caddy.conf -validate
sudo systemctl restart caddy.service
```
