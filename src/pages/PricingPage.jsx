import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import FooterContact from '../components/FooterContact';
import Navbar from '../components/Navbar';
import PricingSection from '../components/PricingSection';
import { contact, serviceNavLinks, siteCopy } from '../content/clinicContent';
import useScrolledPast from '../hooks/useScrolledPast';
import useViewportProfile from '../hooks/useViewportProfile';

const pricingHeroImage =
  'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1600&auto=format&fit=crop';

export default function PricingPage() {
  const isScrolled = useScrolledPast(50);
  const [showHeroContent, setShowHeroContent] = useState(false);
  const { simplifyMotion } = useViewportProfile();

  useEffect(() => {
    const timerId = window.setTimeout(() => {
      setShowHeroContent(true);
    }, simplifyMotion ? 850 : 1450);

    return () => window.clearTimeout(timerId);
  }, [simplifyMotion]);

  const navLinks = [
    { href: '/#despre', label: 'Despre Noi' },
    { href: '/#echipa', label: 'Echipa' },
    { href: '/#servicii', label: 'Servicii', children: serviceNavLinks },
    { href: '#tarife-list', label: 'Tarife' },
    { href: '#contact-section', label: 'Contact' }
  ];

  const phoneHref = contact.phoneHref;

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-[#1A2E35]">
      <Navbar
        isScrolled={isScrolled}
        homeHref="/"
        navLinks={navLinks}
        ctaHref={phoneHref}
        ctaLabel="Suna"
        heroCtaClassName="bg-[#D4AF37] text-[#1A2E35] hover:bg-[#e1c15b]"
        scrolledCtaClassName="bg-[#D4AF37] text-[#1A2E35] hover:bg-[#e1c15b]"
      />

      <section className="relative h-screen overflow-hidden">
        <div className="h-full overflow-hidden">
          <motion.img
            src={pricingHeroImage}
            alt="Interior luminos de clinica stomatologica"
            initial={{ scale: simplifyMotion ? 1.14 : 1.3 }}
            animate={{ scale: 1 }}
            transition={{
              duration: simplifyMotion ? 1.35 : 2.1,
              ease: [0.22, 0.61, 0.36, 1]
            }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
          />
          <motion.div
            initial={{ opacity: 0.72 }}
            animate={{ opacity: 0.46 }}
            transition={{ duration: 2.1, ease: 'easeOut' }}
            className="absolute inset-0 bg-[#05080a]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,10,0.34)_0%,rgba(5,8,10,0.12)_34%,rgba(5,8,10,0.58)_100%)]" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 pt-28 sm:px-6 sm:pb-16 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={showHeroContent ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="max-w-3xl text-white"
            >
              <div className="mb-6 inline-flex rounded-full border border-white/16 bg-black/16 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/92 backdrop-blur-sm sm:px-4 sm:text-xs">
                {siteCopy.pricingEyebrow}
              </div>
              <h1 className="mb-6 text-[3.1rem] leading-[0.95] font-serif drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl">
                Tarife
              </h1>
              <p className="max-w-2xl text-[1.04rem] leading-relaxed text-white/82 drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] sm:text-lg md:text-xl">
                Preturi clare, explicate simplu, pentru o discutie transparenta inca de
                la prima consultatie.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4 md:flex-row">
                <a
                  href="#tarife-list"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-medium text-[#1A2E35] shadow-xl transition-all hover:bg-white hover:text-[#1A2E35] hover:shadow-2xl sm:px-8 sm:py-4"
                >
                  Programare
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/24 bg-black/18 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/18 sm:px-8 sm:py-4"
                >
                  <Phone size={16} />
                  Suna
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div id="tarife-list">
        <PricingSection />
      </div>

      <FooterContact />
    </div>
  );
}
