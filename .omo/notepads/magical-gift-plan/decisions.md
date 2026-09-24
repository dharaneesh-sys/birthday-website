# magical-gift plan — inherited decisions (scoped scout: planning/design history)

Source task: "Read all prior planning and design history for birthday-website and extract tokens, decisions, debt, and constraints for the magical-gift plan."
Date: 2026-09-24. Repo: https://github.com/dharaneesh-sys/birthday-website (remote "orgin", sic), branch main, HEAD cae6904 "fix: mobile photo layout + portal polish" (2026-08-01). DESIGN.md extracted 2026-07-31.

## 1. Token table (source of truth: src/index.css + DESIGN.md §2)

### Colors — "Candlelight" ramp (warm only, exactly ONE accent: gold)
| Token | Value | Usage |
|---|---|---|
| --bg | #F6F1E8 | global page bg (warm cream) |
| --card | #FFFFFF | card surfaces |
| --sand | #E7D7C1 | secondary surface / sand accents |
| --warm-gray | #C7B8A6 | borders, muted fills |
| --text | #2E2A27 | primary text (warm charcoal) |
| --text-light | #8A7E6E | secondary text (warm taupe) |
| --gold | #C8A46B | THE single accent (buttons/highlights/seals) |
| --gold-light | #E0C99A | gold hover / light gold / sparkles |
| --gold-dark | #A8884D | gold pressed / emphasis |
| --sparkle-gold | rgba(200,164,107,0.6) | ambient sparkle / particle fills |
| --accent | #F0E8D8 | accent washes |
| --shadow | rgba(46,42,39,0.08) | warm-tinted shadow base (never pure black) |

Section rhythm (subtle tonal variation, never hard dark-mode jump): --bg-hero #FAFAF5, --bg-gallery #F5F0E6, --bg-letter #F0EBE0, --bg-music #EDE7DA, --bg-playground #F2EDE2, --bg-wish #FAFAF8, --bg-footer #ECE6D9.
Rules: no purple/blue "AI gradient", never introduce cool gray. Shadows warm-tinted. Contrast pair #2E2A27 on #F6F1E8 is AA+; gold is decorative only, never sole carrier of meaning.
STALE/NOTE: older gold #B08D57 appears in redesign plan §Design Language + draft finding ("--gold: #B08D57") — SUPERSEDED by #C8A46B (magic-recovery todo 2, DESIGN.md §2.1). Redesign todo 6 also proposed --cream #F8F5EF / --charcoal #2B2B2B / --warm-gray #6B6B6B / --accent-blue #4A90D9 — REJECTED/superseded; do not reintroduce blue. Small-text gold fallback #B8944F noted in both plans for WCAG AA if #C8A46B fails on cream.

### Fonts (Google Fonts link in index.html — NOT self-hosted)
- Display/headings: Playfair Display 600 (400–700 + italic loaded); h1-h4 { Playfair Display, Georgia, serif; weight 600 }.
- UI/body: Inter 300–600; body { Inter, system-ui, sans-serif }.
- Handwritten accents: Caveat 400–700 (personal notes, captions, guestbook ink; annotations "frame 03", "play this ↑", "open me", "try this").
- Loading strategy: single Google Fonts css2 URL (Playfair ital wght 0,400;0,500;0,600;0,700;1,400;1,500 + Inter 300;400;500;600 + Caveat 400;500;600;700), `media="print" onload="this.media='all'"` non-blocking + <noscript> fallback; preconnect to fonts.googleapis.com + fonts.gstatic.com (crossorigin). theme-color #F6F1E8.
- Rules: hero name gradient gold-on-cream; body width ~65ch cap; music timer `font-variant-numeric: tabular-nums` (pending); `.text-balance` (text-wrap: balance) exists, extend with pretty where needed; sentence case preferred, no all-caps-everywhere.
- SUPERSEDED proposal: redesign todo 6 wanted Cormorant Garamond + Source Serif 4 replacing Playfair — NEVER ADOPTED (current index.html/src still Playfair/Inter/Caveat). Do not revive.

