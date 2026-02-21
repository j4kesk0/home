# TASK CONTEXT & OBJECTIVE
You are receiving a deeply optimized, high-end React/Next.js 15 portfolio website built with Tailwind CSS v4 and Framer Motion. The current design is already S-tier (it features Lenis smooth scrolling, `next/image` optimization, a custom Framer Motion cursor, and infinite Testimonials marquee).

**Your goal is to push this portfolio into the "Awwwards Site of the Day" / "FWA" category** by implementing 5 micro-interaction and architectural enhancements.

# STRICT CONSTRAINTS & REQUIREMENTS
You must implement the following 5 upgrades **WITHOUT altering the existing visual identity, copy, colors, or core layout structure**. The design language (Inter + Playfair Display, "Champagne & Slate" / "Obsidian Night" dual-theme) MUST remain exactly as it is. You are strictly adding advanced motion, 3D interaction, and routing polish.

## 1. Seamless Page Transitions (AnimatePresence)
- Implement Framer Motion's `<AnimatePresence mode="wait">` across the Next.js App Router layout (`template.tsx` or similar approach) so that navigating between the home page (`/`) and the case study page (`/projekty/radovan-tariska`) does not reload or flash the screen.
- The transition should be an elegant "fade-through-black" or a sophisticated mask sliding effect, keeping the UX uninterrupted.

## 2. Advanced Typography Revealing (Split Text Animation)
- Refactor the main headers (specifically the `<h1 className="font-[var(--font-playfair)]">` in `Hero.tsx` and `SectionHeading.tsx`) to not just fade in as a whole block.
- Create a `SplitTextReveal` component that splits the text into words/characters and animates them individually (e.g., using `staggerChildren` and a clipping mask `overflow: hidden` to make words slide up smoothly from a baseline).

## 3. Sophisticated Loader (Initial Entry Animation)
- Create an entry preloader component that masks the screen upon initial hard refresh until fonts and critical scripts are ready.
- It should show a minimalist loading percentage (0 to 100%) or a simple elegant logo/text fade, followed by a buttery-smooth "curtain opening" effect (e.g., sliding up and out of the viewport) that triggers the `Hero.tsx` animations.

## 4. WebGL / Canvas Background (Very Subtle)
- Replace the static CSS blur circles in the background of `Hero.tsx` with a highly optimized, extremely subtle WebGL canvas layer (using `three.js` + `@react-three/fiber` OR a pure canvas fluid/noise shader).
- It must be minimal (e.g., low opacity fluid smoke, or reactive grain particles) that faintly reacts to the user's cursor position without distracting from the content. It must respect both Light and Dark themes.

## 5. 3D Tilt & Magnetic Parallax on Projects
- Upgrade the `FlagshipProject.tsx` and `TestimonialCard` elements with a 3D Tilt effect.
- Using Framer Motion's `useMouse` and `useTransform` (or a library like `react-parallax-tilt`), make the main project image and testimonial cards subtly tilt on their X and Y axes according to the mouse position.
- Ensure the image inside the frame has a slight reverse parallax (moving slightly opposite to the frame) to create extreme depth.

# EXECUTION INSTRUCTIONS
1. Briefly analyze how these state-heavy animations map onto Next.js 15 Server Components vs Client Components.
2. Provide exact package installation commands (e.g., `npm i three @react-three/fiber`).
3. Provide the specific file modifications (full file rewrites strongly preferred for complex Framer Motion logic) to implement these 5 points flawlessly. 
4. Pay extreme attention to the performance: ensure the WebGL canvas unmounts or pauses when out of viewport.
