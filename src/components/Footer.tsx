import { useEffect, useRef } from 'react';
import './Footer.css';

export default function Footer() {
  const ref = useRef<HTMLElement>(null);

  /* Scroll-reveal: observe the footer, add .visible when it enters viewport */
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
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer ref={ref} className="footer reveal" aria-label="Site footer">
      <div className="footer__divider" aria-hidden="true" />

      <p className="footer__main">Made for Ibhi &middot; 19</p>

      <p className="footer__tagline">With warmth and gratitude</p>

      <p className="footer__copyright">&copy; 2026</p>
    </footer>
  );
}