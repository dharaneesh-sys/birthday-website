import { useState, useEffect } from 'react';
import './HeroSection.css';

/* ─── Constants ─────────────────────────────────────────── */

const BG_IMAGE_PATH = '/images/ibhi-friend/1741450804644.jpg';

/* ─── ChevronDown inline SVG ────────────────────────────── */

function ChevronDown() {
  return (
    <svg
      className="hero-section__scroll-chevron"
      viewBox="0 0 24 24"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

/* ─── Component ─────────────────────────────────────────── */

export default function HeroSection() {
  /* Image load / error state */
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>(
    'loading',
  );

  /* Preload background image */
  useEffect(() => {
    const img = new Image();
    let cancelled = false;

    img.onload = () => {
      if (!cancelled) setImageStatus('loaded');
    };
    img.onerror = () => {
      if (!cancelled) setImageStatus('error');
    };
    img.src = BG_IMAGE_PATH;

    return () => {
      cancelled = true;
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  /* ── Render ──────────────────────────────────────────── */

  return (
    <section className="hero-section" aria-label="Hero" role="banner">
      {/* Background image — decorative */}
      {imageStatus !== 'error' && (
        <img
          src={BG_IMAGE_PATH}
          alt=""
          aria-hidden="true"
          className={`hero-section__bg ${
            imageStatus === 'loaded'
              ? 'hero-section__bg--loaded'
              : 'hero-section__bg--loading'
          }`}
        />
      )}

      {/* Fallback gradient on image error */}
      {imageStatus === 'error' && (
        <div className="hero-section__fallback" aria-hidden="true" />
      )}

      {/* Gradient overlay for text readability */}
      <div className="hero-section__overlay" aria-hidden="true" />

      {/* Content */}
      <div className="hero-section__content">
        <h1 className="hero-section__title">
          Ibhi &middot; 19
        </h1>
      </div>

      {/* Scroll indicator */}
      <div className="hero-section__scroll" aria-hidden="true">
        <span className="hero-section__scroll-label">Scroll</span>
        <ChevronDown />
      </div>
    </section>
  );
}
