import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import PhotoLightbox from './PhotoLightbox';
import './FiveFrames.css';

/* ─── Photo data ─────────────────────────────────────── */
const PHOTO_FILES = [
  'IMG20250506144456.jpg',
  'IMG_20250510_152025_341.jpg',
  'IMG_20250510_152113_459.jpg',
  'IMG_20250510_152120_608.jpg',
  'IMG_20250510_152134_431.jpg',
];

const PHOTOS = PHOTO_FILES.map((file) => ({
  src: `/images/memories/${file}`,
  alt: '',
}));

/* ─── Frame metadata (editorial captions) ────────────── */
const FRAMES = [
  { num: '01', title: 'Cinematic', subtitle: 'A film still, edge to edge' },
  { num: '02', title: 'Editorial', subtitle: 'Split across two pages' },
  { num: '03', title: 'Developing', subtitle: 'Emerging from the darkroom' },
  { num: '04', title: 'Portrait', subtitle: 'Captured stillness' },
  { num: '05', title: 'Widescreen', subtitle: 'The cinemascope reveal' },
];

/* ─── Editorial caption ──────────────────────────────── */
function FrameCaption({
  num,
  title,
  subtitle,
  className = '',
}: {
  num: string;
  title: string;
  subtitle: string;
  className?: string;
}) {
  return (
    <div className={`five-frame__caption ${className}`}>
      <span className="five-frame__caption-num">{num}</span>
      <span className="five-frame__caption-divider" />
      <span className="five-frame__caption-title">{title}</span>
      <span className="five-frame__caption-subtitle">{subtitle}</span>
    </div>
  );
}

