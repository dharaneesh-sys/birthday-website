---
slug: ibhi-birthday-magic-recovery
status: awaiting-approval
intent: clear
review_required: true
pending-action: write .omo/plans/ibhi-birthday-magic-recovery.md
approach: Add controlled magic, delight, and birthday energy to the existing clean-but-sterile ibhi birthday website. Preserve all factual/content rules. No fabricated memories, no romantic content. Add Framer Motion for animations, SVG ambient sparkles + Canvas confetti, photo lightbox viewer. Three signature moments: Hero cinematic opening, 19 Portal transition, Photo developing effect. Incremental implementation with visual verification.
---

# Draft: ibhi-birthday-magic-recovery

## Components (topology ledger)
<!-- Lock the SHAPE before depth. One row per top-level component that can succeed or fail independently. -->
<!-- id | outcome (one line) | status: active|deferred | evidence path -->

| id | outcome | status | evidence |
|----|---------|--------|----------|
| C1 | Framer Motion + animation system | active | src/hooks/useScrollReveal.js replaced |
| C2 | Magic Layer (sparkles, dust, ambient life) | active | new src/components/magic/ |
| C3 | Hero cinematic opening sequence | active | src/components/HeroSection.tsx reworked |
| C4 | Photo section → Five Frames sticky scroll | active | src/components/MemoriesSection.tsx reworked |
| C5 | Photo lightbox viewer | active | new component |
| C6 | "19" signature portal transition | active | new section |
| C7 | Vinyl music player redesign | active | src/components/MusicPlayer.tsx reworked |
| C8 | Birthday Playground (scratch card, random frame, confetti) | active | reworked Playground |
| C9 | Magic section transitions | active | per-section personality |
| C10 | Cursor magic (desktop only) | active | new src/hooks/useCustomCursor.ts |
| C11 | Ambient background life | active | part of magic layer |
| C12 | Light leaks + photo effects | active | part of magic layer |
| C13 | Confetti system | active | Canvas-based |
| C14 | Envelope/paper physical feel for message | active | MessageSection reworked |
| C15 | Sound cues system | deferred | low priority, revisit after main magic |
| C16 | Handwritten annotations | active | new CSS/component |
| C17 | Playful copy + humor | active | copy edits throughout |
| C18 | Scroll surprises (3-4 moments) | active | integrated into sections |
| C19 | Hidden easter egg (19-click) | active | in finale |
| C20 | Mobile simplified magic | active | responsive magic layer config |
| C21 | Reduced-motion support | active | all animations gated |
| C22 | Performance optimization | active | particle pooling, offscreen pause |

