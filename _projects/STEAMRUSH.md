---
layout: projects

title: STEAMRUSH
description: 
link: https://store.steampowered.com/app/2647100/STEAMRUSH/

image: /assets/images/STEAMRUSH/STEAMRUSH.ico
preview: https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2647100/header.jpg?t=1708539139
preview-icons: <iconify-icon icon="mdi:hot"></iconify-icon> <iconify-icon icon="bi:steam"></iconify-icon> <iconify-icon icon="file-icons:unrealscript"></iconify-icon> <iconify-icon icon="devicon-plain:cplusplus"></iconify-icon>

primary: "#ED6D1D"
secondary: "#ffbab1"
tertiary: "#f5ded4"

youtubeId: ZHLuOokWeKg
---
<script src="https://www.steamwidgets.net/api/resource/query?type=js&module=STEAM_WIDGETS_MODULE&version=v1"></script>
{% include colorizer.html primary=page.primary secondary=page.secondary tertiary=page.tertiary %}

<iframe src="https://store.steampowered.com/widget/2647100/" frameborder="0" width="100%" height="190"></iframe>

# About The Game

**STEAMRUSH** is a **third-person boss rush** with high-paced
melee combat and **steampunk** aesthetics.  
The player will face **three different bosses**,
each one with **different combat mechanics**,
alternating with **exploration** sections
between the fights, revealing the world’s
**narrative** through hidden props.

The game is part of the **Big Ones**, an initiative of
 <a href="https://www.aiv01.it/" target="_blank">**AIV - Accademia Italiana Videogiochi**</a>
aimed at adding a production experience to the teaching carried out in the various courses,
 from the creation of the game concept to commercial publishing.

**STEAMRUSH** is the First Big One to ever be published on Steam and is still the **best performer**,
with **over 10K downloads** reaching players **worldwide**. Its unique blend of steampunk aesthetics
and fast-paced gameplay **captured the attention of a diverse audience**, cementing its place as
a standout title in our catalog. The game's success showcased its **broad appeal** and proved
the power of a well-executed creative vision.

{% include youtubePlayer.html id=page.youtubeId %}

# Contributions

## Overview

- Implemented the entire **user interface**, making it both functional and visually engaging.
- Programmed **AI**, including **Lady Elizabeth** (third boss), which turned out to be **the most fun to play against.**
- **Collaborated** with the team to develop and refine **combat systems** and **core gameplay features**, ensuring **responsive** and exciting mechanics.
- Handled **animation programming**, bringing characters and environments to life with **fluid movement**.
- Built custom tools to optimize the game, **improving performance** and ensuring **smooth gameplay** across setups.
- Worked on **material** optimization and creation to balance **visual quality and performance**.
- Integrated **third-party technologies** like the **SteamWorks API** and **Nvidia’s DLSS**, enhancing functionality and **modern** features.

## Custom Spacial Asset Loading

Of all the cool systems I implemented for **STEAMRUSH**, one stands out as a real **game-changer**:
the custom tool for loading and unloading parts of the map on demand, including entire Blueprints.
This system was **critical** for **managing the heavy resource consumption** caused by Unreal Engine 5’s
Nanite and Lumen technologies, especially given the **complex, vertical nature** of the level design.  
![VolumeLoader](/assets/images/STEAMRUSH/StreamVolume.png){:style="float:right; width: 50%; border-radius: 20px; margin: 20px; margin-right: 0px;"}  

In a graphically demanding game, keeping **VRAM usage under control** is essential—but **Nanite** and **Lumen**,
while amazing, can eat up memory **fast**. Unreal Engine’s **World Partition** streaming system wasn’t a fit for us,
as it’s designed for open worlds and works only in 2D space, ignoring verticality entirely.
That didn’t work for **STEAMRUSH**, where verticality is a core part of the design.  

To solve this, I implemented a **Data Layer-Based Asset Streaming Tool**.
Using **Data Layers** — a relatively new addition to UE5 — I wrote **custom classes and components** that allowed us
to dynamically **load** and **unload** assets based on the **player’s location** and what was **visible from there**.  
This solution not only **improved performance** but also brought several **other benefits**.
![DataLayers](/assets/images/STEAMRUSH/DataLayers.png){:style="float:left; width: 50%; border-radius: 20px; margin: 20px; margin-left: 0px;"}

This system allowed us to use large, memory-intensive **MegaScans** meshes while **keeping them in VRAM only when necessary**.
This was crucial because Lumen relies on a significant amount of memory for its dynamic global illumination and reflections
By **freeing up VRAM** through smart asset streaming, we could **fully take advantage** of Nanite’s
**detailed geometry** and Lumen’s **advanced lighting** technology **without compromising performance**.

With this system in place, the game ran **much smoother**, and **collaboration became easier**.
Assets were now organized and recognizable by location, making them **simple to manage**.
Even better, since Data Layers work both at runtime and in the editor, the team could activate
only the layers they needed, **significantly improving editor performance** and **speeding up workflow
iterations** for everyone.

This tool became a **cornerstone** of our development process, ensuring that **STEAMRUSH**
looked and played great without compromising on efficiency or creativity.  

### This is what happens when we use the elevator: notice how the scene changes?  

That’s the tool in action! In this case, as the elevator moves, it crosses several volumes that are set to unload assets from the top level while loading detailed Data Layers in the Scrap Knight Arena, and vice versa, depending on whether the elevator is ascending or descending.

![Demo](/assets/images/STEAMRUSH/DataLayerUnloadDemo.gif){:style="width: 100%; border-radius: 20px; margin: 20px; margin-left: 0px;"}

# Looking Back...

...at the journey of creating **STEAMRUSH**, it feels like flipping through a
cherished photo album filled with **challenges**, breakthroughs, and **unforgettable moments**.
What started as a spark of an idea grew into something that not only tested our technical
limits but also **deepened our love for the art of game development**.

The development process was as much about discovery as it was about discipline.
From the first brainstorming sessions, where the concept of high-speed mechanics and
steampunk aesthetics collided in the best way possible, to the **countless hours** spent
**perfecting** the balance between fluid gameplay and immersive visuals,
every step taught us something new.

There were late nights **debugging**, animated debates over features that deserved a place in the final cut,
and those magical moments when something clicked—the satisfaction of a level
coming to life or a mechanic **feeling just right**.
It wasn't just a game taking shape; it was a shared passion, a piece of our creativity coming alive.

Most importantly, **STEAMRUSH** was a **success** in more than one way.
It reminded us why we got into game development in the first place:
to create worlds that resonate with players and bring **something unique** to the gaming landscape.
The **overall positive feedback** from our community cemented that effort,
proving the long hours and iterations were **more than worth it**.

**STEAMRUSH** isn't just a title in our portfolio;
it’s a testament to what happens when dedication, collaboration, and a bit of bold creativity combine.