/* ─── Shared frame wrapper ───────────────────────────── */
function FrameSection({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`five-frame ${className}`}>
      <div className="five-frame__sticky">
        {children}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   FRAME 01 — FULL-BLEED CINEMATIC
   ═══════════════════════════════════════════════════════ */
function FrameCinematic({
  src,
  alt,
  scrollYProgress,
  onClick,
}: {
  src: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const enter = useTransform(scrollYProgress, [0.08, 0.18], [0, 1]);
  const barHeight = useTransform(enter, [0, 1], ['14vh', '10vh']);
  const imgScale = useTransform(enter, [0, 1], [1.08, 1.02]);
  const vignetteOpacity = useTransform(enter, [0.6, 1], [0, 0.5]);
  const borderOpacity = useTransform(enter, [0.7, 1], [0, 1]);
  const captionOpacity = useTransform(enter, [0.7, 1], [0, 1]);
  const captionY = useTransform(enter, [0.7, 1], [12, 0]);

  return (
    <FrameSection className="five-frame--cinematic">
      <motion.div className="five-frame__bar five-frame__bar--top" style={{ height: barHeight }} />
      <motion.div className="five-frame__bar five-frame__bar--bottom" style={{ height: barHeight }} />

      <div className="five-frame__cinematic-frame" onClick={onClick} data-cursor-label="VIEW">
        <motion.img
          src={src}
          alt={alt}
          className="five-frame__img five-frame__img--cinematic"
          style={{ scale: imgScale }}
          loading="lazy"
        />
        <motion.div className="five-frame__cinematic-vignette" style={{ opacity: vignetteOpacity }} />
        <motion.div className="five-frame__cinematic-border" style={{ opacity: borderOpacity }} />
      </div>

      <motion.div
        className="five-frame__caption-wrap five-frame__caption-wrap--light"
        style={{ opacity: captionOpacity, y: captionY }}
      >
        <FrameCaption {...FRAMES[0]} />
      </motion.div>
    </FrameSection>
  );
}

/* ═══════════════════════════════════════════════════════
   FRAME 02 — EDITORIAL BOOK SPREAD
   ═══════════════════════════════════════════════════════ */
function FrameEditorial({
  src,
  alt,
  scrollYProgress,
  onClick,
}: {
  src: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const enter = useTransform(scrollYProgress, [0.22, 0.32], [0, 1]);
  const leftX = useTransform(enter, [0, 1], ['-55%', '0%']);
  const rightX = useTransform(enter, [0, 1], ['55%', '0%']);
  const shadowOpacity = useTransform(enter, [0, 0.5, 1], [0, 0.3, 0]);
  const coverOpacity = useTransform(enter, [0, 0.15], [1, 0]);
  const captionOpacity = useTransform(enter, [0.7, 1], [0, 1]);
  const captionY = useTransform(enter, [0.7, 1], [12, 0]);

  return (
    <FrameSection className="five-frame--editorial">
      <div className="five-frame__spread" onClick={onClick} data-cursor-label="VIEW">
        <motion.div className="five-frame__spread-page five-frame__spread-page--left" style={{ x: leftX }}>
          <div className="five-frame__spread-img-wrap">
            <img
              src={src}
              alt={alt}
              className="five-frame__img five-frame__img--spread"
              style={{ objectPosition: '0% 50%' }}
              draggable={false}
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div className="five-frame__spread-page five-frame__spread-page--right" style={{ x: rightX }}>
          <div className="five-frame__spread-img-wrap">
            <img
              src={src}
              alt={alt}
              className="five-frame__img five-frame__img--spread"
              style={{ objectPosition: '100% 50%' }}
              draggable={false}
              loading="lazy"
            />
          </div>
        </motion.div>
        <motion.div className="five-frame__spread-shadow" style={{ opacity: shadowOpacity }} />
        <motion.div className="five-frame__spread-cover" style={{ opacity: coverOpacity }} />
      </div>

      <motion.div
        className="five-frame__caption-wrap"
        style={{ opacity: captionOpacity, y: captionY }}
      >
        <FrameCaption {...FRAMES[1]} />
      </motion.div>
    </FrameSection>
  );
}

/* ═══════════════════════════════════════════════════════
   FRAME 03 — DARKROOM DEVELOP
   ═══════════════════════════════════════════════════════ */
function FrameDevelop({
  src,
  alt,
  scrollYProgress,
  onClick,
}: {
  src: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const enter = useTransform(scrollYProgress, [0.36, 0.46], [0, 1]);
  const brightness = useTransform(enter, [0, 0.4, 1], [3, 1.8, 1]);
  const warmth = useTransform(enter, [0, 0.5, 1], [0.3, 0.6, 1]);
  const grainOpacity = useTransform(enter, [0, 0.3, 1], [0.25, 0.15, 0]);
  const developOverlay = useTransform(enter, [0, 0.3, 0.7, 1], [0.95, 0.6, 0.2, 0]);
  const captionOpacity = useTransform(enter, [0.7, 1], [0, 1]);
  const captionY = useTransform(enter, [0.7, 1], [12, 0]);

  return (
    <FrameSection className="five-frame--develop">
      <div
        className="five-frame__develop-container"
        onClick={onClick}
        data-cursor-label="VIEW"
      >
        <motion.div
          className="five-frame__develop-image"
          style={{
            filter: useTransform(
              [brightness, warmth] as const,
              (b: number, w: number) => `brightness(${b}) saturate(${w})`
            ),
          }}
        >
          <img src={src} alt={alt} className="five-frame__img" draggable={false} loading="lazy" />
        </motion.div>
        <motion.div className="five-frame__develop-overlay" style={{ opacity: developOverlay }} />
        <motion.div className="five-frame__develop-grain" style={{ opacity: grainOpacity }} />
        <div className="five-frame__develop-border" />
      </div>

      <motion.div
        className="five-frame__caption-wrap five-frame__caption-wrap--light"
        style={{ opacity: captionOpacity, y: captionY }}
      >
        <FrameCaption {...FRAMES[2]} />
      </motion.div>
    </FrameSection>
  );
}

/* ═══════════════════════════════════════════════════════
   FRAME 04 — FILM STRIP / LIGHT LEAK
   ═══════════════════════════════════════════════════════ */
function FrameFilm({
  src,
  alt,
  scrollYProgress,
  onClick,
}: {
  src: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const enter = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);
  const rotate = useTransform(enter, [0, 1], [2.5, 0]);
  const yOffset = useTransform(enter, [0, 1], [30, 0]);
  const leakOpacity = useTransform(enter, [0.3, 0.6, 1], [0, 0.35, 0]);
  const borderOpacity = useTransform(enter, [0.5, 1], [0, 1]);
  const glowOpacity = useTransform(enter, [0, 0.3], [0.15, 0]);
  const captionOpacity = useTransform(enter, [0.7, 1], [0, 1]);
  const captionY = useTransform(enter, [0.7, 1], [12, 0]);

  return (
    <FrameSection className="five-frame--film">
      <motion.div
        className="five-frame__film-container"
        style={{ rotate, y: yOffset }}
        onClick={onClick}
        data-cursor-label="VIEW"
      >
        <motion.div className="five-frame__film-glow" style={{ opacity: glowOpacity }} />

        <div className="five-frame__sprockets five-frame__sprockets--left">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`sprocket-l-${i}`} className="five-frame__sprocket" />
          ))}
        </div>

        <div className="five-frame__film-photo">
          <img src={src} alt={alt} className="five-frame__img" draggable={false} loading="lazy" />
          <motion.div className="five-frame__film-leak" style={{ opacity: leakOpacity }} />
        </div>

        <div className="five-frame__sprockets five-frame__sprockets--right">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={`sprocket-r-${i}`} className="five-frame__sprocket" />
          ))}
        </div>

        <motion.div className="five-frame__film-border" style={{ opacity: borderOpacity }} />
      </motion.div>

      <motion.div
        className="five-frame__caption-wrap five-frame__caption-wrap--light"
        style={{ opacity: captionOpacity, y: captionY }}
      >
        <FrameCaption {...FRAMES[3]} />
      </motion.div>
    </FrameSection>
  );
}

