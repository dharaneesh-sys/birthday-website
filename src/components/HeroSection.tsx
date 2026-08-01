import { useState, useEffect, useCallback, useRef, useLayoutEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AmbientSparkles from './magic/AmbientSparkles';
import ConfettiBurst from './magic/ConfettiBurst';
import './HeroSection.css';

const BG_IMAGE_PATH = '/images/ibhi-friend/1741450804644.jpg';
const BG_IMAGE_AVIF = '/images/ibhi-friend/1741450804644-1080w.avif 1080w, /images/ibhi-friend/1741450804644-1200w.avif 1200w';
const BG_IMAGE_SIZES = '100vw';
const BG_IMAGE_PRELOAD = '/images/ibhi-friend/1741450804644-1080w.avif';

/* ─── Timeline (ms) — luxury unwrapping ──────────────── */
const T = {
  /* Phase 1 — Dark anticipation (0–2.2s) */
  SPARKLE_1: 400,      // Center sparkle — catching light on wrapping
  SPARKLE_2: 700,      // Orbit in
  SPARKLE_3: 900,
  SPARKLE_4: 1050,
  SPARKLE_5: 1200,
  RIBBON: 1600,        // Gold ribbon sweeps across — gift metaphor
  LIGHT_LEAK: 1800,    // Warm amber leaks from edges
  APERTURE: 2200,      // Iris opens — unwrapping the gift
  DUST: 2800,          // Floating particles drift
  GRAIN: 2900,         // Photographic grain
  BLOOM: 3000,         // Warm bloom overlay

  /* Phase 2 — Typography reveal (3.2–6s) */
  WORD_1: 3200,        // "HAPPY"
  WORD_2: 3600,        // "19TH"
  WORD_3: 4000,        // "BIRTHDAY"
  DIVIDER: 4400,       // Gold decorative line
  NAME: 4600,          // "Ibhi" gradient reveal
  SUBTITLE: 4900,      // Subtitle
  BUTTON_DOT: 5100,    // Button: tiny gold dot
  BUTTON_OUTLINE: 5250,// Button: outline ring
  BUTTON_FILL: 5400,   // Button: filled
  BUTTON_TEXT: 5600,   // Button: text appears
};

/* ─── Sparkle constellation ──────────────────────────── */
const SPARKLE_POSITIONS = [
  { x: '50%', y: '50%' },        // center — anchor
  { x: '38%', y: '44%' },        // upper-left orbit
  { x: '62%', y: '56%' },        // lower-right orbit
  { x: '42%', y: '58%' },        // lower-left orbit
  { x: '58%', y: '42%' },        // upper-right orbit
];

const SPARKLE_DRIFT = [
  { x: 0, y: 0 },
  { x: -20, y: -14 },
  { x: 24, y: 16 },
  { x: -16, y: 18 },
  { x: 18, y: -12 },
];

/* ─── Dust mote configs ──────────────────────────────── */
const DUST_MOTES = [
  { x: '30%', y: '38%', delay: '0s', size: '2px', dur: '7s' },
  { x: '58%', y: '32%', delay: '1.5s', size: '3px', dur: '9s' },
  { x: '42%', y: '62%', delay: '2.8s', size: '2px', dur: '8s' },
  { x: '68%', y: '48%', delay: '1s', size: '2.5px', dur: '10s' },
  { x: '28%', y: '55%', delay: '2s', size: '2px', dur: '7.5s' },
  { x: '50%', y: '28%', delay: '3.5s', size: '1.5px', dur: '11s' },
];

/* ─── ChevronDown inline SVG ─────────────────────────── */
function ChevronDown() {
  return (
    <svg
      className="hero-section__scroll-chevron"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ─── Gold divider with diamond ──────────────────────── */
function GoldDivider({ show }: { show: boolean }) {
  return (
    <motion.div
      className={`hero-section__divider ${show ? 'hero-section__divider--visible' : ''}`}
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      aria-hidden="true"
    >
      <span className="hero-section__divider-diamond" />
    </motion.div>
  );
}

/* ─── Word reveal with clip-path ─────────────────────── */
function WordReveal({
  children,
  revealed,
}: {
  children: ReactNode;
  revealed: boolean;
}) {
  return (
    <span className="hero-section__word-wrapper">
      <motion.span
        className="hero-section__word"
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={
          revealed
            ? { clipPath: 'inset(0 0% 0 0)' }
            : { clipPath: 'inset(0 100% 0 0)' }
        }
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ═══ Component ════════════════════════════════════════ */
export default function HeroSection() {
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  const [entered, setEntered] = useState(false);
  const [showPostEnter, setShowPostEnter] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [mergePhase, setMergePhase] = useState<'idle' | 'compact'>('idle');

  /* Animation phase states */
  const [showBlack, setShowBlack] = useState(true);
  const [sparkleVisible, setSparkleVisible] = useState<boolean[]>([false, false, false, false, false]);
  const [showRibbon, setShowRibbon] = useState(false);
  const [showRibbonTip, setShowRibbonTip] = useState(false);
  const [showLightLeak, setShowLightLeak] = useState(false);
  const [apertureOpen, setApertureOpen] = useState(false);
  const [showDust, setShowDust] = useState(false);
  const [showGrain, setShowGrain] = useState(false);
  const [showBloom, setShowBloom] = useState(false);
  const [wordRevealed, setWordRevealed] = useState<boolean[]>([false, false, false]);
  const [showDivider, setShowDivider] = useState(false);
  const [showName, setShowName] = useState(false);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [buttonPhase, setButtonPhase] = useState<'hidden' | 'dot' | 'outline' | 'filled' | 'text'>('hidden');

  const skipped = useRef(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<number[]>([]);
  const [ribbonTipRange, setRibbonTipRange] = useState<{ start: number; end: number } | null>(null);

  /* ── Preload image ── */
  useEffect(() => {
    const img = new Image();
    let cancelled = false;
    img.onload = () => { if (!cancelled) setImageStatus('loaded'); };
    img.onerror = () => { if (!cancelled) setImageStatus('error'); };
    img.src = BG_IMAGE_PRELOAD;
    return () => { cancelled = true; img.onload = null; img.onerror = null; };
  }, []);

  /* ── Skip cinematic (graceful 300ms cascade) ── */
  const skipToEnd = useCallback(() => {
    if (skipped.current) return;
    skipped.current = true;

    setShowBlack(false);
    setApertureOpen(true);
    setShowLightLeak(true);
    timersRef.current.push(
      window.setTimeout(() => {
        setShowDust(true);
        setShowGrain(true);
        setShowBloom(true);
        setSparkleVisible([true, true, true, true, true]);
        setShowRibbon(true);
        setShowRibbonTip(true);
      }, 80),
      window.setTimeout(() => {
        setWordRevealed([true, true, true]);
        setShowDivider(true);
        setShowName(true);
        setShowSubtitle(true);
        setButtonPhase('text');
      }, 200),
    );
  }, []);

  /* ── Skip event listeners ── */
  useEffect(() => {
    const handleSkip = (e: Event) => {
      if (buttonRef.current && buttonRef.current.contains(e.target as Node)) return;
      skipToEnd();
    };
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        if (
          buttonRef.current &&
          document.activeElement === buttonRef.current &&
          (e.key === 'Enter' || e.key === ' ')
        ) return;
        skipToEnd();
      }
    };

    window.addEventListener('wheel', handleSkip, { passive: true });
    window.addEventListener('touchstart', handleSkip, { passive: true });
    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('wheel', handleSkip);
      window.removeEventListener('touchstart', handleSkip);
      window.removeEventListener('keydown', handleKey);
    };
  }, [skipToEnd]);

  /* ── Ribbon-tip travel range (8%→92% of container, as pixels) ── */
  useLayoutEffect(() => {
    const measure = () => {
      const el = containerRef.current;
      if (!el) return;
      const w = el.offsetWidth;
      setRibbonTipRange({ start: w * 0.08, end: w * 0.92 });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  /* ── Clear skip/enter timers on unmount ── */
  useEffect(() => {
    const pending = timersRef.current;
    return () => pending.forEach(clearTimeout);
  }, []);

  /* ── Animation timeline ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const s = (delay: number, fn: () => void) =>
      setTimeout(() => { if (!skipped.current) fn(); }, delay);

    const timers = [
      s(T.SPARKLE_1, () => setSparkleVisible(p => { const n = [...p]; n[0] = true; return n; })),
      s(T.SPARKLE_2, () => setSparkleVisible(p => { const n = [...p]; n[1] = true; return n; })),
      s(T.SPARKLE_3, () => setSparkleVisible(p => { const n = [...p]; n[2] = true; return n; })),
      s(T.SPARKLE_4, () => setSparkleVisible(p => { const n = [...p]; n[3] = true; return n; })),
      s(T.SPARKLE_5, () => setSparkleVisible(p => { const n = [...p]; n[4] = true; return n; })),
      s(T.RIBBON, () => { setShowRibbon(true); setShowRibbonTip(true); }),
      s(T.LIGHT_LEAK, () => setShowLightLeak(true)),
      s(T.APERTURE, () => { setApertureOpen(true); setShowBlack(false); }),
      s(T.DUST, () => setShowDust(true)),
      s(T.GRAIN, () => setShowGrain(true)),
      s(T.BLOOM, () => setShowBloom(true)),
      s(T.WORD_1, () => setWordRevealed(p => { const n = [...p]; n[0] = true; return n; })),
      s(T.WORD_2, () => setWordRevealed(p => { const n = [...p]; n[1] = true; return n; })),
      s(T.WORD_3, () => setWordRevealed(p => { const n = [...p]; n[2] = true; return n; })),
      s(T.DIVIDER, () => setShowDivider(true)),
      s(T.NAME, () => setShowName(true)),
      s(T.SUBTITLE, () => setShowSubtitle(true)),
      s(T.BUTTON_DOT, () => setButtonPhase('dot')),
      s(T.BUTTON_OUTLINE, () => setButtonPhase('outline')),
      s(T.BUTTON_FILL, () => setButtonPhase('filled')),
      s(T.BUTTON_TEXT, () => setButtonPhase('text')),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  /* ── Post-enter timer ── */
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = prefersReduced ? 100 : T.BUTTON_TEXT + 600;
    const timer = setTimeout(() => setShowPostEnter(true), delay);
    return () => clearTimeout(timer);
  }, []);

  /* ── ENTER click ── */
  const handleEnter = useCallback(() => {
    if (entered) return;
    skipped.current = true;
    setEntered(true);
    setRipple(true);
    setShowConfetti(true);
    timersRef.current.push(
      window.setTimeout(() => setRipple(false), 600),
      window.setTimeout(() => setMergePhase('compact'), 1200),
    );
  }, [entered]);

  /* ── Reduced motion fallback ── */
  const prefersReduced =
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false;

  if (prefersReduced) {
    return (
      <section className="hero-section" aria-label="Hero" role="banner">
        {imageStatus !== 'error' && (
          <picture>
            <source type="image/avif" srcSet={BG_IMAGE_AVIF} sizes={BG_IMAGE_SIZES} />
            <img src={BG_IMAGE_PATH} alt="" aria-hidden="true" className="hero-section__bg hero-section__bg--loaded" />
          </picture>
        )}
        {imageStatus === 'error' && <div className="hero-section__fallback" aria-hidden="true" />}
        <div className="hero-section__color-grade" aria-hidden="true" />
        <div className="hero-section__vignette" aria-hidden="true" />
        <div className="hero-section__overlay" aria-hidden="true" />
        <div className="hero-section__content">
          <div className="hero-section__pre-title">
            <span className="hero-section__word">HAPPY</span>
            <span className="hero-section__word">19TH</span>
            <span className="hero-section__word">BIRTHDAY</span>
          </div>
          <div className="hero-section__divider" aria-hidden="true">
            <span className="hero-section__divider-diamond" />
          </div>
          <h1 className="hero-section__title">
            <span className="hero-section__title-gradient">Ibhi</span>
          </h1>
          <p className="hero-section__subtitle">Nineteen looks beautiful on you.</p>
          <button ref={buttonRef} type="button" className="hero-section__enter" onClick={handleEnter} aria-label="Enter website">
            ENTER →
          </button>
        </div>
        <div className="hero-section__scroll" aria-hidden="true">
          <span className="hero-section__scroll-label">Scroll</span>
          <ChevronDown />
        </div>
      </section>
    );
  }

  /* ═══ Full cinematic sequence ═══════════════════════ */

  // ── Sparkle renderer ──
  const renderSparkle = (idx: number) => {
    if (!sparkleVisible[idx]) return null;
    const isCenter = idx === 0;
    return (
      <div
        key={`sparkle-wrapper-${SPARKLE_POSITIONS[idx].x}-${SPARKLE_POSITIONS[idx].y}`}
        style={{
          position: 'absolute',
          left: SPARKLE_POSITIONS[idx].x,
          top: SPARKLE_POSITIONS[idx].y,
          transform: 'translate(-50%, -50%)',
          zIndex: 19,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          className={`hero-section__sparkle ${isCenter ? 'hero-section__sparkle--center' : ''}`}
          style={{
            position: 'relative',
            width: isCenter ? '4px' : idx < 3 ? '3px' : '2.5px',
            height: isCenter ? '4px' : idx < 3 ? '3px' : '2.5px',
          }}
          initial={
            isCenter
              ? { opacity: 0, scale: 0 }
              : { opacity: 0, scale: 0, x: SPARKLE_DRIFT[idx].x, y: SPARKLE_DRIFT[idx].y }
          }
          animate={
            isCenter
              ? { opacity: 1, scale: [1, 1.6, 1] }
              : { opacity: 1, scale: [0.8, 1.1, 0.9], x: 0, y: 0 }
          }
          transition={
            isCenter
              ? { duration: 0.6, ease: 'easeOut' }
              : {
                  x: { duration: 1.6, ease: [0.22, 1, 0.36, 1] },
                  y: { duration: 1.6, ease: [0.34, 1.1, 0.5, 1] },
                  opacity: { duration: 0.4, ease: 'easeOut' },
                  scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
                }
          }
        />
      </div>
    );
  };

  return (
    <motion.section
      layout
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`hero-section ${mergePhase === 'compact' ? 'hero-section--compact' : ''}`}
      aria-label="Hero"
      role="banner"
      ref={containerRef}
    >
      {/* ══════════════════════════════════════════════════
         PHASE 1 — DARK ANTICIPATION (0–2.2s)
         ══════════════════════════════════════════════════ */}

      {/* 0.0s–2.2s: Rich warm-black prelude */}
      <AnimatePresence>
        {showBlack && (
          <motion.div
            className="hero-section__black"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Subtle texture in the black — like fine wrapping paper */}
            <div className="hero-section__black-texture" aria-hidden="true" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 0.4s–1.3s: Sparkle constellation */}
      {renderSparkle(0)}
      {[1, 2, 3, 4].map(i => renderSparkle(i))}

      {/* 1.6s: Gold ribbon sweep — the gift wrap metaphor */}
      {showRibbon && (
        <>
          <motion.div
            className="hero-section__ribbon"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {showRibbonTip && (
            <motion.div
              className="hero-section__ribbon-tip"
              initial={{ x: ribbonTipRange?.start ?? 0, y: '-50%', opacity: 0 }}
              animate={{ x: ribbonTipRange?.end ?? 0, y: '-50%', opacity: [0, 1, 0.7, 0] }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            />
          )}
        </>
      )}

      {/* 1.8s: Warm light leak — light through wrapping paper */}
      {showLightLeak && (
        <motion.div
          className="hero-section__light-leak"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          aria-hidden="true"
        />
      )}

      {/* Giant translucent 19 — recurring motif background */}
      <div className="hero-section__bg-nineteen" aria-hidden="true">19</div>

      {/* ══════════════════════════════════════════════════
         PHASE 2 — UNWRAPPING (2.2s+)
         ══════════════════════════════════════════════════ */}

      {/* 2.2s: Aperture opens — photo revealed */}
      <motion.div
        className={`hero-section__aperture ${entered ? 'hero-section__aperture--entered' : ''}`}
        initial={{ clipPath: 'inset(50% 0 50% 0)' }}
        animate={{
          clipPath: apertureOpen ? 'inset(0 0 0 0)' : 'inset(50% 0 50% 0)',
          scale: entered ? 1.03 : 1,
        }}
        transition={{
          clipPath: { duration: 1.0, ease: [0.22, 1, 0.36, 1] },
          scale: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        }}
      >
        {imageStatus !== 'error' && (
          <picture>
            <source type="image/avif" srcSet={BG_IMAGE_AVIF} sizes={BG_IMAGE_SIZES} />
            <img
              src={BG_IMAGE_PATH}
              alt=""
              aria-hidden="true"
              className={`hero-section__bg hero-section__bg--cinematic ${
                imageStatus === 'loaded' ? 'hero-section__bg--loaded' : 'hero-section__bg--loading'
              }`}
            />
          </picture>
        )}
      </motion.div>

      {imageStatus === 'error' && <div className="hero-section__fallback" aria-hidden="true" />}

      {/* Warm color grade — golden hour film treatment */}
      <div className="hero-section__color-grade" aria-hidden="true" />

      {/* Vignette — photographic depth */}
      <div className="hero-section__vignette" aria-hidden="true" />

      {/* Light bloom — soft golden glow */}
      <motion.div
        className="hero-section__bloom"
        initial={{ opacity: 0 }}
        animate={showBloom ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
        aria-hidden="true"
      />

      {/* Film grain */}
      <div
        className={`hero-section__grain ${showGrain ? 'hero-section__grain--visible' : ''}`}
        aria-hidden="true"
      />

      {/* Floating particles */}
      {showDust && DUST_MOTES.map((mote, i) => (
        <div
          key={`dust-${i}`}
          className="hero-section__dust"
          style={{
            left: mote.x,
            top: mote.y,
            width: mote.size,
            height: mote.size,
            animationDelay: mote.delay,
            animationDuration: mote.dur,
          }}
        />
      ))}

      {/* Gradient overlay — text readability */}
      <div className="hero-section__overlay" aria-hidden="true" />

      {/* Ambient sparkles (after aperture, only on photo area) */}
      {apertureOpen && imageStatus === 'loaded' && (
        <AmbientSparkles density="low" color="var(--gold-light, #E0C99A)" twinkle />
      )}

      {/* ══════════════════════════════════════════════════
         PHASE 3 — TYPOGRAPHY & INTERACTION (3.2s+)
         ══════════════════════════════════════════════════ */}

      <div className="hero-section__content">
        <AnimatePresence mode="wait">
          {!entered && (
            <motion.div
              key="cinematic-content"
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              {/* Pre-title: word-by-word clip reveal */}
              <div className="hero-section__pre-title">
                <WordReveal revealed={wordRevealed[0]}>HAPPY</WordReveal>
                <WordReveal revealed={wordRevealed[1]}>19TH</WordReveal>
                <WordReveal revealed={wordRevealed[2]}>BIRTHDAY</WordReveal>
              </div>

              {/* Gold decorative divider */}
              <GoldDivider show={showDivider} />

              {/* Name — the emotional anchor */}
              {showName && (
                <motion.h1
                  className="hero-section__title"
                  initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="hero-section__title-gradient">Ibhi</span>
                  {/* Light sweep across the name */}
                  <span className="hero-section__title-sweep" aria-hidden="true" />
                </motion.h1>
              )}

              {/* Subtitle */}
              {showSubtitle && (
                <motion.p
                  className="hero-section__subtitle"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  Nineteen looks beautiful on you.
                </motion.p>
              )}

              {/* ENTER button — morphing sequence */}
              {buttonPhase !== 'hidden' && (
                <div className="hero-section__enter-wrapper">
                  {buttonPhase === 'dot' && (
                    <motion.button
                      type="button"
                      className="hero-section__enter hero-section__enter--dot"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      aria-label="Enter website"
                    />
                  )}
                  {buttonPhase === 'outline' && (
                    <motion.button
                      type="button"
                      className="hero-section__enter hero-section__enter--outline"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      aria-label="Enter website"
                    />
                  )}
                  {buttonPhase === 'filled' && (
                    <motion.button
                      type="button"
                      className="hero-section__enter hero-section__enter--filled"
                      initial={{ scale: 0.95, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      aria-label="Enter website"
                    />
                  )}
                  {buttonPhase === 'text' && (
                    <motion.button
                      ref={buttonRef}
                      type="button"
                      className="hero-section__enter"
                      onClick={handleEnter}
                      aria-label="Enter website"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      ENTER →
                    </motion.button>
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Expanding ripple on ENTER click */}
        {ripple && (
          <motion.div
            className="hero-section__ripple"
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        )}

        {/* Confetti burst */}
        {showConfetti && <ConfettiBurst level="tiny" />}

        {/* Post-enter content */}
        {entered && showPostEnter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="hero-section__pre-title">
              <span className="hero-section__word">HAPPY</span>
              <span className="hero-section__word">19TH</span>
              <span className="hero-section__word">BIRTHDAY</span>
            </div>
            <div className="hero-section__divider" aria-hidden="true">
              <span className="hero-section__divider-diamond" />
            </div>
            <h1 className="hero-section__title">
              <span className="hero-section__title-gradient">Ibhi</span>
            </h1>
            <p className="hero-section__subtitle">
              Nineteen looks beautiful on you.
            </p>
          </motion.div>
        )}
      </div>

      {/* Playful footnote */}
      {entered && (
        <motion.p
          className="hero-section__footnote"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          I could&apos;ve just sent a text.
        </motion.p>
      )}

      {/* Scroll indicator */}
      {entered && (
        <motion.div
          className="hero-section__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          aria-hidden="true"
        >
          <span className="hero-section__scroll-label">Scroll</span>
          <ChevronDown />
        </motion.div>
      )}
    </motion.section>
  );
}
