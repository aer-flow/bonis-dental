import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { contact } from '../content/clinicContent';
import useViewportProfile from '../hooks/useViewportProfile';

const phoneHref = contact.phoneHref;

export default function FloatingWhatsApp() {
  const { isMobileViewport, simplifyMotion } = useViewportProfile();

  return (
    <motion.a
      href={phoneHref}
      aria-label="Suna acum la clinica"
      initial={{ opacity: 0, y: 22, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: simplifyMotion ? 0.35 : 0.55,
        ease: [0.22, 1, 0.36, 1]
      }}
      className="fixed bottom-4 right-4 z-[90] inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/45 bg-[#1A2E35] px-3.5 py-3 text-white shadow-[0_18px_40px_rgba(26,46,53,0.32)] transition-all hover:scale-[1.02] hover:bg-[#223941] hover:shadow-[0_22px_48px_rgba(26,46,53,0.4)] sm:bottom-5 sm:right-5 sm:px-4"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-[#1A2E35] shadow-[inset_0_1px_0_rgba(255,255,255,0.28)] sm:h-11 sm:w-11">
        <Phone size={20} strokeWidth={2.2} />
      </span>
      <span className={`${isMobileViewport ? 'hidden' : 'block'} pr-1 text-left`}>
        <span className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
          Telefon
        </span>
        <span className="block text-sm font-semibold">Suna acum</span>
      </span>
    </motion.a>
  );
}
