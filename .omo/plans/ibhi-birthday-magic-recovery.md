# ibhi-birthday-magic-recovery - Work Plan

## TL;DR (For humans)
**What you'll get:** The existing ibhi birthday website transformed from clean-but-sterile into a joyful, magical celebration. Three signature moments (cinematic hero opening, 19 portal transition, photo developing), ambient sparkle system, vinyl music player, playful surprises, and birthday energy — all while preserving every factual/content rule, the 5 real photos, the friendship message, and the cream/gold editorial design.

**Why this approach:** The site was correctly stripped of fabricated content but lost its personality in the process. Rather than a full rewrite, this adds a controlled magic layer — Framer Motion animations, SVG sparkles, Canvas confetti, custom cursor, section transitions, and micro-surprises — on top of the existing clean foundation. Each section gets its own personality without breaking the unified design system.

**What it will NOT do:** Add fabricated memories or romantic content. Undo the factual cleanup. Add hearts, pink/red palettes, emoji stars, Three.js, scroll hijacking, autoplay audio, or continuous confetti.

**Effort:** Medium-Large | **Risk:** Low — well-scoped, preserves existing structure, all assets exist

**Decisions to sanity-check:** Framer Motion over GSAP. SVG ambient sparkles + Canvas confetti. Photo lightbox viewer. No sound cues in v1.

## Scope
### Must have
- Cinematic hero opening sequence (darkness → gold points → aperture line → photo reveal → titles → ENTER with particle burst)
- Framer Motion animation system replacing manual IntersectionObserver scroll-reveal
- Ambient SVG sparkle system (4 styles: ✦ four-point star, tiny dot, small diamond, gold spec)
- Canvas-based confetti system (3 intensities, gold/champagne palette, rectangles/stars/streamers)
- Five Frames: sticky scroll photo experience with 5 unique reveals (aperture, paper-unfold, blur→focus, Polaroid land, exposure)
- Photo lightbox viewer (fullscreen, prev/next, keyboard Esc/Arrows, touch swipe)
- "19" signature portal transition (scroll-driven scale 20vw→80vw, clip-path mask reveals next section)
- ON REPEAT: vinyl music player (spinning record, tonearm animation, seek progress, play/pause)
- Birthday Playground: redesigned scratch card, photo developer (Random Frame), confetti button
- Custom cursor (desktop only): gold/charcoal dot + ring, contextual labels on interactive elements
- Section transitions with distinct personalities (Hero→Five Frames: aperture, Five Frames→Ibhi File: paper, Ibhi File→19: typographic, 19→Music: circular, Music→Playground: rhythm, Playground→Message: confetti settles to paper, Message→Footer: light)
- 5-8 micro-surprises (nav dot twinkle, sparkle on dividers, photo tilt, progress dot glow, button label change, envelope seal ring)
- Handwritten-style annotations (3-4 moments: "frame 03", "play this ↑", "open me", "19!")
- Playful copy (3-4 moments: "I could've just sent a text.", "Anyway...", "Click it. Obviously.", "Still here?")
- Hidden 19-click easter egg in finale
- End-of-page "Still here?" detail with replay
- Mobile: all effects simplified but present (reduced particles, no parallax, no cursor, touch-friendly)
- prefers-reduced-motion: all animations gated, instant reveal fallback
- Performance: particle pooling, offscreen pause, CSS transforms/opacity only for animations

### Must NOT have (guardrails, anti-slop, scope boundaries)
- No fabricated memories, stories, dates, locations, events, captions
- No romantic phrasing: soulmate, destiny, universe, forever, "my person", "I love you"
- No heart shapes, heart imagery, heart particles
- No pink/red romantic palettes or balloons
- No Three.js, WebGL, shader systems
- No scroll hijacking, aggressive snapping, forced scroll positions
- No autoplay audio
- No fake loading percentages
- No ⭐ emoji stars (use custom SVG sparkles)
- No photo duplication or fake image variations
- No AI-generated sentimental filler text
- No GSAP dependency (use Framer Motion)
- No permanent cursor trail
- No continuous confetti rain
- No rainbow gradients or excessive glitter
- No emoji spam

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- **Test decision:** Visual and functional verification via `npm run build` + `npm run dev` browser inspection
- **Evidence:** .omo/evidence/task-<N>-ibhi-birthday-magic-recovery.md

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave.

**Wave 1 (Foundation + Dependencies):** Todos 1-5
**Wave 2 (Hero Cinematic Opening):** Todos 6-8
**Wave 3 (Magic Layer + Cursor):** Todos 9-12
**Wave 4 (Five Frames + Lightbox):** Todos 13-16
**Wave 5 (19 Transition + Vinyl):** Todos 17-20
**Wave 6 (Playground + Confetti):** Todos 21-24
**Wave 7 (Details + Polish):** Todos 25-30
**Wave 8 (Final Build + Review):** Todos 31-33

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1 (install framer-motion) | none | 3+ | 2 |
| 2 (update design tokens) | none | 3+ | 1 |
| 3 (App.tsx restructure) | 1, 2 | 4+ | none |
| 4 (Framer Motion scroll system) | 1, 2 | 6+ | 3 |
| 5 (remove old effects) | none | 3 | 1, 2 |
| 6 (hero cinematic) | 3, 4 | 8 | 7 |
| 7 (hero CSS) | 6 | 9+ | 8 |
| 8 (ENTER→scroll transition) | 6, 7 | 13 | none |
| 9 (SVG sparkle system) | 7 | 10+ | 8 |
| 10 (ambient background life) | 7 | 11+ | 9 |
| 11 (Canvas confetti system) | 7 | 12+ | 9, 10 |
| 12 (custom cursor) | 9 | 18 | 10, 11 |
| 13 (Five Frames sticky scroll) | 4, 8 | 15 | 14 |
| 14 (photo lightbox viewer) | 4 | 15 | 13 |
| 15 (frame unique reveals) | 13, 14 | 17 | none |
| 16 (photo viewer integration) | 14, 15 | none | none |
| 17 (19 portal transition) | 4 | 19 | 18 |
| 18 (vinyl music player) | 4 | 19 | 17 |
| 19 (section wiring) | 17, 18 | 21 | none |
| 20 (vinyl tonearm + seek) | 18 | none | 19 |
| 21 (playground enhancements) | 4 | 23 | 22 |
| 22 (random frame developer) | 4 | 23 | 21 |
| 23 (confetti integration) | 11, 21, 22 | 25 | none |
| 24 (scratch card redesign) | 4 | none | 21 |
| 25 (message envelope feel) | 4 | 27 | 26 |
| 26 (playful copy + annotations) | 4 | 27 | 25 |
| 27 (section transitions) | 19, 25 | 29 | 26 |
| 28 (micro-surprises) | 25, 26 | 29 | 27 |
| 29 (easter egg + still here) | 4 | 30 | 27, 28 |
| 30 (scroll surprises) | 19 | 31 | 29 |
| 31 (mobile magic pass) | 30 | 32 | none |
| 32 (reduced-motion + a11y) | 30 | 33 | 31 |
| 33 (final build + verify) | 31, 32 | F1-F4 | none |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE - never rewrite the headers above. -->

### WAVE 1 — Foundation + Dependencies

