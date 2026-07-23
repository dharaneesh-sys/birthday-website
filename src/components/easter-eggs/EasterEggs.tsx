import { useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';

/* ─── Constants ──────────────────────────────────────────────────────── */

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'KeyB', 'KeyA',
] as const;

const LOGO_CLICK_THRESHOLD = 5;
const DOUBLE_TAP_THRESHOLD_MS = 500;
const HERO_MSG_DURATION_MS = 3_000;
const INVERT_DURATION_MS = 5_000;
const STAR_COUNT = 10;
const STYLE_ID = 'easter-egg-styles';

/* ─── Floating Stars ────────────────────────────────────────────────── */

function spawnStars() {
  const stars: HTMLDivElement[] = [];

  for (let i = 0; i < STAR_COUNT; i++) {
    const el = document.createElement('div');
    el.textContent = '⭐';
    el.style.cssText = `
      position: fixed;
      bottom: -50px;
      left: ${5 + Math.random() * 90}%;
      font-size: ${16 + Math.random() * 28}px;
      pointer-events: none;
      z-index: 99999;
      opacity: 1;
      transform: scale(${0.5 + Math.random() * 0.8});
      transition: none;
      will-change: transform, opacity;
    `;
    document.body.appendChild(el);
    stars.push(el);
  }

  // Trigger the float upward after a paint frame so the browser sees initial positions
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      for (const el of stars) {
        const drift = (Math.random() - 0.5) * 220;
        const rise = window.innerHeight + 120;
        el.style.transition = `transform ${2 + Math.random() * 1.5}s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity ${2 + Math.random() * 0.5}s ease-out`;
        el.style.transform = `translate(${drift}px, -${rise}px) scale(${0.3 + Math.random() * 0.6})`;
        el.style.opacity = '0';
      }
    });
  });

  // Clean up DOM nodes after animation completes
  setTimeout(() => {
    for (const el of stars) {
      if (el.parentNode) el.parentNode.removeChild(el);
    }
  }, 5_000);
}

/* ─── Hero Mode Message ──────────────────────────────────────────────── */

function createHeroMessage(): HTMLDivElement {
  const msg = document.createElement('div');
  msg.textContent = '🦸‍♀️ HERO MODE ACTIVATED!';
  msg.style.cssText = `
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%) scale(0.5);
    font-size: clamp(1.4rem, 4vw, 2.5rem);
    font-weight: 800;
    color: #ff6b9d;
    text-shadow: 0 0 30px rgba(255, 107, 157, 0.6), 0 0 60px rgba(255, 107, 157, 0.3);
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    animation: heroMsgIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    font-family: system-ui, -apple-system, sans-serif;
    letter-spacing: 2px;
    white-space: nowrap;
  `;
  return msg;
}

/* ─── Logo Egg Message ───────────────────────────────────────────────── */

function createLogoMessage(): HTMLDivElement {
  const msg = document.createElement('div');
  msg.textContent = 'You found me! 🐣 Ibhi is the cutest!';
  msg.style.cssText = `
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    font-size: clamp(0.9rem, 2.5vw, 1.3rem);
    font-weight: 700;
    color: #c8a46b;
    background: rgba(255, 255, 255, 0.92);
    backdrop-filter: blur(8px);
    padding: 12px 28px;
    border-radius: 14px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    z-index: 99999;
    pointer-events: none;
    opacity: 0;
    animation: logoMsgIn 0.45s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
    font-family: system-ui, -apple-system, sans-serif;
  `;
  return msg;
}

/* ─── Fade out & remove a floating element ───────────────────────────── */

function fadeAndRemove(el: HTMLElement, delayMs: number) {
  setTimeout(() => {
    el.style.transition = 'opacity 0.5s ease-out';
    el.style.opacity = '0';
    setTimeout(() => {
      if (el.parentNode) el.parentNode.removeChild(el);
    }, 500);
  }, delayMs);
}

