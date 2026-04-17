import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import useViewportProfile from '../../hooks/useViewportProfile';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const directions = ['TOP', 'LEFT', 'BOTTOM', 'RIGHT'];

const movingMap = {
  TOP: 'radial-gradient(32% 62% at 50% 0%, rgba(255, 255, 255, 0.92) 0%, rgba(214, 222, 229, 0.34) 42%, rgba(214, 222, 229, 0) 100%)',
  LEFT: 'radial-gradient(28% 56% at 0% 50%, rgba(255, 255, 255, 0.86) 0%, rgba(214, 222, 229, 0.32) 42%, rgba(214, 222, 229, 0) 100%)',
  BOTTOM:
    'radial-gradient(32% 62% at 50% 100%, rgba(255, 255, 255, 0.92) 0%, rgba(214, 222, 229, 0.34) 42%, rgba(214, 222, 229, 0) 100%)',
  RIGHT:
    'radial-gradient(28% 56% at 100% 50%, rgba(255, 255, 255, 0.86) 0%, rgba(214, 222, 229, 0.32) 42%, rgba(214, 222, 229, 0) 100%)',
};

const highlight =
  'radial-gradient(140% 140% at 50% 50%, rgba(255, 255, 255, 0.98) 0%, rgba(229, 235, 240, 0.62) 28%, rgba(188, 201, 211, 0.22) 56%, rgba(188, 201, 211, 0) 78%)';

const ambient =
  'radial-gradient(120% 120% at 50% 50%, rgba(255, 255, 255, 0.26) 0%, rgba(214, 222, 229, 0.12) 38%, rgba(214, 222, 229, 0) 70%)';

export default function HoverBorderGradient({
  children,
  containerClassName,
  className,
  as: Element = 'div',
  duration = 1.6,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [direction, setDirection] = useState('BOTTOM');
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: '160px 0px 160px 0px' });
  const { simplifyMotion } = useViewportProfile();

  const isActive = hovered || focused;

  useEffect(() => {
    if (isActive || !isInView || simplifyMotion) {
      return undefined;
    }

    const interval = window.setInterval(() => {
      setDirection((currentDirection) => {
        const currentIndex = directions.indexOf(currentDirection);
        const nextIndex = clockwise
          ? (currentIndex - 1 + directions.length) % directions.length
          : (currentIndex + 1) % directions.length;

        return directions[nextIndex];
      });
    }, duration * 1000);

    return () => window.clearInterval(interval);
  }, [clockwise, duration, isActive, isInView, simplifyMotion]);

  if (simplifyMotion) {
    return (
      <Element
        ref={containerRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget)) {
            setFocused(false);
          }
        }}
        className={cn(
          'relative flex w-full overflow-hidden border border-white/80 bg-transparent p-[1.5px] transition duration-300',
          containerClassName
        )}
        {...props}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-2 z-0 rounded-[inherit] opacity-35 blur-[16px]"
          style={{ background: ambient }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 rounded-[inherit] opacity-65"
          style={{ background: highlight }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[1.5px] z-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(248,249,250,0.98)_34%,rgba(239,243,246,0.96)_100%)]"
        />

        <div className={cn('relative z-10 w-full rounded-[inherit]', className)}>
          {children}
        </div>
      </Element>
    );
  }

  return (
    <Element
      ref={containerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
        }
      }}
      className={cn(
        'relative flex w-full overflow-hidden border border-white/80 bg-transparent p-[1.5px] transition duration-300',
        containerClassName
      )}
      {...props}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-3 z-0 rounded-[inherit]"
        style={{ filter: 'blur(18px)' }}
        initial={{ opacity: 0.28, background: ambient }}
        animate={
          simplifyMotion
            ? {
                opacity: isActive ? 0.56 : 0.26,
                background: ambient
              }
            : {
                opacity: isActive ? 0.72 : 0.36,
                background: isActive ? [ambient, highlight] : [ambient, movingMap[direction]]
              }
        }
        transition={{ ease: 'linear', duration }}
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 rounded-[inherit]"
        style={{ filter: 'blur(2.8px)' }}
        initial={{ background: movingMap[direction] }}
        animate={
          simplifyMotion
            ? {
                background: highlight,
                opacity: isActive ? 0.84 : 0.58
              }
            : {
                background: isActive
                  ? [movingMap[direction], highlight, movingMap[direction]]
                  : [movingMap[direction], highlight],
                opacity: isActive ? 0.96 : 0.72
              }
        }
        transition={{ ease: 'linear', duration }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-[1.5px] z-0 rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.99),rgba(248,249,250,0.98)_34%,rgba(239,243,246,0.96)_100%)]"
      />

      <div className={cn('relative z-10 w-full rounded-[inherit]', className)}>
        {children}
      </div>
    </Element>
  );
}
