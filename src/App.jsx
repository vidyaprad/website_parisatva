import React, { useEffect } from 'react';
import NavBar from './components/NavBar';
import Hero from './components/Hero';
import About from './components/About';
import VisionMission from './components/VisionMission';
import Science from './components/Science';
import Technology from './components/Technology';
import WhoWeServe from './components/WhoWeServe';
import Portfolio from './components/Portfolio';
import ProofPoints from './components/ProofPoints';
import Team from './components/Team';
import { Metrics, Footer } from './components/Sections';

export default function App() {
  useEffect(() => {
    // Load Three.js
    const script = document.createElement('script');
    script.src = 'https://ajax.googleapis.com/ajax/libs/threejs/r125/three.min.js';
    script.async = true;
    document.head.appendChild(script);

    // Scroll reveal — stagger siblings, reveal once
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('scroll-visible');
          entry.target.classList.remove('scroll-hidden');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    const revealTimer = setTimeout(() => {
      document.querySelectorAll('section > div').forEach(el => {
        el.classList.add('scroll-hidden');
        // Stagger direct children that are grids/flex groups
        Array.from(el.children).forEach((child, i) => {
          child.style.setProperty('--reveal-delay', `${Math.min(i * 90, 450)}ms`);
        });
        observer.observe(el);
      });
    }, 100);

    // Scroll progress bar
    const bar = document.createElement('div');
    bar.className = 'scroll-progress';
    document.body.appendChild(bar);
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const h = document.documentElement;
        const pct = h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight);
        bar.style.width = `${pct * 100}%`;
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      clearTimeout(revealTimer);
      window.removeEventListener('scroll', onScroll);
      if (bar.parentNode) bar.parentNode.removeChild(bar);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <VisionMission />
      <Metrics />
      <Science />
      <Technology />
      <WhoWeServe />
      <Portfolio />
      <ProofPoints />
      <Team />
      <Footer />
    </>
  );
}
