import { motion } from 'framer-motion';
import { CalendarClock, ClipboardCheck, HeartPulse } from 'lucide-react';
import GoldThreadAccent from './GoldThreadAccent';
import SectionTitle from './SectionTitle';
import HoverBorderGradient from './ui/hover-border-gradient';
import useViewportProfile from '../hooks/useViewportProfile';
import { siteCopy } from '../content/clinicContent';

const aboutClinicImage =
  'https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1200&auto=format&fit=crop';
const aboutImageRevealViewport = { once: true, amount: 0.78 };
const promises = [
  {
    icon: CalendarClock,
    accent: 'from-[#F6E7B0] via-[#D4AF37]/30 to-transparent',
    title: 'Fara graba',
    desc:
      'Alocam suficient timp fiecarei programari. Iti explicam pe intelesul tau optiunile de tratament si ne asiguram ca esti confortabil inainte de a incepe.'
  },
  {
    icon: HeartPulse,
    accent: 'from-[#F4D87A] via-[#D4AF37]/35 to-transparent',
    title: 'Tratamente fara durere',
    desc:
      'Folosim anestezice moderne si tehnici blande pentru ca tu sa nu simti disconfort. Vrem ca singurul lucru cu care pleci sa fie un zambet sanatos.'
  },
  {
    icon: ClipboardCheck,
    accent: 'from-[#F7EBC2] via-[#D4AF37]/28 to-transparent',
    title: 'Transparenta totala',
    desc:
      'Fara costuri ascunse. La finalul consultatiei, primesti un plan de tratament clar, detaliat si discutat impreuna, pentru a sti exact la ce sa te astepti.'
  }
];

