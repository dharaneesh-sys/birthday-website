import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import './Hero.css';

/* ─── Types ─────────────────────────────────────────────── */

export interface HeroProps {
  /** Callback fired when the user clicks "Begin Our Story" */
  onBegin?: () => void;
}

/* ─── Constants ─────────────────────────────────────────── */

const TAGLINES = [
  'You made ordinary days unforgettable.',
  'Thank you for every smile.',
  'Every memory became special because you were there.',
  'You deserve the happiest birthday.',
] as const;

const TAGLINE_INTERVAL_MS = 4_000;
const FADE_DURATION_MS = 700;
const PARTICLE_COUNT = 30;

const BG_IMAGE_PATH = '/images/ibhi-friend/1741450804644.jpg';

/* ─── Particle generation ───────────────────────────────── */

interface Particle {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

function createParticles(): Particle[] {
  return Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: 2 + Math.random() * 4,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.45,
  }));
}

/* ─── Entrance animation variants ──────────────────────── */

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.3,
    },
  },
};

const childVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

const btnVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: 'easeOut', delay: 1.2 },
  },
};

/* ─── Component ─────────────────────────────────────────── */

export default function Hero({ onBegin }: HeroProps) {
  /* Tagline rotation */
  const [taglineIndex, setTaglineIndex] = useState(0);
  const [taglineFading, setTaglineFading] = useState(false);

  /* Exiting state (from button click) */
  const [exiting, setExiting] = useState(false);
  const beginFired = useRef(false);

  /* Image load / error */
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  /* Reduced-motion detection */
  const [reducedMotion, setReducedMotion] = useState(false);

  /* Particles (stable across renders) */
  const particles = useMemo(() => createParticles(), []);

  /* ── Side effects ────────────────────────────────────── */

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent | MediaQueryList) =>
      setReducedMotion(e.matches);

    handler(mq);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Rotate taglines on interval
  useEffect(() => {
    const id = window.setInterval(() => {
      setTaglineFading(true);

      window.setTimeout(() => {
        setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
        setTaglineFading(false);
      }, FADE_DURATION_MS);
    }, TAGLINE_INTERVAL_MS);

    return () => window.clearInterval(id);
  }, []);

  // Preload background image
  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.onerror = () => setImageError(true);
    img.src = BG_IMAGE_PATH;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  /* ── Handlers ────────────────────────────────────────── */

  const handleBegin = useCallback(() => {
    if (beginFired.current) return;
    beginFired.current = true;

    setExiting(true);

    // Wait for exit animation before calling onBegin
    setTimeout(() => {
      onBegin?.();
    }, 600);
  }, [onBegin]);

  /* ── Render ──────────────────────────────────────────── */

  return (
    <section
      className={`hero${exiting ? ' hero--exiting' : ''}`}
      aria-label="Birthday hero"
      role="banner"
    >
      {/* Background image */}
      {!imageError && (
        <img
          src={BG_IMAGE_PATH}
          alt=""
          className="hero-bg"
          aria-hidden="true"
          loading="lazy"
          style={{ opacity: imageLoaded ? 1 : 0 }}
        />
      )}

      {/* Fallback gradient if image fails */}
      {imageError && (
        <div
          className="hero-bg"
          style={{
            background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
          }}
          aria-hidden="true"
        />
      )}

      {/* Dark overlay */}
      <div className="hero-overlay" aria-hidden="true" />

      {/* Particles (disabled when reduced motion) */}
      {!reducedMotion && (
        <div className="hero-particles" aria-hidden="true">
          {particles.map((p) => (
            <div
              key={p.id}
              className="hero-particle"
              style={
                {
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  '--p-duration': `${p.duration}s`,
                  '--p-delay': `${p.delay}s`,
                  '--p-opacity': p.opacity,
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* Content */}
      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="hero-entrance" variants={containerVariants}>
          {/* "Happy 19th Birthday" label */}
          <motion.p className="hero-birthday" variants={childVariants}>
            Happy 19th Birthday
          </motion.p>

          {/* Name */}
          <motion.h1 className="hero-name" variants={childVariants}>
            Ibhi
          </motion.h1>

          {/* Rotating tagline */}
          <motion.div className="hero-tagline-wrapper" variants={childVariants}>
            <p
              className={`hero-tagline ${
                taglineFading ? 'hero-tagline--exit' : 'hero-tagline--enter'
              }`}
              key={taglineIndex}
              aria-live="polite"
            >
              {TAGLINES[taglineIndex]}
            </p>
          </motion.div>

          {/* Begin button */}
          <motion.button
            className="hero-begin-btn"
            variants={btnVariants}
            onClick={handleBegin}
            disabled={exiting}
            type="button"
            aria-label="Begin the birthday experience"
          >
            Begin Our Story &nbsp;→
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}
