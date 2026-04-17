import { lazy, Suspense, useEffect, useState } from 'react';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import PremiumDentalClinic from './components/PremiumDentalClinic';
import { getServiceBySlug } from './content/clinicContent';

const PricingPage = lazy(() => import('./pages/PricingPage'));
const ServicePage = lazy(() => import('./pages/ServicePage'));

function getCurrentPath() {
  return window.location.pathname.replace(/\/+$/, '') || '/';
}

export default function App() {
  const [pathname, setPathname] = useState(getCurrentPath);

  useEffect(() => {
    const handleNavigation = () => {
      setPathname(getCurrentPath());
    };

    window.addEventListener('popstate', handleNavigation);

    return () => window.removeEventListener('popstate', handleNavigation);
  }, []);

  let page = <PremiumDentalClinic />;

  if (pathname === '/tarife') {
    page = <PricingPage />;
  } else if (pathname.startsWith('/servicii/')) {
    const serviceSlug = pathname.replace('/servicii/', '');
    const service = getServiceBySlug(serviceSlug);

    if (service) {
      page = <ServicePage service={service} />;
    }
  }

  return (
    <>
      <Suspense fallback={<div className="min-h-screen bg-[#FAFAFA]" />}>{page}</Suspense>
      <FloatingWhatsApp />
    </>
  );
}
