---
layout: projects

title: Projects
description: 
link: 

image: 
preview: 
preview-text: 

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#ffbc97"
secondary: "#959270"
tertiary: "#ede0db"
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

Here’s a collection of projects I’ve enjoyed building, each with its own unique challenges and ideas.  

<div class="card-container"> 
{% for project in site.projects %}
{% if project.title=="Projects" %} {% continue %} {% endif %}

  {% include card.html url=project.url preview=project.preview %}

{% endfor %}
</div>
