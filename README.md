# Dental Clinic Template

Template React + Vite folosit de generatorul local pentru cabinete stomatologice.

## Comenzi

```bash
npm install
npm run dev
npm run build
```

Scripturile `npm` folosesc acum direct `node ./node_modules/vite/dist/node/cli.js` ca sa functioneze corect si in workspaces cu spatii in path.

## Structura

- `src/components/PremiumDentalClinic.jsx` contine landing page-ul principal.
- `src/content/clinicContent.js` combina continutul editorial fix cu datele injectate din `site-data.json`.
- `site-data.json` este sursa de adevar pentru branding, contact, logo si metadata in site-urile generate.
- `public/img/` primeste logo-ul clinicii si imaginea de preview folosita pentru social metadata.

## Migrare site-uri vechi

Pentru site-urile generate pe template-ul static vechi foloseste workflow-ul din:

- `/Users/imac24/Desktop/websites/cabinete stomatologice/LEGACY_SITE_MIGRATION.md`