### Spacing / radius / depth / texture
- Base unit 4px. --section-padding-y: 4rem (3rem mobile); --section-padding-x: 1.5rem (1rem mobile). Bottom padding optically larger than top. Container max ~1200–1440px auto margins. Full-viewport sections use min-height: 100dvh (never h-screen).
- Radii: --radius-sm/md/lg/xl/full = 4/8/12/16/9999px.
- Shadows: --shadow-sm/md/lg/xl warm layered (index.css uses rgba(0,0,0,...) values — DESIGN.md says migrate toward warm --shadow hue).
- Texture: film grain body::after SVG feTurbulence, opacity 0.035 (0.015 reduced-motion), fixed, pointer-events-none, z-index 9998; paper/linen via CSS gradients (envelope, letter, guestbook); wax-seal motifs in gold.

### Motion language
- Tokens: --ease-out-expo cubic-bezier(0.22,1,0.36,1) (default reveals); --ease-spring cubic-bezier(0.34,1.56,0.64,1) (tactile); --duration-fast 0.15s / --duration-normal 0.25s / --duration-slow 0.4s. Micro 150–300ms, UI 300–600ms, reveals 600–1000ms, cinematic 1000–1800ms.
- Rules (verbatim): "GPU-composited only (transform, opacity, filter). NEVER animate width, height, top, left, margin, padding." Primary language = scroll-driven reveals (Framer Motion useScroll/useTransform/useInView) + staggered entry + spring physics for tactile surfaces. Signature moment = hero gift-unwrap (black → sparkles → ribbon → aperture → portrait → word-by-word "HAPPY 19TH BIRTHDAY").
- Icon library: NO icon lib in package.json (no lucide, no react-icons; MusicNoteIcon placeholder removed in magic-recovery task 18). DESIGN.md §4: "No emojis as icons. Inline SVG only." Four-point-star SVG path + dots/diamonds/specs for sparkles; no ⭐ emoji stars.

## 2. Decision log (verbatim where constraining)
- D1 direction: "A candlelit, warm-scrapbook birthday letter for 'Ibhi' — cream paper surfaces, gold light, film grain, and hand-touched editorial typography that feels like opening a handmade card, not a website." (DESIGN.md §1). Guardrail: "keep the cream/gold/charcoal warmth, film grain, Playfair/Inter/Caveat voice, the hero unwrap, the wax-seal motifs, the vinyl, and the hand-written scrapbook feel. Improvements must read as 'the same site, finished' — never 'a different site'." (§8).
- D2 mobile-primary: "Mobile-first; breakpoints: 640px (most sections), 768px (hero), 480px (music), 375px (hero compact)." Magic-recovery task 31: Five Frames no sticky on mobile (simple reveals), sparkles 50% density + no proximity/parallax, cursor disabled on touch, confetti halved, vinyl 200px no tonearm, envelope shortened, touch targets ≥44px, no horizontal overflow 320–480px.
- D3 no live testing by agent: inherited — agent runs no live testing; user does visual QA. (Magic-recovery verification strategy said "Zero human intervention" with npm build + dev browser inspection, but CURRENT constraint overrides: no agent live testing.)
- D4 content guardrails (both plans + draft Scope OUT): no fabricated memories/stories/dates/locations/events/captions; no romantic phrasing ("Begin Our Story", soulmate, destiny, universe, forever, "my person", "I love you"); no hearts/heart particles; no pink/red/balloons; no Three.js/WebGL/shaders; no scroll hijacking/snapping/forced positions; no autoplay audio; no fake loading %; no photo duplication/fake variations; no AI sentimental filler; no GSAP (Framer Motion only); no permanent cursor trail; no continuous confetti rain; no rainbow gradients/glitter; no emoji spam. Confirmed real data only: name Ibhi, age 19, birthday 16.10.07 (2007-10-16), favourite colour blue, 4 traits ("her honesty, her intelligence, her capability of understanding, how she treats me"), since 21.01.2025 + day counter, message "Happy birthday to you. Be happy and healthy.", scratch reveal "HAPPY 19TH, IBHI! / Hope 19 treats you well.", hidden 19×5 message verbatim ("You found the part I wasn't going to make obvious." → "You're pretty important to me." → "That's all you're getting from this button. :)"), "Still here?" → "I spent way too much time on this." → "Worth it though."
- D5 framework: Framer Motion over GSAP (React-native ergonomics, useScroll/useTransform, springs, AnimatePresence; v12+ pinned for React 19/TS 7). SVG ambient sparkles + Canvas confetti (DOM sparkles accessible/stylable, Canvas for 50+ particles; caps: ambient 8–15, micro 5–10, celebration 25–40, NEVER >45, no rain). Fullscreen lightbox (prev/next/esc/swipe, focus trap, body scroll lock). Sound cues DEFERRED.
- D6 section order preserved: Hero → Five Frames → (Ibhi File dossier — planned, verify existence) → 19 Portal → Music (vinyl "ON REPEAT") → Playground → Message (envelope) → Guestbook → Footer/Finale. "19" transition between Photos and Music; Playground between Music and Message.
- D7 a11y: prefers-reduced-motion honored globally (CSS kill-switch + instant-reveal fallbacks, no spin/parallax); every <button> needs explicit type; every clickable needs real button/a or keyboard handler (known gaps: Footer "19", envelope, five-frames tiles); :focus-visible rings; hover 200–300ms + active scale(0.98); ≥44px targets; alt discipline; landmarks main/section aria-label, hero role=banner.

