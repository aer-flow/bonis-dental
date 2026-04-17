import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import useViewportProfile from '../hooks/useViewportProfile';

const variantMap = {
  drift: {
    core: {
      x: ['-38%', '38%', '-38%'],
      scale: [0.92, 1, 0.92]
    },
    petals: {
      rotate: [0, 10, -8, 0],
      scale: [0.94, 1, 0.97, 0.94]
    },
    duration: 6.2
  },
  bloom: {
    core: {
      scale: [0.92, 1.08, 0.92]
    },
    petals: {
      rotate: [0, 14, 0],
      scale: [0.9, 1.05, 0.9]
    },
    duration: 5.4
  },
  pulse: {
    core: {
      scale: [0.86, 1.02, 0.86],
      opacity: [0.75, 1, 0.75]
    },
    petals: {
      scale: [0.92, 1, 0.92],
      opacity: [0.42, 0.62, 0.42]
    },
    duration: 4.8
  },
  orbit: {
    core: {
      x: ['-28%', '28%', '-28%'],
      y: ['0%', '-8%', '0%']
    },
    petals: {
      rotate: [0, -12, 8, 0],
      scale: [0.96, 1, 0.96]
    },
    duration: 6.8
  },
  sway: {
    core: {
      x: ['-22%', '22%', '-22%']
    },
    petals: {
      rotate: [-8, 8, -8],
      y: ['0%', '-6%', '0%']
    },
    duration: 5.8
  },
  float: {
    core: {
      y: ['0%', '-16%', '0%'],
      scale: [0.92, 1, 0.92]
    },
    petals: {
      rotate: [0, 8, 0],
      scale: [0.94, 1.02, 0.94]
    },
    duration: 6.6
  }
};

export default function GoldThreadAccent({
  align = 'left',
  widthClassName = 'w-20',
  className = '',
  variant = 'drift',
  dark = false
}) {
  const accentRef = useRef(null);
  const isInView = useInView(accentRef, { margin: '120px 0px 120px 0px' });
  const { simplifyMotion } = useViewportProfile();
  const { scrollYProgress } = useScroll({
    target: accentRef,
    offset: ['center 85%', 'center 50%', 'center 15%']
  });
  const alignmentClassName =
    align === 'center' ? 'mx-auto' : align === 'right' ? 'ml-auto' : '';
  const palette = dark
    ? {
        line: 'from-[#D4AF37]/10 via-[#D4AF37]/80 to-[#D4AF37]/10',
        petal: 'border-[#D4AF37]/45 bg-[#D4AF37]/10',
        core: 'bg-[#D4AF37]',
        glow: 'shadow-[0_0_16px_rgba(212,175,55,0.28)]'
      }
    : {
        line: 'from-[#D4AF37]/12 via-[#D4AF37]/85 to-[#D4AF37]/12',
        petal: 'border-[#D4AF37]/50 bg-[#D4AF37]/10',
        core: 'bg-[#D4AF37]',
        glow: 'shadow-[0_0_16px_rgba(212,175,55,0.22)]'
      };
  const motionPreset = variantMap[variant] ?? variantMap.drift;
  const revealOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.75, 1], [0, 0.8, 1, 0.8, 0]);
  const lineScaleX = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.8, 1], [0.15, 0.7, 1, 0.7, 0.15]);
  const bloomScale = useTransform(scrollYProgress, [0, 0.32, 0.5, 0.82, 1], [0.35, 0.82, 1, 0.82, 0.35]);

  return (
    <div
      ref={accentRef}
      className={`relative h-8 ${widthClassName} ${alignmentClassName} ${className}`}
    >
      <motion.div
        className={`absolute inset-x-0 top-1/2 h-px origin-center -translate-y-1/2 bg-gradient-to-r ${palette.line}`}
        style={{
          scaleX: simplifyMotion ? 1 : lineScaleX,
          opacity: simplifyMotion ? 1 : revealOpacity
        }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2"
        animate={isInView && !simplifyMotion ? motionPreset.petals : undefined}
        transition={{
          duration: motionPreset.duration,
          ease: 'easeInOut',
          repeat: Infinity
        }}
        style={{
          opacity: simplifyMotion ? 1 : revealOpacity,
          scale: simplifyMotion ? 1 : bloomScale
        }}
      >
        <span
          className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-[12px] rounded-full border ${palette.petal}`}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 translate-x-[3px] -translate-y-1/2 rounded-full border ${palette.petal}`}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 translate-y-[3px] rounded-full border ${palette.petal}`}
        />
        <span
          className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-[12px] -translate-y-1/2 rounded-full border ${palette.petal}`}
        />
      </motion.div>

      <motion.span
        className={`absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${palette.core} ${palette.glow}`}
        animate={isInView && !simplifyMotion ? motionPreset.core : undefined}
        transition={{
          duration: motionPreset.duration,
          ease: 'easeInOut',
          repeat: Infinity
        }}
        style={{
          opacity: simplifyMotion ? 1 : revealOpacity,
          scale: simplifyMotion ? 1 : bloomScale
        }}
      />
    </div>
  );
}
