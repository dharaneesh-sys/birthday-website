import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import './NineteenPortal.css';

/* ─── Orbiting particles ─────────────────────────────── */
function OrbitingParticles() {
  return (
    <div className="portal-particles" aria-hidden="true">
      {Array.from({ length: 10 }).map((_, i) => {
        const angle = (i / 10) * 360;
        const radius = 60 + Math.random() * 40;
        return (
          <div
            key={i}
            className="portal-particle"
            style={{
              animation: `portalOrbit ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
              '--angle': `${angle}deg`,
              '--radius': `${radius}px`,
            } as React.CSSProperties}
          />
        );
      })}
    </div>
  );
}

/* ─── Component ──────────────────────────────────────── */
export default function NineteenPortal() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const entranceRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(entranceRef, { once: true, margin: '-100px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5], [20, 40, 80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, 1, 1, 0]);
  const split = useTransform(scrollYProgress, [0.5, 0.7], [0, 1]);
  const leftX = useTransform(split, [0, 1], ['0%', '-40%']);
  const rightX = useTransform(split, [0, 1], ['0%', '40%']);
  const leftOpacity = useTransform(split, [0, 0.5], [1, 0]);
  const rightOpacity = useTransform(split, [0, 0.5], [1, 0]);

  return (
    <section className="nineteen-portal" ref={sectionRef} aria-label="19 transition">
      <motion.div
        ref={entranceRef}
        className="nineteen-portal__entrance"
        initial={{ clipPath: 'circle(0% at 50% 50%)' }}
        animate={isInView ? { clipPath: 'circle(100% at 50% 50%)' } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="nineteen-portal__sticky">
          {/* "19" characters that scale and split */}
          <div className="nineteen-portal__text-wrap">
            <motion.span
              className="nineteen-portal__char"
              style={{
                fontSize: useTransform(scale, (v) => `clamp(5rem, ${v}vw, 90vw)`),
                opacity: leftOpacity,
                x: leftX,
              }}
            >
              1
            </motion.span>
            <motion.span
              className="nineteen-portal__char"
              style={{
                fontSize: useTransform(scale, (v) => `clamp(5rem, ${v}vw, 90vw)`),
                opacity: rightOpacity,
                x: rightX,
              }}
            >
              9
            </motion.span>
          </div>

          {/* Background watermark */}
          <motion.div
            className="nineteen-portal__watermark"
            style={{ opacity: useTransform(scrollYProgress, [0.6, 0.8], [0, 0.04]) }}
            aria-hidden="true"
          >
            19
          </motion.div>

          {/* XIX wax seal — appears as the portal opens */}
          <motion.div
            className="nineteen-portal__seal"
            initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
            animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
          >
            <span className="nineteen-portal__seal-text">XIX</span>
          </motion.div>

          {/* Orbiting gold particles */}
          <OrbitingParticles />
        </div>
      </motion.div>
    </section>
  );
}