## 3. Accepted debt (DESIGN.md §7 + plan deltas)
1. Raw hex scattered across 13 CSS files (~246 occurrences) vs tokens — migrate opportunistically, never block features.
2. Full `motion` import in 12 files — switch to LazyMotion/m/domAnimation (~30kb saving) pending.
3. HeroSection 661 lines, 20+ state vars + timer cascade — minimal bug fixes only; useReducer/split DEFERRED (regression risk).
4. Guestbook Formspree endpoint placeholder → env VITE_FORMSPREE_ENDPOINT (Guestbook.tsx reads import.meta.env at submit; unset → "not-connected" error, no dead POST). OPEN BLOCKER.
5. Dead code: @types/canvas-confetti devDep, empty src/assets/images/ (already deleted: useCountdown.js, useAnimatedReveal.ts, MemoriesSection.css, legacy .eslintrc.js).
6. OG/Twitter URLs placeholders https://ibhi-19.example.com/ (og:image + og:url + twitter:image) — replace on deploy. OPEN BLOCKER. (Fixed: favicon/OG/Twitter/theme-color meta, LCP AVIF preload, non-blocking fonts, hero <picture> 1080w/1200w AVIF 56.5/67.8KB vs 108.7KB JPEG.)
7. Perf ceiling design-inherent: scroll-linked framer-motion suite forces reflow/main-thread cost. Baseline Lighthouse ~58 mobile / ~72 desktop; a11y/BP/SEO 100. "Raising perf materially means redesigning the motion — out of scope." ⚠️ STALE sub-claims — see §5.
8. Retina cost: mobile DPR 2.625 picks ~1081px AVIFs for full-bleed frames (~529 KiB flagged savings); 1080w variants mitigate; inherent, not defect.
9. react-doctor findings tracked in DESIGN.md; fixed in improvement pass.
+ Interaction-state debt (§4): missing button types, onClick on non-interactive elements, Guestbook needs client-side validation + double-submit guard (partially done: validation + submittingRef exist — verify), focus rings.
+ Pending tokens: tabular-nums music timer; text-wrap pretty extension; LazyMotion migration.

