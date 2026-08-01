# DESIGN.md — Ibhi Birthday Website ("Candlelight")

> **Contract status:** Extracted from existing UI (2026-07-31). This is a *codification* of the current
> system, not a redesign. The site's warm, editorial, candlelit aesthetic is load-bearing — every change
> below preserves it and only strengthens craft. Tokens listed here are the source of truth; raw values
> that predate this file are being migrated toward these tokens as accepted debt (see §7).

## 1. Direction & Atmosphere

**Committed direction (1 sentence):** A candlelit, warm-scrapbook birthday letter for "Ibhi" — cream paper
surfaces, gold light, film grain, and hand-touched editorial typography that feels like opening a
handmade card, not a website.

**Signature material:** Gold light (sparkles, glow, grain, wax seals) on warm cream/paper tones.

**The one remembered moment:** The hero's cinematic "gift unwrap" — black anticipation, gold sparkle
constellation, ribbon sweep, aperture opening onto a portrait, then word-by-word "HAPPY 19TH BIRTHDAY".

**Emotional register:** Warm, intimate, celebratory, nostalgic. Never cold, never techy, never loud.

## 2. Tokens

### 2.1 Color — "Candlelight" ramp (cream → charcoal, warm only)

| Token | Value | Usage |
|---|---|---|
| `--bg` | `#F6F1E8` | Global page background (warm cream) |
| `--card` | `#FFFFFF` | Card surfaces |
| `--sand` | `#E7D7C1` | Secondary surface / sand accents |
| `--warm-gray` | `#C7B8A6` | Borders, muted fills |
| `--text` | `#2E2A27` | Primary text (warm charcoal) |
| `--text-light` | `#8A7E6E` | Secondary text (warm taupe) |
| `--gold` | `#C8A46B` | **The single accent.** Buttons, highlights, seals |
| `--gold-light` | `#E0C99A` | Gold hover / light gold surfaces |
| `--gold-dark` | `#A8884D` | Gold pressed / emphasis |
| `--sparkle-gold` | `rgba(200,164,107,0.6)` | Ambient sparkle / particle fills |
| `--accent` | `#F0E8D8` | Accent washes |
| `--shadow` | `rgba(46,42,39,0.08)` | Shadow tint base (warm, matches text hue) |

**Section rhythm** (subtle tonal variation — never a hard dark-mode jump):
`--bg-hero #FAFAF5`, `--bg-gallery #F5F0E6`, `--bg-letter #F0EBE0`, `--bg-music #EDE7DA`,
`--bg-playground #F2EDE2`, `--bg-wish #FAFAF8`, `--bg-footer #ECE6D9`.

**Rules:** Exactly ONE accent (gold). All shadows tinted warm (match `--shadow` hue, never pure black).
No purple/blue "AI gradient" anywhere. Never introduce a cool gray.

### 2.2 Typography

| Role | Family | Notes |
|---|---|---|
| Display / headings | **Playfair Display** (600) | Editorial serif; the voice of the site |
| UI / body | **Inter** (300–600) | Neutral, quiet support |
| Handwritten accents | **Caveat** (400–700) | Personal notes, captions, guestbook ink |

Loaded from Google Fonts in `index.html` (Playfair Display 400-700 + italic, Inter 300-600, Caveat 400-700).

**Scale & treatment rules:**
- Headlines: serif, generous size, tight-ish line-height; gradient gold-on-cream for the hero name.
- Body width: capped ~65ch (already applied in letter/message sections).
- Data/time: `font-variant-numeric: tabular-nums` for the music timer (pending).
- Orphan control: `text-wrap: balance` exists as `.text-balance` utility — extend with `pretty` where needed.
- No all-caps subheaders everywhere; sentence case preferred; small labels may use letter-spacing.

### 2.3 Easing & Timing

| Token | Value | Usage |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default reveals, scroll-driven entrances |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Playful, tactile interactions |
| `--duration-fast` | `0.15s` | Micro-interactions, hovers |
| `--duration-normal` | `0.25s` | Standard transitions |
| `--duration-slow` | `0.4s` | Larger entrances |

