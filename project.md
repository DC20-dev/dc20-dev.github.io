---
layout: projects

title: 
description: 
link: 

image: 
preview: 
preview-text: 

# https://material-foundation.github.io/material-theme-builder/ for the palette, just pass the relevant img!
primary: 
secondary: 
tertiary: 
---

<script>
  document.documentElement.style.setProperty('--primary-accent', "{{ page.primary }}");
  document.documentElement.style.setProperty('--secondary-accent',"{{ page.secondary }}");
  document.documentElement.style.setProperty('--tertiary-accent', "{{ page.tertiary }}");
</script>
