# ButterflyMoE Website Design

## Overview
- **Motion Style**: "Digital Fluidity" – Organic, liquid 3D transformations driven by mathematical precision.
- **Animation Intensity**: Ultra-Dynamic (WebGL/Three.js core)
- **Technology Stack**: React, Three.js (R3F), GLSL Shaders, GSAP ScrollTrigger, Lenis (Smooth Scroll)

## Brand Foundation
- **Colors**: 
  - **Primary Background**: #000000 (Deep Space Black)
  - **Secondary Background**: #0a0a0a, #111111
  - **Text**: #ffffff (White), #a0a0a0 (Gray)
  - **Accents**: #e0e0e0 (Light Gray), #333333 (Dark Gray)
  - **Glow**: rgba(255, 255, 255, 0.08)
- **Typography**: 
  - **Headings**: "Schibsted Grotesk" (Sans-serif)
  - **Body**: "Schibsted Grotesk"
  - **Accent**: "Inter"
- **Core Message**: Intelligent compression, organic structure, mathematical beauty.

## Global Motion System

### Animation Timing
- **Easing Library**: 
  - **Fluid**: `cubic-bezier(0.16, 1, 0.3, 1)` (The "Butterfly" Ease)
  - **Snap**: `cubic-bezier(0.87, 0, 0.13, 1)`
- **Duration Scale**: 
  - **Micro**: 0.4s (Hover)
  - **Macro**: 1.2s (Page Transitions)
  - **Ambient**: 15s+ (Continuous loops)

### Continuous Effects
- **"Digital Mist"**: A subtle, procedural noise shader overlay (opacity 0.03) that drifts across the entire viewport, creating a sense of atmospheric depth without obscuring content.
- **Cursor Physics**: A "repulsion field" effect where the cursor gently pushes nearby text elements (max 5px), creating a feeling of interaction with the medium.

### Scroll Engine
- **Lenis Smooth Scroll**: Damping value 0.1 for heavy, luxurious feel.
- **Velocity Distortion**: Content subtly skews/stretches vertically based on scroll speed (max skew: 2deg).

---

## Section 1: Hero ("The Void")

### Layout
**"Exploded 3D Grid"**
Instead of a flat 2-column grid, the content floats in a 3D void. The title and metrics are positioned on different Z-planes.
- **Center**: The "ButterflyMoE" title is massive, split into two layers ("Butterfly" and "MoE") that separate on scroll.
- **Orbit**: The three metric boxes orbit slowly around the title in 3D space.

### Content
- **Title**: "ButterflyMoE"
- **Subtitle**: "Sub-Linear Mixture of Experts"
- **Metrics**: 
  - "150× compression"
  - "Sub-linear MoE"
  - "Edge deployable"
- **Description**: "Standard MoE models scale memory linearly with expert count. ButterflyMoE breaks this barrier by re-parameterizing experts as geometric rotations of a shared, ternary-quantized substrate."

### Motion Choreography

#### Entrance Sequence
| Element | Animation | Values | Duration | Delay | Easing |
|---------|-----------|--------|----------|-------|--------|
| Title (Chars) | 3D Fly-in | z: -500 → 0, opacity: 0 → 1 | 1.2s | Stagger 0.02s | Fluid |
| Metrics | Orbit Entry | Scale: 0 → 1, RotateY: 180 → 0 | 1.0s | 0.8s | Back.out |
| Description | Decoder | Text scramble → Reveal | 1.5s | 1.2s | Steps(10) |

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Title "MoE" | Parallax Lift | Top | Bottom | y: -200px, z: 100px |
| Scroll | Metrics | Diverge | Top | Bottom | x: ±100px, opacity: 0 |

#### Continuous Animations
- **"Breathing"**: The entire container gently expands and contracts (scale 0.98 to 1.02) over 10s cycles.
- **Mouse Tilt**: The scene tilts slightly towards the mouse cursor (max 5deg).

### Advanced Effects
#### Shader Background
- **"Deep Field"**: A WebGL shader simulating a dense, dark starfield or particle network that reacts to mouse movement. Particles connect with thin lines when close to cursor.
- **Colors**: Pure white dots on black, connecting with ultra-thin (0.5px) white lines (opacity 0.2).

