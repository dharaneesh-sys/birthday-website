import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import './Chapter6Letters.css';

/* ───────────────────────────────────────────
   Letter Data
   ─────────────────────────────────────────── */

interface LetterItem {
  id: string;
  title: string;
  message: string;
}

const letterItems: LetterItem[] = [
  {
    id: 'sad',
    title: "Open When You're Sad",
    message:
      "Hey friend...\nI know this ache all too well.\nLet it out. Cry if you need to.\nYou are never carrying it alone.\nI'm right here, always.\nThis too shall pass —\nand I'll be here when it does.",
  },
  {
    id: 'miss',
    title: 'Open When You Miss Me',
    message:
      "I miss you too.\nMore than words can say.\nBut distance is just a test\nof how strong friendships can be.\nClose your eyes —\nI'm right there beside you.\nSoon we'll make more memories.",
  },
  {
    id: 'happy',
    title: "Open When You're Happy",
    message:
      'This is everything.\nYour joy lights up the world.\nI hope you\'re laughing,\ndancing, feeling alive.\nSavor every second —\nyou deserve it all.\nCall me. I want to hear it.',
  },
  {
    id: 'motivation',
    title: 'Open When You Need Motivation',
    message:
      "Remember who you are.\nStronger than any challenge.\nBraver than any fear.\nEvery step forward counts.\nI believe in you —\nalways have, always will.\nNow go show them.",
  },
  {
    id: 'overthinking',
    title: "Open When You're Overthinking",
    message:
      "Breathe with me.\nIn... and out...\nYou are enough.\nRight here, right now.\nNot everything needs\nfiguring out tonight.\nYou are safe. You are strong.\nYou are not alone.",
  },
];

/* ── Animation Variants ── */
const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const envelopeVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: easeCurve,
    },
  }),
};

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */

function Chapter6Letters() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  const handleClose = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.stopPropagation();
      setOpenIndex((prev) => (prev === index ? null : prev));
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleToggle(index);
      }
    },
    [handleToggle],
  );

  return (
    <section className="ch6-section">
      {/* ── Heading ── */}
      <div className="ch6-heading-wrapper">
        <span className="ch6-ornament" aria-hidden="true">
          &#x2709;
        </span>
        <h2 className="ch6-heading">Open When...</h2>
        <p className="ch6-heading-sub">
          Letters for every moment &mdash; sealed with care
        </p>
      </div>

      {/* ── Envelope Grid ── */}
      <div className="ch6-grid">
        {letterItems.map((item, i) => {
          const isOpen = openIndex === i;

          return (
            <motion.div
              key={item.id}
              className="ch6-envelope-wrapper"
              custom={i}
              variants={envelopeVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {/* Envelope */}
              <div
                className={`ch6-envelope${isOpen ? ' ch6-open' : ''}`}
                onClick={() => handleToggle(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                aria-label={item.title}
              >
                {/* ── Letter content (revealed when open) ── */}
                <div className="ch6-letter" aria-hidden={!isOpen}>
                  <p className="ch6-letter-text">{item.message}</p>
                  <div className="ch6-letter-divider" aria-hidden="true" />
                  <button
                    className="ch6-close-btn"
                    onClick={(e) => handleClose(e, i)}
                    type="button"
                    tabIndex={isOpen ? 0 : -1}
                  >
                    Fold &amp; Seal
                  </button>
                </div>

                {/* ── Envelope flap ── */}
                <div className="ch6-flap" aria-hidden="true" />

                {/* ── Wax seal ── */}
                <div className="ch6-seal" aria-hidden="true">
                  <span className="ch6-seal-initials">IB</span>
                </div>
              </div>

              {/* ── Label ── */}
              <p className="ch6-label">{item.title}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Chapter6Letters;
