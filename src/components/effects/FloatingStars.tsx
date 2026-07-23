import { useEffect, useRef } from 'react';

// ── Constants ──────────────────────────────────────────────────────────

const MAX_STARS = 15;
const SIZE_MIN = 14;
const SIZE_MAX = 22;
const DURATION_MIN = 6000; // ms
const DURATION_MAX = 10000; // ms
const SPAWN_INTERVAL_MIN = 3000; // ms
const SPAWN_INTERVAL_MAX = 4000; // ms

const COLORS = [
  '#FFD700', // gold
  '#E0C99A', // light gold
  '#C8A46B', // muted gold
  '#FFDAB9', // peach
  '#FFF8DC', // cornsilk
  '#F0E68C', // khaki
  '#DAA520', // goldenrod
  '#FFE4B5', // moccasin
];

// ── Injected CSS keyframes (5 sinusoidal sway patterns) ────────────────
// Each animation floats a star from below the viewport upward while
// swaying left/right along an approximate sine wave, fading in at 8%
// and fading out in the final ~20% of the animation.

const STYLE_ID = 'floating-stars-keyframes';

const KEYFRAMES = `
@keyframes sf0 {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  20%  { transform: translateY(-22vh) translateX(12px); }
  40%  { transform: translateY(-44vh) translateX(-6px); }
  60%  { transform: translateY(-66vh) translateX(16px); }
  80%  { transform: translateY(-88vh) translateX(-2px); opacity: 1; }
  100% { transform: translateY(-110vh) translateX(8px); opacity: 0; }
}
@keyframes sf1 {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  20%  { transform: translateY(-22vh) translateX(-14px); }
  40%  { transform: translateY(-44vh) translateX(10px); }
  60%  { transform: translateY(-66vh) translateX(-8px); }
  80%  { transform: translateY(-88vh) translateX(18px); opacity: 1; }
  100% { transform: translateY(-110vh) translateX(-4px); opacity: 0; }
}
@keyframes sf2 {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  20%  { transform: translateY(-22vh) translateX(20px); }
  40%  { transform: translateY(-44vh) translateX(-12px); }
  60%  { transform: translateY(-66vh) translateX(6px); }
  80%  { transform: translateY(-88vh) translateX(-16px); opacity: 1; }
  100% { transform: translateY(-110vh) translateX(10px); opacity: 0; }
}
@keyframes sf3 {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  20%  { transform: translateY(-22vh) translateX(-6px); }
  40%  { transform: translateY(-44vh) translateX(22px); }
  60%  { transform: translateY(-66vh) translateX(-14px); }
  80%  { transform: translateY(-88vh) translateX(8px); opacity: 1; }
  100% { transform: translateY(-110vh) translateX(-10px); opacity: 0; }
}
@keyframes sf4 {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  8%   { opacity: 1; }
  20%  { transform: translateY(-22vh) translateX(4px); }
  40%  { transform: translateY(-44vh) translateX(-18px); }
  60%  { transform: translateY(-66vh) translateX(10px); }
  80%  { transform: translateY(-88vh) translateX(-22px); opacity: 1; }
  100% { transform: translateY(-110vh) translateX(14px); opacity: 0; }
}
`;

// ── Helpers ──────────────────────────────────────────────────────────────

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rand(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

// ── Component ──────────────────────────────────────────────────────────

/**
 * FloatingStars — warm overlay that spawns ⭐ stars near the
 * bottom of the viewport every 3-4 seconds. Each star:
 *
 *  - Is 14-22 px in size, in a gold-to-warm colour
 *  - Starts at a random X position (5 % – 95 %)
 *  - Rises over 6-10 s with sinusoidal side-to-side swaying
 *  - Fades out in the final ~20 % of its journey
 *
 * Performance features:
 *  - Respects `prefers-reduced-motion: reduce`
 *  - CSS-animated (GPU-composited transform + opacity)
 *  - Auto-removes stars after their animation ends
 *  - Caps at 15 concurrent stars
 *  - Full cleanup on unmount
 */
const FloatingStars: React.FC = () => {
  const starsRef = useRef<Set<HTMLSpanElement>>(new Set());
  const spawnTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const styleRef = useRef<HTMLStyleElement | null>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const existingStyle = document.getElementById(STYLE_ID);
    if (!existingStyle) {
      const styleEl = document.createElement('style');
      styleEl.id = STYLE_ID;
      styleEl.textContent = KEYFRAMES;
      document.head.appendChild(styleEl);
      styleRef.current = styleEl;
    }

    const container = document.createElement('div');
    container.style.cssText = [
      'position: fixed',
      'inset: 0',
      'pointer-events: none',
      'z-index: 100',
      'overflow: hidden',
    ].join(';');
    document.body.appendChild(container);
    containerRef.current = container;

    function spawnStar(): void {
      const stars = starsRef.current;
      if (stars.size >= MAX_STARS) return;

      const size = rand(SIZE_MIN, SIZE_MAX);
      const color = pick(COLORS);
      const duration = rand(DURATION_MIN, DURATION_MAX);
      const animIdx = Math.floor(Math.random() * 5);
      const leftPct = rand(5, 95);

      const star = document.createElement('span');
      star.textContent = '⭐';
      star.style.cssText = [
        'position: absolute',
        `left: ${leftPct}%`,
        'bottom: -5%',
        `font-size: ${size}px`,
        `color: ${color}`,
        `animation: sf${animIdx} ${duration}ms ease-in-out forwards`,
        'will-change: transform, opacity',
      ].join(';');

      star.addEventListener('animationend', () => {
        star.remove();
        stars.delete(star);
      });

      container.appendChild(star);
      stars.add(star);
    }

    function scheduleSpawn(): void {
      const delay = rand(SPAWN_INTERVAL_MIN, SPAWN_INTERVAL_MAX);
      spawnTimerRef.current = setTimeout(() => {
        spawnStar();
        scheduleSpawn();
      }, delay);
    }

    spawnStar();
    scheduleSpawn();

    return () => {
      if (spawnTimerRef.current) clearTimeout(spawnTimerRef.current);
      styleRef.current?.remove();
      starsRef.current.forEach((s) => s.remove());
      starsRef.current.clear();
      containerRef.current?.remove();
    };
  }, []);

  return null;
};

export default FloatingStars;
