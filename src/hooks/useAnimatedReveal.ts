import { useInView, useAnimation, type Variants } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedRevealOptions {
  threshold?: number;
  once?: boolean;
  variant?: keyof typeof defaultVariants;
}

const defaultVariants: Record<string, Variants> = {
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  },
  staggerChildren: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  },
};

export function useAnimatedReveal(options: AnimatedRevealOptions = {}) {
  const { threshold = 0.15, once = true, variant = 'fadeInUp' } = options;
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { threshold, once });

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else if (!once) {
      controls.start('hidden');
    }
  }, [isInView, controls, once]);

  return {
    ref,
    controls,
    variants: defaultVariants[variant] ?? defaultVariants.fadeInUp,
  };
}

export { defaultVariants };
