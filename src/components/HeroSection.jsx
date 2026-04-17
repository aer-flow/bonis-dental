import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import GoldThreadAccent from './GoldThreadAccent';
import HoverBorderGradient from './ui/hover-border-gradient';
import heroSmileReveal from '../assets/hero-smile-reveal.mp4';
import useViewportProfile from '../hooks/useViewportProfile';

const HERO_VIDEO_HOLD_MS = 1000;
const HERO_VIDEO_ZOOM_DURATION_MS = 3800;
const HERO_TEXT_REVEAL_DELAY_MS = 80;
const HERO_DETAILS_REVEAL_DELAY_MS = 420;

export default function HeroSection({ onIntroReveal }) {
  const [videoReady, setVideoReady] = useState(false);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { simplifyMotion } = useViewportProfile();
  const heroZoomDuration = simplifyMotion ? 2.2 : HERO_VIDEO_ZOOM_DURATION_MS / 1000;
  const heroHoldDelay = simplifyMotion ? 0.55 : HERO_VIDEO_HOLD_MS / 1000;

  useEffect(() => {
    if (!videoReady) {
      return undefined;
    }

    const headlineTimerId = window.setTimeout(() => {
      setShowHeadline(true);
      onIntroReveal?.(true);
    }, HERO_VIDEO_HOLD_MS + HERO_TEXT_REVEAL_DELAY_MS);

    const detailsTimerId = window.setTimeout(() => {
      setShowDetails(true);
    }, HERO_VIDEO_HOLD_MS + HERO_DETAILS_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(headlineTimerId);
      window.clearTimeout(detailsTimerId);
    };
  }, [onIntroReveal, videoReady]);

  useEffect(() => {
    const fallbackTimerId = window.setTimeout(() => {
      setShowHeadline(true);
      setShowDetails(true);
      onIntroReveal?.(true);
    }, HERO_VIDEO_HOLD_MS + HERO_DETAILS_REVEAL_DELAY_MS + 200);

    return () => window.clearTimeout(fallbackTimerId);
  }, [onIntroReveal]);

  return (
    <section id="hero-section" className="relative z-20 flex min-h-screen items-end overflow-hidden">
      <motion.video
        className="absolute inset-0 h-full w-full object-cover"
        src={heroSmileReveal}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        onLoadedData={() => setVideoReady(true)}
        initial={{
          scale: simplifyMotion ? 1.14 : 1.3,
          filter: simplifyMotion ? 'none' : 'blur(2px)'
        }}
        animate={{
          scale: videoReady ? 1 : simplifyMotion ? 1.14 : 1.3,
          filter: videoReady || simplifyMotion ? 'none' : 'blur(2px)'
        }}
        transition={{
          delay: heroHoldDelay,
          duration: heroZoomDuration,
          ease: [0.16, 1, 0.3, 1]
        }}
      />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,15,18,0.84)_0%,rgba(7,15,18,0.58)_28%,rgba(7,15,18,0.24)_55%,rgba(7,15,18,0.30)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,15,18,0.28)_0%,rgba(7,15,18,0.18)_35%,rgba(7,15,18,0.78)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.10),transparent_28%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-start px-4 pb-8 pt-28 sm:px-6 sm:pb-10 md:pt-32 md:pb-16 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
          animate={
            showHeadline
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 22, filter: 'blur(6px)' }
          }
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-xl text-white lg:-translate-x-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.7, delay: showHeadline ? 0.04 : 0, ease: 'easeOut' }}
            id="hero-tagline"
            className="mb-5 inline-flex rounded-full border border-white/16 bg-black/18 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/92 backdrop-blur-sm sm:px-4 sm:text-xs"
          >
            Experienta premium
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.72, delay: showHeadline ? 0.08 : 0, ease: 'easeOut' }}
            className="mb-6"
          >
            <GoldThreadAccent widthClassName="w-20" variant="drift" dark />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={
              showHeadline
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 14, filter: 'blur(4px)' }
            }
            transition={{ duration: 0.82, delay: showHeadline ? 0.1 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mb-5 text-[2.45rem] leading-[1.02] font-serif drop-shadow-[0_10px_30px_rgba(0,0,0,0.38)] sm:text-5xl md:text-6xl"
          >
            Stomatologie moderna,
            <br />
            <span className="text-[#F4D87A] italic">axata pe confortul tau.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
            animate={
              showDetails
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 14, filter: 'blur(4px)' }
            }
            transition={{ duration: 0.82, delay: showDetails ? 0.04 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 max-w-xl text-[1.04rem] leading-relaxed text-white/88 drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] sm:text-base md:text-lg"
          >
            Tehnologie avansata, tratamente blande si o experienta gandita sa-ti ofere
            incredere de la primul pas.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
            animate={
              showDetails
                ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                : { opacity: 0, y: 16, filter: 'blur(4px)' }
            }
            transition={{ duration: 0.82, delay: showDetails ? 0.08 : 0, ease: [0.22, 1, 0.36, 1] }}
            id="hero-ctas"
            className="flex flex-col gap-3 sm:gap-4 md:flex-row"
          >
            <HoverBorderGradient
              as="button"
              type="button"
              duration={1.5}
              containerClassName="w-full rounded-full bg-white/18 shadow-xl backdrop-blur-sm md:w-auto"
              className="rounded-[inherit] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,245,236,0.94))] px-7 py-3.5 text-sm font-medium text-[#1A2E35] transition-all hover:text-[#9c7b19] sm:px-8 sm:py-4 sm:text-base"
            >
              Programeaza-te Online
            </HoverBorderGradient>
            <a
              href="#servicii"
              className="flex w-full items-center justify-center gap-2 rounded-full border border-white/25 bg-black/18 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/18 sm:px-8 sm:py-4 sm:text-base md:w-auto"
            >
              Vezi Serviciile <ChevronRight size={18} />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
