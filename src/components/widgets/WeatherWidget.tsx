import { motion } from 'framer-motion';
import { WiDaySunny } from 'react-icons/wi';

/* ─── Constants ─────────────────────────────────────────── */

const FORECAST = {
  temperature: '24°C',
  condition: 'Clear skies — just like your smile',
  location: 'Chennai, India',
} as const;

/* ─── Component ──────────────────────────────────────────── */

export default function WeatherWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative mx-auto max-w-xs rounded-2xl border border-white/30 bg-gradient-to-br from-amber-200/40 via-orange-300/30 to-yellow-200/40 px-8 py-8 shadow-xl backdrop-blur-xl"
    >
      {/* Sun icon */}
      <div className="flex justify-center">
        <WiDaySunny className="text-5xl text-[#C8A46B]" aria-hidden="true" />
      </div>

      {/* Temperature */}
      <p className="mt-2 text-center font-serif text-5xl leading-none tracking-tight text-[#C8A46B]">
        {FORECAST.temperature}
      </p>

      {/* Condition */}
      <p className="mt-3 text-center text-sm italic leading-relaxed text-[#6B6B6B]">
        {FORECAST.condition}
        <span className="not-italic"> ☀️</span>
      </p>

      {/* Gold divider */}
      <div className="mx-auto my-4 h-px w-12 bg-[#C8A46B]/40" />

      {/* Location */}
      <p className="text-center text-xs text-[#6B6B6B]/60">
        {FORECAST.location}
      </p>
    </motion.div>
  );
}
