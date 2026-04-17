import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

export default function PricingSection() {
  const pricingSections = [
    {
      category: 'I. Consultatii si Preventie',
      items: [
        { name: 'Consultatie medic specialist', price: '150 RON' },
        {
          name: 'Pachet igienizare complet (Detartraj, Airflow, Periaj)',
          price: '350 RON'
        },
        { name: 'Radiografie digitala (la nevoie)', price: '50 RON' }
      ]
    },
    {
      category: 'II. Tratamente si Restaurari',
      items: [
        {
          name: 'Obturatie compozit (Plomba) - in functie de marime',
          price: 'de la 250 RON'
        },
        {
          name: 'Tratament de canal sub microscop (per canal)',
          price: 'de la 600 RON'
        },
        { name: 'Extractie dentara simpla', price: 'de la 200 RON' }
      ]
    },
    {
      category: 'III. Estetica si Proteze',
      items: [
        { name: 'Albire profesionala (in cabinet)', price: '1200 RON' },
        { name: 'Coroana zirconiu (aspect natural)', price: '1500 RON' },
        { name: 'Implant dentar (partea chirurgicala)', price: 'de la 2500 RON' }
      ]
    }
  ];

  return (
    <section id="tarife" className="relative z-20 bg-[#FAFAFA] py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-20 text-center">
          <SectionTitle
            side="left"
            className="mb-6 text-4xl font-serif text-[#1A2E35] md:text-5xl"
          >
            Tarife si Transparenta
          </SectionTitle>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-xl text-[1rem] leading-relaxed font-[450] text-gray-500 sm:text-base"
          >
            Credem in preturi corecte si clare. Iata costurile celor mai frecvente
            interventii in clinica noastra:
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-16">
          {pricingSections.map((section, idx) => (
            <motion.div
              key={section.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative"
            >
              <h3 className="mb-8 flex items-center gap-4 font-serif text-2xl text-[#D4AF37]">
                {section.category}
                <div className="h-[1px] flex-grow bg-gray-200" />
              </h3>

              <div className="space-y-6">
                {section.items.map((item) => (
                  <div
                    key={`${section.category}-${item.name}`}
                    className="group flex flex-col justify-between gap-2 transition-transform duration-300 hover:translate-x-2 md:flex-row md:items-end md:gap-4"
                  >
                    <span className="text-[1.02rem] font-medium text-[#1A2E35] sm:text-lg md:max-w-[70%]">
                      {item.name}
                    </span>

                    <div className="mb-1.5 hidden flex-grow border-b border-dotted border-gray-300 opacity-40 transition-opacity group-hover:opacity-100 md:block" />

                    <span className="whitespace-nowrap rounded-lg border border-gray-100 bg-white px-3 py-1 font-serif text-xl text-[#1A2E35] shadow-sm">
                      {item.price}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-20 rounded-3xl border border-[#E5E5E0] bg-[#F5F5F0] p-8 text-center"
        >
          <p className="text-[0.98rem] leading-relaxed font-[450] text-gray-600 italic md:text-base">
            "Aceste tarife sunt orientative. Pretul final al tratamentului tau va fi
            stabilit impreuna cu medicul, in urma consultatiei, pe baza unui plan
            detaliat care sa raspunda nevoilor tale reale. Nu avem costuri ascunse."
          </p>
        </motion.div>
      </div>
    </section>
  );
}
