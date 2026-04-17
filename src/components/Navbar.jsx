import { useEffect, useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { brand, serviceNavLinks } from '../content/clinicContent';

export default function Navbar({
  isScrolled,
  isVisible = true,
  homeHref = '/',
  navLinks,
  ctaHref = '#contact-section',
  ctaLabel = 'Programeaza-te',
  heroCtaClassName,
  scrolledCtaClassName
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpandedLabel, setMobileExpandedLabel] = useState(null);
  const navClassName = isScrolled
    ? 'bg-white/96 py-3 sm:py-4 shadow-md backdrop-blur-md'
    : 'bg-transparent py-4 sm:py-6';
  const topBarTextClassName = isScrolled ? 'text-[#1A2E35]' : '!text-white';
  const brandClassName = isScrolled ? '!text-[#1A2E35]' : '!text-white';
  const linkClassName = isScrolled
    ? 'transition-colors hover:text-[#D4AF37]'
    : '!text-white transition-colors hover:text-[#F4D87A]';
  const defaultHeroCtaClassName =
    'bg-[#D4AF37] !text-[#1A2E35] ring-1 ring-white/24 hover:bg-[#E1C15B] hover:!text-[#1A2E35]';
  const defaultScrolledCtaClassName =
    'bg-[#D4AF37] !text-[#1A2E35] ring-1 ring-[#D4AF37]/30 hover:bg-[#E1C15B] hover:!text-[#1A2E35]';
  const buttonClassName = isScrolled
    ? scrolledCtaClassName ?? defaultScrolledCtaClassName
    : heroCtaClassName ?? defaultHeroCtaClassName;
  const links = navLinks ?? [
    { href: '#despre', label: 'Despre Noi' },
    { href: '#echipa', label: 'Echipa' },
    { href: '#servicii', label: 'Servicii', children: serviceNavLinks },
    { href: '/tarife', label: 'Tarife' },
    { href: '#contact-section', label: 'Contact' }
  ];
  const dropdownClassName = isScrolled
    ? 'border border-[#E7E8EA] bg-white/96 shadow-[0_18px_50px_rgba(26,46,53,0.12)]'
    : 'rounded-[1.75rem] bg-[#081014]/38 shadow-[0_18px_50px_rgba(0,0,0,0.18)] backdrop-blur-md';
  const dropdownItemClassName = isScrolled
    ? 'text-[#1A2E35] hover:bg-[#F5F5F0] hover:text-[#9c7b19]'
    : '!text-white drop-shadow-[0_4px_14px_rgba(0,0,0,0.4)] hover:bg-white/12 hover:!text-white';

  const renderBrandLabel = (label) => {
    const words = String(label || '')
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length < 2) {
      return label;
    }

    const accentWord = words.pop();
    const primaryLabel = words.join(' ');

    return (
      <>
        {primaryLabel}{' '}
        <span className="text-[#D4AF37]">{accentWord}</span>
      </>
    );
  };

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.removeProperty('overflow');
      return undefined;
    }

    document.body.style.overflow = 'hidden';

    return () => document.body.style.removeProperty('overflow');
  }, [mobileMenuOpen]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = (event) => {
      if (event.matches) {
        setMobileMenuOpen(false);
        setMobileExpandedLabel(null);
      }
    };

    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        setMobileExpandedLabel(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <nav
      className={`fixed left-0 top-0 z-[70] w-full transition-all duration-500 ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0 pointer-events-none'
      } ${navClassName}`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 ${topBarTextClassName}`}
      >
        <a
          href={homeHref}
          onClick={() => {
            setMobileMenuOpen(false);
            setMobileExpandedLabel(null);
          }}
          className={`relative flex min-w-0 flex-1 items-center gap-3 ${brandClassName} md:max-w-[28rem] lg:max-w-[34rem] ${
            isScrolled ? '' : 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]'
          }`}
        >
          {brand.logoPath ? (
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-xl border p-1.5 md:h-11 md:w-11 ${
                isScrolled
                  ? 'border-[#E7E8EA] bg-white shadow-[0_10px_24px_rgba(26,46,53,0.08)]'
                  : 'border-white/14 bg-white/10 backdrop-blur-sm'
              }`}
            >
              <img
                src={brand.logoPath}
                alt={brand.logoAlt}
                className="max-h-full max-w-full object-contain"
              />
            </span>
          ) : null}
          <span className="min-w-0 truncate text-lg font-serif font-bold sm:text-2xl md:overflow-visible md:whitespace-normal md:text-clip md:leading-tight">
            {renderBrandLabel(brand.name)}
          </span>
        </a>

        <div className="hidden space-x-8 text-sm font-medium md:flex">
          {links.map((link) => (
            <div key={link.label} className="group relative">
              <a
                href={link.href}
                className={`inline-flex items-center gap-1.5 ${linkClassName} ${
                  isScrolled ? '' : 'drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]'
                }`}
              >
                {link.label}
                {link.children?.length ? <ChevronDown size={14} className="mt-px" /> : null}
              </a>

              {link.children?.length ? (
                <div className="pointer-events-none absolute left-1/2 top-full z-[80] w-72 -translate-x-1/2 pt-4 opacity-0 transition-all duration-200 group-hover:pointer-events-auto group-hover:opacity-100">
                  <div className={`rounded-[1.75rem] p-3 ${dropdownClassName}`}>
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        className={`block rounded-[1.1rem] px-4 py-3 text-sm transition-colors ${dropdownItemClassName}`}
                      >
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        <a
          href={ctaHref}
          className={`hidden min-w-[112px] items-center justify-center rounded-full px-6 py-2.5 text-center text-sm font-semibold shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl md:inline-flex ${buttonClassName}`}
        >
          <span className="leading-none">{ctaLabel}</span>
        </a>

        <div className="flex items-center md:hidden">
          <button
            type="button"
            aria-label={mobileMenuOpen ? 'Inchide meniul' : 'Deschide meniul'}
            aria-expanded={mobileMenuOpen}
            onClick={() => {
              setMobileMenuOpen((currentValue) => {
                const nextValue = !currentValue;

                if (!nextValue) {
                  setMobileExpandedLabel(null);
                }

                return nextValue;
              });
            }}
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              isScrolled
                ? 'border-[#E7E8EA] bg-white text-[#1A2E35]'
                : 'border-white/18 bg-black/18 text-white backdrop-blur-sm'
            }`}
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <div
        className={`mx-4 mt-4 overflow-hidden rounded-[2rem] transition-all duration-300 md:hidden sm:mx-6 ${
          mobileMenuOpen
            ? 'pointer-events-auto max-h-[calc(100dvh-5.75rem)] overflow-y-auto overscroll-contain opacity-100'
            : 'pointer-events-none max-h-0 opacity-0'
        } ${isScrolled ? 'border border-[#E7E8EA] bg-white shadow-lg' : 'bg-[#081014]/88 backdrop-blur-xl'}`}
      >
        <div className="flex flex-col px-5 pb-6 pt-5">
          <a
            href={ctaHref}
            onClick={() => {
              setMobileMenuOpen(false);
              setMobileExpandedLabel(null);
            }}
            className={`mb-4 inline-flex w-full items-center justify-center rounded-full px-5 py-3.5 text-center text-sm font-semibold shadow-lg transition-all ${buttonClassName}`}
          >
            <span className="leading-none">{ctaLabel}</span>
          </a>

          {links.map((link) => (
            <div key={link.label} className="border-b border-white/10 last:border-b-0">
              {link.children?.length ? (
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedLabel((currentValue) =>
                      currentValue === link.label ? null : link.label
                    )
                  }
                  className={`flex w-full items-center justify-between py-4 text-left text-sm font-medium ${
                    isScrolled ? '!text-[#1A2E35]' : '!text-white'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      isScrolled ? 'text-[#9c7b19]' : 'text-[#F4D87A]'
                    } ${mobileExpandedLabel === link.label ? 'rotate-180' : ''}`}
                  />
                </button>
              ) : (
                <a
                  href={link.href}
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setMobileExpandedLabel(null);
                  }}
                  className={`flex items-center justify-between py-4 text-sm font-medium ${
                    isScrolled ? '!text-[#1A2E35]' : '!text-white'
                  }`}
                >
                  <span>{link.label}</span>
                </a>
              )}

              {mobileMenuOpen && link.children?.length && mobileExpandedLabel === link.label ? (
                <div className="grid max-h-56 gap-2 overflow-y-auto overscroll-contain pb-4 pr-1">
                  {link.children.map((child) => (
                    <a
                      key={child.href}
                      href={child.href}
                      onClick={() => {
                        setMobileMenuOpen(false);
                        setMobileExpandedLabel(null);
                      }}
                      className={`rounded-2xl px-4 py-3 text-sm ${
                        isScrolled
                          ? 'bg-[#F5F5F0] !text-[#1A2E35]'
                          : 'bg-white/8 !text-white'
                      }`}
                    >
                      {child.label}
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}
