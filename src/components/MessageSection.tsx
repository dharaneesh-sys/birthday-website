import { useEffect, useRef } from 'react';
import './MessageSection.css';

export default function MessageSection() {
  const ref = useRef<HTMLDivElement>(null);

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

  return (
    <article ref={ref} className="message-section reveal" aria-label="Birthday message">
      <div className="message-section__card">
        <div className="message-section__ornament" aria-hidden="true" />

        <h2 className="message-section__heading">For Ibhi</h2>

        <p className="message-section__text">
          Happy 19th, Ibhi — you've been a wonderful friend, someone who lights
          up every room you walk into. This little corner of the internet is my
          way of celebrating you and all the joy you bring into the world. May
          this year bring you everything you've been dreaming of and more. With
          warmth and gratitude.
        </p>

        <div className="message-section__ornament" aria-hidden="true" />
      </div>
    </article>
  );
}
