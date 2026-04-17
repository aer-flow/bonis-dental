import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import GoldThreadAccent from './GoldThreadAccent';
import SectionTitle from './SectionTitle';

const testimonials = [
  {
    id: 1,
    name: 'Maria V.',
    text: 'Nu am crezut vreodata ca pot adormi pe scaunul stomatologic. O experienta cu adevarat premium, personalul este incredibil de cald si profesionist.',
    stars: 5
  },
  {
    id: 2,
    name: 'Andrei D.',
    text: 'O clinica in care te simti cu adevarat respectat. Mi-au explicat tot planul de tratament fara graba, iar preturile au fost exact cele discutate initial.',
    stars: 5
  },
  {
    id: 3,
    name: 'Simona G.',
    text: 'Am venit cu o frica imensa de dentist si am plecat relaxata. Blandetea echipei este remarcabila. Recomand cu tot dragul oricui are emotii inainte de vizita!',
    stars: 5
  }
];

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: 'easeOut' }
  },
  exit: (direction) => ({
    x: direction < 0 ? 100 : -100,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.4, ease: 'easeIn' }
  })
};

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => window.clearInterval(timerId);
  }, []);

  const nextStep = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section
      id="testimonials-section"
      className="relative z-20 overflow-hidden bg-[#060809] py-32 text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_26%)]" />
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="relative mb-16 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/6 text-[#D4AF37]"
          >
            <Quote fill="currentColor" size={24} className="opacity-40" />
          </motion.div>

          <SectionTitle side="right" className="font-serif text-3xl text-white md:text-4xl">
            Ce spun pacientii nostri
          </SectionTitle>
          <p className="mt-5 max-w-3xl text-[0.98rem] leading-relaxed font-[450] text-white/62 md:text-base">
            Increderea incepe cu transparenta. De aceea explicam clar fiecare optiune de
            tratament si construim impreuna cu tine un plan de ingrijire potrivit
            obiectivelor, sanatatii si bugetului tau. Nu exista presiune, doar ghidare
            bazata pe recomandari oneste si pe un parteneriat pe termen lung.
          </p>
          <div className="mt-6">
            <GoldThreadAccent align="center" widthClassName="w-18" variant="pulse" dark />
          </div>
        </div>

        <div className="relative flex min-h-[350px] items-center justify-center md:min-h-[300px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={testimonials[currentIndex].id}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute flex w-full flex-col items-center"
            >
              <div className="mb-8 flex gap-1 text-[#D4AF37]">
                {[...Array(testimonials[currentIndex].stars)].map((_, index) => (
                  <Star key={index} size={20} fill="currentColor" />
                ))}
              </div>

              <blockquote className="mb-8 max-w-3xl text-center font-serif text-[1.7rem] leading-relaxed text-white sm:text-2xl md:text-3xl">
                "{testimonials[currentIndex].text}"
              </blockquote>

              <cite className="text-[0.92rem] font-medium not-italic uppercase tracking-widest text-white/56 sm:text-sm">
                {testimonials[currentIndex].name}
              </cite>
            </motion.div>
          </AnimatePresence>

          <div className="pointer-events-none absolute top-1/2 flex w-full -translate-y-1/2 justify-between">
            <button
              type="button"
              onClick={prevStep}
              aria-label="Testimonial anterior"
              className="-ml-4 flex h-12 w-12 pointer-events-auto items-center justify-center rounded-full border border-white/10 bg-white/6 text-white shadow-sm transition-all hover:bg-white hover:text-[#1A2E35] md:-ml-12"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              type="button"
              onClick={nextStep}
              aria-label="Testimonial urmator"
              className="-mr-4 flex h-12 w-12 pointer-events-auto items-center justify-center rounded-full border border-white/10 bg-white/6 text-white shadow-sm transition-all hover:bg-white hover:text-[#1A2E35] md:-mr-12"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="mt-12 flex justify-center gap-3">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.id}
              type="button"
              aria-label={`Afiseaza testimonial ${index + 1}`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/18'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
