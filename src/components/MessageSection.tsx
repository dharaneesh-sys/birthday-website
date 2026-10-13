import { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import './MessageSection.css';

export default function MessageSection() {
  const [phase, setPhase] = useState<'envelope' | 'opening' | 'letter'>('envelope');
  const [sealBreaking, setSealBreaking] = useState(false);
  const [sealRing, setSealRing] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  const handleOpen = useCallback(() => {
    if (phase !== 'envelope') return;
    setPhase('opening');
    setSealBreaking(true);
    setSealRing(true);
    /* Slower transition — seal breaks, then flap opens, then letter slides up */
    setTimeout(() => {
      setPhase('letter');
    }, 1600);
  }, [phase]);

  /* ── Envelope landing — desk drop ── */
  const envelopeLanding = {
    hidden: { opacity: 0, y: -60, rotate: -1 },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 80,
        damping: 10,
        mass: 1.2,
        delay: 0.1,
      },
    },
  };

  return (
    <article className="message-section" ref={sectionRef} aria-label="Birthday message">
      <div className="message-section__inner">
        <AnimatePresence mode="wait">
          {phase !== 'letter' ? (
            <motion.div
              key="envelope"
              className={`message-envelope ${phase === 'opening' ? 'message-envelope--open' : ''}`}
              variants={envelopeLanding}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="message-envelope__body">
                <div className="message-envelope__fold-line message-envelope__fold-line--left" aria-hidden="true" />
                <div className="message-envelope__fold-line message-envelope__fold-line--right" aria-hidden="true" />
                <div className="message-envelope__interior" aria-hidden="true" />

                <div className="message-envelope__flap-wrapper" aria-hidden="true">
                  <div className="message-envelope__flap" />
                  <div className="message-envelope__flap-inner" />
                </div>

                <button
                  type="button"
                  className={`message-envelope__seal ${sealBreaking ? 'message-envelope__seal--breaking' : ''}`}
                  onClick={handleOpen}
                  aria-label="Open envelope"
                  data-cursor-label="OPEN"
                >
                  <span className="message-envelope__seal-emblem">I</span>
                </button>

                <div className={`message-envelope__seal-ring ${sealRing ? 'message-envelope__seal-ring--active' : ''}`} aria-hidden="true" />

                <div className="message-envelope__stamp" aria-hidden="true">
                  <div className="message-envelope__stamp-perf" />
                  <span>19</span>
                </div>

                <div className="message-envelope__content">
                  <p className="message-envelope__address">For Ibhi</p>
                  <p className="message-envelope__address-sub">A birthday letter</p>
                  <p className="message-envelope__address-line">Open when ready</p>
                  <button
                    type="button"
                    className="message-envelope__open-btn"
                    onClick={handleOpen}
                    aria-label="Open envelope"
                  >
                    OPEN
                  </button>
                  <span className="message-envelope__annotation" aria-hidden="true">
                    open
                  </span>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="letter"
              className="message-letter"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="message-letter__paper">
                <div className="message-section__ornament" aria-hidden="true" />
                <h2 className="message-section__heading">For Ibhi</h2>
                <p className="message-section__text">
                  Hi Ibhi,
                </p>
                <p className="message-section__text">
                  I know we haven&apos;t been talking much lately, but I have always found
                  you to be someone truly special — and that never changes with time or
                  distance.
                </p>
                <p className="message-section__text">
                  I wish you the most wonderful birthday you have ever had. And I have
                  just one thing to ask of you — not something generic like{' '}
                  <em>&ldquo;stay in touch&rdquo;</em> or{' '}
                  <em>&ldquo;let&apos;s hang out more.&rdquo;</em> I want you to promise
                  me this: <strong>please don&apos;t feel sad today.</strong> If you ever
                  need to talk about anything at all, I am here. Don&apos;t ever feel alone
                  — I will always be here for you whenever you need it, and I will always
                  be waiting. Please don&apos;t hesitate to reach out, no matter when,
                  no matter why.
                </p>
                <p className="message-section__text message-section__text--quote">
                  &ldquo;Don&apos;t be burdened by the responsibilities of the future.
                  Just keep moving forward — everything will become clear along the way.&rdquo;
                </p>
                <p className="message-section__text message-section__text--sign">
                  With warmth, always,<br />
                  <span className="message-section__signature">Dharaneesh</span>
                </p>
                <div className="message-section__ornament" aria-hidden="true" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  );
}
