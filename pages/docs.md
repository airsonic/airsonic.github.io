---
layout: docs
title: Documentation
permalink: /docs/
---
Welcome to the Libresonic documentation. This guide describes installation process for Libresonic, a free, web-based media streamer, providing ubiquitous access to your music.

**Before following any docs, be sure that your system is up-to-date!**

Before installing Libresonic, you will have to install a working JDK. Follow this [guide]({{ site.baseurl }}/docs/install/prerequisites/) to install it.

Here you can pick your [installation]({{ site.baseurl }}/docs/install) docs for:
- [WAR package (Tomcat)]({{ site.baseurl }}/docs/install/war)
- [Jar package (Standalone)]({{ site.baseurl }}/docs/install/jar)
- [Deb package (Debian / Ubuntu)]({{ site.baseurl }}/docs/install/deb)
- [Rpm package (Red Hat / Fedora)]({{ site.baseurl }}/docs/install/rpm)
- [Exe package (Windows)]({{ site.baseurl }}/docs/install/exe)
- [Pkg package (macOS)]({{ site.baseurl }}/docs/install/pkg)
- [Build from source]({{ site.baseurl }}/docs/install/source)

If you come from [Subsonic](http://www.subsonic.org/pages/index.jsp), you can migrate using our [migration docs]({{ site.baseurl }}/docs/migrate).

After installing, you may want to put Libresonic behind a reverse proxy to access Libresonic on the HTTP(S) ports or enable SSL. Use a [proxy docs]({{ site.baseurl }}/docs/proxy) in the list below:
- [Configure Apache proxy]({{ site.baseurl }}/docs/proxy/apache)
- [Configure Nginx proxy]({{ site.baseurl }}/docs/proxy/nginx)
- [Configure Haproxy proxy]({{ site.baseurl }}/docs/proxy/haproxy)

Using an external database for large music collection can only be useful, just follow our [database docs]({{ site.baseurl }}/docs/database) to set it up.

Transcoders are used by Libresonic to convert media from their on disk format to a format that can be consumed by clients. Use our docs to set up the [transcode binaries]({{ site.baseurl }}/docs/transcode).
