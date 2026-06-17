import React, { useState, useRef, useEffect } from 'react';

// Count-up that triggers when scrolled into view
function CountUp({ target, suffix = '', prefix = '', duration = 1600 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now) => {
            const p = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
            setVal(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(node);
    return () => io.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

// ── Impact Metrics ──────────────────────────────────────────────────
export function Metrics() {
  const items = [
    { icon: 'category', target: 4, suffix: '+', label: 'Bioactive Ingredient Classes' },
    { icon: 'biotech', target: 100, suffix: '%', label: 'Batches With Full CoA' },
    { icon: 'hub', target: 2, suffix: '', label: 'Fermentation Platforms' },
    { icon: 'gavel', text: 'FSSAI', label: 'Aligned Regulatory Dossiers' },
  ];
  return (
    <section style={{ padding: '80px 0', background: 'var(--color-primary)', color: 'var(--color-on-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: '500px', height: '500px', background: '#2f7d6b', top: '-200px', left: '20%', opacity: 0.25 }} />
      <div style={{
        position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px',
        textAlign: 'center',
      }}>
        {items.map(item => (
          <div key={item.label} className="lift-card" style={{ borderRadius: '12px', padding: '8px' }}>
            <span className="material-symbols-outlined floating" style={{ fontSize: '48px', color: 'var(--color-primary-fixed)', display: 'block', marginBottom: '16px' }}>
              {item.icon}
            </span>
            <p className="font-headline-lg" style={{ marginBottom: '4px' }}>
              {item.text ? item.text : <CountUp target={item.target} suffix={item.suffix} />}
            </p>
            <p className="font-label-md" style={{ color: 'var(--color-on-primary-container)' }}>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Sustainability ───────────────────────────────────────────────────
export function Sustainability() {
  return (
    <section id="sustainability" style={{ padding: '80px 0', background: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, right: 0, width: '50%', height: '100%',
        opacity: 0.1, pointerEvents: 'none',
      }}>
        <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
          <path d="M47,-62.1C59.9,-54.6,68.8,-40.4,74.1,-25C79.4,-9.7,81.1,6.8,77,22C72.9,37.3,62.9,51.3,49.1,60.8C35.3,70.3,17.7,75.3,1.3,73.5C-15.1,71.7,-30.2,63.1,-43.3,52.1C-56.5,41.1,-67.7,27.7,-72.5,12.3C-77.4,-3.2,-75.8,-20.6,-67.3,-34.5C-58.8,-48.3,-43.4,-58.5,-28.5,-64.8C-13.6,-71.1,0.8,-73.4,16.1,-70.7C31.4,-68,47,-62.1Z" fill="#08342d" transform="translate(200 200)" />
        </svg>
      </div>

      <div style={{
        position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
        display: 'flex', flexWrap: 'wrap', gap: '80px', alignItems: 'center',
      }}>
        <div style={{ flex: '1 1 400px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-secondary)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Ethical Biotech
          </span>
          <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '24px' }}>Future-Proof Production</h2>
          <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '48px', lineHeight: 1.6 }}>
            By utilizing fermentation instead of industrial agriculture or chemical synthesis, we drastically reduce land use, water consumption, and carbon emissions. Our bioreactors represent the most resource-efficient way to produce high-value nutrients on the planet.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {[
              { icon: 'water_drop', text: '90% Water Savings vs. Traditional Farming' },
              { icon: 'landscape', text: 'Zero Arable Land Required' },
            ].map(item => (
              <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{
                  width: '32px', height: '32px', borderRadius: '9999px',
                  background: 'var(--color-secondary-container)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: 'var(--color-secondary)' }}>{item.icon}</span>
                </div>
                <span className="font-label-md">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ flex: '1 1 400px', borderRadius: '16px', overflow: 'hidden', border: '1px solid var(--color-outline-variant)', boxShadow: '0 25px 50px rgba(0,0,0,0.15)' }}>
          <img
            src="https://lh3.googleusercontent.com/aida/AP1WRLsI-AH844bD9sc49ziihY0b66dUH9E5WYNoSlcCP8fRKl0Ig2pLhTw9c7CLLUiJwCcm2nVq5zuA4FpJm024-J-GrshZ7e13N_SbE4Dg4_xbWwI1_uaPSebLOR4mMaLsuY_CCCgMjB8k3cGbAsg2XtCcIdWnFcZz7udqpSByEGamplp5DPbbjJMn8ZX2NLHbO9N27mgyzlOg6o3VHoC94Zg0RNltVddREpdIU9yDAJzO4XqBsFB-ctXh160"
            alt="Sustainable production"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </div>
    </section>
  );
}

// ── Research ─────────────────────────────────────────────────────────
export function Research() {
  return (
    <section id="research" style={{ padding: '80px 0', background: 'var(--color-surface-container-high)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '80px', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '12px' }}>Research & Insights</h2>
            <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>Validated clinical findings and whitepapers.</p>
          </div>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600,
          }}>
            View All Publications
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>arrow_right_alt</span>
          </button>
        </div>

        <div className="bento-grid">
          <div className="bento-col-8" style={{
            background: 'white', padding: '48px', borderRadius: '12px',
            border: '1px solid var(--color-outline-variant)',
            display: 'flex', flexWrap: 'wrap', gap: '48px',
          }}>
            <div style={{ flex: '0 0 200px', aspectRatio: '1/1', background: 'var(--color-surface-container-low)', borderRadius: '8px', overflow: 'hidden' }}>
              <img
                src="https://lh3.googleusercontent.com/aida/AP1WRLsj9i_yloEzuYfhZBhXw9NO6hkqHQQjl02Jallowpw4cKlEWertstyqYkmsikpR8Su0QWwCgk4k_Ks6uxTzyEuoxoK5f3aXcL_TdYV5S59uxqBQJbJP1lTa3C7i2WLq3QSoumXtJSBYUS7lxU3dDHo_ilnywuKuSL_EayC3wA9c31w7EAFvqkUy2pcKK_RqWIJvIqgK9ftXnTxw4qvYa-OYGQ9SqIwqa3_o-kFglGtMiXXYkE3bJ3AFGjw"
                alt="Research specimen"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            <div style={{ flex: '1 1 200px' }}>
              <span style={{
                display: 'inline-block', padding: '4px 12px',
                background: 'var(--color-tertiary-fixed)', color: 'var(--color-on-tertiary-fixed)',
                fontSize: '10px', fontWeight: 700, borderRadius: '4px', textTransform: 'uppercase', marginBottom: '24px',
              }}>Featured Study</span>
              <h3 className="font-headline-md" style={{ color: 'var(--color-on-surface)', marginBottom: '12px' }}>Bio-availability in Microbial Postbiotics</h3>
              <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', marginBottom: '48px' }}>
                A multi-center trial demonstrating the 3x efficacy increase of our fermented metabolites over synthetic alternatives.
              </p>
              <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
                <span className="font-caption" style={{ color: 'var(--color-on-surface-variant)' }}>Published: Oct 2023</span>
                <span className="font-caption" style={{ color: 'var(--color-on-surface-variant)' }}>Journal: BioTech Quarterly</span>
              </div>
            </div>
          </div>

          <div className="bento-col-4" style={{
            background: 'var(--color-primary)', color: 'var(--color-on-primary)',
            padding: '48px', borderRadius: '12px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          }}>
            <div>
              <span className="material-symbols-outlined" style={{ color: 'var(--color-primary-fixed-dim)', display: 'block', marginBottom: '24px', fontSize: '32px' }}>insights</span>
              <h3 className="font-headline-md" style={{ marginBottom: '12px' }}>The 2026 Fermentation Report</h3>
              <p className="font-body-md" style={{ color: 'var(--color-on-primary-container)' }}>
                Download our comprehensive outlook on the future of microbial nutraceuticals.
              </p>
            </div>
            <button className="btn-modern" style={{
              marginTop: '48px', width: '100%', padding: '24px 0',
              background: 'var(--color-primary-fixed)', color: 'var(--color-on-primary-fixed)',
              borderRadius: '8px', border: 'none', cursor: 'pointer',
              fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600,
            }}>
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────
export function Contact() {
  const [form, setForm] = React.useState({ name: '', org: '', email: '', type: 'Research Partnership', message: '' });
  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section id="contact" style={{ padding: '80px 0', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{
          background: 'white', borderRadius: '16px', border: '1px solid var(--color-outline-variant)',
          overflow: 'hidden', display: 'flex', flexWrap: 'wrap', boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        }}>
          {/* Left */}
          <div style={{ flex: '1 1 360px', padding: '80px 48px', background: 'var(--color-primary)', color: 'var(--color-on-primary)' }}>
            <h2 className="font-headline-lg" style={{ marginBottom: '24px' }}>Partner with Parisatva</h2>
            <p className="font-body-md" style={{ color: 'var(--color-on-primary-container)', marginBottom: '48px' }}>
              We collaborate with research institutions and innovative wellness brands to bring precision fermentation to the global market.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span className="material-symbols-outlined">mail</span>
                <span className="font-body-md">vidyapradeep@parisatva.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                <span className="material-symbols-outlined">location_on</span>
                <span className="font-body-md">Biotech Innovation Hub, Zurich, Switzerland</span>
              </div>
            </div>
          </div>

          {/* Right */}
          <div style={{ flex: '1 1 360px', padding: '80px 48px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  { label: 'Full Name', name: 'name', type: 'text' },
                  { label: 'Organization', name: 'org', type: 'text' },
                ].map(f => (
                  <div key={f.name} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label className="font-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>{f.label}</label>
                    <input name={f.name} type={f.type} value={form[f.name]} onChange={handleChange}
                      style={{ border: '1px solid var(--color-outline-variant)', borderRadius: '8px', padding: '24px', fontFamily: 'Manrope', fontSize: '16px', outline: 'none' }} />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="font-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>Email Address</label>
                <input name="email" type="email" value={form.email} onChange={handleChange}
                  style={{ border: '1px solid var(--color-outline-variant)', borderRadius: '8px', padding: '24px', fontFamily: 'Manrope', fontSize: '16px', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="font-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>Inquiry Type</label>
                <select name="type" value={form.type} onChange={handleChange}
                  style={{ border: '1px solid var(--color-outline-variant)', borderRadius: '8px', padding: '24px', fontFamily: 'Manrope', fontSize: '16px', outline: 'none' }}>
                  <option>Research Partnership</option>
                  <option>Supply Inquiry</option>
                  <option>Media/Press</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label className="font-label-md" style={{ color: 'var(--color-on-surface-variant)' }}>Message</label>
                <textarea name="message" rows={4} value={form.message} onChange={handleChange}
                  style={{ border: '1px solid var(--color-outline-variant)', borderRadius: '8px', padding: '24px', fontFamily: 'Manrope', fontSize: '16px', outline: 'none', resize: 'vertical' }} />
              </div>
              <button className="btn-modern" style={{
                width: '100%', padding: '24px 0', background: 'var(--color-primary)',
                color: 'var(--color-on-primary)', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontFamily: 'Manrope', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em',
                boxShadow: '0 8px 25px -8px rgba(8,52,45,0.4)',
              }}>
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Footer ────────────────────────────────────────────────────────────
export function Footer() {
  const navLinks = ['The Science', 'Who We Serve', 'Ingredients', 'Proof Points'];
  const legalLinks = ['Privacy Policy', 'Terms of Service', 'Quality & Compliance', 'FSSAI Dossiers'];

  return (
    <footer style={{ background: 'var(--color-surface-container-low)', padding: '80px 24px 0', borderTop: '1px solid var(--color-outline-variant)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
        <div>
          <div className="font-headline-md" style={{ fontWeight: 700, color: 'var(--color-on-surface)', marginBottom: '24px' }}>Parisatva</div>
          <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', lineHeight: 1.6 }}>
            An ingredient science company. Fermentation-derived bioactives that anchor efficacy, consistency, and regulatory confidence.
          </p>
        </div>
        <div>
          <h4 className="font-label-md" style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Navigation</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {navLinks.map(l => (
              <li key={l}><a href="#" className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-label-md" style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Legal</h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {legalLinks.map(l => (
              <li key={l}><a href="#" className="font-body-md" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="font-label-md" style={{ color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '24px' }}>Get in Touch</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <a href="mailto:partnerships@parisatva.com" style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-primary)', flexShrink: 0 }}>mail</span>
              <span className="font-body-md">partnerships@parisatva.com</span>
            </a>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', color: 'var(--color-on-surface-variant)' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: 'var(--color-primary)', flexShrink: 0 }}>location_on</span>
              <span className="font-body-md" style={{ lineHeight: 1.5 }}>63/64, Balaji Nagar, Mylasandra, off Mysore Road, Bangalore – 560068</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{
        maxWidth: '1280px', margin: '80px auto 0', paddingTop: '48px', paddingBottom: '48px',
        borderTop: '1px solid rgba(192,200,197,0.3)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px',
      }}>
        <p className="font-caption" style={{ color: 'var(--color-on-surface-variant)' }}>
          © 2026 Parisatva Biotech. All rights reserved. Scientific Disclaimer: Information provided is for research purposes only.
        </p>
        <div style={{ display: 'flex', gap: '48px' }}>
          <a href="#" className="font-caption" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>Cookie Policy</a>
          <a href="#" className="font-caption" style={{ color: 'var(--color-on-surface-variant)', textDecoration: 'none' }}>Data Protection</a>
        </div>
      </div>
    </footer>
  );
}
