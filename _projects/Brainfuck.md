---
layout: projects

title: Brainf**k Interpreter
description: When hell is not enough
link: https://github.com/daxpress/brainfuck_in_python

image: "/assets/images/Brainfuck/snippet.png"
preview: "/assets/images/Brainfuck/snippet.png"
preview-icons: <iconify-icon icon="devicon-plain:python"></iconify-icon> <iconify-icon icon="file-icons:brainfuck"></iconify-icon> 

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: "#ffb4a6"
secondary: "#fae0a6"
tertiary: "#e7bdb5"

youtubeId: hdHjjBS4cs8
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}

For who doesn't know what Brainfuck is, whatch this quick video to have an idea first 😉

{% include youtubePlayer.html id=page.youtubeId %}
