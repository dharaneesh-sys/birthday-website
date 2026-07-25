import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import ConfettiBurst from './magic/ConfettiBurst';
import './Guestbook.css';

/* ── Config ── */
const FORMSPREE_URL = 'https://formspree.io/f/your-form-id';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

/* ── Entrance variants ────────────────────────────────── */
const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fieldVariants = (i: number) => ({
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1], delay: 0.2 + i * 0.1 },
  },
});

const submitVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1], delay: 0.45 },
  },
};

/* ── Wax Seal — XIX stamp mark ── */
function WaxSeal() {
  return (
    <span className="guestbook__seal-text" aria-hidden="true">XIX</span>
  );
}

export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [confettiKey, setConfettiKey] = useState(0);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; key: number }[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const rippleTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  /* ── Submit ripple ── */
  const handleRipple = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = submitRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const key = Date.now();
    setRipples(prev => [...prev, { x, y, key }]);
    const timer = setTimeout(() => setRipples(prev => prev.filter(r => r.key !== key)), 600);
    rippleTimers.current.push(timer);
  }, []);

  /* ── Cleanup ripple timers on unmount ── */
  useEffect(() => {
    return () => rippleTimers.current.forEach(clearTimeout);
  }, []);

  /* ── Submit handler ── */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message }),
      });

      if (res.ok) {
        setConfettiKey(prev => prev + 1);
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  /* ── Reset form ── */
  const handleReset = () => {
    setName('');
    setMessage('');
    setStatus('idle');
  };

  const isFocused = (id: string) => focusedField === id;
  const isFilled = (val: string) => val.length > 0;
  const fieldClass = (id: string, val: string) =>
    `guestbook__field${isFocused(id) ? ' guestbook__field--focused' : ''}${isFilled(val) ? ' guestbook__field--filled' : ''}`;

  return (
    <section
      ref={sectionRef}
      className="guestbook"
      aria-label="Leave a birthday wish for Ibhi"
    >
      <motion.div
        className="guestbook__inner"
        variants={cardVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        {/* Wax seal ornament */}
        <div className="guestbook__seal">
          <motion.div
            className="guestbook__seal-icon"
            initial={{ scale: 0, rotate: -30 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ type: 'spring' as const, stiffness: 200, damping: 12, delay: 0.15 }}
          >
            <WaxSeal />
          </motion.div>
        </div>

        <h2 className="guestbook__heading">Leave a Wish</h2>
        <p className="guestbook__subtitle">Write something for Ibhi</p>

        {/* Decorative divider */}
        <div className="guestbook__divider" aria-hidden="true">
          <span className="guestbook__divider-line" />
          <span className="guestbook__divider-dot" />
          <span className="guestbook__divider-line" />
        </div>

        {/* ── Success State ── */}
        {status === 'success' && (
          <div className="guestbook__success">
            {confettiKey > 0 && <ConfettiBurst key={confettiKey} level="small" />}
            <svg
              className="guestbook__checkmark"
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="28" cy="28" r="26" stroke="currentColor" strokeWidth="2.5" />
              <path
                d="M18 28l7 7 13-13"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="guestbook__success-text">
              Your wish has been sealed. Thank you.
            </p>
            <button
              type="button"
              className="guestbook__reset-btn"
              onClick={handleReset}
            >
              Send another
            </button>
          </div>
        )}

        {/* ── Error State ── */}
        {status === 'error' && (
          <div className="guestbook__error">
            <p className="guestbook__error-text">
              Something went wrong. Please try again.
            </p>
            <button
              type="button"
              className="guestbook__reset-btn"
              onClick={handleReset}
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Form ── */}
        {(status === 'idle' || status === 'submitting') && (
          <form className="guestbook__form" onSubmit={handleSubmit} noValidate>
            {/* Name field */}
            <motion.div
              className={fieldClass('guestbook-name', name)}
              variants={fieldVariants(0)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <label htmlFor="guestbook-name" className="guestbook__label">
                Your name
              </label>
              <div className="guestbook__input-wrap">
                <input
                  id="guestbook-name"
                  className="guestbook__input"
                  type="text"
                  name="name"
                  placeholder="..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('guestbook-name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={status === 'submitting'}
                  autoComplete="name"
                />
              </div>
            </motion.div>

            {/* Message field */}
            <motion.div
              className={fieldClass('guestbook-message', message)}
              variants={fieldVariants(1)}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <label htmlFor="guestbook-message" className="guestbook__label">
                Your birthday wish
              </label>
              <div className="guestbook__input-wrap">
                <textarea
                  id="guestbook-message"
                  className="guestbook__textarea"
                  name="message"
                  placeholder="Write your wish here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField('guestbook-message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  disabled={status === 'submitting'}
                  rows={5}
                />
              </div>
            </motion.div>

            {/* Decorative divider before submit */}
            <div className="guestbook__form-divider" aria-hidden="true">
              <span className="guestbook__form-divider-line" />
            </div>

            {/* Submit button — stamped letter style */}
            <motion.div
              variants={submitVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <button
                ref={submitRef}
                type="submit"
                className="guestbook__submit"
                disabled={status === 'submitting'}
                onClick={handleRipple}
              >
                {/* Ripple effects */}
                {ripples.map(r => (
                  <span
                    key={r.key}
                    className="guestbook__submit-ripple"
                    style={{ left: r.x, top: r.y, width: 20, height: 20 }}
                  />
                ))}
                {status === 'submitting' ? (
                  <span className="guestbook__submit-loading">
                    <span className="guestbook__spinner" aria-hidden="true" />
                    Sealing...
                  </span>
                ) : (
                  'Seal & Send'
                )}
              </button>
            </motion.div>
          </form>
        )}
      </motion.div>
    </section>
  );
}
