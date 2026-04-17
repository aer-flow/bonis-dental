import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import useViewportProfile from '../hooks/useViewportProfile';

export default function SectionTitle({
  children,
  className = '',
  side = 'left'
}) {
  const titleRef = useRef(null);
  const { isMobileViewport } = useViewportProfile();
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start 92%', 'end 58%']
  });
  const x = useTransform(scrollYProgress, [0, 1], [side === 'left' ? -42 : 42, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 1], [0, 0.72, 1]);

  return (
    <motion.h2
      ref={titleRef}
      initial={isMobileViewport ? false : { opacity: 0, y: 24 }}
      whileInView={isMobileViewport ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={isMobileViewport ? { x, opacity } : undefined}
      className={className}
    >
      {children}
    </motion.h2>
  );
}
