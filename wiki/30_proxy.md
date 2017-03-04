---
layout: wiki
title: Proxy
permalink: /wiki/proxy/
---
## Setting up a reverse proxy

A reverse proxy is a public-facing web server sitting in front of an internal server such as Libresonic. The Libresonic server never communicates with the outside ; instead, the reverse proxy handles all HTTP(S) requests and forwards them to Libresonic.

This is useful in many ways, such as gathering all web configuration in the same place. It also handles some options (HTTPS) much better than the bundled Libresonic server or a servlet container such as Tomcat.

This guide assumes you already have a working Libresonic installation after following the [installation guide](/wiki/install/).

## Getting a TLS certificate

This guide assumes you already have a TLS certificate. [Let's Encrypt](https://letsencrypt.org/getting-started/) currently provides such certificates for free using the [certbot software](https://certbot.eff.org/).
