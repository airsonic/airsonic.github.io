---
layout: docs
title: Setting up a reverse proxy
permalink: /docs/proxy/
---
A reverse proxy is a public-facing web server sitting in front of an internal server such as Libresonic. The Libresonic server never communicates with the outside ; instead, the reverse proxy handles all HTTP(S) requests and forwards them to Libresonic.

This is useful in many ways, such as gathering all web configuration in the same place. It also handles some options (HTTPS) much better than the bundled Libresonic server or a servlet container such as Tomcat.

This guide assumes you already have a working Libresonic installation after following the [installation guide]({{ site.baseurl }}/docs/install).

## Getting a TLS certificate

This guide assumes you already have a TLS certificate. [Let's Encrypt](https://letsencrypt.org/getting-started/) currently provides such certificates for free using the [certbot software](https://certbot.eff.org/).

## Configure Libresonic

A few settings should be tweaked via Spring Boot or Tomcat
configuration:

  - Set the context path to `/libresonic`
  - Set the correct address to listen to
  - Set the correct port to listen to

##### Spring Boot

Add the following java args:

```java
java -Dserver.port=8080 -Dserver.address=127.0.0.1 -Dserver.contextPath=/libresonic -jar libresonic.war
```

##### Tomcat

Modify your `<Connector>` with the proper address and port:

```
<Connector
    port="8080"
    address="127.0.0.1"
```

See [HTTP Connector](https://tomcat.apache.org/tomcat-8.0-doc/config/http.html) for further detail.

For the context path, tomcat will automatically deploy to a context path matching your war name. So if you're using libresonic.war, you do not need to change anything.

## Reverse proxy configuration

##### How it works

Libresonic expects proxies to provide information about their incoming URL so that Libresonic can craft it when needed.
To do so, Libresonic looks for the following HTTP headers:

 - `X-Forwarded-Host`
   - Provides server name and optionally port in the case that the proxy is on a non-standard port
 - `X-Forwarded-Proto`
   - Tells Libresonic whether to craft an HTTP or HTTPS url
 - `X-Forwarded-Server`
   - This is only a fallback in the case that `X-Forwarded-Host` is not available

Currently this is used wherever, `NetworkService#getBaseUrl` is called. A couple notable places include:

- Stream urls
- Share urls
- Coverart urls

## Provided configurations

Use a guide in the list below:
- [Configure Apache proxy]({{ site.baseurl }}/docs/proxy/apache)
- [Configure Nginx proxy]({{ site.baseurl }}/docs/proxy/nginx)
- [Configure Haproxy proxy]({{ site.baseurl }}/docs/proxy/haproxy)