---

## Section 2: The Problem ("The Breakdown")

### Layout
**"Shattered Grid"**
The layout mimics the concept of fragmentation. The title is on the left. The comparison (Standard MoE vs ButterflyMoE) is visualized not as static columns, but as two massive blocks that collide and transform.

### Content
- **Title**: "The Problem"
- **Standard MoE**: "Each expert is a dense weight matrix. Memory scales as O(N · d²)."
- **ButterflyMoE**: "Experts are geometric rotations of a shared substrate. Memory scales as O(d² + N · d · log d)."

### Images
**Comparison Visuals**
- **Resolution**: High-res PNG
- **Visual Style**: Minimalist infographic (White/Light Gray on Black)
- **Subject**: Left side (Standard MoE) shows stacked rectangles increasing rapidly. Right side (ButterflyMoE) shows a single base with rotation arcs.

### Motion Choreography

#### Scroll Effects
| Trigger | Element | Effect | Start | End | Values |
|---------|---------|--------|-------|-----|--------|
| Scroll | Standard MoE Visual | Crumble/Disperse | Enter | Center | Particles drift apart |
| Scroll | ButterflyMoE Visual | Assemble/Coalesce | Center | Leave | Parts merge into structure |

#### Interaction Effects
- **Hover**: Hovering over the "Standard MoE" visual causes it to "glitch" or fragment further, emphasizing its inefficiency. Hovering "ButterflyMoE" solidifies its structure and brightens the glow.

---

## Section 3: The Insight ("The Orbit")

### Layout
**"Planetary System"**
A central, glowing core (the "Shared Substrate") sits in the middle. The "Expert Orbits" are text elements that rotate around it.

### Content
- **Title**: "The Core Insight"
- **Concept**: "Experts as geometric orbits"
- **Analogy**: "A single lens, rotated to see different spectra."

### Images
**Visual Metaphor**
- **Type**: PNG
- **Subject**: Central glowing matrix with three orbital paths around it.
- **Style**: Minimalist geometric illustration.

### Motion Choreography

#### Continuous Animations
- **Orbital Rotation**: The text elements "Expert 1", "Expert 2", "Expert N" physically orbit the central image in a 3D ellipse.
- **Core Pulse**: The central image pulses rhythmically (glow intensity 0.5 to 1.0).

#### Scroll Effects
- **Depth Zoom**: As the user scrolls, the camera "flies through" the orbit, transitioning to the next section.

---

## Section 4: How It Works ("The Mechanism")

### Layout
**"The Assembly Line"**
A sticky-scroll section. The left side holds the title and description. The right side is a "3D Stage" where the 4 steps of the process occur sequentially.

### Content
1. **Shared Ternary Substrate**
2. **Butterfly Rotations**
3. **On-the-Fly Synthesis**
4. **Gated Routing**

### Images
**Process Visuals (1-4)**
- **Type**: PNG
- **Subject**: Grid/Matrix visualizations and geometric shapes.
- **Style**: Dark gray background, light gray lines, white accents.

### Motion Choreography

#### Scroll Effects
- **Staging**: As the user scrolls, the visuals on the right don't just switch—they *transform*.
  - **Transition 1→2**: The ternary grid folds into a rotating butterfly shape (using CSS 3D transforms or shader displacement).
  - **Transition 2→3**: The butterfly shape dissolves into particles that reform as the synthesis visualization.
