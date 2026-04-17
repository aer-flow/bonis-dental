import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import GoldThreadAccent from './GoldThreadAccent';
import SectionTitle from './SectionTitle';
import HoverBorderGradient from './ui/hover-border-gradient';
import { services } from '../content/clinicContent';

export default function ServicesSection() {
  return (
    <section id="servicii" className="relative z-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-24 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mb-4 block text-xs font-medium uppercase tracking-[0.2em] text-[#D4AF37]"
          >
            Ingrijire Completa
          </motion.span>

          <SectionTitle
            side="left"
            className="mb-6 font-serif text-4xl text-[#1A2E35] md:text-5xl"
          >
            Servicii
          </SectionTitle>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <GoldThreadAccent align="center" widthClassName="w-20" variant="sway" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mx-auto max-w-2xl text-[1.02rem] leading-relaxed font-[450] text-gray-500 sm:text-base"
          >
            Fiecare tratament este realizat cu tehnologie moderna si o atentie
            deosebita pentru detalii, intr-un mediu unde confortul tau este prioritar.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-14 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-20">
          {services.map((service, index) => (
            <motion.a
              key={service.title}
              href={`/servicii/${service.slug}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="group block cursor-pointer"
            >
              <div className="relative mb-8 aspect-[4/5] overflow-hidden rounded-t-full border-8 border-[#FAFAFA] bg-gray-50 shadow-sm transition-all duration-700 group-hover:border-white group-hover:shadow-xl">
                <img
                  src={service.img}
                  alt={service.title}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  decoding="async"
                  sizes="(max-width: 767px) 100vw, (max-width: 1023px) 46vw, 30vw"
                />
                <div className="absolute inset-0 bg-[#1A2E35]/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>

              <HoverBorderGradient
                as="div"
                duration={1.8}
                containerClassName="rounded-[2rem] shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_18px_38px_rgba(0,0,0,0.08)]"
                className="rounded-[inherit] px-6 py-7"
              >
                <h3 className="mb-3 font-serif text-2xl text-[#1A2E35] transition-colors duration-300 group-hover:text-[#D4AF37]">
                  {service.title}
                </h3>

                <div className="mb-4 h-[1px] w-8 bg-[#D4AF37] transition-all duration-500 group-hover:w-16" />

                <p className="mb-6 min-h-[3rem] text-[0.98rem] leading-relaxed font-[450] text-gray-500 md:text-base">
                  {service.desc}
                </p>

                <div className="mb-1 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8f826d] sm:hidden">
                  <span className="h-px w-6 bg-[#D4AF37]/45" />
                  <span>Detalii serviciu</span>
                  <ArrowRight size={13} className="text-[#b49533]" />
                </div>

                <div className="flex translate-y-2 items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1A2E35] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  Vezi detalii <ArrowRight size={14} className="text-[#D4AF37]" />
                </div>
              </HoverBorderGradient>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
