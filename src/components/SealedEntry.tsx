import { useCallback, useEffect, useRef, useState } from 'react';
import ConfettiBurst from './magic/ConfettiBurst';
import './SealedEntry.css';

const STORAGE_KEY = 'ibhi-unsealed';

type Phase = 'sealed' | 'breaking' | 'leaving' | 'gone';

function readUnsealed(): boolean {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const SPARKLES = [
  { left: '12%', top: '18%', size: 14, delay: '0s' },
  { left: '84%', top: '22%', size: 18, delay: '0.7s' },
  { left: '20%', top: '74%', size: 12, delay: '1.2s' },
  { left: '78%', top: '70%', size: 16, delay: '0.4s' },
  { left: '50%', top: '10%', size: 11, delay: '1.6s' },
  { left: '90%', top: '48%', size: 12, delay: '2s' },
];

function FourPointStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 1c.9 5.8 4.2 9.1 10 10-5.8.9-9.1 4.2-10 10-.9-5.8-4.2-9.1-10-10 5.8-.9 9.1-4.2 10-10Z"
        fill="var(--gold, #C8A46B)"
        opacity="0.7"
      />
    </svg>
  );
}

export default function SealedEntry() {
  const [phase, setPhase] = useState<Phase>(() => (readUnsealed() ? 'gone' : 'sealed'));
  const [burst, setBurst] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const finish = useCallback(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* storage unavailable — gate still dismisses */
    }
    setPhase('gone');
    setBurst(true);
  }, []);

  const unseal = useCallback(() => {
    setPhase((prev) => {
      if (prev !== 'sealed') return prev;
      if (prefersReducedMotion()) {
        const id = window.setTimeout(finish, 320);
        timers.current.push(id);
        return 'leaving';
      }
      const t1 = window.setTimeout(() => setPhase('leaving'), 650);
      const t2 = window.setTimeout(finish, 1300);
      timers.current.push(t1, t2);
      return 'breaking';
    });
  }, [finish]);

  useEffect(() => {
    if (phase !== 'sealed') return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') unseal();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [phase, unseal]);

  if (phase === 'gone') {
    return burst ? (
      <ConfettiBurst level="tiny" originX={0.5} originY={0.45} onComplete={() => setBurst(false)} />
    ) : null;
  }

  const breaking = phase === 'breaking' || phase === 'leaving';

  return (
    <>
      <div
        className={`sealed-entry${phase === 'leaving' ? ' sealed-entry--leaving' : ''}`}
        role="dialog"
        aria-modal="false"
        aria-label="Sealed birthday gift entry"
      >
        <div className="sealed-entry__sparkles" aria-hidden="true">
          {SPARKLES.map((s, i) => (
            <span
              key={i}
              className="sealed-entry__sparkle"
              style={{ left: s.left, top: s.top, animationDelay: s.delay }}
            >
              <FourPointStar size={s.size} />
            </span>
          ))}
        </div>

        <div className="sealed-entry__card">
          <p className="sealed-entry__eyebrow">A birthday gift</p>
          <h1 className="sealed-entry__headline">For Ibhi</h1>
          <p className="sealed-entry__body">A small gift waits inside. Break the seal when ready.</p>

          <div className="sealed-entry__seal-wrap">
            <button
              type="button"
              className={`sealed-entry__seal${breaking ? ' sealed-entry__seal--breaking' : ''}`}
              onClick={unseal}
              aria-label="Break the seal and enter"
              autoFocus
            >
              <span className="sealed-entry__seal-emblem" aria-hidden="true">
                I
              </span>
            </button>
            <span
              className={`sealed-entry__ring${breaking ? ' sealed-entry__ring--active' : ''}`}
              aria-hidden="true"
            />
            <span className="sealed-entry__annotation" aria-hidden="true">
              open me
            </span>
            {breaking && <span className="sealed-entry__ribbon" aria-hidden="true" />}
          </div>

          <button type="button" className="sealed-entry__skip" onClick={unseal}>
            skip
          </button>
        </div>
      </div>
      {burst && (
        <ConfettiBurst level="tiny" originX={0.5} originY={0.45} onComplete={() => setBurst(false)} />
      )}
    </>
  );
}
