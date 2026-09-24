# Magical Birthday Present — Build Plan

**Repo:** `/home/dinusus/birthday-website` (`ibhi-birthday-website-v2`, branch `main`, HEAD `cae6904`)
**Goal:** make the site feel like a real wrapped birthday present — open, reveal, light, play, keep — not a showroom website.
**Skills bound:** design-taste-frontend (design read, dials, pre-flight) · unlazy (Depth Tree, acceptance gates) · prompt-master (paste-ready leaf prompts)
**Constraints (non-negotiable):** mobile-primary · agent runs NO live testing (user does visual QA) · transform/opacity/filter motion only · framer-motion only (no GSAP/Three.js) · single Candlelight theme, no dark flip · one gold accent · no fabricated memories/dates/captions · no romantic phrasing, hearts, pink/red/balloons · no autoplay, no scroll-hijack, no fake loaders · reduced-motion fallbacks everywhere.

## 1. Design Read + Dials (design-taste-frontend)

**Reading this as: an intimate mobile-first gift-letter site for one recipient (Ibhi), with a warm candlelit scrapbook language, leaning toward native CSS + framer-motion scroll reveals + real photography.**

- `DESIGN_VARIANCE: 6` — editorial warmth, gentle asymmetry; gift beats need surprise, not chaos.
- `MOTION_INTENSITY: 6` — fluid scroll reveals + two tactile rituals (unwrap, candle); every animation must answer "what does this communicate?" (hierarchy, story sequence, feedback, state change).
- `VISUAL_DENSITY: 3` — art-gallery air; one idea per screen; short headlines (≤8 words), sub-copy ≤25 words.
- Palette lock: `--bg #F6F1E8`, `--text #2E2A27`, single accent `--gold #C8A46B` (`--gold-light #E0C99A`). No AI-purple, no beige+brass drift (already Candlelight — keep it).
- Type lock: Playfair Display (display) · Inter (body) · Caveat (handwritten annotations only). No serif-injection emphasis tricks; italic/bold in-family only.
- Imagery: real photos stay hero; no div-fake screenshots; no hand-rolled illustration except the existing four-point-star SVG idiom.

## 2. Prompt-master intent extraction (9 dimensions, silent → locked)

Task: convert showroom beats to gift beats via 8 leaves + hygiene. Target tool: agentic coding agent (Claude Code route) working in `/home/dinusus/birthday-website/src`. Output format: one leaf = one paste-ready prompt (§6) + gates (§5). Constraints: file-owns per leaf, no new runtime deps, mobile-first, reduced-motion. Input: scout reports (composition/history/gap) + this plan. Context: HEAD cae6904, Candlelight tokens, Formspree endpoint unset. Audience: Ibhi on her phone. Success: every gate green + user visual QA approves feel. Examples: existing seal-break (MessageSection), ENTER morph (HeroSection) as the quality bar.

## 3. What stays vs what changes (fidelity guard, DESIGN.md §8)

KEEP untouched: hero unwrap cinematic · FiveFrames per-frame animations (user-restored) · NineteenPortal sectionRef IO fix + charScale · MessageSection envelope · vinyl player · ConfettiBurst/AmbientSparkles/cursor primitives · Candlelight tokens + grain.
CHANGE: add entry seal (L1) · candle moment (L2) · music dedication (L3) · frame dedications + lightbox keep (L4) · portal/birthday bridge copy (L5) · playground keepsake wiring (L6) · guestbook keep path (L7) · finale (L8) · hygiene (L9). Perf-budget guard (L10) runs across all.

## 4. Depth Tree (unlazy) — 10 leaves, each independently omittable

