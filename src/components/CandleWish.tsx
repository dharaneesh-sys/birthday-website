import { useCallback, useEffect, useRef, useState } from 'react';
import ConfettiBurst from './magic/ConfettiBurst';
import './CandleWish.css';

const HOLD_MS = 1200;
const STAGGER_MS = 200;
const FLAME_COUNT = 3;
const KEEPSAKE_KEY = 'ibhi-keepsakes-v1';

type WishStatus = 'idle' | 'holding' | 'lit' | 'sealed';

interface CandleKeepsake {
  id: string;
  kind: 'candle';
  label: string;
  ts: number;
}

export default function CandleWish() {
  const [status, setStatus] = useState<WishStatus>('idle');
  const [litCount, setLitCount] = useState(0);
  const [burstKey, setBurstKey] = useState(0);
  const [reducedMotion] = useState(
    () =>
      typeof window !== 'undefined' &&
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  const holdTimer = useRef<number | undefined>(undefined);
  const staggerTimers = useRef<number[]>([]);
  const statusRef = useRef<WishStatus>('idle');
  useEffect(() => {
    statusRef.current = status;
  }, [status]);

  const clearTimers = useCallback(() => {
    window.clearTimeout(holdTimer.current);
    holdTimer.current = undefined;
    for (const t of staggerTimers.current) window.clearTimeout(t);
    staggerTimers.current = [];
  }, []);

  useEffect(() => clearTimers, [clearTimers]);

  const completeHold = useCallback(() => {
    if (statusRef.current !== 'holding') return;
    setStatus('lit');
    if (reducedMotion) {
      setLitCount(FLAME_COUNT);
      return;
    }
    staggerTimers.current = Array.from({ length: FLAME_COUNT }, (_, i) =>
      window.setTimeout(() => setLitCount(i + 1), i * STAGGER_MS),
    );
  }, [reducedMotion]);

  const startHold = useCallback(() => {
    if (statusRef.current !== 'idle') return;
    setStatus('holding');
    window.clearTimeout(holdTimer.current);
    holdTimer.current = window.setTimeout(completeHold, HOLD_MS);
  }, [completeHold]);

  const cancelHold = useCallback(() => {
    if (statusRef.current !== 'holding') return;
    window.clearTimeout(holdTimer.current);
    holdTimer.current = undefined;
    setStatus('idle');
  }, []);

  const blowOut = useCallback(() => {
    if (statusRef.current !== 'lit') return;
    clearTimers();
    setLitCount(0);
    setStatus('sealed');
    setBurstKey((k) => k + 1);

    const entry: CandleKeepsake = {
      id: `candle-${Date.now()}`,
      kind: 'candle',
      label: 'A wish for nineteen',
      ts: Date.now(),
    };
    try {
      const raw = localStorage.getItem(KEEPSAKE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const next = Array.isArray(parsed) ? [...parsed, entry] : [entry];
      localStorage.setItem(KEEPSAKE_KEY, JSON.stringify(next));
    } catch {
      /* Storage unavailable (private mode / quota) — ritual still completes. */
    }
    window.dispatchEvent(new CustomEvent('ibhi:keepsake', { detail: entry }));
  }, [clearTimers]);

  const relight = useCallback(() => {
    clearTimers();
    setLitCount(0);
    setBurstKey(0);
    setStatus('idle');
  }, [clearTimers]);

  const candleHeights = [64, 48, 58];

  return (
    <section className={`cw cw--${status}`} aria-label="Candle wish ritual">
      <div className="cw__inner">
        <h2 className="cw__headline">Light a Wish for Nineteen</h2>
        <p className="cw__subline">
          Press and hold to light three candles, then tap to blow them out.
        </p>

        <div className="cw__candles" role="group" aria-label="Three birthday candles">
          {candleHeights.map((h, i) => {
            const lit = i < litCount && (status === 'lit' || status === 'holding');
            const showSmoke = status === 'sealed';
            return (
              <svg
                key={i}
                className="cw__candle"
                viewBox="0 0 40 100"
                width="40"
                height="100"
                aria-hidden="true"
              >
                {/* flame: hand-drawn teardrop, gold/amber */}
                <g className={`cw__flame${lit ? ' cw__flame--lit' : ''}`}>
                  <path
                    d="M20 4 C25.5 12 26.5 19 20 28 C13.5 19 14.5 12 20 4 Z"
                    fill="#E0A83E"
                  />
                  <path
                    d="M20 12 C22.6 16.5 23 20.5 20 24.5 C17 20.5 17.4 16.5 20 12 Z"
                    fill="#F6E7C1"
                  />
                </g>
                {/* smoke wisp after blow-out */}
                <path
                  className={`cw__smoke${showSmoke ? ' cw__smoke--show' : ''}`}
                  d="M20 26 C18 21 22 18 20 12 C19 9 21 7 20 4"
                  fill="none"
                  stroke="#8A7E6E"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                {/* wick */}
                <line x1="20" y1="34" x2="20" y2="28" stroke="#2E2A27" strokeWidth="1.5" />
                {/* candle body */}
                <rect
                  x="12"
                  y="34"
                  width="16"
                  height={h}
                  rx="3"
                  fill="#FFFDF7"
                  stroke="#C8A46B"
                  strokeWidth="1.5"
                />
                <line
                  x1="12"
                  y1={34 + h - 8}
                  x2="28"
                  y2={34 + h - 8}
                  stroke="#E0C99A"
                  strokeWidth="1.5"
                />
              </svg>
            );
          })}
        </div>

        <p className="cw__status" aria-live="polite">
          {status === 'idle' && 'Three candles wait unlit.'}
          {status === 'holding' && 'Keep holding to light each flame.'}
          {status === 'lit' && 'Now blow them out - tap the candles.'}
          {status === 'sealed' && 'Sealed ✓'}
        </p>

        {(status === 'idle' || status === 'holding') && (
          <button
            type="button"
            className="cw__hold"
            onPointerDown={startHold}
            onPointerUp={cancelHold}
            onPointerLeave={cancelHold}
            onPointerCancel={cancelHold}
            onKeyDown={(e) => {
              if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
                e.preventDefault();
                startHold();
              }
            }}
            onKeyUp={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                cancelHold();
              }
            }}
            onClick={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
            aria-label="Hold to light your wish"
          >
            <span className="cw__hold-ring" aria-hidden="true" />
            <span className="cw__hold-label">Hold to light your wish</span>
          </button>
        )}

        {status === 'lit' && (
          <button type="button" className="cw__blow" onClick={blowOut} aria-label="Blow out the candles">
            Tap to blow out
          </button>
        )}

        {status === 'sealed' && (
          <button type="button" className="cw__relight" onClick={relight}>
            relight
          </button>
        )}
      </div>

      {burstKey > 0 && (
        <ConfettiBurst
          key={burstKey}
          level="celebration"
          originX={0.5}
          originY={0.5}
          onComplete={() => setBurstKey(0)}
        />
      )}
    </section>
  );
}
