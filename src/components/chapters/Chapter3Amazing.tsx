import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chapter3Amazing.css';

/* ───────────────────────────────────────────
   Types
   ─────────────────────────────────────────── */
interface QualityData {
  id: number;
  name: string;
  short: string;
  paragraph: string;
}

/* ───────────────────────────────────────────
   30 Qualities — each with a 1‑liner and a
   heartfelt paragraph for the expanded view
   ─────────────────────────────────────────── */
const qualities: QualityData[] = [
  {
    id: 1,
    name: 'Your Smile',
    short: 'A light that brightens every room',
    paragraph:
      'The moment you smile, the world feels lighter. It is not just the way your eyes crinkle or the warmth that spreads across your face — it is the way that smile says everything will be okay. It is one of those genuine smiles that makes everyone around you feel at ease, and the world could always use more of that.',
  },
  {
    id: 2,
    name: 'Your Kindness',
    short: 'A kindness that heals everyone it touches',
    paragraph:
      'You have a way of making people feel seen and valued without them ever having to ask. It is in the small things you do — the words you choose, the patience you offer, the way you give without expecting anything back. Your kindness is not performative; it flows from a place of genuine care, and it makes the world a better place just by existing.',
  },
  {
    id: 3,
    name: 'Your Laugh',
    short: 'Pure music to my ears',
    paragraph:
      'That sound is medicine for the soul. Whether it is a full belly laugh that takes over your whole body or that quiet giggle you try to hide, it is infectious and real. Your laugh is one of those sounds that makes every moment better, and being around it reminds me not to take life so seriously.',
  },
  {
    id: 4,
    name: 'Your Patience',
    short: 'A calm that steadies the storms',
    paragraph:
      'You handle life\'s chaos with a grace that amazes everyone around you. When things get stressful, you stay steady. When things go wrong, you find a way forward without losing your cool. Your patience is not passivity — it is your quiet superpower, and it reminds everyone that the best things unfold in their own time.',
  },
  {
    id: 5,
    name: 'Your Intelligence',
    short: 'A brilliant mind that inspires',
    paragraph:
      'You are brilliant in ways that go far beyond books. You see connections others miss, ask questions that cut to the heart of things, and approach every problem with a sharpness that leaves everyone in awe. Your mind is one of your most remarkable qualities, and watching you figure things out is genuinely inspiring.',
  },
  {
    id: 6,
    name: 'Your Confidence',
    short: 'A quiet certainty that draws people in',
    paragraph:
      'You know who you are, and you are never afraid to show it. There is something magnetic about the way you carry yourself — not arrogant, just sure. That confidence lifts everyone around you, and it inspires me to stand taller, speak clearer, and trust myself the way you trust yourself.',
  },
  {
    id: 7,
    name: 'Your Positivity',
    short: 'A light that never dims',
    paragraph:
      'You find sunshine even on the darkest days. Your optimism is not naive — it is a choice you make every morning, and it changes the energy of everyone lucky enough to be near you. You have taught me to look for the good, to believe that things will work out, and to keep hoping even when it is hard.',
  },
  {
    id: 8,
    name: 'Your Creativity',
    short: 'An imagination that paints the world',
    paragraph:
      'The way you see the world is pure art. Whether you are solving a problem, decorating a space, or simply dreaming about what could be, your creativity breathes life into everything you touch. You see beauty and possibility where others see the ordinary, and that vision is a gift.',
  },
  {
    id: 9,
    name: 'Your Honesty',
    short: 'A truth spoken with love',
    paragraph:
      'You speak truth with such grace. I never have to wonder where I stand with you because you are real, even when being real is hard. That honesty has built a foundation of trust between us that is rare and precious. You are the kind of person everyone needs in their corner — someone who will tell you what you need to hear with kindness.',
  },
  {
    id: 10,
    name: 'Your Strength',
    short: 'Unbreakable, yet so gentle',
    paragraph:
      'You have weathered storms that would break most people, yet here you are — standing, thriving, and still choosing to hope and grow. Your strength is quiet but unshakable, and it does not make you hard; it makes you resilient in a way that leaves everyone around you in awe.',
  },
  {
    id: 11,
    name: 'Your Passion',
    short: 'A fire that sets souls ablaze',
    paragraph:
      'When you care about something, you care with your whole being. That fire in your eyes when you talk about what matters to you — it is captivating. Your passion makes everything feel possible, and being near that intensity makes me want to chase my own dreams with the same fervour.',
  },
  {
    id: 12,
    name: 'Your Empathy',
    short: 'A soul that truly understands',
    paragraph:
      'You feel with people, not just for them. You carry their joys and their pain as if they were your own, and that rare ability to truly understand makes you a safe harbour for everyone lucky enough to know you. In a world that often rushes past, you stop and truly listen, and that matters more than you know.',
  },
  {
    id: 13,
    name: 'Your Sense of Humor',
    short: 'Wit that catches me off guard',
    paragraph:
      'You make life fun. Your wit catches everyone off guard, your silly moments are contagious, and the way you laugh until your stomach hurts is infectious. You have a gift for finding joy in the absurd and reminding everyone around you not to take life too seriously.',
  },
  {
    id: 14,
    name: 'Your Warmth',
    short: 'A presence that feels like home',
    paragraph:
      'There is a comfort in your presence that makes everyone feel at ease. Your warmth wraps around people like a soft blanket, making them feel safe, accepted, and appreciated without conditions. It is impossible not to feel better the moment you walk into a room.',
  },
  {
    id: 15,
    name: 'Your Determination',
    short: 'Grit that moves mountains',
    paragraph:
      'Once you set your mind to something, nothing in this world can stop you. That grit, that refusal to give up even when the odds are stacked against you — it is deeply inspiring. You have shown me that persistence is not stubbornness; it is faith in the finish line.',
  },
  {
    id: 16,
    name: 'Your Curiosity',
    short: 'A hunger that keeps life adventurous',
    paragraph:
      'You never stop asking, exploring, wondering. That hunger to understand the world and the people in it keeps every day fresh and exciting. Your curiosity turns the mundane into an adventure, and it rubs off on everyone lucky enough to explore alongside you.',
  },
  {
    id: 17,
    name: 'Your Generosity',
    short: 'A spirit that gives without counting',
    paragraph:
      'You give without ever counting the cost. Your time, your energy, your warmth — you share it all freely and abundantly. Your generosity is not about things; it is about the incredible size of your spirit, and it inspires everyone around you to be more generous too.',
  },
  {
    id: 18,
    name: 'Your Loyalty',
    short: 'A steadfast anchor in every storm',
    paragraph:
      'When you care about someone, you are all in. You stand by the people you care about through thick and thin, through the hard days and the good ones. That steadfast loyalty is the rarest kind of devotion, and I feel incredibly lucky to have you in my corner.',
  },
  {
    id: 19,
    name: 'Your Wisdom',
    short: 'Insight far beyond your years',
    paragraph:
      'You have an old soul with insights that leave me speechless. The advice you give, the perspective you offer, the way you navigate complexity with such clarity — your wisdom grounds me and guides me. I learn something new from you every single day.',
  },
  {
    id: 20,
    name: 'Your Playfulness',
    short: 'A spirit that keeps joy alive',
    paragraph:
      'You remind me not to take life too seriously. That mischievous glint in your eye, the spontaneous dances in the kitchen, the ridiculous jokes that make no sense — your playful spirit keeps our relationship young and joyful. You make growing up feel optional.',
  },
  {
    id: 21,
    name: 'Your Grace',
    short: 'Elegance in every step',
    paragraph:
      'You move through life with a quiet elegance, handling even the most difficult situations with poise and dignity. Your grace is not just how you carry yourself; it is how you treat others — with respect, with kindness, with the kind of class that cannot be taught.',
  },
  {
    id: 22,
    name: 'Your Courage',
    short: 'Bravery that inspires bravery',
    paragraph:
      'You face fears that would paralyse most people, and you do it with your head held high. Every time you step outside your comfort zone, every time you choose bravery over safety — you inspire me to be braver too. Your courage makes me believe I can do hard things.',
  },
  {
    id: 23,
    name: 'Your Thoughtfulness',
    short: 'A memory that keeps the little things close',
    paragraph:
      'You remember the little things — a favourite snack, a passing comment, a date that matters. Your thoughtfulness shows in a million small ways, each one a quiet reminder that you truly listen and you truly care. It is a rare gift to be known so well by someone.',
  },
  {
    id: 24,
    name: 'Your Ambition',
    short: 'Dreams that reach for the stars',
    paragraph:
      'You dream big and you chase those dreams with everything you have. Your ambition is not about ego — it is about becoming the fullest version of yourself, and watching you grow into the person you are meant to be is genuinely inspiring.',
  },
  {
    id: 25,
    name: 'Your Resilience',
    short: 'Always rising, always stronger',
    paragraph:
      'Life knocks you down, but you always get back up — stronger, wiser, and more determined than before. Your ability to bounce back from setbacks with such grace is nothing short of remarkable. You are proof that falling is not failing; staying down is.',
  },
  {
    id: 26,
    name: 'Your Gentleness',
    short: 'Softness that heals the soul',
    paragraph:
      'In a world that often feels harsh and loud, you are softness personified. Your gentle touch, your kind words, the tenderness you show to everyone and everything — it heals in ways you might never fully understand. You make the world a gentler place just by being in it.',
  },
  {
    id: 27,
    name: 'Your Enthusiasm',
    short: 'Energy that lifts every room',
    paragraph:
      'Your excitement is infectious. When you are passionate about something, your whole being lights up — the gestures, the voice, the sparkle in your eyes. That energy makes everything more exciting, and it reminds me to approach life with wonder instead of weariness.',
  },
  {
    id: 28,
    name: 'Your Intuition',
    short: 'Knowing before words are spoken',
    paragraph:
      'You sense things before they are ever said. You read rooms, feel energies, and understand people on a level that goes deeper than words. Your intuition is a rare gift that makes you incredibly perceptive, and it often amazes me how well you just know.',
  },
  {
    id: 29,
    name: 'Your Presence',
    short: 'The gift of being fully here',
    paragraph:
      'You have a way of making people feel like they are the only one in the room. When you are with someone, you are fully there — not distracted, not elsewhere, not halfway. Your presence is the most grounding gift you give, and it makes every moment with you feel sacred.',
  },
  {
    id: 30,
    name: 'Your Heart',
    short: 'The kindest soul I have ever known',
    paragraph:
      'You have one of the kindest, most genuine souls I have ever encountered. Your warmth, your compassion, your ability to make everyone feel valued — these qualities radiate from you effortlessly. Knowing you has made me a better person, and having you as a friend is one of the greatest privileges of my life. Every moment we share is a reminder of how beautiful genuine friendship can be.',
  },
];

