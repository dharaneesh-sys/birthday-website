import { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chapter4Memories.css';

/* ───────────────────────────────────────────
   Types
   ─────────────────────────────────────────── */
interface MemoryData {
  id: number;
  topic: string;
  gradient: string;
  icon: string;
  title: string;
  description: string;
  date: string;
  story: string;
}

interface CardLayout {
  tx: number;
  ty: number;
  rotate: number;
  flyX: number;
  flyY: number;
}

/* ───────────────────────────────────────────
   Memory data — 6 cherished moments
   ─────────────────────────────────────────── */
const memories: MemoryData[] = [
  {
    id: 1,
    topic: 'Chennai',
    gradient: 'linear-gradient(135deg, #F5AF19 0%, #F12711 100%)',
    icon: '✦',
    title: 'Chennai',
    description:
      'Chennai — temple bells, beach waves, and endless conversations with a great friend.',
    date: 'Jun 2025',
    story:
      'Chennai was never just a city to us — it became the backdrop of so many adventures. From the crowded Marina Beach where we walked for hours, talking about everything and nothing, to the quiet lanes of Mylapore where we discovered the cutest filter coffee shop. You had me at "Try the idli here." Every street corner held a new laugh, every sunset a new story. Chennai will always feel special, because it&rsquo;s where our friendship found its rhythm.',
  },
  {
    id: 2,
    topic: 'The Meet',
    gradient: 'linear-gradient(135deg, #FF512F 0%, #DD2475 100%)',
    icon: '✦',
    title: 'The Meet',
    description:
      'Two coffee lovers, one coffee shop, and a conversation that started it all.',
    date: 'May 2025',
    story:
      'I still remember walking into that coffee shop, not knowing I was about to meet someone who would become such an important part of my life. You were already there, slightly nervous, checking your phone — and when you looked up and smiled, any awkwardness melted away. We talked for three hours straight. About our favourite books, our worst travel stories, our dreams that felt too big to say out loud. By the time the barista announced last call, I knew I had made a friend for life.',
  },
  {
    id: 3,
    topic: 'First Date',
    gradient: 'linear-gradient(135deg, #6A11CB 0%, #2575FC 100%)',
    icon: '☆',
    title: 'First Foodventure',
    description:
      'A dinner that turned into a starlit walk, a playlist, and great conversation.',
    date: 'May 2025',
    story:
      'You picked the restaurant — a tiny Italian place hidden in a side street, the kind only locals know about. We shared a pizza and our most embarrassing childhood stories between bites. After dinner, you led me to a park nearby, pulled out your phone, and played a song you thought I\'d love. We walked under the streetlights, talking about music and life, completely at ease. That night, I knew I had found a friend I could be my true self with.',
  },
  {
    id: 4,
    topic: 'Birthday Surprise',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FF6B35 100%)',
    icon: '◎',
    title: 'Birthday Surprise',
    description:
      'A day of hidden notes, fairy lights, and a surprise that made you cry.',
    date: 'Aug 2025',
    story:
      'I had been planning it for weeks. Small handwritten notes hidden everywhere — in your bag, under your pillow, inside the book you were reading. Each one held a memory, a reason why I was grateful to have you in my life. That evening, fairy lights transformed your rooftop into a constellation of warm glow. The look on your face when you walked in — eyes wide, hand covering your mouth, tears glistening — is a picture I will carry with me forever. Happy birthday, my dear friend.',
  },
  {
    id: 5,
    topic: 'Night Walk',
    gradient: 'linear-gradient(135deg, #0C3483 0%, #A2B6DF 100%)',
    icon: '◇',
    title: 'Night Walk',
    description:
      'Moonlit streets and conversations that lasted till dawn.',
    date: 'Jul 2025',
    story:
      'The city sleeps, but we never did. Our night walks became a ritual — escaping the noise of the day to find quiet corners where we could just be. We&rsquo;d walk for hours, the moon our only companion, tracing patterns in the stars and making plans for adventures we wanted to share. You taught me that the best conversations happen after midnight, when the world is quiet and everything feels possible. Every step beside you was an adventure.',
  },
  {
    id: 6,
    topic: 'Rainy Day',
    gradient: 'linear-gradient(135deg, #1CB5E0 0%, #000046 100%)',
    icon: '○',
    title: 'Rainy Day',
    description:
      'Caught in the rain, we found shelter — and each other — in the most unexpected way.',
    date: 'Jul 2025',
    story:
      'The forecast said clear skies, but the universe had other plans. We were halfway through our walk when the clouds burst open, drenching us in seconds. Laughing, we ran for cover under the awning of a tiny bookstore. Soaked, breathless, and unable to stop laughing, we bought two cups of chai from the shop next door and sat on the steps, watching the rain paint the streets silver. You said it was your favourite date, and I understood why — sometimes getting lost is how you find the best moments.',
  },
];

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter4Memories() {
  const [selected, setSelected] = useState<MemoryData | null>(null);
  const cardRefs = useRef<Map<number, HTMLDivElement>>(new Map());

  /* ── Pre-compute random scrapbook offsets once ── */
  const cardLayout: CardLayout[] = useMemo(
    () =>
      memories.map(() => ({
        tx: (Math.random() - 0.5) * 16,        // -8…8 px
        ty: (Math.random() - 0.5) * 16,        // -8…8 px
        rotate: (Math.random() - 0.5) * 6,     // -3…3 deg
        flyX: (Math.random() > 0.5 ? 1 : -1) * (120 + Math.random() * 180),
        flyY: (Math.random() > 0.5 ? 1 : -1) * (120 + Math.random() * 180),
      })),
    [],
  );

  /* ── Open / close modal ── */
  const openModal = useCallback((memory: MemoryData) => {
    setSelected(memory);
  }, []);

  const closeModal = useCallback(() => {
    setSelected(null);
  }, []);

  /* ── Keyboard: Escape ── */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected, closeModal]);

  /* ── Card ref setter ── */
  const setCardRef = useCallback(
    (id: number) => (el: HTMLDivElement | null) => {
      if (el) cardRefs.current.set(id, el);
      else cardRefs.current.delete(id);
    },
    [],
  );

  /* ── Framer-motion variants ── */
  const cardVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: cardLayout[i].flyX,
      y: cardLayout[i].flyY,
      rotate: cardLayout[i].rotate,
      scale: 0.4,
    }),
    visible: (i: number) => ({
      opacity: 1,
      x: cardLayout[i].tx,
      y: cardLayout[i].ty,
      rotate: cardLayout[i].rotate,
      scale: 1,
      transition: {
        delay: i * 0.13,
        duration: 0.7,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    }),
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.86, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
    },
    exit: {
      opacity: 0,
      scale: 0.92,
      y: 30,
      transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] as const },
    },
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <section className="ch4-section">
      {/* ── Subtle paper texture / warm glow overlay ── */}
      <div className="ch4-texture" aria-hidden="true" />

      {/* ── Heading ── */}
      <div className="ch4-heading-wrapper">
        <span className="ch4-ornament" aria-hidden="true">
          &#x2E19;
        </span>
        <h2 className="ch4-heading">Our Favourite Memories</h2>
        <p className="ch4-subtitle">
          Places and moments we&rsquo;ve shared
        </p>
      </div>

      {/* ── Scrapbook Grid ── */}
      <div className="ch4-grid">
        {memories.map((m, i) => (
          <motion.div
            key={m.id}
            ref={setCardRef(m.id)}
            className="ch4-card"
            style={
              {
                '--tx': `${cardLayout[i].tx}px`,
                '--ty': `${cardLayout[i].ty}px`,
                '--rotate': `${cardLayout[i].rotate}deg`,
              } as React.CSSProperties
            }
            custom={i}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            onClick={() => openModal(m)}
            tabIndex={0}
            role="button"
            aria-label={`Memory: ${m.title} — ${m.description}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openModal(m);
              }
            }}
          >
            {/* Photo placeholder — gradient + topic */}
            <div
              className="ch4-card-image"
              style={{ background: m.gradient }}
            >
              <div className="ch4-card-image-inner">
                <span className="ch4-card-icon" aria-hidden="true">
                  {m.icon}
                </span>
                <span className="ch4-card-topic">{m.topic}</span>
              </div>
            </div>

            {/* Body */}
            <div className="ch4-card-body">
              <h3 className="ch4-card-title">{m.title}</h3>
              <p className="ch4-card-desc">{m.description}</p>
            </div>

            {/* Date badge — top-right corner */}
            <time className="ch4-card-date" dateTime={m.date}>
              {m.date}
            </time>
          </motion.div>
        ))}
      </div>

      {/* ── Full-Screen Cinematic Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="ch4-modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
            aria-label={`Memory: ${selected.title}`}
          >
            <motion.div
              className="ch4-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                className="ch4-modal-close"
                onClick={closeModal}
                aria-label="Close modal"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Gradient header */}
              <div
                className="ch4-modal-header"
                style={{ background: selected.gradient }}
              >
                <span className="ch4-modal-icon" aria-hidden="true">
                  {selected.icon}
                </span>
                <h3 className="ch4-modal-heading">{selected.title}</h3>
              </div>

              {/* Content */}
              <div className="ch4-modal-body">
                <time className="ch4-modal-date">{selected.date}</time>
                <p className="ch4-modal-desc">{selected.description}</p>
                <div className="ch4-modal-divider" aria-hidden="true" />
                <p className="ch4-modal-story">{selected.story}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Chapter4Memories;
