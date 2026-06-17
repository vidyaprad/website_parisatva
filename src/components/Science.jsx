import React from 'react';

const pillars = [
  {
    icon: 'biotech',
    title: 'Precision Fermentation',
    desc: 'Leveraging microorganisms to biomanufacture high-value functional compounds and bio-ingredients.',
  },
  {
    icon: 'nutrition',
    title: 'Complete Digestibility',
    desc: 'Enzymatic hydrolysis eliminates the digestive bottleneck that limits efficacy in conventional ingredients.',
  },
  {
    icon: 'bubble_chart',
    title: 'Rich Bioactive Profile',
    desc: 'Beta-glucans, postbiotics, enzymes, and vitamins — delivered in one standardised ingredient.',
  },
  {
    icon: 'verified_user',
    title: 'Regulatory Confidence',
    desc: 'GRAS organisms, GMP manufacturing, full CoA, and complete regulatory dossiers — as standard.',
  },
];

export default function Science() {
  return (
    <section id="science" style={{ padding: '120px 0', background: 'var(--color-surface-container-low)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.24em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            The Science Behind Parisatva
          </span>
          <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            The science in <span className="text-gradient">every ingredient</span>
          </h2>
        </div>

        <div className="sci-grid">
          {pillars.map((p) => (
            <div key={p.title} className="sci-card">
              <div className="sci-icon">
                <span className="material-symbols-outlined">{p.icon}</span>
              </div>
              <h3 className="font-headline-md" style={{ fontSize: '20px', color: 'var(--color-on-surface)', marginBottom: '10px' }}>
                {p.title}
              </h3>
              <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .sci-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .sci-card {
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 16px;
          padding: 36px 32px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s var(--ease-out-expo);
        }
        .sci-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 18px 40px -22px rgba(8,52,45,0.28);
          transform: translateY(-4px);
        }
        .sci-icon {
          width: 52px; height: 52px; border-radius: 13px;
          background: var(--color-primary-fixed);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          transition: background 0.3s var(--ease-out-expo), transform 0.45s var(--ease-out-back);
        }
        .sci-icon .material-symbols-outlined { color: var(--color-primary); font-size: 28px; transition: color 0.3s ease; }
        .sci-card:hover .sci-icon { background: var(--color-primary); transform: rotate(-6deg) scale(1.08); }
        .sci-card:hover .sci-icon .material-symbols-outlined { color: var(--color-on-primary); }

        @media (max-width: 900px) { .sci-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .sci-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
