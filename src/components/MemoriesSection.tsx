import { useEffect, useRef } from 'react';
import './MemoriesSection.css';

/* ─── Photo data ────────────────────────────────────────── */

const PHOTO_FILES = [
  'IMG20250506144456.jpg',
  'IMG_20250510_152025_341.jpg',
  'IMG_20250510_152113_459.jpg',
  'IMG_20250510_152120_608.jpg',
  'IMG_20250510_152134_431.jpg',
];

interface MemoryPhoto {
  src: string;
  caption: string;
}

/* ─── Helpers ───────────────────────────────────────────── */

/**
 * Derive a warm caption from the photo filename by extracting
 * the date portion and pairing the month with a theme word.
 * Example: "IMG_20250510_152025_341.jpg" → "May Moments"
 */
function cleanCaption(filename: string, index: number): string {
  const match = filename.match(/(\d{4})(\d{2})(\d{2})/);
  if (!match) return 'Cherished Memory';

  const month = parseInt(match[2], 10);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  const monthName = months[month - 1] ?? 'May';
  const themes = ['Memories', 'Moments', 'Days', 'Light', 'Stories'];

  return `${monthName} ${themes[index % themes.length]}`;
}

const PHOTOS: MemoryPhoto[] = PHOTO_FILES.map((file, i) => ({
  src: `/images/memories/${file}`,
  caption: cleanCaption(file, i),
}));

/* ─── Component ─────────────────────────────────────────── */

export default function MemoriesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  /* Scroll-reveal: observe all .memories-card children,
     add .visible when each enters the viewport (threshold 0.15) */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const cards = section.querySelectorAll<HTMLElement>('.memories-card');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  /* ── Render ──────────────────────────────────────────── */

  return (
    <section className="memories-section" ref={sectionRef} aria-label="Photo memories">
      <div className="memories-section__header">
        <h2 className="memories-section__title">Moments Together</h2>
        <p className="memories-section__subtitle">A few frames from our story</p>
      </div>

      <div className="memories-section__grid">
        {PHOTOS.map((photo) => (
          <div
            key={photo.src}
            className="memories-card reveal"
          >
            <div className="memories-card__image-wrapper">
              <img
                src={photo.src}
                alt={photo.caption}
                className="memories-card__image"
                loading="lazy"
              />
            </div>
            <div className="memories-card__caption">
              <span>{photo.caption}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
