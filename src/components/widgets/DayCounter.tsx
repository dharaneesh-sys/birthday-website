import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/* ─── Constants ─────────────────────────────────────────── */

const REFERENCE_DATE = new Date(2024, 11, 1); // December 1, 2024
const MILLISECONDS_PER_DAY = 86_400_000;

/* ─── Helpers ───────────────────────────────────────────── */

function calculateDaysSince(): number {
  const now = new Date();
  const diff = now.getTime() - REFERENCE_DATE.getTime();
  return Math.max(0, Math.floor(diff / MILLISECONDS_PER_DAY));
}

/* ─── Component ──────────────────────────────────────────── */

export default function DayCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    setDays(calculateDaysSince());
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="mx-auto max-w-sm px-6 py-10 text-center"
    >
      {/* Large gold number */}
      <p className="font-serif text-6xl leading-none text-[#C8A46B] tracking-tight">
        {days}
      </p>

      {/* Label */}
      <p className="mt-2 text-sm uppercase tracking-[0.2em] text-[#6B6B6B]">
        Days of Knowing You
      </p>

      {/* Gold divider */}
      <div className="mx-auto my-5 h-px w-16 bg-[#C8A46B]/50" />

      {/* Subtitle */}
      <p className="text-sm italic leading-relaxed text-[#6B6B6B]">
        And every day has been a blessing
      </p>
    </motion.div>
  );
}
