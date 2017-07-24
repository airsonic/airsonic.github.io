---
layout: page
title: Download
permalink: /download/
---
## Download

<table class="full-width">
  <tbody>
    <tr>
      <td><i class="fa fa-coffee fa-fw"></i> WAR version (all&nbsp;platforms)</td>
      <td><a href="{{ site.repo }}/download/v{{ site.stable_version }}/airsonic-v{{ site.stable_version }}.war" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/war/">Instructions</a></td>
    </tr>
    <tr>
      <td><i class="fa fa-archive fa-fw"></i> Stand-alone version (all&nbsp;platforms)</td>
      <td><a href="{{ site.repo }}/download/v{{ site.stable_version }}/airsonic-v{{ site.stable_version }}.war" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/war-standalone/">Instructions</a></td>
    </tr>

{% comment %} Build targets not suported yet

    <tr>
      <td><i class="fa fa-linux fa-fw"></i> Debian / Ubuntu</td>
      <td><a href="{{ site.repo }}/download/v{{ site.stable_version }}/airsonic-v{{ site.stable_version }}.deb" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/deb/">Instructions</a></td>
    </tr>
    <tr>
      <td><i class="fa fa-linux fa-fw"></i> Red Hat / Fedora</td>
      <td><a href="{{ site.repo }}/download/v{{ site.stable_version }}/airsonic-v{{ site.stable_version }}.rpm" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/rpm/">Instructions</a></td>
    </tr>
    <tr>
      <td><i class="fa fa-windows fa-fw"></i> Windows</td>
      <td><a href="{{ site.repo }}/download/v{{ site.stable_version }}/airsonic-v{{ site.stable_version }}.exe" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/exe/">Instructions</a></td>
    </tr>
    <tr>
      <td><i class="fa fa-apple fa-fw"></i> MacOS</td>
      <td><a href="{{ site.repo }}/download/v{{ site.stable_version }}/airsonic-v{{ site.stable_version }}.pkg" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/pkg/">Instructions</a></td>
    </tr>

{% endcomment %}

    <tr>
      <td><i class="fa fa-code fa-fw"></i> Source code</td>
      <td><a href="https://github.com/airsonic/airsonic/archive/v{{ site.stable_version }}.zip" class="button button-primary"><i class="fa fa-download fa-fw"></i> Download {{ site.stable_version }}</a></td>
      <td><a class="button" href="/docs/install/source/">Instructions</a></td>
    </tr>
  </tbody>
</table>

##### Changelog

Airsonic changelog can be found [here](https://github.com/airsonic/airsonic/blob/master/CHANGELOG.md).

##### Beta versions

To download beta versions please use the [airsonic repository]({{ site.repo }}) or directly [download latest beta war file]({{ site.repo }}).

<script type="text/javascript">
    $(document).ready(function () {
        GetLatestReleaseInfo();
    });

    function GetLatestReleaseInfo() {
        $.getJSON("https://api.github.com/repos/airsonic/airsonic/releases/latest").done(function (release) {
            var asset = release.assets[0];
            var downloadCount = 0;
            for (var i = 0; i < release.assets.length; i++) {
                downloadCount += release.assets[i].download_count;
            }
            var oneHour = 60 * 60 * 1000;
            var oneDay = 24 * oneHour;
            var dateDiff = new Date() - new Date(asset.updated_at);
            var timeAgo;
            if (dateDiff < oneDay)
            {
                timeAgo = (dateDiff / oneHour).toFixed(1) + " hours ago";
            }
            else
            {
                timeAgo = (dateDiff / oneDay).toFixed(1) + " days ago";
            }
            var releaseInfo = release.name + " was updated " + timeAgo + " and downloaded " + downloadCount.toLocaleString() + " times.";
            $(".sharex-download").attr("href", asset.browser_download_url);
            $(".release-info").text(releaseInfo);
            $(".release-info").fadeIn("slow");
        });
    }
</script>

{% for repository in site.github.public_repositories %}
  * [{{ repository.name }}]({{ repository.html_url }})
{% endfor %}

#### Terms of use

This program is distributed in the hope that it will be useful, but **without and warranty**; without even the implied warranty of **merchant ability** or **fitness for a particular purpose**. See the [GNU General Public License](http://www.gnu.org/copyleft/gpl.html) for more details.
