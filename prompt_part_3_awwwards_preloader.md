# MISSION OBJECTIVE: THE AWWWARDS PRELOADER
You are a Lead Creative Developer at a world-class digital agency (think Aristide Benoist, Locomotive, or MediaMonks). I have an existing React/Next.js 15 portfolio. It currently has a basic Preloader component (`src/components/Preloader.tsx`). 

**YOUR MISSION:** Completely delete the existing implementation of `Preloader.tsx` and architect something astronomically better. I want an ultra-premium, mind-blowing, brutalist yet elegant loading sequence that instantly screams "Awwwards Site of the Month" and looks INSANE on both desktop and mobile.

# STRICT ARCHITECTURAL CONSTRAINTS
- The portfolio uses a dual-theme ("Champagne & Slate" / "Obsidian Night") with `Playfair Display` (serif) and `Inter` (sans-serif). You MUST respect these fonts and colors.
- Use `framer-motion` for DOM choreography.
- Introduce actual WebGL/Canvas (`@react-three/fiber` / `three.js` or pure Canvas 2D) for a jaw-dropping background displacement / noise / fluid effect during the loading state. 
- **CRITICAL COLOR UPGRADE:** Do NOT make the loader monochromatic. Inject an insane, vibrant gradient or fluid color palette (e.g., deep amber/gold #d4a853 bleeding into visceral teals or purples) inside the canvas or text masking.
- **MOBILE PERFECTION:** The layout and typography scaling MUST be flawless on mobile screens (iPhone sizes). The massive numbers and text must adapt beautifully without breaking.
- Do NOT use standard linear or ease-in-out animations. Every single motion must use custom cubic-bezier curves (e.g., `[0.76, 0, 0.24, 1]` or `[0.87, 0, 0.13, 1]`) to create extreme snappy, high-tension physics.

# THE CHOREOGRAPHY (Must be implemented EXACTLY like this)

## Phase 1: The Monolithic Entry (0ms - 500ms)
- The screen starts pitch black (or pure background color based on theme).
- An immense, oversized typography element displaying the name "Oskar Tariška" (Playfair Display) is revealed via a highly aggressive clipping mask (`overflow: hidden`). 
- **CRITICAL:** The text must not just fade in. It must slide up from an invisible baseline, letter-by-letter, with an extreme stagger, while slightly rotating on the X-axis (3D perspective reveal). 
- Underneath, an impossibly thin (1px) progress track appears, stretching from 0vw to 100vw.

## Phase 2: The Tension Build (500ms - 2500ms)
- The loading counter (0 to 100) must be massive, sitting behind the name like a ghost watermark (opacity 0.05, stroke only, or blend-mode difference). Ensure it fits on mobile!
- **The Algorithm:** The counter must NOT count linearly. It must burst to 38% almost instantly, crawl agonizingly slowly to 87% (building psychological tension), pause completely for 200ms, and then violently snap to 100%.
- **The Visuals (COLOR & GL Studio):** While the tension builds, the underlying WebGL Canvas (or sophisticated CSS filter) should intensity. Create an insane colorful fluid distortion, noise grain that gets rougher, or chromatic aberration that splits the RGB channels of the text as the counter gets stuck at 87%.

## Phase 3: The Climax & Snap (2500ms - 2700ms)
- The exact millisecond the counter hits 100, the tension breaks. 
- The progression line flashes pure white/gold and collapses into the center at light speed.
- The massive 100 number distorts and shatters or smoothly dissipates into abstract colorful smoke/particles (Canvas) or aggressively scales up into nothingness (DOM).

## Phase 4: The 3D Curtain Exit (2700ms+)
- Do NOT just fade out. The transition from the preloader to the homepage must be a multi-layered exit.
- Example: The screen splits into 3 or 4 horizontal blocks that slide out to the left/right at different staggered speeds with extreme cubic-bezier easing, OR an SVG `<path>` morphs from a flat rectangle into a deep, steep curve that pulls the black screen upwards like a velvet curtain, revealing the `Hero.tsx` content already placed perfectly underneath.

# YOUR INSTRUCTIONS
1. Delete the current code of `src/components/Preloader.tsx` in your mind.
2. Provide exact package installation commands if you add Three.js or SVG math libraries.
3. Write the complete, self-contained `src/components/Preloader.tsx` code. 
4. Include all Framer Motion `Variants`, SVG paths for morphing (if used), and Canvas logic directly in the component. Ensure it strictly unmounts via `AnimatePresence` to free up GPU memory.
5. Provide the exact code. Make it the most mathematically beautiful, insanely colored, and mobile-optimized loading sequence you have ever written.
