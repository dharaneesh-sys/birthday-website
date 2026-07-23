import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Chapter8BucketList.css';

/* ───────────────────────────────────────────
   Data
   ─────────────────────────────────────────── */
interface BucketItem {
  id: number;
  label: string;
  icon: string;
}

const bucketList: BucketItem[] = [
  { id: 1,  label: 'Visit Ooty',                icon: '🌄' },
  { id: 2,  label: 'Beach sunset together',     icon: '🌊' },
  { id: 3,  label: 'Go bowling',                icon: '🎳' },
  { id: 4,  label: 'Watch sunrise from a hill', icon: '🏔️' },
  { id: 5,  label: 'Road trip to Goa',          icon: '🚗' },
  { id: 6,  label: 'Cafe hopping in Pondicherry', icon: '☕' },
  { id: 7,  label: 'Temple visits',             icon: '🏛️' },
  { id: 8,  label: 'Movie marathon with snacks', icon: '🎬' },
  { id: 9,  label: 'Stargazing night',           icon: '⭐' },
  { id: 10, label: 'Visit a waterfall',          icon: '💧' },
];

/* ───────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────── */
const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const stampVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -15 },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: -12,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 18,
      duration: 0.5,
    },
  },
};

const progressBarVariants = {
  hidden: { width: '0%' },
  visible: (w: number) => ({
    width: `${w}%`,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

/* ───────────────────────────────────────────
   Checkbox icon — circle that fills on check
   ─────────────────────────────────────────── */
function CheckCircle({ checked }: { checked: boolean }) {
  return (
    <svg
      className={`ch8-checkbox-svg${checked ? ' ch8-checkbox-checked' : ''}`}
      viewBox="0 0 28 28"
      width="28"
      height="28"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle
        cx="14"
        cy="14"
        r="12.5"
        fill={checked ? 'var(--gold)' : 'none'}
        stroke="var(--gold)"
        strokeWidth="1.5"
      />
      {/* Check mark */}
      {checked && (
        <motion.polyline
          points="8,14 12.5,18.5 20,10"
          fill="none"
          stroke="#fff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        />
      )}
    </svg>
  );
}

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter8BucketList() {
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const total = bucketList.length;
  const doneCount = checkedIds.size;
  const progressPct = Math.round((doneCount / total) * 100);

  const toggle = useCallback((id: number) => {
    setCheckedIds((prev) => {
      // Once stamped, it stays stamped — never remove
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, id: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle(id);
      }
    },
    [toggle],
  );

  return (
    <section className="ch8-section">
      {/* ── Heading ── */}
      <div className="ch8-heading-wrapper">
        <span className="ch8-ornament" aria-hidden="true">&#x2E19;</span>
        <h2 className="ch8-heading">Future Adventures</h2>
        <p className="ch8-subtitle">Things I want to do with you</p>
      </div>

      {/* ── Progress indicator ── */}
      <div className="ch8-progress-wrapper">
        <span className="ch8-progress-label">
          {doneCount} of {total} adventures planned
        </span>
        <div className="ch8-progress-track" role="progressbar" aria-valuenow={doneCount} aria-valuemin={0} aria-valuemax={total}>
          <motion.div
            className="ch8-progress-fill"
            variants={progressBarVariants}
            initial="hidden"
            animate="visible"
            custom={progressPct}
          />
        </div>
      </div>

      {/* ── Bucket list ── */}
      <ul className="ch8-list">
        {bucketList.map((item, i) => {
          const checked = checkedIds.has(item.id);
          return (
            <motion.li
              key={item.id}
              className={`ch8-item${checked ? ' ch8-item--done' : ''}`}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-30px' }}
              variants={itemVariants}
            >
              <button
                type="button"
                className="ch8-item-btn"
                onClick={() => toggle(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                aria-label={`${item.label}${checked ? ' (completed)' : ''}`}
                aria-pressed={checked}
              >
                {/* Check circle */}
                <span className="ch8-checkbox">
                  <CheckCircle checked={checked} />
                </span>

                {/* Icon */}
                <span className="ch8-item-icon" aria-hidden="true">
                  {item.icon}
                </span>

                {/* Label */}
                <span className="ch8-item-label">{item.label}</span>
              </button>

              {/* Stamp overlay */}
              {checked && (
                <motion.div
                  className="ch8-stamp"
                  variants={stampVariants}
                  initial="hidden"
                  animate="visible"
                  aria-hidden="true"
                >
                  <span className="ch8-stamp-text">DONE ✓</span>
                </motion.div>
              )}
            </motion.li>
          );
        })}
      </ul>
    </section>
  );
}

export default Chapter8BucketList;