/* ─── Inject global keyframes once ───────────────────────────────────── */

function injectStyles() {
  if (document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @keyframes heroMsgIn {
      0%   { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    @keyframes logoMsgIn {
      0%   { opacity: 0; transform: translateX(-50%) translateY(20px); }
      100% { opacity: 1; transform: translateX(-50%) translateY(0); }
    }
    .hero-mode-inverted {
      filter: invert(1) hue-rotate(180deg);
      transition: filter 0.6s ease;
    }
  `;
  document.head.appendChild(style);
}

/* ─── Component ──────────────────────────────────────────────────────── */

const EasterEggs: React.FC = () => {
  /* Trackers kept in refs to avoid re-render triggers */
  const konamiIdxRef = useRef(0);
  const logoClickRef = useRef(0);
  const lastITapRef = useRef(0);

  /* ── Konami Code ────────────────────────────────────────────────── */

  const triggerKonami = useCallback(() => {
    // Big confetti burst
    confetti({
      particleCount: 150,
      spread: 120,
      origin: { y: 0.55 },
      colors: ['#ff6b9d', '#c8a46b', '#ffd700', '#ff4081', '#ff9ff3'],
    });

    // Floating hero message
    const msg = createHeroMessage();
    document.body.appendChild(msg);
    fadeAndRemove(msg, HERO_MSG_DURATION_MS);

    // Color invert on body for 5 s
    document.body.classList.add('hero-mode-inverted');
    setTimeout(() => {
      document.body.classList.remove('hero-mode-inverted');
    }, INVERT_DURATION_MS);
  }, []);

  /* ── Hidden Logo Click ──────────────────────────────────────────── */

  const triggerLogoEgg = useCallback(() => {
    // Small confetti burst
    confetti({
      particleCount: 60,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#c8a46b', '#ffd700', '#ff6b9d'],
    });

    const msg = createLogoMessage();
    document.body.appendChild(msg);
    fadeAndRemove(msg, 3_000);
  }, []);

  /* ── I-Key Double Tap (Star Combo) ─────────────────────────────── */

  const triggerStarCombo = useCallback(() => {
    spawnStars();
  }, []);

  /* ── Lifecycle ──────────────────────────────────────────────────── */

  useEffect(() => {
    injectStyles();

    /* Key handler for Konami Code */
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const expected = KONAMI_CODE[konamiIdxRef.current];
      if (e.code === expected) {
        konamiIdxRef.current += 1;
        if (konamiIdxRef.current === KONAMI_CODE.length) {
          konamiIdxRef.current = 0;
          triggerKonami();
        }
      } else {
        // Reset the sequence, but check if this key could be a fresh start
        konamiIdxRef.current = 0;
        if (e.code === KONAMI_CODE[0]) {
          konamiIdxRef.current = 1;
        }
      }
    };

    /* Key handler for double-tap 'I' */
    const handleIKey = (e: KeyboardEvent) => {
      if (e.code !== 'KeyI' || e.repeat) return;
      const now = Date.now();
      if (now - lastITapRef.current <= DOUBLE_TAP_THRESHOLD_MS) {
        lastITapRef.current = 0;
        triggerStarCombo();
      } else {
        lastITapRef.current = now;
      }
    };

    /* Click handler for data-easter-egg="logo" */
    const handleClickCapture = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const egg = target.closest('[data-easter-egg="logo"]');
      if (!egg) return;
      logoClickRef.current += 1;
      if (logoClickRef.current >= LOGO_CLICK_THRESHOLD) {
        logoClickRef.current = 0;
        triggerLogoEgg();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', handleIKey);
    window.addEventListener('click', handleClickCapture, true);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', handleIKey);
      window.removeEventListener('click', handleClickCapture, true);
    };
  }, [triggerKonami, triggerLogoEgg, triggerStarCombo]);

  return null;
};

export default EasterEggs;
