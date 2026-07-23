import { useMemo } from 'react';
import { motion } from 'framer-motion';
import './Chapter100Things.css';

/* ───────────────────────────────────────────
   100 Compliments — every one from the heart
   ─────────────────────────────────────────── */

const compliments: string[] = [
  'Your smile',
  'Your kindness',
  'Your laugh',
  'The way you care',
  'Your strength',
  'Your honesty',
  'Your creativity',
  'Your passion',
  'Your patience',
  'Your wisdom',
  'Your courage',
  'The way your eyes light up when you\'re happy',
  'How you listen with your whole heart',
  'Your gentle soul',
  'The way you make everyone feel seen',
  'Your determination',
  'How you always know the right thing to say',
  'Your beautiful mind',
  'The way you care',
  'Your thoughtfulness',
  'How you never give up',
  'Your sense of humor',
  'The way you laugh until you can\'t breathe',
  'Your voice',
  'How you care about the little things',
  'Your grace',
  'The way you stand up for what\'s right',
  'Your infectious energy',
  'How you make ordinary moments feel magical',
  'Your empathy',
  'The way you dance when no one is watching',
  'Your confidence',
  'How you always show up for the people you love',
  'Your warm hugs',
  'The way you see beauty everywhere',
  'Your resilience',
  'How your presence calms my storms',
  'Your adventurous spirit',
  'The way you dream big',
  'Your incredible heart',
  'How you make me want to be a better person',
  'Your taste in music',
  'The way you comfort others',
  'Your intelligence',
  'How you\'re unapologetically yourself',
  'Your fierce loyalty',
  'The way you get lost in a good book',
  'Your positivity',
  'How you find joy in the simple things',
  'Your generosity',
  'The way you take care of everyone around you',
  'Your ambition',
  'How you make even bad days better',
  'Your forgiving heart',
  'The way you appreciate art and beauty',
  'Your genuine nature',
  'How you light up every room you walk into',
  'Your integrity',
  'The way you say my name',
  'Your compassion',
  'How you turn strangers into friends',
  'Your faith in people',
  'The way you never judge',
  'Your independence',
  'How you make me feel at home',
  'Your playful side',
  'The way you handle challenges',
  'Your humility',
  'How you always remember the important things',
  'Your curious mind',
  'The way you tell stories',
  'Your authenticity',
  'How you bring out the best in me',
  'Your sense of wonder',
  'The way you look at the world',
  'Your bravery to be vulnerable',
  'How you fill silence with comfort, not awkwardness',
  'Your spontaneous side',
  'The way you support my dreams',
  'Your nurturing heart',
  'How you make the world a better place',
  'Your unique perspective',
  'The way you overcome obstacles',
  'Your selflessness',
  'How you celebrate others\' successes',
  'Your magical presence',
  'The way you give without expecting anything back',
  'Your sense of style',
  'How you stay true to your values',
  'Your boundless warmth',
  'The way you cherish memories',
  'Your ability to find silver linings',
  'How you make me feel understood',
  'Your strength in vulnerability',
  'The way you embrace life fully',
  'Your beautiful soul',
  'How you inspire everyone around you',
  'The endless depth of your soul',
  'Every single thing about you',
  'The way you care — and let me care about you',
];

/* ── Card background variants ── */
const bgVariants = ['ch10-card--cream', 'ch10-card--gold', 'ch10-card--white'] as const;

/* ── Animation variants ── */
const easeCurve: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.04,
      duration: 0.55,
      ease: easeCurve,
    },
  }),
};

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */

function Chapter100Things() {
  /* Stable random rotations per card (memoised so re-renders don't shuffle) */
  const rotations = useMemo(
    () =>
      compliments.map(() => (Math.random() * 2 - 1).toFixed(2) + 'deg'),
    [],
  );

  return (
    <section className="ch10-section">
      {/* ── Heading ── */}
      <div className="ch10-heading-wrapper">
        <span className="ch10-ornament">&#x2E19;</span>
        <h2 className="ch10-heading">100 Things I Like About You</h2>
        <p className="ch10-subtitle">
           One for every reason I&rsquo;m grateful for you
        </p>
      </div>

      {/* ── Cards ── */}
      <div className="ch10-cards-container">
        {compliments.map((text, i) => (
          <motion.div
            key={i}
            className={`ch10-card ${bgVariants[i % bgVariants.length]}`}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-30px' }}
            style={{ transform: `rotate(${rotations[i]})` }}
            tabIndex={0}
            aria-label={`Compliment ${i + 1}: ${text}`}
          >
            <span className="ch10-card-number">
              {String(i + 1).padStart(2, '0')}
            </span>
            <p className="ch10-card-text">{text}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Closing counter ── */}
      <div className="ch10-counter">
        <p className="ch10-counter-text">
          — and that is only the beginning —
        </p>
      </div>
    </section>
  );
}

export default Chapter100Things;