| Leaf | Contract (one deliverable) | Owns (files) | Needs |
|---|---|---|---|
| L1 Entry seal | Tactile sealed gate before hero content: wax-seal press (reuse sealBreak idiom) → ribbon/aperture opens site. Tap only, ≤2s, skippable, remembered via sessionStorage. | New `SealedEntry.tsx/.css` + `App.tsx` mount point only | — |
| L2 Candle moment | Wish-then-blow ritual: 19-glow candle cluster (SVG flame + hbGlowPulse idiom), press-and-hold to light wish, blow (tap-hold release) → `celebration` confetti + wish sealed to keepsake strip. No mic. | New `CandleWish.tsx/.css`, reuse `ConfettiBurst level="celebration"` | L8 strip contract |
| L3 Music dedication | `why-this-song` card above vinyl: 2-line dedication + "press play when…" Caveat annotation. Copy must be user-supplied or approved-generic. | `MusicPlayer.tsx/.css` (card block only) | — |
| L4 Frame dedications | Replace technique captions (Cinematic/Editorial/…) with short real dedications (confirmed facts only: names/dates/traits on allowlist); lightbox gains a "keep this one ♥→☆" — no, no hearts: "Keep this photo" button → adds to keepsake strip. | `FiveFrames.tsx/.css`, `PhotoLightbox.tsx/.css` | L8 strip contract |
| L5 Bridge copy | Portal tail + HappyBirthday lines get one continuous dedication sentence across the split; unify HappyBirthday's 24-dot Sparkles onto AmbientSparkles. | `NineteenPortal.tsx`, `HappyBirthday.tsx` (copy + sparkle swap) | — |
| L6 Playground keepsake | Scratch/develop/confetti results persist: revealed message + developed frame thumbnail join keepsake strip; remove `onReveal/onDevelop={() => {}}` no-ops. | `Playground.tsx/.css` | L8 strip contract |
| L7 Guestbook keep path | `.env.example` + deploy-env wiring doc; local wish-wall fallback (localStorage) so a wish NEVER vanishes when endpoint unset; keep validation/guard behavior. Never hardcode endpoint. | `Guestbook.tsx/.css`, `.env.example` (new) | — |
| L8 Finale | Footer becomes a closing beat: progress-XIX triggers `celebration` confetti at 100%, keepsake strip (photos kept + wish + candle wish) renders as "take this with you", 5-click egg kept. | `Footer.tsx/.css`, new `KeepsakeStrip.tsx/.css`, `ScrollProgressBar.tsx` (trigger only) | L2/L4/L6 contracts |
| L9 Hygiene | Re-sync DESIGN.md §7 (remove reverted perf claims), replace OG placeholder URLs, fix `.omo/boulder.json` stale path, delete orphan `1741450872367.jpg` after user confirms. | `DESIGN.md`, `index.html`, `.omo/boulder.json` | — |
| L10 Perf guard | Cross-leaf audit: no width/height/top/left animation, no new deps, sparkle/confetti budgets, offscreen pause, reduced-motion static paths, mobile 320–480px overflow sweep. | Read-only + fixes inside owning leaf files | All leaves |

Execution order: L9 → L1 → L3 → L5 → L4 → L2 → L6 → L7 → L8 → L10. L8 integrates L2/L4/L6 strip contracts — dispatch L8 only after those three are parent-verified.

## 5. Acceptance gates (unlazy CHECK/EXPECT; runnable unless marked MANUAL)