- **Text Sync**: The active text on the left lights up (color #fff) while others dim (#333).

### Advanced Effects
#### 3D Models
- **Interactive Matrix**: The "Ternary Substrate" is rendered as a 3D point cloud or grid of cubes (Three.js). The cubes representing "0" are sunken, "-1" and "+1" are raised and colored differently (e.g., blue/red or just light/dark).

---

## Section 5: Quantization ("The Wave")

### Layout
**"Interference Pattern"**
Split screen. Left side text, right side visual.

### Content
- **Title**: "Why Quantization Works Here"
- **Concept**: "Learned rotations suppress outliers."

### Images
**Quantization Visuals**
- **Type**: PNG
- **Subject**: Distribution plots (Before/After).
- **Style**: Minimalist line charts.

### Motion Choreography

#### Scroll Effects
- **Wave Distortion**: A GLSL shader applies a "water ripple" effect to the "Before" image. As you scroll, the ripples calm down, morphing the image into the "After" state, visually representing the stabilization.
- **Data Flow**: Animated lines draw themselves from left to right on the charts.

---

## Section 6: Memory Scaling ("The Curve")

### Layout
**"Infinite Canvas"**
The chart is not a small element; it is a massive, screen-width visualization that draws itself as you scroll.

### Content
- **Title**: "Memory Scaling"
- **Chart**: Standard MoE (Linear) vs ButterflyMoE (Sub-linear).

### Motion Choreography

#### Scroll Effects
- **Path Drawing**: The lines of the graph draw themselves exactly in sync with the scroll position.
- **Highlight**: When the ButterflyMoE line crosses a significant Y-axis marker (e.g., 1GB -> 5MB), a "burst" particle effect triggers at the intersection point.
- **Parallax Axis**: The Y-axis labels slide in from the left, and the X-axis labels slide up, creating a "crosshair" effect that frames the active data point.

---

## Section 7: Results ("The Impact")

### Layout
**"Kinetic Typography"**
The numbers are the heroes here. They are massive, filling the screen.

### Content
- **Metric**: "150× compression"
- **Metric**: "64 experts in 1.9 MB"

### Motion Choreography

#### Entrance Sequence
- **Slot Machine**: The numbers don't just fade in. They cycle rapidly (like a slot machine) before snapping to the final value.
- **Scale**: The numbers start at scale 1.5 (blurry) and snap to scale 1.0 (sharp) upon settling.

#### Interaction
- **Magnetic Pull**: Hovering over a number causes it to stick to the cursor and "magnify" slightly (scale 1.1).

---

## Section 8: Prior Work ("The Contrast")

### Layout
**"Refraction Grid"**
A table layout, but the rows are separated by 1px glass-morphism lines that refract the background.

### Content
- **Comparison Table**: Standard MoE, QMoE, MoQE, PuzzleMoE, MC, ButterflyMoE.

### Motion Choreography
- **Staggered Entry**: Rows slide in from the right, one by one, with a 100ms delay.
- **Focus**: Hovering a row dims all other rows to 30% opacity, creating instant focus.

---

## Section 9: Limitations ("The Honesty")

### Layout
**"Glass Panel"**
Text is contained within a frosted glass panel (backdrop-filter: blur(10px)) over a subtle, moving background.

### Content
- **Points**: Inference speed, Kernel support, Scale limits.

### Motion Choreography
- **Glass Shimmer**: A subtle light sheen moves diagonally across the glass panel every 10 seconds.

---

## Section 10: Takeaway ("The Horizon")

### Layout
**"The Final Look"**
Centered text, large and authoritative.

### Content
- **Message**: "Experts are not independent parameters. They are different views of shared capacity."

### Motion Choreography
- **Text Reveal**: The final sentence is revealed word-by-word, with a dramatic pause on "shared capacity".
- **Background**: The "Deep Field" shader from the Hero section returns, but now the particles are moving *towards* the viewer, creating a feeling of forward momentum and conclusion.

---

## Technical Implementation Notes

### Required Libraries
- **Three.js / React Three Fiber**: For the Hero background and 3D matrix visualizations.
- **GSAP (GreenSock)**: Core timeline management and ScrollTrigger.
- **Lenis**: Essential for the "heavy" smooth scroll feel.
- **Custom Shaders**: GLSL for the "Deep Field", "Water Ripple", and "Digital Mist" effects.

### Critical Performance Rules
- **WebGL**: Use a single canvas context for the background where possible, or use `scissor` testing for multiple views.
- **Text**: All large text must use `will-change: transform` during animations.
- **Shadows**: Avoid CSS box-shadows on moving elements; bake shadows into textures or use WebGL shadows if absolutely necessary.
- **Mobile**: Disable the "Deep Field" shader on mobile; fallback to a high-quality static image or simple CSS gradient.

### Browser Support
- **WebGL 2.0**: Required for advanced shaders.
- **Fallback**: If WebGL fails, fallback to the original static design (clean black/white).

---

## Output Path
`/mnt/okcomputer/output/design.md`
