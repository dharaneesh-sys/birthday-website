import { useState, useRef, useEffect } from 'react';
import './Guestbook.css';

/* ── Config ── */
const FORMSPREE_URL = 'https://formspree.io/f/your-form-id';
/* TODO: Replace 'your-form-id' with your real Formspree form ID
 *       Create a free form at https://formspree.io */

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Guestbook() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const ref = useRef<HTMLDivElement>(null);

  /* ── Scroll reveal ── */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible');
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
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

  return (
    <section
      ref={ref}
      className="guestbook reveal"
      aria-label="Leave a birthday wish for Ibhi"
    >
      <div className="guestbook__card">
        {/* ── Heading ── */}
        <h2 className="guestbook__heading">Leave a Wish</h2>
        <p className="guestbook__subtitle">Write something nice for Ibhi</p>

        {/* ── Success State ── */}
        {status === 'success' && (
          <div className="guestbook__success">
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
              Thank you! Your wish has been sent.
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

        {/* ── Form (idle / submitting) ── */}
        {(status === 'idle' || status === 'submitting') && (
          <form
            className="guestbook__form"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="guestbook__field">
              <label htmlFor="guestbook-name" className="guestbook__label">
                Your name
              </label>
              <input
                id="guestbook-name"
                className="guestbook__input"
                type="text"
                name="name"
                placeholder="Your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={status === 'submitting'}
                autoComplete="name"
              />
            </div>

            <div className="guestbook__field">
              <label htmlFor="guestbook-message" className="guestbook__label">
                Your birthday wish
              </label>
              <textarea
                id="guestbook-message"
                className="guestbook__textarea"
                name="message"
                placeholder="Your birthday wish..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                disabled={status === 'submitting'}
                rows={5}
              />
            </div>

            <button
              type="submit"
              className="guestbook__submit"
              disabled={status === 'submitting'}
            >
              {status === 'submitting' ? (
                <span className="guestbook__submit-loading">
                  <span className="guestbook__spinner" aria-hidden="true" />
                  Sending...
                </span>
              ) : (
                'Send Wish'
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}