/* ═══════════════════════════════════════════════════════
   FRAME 05 — CINEMASCOPE REVEAL
   ═══════════════════════════════════════════════════════ */
function FrameCinemaScope({
  src,
  alt,
  scrollYProgress,
  onClick,
}: {
  src: string;
  alt: string;
  scrollYProgress: MotionValue<number>;
  onClick: () => void;
}) {
  const enter = useTransform(scrollYProgress, [0.64, 0.74], [0, 1]);
  const clipTop = useTransform(enter, [0, 1], ['48%', '0%']);
  const clipBottom = useTransform(enter, [0, 1], ['48%', '0%']);
  const saturate = useTransform(enter, [0, 1], [0.4, 1]);
  const hueRotate = useTransform(enter, [0, 1], [15, 0]);
  const topBar = useTransform(enter, [0, 0.3], ['44vh', '0vh']);
  const bottomBar = useTransform(enter, [0, 0.3], ['44vh', '0vh']);
  const scanlineOpacity = useTransform(enter, [0.8, 1], [0.06, 0]);
  const captionOpacity = useTransform(enter, [0.7, 1], [0, 1]);
  const captionY = useTransform(enter, [0.7, 1], [12, 0]);

  return (
    <FrameSection className="five-frame--scope">
      <motion.div className="five-frame__scope-bar five-frame__scope-bar--top" style={{ height: topBar }} />
      <motion.div className="five-frame__scope-bar five-frame__scope-bar--bottom" style={{ height: bottomBar }} />

      <div className="five-frame__scope-container" onClick={onClick} data-cursor-label="VIEW">
        <motion.div
          className="five-frame__scope-image"
          style={{
            clipPath: useTransform(
              [clipTop, clipBottom] as const,
              (t: string, b: string) => `inset(${t} 0 ${b} 0)`
            ),
            filter: useTransform(
              [saturate, hueRotate] as const,
              (s: number, h: number) => `saturate(${s}) hue-rotate(${h}deg)`
            ),
          }}
        >
          <img src={src} alt={alt} className="five-frame__img" draggable={false} loading="lazy" />
        </motion.div>
        <motion.div className="five-frame__scope-scanlines" style={{ opacity: scanlineOpacity }} />
      </div>

      <motion.div
        className="five-frame__caption-wrap five-frame__caption-wrap--light"
        style={{ opacity: captionOpacity, y: captionY }}
      >
        <FrameCaption {...FRAMES[4]} />
      </motion.div>
    </FrameSection>
  );
}

/* ─── Section heading ────────────────────────────────── */
function SectionHeading() {
  return (
    <div className="five-frames__header">
      <span className="five-frames__eyebrow">Gallery</span>
      <h2 className="five-frames__title">Five Frames</h2>
      <div className="five-frames__divider">
        <span className="five-frames__divider-line" />
        <span className="five-frames__divider-dot" />
        <span className="five-frames__divider-line" />
      </div>
      <p className="five-frames__subtitle">
        Five photographs. Five ways of looking at light.
      </p>
    </div>
  );
}

/* ─── Footer note ────────────────────────────────────── */
function SectionFooter() {
  return (
    <div className="five-frames__footer">
      <div className="five-frames__footer-line" />
      <p className="five-frames__footer-text">That&apos;s all five.</p>
    </div>
  );
}

