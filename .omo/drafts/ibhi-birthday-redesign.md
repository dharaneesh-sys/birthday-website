---
slug: ibhi-birthday-redesign
status: drafting
intent: unclear
review_required: false
pending-action: write .omo/plans/ibhi-birthday-redesign.md
approach: Complete redesign of existing birthday website — preserve 5 photos + audio, remove all fabricated content, rebuild with editorial cinematic experience
---

# Draft: ibhi-birthday-redesign

## Components (topology ledger)
| id | outcome | status | evidence path |
|---|---|---|---|
| hero-section | New cinematic opening sequence (dark→gold point→line→photo reveal, "Happy 19th Birthday Ibhi", "A little something for your 19th", CTA "Enter →") | active | spec §12-15 |
| navigation | Chapter/progress nav — likely "01 OPEN · 02 FIVE FRAMES · 03 IBHI FILE · 04 ON REPEAT · 05 PLAYGROUND · 06 FINALE" OR minimal progress indicator | active | spec §44 |
| five-frames | Sticky photo experience with 5 actual photos, each with unique reveal treatment | active | spec §16-19 |
| the-ibhi-file | Premium magazine profile: birthday dossier with real data (blue, honest, intelligent, understanding, treats me well) | active | spec §20-22 |
| nineteen-transition | Signature "19" typography moment that scales dramatically, possibly masks next section | active | spec §23 |
| music-section | "ON REPEAT" — rename, keep vinyl + audio, upgrade player (tonearm, seek, progress, keyboard) | active | spec §24-26 |
| birthday-playground | Compact section: scratch card + random frame + confetti button + confetti button | active | spec §31-33 |
| scratch-card | Redesign to cream/gold editorial with message "Happy 19th, Ibhi! Hope 19 treats you well" | active | spec §31, user confirmed keep+redesign |
| birthday-wishes | 4-6 short natural wishes, user's message: "happ birthday to you be happy and healthy" | active | spec §30 |
| finale | Dark ending → "19" → "Happy Birthday Ibhi" → "Hope 19 treats you well" → small confetti burst | active | spec §55-57 |
| hidden-interaction | One hidden detail: clicking 19 several times reveals subtle message | active | spec §34 |
| easter-egg-replay | "Still here?" → "I spent way too much time on this" → "Worth it though" + confetti | active | spec §57 |
| global-styles | Cream/gold/charcoal editorial system, paper texture, film grain, editorial numbering | active | spec §36-40 |
| responsive | Mobile-first, 360-1440px, reduced parallax/masks on mobile | active | spec §50 |
| accessibility | Keyboard nav, focus states, alt text, prefers-reduced-motion, semantic HTML | active | spec §51 |
| performance | transform/opacity anims, lazy images, cleanup observers, visibility pause | active | spec §52 |

## Findings (cited — path:lines)

### Architecture
- React 19 + Vite 8 + TypeScript 7 + Tailwind CSS 4 — modern, fast toolchain (`package.json:13-36`)
- Framer Motion 12 + GSAP 3.15 + Lenis 1.0 — three animation systems overlapping (`package.json:14-17`)
- No data/ directory — all content hardcoded inside components (`src/components/chapters/`)
- No centralized config for personal data
- 10 chapter components + Hero + Loader + FinalSurprise + 3 widgets + 2 effects + 1 easter egg (`src/App.tsx:22-115`)
- Lenis configured in index.css (`src/index.css:32-35`)

### Photo Assets
- 5 actual photos in `/public/images/memories/`: IMG20250506144456.jpg (3264×2448, 3.3MB), IMG_20250510_152025_341.jpg (816×612, 81KB), IMG_20250510_152113_459.jpg (816×612, 74KB), IMG_20250510_152120_608.jpg (816×612, 110KB), IMG_20250510_152134_431.jpg (3264×2448, 1.3MB)
- 2 additional photos in `/public/images/ibhi-friend/`: 1741450804644.jpg (1200×1600, 107KB, used in Hero+Finale), 1741450872367.jpg (720×1280, 80KB, unused)
- **Code references 24+ photo filenames but only 5 exist** — all components reference non-existent files (`Chapter1Timeline.tsx:18-79`, `Chapter2Gallery.tsx:23-42`)

