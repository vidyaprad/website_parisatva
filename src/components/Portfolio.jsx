import React from 'react';

const ingredients = [
  {
    icon: 'grain',
    title: 'Fermented Microbial Extracts',
    desc: 'Concentrated bioactive fractions from controlled fermentation, standardised for potency and ready to formulate.',
  },
  {
    icon: 'eco',
    title: 'Postbiotics',
    desc: 'Stable, non-viable metabolites with defined mechanisms — engineered to survive processing and shelf life.',
  },
  {
    icon: 'pill',
    title: 'Precision Probiotics',
    desc: 'Validated bacterial strains with characterised identity, viability, and compatibility profiles.',
  },
  {
    icon: 'spa',
    title: 'Novel Fungal Bioactives',
    desc: 'Pharmaceutical-grade actives from safe medicinal fungi, each with documented applications.',
  },
];

function IngredientCard({ icon, title, desc }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      className="lift-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'var(--color-surface-container-lowest)',
        border: `1px solid ${hovered ? 'var(--color-secondary)' : 'var(--color-outline-variant)'}`,
        borderRadius: '16px', padding: '36px', cursor: 'default',
      }}
    >
      <div style={{
        width: '52px', height: '52px', borderRadius: '12px',
        background: hovered ? 'var(--color-secondary)' : 'var(--color-secondary-container)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px',
        transition: 'background 0.35s var(--ease-out-expo), transform 0.45s var(--ease-out-back)',
        transform: hovered ? 'scale(1.08) rotate(-6deg)' : 'none',
      }}>
        <span className="material-symbols-outlined" style={{ color: hovered ? 'var(--color-on-secondary)' : 'var(--color-secondary)', transition: 'color 0.35s' }}>{icon}</span>
      </div>
      <h3 className="font-headline-md" style={{ color: 'var(--color-on-surface)', fontSize: '20px', marginBottom: '8px' }}>{title}</h3>
      <p className="font-body-md" style={{ color: 'var(--color-on-surface-variant)' }}>{desc}</p>
    </div>
  );
}

export default function Portfolio() {
  return (
    <section id="ingredients" style={{ padding: '120px 0', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '24px', marginBottom: '64px' }}>
          <div style={{ maxWidth: '620px' }}>
            <span className="font-label-md" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              Ingredient Portfolio
            </span>
            <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '16px' }}>
              Four classes of bioactives, one standard of proof
            </h2>
            <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
              Each ingredient ships with defined mechanisms, applications, and a full Certificate of Analysis.
            </p>
          </div>
          <button className="btn-modern" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'var(--color-primary)', color: 'var(--color-on-primary)',
            padding: '16px 32px', borderRadius: '8px', border: 'none', cursor: 'pointer',
            fontFamily: 'Manrope, sans-serif', fontSize: '14px', fontWeight: 600, letterSpacing: '0.02em',
            boxShadow: '0 8px 25px -8px rgba(8,52,45,0.4)',
          }}>
            Request a Spec Sheet
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>description</span>
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {ingredients.map(item => <IngredientCard key={item.title} {...item} />)}
        </div>
      </div>
    </section>
  );
}
