import { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './FinalSurprise.css';

/* ─── Types ─────────────────────────────────────────────── */

interface StarPoint {
  x: number;
  y: number;
}

interface Balloon {
  x: number;
  size: number;
  color: string;
  sway: number;
}

/* ─── Constellation ───────────────────────────────────── */

const CONSTELLATION_STARS: StarPoint[] = [
  { x: 50, y: 3 },   // 0  — top centre dip
  { x: 38, y: 6 },   // 1  — top left inner
  { x: 24, y: 13 },  // 2  — top left outer
  { x: 12, y: 28 },  // 3  — left upper
  { x: 7,  y: 45 },  // 4  — left widest
  { x: 13, y: 62 },  // 5  — left lower
  { x: 26, y: 78 },  // 6  — left near bottom
  { x: 40, y: 86 },  // 7  — left bottom
  { x: 50, y: 90 },  // 8  — bottom tip
  { x: 60, y: 86 },  // 9  — right bottom
  { x: 74, y: 78 },  // 10 — right near bottom
  { x: 87, y: 62 },  // 11 — right lower
  { x: 93, y: 45 },  // 12 — right widest
  { x: 88, y: 28 },  // 13 — right upper
  { x: 76, y: 13 },  // 14 — top right outer
  { x: 62, y: 6 },   // 15 — top right inner
];

/** Pairs of star indices that form the constellation outline + inner fill. */
const CONSTELLATION_LINES: [number, number][] = [
  // Heart outline
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14], [14, 15], [15, 0],
  // Inner cross-lines for a filled constellation look
  [1, 15], [2, 14], [3, 13], [4, 12], [5, 11], [6, 10], [7, 9],
];

/* ─── Balloons ─────────────────────────────────────────── */

const BALLOON_COLORS = [
  '#C8A46B', // gold
  '#E0C99A', // light gold
  '#FF9FF3', // pink
  '#A29BFE', // lavender
  '#FF6B6B', // coral
  '#74B9FF', // sky blue
  '#FDCB6E', // warm yellow
  '#E17055', // terracotta
];

const BALLOONS: Balloon[] = Array.from({ length: 10 }, (_, i) => ({
  x: 5 + Math.random() * 90,
  size: 36 + Math.random() * 36,
  color: BALLOON_COLORS[i % BALLOON_COLORS.length],
  sway: 4 + Math.random() * 10,
}));

/* ─── Timing map ──────────────────────────────────────────
   Each step advances only when the previous is complete.
   Durations in ms from mount.
   t=0       — section fades to black (CSS)
   t=1200    — stars begin appearing (stagger via CSS delay)
   t=4500    — constellation lines draw + photo fades in
   t=6500    — typewriter text starts (CSS typing animation)
   t=12000   — text transitions to "Happy Birthday Ibhi ✨"
   t=13500   — fireworks + balloons + continuous confetti
   ──────────────────────────────────────────────────────── */

type Step = 0 | 1 | 2 | 3 | 4 | 5;

const STEP_TIMING: { at: number; step: Step }[] = [
  { at: 1200, step: 1 },
  { at: 4500, step: 2 },
  { at: 6500, step: 3 },
  { at: 12000, step: 4 },
  { at: 13500, step: 5 },
];

/* ─── Firework helpers ─────────────────────────────────── */

const FIREWORK_COLORS = [
  '#C8A46B', '#E0C99A', '#FFD700',
  '#FF6B6B', '#FF4081', '#FF9FF3', '#A29BFE',
];

const FIREWORK_POSITIONS = [
  { x: 0.2, y: 0.3 },
  { x: 0.8, y: 0.25 },
  { x: 0.5, y: 0.15 },
  { x: 0.3, y: 0.55 },
  { x: 0.7, y: 0.5 },
  { x: 0.1, y: 0.45 },
  { x: 0.9, y: 0.35 },
  { x: 0.5, y: 0.4 },
];

