import React from 'react';

const steps = [
  { icon: 'compost', label: 'Substrate Preparation', desc: 'Sourcing and conditioning the growth medium.' },
  { icon: 'spa', label: 'Fungal Fermentation', desc: 'Cultivating safe medicinal fungi under control.' },
  { icon: 'biotech', label: 'Co-Fermentation', desc: 'Pairing strains to amplify bioactive yield.' },
  { icon: 'hub', label: 'Bioactive Integration', desc: 'Concentrating and combining active fractions.' },
  { icon: 'air', label: 'Drying', desc: 'Gentle stabilisation that preserves potency.' },
  { icon: 'inventory_2', label: 'Finished Ingredient', desc: 'Standardised, formulation-ready material.' },
  { icon: 'verified', label: 'Quality Control', desc: 'Full CoA: identity, potency, and purity.' },
];

export default function Technology() {
  return (
    <section id="technology" style={{ padding: '120px 0', background: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
      <div className="aurora" style={{ width: '460px', height: '460px', background: 'var(--color-primary-fixed)', top: '-180px', right: '10%', opacity: 0.2 }} />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 80px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.24em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            How We Make It
          </span>
          <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Process <span className="text-gradient">Architecture</span>
          </h2>
        </div>

        <div className="pa-proc">
          <div className="pa-line" />
          <div className="pa-track">
            {steps.map((s) => (
              <div className="pa-node" key={s.label}>
                <div className="pa-dotwrap">
                  <div className="pa-dot">
                    <span className="material-symbols-outlined">{s.icon}</span>
                  </div>
                </div>
                <div className="pa-text">
                  <h4 className="font-label-md pa-label">{s.label}</h4>
                  <p className="font-caption pa-desc">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .pa-proc { position: relative; }
        .pa-track { position: relative; z-index: 1; }

        .pa-dotwrap { position: relative; flex-shrink: 0; }
        .pa-dot {
          width: 76px; height: 76px; border-radius: 9999px;
          background: #fff; border: 2px solid var(--color-primary);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 14px -4px rgba(8,52,45,0.18);
          transition: background 0.35s var(--ease-out-expo), transform 0.45s var(--ease-out-back), box-shadow 0.35s ease, border-color 0.35s ease;
        }
        .pa-dot .material-symbols-outlined {
          font-size: 32px; color: var(--color-primary); transition: color 0.35s ease;
        }
        .pa-label { color: var(--color-on-surface); line-height: 1.25; }
        .pa-desc  { color: var(--color-on-surface-variant); }

        /* Hover */
        .pa-node:hover .pa-dot {
          background: var(--color-primary);
          transform: translateY(-6px) scale(1.06);
          box-shadow: 0 18px 34px -8px rgba(8,52,45,0.45);
        }
        .pa-node:hover .pa-dot .material-symbols-outlined { color: var(--color-on-primary); }

        /* ── Horizontal timeline (desktop) ── */
        @media (min-width: 1080px) {
          .pa-track {
            display: grid; grid-template-columns: repeat(7, 1fr); align-items: start;
          }
          .pa-node { text-align: center; cursor: default; padding: 0 6px; }
          .pa-dotwrap { width: 76px; margin: 0 auto 22px; }
          .pa-label { margin-bottom: 6px; }
          .pa-line {
            position: absolute; top: 38px; left: 7.14%; right: 7.14%; height: 2px; z-index: 0;
            background: linear-gradient(90deg, transparent, var(--color-primary), var(--color-tertiary-container), var(--color-primary), transparent);
            background-size: 200% 100%; animation: gradient-pan 5s linear infinite; opacity: 0.55;
          }
        }

        /* ── Vertical timeline (tablet / mobile) ── */
        @media (max-width: 1079px) {
          .pa-track {
            display: flex; flex-direction: column; gap: 36px; max-width: 520px;
          }
          .pa-node { display: flex; gap: 24px; align-items: flex-start; }
          .pa-dotwrap { width: 76px; }
          .pa-text { padding-top: 14px; }
          .pa-label { margin-bottom: 6px; }
          .pa-line {
            position: absolute; left: 37px; top: 30px; bottom: 30px; width: 2px; z-index: 0;
            background: linear-gradient(180deg, transparent, var(--color-primary), var(--color-tertiary-container), var(--color-primary), transparent);
            background-size: 100% 200%; animation: gradient-pan-y 5s linear infinite; opacity: 0.55;
          }
        }

        @keyframes gradient-pan-y {
          0% { background-position: 50% 0%; }
          100% { background-position: 50% 200%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .pa-line { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
