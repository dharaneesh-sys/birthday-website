import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Chapter2Gallery.css';

/* ───────────────────────────────────────────
   Types
   ─────────────────────────────────────────── */
interface GalleryImage {
  id: number;
  src: string;
  caption: string;
  date: string;
}

interface ImageDimensions {
  width: number;
  height: number;
}

/* ───────────────────────────────────────────
   Image data — loaded from /images/memories/
   ─────────────────────────────────────────── */
const galleryImages: GalleryImage[] = [
  { id: 1,  src: '/images/memories/IMG20250506144456.jpg',     caption: 'The first chapter of a beautiful friendship',             date: 'May 2025' },
  { id: 2,  src: '/images/memories/IMG20250506144458.jpg',     caption: 'Laughter that echoes still',              date: 'May 2025' },
  { id: 3,  src: '/images/memories/IMG20250506144507.jpg',     caption: 'Wandering through golden hours',           date: 'May 2025' },
  { id: 4,  src: '/images/memories/IMG20250506144508.jpg',     caption: 'Sunset glow and city lights',            date: 'June 2025' },
  { id: 5,  src: '/images/memories/IMG_20250510_152025_341.jpg', caption: 'A smile that stops time',               date: 'June 2025' },
  { id: 6,  src: '/images/memories/IMG_20250510_152029_790.jpg', caption: 'Diary entries written in laughter',      date: 'June 2025' },
  { id: 7,  src: '/images/memories/IMG_20250510_152033_512.jpg', caption: 'Shared smiles, endless talks',          date: 'June 2025' },
  { id: 8,  src: '/images/memories/IMG_20250510_152113_459.jpg', caption: 'The day the world felt smaller',         date: 'July 2025' },
  { id: 9,  src: '/images/memories/IMG_20250510_152115_838.jpg', caption: 'Caught up in the moment',               date: 'July 2025' },
  { id: 10, src: '/images/memories/IMG_20250510_152118_635.jpg', caption: 'Every photo holds a story',             date: 'July 2025' },
  { id: 11, src: '/images/memories/IMG_20250510_152120_608.jpg', caption: 'Dancing through ordinary days',          date: 'July 2025' },
  { id: 12, src: '/images/memories/IMG_20250510_152122_822.jpg', caption: 'Us and the wide open sky',         date: 'Aug 2025' },
  { id: 13, src: '/images/memories/IMG_20250510_152125_187.jpg', caption: 'Moments I wish I could bottle',          date: 'Aug 2025' },
  { id: 14, src: '/images/memories/IMG_20250510_152128_138.jpg', caption: 'Quiet mornings, bright spirits',            date: 'Aug 2025' },
  { id: 15, src: '/images/memories/IMG_20250510_152130_799.jpg', caption: 'A Polaroid of pure happiness',           date: 'Sept 2025' },
  { id: 16, src: '/images/memories/IMG_20250510_152134_431.jpg', caption: 'The little things that mean everything',  date: 'Sept 2025' },
  { id: 17, src: '/images/memories/IMG_20250510_152137_634.jpg', caption: 'Building a universe, one day at a time',  date: 'Oct 2025' },
  { id: 18, src: '/images/memories/IMG_20250510_152142_257.jpg', caption: 'And our story continues…',               date: 'Oct 2025' },
];

/* ───────────────────────────────────────────
   Animation variants
   ─────────────────────────────────────────── */
const tileVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.06,
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  }),
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.35 } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const viewerContentVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.25, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const navBtnVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.15, duration: 0.3 },
  }),
  exit: { opacity: 0, x: -10, transition: { duration: 0.15 } },
};

/* ───────────────────────────────────────────
   Helpers
   ─────────────────────────────────────────── */
function randomTilt(): number {
  // Returns a random number between -2 and 2
  return (Math.random() * 4 - 2);
}

/* ───────────────────────────────────────────
   Component
   ─────────────────────────────────────────── */