### Audio
- 1 MP3: `Ninaithu Ninaithu Parthen — Female Version` (275KB) — confirmed real favourite track (`Chapter5Music.tsx:7-8`, user confirmed)

### Fabricated Content — COMPLETE AUDIT
- **Chapter1Timeline.tsx** — 6 fabricated memories with fake dates/locations/stories, references non-existent photos
- **Chapter2Gallery.tsx** — 18 fabricated entries, references 13 non-existent photos, fabricated captions
- **Chapter3Amazing.tsx** — 30 AI-generated qualities with flowery paragraphs
- **Chapter4Memories.tsx** — 6 fabricated memories including "First Date" (romantic), with fake events
- **Chapter7Wishes.tsx** — 9 AI-generated wishes with "universe conspire" language (§35 prohibited)
- **Chapter8BucketList.tsx** — "Things I want to do with you" (romantic), 10 fabricated bucket list items
- **Chapter9Quiz.tsx** — "How Well Do You Know Us?" — romantic framing, fabricated questions
- **Chapter100Things.tsx** — 110 AI-generated compliments, romantic entries
- **Hero.tsx** — "Begin Our Story" (romantic), 4 rotating fabricated taglines
- **DayCounter.tsx** — Fake start date (Dec 1, 2024), "And every day has been a blessing"
- **WeatherWidget.tsx** — Generic fabricated weather for Chennai
- **FinalSurprise.tsx** — **Heart-shaped constellation** (romantic), "Out of billions of people" text, balloons
- **FloatingStars.tsx** — Uses ⭐ emoji stars (§37: reduce stars by 70%, use SVG sparkles)
- **CursorTrail.tsx** — Gold sparkle cursor trail on every move
- **ScratchCard.tsx** — Purple gradient (wrong visual direction), "every moment has been a treasure" (romantic)

### User-Confirmed Data (this session)
- Birthday: October 16, 2007
- Friendship start: January 21, 2025
- Name: Ibhi (correct, not short for anything)
- Favourite colour: Blue
- Favourite song: Ninaithu Ninaithu Parthen — Female Version (confirmed)
- Real traits: Honesty, intelligence, capability of understanding, how she treats me
- Birthday message: "happ birthday to you be happy and healthy"
- Skipped: favourite food, favourite movie, hobbies, quiz, Open When letters
- Scratch card: keep + redesign
- Memories/captions: needs to think (proceed without)

## Decisions (with rationale)

1. **Remove 8 chapter components entirely** — All contain fabricated memories, romantic framing, or AI-generated sentiment. Cannot be salvaged. Creates clean slate for new sections.

2. **Remove DayCounter + WeatherWidget** — DayCounter uses unverified fake date (replaced with verified Jan 21 2025 if counter included). WeatherWidget adds no value per spec §10.

3. **Remove FloatingStars component** — Uses ⭐ emoji, 70% reduction mandated by spec. Replace with 0-2 custom SVG sparkle glints in strategic locations only.

4. **Rewrite CursorTrail** — Remove gold sparkle trail (too much particle noise). Replace with subtle parallax depth on photos only.

5. **Remove FinalSurprise heart constellation** — Heart shape is explicitly romantic per spec §03. Replace with spec-compliant dark finale.

6. **Rename Hero CTA** — "Begin Our Story" → "Enter →" per spec §12.

7. **Rename Music section** — "Music That Reminds Me Of You" → "ON REPEAT" per spec §24.

8. **Remove Quiz entirely** — User chose to skip. No fabricated questions.

9. **Remove Open When entirely** — User chose to skip. No fabricated letters.

10. **Replace Chapter100Things with "The Ibhi File"** — Spec §20-21 mandates this replacement. Use only confirmed real data.

