---
layout: projects

title: Ray Tracer
description: 
link: https://github.com/daxpress/rust_raytracer_series

image: /assets/images/RayTracer/RayTracer.png
preview: /assets/images/RayTracer/RayTracer.png
preview-icons: <iconify-icon icon="simple-icons:rust"></iconify-icon>

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#b6c8de"
secondary: "#ffb4ab"
tertiary: "#c1c7d0"
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}