/* ───────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.05,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const expandedVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter3Amazing() {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  /* ── Toggle card expansion ── */
  const toggleCard = useCallback((id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  /* ── Close on Escape ── */
  useEffect(() => {
    if (expandedId === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setExpandedId(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [expandedId]);

  return (
    <section className="ch3-section">
      {/* ── Background glow ── */}
      <div className="ch3-glow" aria-hidden="true" />

      {/* ── Heading ── */}
      <div className="ch3-heading-wrapper">
        <span className="ch3-ornament" aria-hidden="true">&#x2E19;</span>
        <h2 className="ch3-heading">Reasons You&rsquo;re Amazing</h2>
        <p className="ch3-subtitle">Every reason you&rsquo;re an amazing person</p>
      </div>

      {/* ── Grid of qualities ── */}
      <div className="ch3-grid">
        {qualities.map((q, i) => (
          <motion.article
            key={q.id}
            className={`ch3-card${expandedId === q.id ? ' ch3-card--expanded' : ''}`}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            onClick={() => toggleCard(q.id)}
            tabIndex={0}
            role="button"
            aria-expanded={expandedId === q.id}
            aria-label={`Quality ${q.id}: ${q.name}. ${expandedId === q.id ? 'Click to collapse' : 'Click to read more'}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(q.id);
              }
            }}
          >
            {/* Number badge */}
            <span className="ch3-badge" aria-hidden="true">
              {String(q.id).padStart(2, '0')}
            </span>

            {/* Quality name */}
            <h3 className="ch3-name">{q.name}</h3>

            {/* Short description */}
            <p className="ch3-short">{q.short}</p>

            {/* Expanded paragraph */}
            <AnimatePresence initial={false}>
              {expandedId === q.id && (
                <motion.div
                  className="ch3-expanded"
                  variants={expandedVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  <div className="ch3-divider" aria-hidden="true" />
                  <p className="ch3-paragraph">{q.paragraph}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

export default Chapter3Amazing;