function Chapter2Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [dims, setDims] = useState<Record<number, ImageDimensions>>({});
  const sectionRef = useRef<HTMLElement>(null);

  /* ── Pre-compute random tilts once ── */
  const tilts = useMemo(
    () => galleryImages.map(() => randomTilt()),
    [],
  );

  /* ── Track image dimensions once loaded ── */
  const handleImageLoad = useCallback((id: number, img: HTMLImageElement) => {
    setDims((prev) => ({
      ...prev,
      [id]: { width: img.naturalWidth, height: img.naturalHeight },
    }));
  }, []);

  /* ── Open/close viewer ── */
  const openViewer = useCallback((index: number) => {
    setSelectedIndex(index);
  }, []);

  const closeViewer = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  /* ── Navigate ── */
  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % galleryImages.length : null,
    );
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + galleryImages.length) % galleryImages.length
        : null,
    );
  }, []);

  /* ── Keyboard navigation ── */
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeViewer();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
      }
    };

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedIndex, closeViewer, goNext, goPrev]);

  const selectedImage =
    selectedIndex !== null ? galleryImages[selectedIndex] : null;

  return (
    <section ref={sectionRef} className="ch2-section">
      {/* ── Heading ── */}
      <div className="ch2-heading-wrapper">
        <span className="ch2-ornament">&#x2E19;</span>
        <h2 className="ch2-heading">Moments We Never Wanted To End</h2>
        <p className="ch2-subtitle">
           Every photograph holds a story of the time we shared
        </p>
      </div>

      {/* ── Masonry Grid ── */}
      <div className="ch2-masonry">
        {galleryImages.map((img, i) => (
          <motion.div
            key={img.id}
            className="ch2-tile"
            style={{ '--tilt': `${tilts[i]}deg` } as React.CSSProperties}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            variants={tileVariants}
            onClick={() => openViewer(i)}
            tabIndex={0}
            role="button"
            aria-label={`Open photo: ${img.caption}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openViewer(i);
              }
            }}
          >
            <div className="ch2-tile-image">
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                onLoad={(e) => handleImageLoad(img.id, e.currentTarget)}
              />
            </div>
            <div className="ch2-tile-caption">
              <div className="ch2-tile-caption-inner">
                <span className="ch2-tile-caption-date">{img.date}</span>
                <p className="ch2-tile-caption-text">{img.caption}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Full-Screen Cinematic Viewer ── */}
      <AnimatePresence>
        {selectedIndex !== null && selectedImage && (
          <motion.div
            className="ch2-viewer-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeViewer}
            role="dialog"
            aria-modal="true"
            aria-label={`Photo viewer: ${selectedImage.caption}`}
          >
            {/* Close button */}
            <motion.button
              className="ch2-viewer-close"
              variants={navBtnVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => {
                e.stopPropagation();
                closeViewer();
              }}
              aria-label="Close viewer"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* Previous button */}
            <motion.button
              className="ch2-viewer-nav ch2-viewer-nav--prev"
              variants={navBtnVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Previous photo"
            >
              <svg className="ch2-viewer-nav-icon" viewBox="0 0 24 24">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </motion.button>

            {/* Image content - key change triggers re-animation */}
            <motion.div
              key={selectedImage.id}
              className="ch2-viewer"
              variants={viewerContentVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="ch2-viewer-image-wrapper">
                <img
                  src={selectedImage.src}
                  alt={selectedImage.caption}
                  loading="lazy"
                />
                <div className="ch2-viewer-caption">
                  <span className="ch2-viewer-caption-date">
                    {selectedImage.date}
                  </span>
                  <p className="ch2-viewer-caption-text">
                    {selectedImage.caption}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Next button */}
            <motion.button
              className="ch2-viewer-nav ch2-viewer-nav--next"
              variants={navBtnVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Next photo"
            >
              <svg className="ch2-viewer-nav-icon" viewBox="0 0 24 24">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </motion.button>

            {/* Counter */}
            <span className="ch2-viewer-counter">
              {selectedIndex + 1} / {galleryImages.length}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Chapter2Gallery;
