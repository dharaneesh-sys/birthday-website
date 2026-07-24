# ibhi-birthday-redesign - Work Plan

## TL;DR (For humans)

**What you'll get:** A premium, cinematic birthday website for your friend Ibhi turning 19 — with a dark atmospheric opening, five photos presented artistically one-by-one, a magazine-style profile dossier, a vinyl music player playing her favourite Tamil song, a scratch card, birthday wishes, and a quiet finale. Zero fabricated memories, zero romantic content.

**Why this approach:** The existing site was almost entirely AI-generated fiction. Rather than patch 8 broken chapters, we strip everything and rebuild with proper editorial design, real data you provided, and five actual photographs displayed with quality over quantity.

**What it will NOT do:** No romantic confessions, no heart imagery, no fake memories/stories/dates, no weather widget, no generic compliment lists, no AI poetry, no scroll-jacking, no autoplay audio.

**Effort:** Large
**Risk:** Low - well-scoped, real assets exist, user confirmed all personal data
**Decisions I made for you:** Removed GSAP as primary animation (Framer Motion + Lenis handles all scroll choreography). Removed FloatingStars and CursorTrail effects. Used blue as accent colour (her favourite). Kept hero portrait photo.

Your next move: Review and approve this plan, then execution begins.

---

> TL;DR (machine): Large effort, Low risk - Strip 8 fabricated chapters + 3 widgets + 2 effects from React/Vite project. Rebuild with 12 new sections using real data. 9 implementation waves + 1 final verification wave.

## Scope
### Must have
- Cinematic hero with dark→gold point→line→photo reveal sequence
- 5-photo sticky scroll experience (Five Frames) with unique reveals per photo
- The Ibhi File — magazine dossier with real traits (blue, honest, intelligent, understanding, treats me well)
- "19" signature transition with dramatic scale + clip-path mask
- "ON REPEAT" music section — vinyl player with tonearm animation, seek, progress
- Birthday Playground — redesigned scratch card + Random Frame + confetti button
- Birthday wishes (4-6 short) + user's message
- Dark cinematic finale → "19" → "Happy Birthday Ibhi" → small confetti burst
- Hidden interaction: clicking "19" multiple times
- "Still here?" playful end-of-page detail
- Friendship counter (since Jan 21, 2025) in The Ibhi File
- Chapter-dot navigation with scroll progress
- All five real photos displayed once each, no duplicates
- Cream + champagne gold + charcoal editorial design system
- Custom SVG sparkles replacing emoji stars (reduced 70%+)
- prefers-reduced-motion support
- Keyboard navigation + focus states
- Mobile responsive (360px → 1440px)
- No horizontal overflow

### Must NOT have (guardrails, anti-slop, scope boundaries)
- No fabricated memories, stories, dates, locations, events, captions
- No romantic phrasing: "Begin Our Story", soulmate, destiny, universe, forever, "my person", "I love you"
- No heart shapes, heart imagery, heart constellations, heart particles
- No pink/red romantic palettes or balloons
- No weather widget
- No fake friendship counters (use verified Jan 21, 2025 only)
- No fabricated quiz or Open When content
- No 100 Things / generic compliment lists
- No Three.js, WebGL, shader systems
- No scroll hijacking, aggressive snapping, forced scroll positions
- No autoplay audio
- No fake loading percentages
- No ⭐ emoji stars (use custom SVG sparkles)
- No photo duplication or fake image variations
- No AI-generated sentimental filler text
- No GSAP-dependent animations (Framer Motion + Lenis only)

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- **Test decision:** No formal test framework — visual and functional verification via build + browser inspection
- **Evidence:** .omo/evidence/task-<N>-ibhi-birthday-redesign.md

## Execution strategy
### Parallel execution waves
> Target 5-8 todos per wave.

**Wave 1 (Foundation + Cleanup):** Todos 1-7
**Wave 2 (Hero + Nav):** Todos 8-10
**Wave 3 (Five Frames):** Todos 11-13
**Wave 4 (Ibhi File + 19 Transition):** Todos 14-16
**Wave 5 (Music):** Todos 17-18
**Wave 6 (Playground + Wishes):** Todos 19-21
**Wave 7 (Finale + Hidden):** Todos 22-24
**Wave 8 (Polish):** Todos 25-27
**Wave 9 (Final Build + Verify):** Todos 28-30

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1-4 (remove) | none | 8+ | 5-7 |
| 5 (data dir) | none | 14-15, 19 | 1-4, 6-7 |
| 6 (design tokens) | none | 8+ | 1-5, 7 |
| 7 (clean App.tsx) | 1-4 | 8+ | 5-6 |
| 8 (hero) | 7, 6 | 10 | 9 |
| 9 (nav) | 7 | none | 8 |
| 10 (hero→content transition) | 8 | 11 | 9 |
| 11 (Five Frames) | 10 | 13 | 12 |
| 12 (photo styles) | 6 | 13 | 11 |
| 13 (frame interactions) | 11, 12 | 16 | none |
| 14 (Ibhi File) | 5, 7 | 16 | 15 |
| 15 (19 transition) | 7, 6 | 16 | 14 |
| 16 (section integration) | 13, 14, 15 | 17 | none |
| 17 (music section) | 7, 6 | 18 | none |
| 18 (vinyl player) | 17 | 20 | none |
| 19 (scratch card) | 5, 7 | 20 | 17 |
| 20 (playground section) | 18, 19 | 21 | none |
| 21 (wishes section) | 7, 6 | 22 | 20 |
| 22 (finale) | 7, 6 | 24 | 20-21 |
| 23 (hidden interaction) | 7 | 24 | 22 |
| 24 (end-of-page detail) | 22, 23 | 25 | none |
| 25 (responsive pass) | 24 | 26 | none |
| 26 (a11y + reduced motion) | 24 | 27 | 25 |
| 27 (microinteractions + easing) | 24 | 28 | 25-26 |
| 28 (production build) | 25, 26, 27 | 29 | none |
| 29 (build verification) | 28 | 30 | none |
| 30 (final visual check) | 29 | F1-F4 | none |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE - never rewrite the headers above. -->

