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

Hi, I'm a game programmer who loves turning ideas into fun, interactive experiences.
I enjoy diving into the details of gameplay, AI, and mechanics to make games that feel great to play.
Problem-solving and learning new tech are what keep me excited, and I’m always up for a challenge.
Whether it’s working solo or collaborating with a team, my goal is to create games that people can get lost in and enjoy.

# Projects {% if site.projects.size > 7 %} <a class="icon-link" href="./projects/Projects.html"><iconify-icon icon="iconamoon:arrow-right-6-circle-fill"></iconify-icon></a> {% endif %}

<div class="card-container"> 
{% for project in site.projects limit:6 %}
{% if project.title=="Projects" %} {% continue %} {% endif %}

  {% include card.html url=project.url preview=project.preview %}

{% endfor %}
</div>

{% if site.posts.size > 0 %}

{% endif %}

# My Technical Arsenal

Here’s a quick look at all the areas I’ve dived into and the tools I’ve used along the way.

### Programming Languages & Build Systems <iconify-icon icon="mdi:code-braces-box"></iconify-icon>

<div style="font-size: 50px">
  <iconify-icon icon="devicon-plain:cplusplus"></iconify-icon> <iconify-icon icon="devicon-plain:c"></iconify-icon> 
  <iconify-icon   icon="devicon-plain:csharp"> </iconify-icon> <iconify-icon icon="devicon-plain:python"></iconify-icon> 
  <iconify-icon  icon="simple-icons:rust"></iconify-icon> <iconify-icon icon="devicon-plain:lua"></iconify-icon> 
  <iconify-icon icon="devicon-plain:cmake"></iconify-icon> <iconify-icon icon="file-icons:conan"></iconify-icon> HLSL GLSL
</div>

### Game Development <iconify-icon icon="mingcute:game-2-fill"></iconify-icon>

<div style="font-size: 50px">
  <iconify-icon icon="simple-icons:unrealengine"></iconify-icon> <iconify-icon icon="devicon-plain:unity-wordmark"></iconify-icon>
   <iconify-icon icon="devicon-plain:opengl"></iconify-icon> <iconify-icon icon="simple-icons:vulkan"></iconify-icon> <iconify-icon icon="devicon-plain:sdl"></iconify-icon>
</div>

### Version Control, Collaboration & Tools <iconify-icon icon="carbon:collaborate"></iconify-icon>

<div style="font-size: 50px">
  <iconify-icon icon="devicon-plain:git"></iconify-icon> <iconify-icon icon="cib:github"></iconify-icon> 
  <iconify-icon icon="devicon-plain:trello"></iconify-icon>   <iconify-icon icon="devicon-plain:visualstudio"></iconify-icon> 
  <iconify-icon icon="devicon-plain:vscode"></iconify-icon> <iconify-icon icon="devicon-plain:clion"></iconify-icon> 
  <iconify-icon icon="devicon-plain:rider"></iconify-icon> <iconify-icon icon="simple-icons:canva"></iconify-icon>
</div>

### Web Development (For This Website) <iconify-icon icon="mdi:web"></iconify-icon>

<div style="font-size: 50px">
  <iconify-icon icon="devicon-plain:jekyll"></iconify-icon> <iconify-icon icon="devicon-plain:html5-wordmark"></iconify-icon> 
  <iconify-icon icon="devicon-plain:css3"></iconify-icon> <iconify-icon icon="devicon-plain:javascript"></iconify-icon>
  <iconify-icon icon="ion:logo-markdown"></iconify-icon>
</div>
