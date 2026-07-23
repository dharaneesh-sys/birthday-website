import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chapter1Timeline.css';

/* ───────────────────────────────────────────
   Memory data — first 6 photos from /images/memories/
   ─────────────────────────────────────────── */
interface MemoryEntry {
  id: number;
  image: string;
  date: string;
  fullDate: string;
  location: string;
  caption: string;
  story: string;
}

const memories: MemoryEntry[] = [
  {
    id: 1,
    image: '/images/memories/IMG20250506144456.jpg',
    date: 'May 2025',
    fullDate: 'May 6, 2025',
    location: 'The Coffee Bean',
    caption: 'First meetup — couldn\'t stop laughing',
    story:
      'It started with a simple message and an even simpler "coffee?" We met at the café and ended up talking for hours — about everything and nothing. By the time we realised how late it was, we had already made plans for the next hangout. That evening was the beginning of an amazing friendship, and I\'m so glad we took that first chance.',
  },
  {
    id: 2,
    image: '/images/memories/IMG20250506144458.jpg',
    date: 'May 2025',
    fullDate: 'May 6, 2025',
    location: 'Coffee Shop',
    caption: 'Coffee shop hangout',
    story:
      'Round two happened sooner than either of us expected. The barista already knew our order, and we claimed "our corner" like we had been coming for years. You told me about your dream of travelling, and I could see your eyes light up with every word. Somewhere between the second latte and the third laugh, I knew this was the start of something really special — a beautiful friendship.',
  },
  {
    id: 3,
    image: '/images/memories/IMG20250506144507.jpg',
    date: 'May 2025',
    fullDate: 'May 12, 2025',
    location: 'Botanical Gardens',
    caption: 'Stroll through the gardens',
    story:
      'The gardens were stunning that day, with everything in full bloom. We wandered down every path, stopping to read the little plaques and taking far too many photos of flowers. You found a hidden bench under an old oak tree, and we sat there until the sun dipped below the treeline. It became our favourite little hideaway — the perfect place for long conversations.',
  },
  {
    id: 4,
    image: '/images/memories/IMG20250506144508.jpg',
    date: 'June 2025',
    fullDate: 'June 2, 2025',
    location: 'Skyview Rooftop',
    caption: 'Sunset conversations',
    story:
      'You said you had a surprise, and led me up a narrow staircase I had never noticed before. The rooftop opened up to a view of the entire city bathed in golden light. We sat on the ledge, legs dangling, talking about our childhoods, our fears, our hopes. The sunset painted everything in shades of amber and rose — that view with a great friend beside me was pure magic.',
  },
  {
    id: 5,
    image: '/images/memories/IMG_20250510_152025_341.jpg',
    date: 'June 2025',
    fullDate: 'June 15, 2025',
    location: 'Downtown Streets',
    caption: 'Exploring the city together',
    story:
      'We became tourists in our own city. You mapped out a route of hidden murals, quirky bookshops, and that tiny dumpling place you swore was the best in the world. You were right — it was. Every corner turned into an adventure, every street a new memory. By the end of the day, my feet ached and I was so full of gratitude for having you as a friend.',
  },
  {
    id: 6,
    image: '/images/memories/IMG_20250510_152029_790.jpg',
    date: 'July 2025',
    fullDate: 'July 4, 2025',
    location: 'Riverside Promenade',
    caption: 'Riverside walk',
    story:
      'Fireworks crackled in the distance as we walked along the river. The water shimmered with reflections of the celebration above, painting everything in gold and silver. We found a quiet spot away from the crowds and just sat there, taking it all in. In that perfect silence, surrounded by light and water, it felt like the world was celebrating right along with us.',
  },
];

/* ───────────────────────────────────────────
   Card animation variants
   ─────────────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

/* ───────────────────────────────────────────
   Modal animation variants
   ─────────────────────────────────────────── */
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.85, y: 40 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 30,
    transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter1Timeline() {
  const [selected, setSelected] = useState<MemoryEntry | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);

  /* ── Track horizontal scroll for glowing line width ── */
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) {
      setLineProgress(1);
      return;
    }
    setLineProgress(Math.min(el.scrollLeft / maxScroll, 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => el.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* ── Keyboard / backdrop close ── */
  useEffect(() => {
    if (!selected) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [selected]);

  return (
    <section className="ch1-section">
      {/* ── Heading ── */}
      <div className="ch1-heading-wrapper">
        <span className="ch1-ornament">&#x2E19;</span>
        <h2 className="ch1-heading">Where It All Started</h2>
        <p className="ch1-subtitle">Scrolling through the moments that made us</p>
      </div>

      {/* ── Timeline ── */}
      <div className="ch1-scroll-wrapper">
        {/* Glowing line */}
        <div className="ch1-line-track">
          <div
            className="ch1-line-fill"
            style={{ width: `${Math.max(lineProgress * 100, 8)}%` }}
          />
        </div>

        {/* Cards */}
        <div ref={scrollRef} className="ch1-scroll-container">
          {memories.map((m, i) => (
            <motion.article
              key={m.id}
              className="ch1-card"
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={cardVariants}
              onClick={() => setSelected(m)}
              tabIndex={0}
              role="button"
              aria-label={`Open memory: ${m.caption}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(m);
                }
              }}
            >
              <div className="ch1-card-image">
                <img src={m.image} alt={m.caption} loading="lazy" />
              </div>
              <div className="ch1-card-body">
                <span className="ch1-card-date">{m.date}</span>
                <span className="ch1-card-location">{m.location}</span>
                <p className="ch1-card-caption">{m.caption}</p>
              </div>
            </motion.article>
          ))}

          {/* End spacer so last card can centre */}
          <div className="ch1-scroll-end" />
        </div>
      </div>

      {/* ── Cinematic Modal ── */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="ch1-modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="ch1-modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label={`Memory from ${selected.fullDate}`}
            >
              <button
                className="ch1-modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div className="ch1-modal-image">
                <img src={selected.image} alt={selected.caption} loading="lazy" />
              </div>

              <div className="ch1-modal-content">
                <div className="ch1-modal-meta">
                  <time className="ch1-modal-date">{selected.fullDate}</time>
                  <span className="ch1-modal-location">{selected.location}</span>
                </div>
                <h3 className="ch1-modal-title">{selected.caption}</h3>
                <p className="ch1-modal-story">{selected.story}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Chapter1Timeline;
