---
layout: page
title: Screenshots
permalink: /screenshots/
---

## Screenshots

<div id="screenshots">
    {% for image in site.static_files %}
        {% if image.path contains '/img/screenshots' %}
        <h5>{{ image.name | remove:'.png' | remove_first:'_' | replace: '_', ' ' | remove:'1' | remove:'2' | remove:'3' | remove:'4' | remove:'5' | remove:'6' | remove:'7' | remove:'8' | remove:'9' | remove:'0' | capitalize }}</h5>
        <a data-fancybox="gallery"  data-caption="{{ image.name | remove:'.png' | remove_first:'_' | replace: '_', ' ' | remove:'1' | remove:'2' | remove:'3' | remove:'4' | remove:'5' | remove:'6' | remove:'7' | remove:'8' | remove:'9' | remove:'0' | capitalize }}" href="{{ image.path }}">
            <img class="thumbnail" src="{{ image.path }}" alt="">
        </a>
        {% endif %}
    {% endfor %}
</div>
