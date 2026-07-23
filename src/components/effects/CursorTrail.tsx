import { useEffect, useRef } from 'react';

// ── Types ──────────────────────────────────────────────────────────────

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  createdAt: number; // performance.now() timestamp
  dx: number; // unit vector x
  dy: number; // unit vector y
}

// ── Constants ──────────────────────────────────────────────────────────

const GOLD = '#C8A46B';
const GOLD_GLOW = '#F5E6C8';
const MAX_PARTICLES = 20;
const THROTTLE_MS = 50;
const DURATION_MIN = 800;
const DURATION_MAX = 1200;
const SIZE_MIN = 4;
const SIZE_MAX = 8;
const DRIFT_DISTANCE = 40; // px the particle travels before fully faded

// ── Helpers ────────────────────────────────────────────────────────────

function isDesktop(): boolean {
  if (typeof window === 'undefined') return false;
  // Only enable on devices with a fine pointer (mouse) and hover capability
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Draw a 4-pointed sparkle star centred at (cx, cy).
 * The star is drawn as two overlapping diamonds (an 8-point star shape
 * via the standard N-pointed-star algorithm).
 */
function drawSparkle(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  size: number,
  rotation: number,
) {
  const outerR = size / 2;
  const innerR = outerR * 0.35;
  const spikes = 4;
  const step = Math.PI / spikes;
  let rot = -Math.PI / 2 + rotation;

  ctx.beginPath();
  ctx.moveTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);

  for (let i = 0; i < spikes; i++) {
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
  }

  ctx.closePath();
}

// ── Component ──────────────────────────────────────────────────────────

const CursorTrail: React.FC = () => {
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const lastAddedRef = useRef<number>(0);
  const idCounterRef = useRef<number>(0);

  useEffect(() => {
    if (!isDesktop()) return;

    // ── Canvas setup ───────────────────────────────────────────────

    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
      position: fixed;
      inset: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d')!;

    function resize() {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener('resize', resize);

    // ── Animation loop ─────────────────────────────────────────────

    function animate(now: number) {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const particles = particlesRef.current;

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        const age = now - p.createdAt;
        const duration = DURATION_MIN + ((p.id % 7) / 7) * (DURATION_MAX - DURATION_MIN);

        if (age >= duration) {
          // Swap-remove (faster for unordered array)
          particles[i] = particles[particles.length - 1];
          particles.pop();
          continue;
        }

        const progress = age / duration; // 0 → 1
        const easeOut = 1 - Math.pow(1 - progress, 3); // cubic ease-out for position
        const currentOpacity = p.opacity * (1 - easeOut);

        const moveX = p.dx * DRIFT_DISTANCE * easeOut;
        const moveY = p.dy * DRIFT_DISTANCE * easeOut;
        const currentSize = p.size * (1 - progress * 0.3); // shrink subtly

        ctx.save();
        ctx.globalAlpha = currentOpacity;

        // Outer glow
        ctx.shadowColor = GOLD_GLOW;
        ctx.shadowBlur = 6;

        ctx.fillStyle = GOLD;
        drawSparkle(ctx, p.x + moveX, p.y + moveY, currentSize, p.rotation + progress * Math.PI);
        ctx.fill();

        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(animate);
    }

    rafRef.current = requestAnimationFrame(animate);

    // ── Mouse handler (throttled) ──────────────────────────────────

    function onMouseMove(e: MouseEvent) {
      const now = performance.now();
      if (now - lastAddedRef.current < THROTTLE_MS) return;
      lastAddedRef.current = now;

      const particles = particlesRef.current;

      // Enforce max particles — remove oldest
      if (particles.length >= MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES + 1);
      }

      const angle = Math.random() * Math.PI * 2;

      particles.push({
        id: idCounterRef.current++,
        x: e.clientX,
        y: e.clientY,
        size: SIZE_MIN + Math.random() * (SIZE_MAX - SIZE_MIN),
        opacity: 0.5 + Math.random() * 0.4,
        rotation: Math.random() * Math.PI * 2,
        createdAt: now,
        dx: Math.cos(angle),
        dy: Math.sin(angle),
      });
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Cleanup ───────────────────────────────────────────────────

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', resize);
      document.body.removeChild(canvas);
      particlesRef.current = [];
    };
  }, []);

  return null;
};

export default CursorTrail;
