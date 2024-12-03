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

# What is it?

**Minimap Maker** is a Unity project that brings the art of **procedural generation** to life.
It takes simple noise textures and turns them into **vibrant, dynamic maps**, using clever
algorithms to place **houses**, **trees**, and other elements in just the right spots.

But **Minimap Maker** isn’t just about making maps — it’s about creating an experience.
With its **dynamic lighting**, **soothing day/night cycle**, and **playful water animations**,
it’s designed to be as **relaxing** to watch as it is impressive to create. It’s a perfect example
of how technical precision and artistic vision can come together to craft **something truly captivating**.

**Minimap Maker** started as an assignment from my teacher at **AIV**, but it quickly turned into something much more **personal**.
With each new lesson, I found ways to weave what I was learning into the project — like adding particles
when we covered them or **tweaking shaders** as I learned about them. It became a creative outlet where
I could bring everything together, turning a simple assignment into **a showcase of everything I’d picked up along the way**.  

{% include googleDrivePlayer.html id=page.driveId %}

# Features

* **Random Map Generation**: Every map created is **unique**, generated tile by tile,
with a stylized aesthetic that makes each iteration **distinct**.

* **Dynamic Environments**: Experience a full day/night cycle, complemented
by random lighting and global illumination.

* **Visual Appeal**: Playful water movement, realistic shading, and atmospheric particles **bring the maps to life**.

* **Interactivity**: Snap high-resolution screenshots of your **favorite** generated maps and enjoy the **incredible** sunrises and sunsets.

# Map Generation: The Heart of **Minimap Maker**

The **procedural map generator** is the star of this project.
At its core, it assembles maps by stitching together tiles, each chosen from a predefined set with
**randomized** rotations and placements. This algorithm ensures that **no two maps are
ever the same** while maintaining visual coherence.

The following is the code that generates a new **Height Map** for the map creation:
```cs
// Map contains:
// in R channel => HeightMap for the generation
// in G channel => House Spawn Probabilities
// in B channel => Tree Spawn Probabilities

currentMap = new Texture2D(MapSize, MapSize);
float randStartX = Random.Range(0, RandomizerMaxValue);
float randStartY = Random.Range(0, RandomizerMaxValue);
for (int y = 0; y < MapSize; y++)
{
	for (int x = 0; x < MapSize; x++)
	{
		float r = Mathf.PerlinNoise(
            (randStartX + x ) * DebugPerlinNoiseMultiplierSlider,
			(randStartY + y) * DebugPerlinNoiseMultiplierSlider);
		float g = r * DebugProbabilityMultiplier;
		float b = Random.Range(0f, 1f) <= TreesPercentage ? 1 : 0;
		Color unitInfo = new Color(r, g, b);
		currentMap.SetPixel(x, y, unitInfo);
	}
}
currentMap.Apply();
```

![HeightMap](/assets/images/MinimapMaker/map.png){:style="float:left; width: 25%; border-radius: 20px;
margin-bottom: 10px; margin-top:10px; margin-right: 20px; image-rendering: pixelated;"}

This is an example of a height map generated **using the code above!**  
The **red** channel clearly defines the overall layout of the map:
the **darkest** shades represent **water or sand**, while the **lightest** shades correspond to **hilltops** covered in yellow grass.
You can even spot *potential* locations for **trees** based on **blue-ish** pixels.  
The **green** channel, on the other hand, is less prominent at this stage since its values are still quite low.
This heightmap is then passed to the **map generator script**, which uses it to **update** the map and bring the terrain to life.

One key challenge was **balancing** randomness with aesthetic quality.
By layering rules and constraints — such as ensuring grass tiles smoothly transition
in color based on altitude or making sure houses are properly stacked using different block types —
**Minimap Maker** achieves a **harmonious** blend of unpredictability and design.  

# Smooth Map Transitions

![AnimMap](/assets/images/MinimapMaker/anim_map.png){:style="float:right; width: 30%; border-radius: 20px;
margin-bottom: 10px; margin-top:10px; margin-left: 20px;"}
One of the standout features of **Minimap Maker** is the seamless **transition** between maps.
This isn’t just a simple switch — the change map **animation** adds an extra layer of polish
by varying the transition **timing** based on a **grayscale texture**.

The texture acts as a **delay map**, with **darker** areas starting **faster** and **lighter** areas taking **longer**.
This creates a **ripple-like effect** that makes the map change feel more dynamic and visually engaging.
It’s a **small** touch, but it adds a **lot** of personality to the project and ensures that every
transition feels deliberate and **satisfying**.

![Changes](/assets/images/MinimapMaker/changes.gif){:style="border-radius: 20px;
margin-bottom: 10px; margin-top:10px; margin-right: 20px;"}

# Simple Yet Effective: The Top Slab Shader

The top slab shader in **Minimap Maker** is deceptively **simple** but adds a lot of **charm** to the maps.
It uses a **sine** function combined with **scaled time** and a variable time **offset** to create smooth
and unique oscillations, which drive both the **movement** and the **color transitions** of water tiles.

![HeightMap](/assets/images/MinimapMaker/water.gif){:style="float:left; width: 25%; border-radius: 20px;
margin-bottom: 10px; margin-top:10px; margin-right: 20px; image-rendering: pixelated;"}

For water tiles, the shader **interpolates** between a **shallow** water color and a **deeper** shade,
creating a **dynamic** look that’s always changing.  
Non-water tiles, on the other hand,
simply use the colors assigned by the script - either an interpolated value between
green grass and yellow grass or sand -, keeping the **focus** on the **lively water** elements.

This straightforward approach proves that sometimes, **less is more**.
A touch of motion and color variation goes a long way in making the maps feel **alive and engaging**.

# A Personal Journey

**Minimap Maker** means a lot to me because it was my **very first** Unity project.
I started working on it during the long, **isolating days** of COVID, stuck in
my bedroom with little else to do. Over time, it became more than
a project — it became **a little escape**.

Even now, when I’m feeling low, I like to open it up and watch the maps come to life.
There’s something so calming about the animations and the way everything flows together.
It’s a reminder that **even in tough times**, we can create something **meaningful** and **find** moments of **joy**.
