---
layout: projects

title: Minimap Maker
description: tile-based map generator
link: https://github.com/daxpress/MinimapMaker

image: /assets/images/MinimapMaker/MinimapMaker.png
preview: /assets/images/MinimapMaker/MinimapMakerDay.gif
preview-icons: <iconify-icon icon="bi:unity"></iconify-icon> <iconify-icon icon="devicon-plain:csharp"></iconify-icon>

primary: "#88d9ca"
secondary: "#d6c0ff"
tertiary: "#ebfff9"

driveId: 1LpWrmge29oLtak2RXaC88svxFcIxd4nX/preview
---

{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

{% if page.link != null %}
{% include github-section.html url=page.link title=page.title preview=page.preview %}
{% endif %}

# Introduction

Minimap Maker is a Unity project that combines style, interactivity, and randomness to create an engaging showcase of procedural map generation. What started as an experiment in dynamic map creation quickly evolved into a vibrant tool for crafting visually captivating environments. Featuring a full day/night cycle, playful water animations, and global illumination, Minimap Maker is as fun to watch as it is to build upon.

Whether you're a developer seeking inspiration for your game or someone who appreciates intricate details in a map, Minimap Maker demonstrates the possibilities of procedural generation paired with creative artistry.

{% include googleDrivePlayer.html id=page.driveId %}

Features at a Glance

Random Map Generation: Every map created is unique, generated tile by tile, with a stylized aesthetic that makes each iteration distinct.
Dynamic Environments: Experience a full day/night cycle, complemented by random lighting and global illumination.
Visual Appeal: Playful water movement, dynamic toon shading, and atmospheric particles bring the maps to life.
Interactivity: Snap high-resolution screenshots of your favorite generated maps and explore the seamless transitions between lighting setups.
Map Generation: The Heart of Minimap Maker

The procedural map generator is the star of this project. At its core, it assembles maps by stitching together tiles, each chosen from a predefined set with randomized rotations and placements. This algorithm ensures that no two maps are ever the same while maintaining visual coherence.

(Insert code snippet showcasing your tile generation logic here.)

One key challenge was balancing randomness with aesthetic quality. By layering rules and constraints—such as ensuring water tiles connect smoothly or avoiding abrupt lighting transitions—Minimap Maker achieves a harmonious blend of unpredictability and design.

Stylized Materials: Bringing the Map to Life

The visual style of Minimap Maker is rooted in its carefully crafted materials. The toon shader provides a clean, vibrant look that enhances readability and charm. Water tiles, for example, employ a custom shader with subtle movement and reflections, simulating a living environment.

(Insert code snippet highlighting your shader implementation or material settings here.)

Particles add another layer of polish, creating effects like shimmering light during the day or glowing embers at night. These dynamic elements adapt seamlessly to the global illumination system, reinforcing the day/night cycle's immersive qualities.

Reflection

Minimap Maker isn't just a showcase of technical prowess; it's a testament to the joy of creating something visually delightful. Through its innovative use of procedural generation, stylized materials, and interactivity, this project demonstrates how programming and artistry can work hand in hand.

Want to see Minimap Maker in action? Check out the live demo or dive into the codebase here.