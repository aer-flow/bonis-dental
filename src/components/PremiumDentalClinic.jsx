import { useState } from 'react';
import AboutSection from './AboutSection';
import FooterContact from './FooterContact';
import HeroSection from './HeroSection';
import Navbar from './Navbar';
import ServicesSection from './ServicesSection';
import TeamSection from './TeamSection';
import TestimonialsSection from './TestimonialsSection';
import useScrolledPast from '../hooks/useScrolledPast';

export default function PremiumDentalClinic() {
  const isScrolled = useScrolledPast(50);
  const [heroIntroVisible, setHeroIntroVisible] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-clip bg-[#FAFAFA] font-sans text-[#1A2E35] selection:bg-[#D4AF37] selection:text-white">
      <Navbar isScrolled={isScrolled} isVisible={heroIntroVisible} />
      <HeroSection onIntroReveal={setHeroIntroVisible} />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <TestimonialsSection />
      <FooterContact />
    </div>
  );
}
