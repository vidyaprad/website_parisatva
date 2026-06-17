import React, { useState, useEffect } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Science', href: '#science' },
  { label: 'Process', href: '#technology' },
  { label: 'Who We Serve', href: '#who-we-serve' },
  { label: 'Ingredients', href: '#ingredients' },
  { label: 'Proof', href: '#proof' },
  { label: 'Team', href: '#team' },
];

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy: highlight the nav item for the section currently in view
  useEffect(() => {
    const els = navLinks
      .map((l) => document.getElementById(l.href.slice(1)))
      .filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive('#' + entry.target.id);
        });
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setActive(href);
  };

  return (
    <nav className="nav-shell" style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 50,
      background: scrolled ? 'rgba(249,249,247,0.92)' : 'rgba(249,249,247,0.7)',
      backdropFilter: 'blur(14px)', WebkitBackdropFilter: 'blur(14px)',
      borderBottom: `1px solid ${scrolled ? 'rgba(192,200,197,0.5)' : 'rgba(192,200,197,0.2)'}`,
      boxShadow: scrolled ? '0 6px 24px -12px rgba(8,52,45,0.18)' : 'none',
    }}>
      <div className="nav-shell" style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: scrolled ? '14px 24px' : '20px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%',
      }}>
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-headline-md" style={{ fontWeight: 700, color: 'var(--color-primary)', letterSpacing: '-0.02em', textDecoration: 'none' }}>
          Parisatva
        </a>

        {/* Desktop nav */}
        <div className="desktop-nav">
          {navLinks.map(link => (
            <a key={link.href} href={link.href}
              onClick={(e) => handleSmoothScroll(e, link.href)}
              className={`nav-link ${active === link.href ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <button className="btn-modern nav-cta" onClick={() => { window.location.href = 'mailto:partnerships@parisatva.com'; }} style={{
          background: 'var(--color-primary)', color: 'var(--color-on-primary)',
          padding: '12px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer',
          fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em',
          boxShadow: '0 6px 18px -8px rgba(8,52,45,0.45)', flexShrink: 0,
        }}>
          Partner With Us
        </button>
      </div>

      <style>{`
        .desktop-nav { display: flex; gap: 26px; align-items: center; }
        .desktop-nav .nav-link {
          font-family: 'Manrope', sans-serif; font-size: 15px; white-space: nowrap;
          color: var(--color-on-surface-variant); text-decoration: none;
          transition: color 0.3s ease;
        }
        .desktop-nav .nav-link:hover { color: var(--color-primary); }
        .desktop-nav .nav-link.is-active { color: var(--color-primary); font-weight: 600; }
        .desktop-nav .nav-link.is-active::after { transform: scaleX(1); transform-origin: left; }

        @media (max-width: 1024px) {
          .desktop-nav { gap: 18px; }
          .desktop-nav .nav-link { font-size: 14px; }
        }
        @media (max-width: 900px) {
          .desktop-nav { display: none; }
        }
      `}</style>
    </nav>
  );
}