- [x] 1. Install framer-motion and remove unused deps
  What to do / Must NOT do: Run `npm install framer-motion@^12.0.0`. Pin to v12+ which has React 19 support. Check package.json for unused dependencies: gsap, swiper, @studio-freight/lenis, react-icons — if present, `npm uninstall` them. Do NOT remove react or react-dom. Do NOT remove tailwindcss or vite plugins. Do NOT install any other animation library. Verify framer-motion version is compatible with React 19.2 and TypeScript 7 before committing.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 3, 4
  References: /home/dinusus/ibhi-birthday-website-v2/package.json
  Acceptance criteria: `node -e "require('framer-motion')"` succeeds. `npm run build` exits 0.
  QA scenarios: happy - framer-motion importable, build succeeds. failure - version conflict (roll back). Evidence .omo/evidence/task-1-ibhi-birthday-magic-recovery.md
  Commit: Y | chore(deps): install framer-motion, remove unused animation libs

- [x] 2. Update design tokens for richer gold palette
  What to do / Must NOT do: Update src/index.css :root with: `--gold: #C8A46B` (richer), `--gold-light: #E0C99A`, `--gold-dark: #A8884D`, `--sparkle-gold: rgba(200,164,107,0.6)`, `--ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1)`. Keep all existing tokens. Do NOT remove --bg, --card, --sand, --text, --text-light. Add new utility classes for framer-motion scroll reveals. Keep existing prefers-reduced-motion media query.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 3+
  References: src/index.css:4-14
  Acceptance criteria: `grep "C8A46B" src/index.css` returns match. Build succeeds.
  QA scenarios: happy - all new tokens present. build succeeds. Evidence .omo/evidence/task-2-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(design): update gold palette tokens with richer values

- [x] 3. Restructure App.tsx for animated sections
  What to do / Must NOT do: Update src/App.tsx to import framer-motion's AnimatePresence and motion. Wrap each section in motion.div with section IDs for scroll targeting. Add section refs array for navigation. Import all sections (HeroSection, MemoriesSection, MusicPlayer, MessageSection, Guestbook, Footer). Do NOT add new sections yet (19 transition and Playground added in later waves). Do NOT remove existing sections. Use `<motion.section>` wrappers with unique `layoutId` per section for smooth transitions.
  Parallelization: Wave 1 | Blocked by: 1, 2 | Blocks: 4+
  References: src/App.tsx:1-21
  Acceptance criteria: `grep "motion" src/App.tsx` returns matches. `npm run build` exits 0.
  QA scenarios: happy - app renders all sections. build succeeds. Evidence .omo/evidence/task-3-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(app): add framer-motion section wrappers with layout IDs

- [x] 4. Create reusable Framer Motion scroll-reveal hook
  What to do / Must NOT do: Create src/hooks/useAnimatedReveal.ts. Export a hook that uses framer-motion's `useInView` + `useAnimation` to return `{ ref, controls, variants }`. Default variants: fadeInUp (opacity 0 y=30 → 1 y=0), fadeIn (opacity 0→1), scaleIn (scale 0.95→1), staggerChildren (stagger 0.1s). Accept config: { threshold, once, variant }. Replace all uses of useScrollReveal.js (the old IntersectionObserver hook) with the new hook. Delete useScrollReveal.js when done. Do NOT add complex spring params — keep it simple. Do NOT break existing components.
  Parallelization: Wave 1 | Blocked by: 1, 2 | Blocks: 6+
  References: src/hooks/useScrollReveal.js (delete after), src/index.css .reveal rules (can stay for fallback)
  Acceptance criteria: `grep -r "useScrollReveal" src/` returns nothing. `npm run build` exits 0.
  QA scenarios: happy - hook exports correctly, components using it render. build succeeds. Evidence .omo/evidence/task-4-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(hooks): add framer-motion scroll-reveal hook, remove old IntersectionObserver version

- [x] 5. Remove unused CSS patterns and old scroll-reveal classes
  What to do / Must NOT do: From src/index.css, keep .reveal and .visible classes (components may still reference them) but mark as deprecated. Do NOT delete yet — they will be removed after all components migrate to framer-motion. Remove any unused CSS from index.css (dead utility classes, unused keyframes). Keep prefers-reduced-motion. Do NOT modify component CSS files.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 3
  References: src/index.css:38-56, src/App.css:1-6
  Acceptance criteria: `npm run build` exits 0. No visual regression on hero section.
  QA scenarios: happy - build succeeds, site renders. Evidence .omo/evidence/task-5-ibhi-birthday-magic-recovery.md
  Commit: Y | chore(cleanup): mark old scroll-reveal CSS as deprecated

### WAVE 2 — Hero Cinematic Opening

