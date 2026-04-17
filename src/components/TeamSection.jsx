import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { doctors } from '../content/clinicContent';
import GoldThreadAccent from './GoldThreadAccent';
import SectionTitle from './SectionTitle';
import HoverBorderGradient from './ui/hover-border-gradient';

export default function TeamSection() {
  return (
    <section id="echipa" className="relative overflow-hidden bg-[#05080a] py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0)_30%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="relative z-20 mb-24 text-center"
        >
          <div className="mb-5 inline-flex rounded-full border border-white/12 bg-white/6 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#F4D87A] shadow-sm backdrop-blur-sm">
            Cunoaste Echipa
          </div>
          <SectionTitle side="right" className="mb-4 text-4xl font-serif text-white md:text-5xl">
            Cei care iti redau zambetul
          </SectionTitle>
          <div className="mb-6">
            <GoldThreadAccent align="center" widthClassName="w-16" variant="orbit" />
          </div>
          <p className="mx-auto max-w-xl text-[1.02rem] leading-relaxed font-[450] text-white/64 sm:text-base">
            Experienta, empatie si dedicare. Echipa noastra de specialisti este aici
            pentru a transforma fiecare vizita intr-o experienta premium.
          </p>
        </motion.div>

        <div className="mt-10 flex flex-col items-start justify-center gap-14 md:flex-row md:gap-24">
          {doctors.map((doctor, idx) => (
            <motion.div
              key={doctor.name}
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, delay: idx * 0.2, ease: 'easeOut' }}
              className="group relative flex w-full max-w-[360px] flex-col items-center"
            >
              <div className="relative z-20 h-[22rem] w-[16.5rem] overflow-hidden rounded-t-full border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-transform duration-700 ease-in-out group-hover:-translate-y-4 sm:h-96 sm:w-72">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#1A2E35]/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                  src={doctor.img}
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 70vw, 18rem"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
                className="relative z-[5] -mt-16 w-full"
              >
                <HoverBorderGradient
                  as="div"
                  duration={1.9}
                  containerClassName="rounded-[2rem] border-white/70 bg-white/80 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-md transition-all duration-500 group-hover:shadow-[0_15px_40px_rgb(0,0,0,0.1)]"
                  className="rounded-[inherit] p-8 pt-20 text-center"
                >
                  <h4 className="mb-1 text-2xl font-serif font-bold text-[#1A2E35]">
                    {doctor.name}
                  </h4>
                  <p className="mb-6 text-[0.92rem] font-medium uppercase tracking-wide text-[#D4AF37] sm:text-sm">
                    {doctor.role}
                  </p>

                  <div className="absolute left-6 top-20 font-serif text-4xl leading-none text-[#D4AF37] opacity-20">
                    "
                  </div>

                  <p className="relative z-10 px-2 text-[0.98rem] leading-relaxed font-[450] text-gray-600 italic sm:text-sm">
                    {doctor.quote}
                  </p>

                  <div className="mt-8 flex h-0 justify-center overflow-hidden opacity-0 transition-all duration-500 ease-in-out group-hover:h-10 group-hover:opacity-100">
                    <button className="flex items-center gap-2 text-sm font-medium text-[#1A2E35] transition-colors hover:text-[#D4AF37]">
                      Citeste profilul complet
                      <span className="rounded-full bg-[#F5F5F0] p-1 transition-colors group-hover:bg-[#D4AF37]/10">
                        <ArrowRight size={14} />
                      </span>
                    </button>
                  </div>
                </HoverBorderGradient>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
