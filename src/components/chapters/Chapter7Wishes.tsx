import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi2';
import './Chapter7Wishes.css';

/* ───────────────────────────────────────────
   Wish Data
   ─────────────────────────────────────────── */

interface WishItem {
  id: number;
  text: string;
}

const wishes: WishItem[] = [
  { id: 1, text: 'May your smile always shine as bright as it does today' },
  { id: 2, text: 'May you achieve every dream your heart desires' },
  { id: 3, text: 'May the universe conspire to bring you joy' },
  { id: 4, text: 'May you never forget how incredibly loved you are' },
  { id: 5, text: 'May every sunrise bring you new hope' },
  { id: 6, text: 'May your spirit stay as beautiful as it is' },
  { id: 7, text: 'May you always find light even in the darkest days' },
  { id: 8, text: 'May your laughter fill every room you walk into' },
  { id: 9, text: "May this year bring you everything you've been praying for" },
];

/* ── Spread order: center-first warmth effect ──
   Grid indices:
     0 1 2
     3 4 5
     6 7 8
   Reveal: center (4) → orthogonals (1,3,5,7) → corners (0,2,6,8)
   ─────────────────────────────────────────── */

const SPREAD_ORDER: number[] = [4, 1, 3, 5, 7, 0, 2, 6, 8];

const staggerMap: Record<number, number> = {};
SPREAD_ORDER.forEach((idx, order) => {
  staggerMap[idx] = order;
});

/* ── Background star positions ── */

const BG_STARS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${((i * 17 + 11) % 100)}%`,
  top: `${((i * 23 + 7) % 100)}%`,
  delay: `${(i * 0.7) % 8}s`,
  duration: `${6 + (i % 3) * 2}s`,
  dx: `${-30 + (i * 13) % 60}px`,
  dy: `${-40 + (i * 19) % 80}px`,
  size: `${2 + (i % 3)}px`,
}));

/* ── Animation Variants ── */

const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.92 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: easeCurve,
    },
  },
};

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */

function Chapter7Wishes() {
  /* Compute stagger delay for each wish index */
  const staggerDelays = useMemo(
    () => wishes.map((_, i) => (staggerMap[i] ?? i) * 0.15),
    [],
  );

  return (
    <section className="ch7-section">
      {/* ── Background floating stars ── */}
      <div className="ch7-bg-stars" aria-hidden="true">
        {BG_STARS.map((star) => (
          <span
            key={star.id}
            className="ch7-bg-star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              '--dx': star.dx,
              '--dy': star.dy,
              animationDelay: star.delay,
              animationDuration: star.duration,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* ── Heading ── */}
      <div className="ch7-heading-wrapper">
        <span className="ch7-ornament" aria-hidden="true">
          &#x2726;
        </span>
        <h2 className="ch7-heading">Birthday Wishes</h2>
        <p className="ch7-heading-sub">
          If I could wish for anything for you...
        </p>
      </div>

      {/* ── Wishes Grid ── */}
      <div className="ch7-grid">
        {wishes.map((wish, i) => (
          <motion.div
            key={wish.id}
            className="ch7-card"
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            transition={{ delay: staggerDelays[i] }}
            tabIndex={0}
            aria-label={`Wish ${wish.id}: ${wish.text}`}
          >
            {/* Star icon top-right */}
            <HiStar className="ch7-star-icon" aria-hidden="true" />

            {/* Star icon bottom-left (secondary) */}
            <HiStar className="ch7-star-icon ch7-star-icon--left" aria-hidden="true" />

            {/* Bottom-left corner ornament */}
            <span className="ch7-card-inner-ornament" aria-hidden="true" />

            {/* Bottom-right corner ornament */}
            <span
              className="ch7-card-inner-ornament ch7-card-inner-ornament--right"
              aria-hidden="true"
            />

            {/* Wish number */}
            <span className="ch7-wish-number">
              {String(wish.id).padStart(2, '0')}
            </span>

            {/* Wish text */}
            <p className="ch7-wish-text">{wish.text}</p>

            {/* Decorative divider line */}
            <div className="ch7-divider-wrapper" aria-hidden="true">
              <span className="ch7-divider-line" />
              <span className="ch7-divider-dot" />
              <span className="ch7-divider-line" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Chapter7Wishes;
