import siteData from '../../site-data.json';

function normalizeAssetPath(value) {
  const rawValue = String(value || '').trim();

  if (!rawValue) {
    return '';
  }

  if (rawValue.startsWith('http://') || rawValue.startsWith('https://') || rawValue.startsWith('/')) {
    return rawValue;
  }

  return `/${rawValue.replace(/^\/+/, '')}`;
}

function normalizeText(value, fallback = '') {
  const rawValue = String(value || '').trim();
  return rawValue || fallback;
}

function normalizeHref(value, fallback = '#') {
  const rawValue = String(value || '').trim();
  return rawValue || fallback;
}

function normalizePhoneHref(value) {
  const rawValue = String(value || '').trim();
  if (!rawValue) {
    return '';
  }

  return rawValue.startsWith('+') ? rawValue : rawValue.replace(/\s+/g, '');
}

function normalizeWhatsAppNumber(value) {
  return String(value || '').replace(/\D/g, '');
}

const brandName = normalizeText(siteData.brand_name, 'Aura Dental');
const brandTagline = normalizeText(siteData.brand_tagline, 'Cabinet Stomatologic');
const city = normalizeText(siteData.city, 'Bucuresti');
const phoneDisplay = normalizeText(siteData.phone_display, '+40 700 000 000');
const phoneLink = normalizePhoneHref(siteData.phone_link || phoneDisplay);
const whatsappNumber = normalizeWhatsAppNumber(siteData.whatsapp_number || phoneLink);
const email = normalizeText(siteData.email, 'contact@example.com');
const address = normalizeText(siteData.address, 'Strada Zambetului Nr. 1, Bucuresti');
const mapQuery = encodeURIComponent(address);
const siteUrl = normalizeText(siteData.site_url, 'https://example.com/');

export const brand = {
  name: brandName,
  tagline: brandTagline,
  logoPath: normalizeAssetPath(siteData.logo_path),
  logoAlt: `Logo ${brandName}`
};

export const siteMeta = {
  city,
  siteUrl,
  copyrightYear: normalizeText(siteData.copyright_year, String(new Date().getFullYear()))
};

export const contact = {
  phone: phoneDisplay,
  phoneLink,
  phoneHref: phoneLink ? `tel:${phoneLink}` : '#',
  whatsappNumber,
  whatsappHref: whatsappNumber ? `https://wa.me/${whatsappNumber}` : '#',
  email,
  address,
  mapEmbedUrl: normalizeText(
    siteData.map_embed_url,
    `https://www.google.com/maps?q=${mapQuery}&z=15&output=embed`
  ),
  mapHref: `https://www.google.com/maps/search/?api=1&query=${mapQuery}`
};

export const socialLinks = {
  instagram: normalizeHref(siteData.instagram_url, '#'),
  facebook: normalizeHref(siteData.facebook_url, '#'),
  linkedin: normalizeHref(siteData.linkedin_url, '#')
};

export const siteCopy = {
  welcomeEyebrow: `Bine ai venit la ${brandName}`,
  aboutImageAlt: `Interior premium al cabinetului ${brandName}`,
  pricingEyebrow: `Tarife ${brandName}`,
  footerMapTitle: `Harta interactiva ${brandName}`,
  footerCopyright: `${brandName} Clinic`
};

export const reasons = [
  {
    title: 'Tehnologie Avansata',
    desc: 'Echipamente premium care reduc disconfortul la zero si accelereaza vindecarea.'
  },
  {
    title: 'Abordare Empatica',
    desc: 'Ascultam. Intelegem. Adaptam fiecare tratament ritmului tau.'
  },
  {
    title: 'Mediu Relaxant',
    desc: 'Aromaterapie, muzica ambientala si design gandit pentru starea ta de bine.'
  }
];

export const doctors = [
  {
    name: 'Dr. Alexandru Munteanu',
    role: 'Medic Fondator si Implantologie',
    quote:
      'Cred intr-o stomatologie unde pacientul sta pe scaun relaxat, stiind ca este pe maini bune.',
    img: 'https://images.pexels.com/photos/32205053/pexels-photo-32205053.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop'
  },
  {
    name: 'Dr. Elena Popa',
    role: 'Medic Specialist Ortodontie',
    quote:
      'Fiecare zambet are o poveste. Rolul meu este sa o fac perfecta, cu blandete si precizie.',
    img: 'https://images.pexels.com/photos/31043312/pexels-photo-31043312.jpeg?auto=compress&cs=tinysrgb&w=900&h=1200&fit=crop'
  }
];