G0 Hygiene build: `CHECK: npx tsc --noEmit` / `EXPECT: exit 0, no "error TS"`.
G1 Lint: `CHECK: npm run lint` / `EXPECT: 0 errors (≤19 baseline warnings)`.
G2 Build: `CHECK: npm run build` / `EXPECT: "✓ built" in output`.
G3 Motion law: `CHECK: grep -rn "transition.*\(width\|height\|top\|left\)\|animate.*width\|animate.*height" src --include=*.tsx --include=*.css` / `EXPECT: exit 1 (no matches)`.
G4 No new deps: `CHECK: git diff -- package.json` / `EXPECT: no "^+.*\":" under dependencies`.
G5 Reduced motion: `CHECK: grep -rln "prefers-reduced-motion\|useReducedMotion" src/components/CandleWish.* src/components/SealedEntry.* src/components/KeepsakeStrip.*` / `EXPECT: ≥3 files listed`.
G6 Copy guard: `CHECK: grep -rni "soulmate\|destiny\|universe\|forever\|my person\|i love you\|begin our story" src` / `EXPECT: exit 1 (no matches)`.
G7 Emoji-as-icon: `CHECK: grep -rnP "[\x{1F300}-\x{1FAFF}\x{2600}-\x{27BF}]" src/components/SealedEntry.* src/components/CandleWish.* src/components/KeepsakeStrip.*` / `EXPECT: exit 1`.
G8 MANUAL (user visual QA, mobile): entry seal feels like unwrapping; candle wish pays off; finale keeps keepsakes. Owner: user. Evidence: approval message.

## 6. Paste-ready leaf prompts (prompt-master output)

> L1 prompt (target: agentic coding agent in /home/dinusus/birthday-website): "Add `src/components/SealedEntry.tsx/.css`: a full-viewport sealed gate mounted above HeroSection in App.tsx. Wax-seal button (reuse MessageSection sealBreak/ring idiom, gold #C8A46B on cream #F6F1E8, Playfair 'For Ibhi' + Caveat 'open me'). On press: seal cracks (scale/opacity only), ribbon sweeps, gate fades/slides away revealing hero; total ≤2s; Escape/skip link; sessionStorage remembers; prefers-reduced-motion → single fade. Do NOT touch HeroSection/FiveFrames/portal. Stop and ask before adding deps or changing App order. Done when: G0–G3,G5–G7 pass and gate never traps scroll. [Agentic tool with real access — review scope before pasting.]"
> L2–L8 follow the same shape: goal + owning files + idioms to reuse + explicit do-not-touch + stop conditions + done-when gates. Full per-leaf prompts are expanded at dispatch time from §4 contracts.

## 7. Verification & rollout

Per leaf: orchestrator reads every changed file, runs G0–G7, user owns G8 feel approval. No agent live-testing (playwright/curl visual QA banned by standing constraint). Ship: single PR/commit per leaf, `cae6904`-style messages. Open blockers: `VITE_FORMSPREE_ENDPOINT` value (deploy env, user supplies) · music-track length/quality check (user confirms full track) · dedication copy allowlist (user supplies real lines or approves generic set) · OG URLs + deploy domain.

## TODOs

- [x] 1. L9 Hygiene: re-sync DESIGN.md §7, OG URLs, boulder path, orphan photo confirm
- [x] 2. L1 Entry seal: SealedEntry gate before hero
- [x] 3. L3 Music dedication card
- [x] 4. L5 Portal→Birthday bridge copy + sparkle unification
- [x] 5. L4 Frame dedications + lightbox Keep button
- [x] 6. L2 Candle wish-then-blow ritual
- [x] 7. L6 Playground results persist to keepsake strip
- [x] 8. L7 Guestbook local wish-wall fallback + .env.example
- [x] 9. L8 Finale: keepsake strip + celebration trigger
- [x] 10. L10 Perf/motion/a11y guard sweep + Final Verification Wave (all gates + user G8 APPROVE)

## Final Verification Wave

- [x] F1. Orchestrator review: every changed file read, logic matches leaf contracts
- [x] F2. Gates G0–G7 all green with evidence
- [x] F3. Taste pre-flight: eyebrow count ≤ ceil(sections/3), one accent locked, no tells, hero fits viewport, new CTAs contrast AA + single-line, no split-header default, zigzag ≤2 consecutive
- [ ] F2. Gates G0–G7 all green with evidence
- [ ] F3. Taste pre-flight: eyebrow count ≤ ceil(sections/3), one accent locked, no tells, hero fits viewport, new CTAs contrast AA + single-line, no split-header default, zigzag ≤2 consecutive
- [ ] F4. User G8: magical + beautiful + real-present feel APPROVED on mobile