function shuffleCopy<T>(arr: readonly T[]): T[] {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/* ─── Distance between two star points (for stroke-dasharray) ── */

function lineLength(a: StarPoint, b: StarPoint): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/* ════════════════════════════════════════════════════════
   Component
   ════════════════════════════════════════════════════════ */

export default function FinalSurprise() {
  const [step, setStep] = useState<Step>(0);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fireworksStarted = useRef(false);
  const photoRef = useRef<HTMLImageElement>(null);

  /* ── Detect prefers-reduced-motion ───────────────────── */
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setReducedMotion(e.matches);

    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  /* ── Preload photo ───────────────────────────────────── */
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageLoaded(true); // still show fallback
    img.src = '/images/ibhi-friend/1741450804644.jpg';
    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  /* ── Sequence state machine ──────────────────────────── */
  useEffect(() => {
    if (reducedMotion) {
      setStep(5);
      return;
    }

    const timers = STEP_TIMING.map(({ at, step: s }) =>
      window.setTimeout(() => setStep(s), at),
    );

    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  /* ── Fireworks + confetti (trigger once at step 5) ──── */
  useEffect(() => {
    if (step < 5 || fireworksStarted.current) return;
    fireworksStarted.current = true;

    /* Multi-burst fireworks */
    FIREWORK_POSITIONS.forEach((pos, i) => {
      setTimeout(() => {
        const picked = shuffleCopy(FIREWORK_COLORS).slice(0, 4);
        confetti({
          particleCount: 80 + Math.floor(Math.random() * 60),
          spread: 55 + Math.random() * 45,
          origin: pos,
          colors: picked,
          startVelocity: 28 + Math.random() * 22,
          ticks: 180,
          gravity: 1.1,
        });
      }, i * 350);
    });

    /* Side-cannons (smaller bursts from edges) */
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        confetti({
          particleCount: 16,
          angle: i % 2 === 0 ? 60 : 120,
          spread: 40,
          origin: { x: i % 2 === 0 ? 0 : 1, y: 0.35 + Math.random() * 0.3 },
          colors: shuffleCopy(FIREWORK_COLORS).slice(0, 3),
          startVelocity: 35,
        });
      }, 200 + i * 450);
    }

    /* Continuous confetti rain (5 seconds) */
    const endTime = Date.now() + 5000;
    let running = true;

    function confettiRain() {
      if (!running) return;

      confetti({
        particleCount: 2,
        angle: 65,
        spread: 50,
        origin: { x: 0, y: -0.05 },
        colors: ['#C8A46B', '#FFD700', '#FF9FF3'],
        startVelocity: 20 + Math.random() * 15,
      });
      confetti({
        particleCount: 2,
        angle: 115,
        spread: 50,
        origin: { x: 1, y: -0.05 },
        colors: ['#C8A46B', '#FFD700', '#A29BFE'],
        startVelocity: 20 + Math.random() * 15,
      });

      if (Date.now() < endTime) {
        requestAnimationFrame(confettiRain);
      }
    }
    requestAnimationFrame(confettiRain);

    return () => {
      running = false;
    };
  }, [step]);

  /* ── Render helpers ──────────────────────────────────── */

  function renderStars() {
    return (
      <div className="fs-stars-container" aria-hidden="true">
        {CONSTELLATION_STARS.map((s, i) => (
          <div
            key={i}
            className="fs-star"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              animationDelay: `${i * 0.12}s`,
            }}
          />
        ))}
      </div>
    );
  }

  function renderConstellation() {
    return (
      <svg
        className="fs-constellation-svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {CONSTELLATION_LINES.map(([fromIdx, toIdx], i) => {
          const a = CONSTELLATION_STARS[fromIdx];
          const b = CONSTELLATION_STARS[toIdx];
          const length = lineLength(a, b);
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="#C8A46B"
              strokeWidth="0.35"
              strokeLinecap="round"
              strokeDasharray={length}
              strokeDashoffset={length}
              style={
                {
                  '--line-length': length,
                  animationDelay: `${i * 0.1}s`,
                } as React.CSSProperties
              }
              className="fs-constellation-line"
            />
          );
        })}
      </svg>
    );
  }

  function renderPhoto() {
    return (
      <div className="fs-photo-wrapper" aria-label="Special memory photograph">
        <img
          ref={photoRef}
          src="/images/ibhi-friend/1741450804644.jpg"
          alt="A cherished memory"
          className="fs-photo"
          loading="lazy"
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      </div>
    );
  }

  function renderTypewriter() {
    return (
      <div className="fs-typewriter">
        <span className="fs-typewriter-line fs-typing-1">
          Out of billions of people...
        </span>
        <span className="fs-typewriter-line fs-typing-2">
          I&rsquo;m grateful our paths crossed.
        </span>
      </div>
    );
  }

  function renderFinalText() {
    return (
      <div className="fs-final-text" role="heading" aria-level={1}>
        Happy Birthday Ibhi{' '}
        <span className="fs-star" aria-label="star">
          ✨
        </span>
      </div>
    );
  }

  function renderBalloons() {
    return (
      <div className="fs-balloons-container" aria-hidden="true">
        {BALLOONS.map((b, i) => (
          <div
            key={i}
            className="fs-balloon"
            style={{
              left: `${b.x}%`,
              width: b.size,
              height: b.size * 1.25,
              background: `radial-gradient(circle at 35% 30%, ${b.color}, ${b.color}dd 60%, ${b.color}88)`,
              animationDelay: `${i * 0.25}s, ${i * 0.3}s`,
              '--sway': `${b.sway}px`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    );
  }

  /* ══════════════════════════════════════════════════════
     Render
     ══════════════════════════════════════════════════════ */

  return (
    <section
      className="fs-section"
      aria-label="Final birthday surprise"
      role="region"
    >
      {/* Always show stars once step >= 1 */}
      {step >= 1 && renderStars()}

      {/* Constellation + photo at step >= 2 */}
      {step >= 2 && renderConstellation()}
      {step >= 2 && renderPhoto()}

      {/* Typewriter text at step 3, final text from step 4 */}
      <div className="fs-text-container">
        {step === 3 && renderTypewriter()}
        {step >= 4 && renderFinalText()}
      </div>

      {/* Balloons at step 5 */}
      {step >= 5 && renderBalloons()}
    </section>
  );
}
