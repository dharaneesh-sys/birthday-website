import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './PhotoLightbox.css';

interface PhotoLightboxProps {
  photos: { src: string; alt: string }[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function PhotoLightbox({
  photos,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
}: PhotoLightboxProps) {
  const touchRef = useRef({ startX: 0, startY: 0 });
  const prevIndexRef = useRef(selectedIndex);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  /* Keyboard navigation */
  const handleKey = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'Escape': onClose(); break;
      case 'ArrowLeft': onPrev(); break;
      case 'ArrowRight': onNext(); break;
    }
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  /* Touch swipe */
  const handleTouchStart = (e: React.TouchEvent) => {
    touchRef.current.startX = e.touches[0].clientX;
    touchRef.current.startY = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchRef.current.startX;
    const dy = e.changedTouches[0].clientY - touchRef.current.startY;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
      if (dx > 0) onPrev();
      else onNext();
    }
  };

  const direction = selectedIndex - prevIndexRef.current;
  prevIndexRef.current = selectedIndex;

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
  };

  return (
    <AnimatePresence>
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        {/* Close button */}
        <button className="lightbox__close" onClick={(e) => { e.stopPropagation(); onClose(); }} aria-label="Close">
          <svg width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Previous */}
        {selectedIndex > 0 && (
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Previous photo">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Next */}
        {selectedIndex < photos.length - 1 && (
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Next photo">
            <svg width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Image with gesture area */}
        <div
          className="lightbox__image-area"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait" custom={direction}>
            <motion.img
              key={selectedIndex}
              src={photos[selectedIndex]?.src}
              alt={photos[selectedIndex]?.alt ?? ''}
              className="lightbox__image"
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
          </AnimatePresence>
        </div>

        {/* Counter */}
        <div className="lightbox__counter">
          {selectedIndex + 1} / {photos.length}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