export const services = [
  {
    slug: 'implantologie-dentara',
    title: 'Implantologie Dentara',
    eyebrow: 'Serviciu Signature',
    desc: 'Solutii precise pentru inlocuirea dintilor lipsa, cu implanturi si coroane adaptate functional si estetic fiecarui caz.',
    detail: 'Pentru pacienti care vor siguranta pe termen lung, integrare naturala si un plan clar de tratament.',
    meta: 'Plan digital 3D',
    img: 'https://images.unsplash.com/photo-1771442873035-474765b40ac6?auto=format&fit=crop&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1771442873035-474765b40ac6?auto=format&fit=crop&fm=jpg&q=80&w=1800',
    intro:
      'Refacem zambetul si functionalitatea cu implanturi integrate intr-un plan medical coerent, explicat simplu si etapizat.',
    body: [
      'Implantologia inseamna mai mult decat inlocuirea unui dinte lipsa. Conteaza stabilitatea pe termen lung, raportul corect intre os, gingie si viitoarea coroana, dar si felul in care totul se simte in viata reala, zi de zi.',
      `La ${brandName}, tratamentul este planificat digital, cu discutii clare despre etape, timp de vindecare si rezultatul final. Ne intereseaza nu doar sa arate bine, ci sa fie sigur, predictibil si usor de integrat in stilul tau de viata.`
    ],
    highlights: ['Consult personalizat', 'Vindecare ghidata', 'Aspect natural'],
    steps: [
      {
        title: 'Evaluare si plan',
        desc: 'Analizam radiologic si clinic zona, explicam optiunile si stabilim daca este nevoie de interventii pregatitoare.'
      },
      {
        title: 'Inserare controlata',
        desc: 'Implantul este inserat cu atentie pe baza planului digital, cu accent pe confort si stabilitate.'
      },
      {
        title: 'Restaurare finala',
        desc: 'Coroana finala este aleasa astfel incat sa redea atat functia, cat si aspectul firesc al dintelui.'
      }
    ]
  },
  {
    slug: 'estetica-dentara',
    title: 'Estetica Dentara',
    eyebrow: 'Estetica premium',
    desc: 'Fatete ceramice, albire profesionala si finisaje de mare finete pentru un zambet luminos si echilibrat.',
    detail: 'Ideal pentru pacienti care vor rafinament vizibil, dar un rezultat care ramane natural.',
    meta: 'Simulare estetica',
    img: 'https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?auto=format&fit=crop&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1769559893692-c6d0623bf8e4?auto=format&fit=crop&fm=jpg&q=80&w=1800',
    intro:
      'Construim zambete luminoase si proportionate, fara efect artificial, cu atentie la trasaturile fetei si la expresivitatea naturala.',
    body: [
      'Estetica dentara nu inseamna sa uniformizam totul, ci sa obtinem echilibru. Forma dintilor, transluciditatea, nuanta si proportiile trebuie gandite impreuna, astfel incat rezultatul sa para firesc si elegant.',
      'Lucram etapizat, cu discutii vizuale si decizii bine cantarite. Fie ca vorbim despre albire, fatete sau o armonizare mai ampla, cautam acel punct in care zambetul se vede mai bine, dar ramane al tau.'
    ],
    highlights: ['Fatete ceramice', 'Albire profesionala', 'Design de zambet'],
    steps: [
      {
        title: 'Analiza faciala',
        desc: 'Observam proportiile, linia zambetului si dorintele tale reale, nu urmarim un sablon standard.'
      },
      {
        title: 'Simulare si selectie',
        desc: 'Discutam variante de forma, lungime si nuanta pentru a alege un rezultat coerent si rafinat.'
      },
      {
        title: 'Finisaj premium',
        desc: 'Executia finala urmareste detalii subtile, astfel incat zambetul sa arate luminos si natural.'
      }
    ]
  },
  {
    slug: 'ortodontie-invizibila',
    title: 'Ortodontie Invizibila',
    eyebrow: 'Control discret',
    desc: 'Alinierea discreta a dintilor cu gutiere transparente, gandite pentru confort, predictibilitate si libertate in viata de zi cu zi.',
    detail: 'Pentru adolescenti si adulti care isi doresc corectie dentara fara impact vizual major.',
    meta: 'Plan pe etape',
    img: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&fm=jpg&q=80&w=1800',
    intro:
      'Ortodontia invizibila ofera control si libertate: corectie progresiva, predictibila si mult mai usor de integrat in rutina zilnica.',
    body: [
      'Gutierele transparente sunt o alegere foarte buna pentru pacientii care vor sa corecteze alinierea dintilor fara sa simta ca tratamentul le schimba complet imaginea de zi cu zi.',
      'Planificarea pe etape iti arata directia tratamentului, iar monitorizarea regulata ne permite sa ajustam parcursul clar si eficient. Accentul ramane pe confort, disciplina usoara si rezultat coerent.'
    ],
    highlights: ['Gutiere transparente', 'Confort zilnic', 'Rezultat predictibil'],
    steps: [
      {
        title: 'Scanare digitala',
        desc: 'Pornim de la o analiza precisa a pozitiei dintilor si construim traseul de corectie.'
      },
      {
        title: 'Purtare ghidata',
        desc: 'Primesti explicatii clare despre ritm, schimbarea alignerelor si ce urmeaza in fiecare etapa.'
      },
      {
        title: 'Monitorizare fina',
        desc: 'Urmarim evolutia constant si intervenim atunci cand este nevoie de ajustari.'
      }
    ]
  },
  {
    slug: 'endodontie-la-microscop',
    title: 'Endodontie la Microscop',
    eyebrow: 'Precizie clinica',
    desc: 'Tratam cu precizie milimetrica canalele dentare sub microscop, pentru a salva dintii naturali si a reduce riscul de reinterventie.',
    detail: 'Cand durerea apare, viteza, vizibilitatea si controlul fac diferenta.',
    meta: 'Microscop dentar',
    img: 'https://images.unsplash.com/photo-1757652591587-b8d27db73e10?auto=format&fit=crop&fm=jpg&q=80&w=1200',
    heroImage:
      'https://images.unsplash.com/photo-1757652591587-b8d27db73e10?auto=format&fit=crop&fm=jpg&q=80&w=1800',
    intro:
      'Endodontia la microscop permite interventii fine, bine controlate, acolo unde precizia este esentiala pentru salvarea dintelui.',
    body: [
      'Tratamentul de canal este un serviciu in care diferenta dintre o executie buna si una excelenta sta in vizibilitate si control. Microscopul ne ajuta sa lucram mai clar, mai curat si cu o logica mai precisa a fiecarui pas.',
      'Pentru pacient, asta inseamna sanse mai bune de pastrare a dintelui, mai multa predictibilitate si o abordare care reduce riscul unor probleme repetate in viitor.'
    ],
    highlights: ['Diagnostic rapid', 'Precizie milimetrica', 'Recuperare confortabila'],
    steps: [
      {
        title: 'Diagnostic exact',
        desc: 'Identificam sursa problemei si explicam daca dintele poate fi salvat si in ce conditii.'
      },
      {
        title: 'Tratament sub microscop',
        desc: 'Lucram cu marire si control fin pentru curatarea si sigilarea corecta a canalelor.'
      },
      {
        title: 'Refacere si monitorizare',
        desc: 'Stabilim cea mai buna varianta de restaurare pentru a proteja dintele pe termen lung.'
      }
    ]
  },
  {
    slug: 'chirurgie-orala',
    title: 'Chirurgie Orala',
    eyebrow: 'Interventii controlate',
    desc: 'Extractii complexe, managementul molarilor de minte si interventii orale realizate atent, cu control bun al confortului si recuperarii.',
    detail: 'Pentru situatii care necesita decizie sigura, tehnica buna si explicatii foarte clare.',
    meta: 'Protocol de recuperare',
    img: 'https://images.pexels.com/photos/14052564/pexels-photo-14052564.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1500&fit=crop',
    heroImage:
      'https://images.pexels.com/photos/14052564/pexels-photo-14052564.jpeg?auto=compress&cs=tinysrgb&w=1800&h=2200&fit=crop',
    heroImagePosition: '58% 28%',
    intro:
      'Chirurgia orala trebuie sa combine siguranta medicala cu o comunicare foarte buna, astfel incat pacientul sa stie exact ce urmeaza.',
    body: [
      'Indiferent daca vorbim despre extractii dificile, molari de minte inclusi sau alte interventii orale, important este sa existe un plan clar, o executie controlata si recomandari corecte pentru recuperare.',
      'Punem accent pe calm, pe explicatii si pe o abordare care sa reduca teama din jurul interventiilor chirurgicale. Pentru noi, experienta pacientului conteaza la fel de mult ca partea tehnica.'
    ],
    highlights: ['Extractii complexe', 'Control al disconfortului', 'Recuperare ghidata'],
    steps: [
      {
        title: 'Evaluare chirurgicala',
        desc: 'Analizam pozitia dintelui si gradul de dificultate pentru a estima clar procedura si recuperarea.'
      },
      {
        title: 'Interventie atenta',
        desc: 'Urmarim un protocol clar, cu control bun al tesuturilor si al confortului pe tot parcursul procedurii.'
      },
      {
        title: 'Indicatii post-operatorii',
        desc: 'Primesti recomandari simple si utile pentru o recuperare mai usoara si mai previzibila.'
      }
    ]
  },
  {
    slug: 'laborator-tehnica-dentara',
    title: 'Laborator Tehnica Dentara',
    eyebrow: 'Precizie de executie',
    desc: 'Punem accent pe precizia lucrarilor protetice, colaborand atent cu laboratorul pentru restaurari stabile, functionale si naturale.',
    detail: 'Pentru pacienti care vor lucrari bine adaptate, nu doar rapid finalizate.',
    meta: 'Colaborare integrata',
    img: 'https://images.unsplash.com/photo-1684607632829-1e5bf4f21dab?auto=format&fit=crop&q=80&w=1200&h=1500',
    heroImage:
      'https://images.unsplash.com/photo-1684607632829-1e5bf4f21dab?auto=format&fit=crop&q=80&w=1800&h=2200',
    heroImagePosition: '50% 18%',
    intro:
      'Lucrarile bune se vad in detalii: adaptare corecta, culoare bine aleasa, stabilitate si un rezultat care se simte firesc.',
    body: [
      'Colaborarea cu laboratorul de tehnica dentara este una dintre zonele in care calitatea finala se construieste in liniste, dar se vede clar in rezultat. Acolo se decide finetea unei coroane, adaptarea unei lucrari si naturaleatea unui zambet refacut.',
      'De aceea urmarim precizia, comunicarea buna intre medic si tehnician si o selectie atenta a restaurarilor. Pacientul simte diferenta atunci cand totul se aseaza bine, fara compromis.'
    ],
    highlights: ['Restaurari precise', 'Culoare naturala', 'Adaptare functionala'],
    steps: [
      {
        title: 'Amprentare si date',
        desc: 'Colectam corect informatia clinica pentru ca lucrarea finala sa porneasca de la o baza precisa.'
      },
      {
        title: 'Executie tehnica',
        desc: 'Tehnicianul urmareste detalii de forma, culoare si adaptare, in stransa legatura cu planul medical.'
      },
      {
        title: 'Proba si ajustare fina',
        desc: 'Verificam adaptarea in context real si facem ajustarile necesare pentru confort si stabilitate.'
      }
    ]
  }
];

export const serviceNavLinks = services.map((service) => ({
  href: `/servicii/${service.slug}`,
  label: service.title
}));

export function getServiceBySlug(slug) {
  return services.find((service) => service.slug === slug);
}

export const testimonial = {
  quote:
    'Nu am crezut vreodata ca pot adormi pe scaunul stomatologic. O experienta cu adevarat premium, personalul este incredibil de cald si profesionist.',
  author: 'Maria V.'
};
