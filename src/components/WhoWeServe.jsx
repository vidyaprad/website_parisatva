import React from 'react';

const segments = [
  {
    icon: 'factory',
    tag: 'Contract & branded producers',
    title: 'Nutraceutical Manufacturers',
    desc: 'Mid-to-large producers who need consistent, high-potency bioactives with full documentation to anchor efficacy claims and pass retailer audits.',
  },
  {
    icon: 'local_drink',
    tag: 'Innovation-led FMCG brands',
    title: 'Functional Food & Beverage',
    desc: 'Brands seeking clean-label, fermentation-derived actives that carry a credible science story and survive real processing conditions.',
  },
  {
    icon: 'science',
    tag: 'In-house brand scientists',
    title: 'R&D & Formulation Teams',
    desc: 'Teams that want technical depth — characterisation data, mechanism of action, compatibility profiles — to formulate with confidence and speed.',
  },
  {
    icon: 'health_and_safety',
    tag: 'Evidence-based supplement brands',
    title: 'Pharma-Adjacent Wellness',
    desc: 'Companies requiring ingredients that survive regulatory scrutiny across markets and support clinically positioned product claims.',
  },
];

export default function WhoWeServe() {
  return (
    <section id="who-we-serve" style={{ padding: '120px 0', background: 'var(--color-surface-container-low)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 64px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.24em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            Who We Serve
          </span>
          <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '16px' }}>
            Built for the teams that <span className="text-gradient">build products</span>
          </h2>
          <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
            From contract manufacturers to in-house formulation scientists — our ingredients slot into your workflow, with the documentation to back every claim.
          </p>
        </div>

        <div className="wws-grid">
          {segments.map((s, i) => (
            <div key={s.title} className="wws-col">
              <div className="wws-top">
                <div className="wws-icon">
                  <span className="material-symbols-outlined">{s.icon}</span>
                </div>
                <span className="wws-num">0{i + 1}</span>
              </div>
              <span className="wws-tag">{s.tag}</span>
              <h3 className="wws-title">{s.title}</h3>
              <p className="wws-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .wws-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

        .wws-col {
          position: relative; overflow: hidden;
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 20px; padding: 36px 32px;
          display: flex; flex-direction: column;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s var(--ease-out-expo);
        }
        .wws-col::before {
          content: ''; position: absolute; top: 0; left: 0; height: 4px; width: 56px;
          background: linear-gradient(90deg, var(--color-primary), transparent);
          transition: width 0.5s var(--ease-out-expo);
        }
        .wws-col:hover {
          border-color: var(--color-primary);
          box-shadow: 0 22px 48px -26px rgba(8,52,45,0.3);
          transform: translateY(-6px);
        }
        .wws-col:hover::before { width: 100%; }

        .wws-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 26px; }
        .wws-icon {
          width: 54px; height: 54px; border-radius: 14px;
          background: var(--color-primary-fixed);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.35s var(--ease-out-expo), transform 0.45s var(--ease-out-back);
        }
        .wws-icon .material-symbols-outlined { color: var(--color-primary); font-size: 28px; transition: color 0.35s ease; }
        .wws-col:hover .wws-icon { background: var(--color-primary); transform: rotate(-6deg) scale(1.08); }
        .wws-col:hover .wws-icon .material-symbols-outlined { color: var(--color-on-primary); }

        .wws-num {
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 30px;
          color: var(--color-outline-variant); transition: color 0.35s ease;
        }
        .wws-col:hover .wws-num { color: var(--color-tertiary); }

        .wws-tag {
          display: block; margin-bottom: 8px;
          font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 11.5px;
          letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-tertiary);
        }
        .wws-title {
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 22px;
          line-height: 1.22; letter-spacing: -0.01em; color: var(--color-on-surface); margin-bottom: 12px;
        }
        .wws-desc {
          font-family: 'Manrope', sans-serif; font-size: 15px; line-height: 1.6;
          color: var(--color-on-surface-variant); margin-top: auto;
        }

        @media (max-width: 1000px) { .wws-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px) { .wws-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
