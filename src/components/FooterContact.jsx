import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Clock
} from 'lucide-react';
import { brand, contact, siteCopy, siteMeta, socialLinks } from '../content/clinicContent';
import GoldThreadAccent from './GoldThreadAccent';
import SectionTitle from './SectionTitle';
import HoverBorderGradient from './ui/hover-border-gradient';
import useViewportProfile from '../hooks/useViewportProfile';
const footerBackgroundImage =
  'https://images.unsplash.com/photo-1642844771937-23accb161a3d?auto=format&fit=crop&q=80&w=2200';

export default function FooterContact() {
  const contactSectionRef = useRef(null);
  const { simplifyMotion } = useViewportProfile();
  const { scrollYProgress } = useScroll({
    target: contactSectionRef,
    offset: ['start end', 'end start']
  });
  const footerBackgroundY = useTransform(scrollYProgress, [0, 1], [-180, 180]);
  const socialItems = [
    { href: socialLinks.instagram, label: 'Instagram', Icon: Instagram },
    { href: socialLinks.facebook, label: 'Facebook', Icon: Facebook },
    { href: socialLinks.linkedin, label: 'LinkedIn', Icon: Linkedin }
  ].filter((item) => item.href && item.href !== '#');
  const brandWords = brand.name.split(/\s+/).filter(Boolean);
  const brandPrimaryLabel = brandWords.slice(0, -1).join(' ');
  const brandAccentLabel = brandWords.slice(-1)[0] || brand.name;

  return (
    <footer className="relative z-20 bg-white">
      <div ref={contactSectionRef} className="relative overflow-hidden pt-20">
        <motion.img
          src={footerBackgroundImage}
          alt=""
          aria-hidden="true"
          style={{ y: simplifyMotion ? 0 : footerBackgroundY }}
          className="pointer-events-none absolute inset-x-0 top-0 h-[940px] w-full scale-[1.14] object-cover opacity-92 blur-[1px] brightness-[0.42] saturate-[0.82]"
          loading="lazy"
          decoding="async"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[940px] bg-[linear-gradient(180deg,rgba(6,16,32,0.74),rgba(13,30,54,0.56)_28%,rgba(255,255,255,0.14)_56%,rgba(255,255,255,0.88)_100%)]" />

        <div id="contact-section" className="relative z-10 mx-auto mb-20 max-w-7xl px-4 sm:mb-24 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col overflow-hidden rounded-[2.3rem] bg-white shadow-[0_20px_70px_rgba(26,46,53,0.08)] sm:rounded-[3rem] lg:flex-row"
          >
            <div className="flex flex-col justify-between bg-[#1A2E35] p-8 text-white sm:p-12 md:p-16 lg:w-1/3">
              <div>
                <SectionTitle
                  side="right"
                  className="mb-6 font-serif text-4xl leading-tight text-white"
                >
                  Suntem aici
                  <br />
                  <span className="font-light italic text-[#D4AF37]">sa te ascultam.</span>
                </SectionTitle>
                <GoldThreadAccent
                  widthClassName="w-18"
                  className="mb-8"
                  variant="float"
                  dark
                />
                <p className="mb-10 leading-relaxed font-[450] text-gray-400">
                  Indiferent ca ai o intrebare simpla sau vrei sa iti planifici prima
                  vizita, scrie-ne cu incredere. Iti vom raspunde cat mai repede.
                </p>
              </div>

              <div className="space-y-6">
                <a
                  href={contact.phoneHref}
                  className="group flex items-center gap-4"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[#D4AF37]">
                    <Phone size={18} className="text-[#D4AF37] group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium">{contact.phone}</span>
                </a>

                <a href={`mailto:${contact.email}`} className="group flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 transition-colors group-hover:bg-[#D4AF37]">
                    <Mail size={18} className="text-[#D4AF37] group-hover:text-white" />
                  </div>
                  <span className="text-sm font-medium">{contact.email}</span>
                </a>
              </div>
            </div>

            <div className="bg-white p-8 sm:p-12 md:p-16 lg:w-2/3">
              <form className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div className="flex flex-col">
                  <label className="mb-3 ml-1 text-xs font-bold uppercase tracking-widest text-[#8d8474]">
                    Numele tau
                  </label>
                  <HoverBorderGradient
                    as="div"
                    duration={1.8}
                    containerClassName="rounded-2xl border border-[#e1d4c3] shadow-[0_18px_45px_rgba(26,46,53,0.08)]"
                    className="bg-[linear-gradient(180deg,rgba(255,251,245,0.98),rgba(242,235,224,0.98))]"
                  >
                    <input
                      type="text"
                      placeholder="Ex: Maria Popescu"
                      className="w-full rounded-[inherit] bg-transparent px-6 py-4 text-[1rem] font-[450] text-[#1A2E35] outline-none transition-all placeholder:text-[#9e927f]"
                    />
                  </HoverBorderGradient>
                </div>

                <div className="flex flex-col">
                  <label className="mb-3 ml-1 text-xs font-bold uppercase tracking-widest text-[#8d8474]">
                    Telefon
                  </label>
                  <HoverBorderGradient
                    as="div"
                    duration={1.8}
                    containerClassName="rounded-2xl border border-[#e1d4c3] shadow-[0_18px_45px_rgba(26,46,53,0.08)]"
                    className="bg-[linear-gradient(180deg,rgba(255,251,245,0.98),rgba(242,235,224,0.98))]"
                  >
                    <input
                      type="tel"
                      placeholder="07XX XXX XXX"
                      className="w-full rounded-[inherit] bg-transparent px-6 py-4 text-[1rem] font-[450] text-[#1A2E35] outline-none transition-all placeholder:text-[#9e927f]"
                    />
                  </HoverBorderGradient>
                </div>

                <div className="flex flex-col md:col-span-2">
                  <label className="mb-3 ml-1 text-xs font-bold uppercase tracking-widest text-[#8d8474]">
                    Cum te putem ajuta?
                  </label>
                  <HoverBorderGradient
                    as="div"
                    duration={2}
                    containerClassName="rounded-3xl border border-[#e1d4c3] shadow-[0_18px_45px_rgba(26,46,53,0.08)]"
                    className="bg-[linear-gradient(180deg,rgba(255,251,245,0.98),rgba(242,235,224,0.98))]"
                  >
                    <textarea
                      rows="4"
                      placeholder="Spune-ne pe scurt ce te preocupa..."
                      className="w-full resize-none rounded-[inherit] bg-transparent px-6 py-4 text-[1rem] font-[450] text-[#1A2E35] outline-none transition-all placeholder:text-[#9e927f]"
                    />
                  </HoverBorderGradient>
                </div>

                <div className="flex flex-col items-center justify-between gap-6 pt-4 md:col-span-2 md:flex-row">
                  <p className="max-w-[300px] text-center text-xs leading-relaxed font-medium text-[#8d8474] md:text-left">
                    Apasa pe buton si te vom suna in cel mai scurt timp pentru a stabili
                    detaliile.
                  </p>

                  <motion.button
                    id="submit-button"
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full rounded-full bg-[#1A2E35] px-12 py-4 font-bold text-[#F5E7BA] shadow-lg shadow-[#1A2E35]/18 transition-all hover:bg-[#223941] hover:text-white md:w-auto"
                  >
                    Trimite Mesajul
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative z-20 border-t border-white/8 bg-[#05080a] pb-10 pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
            <div className="md:col-span-1">
              <div className="mb-6 flex items-center gap-3 text-2xl font-serif font-bold text-white">
                {brand.logoPath ? (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/12 bg-white/6 p-2">
                    <img
                      src={brand.logoPath}
                      alt={brand.logoAlt}
                      className="max-h-full max-w-full object-contain"
                    />
                  </span>
                ) : null}
                <span className="min-w-0">
                  {brandPrimaryLabel ? `${brandPrimaryLabel} ` : ''}
                  <span className="text-[#D4AF37]">{brandAccentLabel}</span>
                </span>
              </div>
              <p className="mb-6 text-sm leading-relaxed text-white/54">
                Stomatologie facuta cu rabdare si blandete, pentru zambete sanatoase si
                pacienti relaxati.
              </p>
              {socialItems.length ? (
                <div className="flex gap-4">
                  {socialItems.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/72 transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#1A2E35]"
                    >
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              ) : null}
            </div>

            <div>
              <h4 className="mb-6 text-sm font-bold uppercase tracking-widest text-white">
                Link-uri utile
              </h4>
              <ul className="space-y-4 text-sm text-white/54">
                <li>
                  <a href="#despre" className="transition-colors hover:text-[#D4AF37]">
                    Despre Clinica
                  </a>
                </li>
                <li>
                  <a href="#servicii" className="transition-colors hover:text-[#D4AF37]">
                    Serviciile Noastre
                  </a>
                </li>
                <li>
                  <a href="#echipa" className="transition-colors hover:text-[#D4AF37]">
                    Echipa Medicala
                  </a>
                </li>
                <li>
                  <a href="/tarife" className="transition-colors hover:text-[#D4AF37]">
                    Lista de Preturi
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="mb-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-white">
                <Clock size={16} className="text-[#D4AF37]" />
                Program Lucru
              </h4>
              <ul className="space-y-4 text-sm text-white/54">
                <li className="flex justify-between gap-4">
                  <span>Luni - Vineri:</span>
                  <span className="font-medium text-white">09:00 - 20:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Sambata:</span>
                  <span className="font-medium text-white">09:00 - 14:00</span>
                </li>
                <li className="flex justify-between gap-4">
                  <span>Duminica:</span>
                  <span className="font-medium italic text-[#D4AF37] underline">
                    Inchis
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="mb-16 overflow-hidden rounded-[2.4rem] border border-white/10 bg-[#0d1417] shadow-[0_22px_60px_rgba(0,0,0,0.24)]">
            <div className="flex flex-col justify-between gap-6 border-b border-white/10 px-6 py-6 md:flex-row md:items-end md:px-8">
              <div>
                <h4 className="mb-3 text-sm font-bold uppercase tracking-widest text-white">
                  Unde ne gasesti
                </h4>
                <div className="flex max-w-xl gap-3 text-sm leading-relaxed text-white/54">
                  <MapPin size={22} className="mt-0.5 shrink-0 text-[#D4AF37]" />
                  <span>{contact.address}</span>
                </div>
              </div>
              <a
                href={contact.mapHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex text-xs font-semibold uppercase tracking-[0.22em] text-[#D4AF37] transition-colors hover:text-white"
              >
                Deschide in Google Maps
              </a>
            </div>

            <iframe
              title={siteCopy.footerMapTitle}
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full md:h-[440px]"
            />
          </div>

          <div
            id="footer-flourish"
            className="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row"
          >
            <p className="text-[10px] uppercase tracking-widest text-white/34">
              &copy; {siteMeta.copyrightYear} {siteCopy.footerCopyright}. Realizat cu grija
              pentru pacienti.
            </p>
            <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/34">
              <a href="#" className="transition-colors hover:text-white">
                Politica de Confidentialitate
              </a>
              <a href="#" className="transition-colors hover:text-white">
                ANPC
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