export default function AboutSection() {
  const { simplifyMotion, isTouchDevice } = useViewportProfile();

  return (
    <section id="despre" className="relative z-20 overflow-hidden pb-20 pt-24 sm:pb-24 sm:pt-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-20 grid grid-cols-1 items-center gap-10 md:mb-24 md:grid-cols-[minmax(0,1fr)_minmax(0,1.42fr)_minmax(0,1.12fr)] md:gap-8 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1.46fr)_minmax(0,1.16fr)] lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <span className="mb-6 flex items-center gap-4 text-sm font-medium uppercase tracking-widest text-[#D4AF37]">
              <GoldThreadAccent widthClassName="w-12" className="shrink-0" variant="bloom" />
              {siteCopy.welcomeEyebrow}
            </span>

            <SectionTitle
              side="left"
              className="max-w-[34rem] text-4xl leading-tight font-serif text-[#1A2E35] md:text-5xl lg:max-w-[40rem]"
            >
              Un loc unde vii{' '}
              <span className="font-light italic text-gray-500">
                fara teama si pleci cu zambetul pe buze.
              </span>
            </SectionTitle>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.95, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:px-1"
          >
            <div className="relative mx-auto w-full max-w-[38rem]">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, rotate: -3 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -left-6 top-10 h-32 w-28 rounded-[1.9rem] border border-[#D4AF37]/20 bg-white/70 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scaleX: 0, scaleY: 0.94 }}
                whileInView={{ opacity: 1, scaleX: 1, scaleY: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.85, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute -right-5 bottom-12 h-40 w-32 origin-right rounded-[2.2rem] border border-[#1A2E35]/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.9),rgba(244,246,248,0.78))] shadow-[0_20px_40px_rgba(26,46,53,0.08)]"
              />

              <motion.div
                initial={{ opacity: 0, clipPath: 'polygon(0 18%, 72% 0, 100% 18%, 100% 82%, 28% 100%, 0 82%)' }}
                whileInView={{ opacity: 1, clipPath: 'polygon(0 10%, 76% 0, 100% 14%, 100% 88%, 24% 100%, 0 86%)' }}
                viewport={aboutImageRevealViewport}
                transition={{ duration: 1.9, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4.4/5] overflow-hidden border border-white/80 bg-[#E9EEF2] shadow-[0_28px_80px_rgba(26,46,53,0.16)]"
              style={{
                  borderRadius: '2.8rem 6.25rem 2.8rem 5.8rem'
              }}
              >
                <motion.div
                  initial={false}
                  whileInView="revealed"
                  viewport={aboutImageRevealViewport}
                  className="pointer-events-none absolute inset-0 z-20"
                >
                  <motion.div
                    variants={{
                      revealed: {
                        x: '8%',
                        y: '-10%',
                        rotate: 8,
                        scale: 0.76,
                        opacity: 0.68,
                        transition: { duration: 2.9, delay: 0.18, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="absolute -right-[8%] -top-[6%] h-[44%] w-[34%] origin-top-right overflow-hidden border border-[#F6E7B0]/72 bg-[linear-gradient(180deg,rgba(249,244,225,0.90),rgba(233,238,242,0.72))] shadow-[0_24px_50px_rgba(26,46,53,0.14)]"
                    style={{
                      clipPath:
                        'polygon(14% 0, 72% 0, 90% 8%, 100% 24%, 96% 68%, 84% 88%, 64% 100%, 22% 96%, 0 78%, 4% 18%)'
                    }}
                  >
                    <div className="absolute inset-[2px] border border-white/45" style={{ clipPath: 'inherit' }} />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.24),transparent_36%,rgba(255,255,255,0.20)_62%,rgba(26,46,53,0.08))]" />
                    <div className="absolute left-[18%] top-[14%] h-px w-[52%] rotate-[10deg] bg-[#D4AF37]/80" />
                    <div className="absolute right-[18%] top-[20%] h-[48%] w-px bg-white/40" />
                    <div className="absolute bottom-[18%] left-[16%] h-px w-[38%] bg-white/60" />
                    <div className="absolute right-[16%] top-[14%] h-2.5 w-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_18px_rgba(212,175,55,0.75)]" />
                  </motion.div>
                  <motion.div
                    variants={{
                      revealed: {
                        x: '-6%',
                        y: '12%',
                        rotate: -7,
                        scale: 0.72,
                        opacity: 0.58,
                        transition: { duration: 3.1, delay: 0.28, ease: [0.16, 1, 0.3, 1] }
                      }
                    }}
                    className="absolute -bottom-[8%] -left-[6%] h-[38%] w-[30%] origin-bottom-left overflow-hidden border border-[#D4AF37]/46 bg-[linear-gradient(180deg,rgba(22,39,45,0.74),rgba(48,67,74,0.54))] shadow-[0_24px_50px_rgba(8,16,20,0.22)]"
                    style={{
                      clipPath:
                        'polygon(18% 0, 76% 6%, 94% 22%, 100% 52%, 90% 88%, 58% 100%, 14% 94%, 0 62%, 4% 18%)'
                    }}
                  >
                    <div className="absolute inset-[2px] border border-white/18" style={{ clipPath: 'inherit' }} />
                    <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(212,175,55,0.22),transparent_28%,rgba(255,255,255,0.08)_58%,rgba(6,13,16,0.26))]" />
                    <div className="absolute left-[18%] top-[18%] h-[54%] w-px bg-[#D4AF37]/76" />
                    <div className="absolute left-[18%] top-[20%] h-px w-[46%] -rotate-[8deg] bg-white/36" />
                    <div className="absolute right-[20%] bottom-[18%] h-px w-[34%] bg-[#D4AF37]/70" />
                    <div className="absolute left-[15%] bottom-[16%] h-2.5 w-2.5 rounded-full bg-[#F4D87A] shadow-[0_0_18px_rgba(244,216,122,0.65)]" />
                  </motion.div>
                </motion.div>

                <motion.img
                  src={aboutClinicImage}
                  alt={siteCopy.aboutImageAlt}
                  initial={{ scale: 1.08 }}
                  whileInView={{ scale: 1 }}
                  viewport={aboutImageRevealViewport}
                  transition={{ duration: 2.4, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 100vw, (max-width: 1279px) 46vw, 34vw"
                />

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,24,28,0.02),rgba(14,24,28,0.18))]" />
                <div className="absolute inset-y-0 left-[18%] w-px bg-white/35" />
                <div className="absolute inset-y-0 right-[18%] w-px bg-white/18" />
                <div className="absolute left-0 right-0 top-[18%] h-px bg-white/24" />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="border-l-2 border-[#D4AF37]/20 pl-6 md:pl-8 lg:pl-10"
          >
            <p className="mb-4 text-[1.05rem] leading-relaxed font-[450] text-gray-700 sm:text-lg">
              Stim ca vizita la dentist poate veni cu emotii sau chiar cu un pic de
              teama. De aceea, la noi, am pus pe primul loc linistea ta. Nu ne place
              graba si credem ca fiecare om care ne trece pragul merita explicatii
              clare, un zambet cald si tratamente facute cu multa rabdare.
            </p>
            <p className="text-[0.98rem] leading-relaxed font-[450] text-gray-500 sm:text-base">
              Suntem o echipa de medici care pun pret pe detalii si pe starea ta de
              bine. Oferim ingrijire corecta, intr-un spatiu curat si primitor, unde sa
              te simti respectat si in deplina siguranta. Fara cuvinte complicate, doar
              stomatologie facuta cu responsabilitate si grija.
            </p>
          </motion.div>
        </div>

        <div className="relative grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          {promises.map((item, idx) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{
                  duration: simplifyMotion ? 0.42 : 0.6,
                  delay: idx * 0.15,
                  ease: 'easeOut'
                }}
                className={`group relative z-20 transform-gpu transition-all duration-300 ${
                  isTouchDevice ? '' : 'hover:-translate-y-1'
                }`}
                style={{ willChange: 'transform, opacity' }}
              >
                <HoverBorderGradient
                  as="div"
                  duration={1.8}
                  containerClassName={`h-full rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] transition-all duration-300 ${
                    isTouchDevice ? '' : 'group-hover:shadow-[0_15px_30px_rgb(0,0,0,0.06)]'
                  }`}
                  className="rounded-[inherit] p-8 md:p-10"
                >
                  <motion.div
                    initial="rest"
                    whileHover={isTouchDevice ? undefined : 'hover'}
                    animate={
                      simplifyMotion
                        ? undefined
                        : {
                            y: [0, -1.5, 0]
                          }
                    }
                    transition={
                      simplifyMotion
                        ? undefined
                        : {
                            duration: 3.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: idx * 0.18
                          }
                    }
                    className="relative mb-7 h-16 w-16"
                    style={{ willChange: simplifyMotion ? 'auto' : 'transform' }}
                  >
                    <motion.div
                      variants={{
                        rest: { scale: simplifyMotion ? 1 : 0.92, opacity: simplifyMotion ? 0.46 : 0.32 },
                        hover: { scale: 1.08, opacity: 0.72 }
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className={`absolute inset-0 rounded-[1.4rem] bg-gradient-to-br ${item.accent} ${
                        simplifyMotion ? 'blur-[7px]' : 'blur-md'
                      }`}
                      style={{ willChange: simplifyMotion ? 'auto' : 'transform, opacity' }}
                    />

                    <motion.div
                      variants={{
                        rest: { rotate: 0, scale: 1 },
                        hover: { rotate: -4, scale: 1.03 }
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute inset-0 rounded-[1.4rem] border border-[#D4AF37]/18 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(249,246,238,0.94))] shadow-[0_14px_28px_rgba(26,46,53,0.08)]"
                      style={{ willChange: simplifyMotion ? 'auto' : 'transform' }}
                    />

                    <motion.div
                      variants={{
                        rest: { y: 0, scale: 1 },
                        hover: { y: -1.5, scale: 1.04 }
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="relative flex h-16 w-16 items-center justify-center rounded-[1.4rem] text-[#1A2E35]"
                      style={{ willChange: simplifyMotion ? 'auto' : 'transform' }}
                    >
                      <Icon className="h-7 w-7 text-[#9c7b19]" strokeWidth={1.75} />
                    </motion.div>

                    <motion.span
                      variants={{
                        rest: { x: 0, y: 0, opacity: simplifyMotion ? 0.72 : 0.45 },
                        hover: { x: 2, y: -2, opacity: 1 }
                      }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-[#D4AF37] shadow-[0_0_16px_rgba(212,175,55,0.7)]"
                      style={{ willChange: simplifyMotion ? 'auto' : 'transform, opacity' }}
                    />
                  </motion.div>

                  <h3 className="mb-3 text-xl font-serif text-[#1A2E35] md:text-2xl">
                    {item.title}
                  </h3>

                  <p className="text-[0.98rem] leading-relaxed font-[450] text-gray-600 md:text-base">
                    {item.desc}
                  </p>
                </HoverBorderGradient>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
