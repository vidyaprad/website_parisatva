import React from 'react';

const cards = [
  {
    num: '01',
    icon: 'visibility',
    label: 'Vision',
    headline: 'Redefining the standard of nutraceutical ingredients.',
    body: 'Where every active delivered to a formulator is backed by fermentation science, biological precision, and uncompromising evidence.',
    dark: false,
  },
  {
    num: '02',
    icon: 'flag',
    label: 'Mission',
    headline: 'Ingredients that reach the market with confidence.',
    body: 'We supply fermentation-derived bioactives — from precision-cultured fungi to validated bacterial strains — that enable manufacturers, F&B brands, pharma, and wellness companies to build efficacious, differentiated products.',
    dark: true,
  },
];

function Card({ num, icon, label, headline, body, dark }) {
  const [hovered, setHovered] = React.useState(false);
  const onSurface = dark ? 'var(--color-on-primary)' : 'var(--color-on-surface)';
  const onSurfaceVar = dark ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)';
  const accent = dark ? 'var(--color-primary-fixed)' : 'var(--color-primary)';

  return (
    <div
      className={`lift-card ${dark ? '' : 'gradient-border'}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'relative',
        borderRadius: '24px',
        padding: '44px 44px 40px',
        overflow: 'hidden',
        background: dark ? 'var(--color-primary)' : '#fff',
        color: onSurface,
        boxShadow: dark ? '0 30px 60px -24px rgba(8,52,45,0.45)' : '0 18px 44px -26px rgba(8,52,45,0.22)',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Decorative aurora inside dark card */}
      {dark && (
        <div className="aurora" style={{ width: '300px', height: '300px', background: '#2f7d6b', top: '-120px', right: '-80px', opacity: 0.4 }} />
      )}

      {/* Decorative spinning ring */}
      <div className="spin-slow" style={{
        position: 'absolute', bottom: '-100px', right: '-100px', width: '220px', height: '220px',
        borderRadius: '50%', border: `1.5px dashed ${dark ? 'rgba(192,235,224,0.22)' : 'rgba(8,52,45,0.08)'}`,
        pointerEvents: 'none',
      }} />

      {/* Header row: icon + label + index */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '28px' }}>
        <div style={{
          width: '48px', height: '48px', borderRadius: '13px', flexShrink: 0,
          background: dark ? 'rgba(192,235,224,0.14)' : 'var(--color-primary-fixed)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.5s var(--ease-out-back)',
          transform: hovered ? 'rotate(-8deg) scale(1.1)' : 'none',
        }}>
          <span className="material-symbols-outlined" style={{ color: accent, fontSize: '24px' }}>{icon}</span>
        </div>
        <span className="font-label-md" style={{
          letterSpacing: '0.24em', textTransform: 'uppercase',
          color: dark ? 'var(--color-primary-fixed-dim)' : 'var(--color-tertiary)',
        }}>{label}</span>
        <span style={{
          marginLeft: 'auto',
          fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700, fontSize: '15px',
          color: accent, opacity: 0.45,
        }}>{num}</span>
      </div>

      {/* Headline — the punchy line */}
      <h3 style={{
        position: 'relative',
        fontFamily: 'Plus Jakarta Sans, sans-serif', fontWeight: 700,
        fontSize: '21px', lineHeight: 1.3, letterSpacing: '-0.01em',
        color: onSurface, marginBottom: '14px',
      }}>
        {headline}
      </h3>

      {/* Supporting body */}
      <p style={{
        position: 'relative',
        fontFamily: 'Manrope, sans-serif', fontWeight: 400,
        fontSize: '15.5px', lineHeight: 1.7,
        color: onSurfaceVar,
      }}>
        {body}
      </p>

      {/* Animated underline accent — grows on hover */}
      <div style={{
        marginTop: '32px', position: 'relative',
        display: 'flex', alignItems: 'center', gap: '12px',
      }}>
        <span style={{
          height: '3px', borderRadius: '2px',
          width: hovered ? '64px' : '36px',
          background: `linear-gradient(90deg, ${accent}, transparent)`,
          transition: 'width 0.45s var(--ease-out-expo)',
        }} />
      </div>
    </div>
  );
}

export default function VisionMission() {
  return (
    <section style={{ padding: '120px 0', background: 'var(--color-surface)', position: 'relative', overflow: 'hidden' }}>
      {/* Soft backdrop wash */}
      <div className="aurora" style={{ width: '520px', height: '520px', background: 'var(--color-primary-fixed)', top: '-160px', left: '-120px', opacity: 0.3 }} />
      <div className="aurora" style={{ width: '420px', height: '420px', background: 'var(--color-tertiary-container)', bottom: '-180px', right: '-100px', opacity: 0.18, animationDelay: '-9s' }} />

      <div style={{ position: 'relative', maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section header */}
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 72px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.24em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            What Drives Us
          </span>
          <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)' }}>
            Our <span className="text-gradient">north star</span>, in two statements
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '32px' }}>
          {cards.map(c => <Card key={c.label} {...c} />)}
        </div>
      </div>
    </section>
  );
}