### WAVE 1 — Foundation + Cleanup

- [ ] 1. Remove all 8 fabricated chapter components
  What to do / Must NOT do: Delete src/components/chapters/ directory entirely (20 files: 10 .tsx + 10 .css). Remove all imports from App.tsx. Do NOT leave commented-out imports or stubs.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 7
  References: src/App.tsx:4-13, src/components/chapters/ (20 files)
  Acceptance criteria: `ls src/components/chapters/` returns "No such file or directory". `grep -r "Chapter1\|Chapter2\|Chapter3\|Chapter4\|Chapter5\|Chapter6\|Chapter7\|Chapter8\|Chapter9\|Chapter100" src/App.tsx` returns nothing.
  QA scenarios: happy - build succeeds with `npm run build`. Evidence .omo/evidence/task-1-ibhi-birthday-redesign.md
  Commit: Y | refactor(cleanup): remove all 8 fabricated chapter components

- [ ] 2. Remove fabricated widgets (DayCounter, WeatherWidget)
  What to do / Must NOT do: Delete src/components/widgets/DayCounter.tsx, WeatherWidget.tsx. Remove their imports and JSX from App.tsx. Keep ScratchCard.tsx (it gets redesigned later). Remove from the "Little Extras" section in App.tsx.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 7
  References: src/App.tsx:18-19, src/App.tsx:101-105, src/components/widgets/DayCounter.tsx, src/components/widgets/WeatherWidget.tsx
  Acceptance criteria: `grep -r "DayCounter\|WeatherWidget" src/` returns nothing except this todo.
  QA scenarios: happy - build succeeds. Evidence .omo/evidence/task-2-ibhi-birthday-redesign.md
  Commit: Y | refactor(cleanup): remove DayCounter and WeatherWidget

- [ ] 3. Remove fabricated effects (FloatingStars, CursorTrail)
  What to do / Must NOT do: Delete src/components/effects/FloatingStars.tsx. Delete src/components/effects/CursorTrail.tsx. Remove imports and JSX from App.tsx (lines 15-16, 110-111). Do NOT remove the easter-eggs directory.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 7
  References: src/App.tsx:15-16, src/App.tsx:110-111, src/components/effects/FloatingStars.tsx, src/components/effects/CursorTrail.tsx, src/styles/global.css
  Acceptance criteria: `grep -r "FloatingStars\|CursorTrail" src/` returns nothing.
  QA scenarios: happy - build succeeds. Evidence .omo/evidence/task-3-ibhi-birthday-redesign.md
  Commit: Y | refactor(cleanup): remove FloatingStars and CursorTrail effects

- [ ] 4. Remove romantic content from FinalSurprise + EasterEggs
  What to do / Must NOT do: From FinalSurprise.tsx: remove heart-shaped constellation (lines 21-47 CONSTELLATION_STARS, lines 41-47 CONSTELLATION_LINES, lines 263-299 renderConstellation), remove balloons (lines 50-67 BALLOONS, lines 340-359 renderBalloons), remove typewriter text "Out of billions of people... I'm grateful our paths crossed" (lines 316-327), remove 5-second confetti rain with pink colors (lines 208-236). From EasterEggs.tsx: remove "Ibhi is the cutest!" text (line 93). Keep the confetti burst mechanics but use only gold/champagne colors.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 22 (finale is rebuilt later anyway, so this is preparatory)
  References: src/components/final/FinalSurprise.tsx, src/components/easter-eggs/EasterEggs.tsx
  Acceptance criteria: grep for "heart" in src/components/final/ returns nothing. grep for "bil.*people\|paths crossed\|Ibhi is the cutest" returns nothing.
  QA scenarios: happy - build succeeds. Evidence .omo/evidence/task-4-ibhi-birthday-redesign.md
  Commit: Y | refactor(cleanup): remove romantic content from FinalSurprise and EasterEggs

