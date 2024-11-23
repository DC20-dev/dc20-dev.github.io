---
layout: default

image: /assets/images/Headshot.jpg

primary: "#ffbc97"
secondary: "#959270"
tertiary: "#ede0db"
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}


# 🏗️ The website is still a Work in Progress! 🏗️

# About Me

I’m a game developer passionate about creating immersive experiences. I love diving into every aspect of game development, from coding to gameplay mechanics, and constantly experimenting with new ideas to bring games to life.

# Projects

<div class="card-container">
{% for project in site.projects %}
  <div class="card">
    <a href="{{ project.url }}" style="text-decoration: none !important">
      <img src="{{ project.preview }}" alt="" onerror="this.style.display='none'">
      <div class="card-info"><p class="card-title">{{ project.title }}</p><p class="card-text">{{ project.preview-icons }}</p></div>
    </a>
  </div>

{% endfor %}
</div>