## Open assumptions (announced defaults)
<!-- Record any default you adopt instead of asking, so the user can veto it at the gate. -->
| assumption | adopted default | rationale | reversible? |
|------------|----------------|-----------|-------------|
| Animation framework | Framer Motion | React-native, handles scroll/physics/gestures, ~15KB | Yes, via rewrite |
| Sparkle system | SVG ambient + Canvas confetti | DOM sparkles are accessible/stylable, Canvas for 50+ particles | Yes |
| Photo viewer | Fullscreen lightbox with prev/next/esc/swipe | Best UX for photo browsing | Yes |
| Sparkle colors | Gold (#C8A46B) and champagne (#E0C99A) variants | Matches existing gold design tokens | Easily |
| Confetti shapes | Rectangles, tiny circles, streamer fragments, four-point stars | No hearts, palette-consistent | Easily |
| Particle counts | Ambient: 8-15, Micro-confetti: 5-10, Celebration: 25-40 | Performance + understated elegance | Tweakable |
| Cursor dot color | Gold/charcoal (#C8A46B + #2B2B2A) | Matches design system | Easily |

## Findings (cited - path:lines)

1. **Current site is 6 sections, all minimally implemented** - HeroSection.tsx:55-91, MemoriesSection.tsx:76-103, MusicPlayer.tsx:122-184, MessageSection.tsx:26-43, Guestbook.tsx:65-185, Footer.tsx:26-36
2. **No animation library installed** - package.json:13-27 shows only React + Tailwind dev deps
3. **Design tokens use cream/gold/charcoal** - index.css:4-14 (`--bg: #F6F1E8`, `--gold: #B08D57`, `--text: #2E2A27`)
4. **5 real photos exist** - public/images/memories/ has 5 JPG files
5. **Hero photo exists** - public/images/ibhi-friend/1741450804644.jpg
6. **Music file exists** - public/music/favourite-track/ has one MP3
7. **Scroll-reveal uses IntersectionObserver** - index.css:38-46, hooks/useScrollReveal.js
8. **No navigation between sections** - App.tsx:9-18 has simple linear flow
9. **Existing plan ibhi-birthday-redesign.md was never fully implemented** - current codebase is much simpler than the plan described
10. **Framer Motion is not installed** - not in package.json

## Decisions (with rationale)

1. **Framer Motion over GSAP** — React-native ergonomics, smaller bundle, handles scroll-linked animations via `useScroll` + `useTransform`, spring physics for microinteractions, `AnimatePresence` for mount/unmount transitions.
2. **Keep existing design tokens** — cream/gold/charcoal works. Gold values adjusted slightly: `--gold: #C8A46B` (richer), `--gold-light: #E0C99A` (for sparkles).
3. **No new images** — 5 memories photos + 1 hero photo is sufficient. Don't add fabricated visual content.
4. **Section order preserved** — Hero → Photos → Music → Message → Guestbook → Footer. Insert "19" transition between Photos and Music. Insert Playground between Music and Message.
5. **Playful copy sparingly** — 3-4 moments only. The birthday dossier and the "Still here?" end-of-page detail carry the humor.
6. **Sound cues deferred** — Audio interaction adds complexity and may not be playable in all environments. Focus on visual magic first.

## Scope IN

- Cinematic hero opening sequence (point → line → aperture → photo → title → ENTER)
- Framer Motion animation system replacing manual scroll-reveal
- Ambient magic layer: SVG sparkles, gold dust, subtle background life
- Five Frames: sticky scroll photo experience with unique reveals per photo
- Photo lightbox viewer (keyboard + touch accessible)
- "19" signature portal transition (scale + clip-path mask)
- Vinyl music player redesign (spinning record, tonearm animation, progress)
- Birthday Playground: scratch card (already exists), random frame (photo developing), confetti button
- Magic section transitions (each section has different personality)
- Custom cursor on desktop (gold dot + ring, contextual labels)
- 5-8 micro-surprises across the site
- Confetti system (Canvas-based, 3 intensity levels, gold/champagne only)
- Envelope/paper physical feel for message section
- Handwritten-style annotations (3-4 moments)
- Playful copy updates (3-4 moments)
- Scroll surprises (3-4 moments)
- Hidden 19-click easter egg in finale
- End-of-page "Still here?" detail
- Mobile simplified magic (all effects work, reduced intensity)
- prefers-reduced-motion support
- Responsive at all breakpoints
- Performance: particle pooling, offscreen pause, `transform`/`opacity` only

## Scope OUT (Must NOT have)

- No fabricated memories, stories, dates, locations, events, captions
- No romantic phrasing: "Begin Our Story", soulmate, destiny, universe, forever, "my person", "I love you"
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

## Open questions

None. User confirmed Framer Motion, SVG+Canvas sparkles, photo lightbox. All other decisions have defensible defaults.

## Approval gate
status: awaiting-approval
<!-- When exploration is exhausted and unknowns are answered, set status: awaiting-approval. -->
<!-- That durable record is the loop guard: on a later turn read it and resume at the gate instead of re-running exploration. -->

## Review results

### Momus (Plan Critic) — OKAY
**Verdict:** The plan is well-structured and executable. 7 dependency matrix inconsistencies found and fixed. No circular dependencies. All tasks have required fields.

### Oracle (Independent Reviewer) — PASS with 3 action items
**Verdict:** PASS. Three action items identified and fixed:
1. ✅ Removed ghost "Ibhi File" verification from task 33 (section doesn't exist)
2. ✅ Added framer-motion version pin to task 1 (framer-motion@^12.0.0 for React 19/TS 7 compat)
3. ✅ Fixed dependency matrix for task 12 (was "Blocked by: 7" → corrected to "Blocked by: 9")

### Additional fixes applied
- Fixed task 7 matrix row (was "3, 4" → corrected to "6")
- Fixed task 8 matrix row (was "6" → corrected to "6, 7")
- Fixed task 16 matrix row (was "14" → corrected to "14, 15")
- Fixed tasks 27-29 matrix descriptions to match actual task titles