- [ ] 5. Create centralized data directory with config files
  What to do / Must NOT do: Create src/data/ directory. Create files:
  - src/data/birthdayConfig.ts — export const BIRTHDAY = { name: "Ibhi", age: 19, birthDate: "2007-10-16", friendshipStart: "2025-01-21", favouriteColour: "blue", traits: ["her honesty", "her intelligence", "her capability of understanding", "how she treats me"] }
  - src/data/photos.ts — export const photos = [ array of 5 photo objects with id, src path, alt text (empty string for now since no captions), orientation derived from image dimensions ]
  - src/data/music.ts — export const music = { src: "/music/favourite-track/_Ninaithu_Ninaithu_Parthen_Female_Version_Tamil_Ringtone_(by Fringster.com).mp3", title: "Ninaithu Ninaithu Parthen", artist: "Female Version", language: "Tamil" }
  - src/data/wishes.ts — export const wishes = [ user's message as first entry: "Happy birthday to you. Be happy and healthy." plus 3-5 short warm wishes ]
  Must NOT fill null fields with fabricated content. Must NOT invent data.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 14, 15, 19, 21
  References: src/data/ (create), user confirmed data: birthday 16/10/2007, friendship 21/1/2025, colour blue, traits as listed, message "Happy birthday to you. Be happy and healthy."
  Acceptance criteria: `ls src/data/*.ts` shows at least 4 files. `grep -r "null\|undefined" src/data/` — nulls are acceptable only for unfilled optional fields.
  QA scenarios: happy - all files export valid data, imports compile. Evidence .omo/evidence/task-5-ibhi-birthday-redesign.md
  Commit: Y | feat(data): create centralized data directory with real personal info

- [ ] 6. Set up global design system (CSS tokens + index.css)
  What to do / Must NOT do: Update src/index.css with design tokens:
  :root { --cream: #F8F5EF; --gold: #C8A46B; --gold-light: #E0C99A; --charcoal: #2B2B2B; --warm-gray: #6B6B6B; --accent-blue: #4A90D9; --paper-texture: url("data:image/svg+xml,..."); --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1); } 
  Add paper texture as SVG data URI subtle overlay. Add font declarations for Cormorant Garamond, Source Serif 4, Caveat. Add smooth scroll (html.lenis). Remove Playfair Display references (use Cormorant Garamond as primary serif). Add utility classes for editorial numbering, thin rules. Keep existing Lenis styles and reduced-motion media query.
  Must NOT include unused font imports. Must NOT remove the existing Lenis CSS.
  Parallelization: Wave 1 | Blocked by: none | Blocks: 8+
  References: src/index.css (current), src/styles/global.css, spec §36-40
  Acceptance criteria: `grep "Cormorant Garamond" src/index.css` exists. `grep "Playfair Display" src/` returns nothing (replaced). Build succeeds.
  QA scenarios: happy - build succeeds. Evidence .omo/evidence/task-6-ibhi-birthday-redesign.md
  Commit: Y | feat(design): establish cream/gold/charcoal editorial design system with paper texture

- [ ] 7. Clean App.tsx — remove all deleted imports and sections
  What to do / Must NOT do: Rewrite src/App.tsx to remove: all chapter imports, DayCounter/WeatherWidget imports, FloatingStars/CursorTrail imports, the entire "bonus" section (lines 97-107), the chapter navigation (lines 49-65), all min-height sections (lines 66-95), the 3-phase state (loading/hero/chapters). New App.tsx structure: single phase flow. Import Hero, SoundProvider, Lenis setup. Only render Hero → scroll content sections. Navigation gets its own component. Remove BootSequence.js, Desktop.jsx, Desktop.css, Desktop.jsx.new, WindowFrame.jsx, WindowFrame.css, CountdownTimer.jsx, CountdownTimer.css, MemoriesSection.jsx, MemoriesSection.css, MemoryTimeline.jsx, MemoryTimeline.css, MessageSection.jsx, MessageSection.css, Guestbook.jsx, Guestbook.css, Footer.jsx, Footer.css, Settings.jsx, Settings.css, HeroSection.jsx, HeroSection.css, MusicPlayer.jsx, MusicPlayer.css if they still exist (check first).
  Parallelization: Wave 1 | Blocked by: 1, 2, 3, 4 | Blocks: 8+
  References: src/App.tsx (full file), spec §44
  Acceptance criteria: `grep -c "import" src/App.tsx` is less than 10 (clean slate). Build succeeds.
  QA scenarios: happy - `npm run build` succeeds with no imports from deleted files. Evidence .omo/evidence/task-7-ibhi-birthday-redesign.md
  Commit: Y | refactor(cleanup): clean App.tsx - remove all deleted section imports and 3-phase state

### WAVE 2 — Hero + Navigation

- [ ] 8. Build cinematic hero with point→line→photo reveal
  What to do / Must NOT do: Create src/components/hero/ (dir). Create Hero.tsx and Hero.css inside. Implement spec §12 opening sequence:
  0.0s — black screen
  0.5s — champagne-gold point appears (tiny CSS dot, centered, 4px, border-radius 50%, opacity transition)
  1.0s — point expands into thin horizontal line (width transition from 4px to 120px, height 1.5px)
  1.5s — line becomes photographic aperture — clip-path circle(0%) → circle(70%) revealing hero photo behind
  2.2s — "HAPPY 19TH BIRTHDAY" fades in (Cormorant Garamond italic, gold, tracking 0.3em, uppercase)
  2.8s — "Ibhi" fades in (Cormorant Garamond, 9rem clamp, white)
  3.3s — "A little something for your 19th." (Source Serif 4, italic, warm gray)
  3.8s — CTA "ENTER →" button (cream/gold border, pill shape, hover lift)
  Hero photo: /images/ibhi-friend/1741450804644.jpg (1200×1600 portrait) — NOT the memories photos
  Must NOT: autoplay audio, use "Begin Our Story", use hearts, use particle effects, animate every frame on reduced-motion
  Must implement: prefers-reduced-motion → instant reveal of all content, no animation
  Must implement: keyboard accessible CTA button (tabIndex, Enter to proceed)
  Must implement: smooth fade-to-next-section on CTA click
  Use framer-motion for orchestration. Use Lenis for scroll-to-next-section after CTA.
  Parallelization: Wave 2 | Blocked by: 7, 6 | Blocks: 10
  References: spec §12-15, src/components/landing/Hero.tsx (old - study for existing photo reference, reuse nothing), /public/images/ibhi-friend/1741450804644.jpg
  Acceptance criteria: Hero renders with all timing steps. CTA click transitions to content. reduced-motion skips all animations. Build succeeds.
  QA scenarios: happy - hero plays through full sequence. failure - CTA clicked before image loads (show fallback gradient). Evidence .omo/evidence/task-8-ibhi-birthday-redesign.md
  Commit: Y | feat(hero): build cinematic opening with point-to-line-to-photo reveal

- [ ] 9. Build scroll progress navigation
  What to do / Must NOT do: Create src/components/Navigation.tsx + Navigation.css. Implement minimal progress indicator with section dots. Possible labels: "OPEN · FRAMES · FILE · REPEAT · PLAY · WISHES · FINALE" OR just dots. Desktop hover reveals section name. Mobile: compact dots only. Active dot = gold filled, rest = gold outline/low opacity. Click dot scrolls to section. Use Lenis scrollTo. Navigation is fixed at top, transparent on hero, cream on content sections. Must respond to scroll position. Must have proper aria-labels. Must have 44px touch targets on mobile.
  Parallelization: Wave 2 | Blocked by: 7 | Blocks: none
  References: spec §44, old App.tsx lines 49-65 (study old nav)
  Acceptance criteria: 7 dots shown. Clicking a dot scrolls to correct section. Active dot updates on scroll. Touch targets ≥44px. Build succeeds.
  QA scenarios: happy - all 7 dots clickable, active dot follows scroll. failure - dot clicked but section doesn't exist yet. Evidence .omo/evidence/task-9-ibhi-birthday-redesign.md
  Commit: Y | feat(navigation): add scroll progress navigation with section dots

- [ ] 10. Build hero→content transition
  What to do / Must NOT do: Create the transition from hero to first content section (Five Frames). When user clicks "ENTER →": hero photo scales up subtly (scale 1→1.05), gold CTA fades out, "Happy 19th Birthday Ibhi" text separates and fades, photo fades to dark, then first content section scrolls in. Use Framer AnimatePresence or scroll-triggered animation. Duration ~800ms. Must feel continuous, not like a page change. If practical, use a clip-path aperture/mask transition between hero photo and first content.
  Parallelization: Wave 2 | Blocked by: 8 | Blocks: 11
  References: spec §15, src/components/landing/Hero.tsx
  Acceptance criteria: CTA click triggers smooth ~800ms transition. Content section appears after transition completes. Build succeeds.
  QA scenarios: happy - smooth transition, no flash/glitch. reduced-motion - instant transition no animation. Evidence .omo/evidence/task-10-ibhi-birthday-redesign.md
  Commit: Y | feat(hero): add hero-to-content transition with aperture mask

### WAVE 3 — Five Frames

- [ ] 11. Build Five Frames sticky scroll experience
  What to do / Must NOT do: Create src/components/five-frames/ (dir). Create FiveFrames.tsx + FiveFrames.css. Implement sticky container using Lenis + IntersectionObserver or Framer Motion useScroll. Viewport becomes photographic stage. As user scrolls through the section:
  FRAME 01 — Large centered editorial photo, aperture clip-path reveal
  FRAME 02 — Split-screen / vertical paper-unfold reveal
  FRAME 03 — Full-width, blur→focus on scroll reveal
  FRAME 04 — Polaroid/editorial paper treatment with subtle shadow and rotation
  FRAME 05 — Dark cinematic environment, moving exposure/light reveal
  Each frame label: "FRAME 01" etc (editorial number, gold, serif). Use the 5 photos from src/data/photos.ts. Do NOT add captions (user said "need to think"). Simplify on mobile: reduce sticky complexity, use simpler scroll reveals instead of pinned stage. Must NOT duplicate photos. Must NOT fake captions.
  All 5 photos from public/images/memories/: IMG20250506144456.jpg (portrait 3264x2448), IMG_20250510_152025_341.jpg (landscape 816x612), IMG_20250510_152113_459.jpg (landscape 816x612), IMG_20250510_152120_608.jpg (landscape 816x612), IMG_20250510_152134_431.jpg (portrait 3264x2448)
  Parallelization: Wave 3 | Blocked by: 10 | Blocks: 13
  References: spec §16-19, src/data/photos.ts, public/images/memories/
  Acceptance criteria: 5 photos appear once each. Each has unique reveal treatment. No captions visible. Mobile experience works. Build succeeds.
  QA scenarios: happy - scroll through all 5 frames, each animates uniquely. failure - scroll fast backward, no broken state. mobile - touch scroll works. reduced-motion - simpler reveals. Evidence .omo/evidence/task-11-ibhi-birthday-redesign.md
  Commit: Y | feat(five-frames): add sticky scroll photo experience with 5 unique reveals

- [ ] 12. Add photo viewer modal for Five Frames
  What to do / Must NOT do: Create click/tap handler on each frame to open fullscreen photo viewer. Viewer features: close button, previous/next navigation, keyboard support (Escape close, ArrowLeft/Right navigate), touch swipe (use basic touch events), proper focus trapping, accessible aria-modal dialog. Subtle pointer depth on desktop photos (rotateX ±1deg, rotateY ±1deg on mouse move) — NOT exaggerated. Must NOT have swipe library dependency — use native touch events. Must NOT add captions to viewer.
  Parallelization: Wave 3 | Blocked by: 11 | Blocks: 13
  References: spec §19, old Chapter2Gallery.tsx (study for reference but don't copy)
  Acceptance criteria: Click photo opens viewer. Keyboard navigation works. Touch swipe works. Escape closes. Build succeeds.
  QA scenarios: happy - open, navigate all 5, close. mobile - touch swipe. keyboard - arrows + esc. Evidence .omo/evidence/task-12-ibhi-birthday-redesign.md
  Commit: Y | feat(five-frames): add fullscreen photo viewer with keyboard and touch support

- [ ] 13. Add subtle parallax depth to frames
  What to do / Must NOT do: Add very restrained multi-layer parallax within Five Frames section. Background texture moves very slow, frame photo moves moderate, foreground label moves normal. Use Framer Motion useScroll + useTransform. Parallax range: ±15px max for foreground, ±5px for background. NOT exaggerated — barely noticeable. Mobile: disable parallax entirely. Must NOT apply parallax to body text or navigation.
  Parallelization: Wave 3 | Blocked by: 11, 12 | Blocks: 16
  References: spec §42-43
  Acceptance criteria: Subtle parallax visible on desktop. No parallax on mobile or reduced-motion. Build succeeds.
  QA scenarios: happy - scroll, notice subtle depth on frames. reduced-motion - no parallax movement. mobile - no parallax. Evidence .omo/evidence/task-13-ibhi-birthday-redesign.md
  Commit: Y | feat(five-frames): add restrained parallax depth to photo frames

### WAVE 4 — Ibhi File + 19 Transition

- [ ] 14. Build The Ibhi File section
  What to do / Must NOT do: Create src/components/IbhiFile.tsx + IbhiFile.css. Premium magazine profile / birthday dossier design. Title: "THE IBHI FILE" (large editorial, gold). Subtitle: "BIRTHDAY EDITION — 19" (small, italic). Content rows showing real data:
  Name: Ibhi
  Age: 19
  Birthday: 16.10.07
  Favourite Colour: Blue
  Known For: Her honesty, her intelligence, her capability of understanding, how she treats me
  Since: 21.01.2025 (with subtle day counter — calculate days since Jan 21, 2025 to today)
  Include friendship counter as a subtle number (gold, serif) near "Since" line: "XXX days of friendship"
  Design: magazine-style layout with thin gold rules, editorial numbering, serif typography. Clean, spacious, elegant. No cards. No white rounded rectangles. Treat it like a premium magazine profile page. Use section heading ornament (❖ or custom divider).
  Must NOT add fields that weren't provided (no favourite food, movie, hobbies). Must NOT add fabricated quotes or personality descriptions beyond the 4 traits. Must NOT use "100 things" format. Must NOT use romantic language.
  Parallelization: Wave 4 | Blocked by: 5, 7 | Blocks: 16
  References: spec §20-22, src/data/birthdayConfig.ts
  Acceptance criteria: All 4 traits displayed. Friendship counter shows correct number. Birthday and colour shown. No null/fabricated fields visible. Build succeeds.
  QA scenarios: happy - all confirmed data renders correctly. counter calculation is correct. mobile - text wraps well. Evidence .omo/evidence/task-14-ibhi-birthday-redesign.md
  Commit: Y | feat(ibhi-file): add The Ibhi File magazine profile section with friendship counter

- [ ] 15. Build "19" signature typography transition
  What to do / Must NOT do: Create src/components/NineteenTransition.tsx + NineteenTransition.css. A dramatic scroll-driven moment where "19" occupies nearly the entire viewport. During scroll: 19 scales from ~30vw to ~80vw. Use the negative space of the digits as a clip-path mask revealing the next section. Use CSS clip-path or mask-image with the 19 text. Implementation: use Framer Motion useScroll + useTransform for scale. OR use CSS position: sticky with transform. Must NOT use WebGL. Must NOT use shader systems. Must feel like one of the site's signature moments. Approximately 100vh of scroll space for the transition. On mobile: reduce scale range, ensure text still readable. Must NOT trap user in scroll section.
  Parallelization: Wave 4 | Blocked by: 7, 6 | Blocks: 16
  References: spec §23, spec §26 (may transition into music section — circle→vinyl concept)
  Acceptance criteria: 19 scales dramatically on scroll. Clip-path/mask reveals next section underneath. Works on mobile. reduced-motion: simplified scale without mask. Build succeeds.
  QA scenarios: happy - scroll through, 19 fills viewport, reveals next section. mobile - works without overflow. fast scroll - no jump/glitch. Evidence .omo/evidence/task-15-ibhi-birthday-redesign.md
  Commit: Y | feat(transition): add signature "19" typography transition with clip-path mask

- [ ] 16. Connect Ibhi File and 19 transition sections in App
  What to do / Must NOT do: Wire the sections together in App.tsx. Layout: Five Frames → The Ibhi File → 19 Transition → ON REPEAT (music). Ensure proper scroll continuity. Add section IDs for navigation dots. Remove any min-height: 100vh from content sections (only hero + 19 transition + finale get full viewport). Ensure smooth section transitions. Import and register all new components.
  Parallelization: Wave 4 | Blocked by: 13, 14, 15 | Blocks: 17
  References: src/App.tsx (current), spec §44
  Acceptance criteria: All 3 sections render in order. Navigation dots link to correct sections. Scroll is smooth. Build succeeds.
  QA scenarios: happy - navigate between all sections. mobile - scroll works without jank. Evidence .omo/evidence/task-16-ibhi-birthday-redesign.md
  Commit: Y | feat(app): wire together Five Frames, Ibhi File, and 19 transition sections

### WAVE 5 — Music

- [ ] 17. Rename and restructure music section to "ON REPEAT"
  What to do / Must NOT do: Create src/components/OnRepeat.tsx + OnRepeat.css. Section title: "ON REPEAT" (large, gold, editorial). Subtitle: none or "her favourite track" (small, italic). Remove existing title "Music That Reminds Me Of You" and subtitle "Every note carries a memory of us". Keep the vinyl visual concept from old Chapter5Music.tsx but upgrade it. Section should sit below the 19 transition. Transition from 19 to music: 19 mask contracts → becomes vinyl center label. OR circular element grows from 19 transition → becomes vinyl. Must feel visually connected.
  Parallelization: Wave 5 | Blocked by: 7, 6 | Blocks: 18
  References: spec §24-26, src/components/chapters/Chapter5Music.tsx (old), src/data/music.ts
  Acceptance criteria: Section titled "ON REPEAT". No romantic wording. Build succeeds.
  QA scenarios: happy - section renders with correct title. scroll transition from 19 works. Evidence .omo/evidence/task-17-ibhi-birthday-redesign.md
  Commit: Y | feat(music): restructure music section as "ON REPEAT" with vinyl concept

- [ ] 18. Upgrade vinyl player with full controls
  What to do / Must NOT do: Build on existing vinyl player from old Chapter5Music.tsx. Keep: visual turntable, spinning vinyl, tonearm. Upgrade: PLAY button triggers tonearm move toward record → brief pause → record spins → audio fades in. PAUSE: audio pauses, record decelerates naturally. END: record slows, tonearm returns. Add proper: progress bar with seek, elapsed time / duration display, mute button, keyboard accessibility (Space to play/pause), touch support. Vinyl animation must correspond to actual playback state. Tonearm position must reflect play/pause state (on-record vs resting). Use AudioContext for smooth fade in/out if needed. Must NOT autoplay. Must NOT show romantic text. Must NOT show "Music That Reminds Me Of You" anywhere.
  Audio src: /music/favourite-track/_Ninaithu_Ninaithu_Parthen_Female_Version_Tamil_Ringtone_(by Fringster.com).mp3
  Track info: "Ninaithu Ninaithu Parthen — Female Version (Tamil)"
  Parallelization: Wave 5 | Blocked by: 17 | Blocks: 20
  References: spec §25, src/components/chapters/Chapter5Music.tsx (study old implementation), src/data/music.ts
  Acceptance criteria: Play/pause works. Tonearm animates on play. Progress bar seeks. Keyboard accessible. Touch works. File not found error handled gracefully. Build succeeds.
  QA scenarios: happy - play, seek, pause, mute all work. failure - audio file missing (show disabled player gracefully). mobile - touch controls work. keyboard - Space toggles play. Evidence .omo/evidence/task-18-ibhi-birthday-redesign.md
  Commit: Y | feat(music): upgrade vinyl player with tonearm animation, seek, and keyboard support

### WAVE 6 — Playground + Wishes

- [ ] 19. Redesign scratch card to cream/gold editorial style
  What to do / Must NOT do: Update src/components/widgets/ScratchCard.tsx. Replace purple gradient background with cream (#F8F5EF). Replace gold gradient top layer with cream + gold border/pattern. Hidden message: "HAPPY 19TH, IBHI! 🎉" (large) then "Hope 19 treats you well." (smaller). Remove "You're the most amazing person I know", "every moment has been a treasure", "With lots of love and laughter". Replace scratch layer design with paper-texture-like gold pattern. Keep: canvas scratch mechanics, 65% auto-reveal, small confetti burst on complete, reset button. Change confetti colors to gold/champagne only. Must NOT have romantic text. Must match cream/gold editorial direction.
  Parallelization: Wave 6 | Blocked by: 5, 7 | Blocks: 20
  References: src/components/widgets/ScratchCard.tsx, spec §31
  Acceptance criteria: Scratch card shows cream/gold design. Hidden message is "Happy 19th, Ibhi!" + "Hope 19 treats you well". Scratching reveals message. Auto-reveals at 65%. Confetti burst on complete. Build succeeds.
  QA scenarios: happy - scratch fully, message revealed, confetti fires. mobile - touch scratch works. reset - resets canvas. Evidence .omo/evidence/task-19-ibhi-birthday-redesign.md
  Commit: Y | feat(scratch): redesign scratch card to cream/gold editorial style

- [ ] 20. Build Birthday Playground section
  What to do / Must NOT do: Create src/components/Playground.tsx + Playground.css. Section title: "BIRTHDAY PLAYGROUND" (editorial, gold). Subtitle: "A few small things" (italic, warm gray). Contains:
  - Scratch Card (reuse from widget, positioned center)
  - Random Frame button: clicking selects one of 5 photos randomly, shows it with a mini animation (photo develops / slides from mini printer / flips from stack)
  - Confetti Button: click triggers gold/champagne confetti burst
  Layout: single column on mobile, 2-3 column grid on desktop. Compact section — approx 70vh, not full screen. Playful but polished. Must NOT include weather, fake counters, fake statistics. Must NOT have romantic elements.
  Parallelization: Wave 6 | Blocked by: 18, 19 | Blocks: 21
  References: spec §32-33, spec §31
  Acceptance criteria: All 3 widgets render. Scratch card works. Random Frame picks a random photo with animation. Confetti button fires gold confetti. Build succeeds.
  QA scenarios: happy - all 3 interactions work. mobile - touch works on all 3. Evidence .omo/evidence/task-20-ibhi-birthday-redesign.md
  Commit: Y | feat(playground): add Birthday Playground with scratch card, random frame, confetti

- [ ] 21. Build Birthday Wishes section
  What to do / Must NOT do: Create src/components/Wishes.tsx + Wishes.css. Section title: "BIRTHDAY WISHES" (editorial, gold). Subtitle: "A few words for 19" (italic, warm gray). Display 4-5 wishes in a clean, editorial layout. User's message first: "Happy birthday to you. Be happy and healthy." Create 3-4 additional short, natural, warm wishes that are birthday-focused and friendship-appropriate. These must NOT be AI-generated sentiment. Keep them simple:
  e.g. "Hope 19 treats you well."
  e.g. "More good days, good people, and good stories."
  e.g. "Keep doing the things that make you, you."
  Layout: stacked cards or list with thin gold dividers. Serif typography. No decorative stars. No romantic language. No "universe", "destiny", "soul", "forever", "blessing", "cherished".
  Parallelization: Wave 6 | Blocked by: 7, 6 | Blocks: 22
  References: spec §30, src/data/wishes.ts, user message: "Happy birthday to you. Be happy and healthy."
  Acceptance criteria: 4-5 wishes displayed. User's message is first. No romantic or AI-sounding language. Build succeeds.
  QA scenarios: happy - all wishes render. mobile - text wraps well. Evidence .omo/evidence/task-21-ibhi-birthday-redesign.md
  Commit: Y | feat(wishes): add Birthday Wishes section with user's message

### WAVE 7 — Finale + Hidden

- [ ] 22. Build dark cinematic finale
  What to do / Must NOT do: Create src/components/Finale.tsx + Finale.css. Dark / near-black background. Sequence:
  1. Section scrolls into view — environment is dark, quiet
  2. Brief moment where the 5 photos flash if compositionally appropriate (5 photos arranged in a clean row, fade in briefly then fade out)
  3. Large "19" appears (white, serif)
  4. "Happy Birthday" appears below (gold, italic)
  5. "Ibhi" appears below that (white, serif, large)
  6. Pause
  7. "Hope 19 treats you well." (warm gray, italic, smaller)
  8. Small confetti burst (gold/champagne only, NOT pink/red) — single burst, not continuous
  Must NOT have hearts, balloons, pink confetti, romantic text. Must feel cinematic but restrained. On reduced-motion: show all content at once without timed delays. Must have keyboard accessibility.
  Parallelization: Wave 7 | Blocked by: 7, 6 | Blocks: 24
  References: spec §55-56
  Acceptance criteria: Dark background. Sequence plays through. Confetti bursts once. No hearts or pink colors. Build succeeds.
  QA scenarios: happy - full sequence plays. reduced-motion - all content visible instantly. Evidence .omo/evidence/task-22-ibhi-birthday-redesign.md
  Commit: Y | feat(finale): add dark cinematic finale with photo flash and confetti

- [ ] 23. Build hidden "19" click interaction
  What to do / Must NOT do: Add interaction to the "19" in the finale (or the signature 19 transition). Tracking variable: count how many times user clicks "19". After 5 clicks (not announced), reveal subtle message. Message appears as floating text:
  "You found the part I wasn't going to make obvious." (pause 2s)
  "You're pretty important to me." (pause 2s)
  "That's all you're getting from this button. :)" (persists)
  Must NOT advertise this. Must NOT add hint text. Must NOT trigger on touch devices accidentally (use click, not tap). Message fades in with smooth animation. Configurable: enableHiddenNote: true in birthdayConfig.ts. Must NOT add additional secret emotional messages. This is the MAXIMUM emotional allowance.
  Parallelization: Wave 7 | Blocked by: 7 | Blocks: 24
  References: spec §34
  Acceptance criteria: Clicking "19" 5 times reveals the message. No hint given before trigger. Message text is exactly as specified. Build succeeds.
  QA scenarios: happy - click 19 five times, message appears. failure - less than 5 clicks, no message. Evidence .omo/evidence/task-23-ibhi-birthday-redesign.md
  Commit: Y | feat(hidden): add hidden 19-click interaction with subtle message

- [ ] 24. Build end-of-page "Still here?" detail
  What to do / Must NOT do: After finale, at very bottom of page. Initially show: "↑ REPLAY" link (click scrolls smoothly to top). If user stays on page for 8-10 seconds after finale appears (use IntersectionObserver + timer), show playful detail:
  "Still here?" (small, italic, warm gray, fade in)
  After clicking/interacting: "I spent way too much time on this." → "Worth it though." with small confetti burst.
  Must NOT interrupt or trap user. Must NOT appear if user scrolls away. Must be playful, not romantic. On mobile: same behavior but touch-friendly.
  Parallelization: Wave 7 | Blocked by: 22, 23 | Blocks: 25
  References: spec §57
  Acceptance criteria: Replay link scrolls to top. After 8-10s, "Still here?" appears. Click yields playful response. Build succeeds.
  QA scenarios: happy - stay 10s, see message, click for response. leave early - no message. Evidence .omo/evidence/task-24-ibhi-birthday-redesign.md
  Commit: Y | feat(finale): add end-of-page replay and playful "Still here?" detail

### WAVE 8 — Polish

- [ ] 25. Responsive pass across all sections
  What to do / Must NOT do: Verify every section at 360px, 390px, 768px, 1024px, 1440px. Fix: horizontal overflow, bad text wrapping, clipped typography, poor image crops, overlapping elements, broken sticky sections, incorrect z-index, oversized whitespace, tiny controls (<44px touch targets), navigation collisions, canvas sizing problems, vinyl clipping, modal overflow. Five Frames: simplify sticky behavior on mobile (use simpler scroll reveals instead of pinned stage). Parallax: disable on mobile. Reduce expensive clip-path masks on mobile. No horizontal overflow allowed anywhere. Use CSS media queries or Tailwind responsive classes.
  Parallelization: Wave 8 | Blocked by: 24 | Blocks: 26
  References: spec §50, spec §64
  Acceptance criteria: Page renders without horizontal overflow at 360px-1440px. All touch targets ≥44px. No text overflow. Build succeeds.
  QA scenarios: happy - check at 360, 390, 768, 1024, 1440. no overflow. Evidence .omo/evidence/task-25-ibhi-birthday-redesign.md
  Commit: Y | fix(responsive): responsive polish across all breakpoints 360px-1440px

- [ ] 26. Accessibility + reduced-motion pass
  What to do / Must NOT do: Ensure: semantic HTML throughout (section, nav, article, button, h1-h3 hierarchy), keyboard navigation through all interactive elements, visible focus states (gold outline, not browser default), appropriate alt text on all images (empty alt for decorative, descriptive alt for meaningful), ARIA labels on interactive controls, proper aria-expanded/aria-controls on expandable elements, sufficient contrast ratios (gold on cream may need darkening for small text, use #B8944F for small gold text on cream), proper touch target sizes (44px minimum). prefers-reduced-motion: all animations use reduced-motion fallbacks. Lenis disabled when reduced-motion. All scroll-triggered animations simplified. Parity: reduced-motion mode should still feel polished, just without movement. Test: toggle OS reduced-motion setting.
  Parallelization: Wave 8 | Blocked by: 24 | Blocks: 27
  References: spec §51
  Acceptance criteria: Tab through entire site — all interactive elements reachable. Focus rings visible on all elements. Reduced-motion removes animations but site is still complete. Build succeeds.
  QA scenarios: happy - keyboard nav works end-to-end. reduced-motion - no animations but all content visible. Evidence .omo/evidence/task-26-ibhi-birthday-redesign.md
  Commit: Y | fix(a11y): accessibility and reduced-motion pass across all sections

- [ ] 27. Microinteractions + easing system
  What to do / Must NOT do: Apply consistent easing system: microinteractions 150-300ms (cubic-bezier(0.22, 1, 0.36, 1)), UI transitions 300-600ms, section reveals 600-1000ms, signature cinematic 1000-1800ms. Add microinteractions: buttons get subtle magnetic response on desktop (transform: translateY(-1px) on hover, scale 0.97 on press), cards get tiny lift with shadow response, navigation dots smooth active state, music controls tactile feedback, links animated underline. Do NOT animate every element — focus on interactive elements only. Do NOT make everything slow. Do NOT add hover effects on touch devices. Use framer-motion whileHover/whileTap for button interactions.
  Parallelization: Wave 8 | Blocked by: 24 | Blocks: 28
  References: spec §45-46
  Acceptance criteria: Buttons have hover/press feedback. Easing feels consistent. No animations on touch devices where hover doesn't apply. Build succeeds.
  QA scenarios: happy - hover buttons, feel magnetic response. tap buttons on mobile - no unwanted hover states. Evidence .omo/evidence/task-27-ibhi-birthday-redesign.md
  Commit: Y | feat(polish): add microinteractions and consistent easing system

### WAVE 9 — Final Build + Verify

- [ ] 28. Run production build and check for errors
  What to do / Must NOT do: Run `npm run build`. Fix any compilation errors, TypeScript errors, missing imports, broken asset references. Check console in dist/index.html for any runtime warnings. Remove unused dependencies from package.json: react-icons (if unused), gsap (if unused), swiper (if unused), @studio-freight/lenis (verify used). Run `npm run lint` and fix any lint issues. Do NOT add new features during this pass.
  Parallelization: Wave 9 | Blocked by: 25, 26, 27 | Blocks: 29
  References: package.json, spec §72
  Acceptance criteria: `npm run build` exits with 0. `npm run lint` exits with 0 (or acceptable warnings). dist/ directory has valid files. Evidence .omo/evidence/task-28-ibhi-birthday-redesign.md
  Commit: Y | chore(build): production build verification and dependency cleanup

- [ ] 29. Full content audit — verify no fabricated content remains
  What to do / Must NOT do: Search entire src/ directory for any remaining: fabricated memories, fake dates (except verified 16/10/2007 and 21/01/2025), fake locations, romantic language (soul, destiny, universe, forever, "my person", "I love you"), heart imagery, "Begin Our Story", "100 Things", "Future Adventures", "Our Favourite Memories", weather references, fake friendship counters. Check all components, data files, CSS files. Check for remaining ⭐ emoji stars. Check all photo references are to real existing files. Verify only the 5 memories photos + 1 hero photo are used (no reference to non-existent images).
  Parallelization: Wave 9 | Blocked by: 28 | Blocks: 30
  References: spec §68
  Acceptance criteria: grep search for all prohibited terms returns nothing. All photo paths in code correspond to actual files. No ⭐ emoji stars in JSX. Build succeeds.
  QA scenarios: happy - search complete, no prohibited content found. Evidence .omo/evidence/task-29-ibhi-birthday-redesign.md
  Commit: Y | chore(audit): final content audit - no fabricated or romantic content remains

- [ ] 30. End-to-end experience verification
  What to do / Must NOT do: Start from fresh page load. Walk through: Hero → Five Frames → The Ibhi File → 19 Transition → ON REPEAT → Birthday Playground → Wishes → Finale → Replay. Verify: navigation dots track correctly, all interactions work, no console errors, no broken images, no layout shifts, smooth scrolling, audio works, scratch card works, confetti fires, hidden interaction triggers, "Still here?" appears. Check at 390px mobile + 1440px desktop. Check keyboard navigation works end-to-end. Check reduced-motion. Record any issues found. This is a full QA pass, not a fix pass — fix issues found.
  Parallelization: Wave 9 | Blocked by: 29 | Blocks: F1-F4
  References: spec §67, spec §69-73
  Acceptance criteria: All sections render correctly. All interactions work. No console errors. No broken assets. Build succeeds.
  QA scenarios: happy - full walkthrough passes. mobile - all touch interactions work. keyboard - tab through entire site. Evidence .omo/evidence/task-30-ibhi-birthday-redesign.md
  Commit: Y | chore(qa): end-to-end verification pass

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit — verify todos 1-30 all completed. No scope creep. No fabricated content. No romantic content.
- [ ] F2. Content audit — grep entire project for banned terms: hearts, soulmate, destiny, Begin Our Story, 100 Things, fabricated captions, fake dates, ⭐ emoji
- [ ] F3. Build integrity — production build succeeds, no TS errors, no lint errors, no console errors
- [ ] F4. Visual verification — site visually inspected at mobile + desktop, no broken layouts, no overflow, all animations smooth

## Commit strategy
One commit per todo, in todo order. All commits prefixed with type as marked (feat|refactor|fix|chore). Footer: "Ultraworked with Sisyphus" + Co-authored-by trailer.

## Success criteria
- [ ] Build succeeds (npm run build exits 0)
- [ ] No fabricated content remains in any source file
- [ ] No romantic content (hearts, soulmate, destiny, forever, "Begin Our Story")
- [ ] All 5 real photos displayed once in Five Frames
- [ ] Hero plays through cinematic sequence
- [ ] Navigation scrolls to correct sections
- [ ] Friendship counter shows correct days since Jan 21, 2025
- [ ] Vinyl player plays/pauses/seeks correctly
- [ ] "ON REPEAT" section title used, no romantic music description
- [ ] Scratch card reveals "Happy 19th, Ibhi! Hope 19 treats you well."
- [ ] Hidden "19" click interaction reveals specified message
- [ ] End-of-page "Still here?" detail works
- [ ] The Ibhi File shows only real confirmed data
- [ ] "Hope 19 treats you well" in finale
- [ ] prefers-reduced-motion disables animations
- [ ] Keyboard navigation covers all interactive elements
- [ ] Responsive at 360px, 390px, 768px, 1024px, 1440px
- [ ] No horizontal overflow
- [ ] No console errors