## 4. Constraints / open blockers for magical-gift plan
- C1 VITE_FORMSPREE_ENDPOINT unset (no .env* in repo) → Guestbook shows "not connected"; needs real endpoint or deploy env. Do not hardcode.
- C2 OG URLs still https://ibhi-19.example.com/ in index.html:13,15,19 → must replace with production URL on deploy (og:image, og:url, twitter:image).
- C3 Perf baselines: ~58 mobile / ~72 desktop, a11y/BP/SEO 100 (DESIGN.md §7.7). Any gift overlay must not regress motion-critical paths; prefer transform/opacity-only, pooled particles, offscreen pause, reduced-motion gates.
- C4 No TODO/FIXME/XXX/BUG markers in src (grep clean 2026-09-24) — debt lives in DESIGN.md §7, not inline.
- C5 Deps (package.json): framer-motion ^12.42.2, react/react-dom ^19.2.0, tailwindcss ^4.3.3 (+vite plugin, typography), vite ^8.1.0. NO icon lib, NO confetti runtime (only @types/canvas-confetti dead devDep), NO GSAP/swiper/lenis/react-icons (removed). Do not add deps without cause.
- C6 Boulder staleness: .omo/boulder.json active_plan = "/home/dinusus/ibhi-birthday-website-v2/.omo/plans/ibhi-birthday-magic-recovery.md" — path predates rename to /home/dinusus/birthday-website/; active_work_id ibhi-birthday-magic-recovery, session ses_06d915f46ffe8QmIo7DGJspL6r.
- C7 Notepad learnings.md (2025-07-21) describes ANCIENT desktop-OS metaphor (MemoryTimeline, GSAP ScrollTrigger, Desktop grid) — predates both redesigns; ignore for tokens, useful only as "what failed" (see §6).
- C8 Factual-loss guardrail: magical gift must not invent dates/captions/counters beyond confirmed data; frame labels "FRAME 0X/05" + tiny "19" mark allowed (not real dates).