**Motion rules:** GPU-composited only (`transform`, `opacity`, `filter`). NEVER animate `width`,
`height`, `top`, `left`, `margin`, `padding`. Motion serves meaning — a hover/state change must map to
real feedback; no decorative micro-animation without informational purpose. Scroll-driven reveals are
the site's primary motion language (Framer Motion `useScroll`/`useInView`).

### 2.4 Depth, Radius, Texture

| Token | Value |
|---|---|
| `--shadow-sm/md/lg/xl` | Warm-tinted layered shadows (see `index.css`) |
| `--radius-sm/md/lg/xl/full` | 4 / 8 / 12 / 16 / 9999px |
| Grain | SVG `feTurbulence` noise overlay, `opacity 0.035` (0.015 reduced-motion) — fixed, pointer-events-none |
| Surfaces | Paper/linen textures via CSS gradients (envelope, letter, guestbook); wax-seal motifs in gold |

### 2.5 Spacing

Base unit **4px**. Section rhythm: `--section-padding-y: 4rem` (`3rem` mobile),
`--section-padding-x: 1.5rem` (`1rem` mobile). Bottom padding optically larger than top.

## 3. Layout & Breakpoints

- Mobile-first; breakpoints: 640px (most sections), 768px (hero), 480px (music), 375px (hero compact).
- Container max ~1200-1440px with auto margins (hero/message sections already bounded).
- FiveFrames: sticky scroll-journey on desktop → stacked cards on mobile.
- Full-viewport sections use `min-height: 100dvh` (never `h-screen`) to avoid iOS jumps.
- Overlap and depth encouraged (negative margins, floating seals, tape accents) — no flat side-by-side rows.

## 4. Components & States

### Primitives (Section 5 registry)

| Primitive | Location | States |
|---|---|---|
| **ENTER button** (hero) | `HeroSection.tsx` | morph: dot → outline → filled → text; hover lift; active press; focus ring |
| **Vinyl player** | `MusicPlayer.tsx` | play/pause (spring), spinning vinyl, progress bar w/ glowing dot, keyboard Space |
| **Envelope / letter** | `MessageSection.tsx` | closed → seal-break → flap-open → letter up; click + keyboard |
| **Guestbook form** | `Guestbook.tsx` | floating labels, lined inputs, ripple submit, loading / success / error |
| **Photo lightbox** | `five-frames/PhotoLightbox.tsx` | open/close, prev/next, keyboard (Esc/Arrows), touch swipe, counter |
| **Scratch card / photo dev / confetti** | `Playground.tsx` | interactive canvas widgets |
| **Custom cursor** | `hooks/useCustomCursor.ts` | gold dot + ring; labels VIEW/PLAY/OPEN/DRAG; desktop only |
| **Scroll progress bar** | `ScrollProgressBar.tsx` | gold bar, "XIX" marker at 92-96% |

### Interaction state rules (required everywhere)
- Every `<button>` needs explicit `type` (`button`/`submit`) — currently missing in several places.
- Every clickable element needs a real `<button>`/`<a>` or a keyboard handler (Enter/Space) — currently
  several `onClick` on non-interactive elements (Footer "19", envelope, five-frames tiles).
- Visible focus ring on all interactive elements (`:focus-visible`).
- Hover = background shift/scale/translate (200-300ms); Active = `scale(0.98)` press feedback.
- Loading/empty/error states: Guestbook needs client-side validation + double-submit guard; audio
  already has an error state.
- No emojis as icons. Inline SVG only.

## 5. Motion Language

- **Scroll-driven reveals** are primary: `useScroll` + `useTransform` + `useInView` from Framer Motion.
- **Staggered entry** (never mount-everything-at-once): hero words, happy-birthday lines, gallery frames.
- **Spring physics** for tactile surfaces (vinyl, buttons, confetti).
- **One signature moment:** hero gift-unwrap sequence (black → sparkles → ribbon → aperture → portrait).
- `prefers-reduced-motion: reduce` must be respected everywhere (already strong: hero static fallback,
  reduced duration kill-switch, film grain dimming).
