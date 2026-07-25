import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import ConfettiBurst from './magic/ConfettiBurst';
import './Playground.css';

/* ─── Photo files ────────────────────────────────────── */
const PHOTO_FILES = [
  '/images/memories/IMG20250506144456.jpg',
  '/images/memories/IMG_20250510_152025_341.jpg',
  '/images/memories/IMG_20250510_152113_459.jpg',
  '/images/memories/IMG_20250510_152120_608.jpg',
  '/images/memories/IMG_20250510_152134_431.jpg',
];

/* ─── Card entrance variants — each unique ───────────── */
const cardVariants: Variants[] = [
  /* Card 1: rotates in from a slight tilt */
  {
    hidden: { opacity: 0, rotate: -3, scale: 0.92, y: 20 },
    visible: {
      opacity: 1,
      rotate: 0,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 },
    },
  },
  /* Card 2: slides in from right with a skew */
  {
    hidden: { opacity: 0, x: 40, skewY: 2 },
    visible: {
      opacity: 1,
      x: 0,
      skewY: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.2 },
    },
  },
  /* Card 3: scales up from small */
  {
    hidden: { opacity: 0, scale: 0.85 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring' as const,
        stiffness: 120,
        damping: 12,
        mass: 0.8,
        delay: 0.35,
      },
    },
  },
];

/* ─── Section title variants — editorial clip-path ───── */
const titleVariants: Variants = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 },
  },
};

/* ─── Scratch Card ───────────────────────────────────── */
function ScratchCard({ onReveal }: { onReveal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scratched, setScratched] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#C8A46B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#E0C99A';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  const handleStart = () => { isDrawing.current = true; };
  const handleEnd = useCallback(() => {
    isDrawing.current = false;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const pct = transparent / (pixels.length / 4) * 100;
    setScratched(pct);
    if (pct > 65 && !revealed) {
      setRevealed(true);
      onReveal();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }, [revealed, onReveal]);

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current || revealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;
    if ('touches' in e) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
  };

  const reset = () => {
    setRevealed(false);
    setScratched(0);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#C8A46B';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#E0C99A';
    for (let i = 0; i < 30; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  return (
    <div className="playground-card scratch-card">        <h3 className="playground-card__title">Scratch Card</h3>
      <div className="scratch-card__wrapper">
        <div className="scratch-card__message">
          <span className="scratch-card__msg-line">Happy 19th!</span>
          <span className="scratch-card__msg-sub">Here's to nineteen, Ibhi.</span>
        </div>
        <canvas
          ref={canvasRef}
          width={220}
          height={140}
          className="scratch-card__canvas"
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseMove={handleMove}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
        />
      </div>
      {revealed && (
        <button className="scratch-card__reset" onClick={reset}>Scratch Again</button>
      )}
    </div>
  );
}

/* ─── Photo Developer (Random Frame) ─────────────────── */
function PhotoDeveloper({ onDevelop }: { onDevelop: () => void }) {
  const [photo, setPhoto] = useState<string | null>(null);
  const [developing, setDeveloping] = useState(false);
  const [developed, setDeveloped] = useState(false);

  const develop = () => {
    const next = PHOTO_FILES[Math.floor(Math.random() * PHOTO_FILES.length)];
    setPhoto(next);
    setDeveloping(true);
    setDeveloped(false);
    setTimeout(() => {
      setDeveloping(false);
      setDeveloped(true);
      onDevelop();
    }, 2000);
  };

  const frameNum = photo ? PHOTO_FILES.indexOf(photo) + 1 : 0;

  return (
    <div className="playground-card photo-developer">
      <h3 className="playground-card__title">Random Frame</h3>

      {!photo && (
        <button className="playground-card__btn" onClick={develop}>
          DEVELOP A PHOTO
        </button>
      )}

      {photo && (
        <motion.div
          className="photo-developer__card"
          onClick={develop}
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.8 }}
        >
          {developing && (
            <motion.div
              className="photo-developer__developing"
              initial={{ filter: 'brightness(5) sepia(0.3) saturate(0.2)' }}
              animate={{ filter: 'brightness(1) sepia(0) saturate(1)' }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <img src={photo} alt="" className="photo-developer__img" />
              <div className="photo-developer__grain" />
            </motion.div>
          )}
          {developed && (
            <motion.div
              className="photo-developer__result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <img src={photo} alt="" className="photo-developer__img" />
              <span className="photo-developer__frame-label">
                FRAME {(frameNum).toString().padStart(2, '0')} / 05
              </span>
              <span className="photo-developer__stamp">19</span>
            </motion.div>
          )}
        </motion.div>
      )}

      {developed && (
        <p className="photo-developer__hint">Tap to develop another</p>
      )}
    </div>
  );
}

/* ─── Confetti Button ────────────────────────────────── */
function ConfettiButton() {
  const [burst, setBurst] = useState<{ key: number } | null>(null);

  const fire = () => {
    setBurst({ key: Date.now() });
    setTimeout(() => setBurst(null), 3000);
  };

  return (
    <div className="playground-card confetti-button-card">
      <h3 className="playground-card__title">Celebration</h3>
      <button className="playground-card__btn playground-card__btn--gold" onClick={fire}>
        MAKE IT RAIN
      </button>
      {burst && <ConfettiBurst key={burst.key} level="small" />}
    </div>
  );
}

/* ─── Main Playground Section ────────────────────────── */
export default function Playground() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  return (
    <section className="playground" ref={sectionRef} aria-label="Birthday Playground">
      <div className="playground__inner">
        <div ref={titleRef}>
          <motion.h2
            className="playground__title"
            variants={titleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            Birthday Playground
          </motion.h2>
          <motion.p
            className="playground__subtitle"
            variants={subtitleVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            A few small things. Click it. Obviously.
          </motion.p>
        </div>

        <div className="playground__grid">
          <motion.div
            variants={cardVariants[0]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <ScratchCard onReveal={() => {}} />
          </motion.div>
          <motion.div
            variants={cardVariants[1]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <PhotoDeveloper onDevelop={() => {}} />
          </motion.div>
          <motion.div
            variants={cardVariants[2]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <ConfettiButton />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