## 5. STALE flags (do not repeat in new plan)
- S1 DESIGN.md §7.7 parenthetical perf-fix claims ("per-frame filter/clipPath sampled to discrete steps ~8–10 writes; letterbox height → scaleY; NineteenPortal font-size → scale; portal observer fix; Desktop Style & Layout ~6.4s → ~1.0s") are STALE: HEAD cae6904 verbatim "Restored original per-frame scroll animations (reverted perf sampling)" + "NineteenPortal: removed XIX seal" per user revert ("Prior session reverted quantization/scaleY perf work per user; DESIGN.md section 7 went stale and needs re-sync"). Do NOT re-propose sampling/scaleY quantization as "already done".
- S2 Redesign-plan font proposal (Cormorant Garamond + Source Serif 4, remove Playfair — todo 6) never adopted; current truth is Playfair/Inter/Caveat. Do not cite redesign §todo 6 tokens (--cream #F8F5EF, --charcoal #2B2B2B, --warm-gray #6B6B6B, --accent-blue) as current.
- S3 Draft finding "--gold: #B08D57" superseded by #C8A46B.
- S4 Magic-recovery verification strategy ("Zero human intervention - all verification is agent-executed" via dev browser inspection) superseded by current user constraint (agent runs no live testing; user does visual QA).
- S5 Redesign plan status: all todos `- [ ]` unchecked (todos 1–30 + F1–F4 open) and its topology (chapters/, widgets/, effects/, Lenis, Cormorant) does not match current tree — it was the cleanup spec, largely executed via later work, but the PLAN FILE itself was never checked off. Magic-recovery todos 1–23, 25–33 + F1–F4 are `- [x]` (only todo 24 skipped-as-merged + success-criteria checkboxes open). Treat magic-recovery as implemented baseline, redesign plan as historical context only.
- S6 "Performance: particle pooling, offscreen pause" remains aspiration — verify before claiming; HEAD revert suggests scroll-linked costs are back.

## 6. What was tried / failed (for gift-vs-showroom + composition scouts)
- Failed: desktop-OS metaphor (draggable windows, boot sequence, app grid, MemoryTimeline) — "gimmicky and janky", scrapped per user → warm single-scroll journal (redesign plan Why).
- Failed: fabricated chapter system (8 chapters, DayCounter, WeatherWidget, FloatingStars, CursorTrail, FinalSurprise hearts/balloons/typewriter, EasterEggs "cutest", pink confetti rain, "100 Things"/"Begin Our Story") — removed as fabricated/romantic.
- Failed: romantic palette/imagery (pink/red, hearts, balloons, soulmate/destiny/universe/forever) — banned by user ("no hearts — she's a friend, keep it platonic").
- Failed/aban­doned: GSAP + Lenis + swiper + react-icons (uninstalled); Cormorant/Source Serif font swap (never adopted); sound cues (deferred); "Ibhi File" 100-things format (rejected — magazine dossier with 4 traits only).
- Reverted by user: quantization/scaleY perf sampling (HEAD cae6904) — DESIGN.md §7.7 needs re-sync; new plan must not assume those wins are live.
- Succeeded (keep): hero unwrap, Five Frames 5 unique reveals (aperture/paper-unfold/blur→focus/Polaroid/exposure), lightbox, 19 portal, vinyl player, playground (scratch/developer/confetti), envelope letter, sparkles/confetti/cursor layer, micro-surprises, easter egg, "Still here?", reduced-motion + mobile passes, AVIF responsive images + preload, OG/favicon/theme-color meta.

## Files read
DESIGN.md (187 lines), .omo/plans/ibhi-birthday-magic-recovery.md (663 lines, 3 chunks), .omo/plans/ibhi-birthday-redesign.md (465 lines, 3 chunks), .omo/drafts/ibhi-birthday-magic-recovery.md (143 lines), .omo/notepads/ibhi-birthday-website-v2/learnings.md (30 lines), .omo/boulder.json, index.html (33 lines), package.json (42 lines), src/index.css (115 lines); greps for hexes/fonts/debt/blockers; git log/remote/status (HEAD cae6904, main, orgin https://github.com/dharaneesh-sys/birthday-website, clean tree).

## 7. L9 Hygiene (2026-09-24) — DESIGN.md §7 re-sync, OG URLs, boulder path, orphan photo

DESIGN.md §7.7 replacement paragraph (verbatim):
(Truth at cae6904: original per-frame FiveFrames animations restored per user, perf sampling reverted;
NineteenPortal sectionRef IO fix and fontSize→scale kept; XIX seal removed; perf ceiling re-accepted
as design-inherent (~58 mobile / ~72 desktop).)

Deleted stale sub-claims: sampled filter/clipPath discrete steps (~8-10 writes), letterbox height→scaleY,
Desktop Style & Layout 6.4s→1.0s. HEAD cae6904 verbatim source: "Restored original per-frame scroll
animations (reverted perf sampling)" + "NineteenPortal: removed XIX seal, kept section-scroll reveal
fix". All other debt items kept untouched (raw hex, motion import, HeroSection size, Formspree open,
dead @types/canvas-confetti, OG placeholders open, retina cost, react-doctor).

OG placeholders (index.html, left as-is per no-invent-domain rule):
Line 13: og:image https://ibhi-19.example.com/images/ibhi-friend/1741450804644.jpg
Line 15: og:url https://ibhi-19.example.com/
Line 19: twitter:image https://ibhi-19.example.com/images/ibhi-friend/1741450804644.jpg

boulder.json active_plan:
OLD: /home/dinusus/ibhi-birthday-website-v2/.omo/plans/ibhi-birthday-magic-recovery.md
NEW: /home/dinusus/birthday-website/.omo/plans/ibhi-birthday-magic-recovery.md

Orphan photo public/images/ibhi-friend/1741450872367.jpg (81,522 bytes, exists):
grep -rn "1741450872367" src public index.html → zero matches, exit code 1. REPORTED only, NOT
deleted — awaiting user confirmation.
