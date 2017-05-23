---
layout: docs
title: Documentation
permalink: /docs/
---
Welcome to the Libresonic documentation. This guide describes installation process for Libresonic, a free, web-based media streamer, providing ubiquitous access to your music.

**Before following any docs, be sure that your system is up-to-date!**

Before installing Libresonic, you will have to install a working JDK. Follow this [guide](/docs/install/prerequisites/) to install it.

Here you can pick your [installation](/docs/install) docs for:
- [WAR package (Tomcat)](/docs/install/war)
- [WAR package (Standalone)](/docs/install/war-standalone)

{% comment %} Build targets not suported yet

- [Deb package (Debian / Ubuntu)](/docs/install/deb)
- [Rpm package (Red Hat / Fedora)](/docs/install/rpm)
- [Exe package (Windows)](/docs/install/exe)
- [Pkg package (macOS)](/docs/install/pkg)
- [Build from source](/docs/install/source)

{% endcomment %}

If you come from [Subsonic](http://www.subsonic.org/pages/index.jsp), you can migrate using our [migration docs](/docs/migrate).

After installing, you may want to put Libresonic behind a reverse proxy to access Libresonic on the HTTP(S) ports or enable SSL. Use a [proxy docs](/docs/proxy) in the list below:
- [Configure Apache proxy](/docs/proxy/apache)
- [Configure Nginx proxy](/docs/proxy/nginx)
- [Configure Haproxy proxy](/docs/proxy/haproxy)

Using an external database for large music collection can only be useful, just follow our [database docs](/docs/database) to set it up.

Transcoders are used by Libresonic to convert media from their on disk format to a format that can be consumed by clients. Use our docs to set up the [transcode binaries](/docs/transcode).