11. **Five Frames replaces Chapters 1+2 gallery** — 5 actual photos, each gets unique reveal treatment. No fabricated captions.

12. **Keep Lenis + Framer Motion as primary animation** — GSAP can be removed if not needed for scroll choreography. Prefer single animation system.

13. **Keep vinyl player implementation** — Upgrade tonearm animation, add proper seek/progress/keyboard. Rename section.

14. **Add hidden interaction** — Clicking "19" multiple times triggers subtle message per spec §34.

15. **Contact message style** — Use user's exact words: "happ birthday to you be happy and healthy" — preserves authenticity. Only minor typo fix if appropriate.

## Scope IN

- Cinematic hero: dark → gold point → line → photo reveal → "Happy 19th Birthday" → "Ibhi" → "A little something for your 19th" → "Enter →"
- Lenis smooth scroll throughout
- Navigation: chapter dots OR minimal progress indicator (champion dots on desktop, minimal on mobile)
- Five Frames: sticky scroll-driven photo experience with 5 unique reveal treatments
- The Ibhi File: magazine-style dossier with real data (blue, honest, intelligent, understanding, treats me well, birthday 16/10, friendship 21/1)
- "19" signature transition: dramatic scale moment that acts as section divider
- "ON REPEAT" music section: renamed vinyl player with upgraded controls (tonearm, seek, progress, keyboard, touch)
- Birthday Playground: scratch card (redesigned) + Random Frame + confetti button
- Birthday Wishes: 4-6 short natural wishes + user's message
- Dark finale: "19" → "Happy Birthday Ibhi" → "Hope 19 treats you well" → small confetti
- Hidden interaction: clicking 19 several times reveals subtle message
- End-of-page: "↑ REPLAY" + "Still here?" playful detail
- Global design tokens: warm ivory, muted champagne gold, charcoal, blue accent (her favourite)
- Paper texture, thin rules, editorial numbering, restrained shadows
- Replace ⭐ emoji stars with custom SVG four-point glints (reduced by 70%+)
- prefers-reduced-motion support
- Keyboard navigation + focus states
- Responsive: 360px-1440px+
- Image optimization: appropriate sizing, lazy loading, prevent layout shift
- Graceful audio failure
- Production build verification

## Scope OUT (Must NOT have)

- ❌ No fabricated memories, stories, dates, locations, events
- ❌ No "Begin Our Story" or "Our Journey" button text
- ❌ No heart imagery, heart shapes, heart particles, heart constellations
- ❌ No pink/red romantic color palettes
- ❌ No romantic phrasing: soulmate, destiny, universe, forever, "my person", "I love you"
- ❌ No pink confetti or pink balloons
- ❌ No weather widget
- ❌ No fake friendship counters with unverified dates
- ❌ No fabricated quiz questions
- ❌ No AI-generated sentimental filler (souls, destiny, storms, eternal light)
- ❌ No 100 Things / generic compliment lists
- ❌ No Three.js, WebGL, shader systems (unless genuinely justified — no current justification)
- ❌ No scroll hijacking, aggressive snapping, forced scroll positions
- ❌ No autoplay audio
- ❌ No fake loading percentages
- ❌ No permanent animation loops for offscreen elements
- ❌ No fabricated Open When letter contents
- ❌ No photo duplication to fake volume
- ❌ No fabricating personal facts to fill null fields

## Open questions

- [ ] **Captions for 5 photos?** — User said "Need to think". Photos will appear captionless initially. Can add later if user provides them.

**Resolved:**
- Hero photo: keep current portrait (ibhi-friend/1741450804644.jpg)
- Friendship counter: include subtly in The Ibhi File or finale
- Birthday message: lightly polish — "Happy birthday to you. Be happy and healthy."
- GSAP: keep as dependency initially, audit during build, remove if unused. Framer Motion + Lenis will handle primary choreography.

## Approval gate

status: awaiting-approval
<!-- Set to awaiting-approval when the draft is complete and ready for user approval. -->
