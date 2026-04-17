import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import FooterContact from '../components/FooterContact';
import GoldThreadAccent from '../components/GoldThreadAccent';
import Navbar from '../components/Navbar';
import SectionTitle from '../components/SectionTitle';
import { contact, serviceNavLinks } from '../content/clinicContent';
import useScrolledPast from '../hooks/useScrolledPast';
import useViewportProfile from '../hooks/useViewportProfile';

const HERO_HOLD_MS = 1000;
const HERO_ZOOM_DURATION_MS = 3600;
const HERO_TEXT_REVEAL_DELAY_MS = 80;
const HERO_DETAILS_REVEAL_DELAY_MS = 420;

export default function ServicePage({ service }) {
  const isScrolled = useScrolledPast(50);
  const [showHeadline, setShowHeadline] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const { simplifyMotion } = useViewportProfile();

  useEffect(() => {
    const headlineTimerId = window.setTimeout(() => {
      setShowHeadline(true);
    }, simplifyMotion ? 620 : HERO_HOLD_MS + HERO_TEXT_REVEAL_DELAY_MS);

    const detailsTimerId = window.setTimeout(() => {
      setShowDetails(true);
    }, simplifyMotion ? 880 : HERO_HOLD_MS + HERO_DETAILS_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(headlineTimerId);
      window.clearTimeout(detailsTimerId);
    };
  }, [service.slug, simplifyMotion]);

  const navLinks = [
    { href: '/#despre', label: 'Despre Noi' },
    { href: '/#echipa', label: 'Echipa' },
    { href: '/#servicii', label: 'Servicii', children: serviceNavLinks },
    { href: '/tarife', label: 'Tarife' },
    { href: '#contact-section', label: 'Contact' }
  ];
  const phoneHref = contact.phoneHref;

  return (
    <div className="min-h-screen overflow-x-clip bg-[#FAFAFA] text-[#1A2E35]">
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
            src={service.heroImage}
            alt={service.title}
            initial={{
              scale: simplifyMotion ? 1.14 : 1.3,
              filter: simplifyMotion ? 'none' : 'blur(2px)'
            }}
            animate={{ scale: 1, filter: 'none' }}
            transition={{
              delay: simplifyMotion ? 0.45 : HERO_HOLD_MS / 1000,
              duration: simplifyMotion ? 2.1 : HERO_ZOOM_DURATION_MS / 1000,
              ease: [0.16, 1, 0.3, 1]
            }}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: service.heroImagePosition ?? 'center center' }}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[#05080a]/42" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,8,10,0.84)_0%,rgba(5,8,10,0.64)_28%,rgba(5,8,10,0.24)_58%,rgba(5,8,10,0.34)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,8,10,0.18)_0%,rgba(5,8,10,0.08)_36%,rgba(5,8,10,0.74)_100%)]" />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-4 pb-10 pt-28 sm:px-6 sm:pb-16 md:pt-32">
            <motion.div
              initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
              animate={
                showHeadline
                  ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                  : { opacity: 0, y: 22, filter: 'blur(6px)' }
              }
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-4xl text-white"
            >
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.7, delay: showHeadline ? 0.04 : 0, ease: 'easeOut' }}
                className="mb-6 inline-flex rounded-full border border-white/16 bg-black/16 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/92 backdrop-blur-sm sm:px-4 sm:text-xs"
              >
                {service.eyebrow}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={showHeadline ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.72, delay: showHeadline ? 0.08 : 0, ease: 'easeOut' }}
                className="mb-6"
              >
                <GoldThreadAccent widthClassName="w-22" variant="drift" dark />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={
                  showHeadline
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 14, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.82,
                  delay: showHeadline ? 0.1 : 0,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="mb-6 max-w-4xl text-[3rem] leading-[0.95] font-serif drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl"
              >
                {service.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={
                  showDetails
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 14, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.82,
                  delay: showDetails ? 0.04 : 0,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="max-w-3xl text-[1.04rem] leading-relaxed text-white/82 drop-shadow-[0_8px_24px_rgba(0,0,0,0.3)] sm:text-lg md:text-xl"
              >
                {service.intro}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16, filter: 'blur(4px)' }}
                animate={
                  showDetails
                    ? { opacity: 1, y: 0, filter: 'blur(0px)' }
                    : { opacity: 0, y: 16, filter: 'blur(4px)' }
                }
                transition={{
                  duration: 0.82,
                  delay: showDetails ? 0.08 : 0,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="mt-8 flex flex-col gap-3 sm:mt-10 sm:gap-4 md:flex-row"
              >
                <a
                  href="#contact-section"
                  className="inline-flex items-center justify-center rounded-full bg-[#D4AF37] px-7 py-3.5 text-sm font-medium text-[#1A2E35] shadow-xl transition-all hover:bg-white hover:text-[#1A2E35] hover:shadow-2xl sm:px-8 sm:py-4"
                >
                  Programeaza consultatia
                </a>
                <a
                  href={phoneHref}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/24 bg-black/18 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/18 sm:px-8 sm:py-4"
                >
                  <Phone size={16} />
                  Suna
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="overflow-x-clip bg-white py-28">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#D4AF37]">
              {service.meta}
            </div>
            <SectionTitle
              side="left"
              className="mb-6 max-w-2xl font-serif text-4xl text-[#1A2E35] md:text-5xl"
            >
              Plan clar, executie atenta si o experienta gandita sa inspire incredere.
            </SectionTitle>
            <div className="mb-8">
              <GoldThreadAccent widthClassName="w-20" variant="bloom" />
            </div>

            <div className="space-y-6 text-[1.02rem] leading-relaxed text-gray-600 sm:text-base md:text-lg">
              {service.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
            className="rounded-[2.4rem] border border-[#E9E7E1] bg-[#F7F5EF] p-8 shadow-[0_20px_55px_rgba(26,46,53,0.08)] md:p-10"
          >
            <div className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#9c7b19]">
              Pentru cine este potrivit
            </div>
            <p className="mb-8 text-[1.04rem] leading-relaxed text-[#1A2E35] sm:text-lg">{service.detail}</p>

            <div className="space-y-3">
              {service.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-[1.35rem] border border-white/85 bg-white/78 px-5 py-4 shadow-[0_10px_24px_rgba(26,46,53,0.05)]"
                >
                  <p className="text-[0.98rem] leading-relaxed font-[450] text-[#1A2E35] sm:text-sm">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-x-clip bg-[#05080a] py-28 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <div className="mb-5 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#F4D87A] backdrop-blur-sm">
              Parcursul tratamentului
            </div>
            <SectionTitle side="right" className="mb-4 font-serif text-4xl md:text-5xl">
              Cum gandim fiecare etapa
            </SectionTitle>
            <p className="mx-auto max-w-2xl text-[0.98rem] leading-relaxed font-[450] text-white/62 sm:text-base">
              Fiecare serviciu este organizat in pasi clari, astfel incat sa stii ce
              urmeaza si de ce fiecare etapa conteaza.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {service.steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: 'easeOut' }}
                className="rounded-[2rem] border border-white/10 bg-white/6 p-8 backdrop-blur-sm"
              >
                <div className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#F4D87A]">
                  Etapa {index + 1}
                </div>
                <h3 className="mb-4 font-serif text-2xl text-white">{step.title}</h3>
                <p className="text-[0.98rem] leading-relaxed font-[450] text-white/66 sm:text-base">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FooterContact />
    </div>
  );
}
