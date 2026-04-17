import { useEffect, useState } from 'react';

export default function useScrolledPast(threshold = 50) {
  const [isScrolledPast, setIsScrolledPast] = useState(() =>
    typeof window !== 'undefined' ? window.scrollY > threshold : false
  );

  useEffect(() => {
    let frameId = null;

    const updateScrollState = () => {
      frameId = null;
      const nextValue = window.scrollY > threshold;
      setIsScrolledPast((currentValue) => (currentValue === nextValue ? currentValue : nextValue));
    };

    const handleScroll = () => {
      if (frameId !== null) {
        return;
      }

      frameId = window.requestAnimationFrame(updateScrollState);
    };

    updateScrollState();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      if (frameId !== null) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  return isScrolledPast;
}
