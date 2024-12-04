---
layout: projects

title: Chip8 Emulator
description: now that's a calculator!
link: https://github.com/daxpress/Chip8Emulator

image: "/assets/images/Chip8/Chip8.gif"
preview: "/assets/images/Chip8/Chip8.gif"
preview-icons: <iconify-icon icon="devicon-plain:cplusplus"></iconify-icon> <iconify-icon icon="devicon-plain:sdl"></iconify-icon> <iconify-icon icon="devicon-plain:cmake"></iconify-icon> <iconify-icon icon="file-icons:conan"></iconify-icon>

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#ffb0cc"
secondary: "#6f334c"
tertiary: "#e6d6d9"
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}