- [x] 6. Build cinematic hero opening sequence
  What to do / Must NOT do: Rewrite src/components/HeroSection.tsx to implement the timed cinematic sequence using framer-motion variants:
  0.0s — black screen (bg: #1a1a1a, no image visible)
  0.5s — single gold point appears (4px dot, centered, borderRadius: '50%', bg: var(--gold), opacity 0→1)
  1.0s — second point appears nearby, both connect into thin horizontal line (width 4px→120px, height 1.5px)
  1.5s — line becomes photographic aperture: clip-path circle(0%) → circle(70%) revealing hero photo behind
  2.2s — "HAPPY 19TH BIRTHDAY" fades in (Playfair Display italic, gold, letter-spacing 0.3em, uppercase)
  2.8s — "Ibhi" fades in (Playfair Display, clamp(3rem,9vw,7rem), white)
  3.3s — subtitle "A little something for your 19th." (Inter italic, warm gray)
  3.8s — "ENTER →" button (pill shape, gold border, text gold, hover: bg gold, text white)
  Hero photo: /images/ibhi-friend/1741450804644.jpg
  After all animations: tiny gold sparkles appear floating in the revealed light area (use magic layer from task 9).
  Must NOT: autoplay audio, use hearts, use particle effects during the sequence (sparkles after only).
  Must implement: prefers-reduced-motion → instant reveal of all content, skip all delays.
  Must implement: keyboard accessible ENTER button.
  Parallelization: Wave 2 | Blocked by: 3, 4 | Blocks: 8
  References: src/components/HeroSection.tsx (current), /public/images/ibhi-friend/1741450804644.jpg
  Acceptance criteria: Hero plays full sequence on load. ENTER button is keyboard-focusable. reduced-motion shows all content instantly. Build succeeds.
  QA scenarios: happy - full sequence plays. reduced-motion - instant reveal. mobile - sequence plays, touch ENTER works. Evidence .omo/evidence/task-6-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(hero): build cinematic opening with point→line→aperture→photo sequence

- [x] 7. Update HeroSection.css for cinematic sequence
  What to do / Must NOT do: Update src/components/HeroSection.css: keep existing responsive structure. Add styles for: animated point/line elements (absolute centered, z-index 3), aperture clip-path container, title typography (gold, uppercase, tracking), subtitle, ENTER button (pill, gold border, transition), sparkle container. Remove old Ken Burns animation (hero__bg animation) — replace with framer-motion controlled reveal. Keep gradient overlay. Keep fallback gradient. Add mobile adjustments (shorter delays, smaller aperture). Keep reduced-motion @media block.
  Parallelization: Wave 2 | Blocked by: 6 | Blocks: 8
  References: src/components/HeroSection.css (current)
  Acceptance criteria: All new CSS classes present. No unused CSS. Build succeeds.
  QA scenarios: happy - styles compile, hero renders correctly. reduced-motion - no animation styles conflict. Evidence .omo/evidence/task-7-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(hero): update hero CSS for cinematic sequence styles

- [x] 8. Build ENTER → scroll transition with particle burst
  What to do / Must NOT do: On ENTER button click: button compresses (scale 0.95, 100ms) → a tiny gold ring expands outward from button center (circle, border gold, animate scale 1→3, opacity 1→0) → 8-12 small gold fragments burst outward (tiny rects/circles, animate random directions 30-80px, opacity 1→0, duration 600ms) → hero content fades out (opacity 1→0) → page scrolls smoothly to next section (window.scrollTo or framer-motion scroll). Use framer-motion AnimatePresence for exit animations. Total transition ~800ms. Do NOT scroll-jack — natural scroll after transition completes. Must work with keyboard (Enter key on button). Must work on mobile (tap). Must NOT trigger on touch devices accidentally.
  Parallelization: Wave 2 | Blocked by: 6, 7 | Blocks: 13
  References: src/components/HeroSection.tsx (will be modified)
  Acceptance criteria: ENTER click triggers 800ms transition, then scrolls to next section. Particles appear and disappear. Mobile tap works. Keyboard Enter works. Build succeeds.
  QA scenarios: happy - click ENTER, see ring+fragments, scroll to next section. mobile - tap ENTER, same effect. keyboard - tab to ENTER, press Enter. Evidence .omo/evidence/task-8-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(hero): add ENTER button with ring burst and scroll transition

### WAVE 3 — Magic Layer + Cursor

- [x] 9. Create SVG ambient sparkle system
  What to do / Must NOT do: Create src/components/magic/AmbientSparkles.tsx + AmbientSparkles.css. Export a configurable sparkle component. Props: { density?: 'low'|'medium'|'high', color?: string, twinkle?: boolean, interactive?: boolean, section?: string }. Renders 8-15 absolutely-positioned SVG sparkle elements. Sparkle shapes:
  - Four-point star: `<path d="M0,-8 L1,-2 L8,0 L1,2 L0,8 L-1,2 L-8,0 L-1,-2 Z" />`
  - Tiny dot: `<circle r="1.5" />`
  - Small diamond: `<rect width="3" height="3" transform="rotate(45)" />`
  - Gold spec: `<circle r="1" opacity="0.4" />`
  Sparkles twinkle using CSS animation (opacity pulse, 3-6s random delay). On interactive mode: sparkles subtly shift position based on mouse proximity (Event.pageX/Y → transform translate). Use requestAnimationFrame for mouse tracking, debounced to 60fps. Color prop defaults to var(--gold-light). Sparkles pause when tab is hidden (use document.hidden). Offscreen sparkles don't animate (use IntersectionObserver on parent). Must NOT create >20 sparkles. Must NOT cause layout shifts (position: fixed or absolute). Must cleanup on unmount.
  Parallelization: Wave 3 | Blocked by: 3, 4 | Blocks: 10+
  References: spec §4 (magic layer), spec §5 (ambient sparkles)
  Acceptance criteria: Sparkles render in container. Twinkle animation runs. Interactive proximity works on desktop. Offscreen pause works. Build succeeds.
  QA scenarios: happy - sparkles visible, twinkling, responding to mouse. mobile - sparkles visible but no mouse interaction. reduced-motion - no twinkle animation. offscreen - performance profiler shows no animation. Evidence .omo/evidence/task-9-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(magic): create SVG ambient sparkle system with interactive proximity

- [x] 10. Create ambient background life (dust, grain, light)
  What to do / Must NOT do: Create src/components/magic/AmbientBackground.tsx + AmbientBackground.css. Very subtle background effects:
  - Gold dust: 4-6 tiny floating dots (2px circles, gold opacity 0.15) that drift slowly (CSS animation, translateY ±10px, 15-25s duration, random delays)
  - Subtle grain: CSS pseudo-element with SVG noise pattern at 5% opacity (base64 SVG filter)
  - Soft light movement: 1-2 large blurred circles (80-120px, gold opacity 0.03-0.05) that slowly orbit (CSS animation, 30-45s duration)
  All effects are NEARLY INVISIBLE — subconscious. The user should feel "this page is alive" without noticing why. Pause all effects when tab is hidden. Disable on prefers-reduced-motion. Components accept `intensity` prop ('low'|'medium'). 'low' = half the elements.
  Parallelization: Wave 3 | Blocked by: 9 | Blocks: 11+
  References: spec §5 (ambient background life)
  Acceptance criteria: Background effects render. Effects pause on tab hide. reduced-motion disables all. Build succeeds.
  QA scenarios: happy - subtle movement visible, grain barely noticeable. reduced-motion - all effects disabled. tab hidden - profiler shows no animation frames. Evidence .omo/evidence/task-10-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(magic): add ambient background life (dust, grain, light)

- [x] 11. Create Canvas-based confetti system
  What to do / Must NOT do: Create src/components/magic/ConfettiBurst.tsx. Canvas-based confetti system with:
  - Three burst levels: 'micro' (5-10 pieces), 'small' (10-25 pieces), 'celebration' (25-40 pieces)
  - Shapes: rectangles (4x2px to 8x4px), tiny circles (2-3px radius), streamer fragments (10x2px), four-point stars (6px)
  - Colors: gold (#C8A46B), gold-light (#E0C99A), gold-dark (#A8884D), cream (#F6F1E8), white
  - Physics: random velocities (x: ±3px/frame, y: -8 to -3 initial upward, gravity 0.15, rotation ±2deg/frame, opacity fade over 2-3s)
  - Duration: micro 1.5s, small 2s, celebration 3s
  - Props: `level`, `originX`/`originY` (0-1 percentage of viewport), `onComplete` callback
  - Uses HTMLCanvasElement (not offscreenCanvas for compatibility)
  - requestAnimationFrame loop that cleans up after all particles fade
  - Must NOT use hearts. Must NOT create continuous rain. Must NOT exceed 45 pieces.
  - Pool/create particle objects (avoid GC pressure: reuse particle objects)
  Parallelization: Wave 3 | Blocked by: 9 | Blocks: 12+
  References: spec §15 (confetti system), spec §5 (particle performance)
  Acceptance criteria: Confetti renders on canvas. Different levels produce different particle counts. Particles fade correctly. Canvas cleanup on unmount. Build succeeds.
  QA scenarios: happy - trigger confetti, particles animate and fade. reduced-motion - confetti appears then freezes. multiple triggers - canvas clears properly between. Evidence .omo/evidence/task-11-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(magic): create canvas-based confetti burst system (3 levels)

- [x] 12. Create custom cursor (desktop only)
  What to do / Must NOT do: Create src/hooks/useCustomCursor.ts and src/components/magic/CustomCursor.tsx + CustomCursor.css. Implementation:
  - Two elements: a small dot (6px, gold, position: fixed) and a larger ring (24px, charcoal border 1.5px, transition: transform 0.15s ease)
  - Dot follows mouse exactly. Ring follows with slight delay (CSS transition).
  - On interactive elements (a, button, [data-cursor]): ring scales up to 32px, border becomes gold. If element has data-cursor-label, that text appears near cursor (small, uppercase, 10px, tracking 0.1em).
  - Elements with data-cursor-label="VIEW" (photos), data-cursor-label="PLAY"|"PAUSE" (vinyl), data-cursor-label="OPEN" (envelopes), data-cursor-label="DRAG" (draggable).
  - On click: 2-4 tiny particles burst from cursor position (reuse micro-confetti style).
  - Hide default cursor on body when custom cursor active.
  - Disable entirely on touch devices: `if ('ontouchstart' in window) return null`
  - Must NOT create permanent trail. Must NOT be larger than 40px. Must NOT obstruct text selection.
  - Respect prefers-reduced-motion: show custom cursor but no animation.
  Parallelization: Wave 3 | Blocked by: 9 | Blocks: 18
  References: spec §7 (cursor magic)
  Acceptance criteria: Custom cursor shows on desktop. Ring expands on interactive elements. Labels show on elements with data-cursor-label. Touch devices show default cursor. Build succeeds.
  QA scenarios: happy - mouse moves, dot+ring follow, hover button ring expands. mobile - default cursor, no custom cursor. reduced-motion - cursor visible but no animation. Evidence .omo/evidence/task-12-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(cursor): add custom desktop cursor with contextual labels

### WAVE 4 — Five Frames + Lightbox

- [x] 13. Build Five Frames sticky scroll experience
  What to do / Must NOT do: Rewrite src/components/MemoriesSection.tsx as FiveFrames.tsx with framer-motion scroll-driven animation. Create src/components/five-frames/ directory with FiveFrames.tsx + FiveFrames.css. Use framer-motion's `useScroll` + `useTransform` for scroll-linked animations. Viewport becomes a photographic stage where frames transition as user scrolls:
  - FRAME 01 — Large centered editorial photo, aperture clip-path reveal (clip-path: circle(0%) → circle(70%))
  - FRAME 02 — Vertical split reveal (two panels slide apart to reveal photo in between)
  - FRAME 03 — Full-width, starts blurred (filter: blur(8px)) → resolves to sharp
  - FRAME 04 — Polaroid/editorial paper treatment (white border, subtle shadow, slight rotation -2deg to 0deg)
  - FRAME 05 — Dark environment, moving exposure reveal (brightness 0.3 → 1, like light exposing photo paper)
  Each frame has editorial label "FRAME 0X" (gold, serif, small, top-left corner).
  Photos: /images/memories/IMG20250506144456.jpg, IMG_20250510_152025_341.jpg, IMG_20250510_152113_459.jpg, IMG_20250510_152120_608.jpg, IMG_20250510_152134_431.jpg
  Photo order: [IMG20250506144456, IMG_20250510_152025_341, IMG_20250510_152113_459, IMG_20250510_152120_608, IMG_20250510_152134_431]
  Do NOT add captions (no fabricated content). Each frame is ~70vh tall. Section uses sticky or transform-based scroll. Mobile: simplify to regular scroll reveal (no sticky). Remove algorithmic caption generation (cleanCaption function). Must NOT duplicate photos.
  Parallelization: Wave 4 | Blocked by: 4, 8 | Blocks: 15
  References: src/components/MemoriesSection.tsx (current), public/images/memories/
  Acceptance criteria: 5 photos appear in order. Each has unique reveal. Scrolling transitions between frames. Mobile uses simpler reveal. Build succeeds.
  QA scenarios: happy - scroll through all 5 frames, each animates uniquely. mobile - touch scroll works. fast scroll backward - no broken state. reduced-motion - simple opacity reveal. Evidence .omo/evidence/task-13-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(photos): rewrite as Five Frames sticky scroll with 5 unique reveals

- [x] 14. Create photo lightbox viewer
  What to do / Must NOT do: Create src/components/five-frames/PhotoLightbox.tsx + PhotoLightbox.css. Fullscreen overlay modal:
  - Trigger: click any photo in Five Frames
  - Large centered image with max-width/max-height (90vw/90vh)
  - Dark backdrop (rgba(0,0,0,0.9), backdrop-blur: 4px)
  - Close button (top-right, X icon, gold, 44px touch target)
  - Previous/Next arrows (left/right sides, gold, visible on hover/touch)
  - Image counter "3 / 5" (bottom-center, small, white, opacity 0.7)
  - Keyboard: Escape closes, ArrowLeft prev, ArrowRight next
  - Touch: swipe left/right to navigate (use basic touch delta tracking)
  - Focus trap: Tab cycles within modal, Shift+Tab reverses
  - aria-modal="true", role="dialog", aria-label="Photo viewer"
  - Entrance: image zooms in from thumbnail position (framer-motion layoutId linking)
  - On close: image zooms back to thumbnail
  - Do NOT use swipe library — native touch events only.
  - Do NOT add captions or fabricated text.
  Parallelization: Wave 4 | Blocked by: 4 | Blocks: 15
  References: spec §12, spec §8 (photo magic)
  Acceptance criteria: Click photo opens viewer. All 5 navigable. Keyboard Esc/Arrows work. Touch swipe works. Focus trapped. Build succeeds.
  QA scenarios: happy - open, navigate all 5, close. keyboard - Arrows + Esc. mobile - touch swipe. screen reader - aria-modal announced. Evidence .omo/evidence/task-14-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(photos): add fullscreen photo lightbox viewer with keyboard/touch nav

- [x] 15. Add frame-specific photographic details
  What to do / Must NOT do: Add subtle photographic details to each frame in FiveFrames.css:
  - Tiny crop marks at photo corners (small L-shaped brackets, gold opacity 0.3, 12px size)
  - Light leak overlays: soft colored strips on edges (orange/red at 5% opacity, CSS gradients with clip-path)
  - Frame numbering: editorial "FRAME 01" label with small decorative line
  - Tiny contact-sheet markings: small dots/circles near frame edges (CSS pseudo-elements, gold opacity 0.15)
  - On FRAME 04 (Polaroid): white border effect (CSS padding + box-shadow), slight paper shadow (box-shadow: 0 4px 20px rgba(0,0,0,0.12))
  - On FRAME 05: subtle grain overlay (CSS::after with noise pattern)
  Do NOT add fabricated captions, dates, or locations. Must NOT clutter the frames — details should be barely noticeable.
  Parallelization: Wave 4 | Blocked by: 13 | Blocks: none
  References: spec §8 (photo magic), spec §10 (light leaks)
  Acceptance criteria: Photographic details render on each frame. Corners, numbering, crop marks visible. Build succeeds.
  QA scenarios: happy - all 5 frames show distinct details. mobile - details still visible but not overwhelming. Evidence .omo/evidence/task-15-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(photos): add photographic details (crop marks, light leaks, frame numbers)

- [x] 16. Wire lightbox into Five Frames section
  What to do / Must NOT do: Integrate PhotoLightbox into FiveFrames.tsx. Add state: `selectedIndex: number | null`. Clicking a frame calls `setSelectedIndex(index)`. Lightbox receives: photos array, selectedIndex, onClose, onPrev, onNext. Ensure lightbox renders at document body level (portal via ReactDOM.createPortal or mount in App.tsx). Do NOT add duplicate lightbox instances. Do NOT break scroll behavior when lightbox is open (prevent body scroll: overflow: hidden on body when open).
  Parallelization: Wave 4 | Blocked by: 14, 15 | Blocks: none
  References: src/components/five-frames/FiveFrames.tsx (will exist after task 13)
  Acceptance criteria: Clicking any frame opens lightbox with correct starting image. Body scroll locked when open. Build succeeds.
  QA scenarios: happy - click frame 3, lightbox opens at image 3. body doesn't scroll behind. close restores scroll. Evidence .omo/evidence/task-16-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(photos): integrate lightbox viewer into Five Frames with body scroll lock

### WAVE 5 — 19 Transition + Vinyl

- [x] 17. Build "19" signature portal transition
  What to do / Must NOT do: Create src/components/NineteenPortal.tsx + NineteenPortal.css. A dedicated scroll section (~100vh). Using framer-motion `useScroll` + `useTransform`:
  - As user scrolls into section: "19" scales from 20vw to 80vw font-size
  - "19" is rendered as large text (Playfair Display, gold to white gradient, font-weight 700)
  - 8-12 tiny gold particles orbit near the number (CSS absolute positioned, keyframe animation: circular orbit 8-12s)
  - At peak scale (~70vw), the number acts as a clip-path mask: `clip-path: url(#nineteen-mask)` where the mask is the "19" text shape, revealing the next section (music) behind it
  - Alternative if SVG clip-path is complex: use a simpler approach — "19" fills viewport, then splits apart (the '1' moves left, '9' moves right) revealing the music section behind
  - After transition completes, "19" remains as a subtle watermark in the corner of the music section (opacity 0.04, position: fixed)
  - Mobile: reduce scale range (30vw→60vw), simpler reveal (no clip-path, just scale + fade)
  - Must NOT use WebGL. Must NOT trap user in scroll section. Must NOT be more than ~120vh total scroll space.
  - Must feel like ONE of the site's signature moments.
  Parallelization: Wave 5 | Blocked by: 4 | Blocks: 19
  References: spec §12 (19 should feel special), spec §22 (scroll surprises)
  Acceptance criteria: 19 scales on scroll. Clip-path/mask reveals next section. Particles orbit. Mobile works. Build succeeds.
  QA scenarios: happy - scroll through, 19 grows, reveals music section. mobile - works without overflow. fast scroll - no jump. reduced-motion - simple scale without clip-path. Evidence .omo/evidence/task-17-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(transition): add signature 19 portal transition with scroll-driven scale and mask

- [x] 18. Redesign music player as vinyl record
  What to do / Must NOT do: Rewrite src/components/MusicPlayer.tsx as a vinyl record player. Keep the component name for compatibility. New design:
  - Visual turntable: circular base (280px, gradient bg, box-shadow depth)
  - Vinyl record: dark circle with concentric grooves (radial-gradient repeating), subtle sheen (linear-gradient overlay at 45deg, opacity 0.1)
  - Center label: cream circle with "ON REPEAT" text (gold, small, serif) and "Ibhi · 19" (tiny)
  - Tonearm: sits on right side, pivots from bottom-right corner. CSS: a thin line (2px, charcoal) with a small circle at end. Uses CSS transform rotate() for position.
  - Play: tonearm rotates onto record (transform: rotate(-15deg)), record spins (animation: spin 2s linear infinite), audio fades in
  - Pause: record decelerates (animation-duration transition 2s→infinite), tonearm lifts slightly
  - End: record slows to stop, tonearm returns to rest position
  - Progress bar: thin gold line at bottom of turntable, with tiny glowing dot at playhead
  - Time display: current / duration below progress bar
  - Track name: "Ninaithu Ninaithu Parthen" below turntable
  - Artist: "Female Version · Tamil" (small, italic)
  - Keep existing keyboard shortcut (Space to play/pause)
  - Keep existing error handling for missing audio
  - Remove MusicNoteIcon album art placeholder
  - Mobile: smaller turntable (200px), no tonearm animation (simplified play/pause indicator)
  Audio src: /music/favourite-track/_Ninaithu_Ninaithu_Parthen_Female_Version_Tamil_Ringtone_(by Fringster.com).mp3
  Parallelization: Wave 5 | Blocked by: 4 | Blocks: 19
  References: src/components/MusicPlayer.tsx (current), spec §18 (vinyl magic)
  Acceptance criteria: Vinyl record renders with grooves and label. Play spins record and plays audio. Pause decelerates. Tonearm animates. Progress bar works. Mobile simplified version works. Build succeeds.
  QA scenarios: happy - play, record spins, audio plays. pause, record slows. seek works. mobile - touch play works. missing audio - error state shown gracefully. reduced-motion - no spin animation, controls still work. Evidence .omo/evidence/task-18-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(music): redesign as vinyl record player with tonearm and spin animation

- [x] 19. Update MusicPlayer.css for vinyl design
  What to do / Must NOT do: Rewrite src/components/MusicPlayer.css. New styles:
  - Turntable container: centered, 280px (mobile 200px), circular, box-shadow for depth
  - Vinyl record: 260px (mobile 180px), radial-gradient grooves, spin animation
  - Center label: 80px, cream bg, gold border, small text
  - Tonearm: absolute positioned, right side, transform-origin bottom-right, transition 0.6s ease
  - Progress bar: full width below turntable, gold, 3px height, dot at playhead
  - Time display: flex space-between
  - Controls: play/pause button centered below
  - Spin keyframe: 0% { transform: rotate(0deg) } 100% { transform: rotate(360deg) }
  - Tonearm states: .tonearm--rest (rotate 5deg), .tonearm--playing (rotate -15deg)
  - Keep responsive breakpoints. Keep reduced-motion (no spin, no tonearm transition). Keep focus-visible styles.
  Parallelization: Wave 5 | Blocked by: 18 | Blocks: none
  References: src/components/MusicPlayer.css (current)
  Acceptance criteria: Vinyl CSS renders correctly. Spin animation works. Tonearm transitions. Mobile responsive. Build succeeds.
  QA scenarios: happy - vinyl styles render, tonearm moves, record spins. mobile - smaller vinyl. reduced-motion - no animation. Evidence .omo/evidence/task-19-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(music): add vinyl player CSS with spin animation and tonearm

- [x] 20. Add vinyl playback visual enhancements
  What to do / Must NOT do: Add subtle visual enhancements to the vinyl player:
  - While playing: vinyl record gets a subtle rotating highlight (conic-gradient overlay, opacity 0.08, spin animation)
  - Center label catches light: subtle gradient shift during rotation (animation: label-shimmer 4s ease infinite)
  - Progress dot: 8px circle, gold, position absolute on progress bar, moves with playback, glow effect (box-shadow: 0 0 6px var(--gold))
  - On hover over vinyl: slight scale (1.02) with tooltip showing track length
  - Needle contact: when play starts, tiny gold spark at needle contact point
  - Must NOT build a visualizer. Must NOT add equalizer bars. Section should feel warm and analog.
  Parallelization: Wave 5 | Blocked by: 18, 19 | Blocks: none
  References: spec §18 (vinyl magic)
  Acceptance criteria: Spinning highlight visible during play. Progress dot glows. Needle contact spark on play start. Build succeeds.
  QA scenarios: happy - all enhancements render during playback. reduced-motion - no rotating effects. Evidence .omo/evidence/task-20-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(music): add vinyl playback enhancements (highlight, progress dot, needle spark)

### WAVE 6 — Playground + Confetti

- [x] 21. Enhance Birthday Playground section
  What to do / Must NOT do: Create src/components/Playground.tsx + Playground.css. A playful section between Music and Message sections. Title: "BIRTHDAY PLAYGROUND" (editorial gold). Subtitle: "A few small things" (italic, warm gray). Contains three widgets in a flex/grid layout:
  1. Scratch Card (redesigned from existing src/components/widgets/ScratchCard.tsx or inline)
  2. Photo Developer (Random Frame — see task 22)
  3. Confetti Button
  Layout: 1 column mobile, 2-3 columns desktop. Compact section (~60vh). Playful but polished. Widget cards match existing design (cream bg, gold border, subtle shadow).
  Do NOT add weather, fake counters, fake statistics. Do NOT add romantic elements.
  Parallelization: Wave 6 | Blocked by: 4 | Blocks: 23
  References: spec §16 (birthday playground)
  Acceptance criteria: Section renders with 3 widgets. Layout responsive. All widgets interactive. Build succeeds.
  QA scenarios: happy - all 3 widgets visible, responsive. mobile - single column. Evidence .omo/evidence/task-21-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(playground): create Birthday Playground section with 3 interactive widgets

- [x] 22. Build photo developing effect (Random Frame)
  What to do / Must NOT do: Create the Random Frame / photo developer widget in Playground. Sequence:
  1. Button: "DEVELOP A PHOTO" (gold border, cream bg, hover fills gold)
  2. Click: A blank cream card (Polaroid-shaped, 3:4 ratio, white border) appears with slide-up animation
  3. Image starts as almost white (brightness 5, sepia 0.3) → over 2 seconds gradually develops: brightness 5→1, sepia 0.3→0, saturate 0.2→1
  4. Slight grain overlay fades out during development (CSS noise pattern, opacity 0.3→0)
  5. When fully developed: tiny decorative frame number appears bottom-right "FRAME 0X / 05" (random from 5 photos)
  6. A small timestamp-like mark appears: "19" (tiny, gold, corner) — NOT a real date
  7. Mini dust puff animation at corners when card lands (2-3 tiny particles per corner, 300ms)
  8. Each click picks a random photo from the 5. Can repeat. Click again replaces current.
  Photos: randomly selected from the 5 memories photos.
  Must NOT invent dates. Use FRAME 03 / 05 format instead. Must NOT use all 5 photos identically each time — random selection.
  Parallelization: Wave 6 | Blocked by: 4 | Blocks: 23
  References: spec §17 (random frame), spec §9 (photo developing)
  Acceptance criteria: Button click shows blank card that develops into photo. Different photo each time. Frame numbering shown. Build succeeds.
  QA scenarios: happy - click, see development animation. click again, different photo. mobile - touch works. Evidence .omo/evidence/task-22-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(playground): add photo developing effect with random frame selection

- [x] 23. Add scratch card redesign + integrate confetti
  What to do / Must NOT do: Redesign scratch card to match cream/gold aesthetic:
  - Replace existing src/components/widgets/ScratchCard.tsx or create inline version in Playground
  - Card: cream background, gold border (1.5px), rounded corners (12px), subtle shadow
  - Scratch layer: cream with gold pattern (repeating small dots or lines, SVG pattern)
  - Hidden message: "HAPPY 19TH, IBHI!" (large, Playfair Display, gold) + "Hope 19 treats you well." (smaller, Inter)
  - Canvas scratch mechanics: draw touch/mouse events, compositeOperation: 'destination-out'
  - Auto-reveal when 65% scratched (trigger remaining scratch area to clear)
  - On complete: micro confetti burst (5-10 gold particles, use ConfettiBurst component from task 11)
  - Reset button: "Scratch Again" (small, gold link-style)
  - Must NOT have romantic text ("every moment has been a treasure", etc.)
  - Confetti button in Playground: simple button that fires 'small' confetti burst. Label: "MAKE IT RAIN" (gold border, playful).
  Parallelization: Wave 6 | Blocked by: 11, 21, 22 | Blocks: 25
  References: spec §15 (confetti), spec §16 (playground)
  Acceptance criteria: Scratch card reveals message on 65% scratch. Confetti burst on complete. Confetti button fires burst. Build succeeds.
  QA scenarios: happy - scratch 65%, message revealed, confetti fires. mobile - touch scratch works. confetti button - click, confetti fires. Evidence .omo/evidence/task-23-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(playground): redesign scratch card and integrate confetti system

- [ ] 24. Add photo banner to Random Frame
  What to do / Must NOT do: Not needed — merged into task 22. Skip this slot.
  Parallelization: N/A | Blocked by: N/A | Blocks: N/A
  Acceptance criteria: N/A
  QA scenarios: N/A
  Commit: N

### WAVE 7 — Details + Polish

- [x] 25. Transform Message section into physical letter
  What to do / Must NOT do: Rewrite src/components/MessageSection.tsx to feel like opening a physical letter/envelope:
  - Replace white card with cream letter paper (slight texture, folded-edge effect, shadow)
  - Paper texture via CSS: subtle noise/grain overlay
  - Add envelope concept: section starts with a closed envelope (flap triangle, address lines in Inter). Click/tap "OPEN" → seal breaks (gold line separates) → flap lifts (CSS transform rotateX) → letter paper slides out (translateY animation).
  - Letter content: same message text (unchanged), same "For Ibhi" heading, same ornament dividers. NO changes to actual message content.
  - Tiny paper dust/glint on open (2-3 gold specks, CSS animation, 500ms)
  - When letter fully open: background slightly darkens (overlay opacity 0→0.1) to focus attention on the letter
  - Mobile: envelope animation simplified (shorter duration, smaller transforms)
  - Must NOT change the actual message text. Must NOT add romance.
  Parallelization: Wave 7 | Blocked by: 4 | Blocks: 27
  References: src/components/MessageSection.tsx (current), spec §19 (envelope magic)
  Acceptance criteria: Envelope appears initially. Click opens envelope. Letter slides out. Message text unchanged. Build succeeds.
  QA scenarios: happy - envelope opens, letter emerges, message readable. mobile - simplified open animation. keyboard - tab to OPEN button, Enter opens. reduced-motion - instant open. Evidence .omo/evidence/task-25-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(message): transform message into physical letter with envelope open animation

- [x] 26. Add playful copy and handwritten annotations
  What to do / Must NOT do: Add 3-4 playful copy moments and 3-4 handwritten annotations:
  Playful copy (update text in respective components):
  - After Hero CTA (footer text area): add tiny text "I could've just sent a text." (Inter, italic, 0.7rem, text-light, opacity 0.5)
  - In Five Frames heading area: subtitle "Apparently five photos were enough to build an entire website." (Inter italic, small, warm gray)
  - In Playground heading: small text "Click it. Obviously." below the subtitle
  - In Footer: "Still here?" detail (see task 29). After "Made for Ibhi · 19": add "Very serious birthday technology." (Inter italic, 0.7rem, opacity 0.4)
  Handwritten annotations (use CSS with a cursive/handwritten style):
  - Add Caveat font from Google Fonts (handwritten style) to index.html
  - Near photo grid heading: tiny "frame 03" annotation floating near third photo (position: absolute, rotate -5deg, Caveat font, gold opacity 0.5)
  - Near vinyl: tiny "play this ↑" annotation (Caveat, gold, floating near tonearm)
  - Near message envelope: tiny "open me" annotation (Caveat, script-style, near envelope seal)
  - Near scratch card: tiny "try this" annotation (Caveat, gold)
  Do NOT overuse — 3-4 handwritten moments maximum. Must NOT use handwritten for paragraphs.
  Parallelization: Wave 7 | Blocked by: 4 | Blocks: 27
  References: spec §20 (handwritten details), spec §21 (playful copy)
  Acceptance criteria: Playful copy appears in 3-4 locations. Handwritten annotations visible. Font loads correctly. Build succeeds.
  QA scenarios: happy - playful text visible, annotations appear. mobile - text wraps correctly. Evidence .omo/evidence/task-26-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(copy): add playful copy and handwritten annotations throughout site

- [x] 27. Add section transition personalities
  What to do / Must NOT do: Each major section transition gets a unique animation personality using framer-motion. In App.tsx, wrap each section pair with transition logic:
  - Hero → Five Frames: aperture/light — hero photo crossfades into first frame, brief white flash (50ms, opacity 0.3)
  - Five Frames → Ibhi File: paper/editorial — last frame transforms into editorial page (scale + rotateX flip)
  - Ibhi File → 19: typographic — content compresses upward, "19" begins scaling
  - 19 → Music: circular — 19 clip-path morphs to circle, becomes vinyl record
  - Music → Playground: rhythmic — brief pulse animation (scale 1.02) on transition
  - Playground → Message: confetti settles → paper fragments — confetti particles (if any remain) settle down and become paper-card-like
  - Message → Footer: light — message letter fades out, footer divider line draws in
  Keep transitions subtle (~300-500ms each). Do NOT make transitions the main event — they support the narrative. Mobile: all transitions simplified to fade. Use framer-motion AnimatePresence mode="wait" or layout animations. Do NOT add more than 500ms per transition.
  Parallelization: Wave 7 | Blocked by: 19, 25 | Blocks: 29
  References: spec §26 (section transitions), spec §25 (section personalities)
  Acceptance criteria: Each section pair has unique transition. Transitions are subtle (<500ms). Mobile uses simplified fade. Build succeeds.
  QA scenarios: happy - scroll through all sections, each transition feels distinct. mobile - fade only. reduced-motion - instant transitions. Evidence .omo/evidence/task-27-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(transitions): add section-specific transition personalities

- [x] 28. Add micro-surprises (5-8 moments)
  What to do / Must NOT do: Add 6 small delightful moments across the site:
  1. Nav dots twinkle: when a section scrolls into view and its nav dot becomes active, the dot pulses gold briefly (CSS animation, 400ms)
  2. Photo hover tilt: on desktop, photos in Five Frames tilt 0.5deg on hover (transform: rotate(0.5deg), transition 0.3s ease)
  3. Progress bar glow: the playhead dot on vinyl progress bar has a subtle glow pulse during playback (CSS animation: box-shadow pulse, 2s)
  4. Button label change: ENTER button label briefly changes to "→" after first click (state change, 1s, then reverts)
  5. Divider sparkle: when a section's gold ornamental divider scrolls into view, a sparkle runs along it (CSS animation, 600ms, 3px bright dot moving along line)
  6. Envelope seal ring: when envelope opens, the seal produces a small expanding ring animation (CSS, circle scale 1→2, opacity 0.5→0, 500ms)
  Each micro-surprise must last <1s. Do NOT announce them. Do NOT add more than 8.
  Parallelization: Wave 7 | Blocked by: 25, 26 | Blocks: 29
  References: spec §13 (micro-surprises), spec §14 (birthday energy)
  Acceptance criteria: 6 micro-surprises implemented. Each <1s duration. All work without breaking existing functionality. Build succeeds.
  QA scenarios: happy - all 6 surprises trigger correctly. reduced-motion - no animation. mobile - hover effects disabled. Evidence .omo/evidence/task-28-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(polish): add 6 micro-surprises (nav twinkle, photo tilt, progress glow, etc.)

- [x] 29. Build hidden 19-click easter egg and "Still here?" detail
  What to do / Must NOT do: Two features:
  
  HIDDEN EASTER EGG (in Footer or Finale):
  - The "19" text in the footer (or finale) tracks click count
  - After 5 clicks: background quiets slightly (body bg darkens 2%), a tiny gold point appears center-screen
  - After 300ms: "You found the part I wasn't going to make obvious." fades in (Inter, italic, warm gray, centered)
  - After 2s: "You're pretty important to me." fades in below (Playfair Display, gold, larger)
  - After 2s: "That's all you're getting from this button. :)" fades in (Inter, small, warm gray, persists)
  - A tiny sparkle appears then disappears at the end
  - No hint given. No confetti. Understated. Contrasts with louder birthday interactions.
  - Must NOT trigger on touch accidentally (use click event, not tap)
  
  "STILL HERE?" DETAIL (Footer):
  - "↑ REPLAY" link in footer (scrolls to top smoothly)
  - If user stays on page 8-10s after footer enters viewport (IntersectionObserver + setTimeout): "Still here?" text fades in (Inter italic, warm gray, small)
  - Clicking "Still here?" reveals: "I spent way too much time on this." → "Worth it though." + micro confetti burst (5 pieces)
  - Do NOT interrupt or trap user. Do NOT appear if user scrolls away.
  Parallelization: Wave 7 | Blocked by: 4 | Blocks: 29
  References: spec §23 (hidden easter egg), spec §24 (finale — still here)
  Acceptance criteria: Clicking 19 five times reveals message. Staying in footer 10s shows "Still here?". Click reveals response + confetti. Build succeeds.
  QA scenarios: happy - click 19 five times, see message. stay in footer 10s, see text, click for response. mobile - touch works. reduced-motion - fade animations skipped. Evidence .omo/evidence/task-29-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(easter-egg): add hidden 19-click interaction and playful 'Still here?' detail

- [x] 30. Add scroll surprises (3-4 moments)
  What to do / Must NOT do: Add 3 scroll-triggered surprises:
  1. Photo grows into frame: in Five Frames, the first photo initially appears tiny (scale 0.3) from center and grows to full size as user scrolls into section
  2. Decorative line becomes frame: a thin gold line in the section heading area unexpectedly becomes the top border of a photo frame (CSS transition, width 40px→100%, 800ms on scroll)
  3. Circular crop → vinyl: between the 19 transition and music section, the circular clip-path from 19 morphs into the vinyl record (framer-motion AnimatePresence layoutId="vinyl-circle")
  4. Polaroid falls onto page: in Playground, when Random Frame first activates, the Polaroid appears to fall from above with a slight bounce (CSS animation, translateY -50px→0, cubic-bezier bounce)
  Each scroll surprise triggers once via IntersectionObserver. Must feel intuitive, not jarring. Mobile: simplify (no position transforms, just opacity).
  Parallelization: Wave 7 | Blocked by: 19 | Blocks: 31
  References: spec §22 (scroll surprises)
  Acceptance criteria: 4 scroll surprises trigger correctly on scroll. Each triggers once. Mobile simplified. Build succeeds.
  QA scenarios: happy - scroll through each trigger point, surprises activate. mobile - simplified versions work. backward scroll - don't re-trigger. Evidence .omo/evidence/task-30-ibhi-birthday-magic-recovery.md
  Commit: Y | feat(scroll): add 4 scroll-triggered surprises (growing photo, line to frame, etc.)

### WAVE 8 — Final Build + Review

- [x] 31. Mobile magic pass — simplified but present
  What to do / Must NOT do: Review every component at 360px and 390px widths. Ensure:
  - Hero: sequence works with shorter delays, smaller text, reduced aperture
  - Five Frames: no sticky scroll on mobile, use simple scroll-triggered reveals instead
  - Magic layer: ambient sparkles reduced to 50% density, no interactive proximity, no parallax
  - Custom cursor: completely disabled on touch devices (check in useCustomCursor.ts)
  - Confetti: particle count halved for all burst levels
  - Vinyl: smaller turntable (200px), no tonearm animation (simplified play indicator)
  - Playground: single column layout, buttons full-width
  - Message: envelope animation shorter, no paper dust effect
  - Lightbox: full-width image, swipe navigation
  - All touch targets ≥44px
  - No horizontal overflow at any breakpoint
  - Text must not clip or overflow
  Test at 320px, 360px, 390px, 480px. Fix any issues found.
  Parallelization: Wave 8 | Blocked by: 30 | Blocks: 32
  References: spec §28 (mobile magic)
  Acceptance criteria: Site works without horizontal overflow at 320px-480px. All effects present but simplified. Touch targets ≥44px. Build succeeds.
  QA scenarios: happy - browse entire site at 390px, all interactions work. no overflow. touch targets pass. Evidence .omo/evidence/task-31-ibhi-birthday-magic-recovery.md
  Commit: Y | fix(mobile): mobile magic pass — simplified effects, touch optimization

- [x] 32. Reduced-motion and accessibility pass
  What to do / Must NOT do:
  Reduced motion:
  - All framer-motion animations check `useReducedMotion()` — skip animation when true
  - All CSS animations wrapped in `@media (prefers-reduced-motion: reduce)` — set animation: none
  - Hero: instant reveal of all content, no delays
  - Five Frames: simple opacity reveal, no clip-path/blur/parallax
  - Vinyl: no spin, no tonearm transition
  - Confetti: appears then freezes (no animation)
  - Cursor: visible but no transition/animation
  - Scroll surprises: instant (no animation)
  - Transitions: instant
  - All content must still be visible and functional without motion
  Accessibility:
  - Semantic HTML: section, nav, article, header, footer, button, h1-h3 hierarchy
  - Keyboard navigation: Tab through all interactive elements, visible focus rings
  - Alt text: empty alt for decorative images, descriptive alt for meaningful
  - ARIA labels on all interactive controls
  - Color contrast: gold on cream for small text meets WCAG AA (use #B8944F if #C8A46B fails)
  - Screen reader: test with browser reader mode
  - Focus trap in lightbox
  - Do NOT add aria-hidden="true" to interactive elements
  Parallelization: Wave 8 | Blocked by: 30 | Blocks: 33
  References: spec §29 (performance rule), spec §32 (a11y)
  Acceptance criteria: prefers-reduced-motion disables all animations but all content visible. Tab covers all interactive elements. Focus rings visible. Build succeeds.
  QA scenarios: happy - reduced-motion on, site fully functional. tab through entire site, every element reachable. screen reader announces sections correctly. Evidence .omo/evidence/task-32-ibhi-birthday-magic-recovery.md
  Commit: Y | fix(a11y): reduced-motion and accessibility pass across all components

- [x] 33. Production build and end-to-end verification
  What to do / Must NOT do: Run `npm run build`. Fix any compilation errors, TS errors, missing imports, broken asset references. Check console for runtime warnings. Run `npm run lint` and fix issues. Then do full walkthrough:
  1. Fresh page load at http://localhost:5173
  2. Hero cinematic sequence plays fully
  3. ENTER button → ring burst → scroll to Five Frames
  4. Five Frames: scroll through all 5, each reveals uniquely. Click photo → lightbox opens, navigate all 5, close.
  5. 19 portal: scroll through, number scales, reveals Music
  7. Music: vinyl spins, play/pause works, progress bar seeks
  8. Playground: scratch card works, photo developer works, confetti button fires
  9. Message: envelope opens, letter slides out
  10. Footer: click 19 five times → easter egg. Stay 10s → "Still here?"
  11. Check at 390px mobile + 1440px desktop
  12. Check keyboard navigation end-to-end
  13. Check reduced-motion
  14. Record any issues found. Fix them.
  Do NOT add new features during this pass.
  Parallelization: Wave 8 | Blocked by: 31, 32 | Blocks: F1-F4
  References: spec §36 (implementation workflow)
  Acceptance criteria: `npm run build` exits 0. `npm run lint` exits 0. All 14 verification steps pass. No console errors. Build succeeds.
  QA scenarios: happy - full walkthrough passes. mobile - all touch interactions work. keyboard - tab through entire site. reduced-motion - no animations. Evidence .omo/evidence/task-33-ibhi-birthday-magic-recovery.md
  Commit: Y | chore(build): production build and end-to-end verification

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [x] F1. Plan compliance audit — verify todos 1-33 all completed. No scope creep. No fabricated content. No romantic content. No hearts.
- [x] F2. Content audit — grep entire src/ for banned terms: heart, soulmate, destiny, "Begin Our Story", ⭐ emoji stars, fake dates, fabricated captions. All must return zero matches.
- [x] F3. Build integrity — production build succeeds, no TS errors, no lint errors, no console errors, no unused imports.
- [x] F4. Visual verification — site visually inspected at mobile (390px) + desktop (1440px). No broken layouts, no overflow, all animations smooth, all interactions work.

## Commit strategy
One commit per todo, in todo order. All commits prefixed with type as marked (feat|chore|fix). No co-authored-by footer needed.

## Success criteria
- [ ] Build succeeds (npm run build exits 0)
- [ ] No fabricated content remains in any source file
- [ ] No romantic content (hearts, soulmate, destiny, forever)
- [ ] Hero plays through cinematic opening sequence (point→line→aperture→photo→titles→ENTER)
- [ ] ENTER button triggers ring burst and scrolls to next section
- [ ] Five Frames: 5 photos displayed once each with unique reveals
- [ ] Photo lightbox: click opens, keyboard swipe nav works
- [ ] "19" portal transition scales on scroll, reveals music section
- [ ] Vinyl player: spinning record, tonearm animation, seek, play/pause
- [ ] Playground: scratch card works, photo developing works, confetti button fires
- [ ] Message section: envelope opens, letter slides out, text unchanged
- [ ] Custom cursor: gold dot+ring on desktop, contextual labels, disabled on touch
- [ ] Ambient sparkles: visible, twinkling, offscreen pause works
- [ ] Hidden 19-click easter egg reveals specified message after 5 clicks
- [ ] "Still here?" appears after 10s in footer, responds to click
- [ ] 6 micro-surprises implemented and working
- [ ] prefers-reduced-motion disables animations, all content visible
- [ ] Keyboard navigation covers all interactive elements
- [ ] Responsive at 320px, 390px, 768px, 1024px, 1440px
- [ ] No horizontal overflow at any breakpoint
- [ ] No console errors
