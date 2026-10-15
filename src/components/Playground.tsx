import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, useInView, type Variants } from 'framer-motion';
import './Playground.css';

/* ─── Photo files ────────────────────────────────────── */
const PHOTO_FILES = [
  '/images/memories/IMG20250506144456.jpg',
  '/images/memories/IMG_20250510_152025_341.jpg',
  '/images/memories/IMG_20250510_152113_459.jpg',
  '/images/memories/IMG_20250510_152120_608.jpg',
  '/images/memories/IMG_20250510_152134_431.jpg',
];

/* ─── Keepsake contract (L4/L2: key + event, private-mode safe) ─── */
type Keepsake = { id: string; kind: 'wish' | 'photo'; label: string; imageSrc?: string; ts: number };
const KEEPSAKE_KEY = 'ibhi-keepsakes-v1';

function readKeepsakes(): Keepsake[] {
  try {
    const raw = localStorage.getItem(KEEPSAKE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Keepsake[]) : [];
  } catch {
    return [];
  }
}

function appendKeepsake(keepsake: Keepsake): void {
  try {
    const prev = readKeepsakes();
    prev.push(keepsake);
    localStorage.setItem(KEEPSAKE_KEY, JSON.stringify(prev));
    window.dispatchEvent(new CustomEvent('ibhi:keepsake', { detail: keepsake }));
  } catch {
    /* private-mode safety: keepsake writes must never throw */
  }
}

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
  /* Card 3: pops in with a soft spring */
  {
    hidden: { opacity: 0, scale: 0.8, y: 24 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 160,
        damping: 14,
        mass: 0.9,
        delay: 0.3,
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
function ScratchCard({ onReveal, onReset }: { onReveal: () => void; onReset?: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [, setScratched] = useState(0);
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
    onReset?.();
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

  const revealNow = () => {
    if (revealed) return;
    setRevealed(true);
    onReveal();
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleScratchKeyDown = (e: React.KeyboardEvent<HTMLCanvasElement>) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    e.preventDefault();
    revealNow();
  };

  return (
    <div className="playground-card scratch-card">        <h3 className="playground-card__title">Scratch Card</h3>
      <div className="scratch-card__wrapper">
        <div className="scratch-card__message">
          <span className="scratch-card__msg-line">Happy 19th!</span>
          <span className="scratch-card__msg-sub">Here&apos;s to nineteen, Ibhi.</span>
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
          onKeyDown={handleScratchKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Scratch card. Press Enter or Space to reveal the message."
        />
      </div>
      {revealed && (
        <div className="scratch-card__actions">
          <button type="button" className="scratch-card__reset" onClick={reset}>Scratch Again</button>
          <span className="playground-card__kept" role="status">Kept ✓</span>
        </div>
      )}
    </div>
  );
}

/* ─── Photo Developer (Random Frame) ─────────────────── */
function PhotoDeveloper({ onDevelop }: { onDevelop: (photoSrc: string) => void }) {
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
      onDevelop(next);
    }, 2000);
  };

  const frameNum = photo ? PHOTO_FILES.indexOf(photo) + 1 : 0;

  return (
    <div className="playground-card photo-developer">
      <h3 className="playground-card__title">Random Frame</h3>

      {!photo && (
        <button type="button" className="playground-card__btn" onClick={develop}>
          DEVELOP A PHOTO
        </button>
      )}

      {photo && (
        <motion.button
          type="button"
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
        </motion.button>
      )}

      {developed && (
        <p className="photo-developer__hint">Tap to develop another</p>
      )}
      {developed && (
        <span className="playground-card__kept" role="status">Kept ✓</span>
      )}
    </div>
  );
}


/* ─── Teddy Bear (Bear Hug) ──────────────────────────── */
const TEDDY_WORDS = [
  'cute', 'sweet', 'beautiful', 'gorgeous',
  'radiant', 'lovely', 'kind-hearted', 'sunshine',
];

function TeddyBear({ onHug }: { onHug: (word: string) => void }) {
  const [hugs, setHugs] = useState(0);
  const [hugging, setHugging] = useState(false);
  const [kept, setKept] = useState(false);
  const hugTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => () => {
    if (hugTimer.current) window.clearTimeout(hugTimer.current);
  }, []);

  const hug = useCallback(() => {
    const word = TEDDY_WORDS[hugs % TEDDY_WORDS.length];
    onHug(word);
    setHugs((h) => h + 1);
    setKept(true);
    if (reducedMotion) return;
    setHugging(true);
    if (hugTimer.current) window.clearTimeout(hugTimer.current);
    hugTimer.current = window.setTimeout(() => setHugging(false), 650);
  }, [hugs, onHug, reducedMotion]);

  const word = TEDDY_WORDS[(hugs - 1 + TEDDY_WORDS.length) % TEDDY_WORDS.length];

  return (
    <div className="playground-card teddy-card">
      <h3 className="playground-card__title">Bear Hug</h3>

      {/* Speech bubble — one compliment per hug */}
      <div className="teddy__bubble-zone" aria-live="polite" role="status">
        <AnimatePresence mode="wait">
          <motion.div
            key={hugs}
            className="teddy__bubble"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.6, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.7, y: -6 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
          >
            {hugs === 0 ? (
              <span className="teddy__bubble-hint">tap for a hug</span>
            ) : (
              <>
                <span className="teddy__bubble-eyebrow">you are</span>
                <span className="teddy__bubble-word">{word}!</span>
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* The bear — a button that squishes */}
      <motion.button
        type="button"
        className={`teddy${hugging ? ' teddy--hugging' : ''}`}
        onClick={hug}
        whileTap={reducedMotion ? undefined : { scale: 0.93 }}
        aria-label="Hug the teddy bear"
        data-cursor-label="HUG"
      >
        <svg className="teddy__svg" viewBox="0 0 200 230" role="img" aria-label="A caramel teddy bear with a gold bow">
          <defs>
            <radialGradient id="tedFur" cx="42%" cy="32%" r="75%">
              <stop offset="0%" stopColor="#F0C795" />
              <stop offset="55%" stopColor="#D9A679" />
              <stop offset="100%" stopColor="#B97843" />
            </radialGradient>
            <linearGradient id="tedLimb" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D09A5E" />
              <stop offset="100%" stopColor="#A96F38" />
            </linearGradient>
            <radialGradient id="tedCream" cx="45%" cy="36%" r="78%">
              <stop offset="0%" stopColor="#FFFBF3" />
              <stop offset="100%" stopColor="#F3DFC4" />
            </radialGradient>
            <radialGradient id="tedEar" cx="45%" cy="40%" r="70%">
              <stop offset="0%" stopColor="#F4B9C4" />
              <stop offset="100%" stopColor="#D47F91" />
            </radialGradient>
            <g id="tedPaw">
              <path d="M75 138 C63 141 55 152 54 166 C53 179 57 188 65 189 C73 190 78 183 78 171 C78 160 79 147 75 138 Z" fill="url(#tedFur)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.45" />
              <path d="M72 144 C64 148 60 158 60 170" fill="none" stroke="#8A5A30" strokeWidth="1.4" opacity="0.35" strokeLinecap="round" />
              <ellipse cx="65" cy="177" rx="6" ry="7.5" fill="url(#tedCream)" />
              <path d="M62.5 172 L62.5 178 M67.5 172 L67.5 178" stroke="#C4886A" strokeWidth="1.2" opacity="0.8" strokeLinecap="round" />
            </g>
          </defs>

          <ellipse cx="100" cy="216" rx="46" ry="8" fill="rgba(46,38,32,0.10)" />

          <circle cx="52" cy="54" r="20" fill="url(#tedFur)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="148" cy="54" r="20" fill="url(#tedFur)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.5" />
          <circle cx="52" cy="54" r="10" fill="url(#tedEar)" stroke="#B95F72" strokeWidth="1" strokeOpacity="0.45" />
          <circle cx="148" cy="54" r="10" fill="url(#tedEar)" stroke="#B95F72" strokeWidth="1" strokeOpacity="0.45" />

          <ellipse cx="100" cy="168" rx="40" ry="38" fill="url(#tedFur)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.45" />
          <path d="M64 150 Q60 168 66 188 Q62 168 60 152 Z" fill="#FFFDF7" opacity="0.12" />
          <path d="M136 150 Q140 168 134 188 Q138 168 140 152 Z" fill="#5A3214" opacity="0.16" />
          <ellipse cx="100" cy="172" rx="22" ry="24" fill="url(#tedCream)" />
          <path d="M80 184 Q100 196 120 184 Q100 190 80 184 Z" fill="#B57A44" opacity="0.12" />

          <g className="teddy__arm teddy__arm--l">
            <use href="#tedPaw" />
          </g>
          <g className="teddy__arm teddy__arm--r">
            <use href="#tedPaw" transform="matrix(-1,0,0,1,200,0)" />
          </g>
          <ellipse cx="84" cy="150" rx="7" ry="12" fill="#5A3214" opacity="0.10" />
          <ellipse cx="116" cy="150" rx="7" ry="12" fill="#5A3214" opacity="0.10" />

          <ellipse cx="70" cy="204" rx="17" ry="12" fill="url(#tedLimb)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.45" />
          <ellipse cx="130" cy="204" rx="17" ry="12" fill="url(#tedLimb)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.45" />
          <path d="M55 206 Q70 212 85 206 Q70 209 55 206 Z" fill="#5A3214" opacity="0.12" />
          <path d="M115 206 Q130 212 145 206 Q130 209 115 206 Z" fill="#5A3214" opacity="0.12" />
          <ellipse cx="70" cy="205" rx="8.5" ry="6" fill="url(#tedCream)" />
          <ellipse cx="130" cy="205" rx="8.5" ry="6" fill="url(#tedCream)" />

          <ellipse cx="100" cy="88" rx="46" ry="42" fill="url(#tedFur)" stroke="#9C6633" strokeWidth="1.5" strokeOpacity="0.45" />
          <path d="M134 62 Q144 86 136 112 Q142 86 132 64 Z" fill="#5A3214" opacity="0.15" />
          <ellipse cx="76" cy="60" rx="15" ry="8" fill="#FFFDF7" opacity="0.16" transform="rotate(-18 76 60)" />
          <ellipse cx="100" cy="126" rx="20" ry="6" fill="#5A3214" opacity="0.10" />
          <g stroke="#A96F38" strokeWidth="1.6" strokeLinecap="round" opacity="0.55">
            <path d="M60 78 L55 82 M60 88 L55 90" />
            <path d="M140 78 L145 82 M140 88 L145 90" />
          </g>

          <ellipse cx="100" cy="106" rx="23" ry="16.5" fill="url(#tedCream)" />
          <g className="teddy__eyes-open">
            <path d="M75 73 Q83 67 91 73" fill="none" stroke="#8A5A33" strokeWidth="2" strokeLinecap="round" />
            <path d="M109 73 Q117 67 125 73" fill="none" stroke="#8A5A33" strokeWidth="2" strokeLinecap="round" />
            <circle cx="83" cy="81" r="5" fill="#4A2E18" />
            <circle cx="117" cy="81" r="5" fill="#4A2E18" />
            <circle cx="84.8" cy="79.2" r="1.7" fill="#FFFDF7" />
            <circle cx="118.8" cy="79.2" r="1.7" fill="#FFFDF7" />
          </g>
          <g className="teddy__eyes-happy" fill="none" stroke="#4A2E18" strokeWidth="3" strokeLinecap="round">
            <path d="M75 81 Q83 73 91 81" />
            <path d="M109 81 Q117 73 125 81" />
          </g>
          <ellipse className="teddy__blush" cx="69" cy="96" rx="7.5" ry="4.5" fill="#E8A2B0" />
          <ellipse className="teddy__blush" cx="131" cy="96" rx="7.5" ry="4.5" fill="#E8A2B0" />
          <ellipse cx="100" cy="99" rx="6.5" ry="4.5" fill="#4A2E18" />
          <path d="M100 103.5 Q100 109 92 109 M100 103.5 Q100 109 108 109" fill="none" stroke="#4A2E18" strokeWidth="2" strokeLinecap="round" />

          <g>
            <path d="M100 134 C90 126 80 124 78 131 C76 138 86 142 100 136 Z" fill="#FFFDF7" stroke="#C9B8AB" strokeWidth="1.25" />
            <path d="M100 134 C110 126 120 124 122 131 C124 138 114 142 100 136 Z" fill="#FFFDF7" stroke="#C9B8AB" strokeWidth="1.25" />
            <path d="M84 130 Q92 127 98 131 M102 131 Q108 127 116 130" fill="none" stroke="#E4D6C2" strokeWidth="1.2" strokeLinecap="round" />
            <circle cx="100" cy="134" r="6" fill="#E0788F" stroke="#C05A74" strokeWidth="1.25" />
            <circle cx="98" cy="132" r="1.6" fill="#FFFDF7" opacity="0.85" />
          </g>
        </svg>
      </motion.button>

      {kept && (
        <span className="playground-card__kept" role="status">Kept ✓</span>
      )}
    </div>
  );
}

/* ─── Main Playground Section ────────────────────────── */
export default function Playground() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  /* Session guards: one keepsake per card per session; reset re-arms scratch only */
  const scratchKeptRef = useRef(false);
  const photoKeptRef = useRef(false);
  const teddyKeptRef = useRef(false);

  const handleScratchReveal = useCallback(() => {
    if (scratchKeptRef.current) return;
    scratchKeptRef.current = true;
    const now = Date.now();
    appendKeepsake({ id: `wish-scratch-${now}`, kind: 'wish', label: 'Scratched: Happy 19th', ts: now });
  }, []);

  const handleScratchReset = useCallback(() => {
    scratchKeptRef.current = false;
  }, []);

  const handlePhotoDevelop = useCallback((photoSrc: string) => {
    if (photoKeptRef.current) return;
    photoKeptRef.current = true;
    const now = Date.now();
    const frame = String(PHOTO_FILES.indexOf(photoSrc) + 1).padStart(2, '0');
    appendKeepsake({ id: `photo-frame${frame}-${now}`, kind: 'photo', label: `Developed FRAME ${frame}`, imageSrc: photoSrc, ts: now });
  }, []);

  const handleTeddyHug = useCallback((word: string) => {
    if (teddyKeptRef.current) return;
    teddyKeptRef.current = true;
    const now = Date.now();
    appendKeepsake({ id: `hug-bear-${now}`, kind: 'wish', label: `Bear hug: ${word}`, ts: now });
  }, []);

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
            <ScratchCard onReveal={handleScratchReveal} onReset={handleScratchReset} />
          </motion.div>
          <motion.div
            variants={cardVariants[1]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <PhotoDeveloper onDevelop={handlePhotoDevelop} />
          </motion.div>
          <motion.div
            variants={cardVariants[2]}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            <TeddyBear onHug={handleTeddyHug} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
