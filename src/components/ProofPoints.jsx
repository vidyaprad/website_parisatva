import React from 'react';

const proofs = [
  {
    icon: 'verified_user',
    title: 'GRAS-Recognised Strains',
    desc: 'Organism strains with GRAS recognition, cultured under GMP-compliant conditions from end to end.',
    badge: 'GMP',
  },
  {
    icon: 'workspace_premium',
    title: 'Certified Manufacturing',
    desc: 'Third-party certified manufacturing throughout the process — not just at the final checkpoint.',
    badge: '3rd-Party',
  },
  {
    icon: 'biotech',
    title: 'Potency & Purity Testing',
    desc: 'Every batch ships with a full Certificate of Analysis covering potency, identity, and purity.',
    badge: 'Full CoA',
  },
  {
    icon: 'gavel',
    title: 'Regulatory Readiness',
    desc: 'Pre-prepared dossiers covering safety, identity, and manufacturing standards — aligned with FSSAI frameworks.',
    badge: 'FSSAI',
  },
];

export default function ProofPoints() {
  return (
    <section id="proof" style={{ padding: '120px 0', background: 'var(--color-primary)', color: 'var(--color-on-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: '480px', height: '480px', background: '#2f7d6b', top: '-160px', right: '-80px', opacity: 0.3 }} />
      <div className="aurora" style={{ width: '360px', height: '360px', background: 'var(--color-tertiary-container)', bottom: '-120px', left: '-60px', opacity: 0.15, animationDelay: '-8s' }} />

      <div style={{ position: 'relative', maxWidth: '1180px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ maxWidth: '680px', marginBottom: '64px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-primary-fixed-dim)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
            Proof, Not Promises
          </span>
          <h2 className="font-headline-lg" style={{ marginBottom: '16px' }}>
            Our ingredients don't just meet specifications. <span className="text-gradient">They anchor them.</span>
          </h2>
          <p className="font-body-lg" style={{ color: 'var(--color-on-primary-container)' }}>
            Every active we deliver is backed by fermentation science, biological precision, and uncompromising evidence — documented and ready for audit.
          </p>
        </div>

        <div className="pp-grid">
          {proofs.map((p) => (
            <div key={p.title} className="pp-card">
              <div className="pp-top">
                <div className="pp-icon">
                  <span className="material-symbols-outlined">{p.icon}</span>
                </div>
                <span className="pp-badge">{p.badge}</span>
              </div>
              <h3 className="pp-title">{p.title}</h3>
              <p className="pp-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .pp-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

        .pp-card {
          position: relative; overflow: hidden;
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(165,207,196,0.18);
          border-radius: 20px; padding: 36px;
          display: flex; flex-direction: column;
          transition: background 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s var(--ease-out-expo);
        }
        .pp-card::before {
          content: ''; position: absolute; top: 0; left: 0; height: 3px; width: 56px;
          background: linear-gradient(90deg, var(--color-primary-fixed), transparent);
          transition: width 0.5s var(--ease-out-expo);
        }
        .pp-card:hover {
          background: rgba(255,255,255,0.075);
          border-color: var(--color-primary-fixed-dim);
          box-shadow: 0 26px 54px -28px rgba(0,0,0,0.55);
          transform: translateY(-6px);
        }
        .pp-card:hover::before { width: 100%; }

        .pp-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 26px; }
        .pp-icon {
          width: 56px; height: 56px; border-radius: 14px;
          background: rgba(192,235,224,0.12);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.35s ease, transform 0.45s var(--ease-out-back);
        }
        .pp-icon .material-symbols-outlined { color: var(--color-primary-fixed); font-size: 28px; }
        .pp-card:hover .pp-icon { background: rgba(192,235,224,0.22); transform: rotate(-6deg) scale(1.08); }

        .pp-badge {
          font-family: 'Manrope', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.05em;
          padding: 5px 14px; border-radius: 9999px;
          background: var(--color-primary-fixed); color: var(--color-on-primary-fixed);
        }

        .pp-title {
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 22px;
          line-height: 1.25; color: var(--color-on-primary); margin-bottom: 12px;
        }
        .pp-desc {
          font-family: 'Manrope', sans-serif; font-size: 15.5px; line-height: 1.65;
          color: var(--color-on-primary-container); max-width: 460px;
        }

        @media (max-width: 820px) { .pp-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
