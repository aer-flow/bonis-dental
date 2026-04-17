import { useReducedMotion } from 'framer-motion';
import useMediaQuery from './useMediaQuery';

export default function useViewportProfile() {
  const prefersReducedMotion = useReducedMotion();
  const isTouchDevice = useMediaQuery('(hover: none), (pointer: coarse)');
  const isMobileViewport = useMediaQuery('(max-width: 767px)');

  return {
    prefersReducedMotion,
    isTouchDevice,
    isMobileViewport,
    simplifyMotion: Boolean(prefersReducedMotion || (isTouchDevice && isMobileViewport))
  };
}