/* ═══ Main component ════════════════════════════════════ */
export default function FiveFrames() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handlePhotoClick = (index: number) => setLightboxIndex(index);
  const handleClose = () => setLightboxIndex(null);
  const handlePrev = () =>
    setLightboxIndex((prev) => (prev !== null ? Math.max(0, prev - 1) : null));
  const handleNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? Math.min(PHOTOS.length - 1, prev + 1) : null,
    );

  /* ── Mobile: stacked cards ── */
  const isMobile =
    typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return (
      <section className="five-frames" ref={sectionRef} aria-label="Five photo frames">
        <SectionHeading />

        {PHOTOS.map((photo, i) => {
          const frame = FRAMES[i];
          return (
            <div
              key={i}
              className={`five-frame-mobile five-frame-mobile--${frame.title.toLowerCase()}`}
              onClick={() => handlePhotoClick(i)}
            >
              <div className="five-frame-mobile__img-container">
                {i === 1 ? (
                  /* Editorial: split layout on mobile */
                  <div className="five-frame-mobile__editorial">
                    <div className="five-frame-mobile__editorial-half">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="five-frame-mobile__editorial-img"
                        style={{ objectPosition: '0% 50%' }}
                        loading="lazy"
                      />
                    </div>
                    <div className="five-frame-mobile__editorial-gutter" />
                    <div className="five-frame-mobile__editorial-half">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="five-frame-mobile__editorial-img"
                        style={{ objectPosition: '100% 50%' }}
                        loading="lazy"
                      />
                    </div>
                  </div>
                ) : i === 3 ? (
                  /* Film: sprocket layout on mobile */
                  <div className="five-frame-mobile__film">
                    <div className="five-frame-mobile__sprockets">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} className="five-frame-mobile__sprocket" />
                      ))}
                    </div>
                    <div className="five-frame-mobile__film-photo">
                      <img src={photo.src} alt={photo.alt} className="five-frame__img" loading="lazy" />
                    </div>
                    <div className="five-frame-mobile__sprockets">
                      {Array.from({ length: 9 }).map((_, j) => (
                        <div key={j} className="five-frame-mobile__sprocket" />
                      ))}
                    </div>
                  </div>
                ) : i === 4 ? (
                  /* Widescreen: letterbox on mobile */
                  <div className="five-frame-mobile__scope">
                    <div className="five-frame-mobile__scope-bar" />
                    <img src={photo.src} alt={photo.alt} className="five-frame__img" loading="lazy" />
                    <div className="five-frame-mobile__scope-bar" />
                  </div>
                ) : (
                  /* Default: simple image */
                  <img src={photo.src} alt={photo.alt} className="five-frame__img" loading="lazy" />
                )}
              </div>

              <FrameCaption {...frame} className="five-frame__caption--mobile" />
            </div>
          );
        })}

        <SectionFooter />

        {lightboxIndex !== null && (
          <PhotoLightbox
            photos={PHOTOS}
            selectedIndex={lightboxIndex}
            onClose={handleClose}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </section>
    );
  }

  /* ══ Desktop: sticky scroll frames ═══════════════════ */
  return (
    <section className="five-frames" ref={sectionRef} aria-label="Five photo frames">
      <SectionHeading />

      <FrameCinematic
        src={PHOTOS[0].src}
        alt={PHOTOS[0].alt}
        scrollYProgress={scrollYProgress}
        onClick={() => handlePhotoClick(0)}
      />
      <FrameEditorial
        src={PHOTOS[1].src}
        alt={PHOTOS[1].alt}
        scrollYProgress={scrollYProgress}
        onClick={() => handlePhotoClick(1)}
      />
      <FrameDevelop
        src={PHOTOS[2].src}
        alt={PHOTOS[2].alt}
        scrollYProgress={scrollYProgress}
        onClick={() => handlePhotoClick(2)}
      />
      <FrameFilm
        src={PHOTOS[3].src}
        alt={PHOTOS[3].alt}
        scrollYProgress={scrollYProgress}
        onClick={() => handlePhotoClick(3)}
      />
      <FrameCinemaScope
        src={PHOTOS[4].src}
        alt={PHOTOS[4].alt}
        scrollYProgress={scrollYProgress}
        onClick={() => handlePhotoClick(4)}
      />

      <SectionFooter />

      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={PHOTOS}
          selectedIndex={lightboxIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  );
}