- Bundle discipline: prefer `LazyMotion` + `m` + `domAnimation` over `motion` to save ~30kb (pending —
  currently all components import full `motion`; see §7 debt).

## 6. Accessibility Constraints

- `prefers-reduced-motion` honored globally (CSS kill-switch + component fallbacks).
- Custom cursor disabled on touch; keyboard/pointer both work.
- All meaningful images need descriptive `alt`; decorative ones `aria-hidden`.
- Landmarks: `<main>`/`<section aria-label>`; hero is `role="banner"`.
- Form inputs labeled; inline errors, no `alert()`.
- Contrast: warm charcoal `#2E2A27` on cream `#F6F1E8` (AA+); gold accent is decorative/paired with
  text, never sole carrier of meaning.
- Keyboard operability: every interactive element reachable and operable via keyboard.
- Target size ≥ 44px for touch (buttons/labels) where feasible.

## 7. Accepted Debt (known — fixed progressively)

1. **Raw hex values scattered across 13 CSS files** (~246 occurrences) vs. tokens in `index.css`.
   Components predate the token layer. Migrate opportunistically; never block a feature fix on it.
2. **`motion` full import in 12 files** — switch to `LazyMotion`/`m` (`domAnimation`) for ~30kb.
3. **HeroSection is a 661-line component** with 20+ state vars + timer cascade. Fix bugs minimally;
   the `useReducer`/split refactor is deferred (risk of regressing the timeline).
4. **Guestbook Formspree endpoint is a placeholder** — must be a real endpoint or env-configurable
   (`VITE_FORMSPREE_ENDPOINT`). Guestbook will not submit until set.
5. **Dead code remaining:** `@types/canvas-confetti` devDep, empty `src/assets/images/`.
   (Deleted already: `useCountdown.js`, `useAnimatedReveal.ts`, `MemoriesSection.css`, legacy `.eslintrc.js`.)
6. **OG/Twitter URLs are placeholders** (`https://ibhi-19.example.com/`) — replace on deploy.
   (Fixed already: favicon/OG/Twitter/theme-color meta, LCP preload, non-blocking Google Fonts,
   hero bg in `<picture>` with 1080w/1200w AVIF + AVIF preload — 108.7KB JPEG → 56.5/67.8KB AVIF.)
7. **Perf ceiling is design-inherent:** the scroll-linked framer-motion suite (parallax, clip-path
   reveals, sticky spreads) forces reflow + main-thread cost. Lighthouse perf ~58 mobile / ~72 desktop;
   a11y/BP/SEO are 100. Raising perf materially means redesigning the motion — out of scope.
   (Fixed already: per-frame `filter`/`clipPath` on FiveFrames develop + scope frames are now sampled
   to discrete steps (~8–10 writes per scroll-through instead of per-frame), letterbox bar `height`
   animations converted to compositor `scaleY`, NineteenPortal `font-size` animation replaced with
   `scale` transform, and the portal reveal now observes the unclipped section — observing the
   `clip-path: circle(0%)` entrance never fired IntersectionObserver, which is why the 120vh portal
   rendered as empty space and the seal never appeared. Desktop Style & Layout ~6.4s → ~1.0s.)
8. **Retina image cost:** mobile DPR 2.625 picks ~1081px-wide AVIFs for full-bleed frames (~529 KiB
   est. savings vs. JPEG still flagged by Lighthouse). 1080w variants added to mitigate; this is
   inherent to full-bleed imagery, not a defect.
9. **react-doctor findings** (a11y + perf) tracked in this doc; fixed in the improvement pass.

## 8. Reference Fidelity

No external brand reference. This site's own existing design is the contract: preserve and polish.
Guardrails: keep the cream/gold/charcoal warmth, film grain, Playfair/Inter/Caveat voice, the hero
unwrap, the wax-seal motifs, the vinyl, and the hand-written scrapbook feel. Improvements must read as
"the same site, finished" — never "a different site".

---

*Source of truth for tokens: `src/index.css` (extracted 2026-07-31). Component CSS files carry raw
values that trace conceptually to these tokens; migration is §7-debt.*
