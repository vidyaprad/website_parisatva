import React from 'react';

// Colonies growing on the agar — fixed positions for a balanced composition
const colonies = [
  { x: 32, y: 30, s: 34, c: 'var(--color-primary)', d: 0.2, pulse: true },
  { x: 56, y: 24, s: 18, c: '#2f7d6b', d: 0.5 },
  { x: 69, y: 46, s: 26, c: 'var(--color-secondary)', d: 0.8, pulse: true },
  { x: 43, y: 52, s: 22, c: 'var(--color-primary)', d: 1.0 },
  { x: 26, y: 60, s: 15, c: '#2f7d6b', d: 1.3 },
  { x: 60, y: 66, s: 30, c: 'var(--color-primary)', d: 1.1, pulse: true },
  { x: 74, y: 63, s: 13, c: 'var(--color-secondary)', d: 1.5 },
  { x: 47, y: 36, s: 11, c: '#2f7d6b', d: 0.6 },
  { x: 37, y: 75, s: 17, c: 'var(--color-secondary)', d: 1.6 },
  { x: 63, y: 35, s: 12, c: 'var(--color-primary)', d: 0.7 },
];

function CulturePlate() {
  return (
    <div className="plate-floats">
      <div className="plate">
        <div className="plate-colonies">
          {colonies.map((co, i) => (
            <span
              key={i}
              className={`colony ${co.pulse ? 'colony-pulse' : ''}`}
              style={{
                left: `${co.x}%`, top: `${co.y}%`,
                width: `${co.s}px`, height: `${co.s}px`,
                '--cc': co.c, animationDelay: `${co.d}s`,
              }}
            />
          ))}
        </div>
        <div className="plate-sheen" />
      </div>

      <style>{`
        .plate-floats { width: 100%; max-width: 460px; margin: 0 auto; animation: float 7s ease-in-out infinite; }
        .plate {
          position: relative; width: 100%; aspect-ratio: 1; border-radius: 50%;
          background:
            radial-gradient(circle at 38% 32%, #e2f6ef 0%, var(--color-primary-fixed) 55%, #a9d6c8 100%);
          border: 12px solid rgba(255,255,255,0.55);
          box-shadow:
            inset 0 0 70px rgba(8,52,45,0.10),
            inset 0 6px 18px rgba(255,255,255,0.5),
            0 36px 70px -34px rgba(8,52,45,0.45);
          overflow: hidden;
        }
        /* Concentric agar guide rings */
        .plate::before, .plate::after {
          content: ''; position: absolute; border-radius: 50%; pointer-events: none;
          border: 1px dashed rgba(8,52,45,0.12);
        }
        .plate::before { inset: 10%; }
        .plate::after  { inset: 26%; border-style: solid; border-color: rgba(8,52,45,0.07); }

        .plate-colonies { position: absolute; inset: 0; animation: spin-slow 90s linear infinite; }

        .colony {
          position: absolute; border-radius: 50%; transform: translate(-50%, -50%) scale(0);
          background: radial-gradient(circle at 34% 32%, rgba(255,255,255,0.55), var(--cc) 70%);
          box-shadow: 0 1px 4px rgba(8,52,45,0.25);
          animation: colony-grow 1.1s var(--ease-out-back) forwards;
        }
        .colony::after {
          content: ''; position: absolute; inset: -6px; border-radius: 50%;
          border: 1px solid var(--cc); opacity: 0.25;
        }
        .colony-pulse::after { animation: colony-ping 3.4s ease-out infinite; }

        .plate-sheen {
          position: absolute; inset: 0; border-radius: 50%; pointer-events: none;
          background: linear-gradient(125deg, rgba(255,255,255,0.45) 0%, transparent 38%);
        }

        @keyframes colony-grow { to { transform: translate(-50%, -50%) scale(1); } }
        @keyframes colony-ping {
          0% { transform: scale(0.9); opacity: 0.5; }
          70%, 100% { transform: scale(1.8); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          .plate-floats, .plate-colonies, .colony, .colony-pulse::after { animation: none !important; }
          .colony { transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" style={{ padding: '80px 0', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '80px' }}>

          {/* Culture plate visual */}
          <div style={{ flex: '1 1 400px', position: 'relative' }}>
            <CulturePlate />
          </div>

          {/* Text side */}
          <div style={{ flex: '1 1 400px' }}>
            <span className="font-label-md" style={{
              color: 'var(--color-tertiary)', letterSpacing: '0.2em', textTransform: 'uppercase',
              display: 'block', marginBottom: '12px',
            }}>
              Who We Are
            </span>
            <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '24px' }}>
              An ingredient science company
            </h2>
            <p className="font-body-lg" style={{
              color: 'var(--color-on-surface-variant)', marginBottom: '24px', lineHeight: '1.6',
            }}>
              Through advanced fermentation of safe medicinal fungi and beneficial bacteria, we produce high-bioavailability bioactives that give formulators a verifiable edge — in efficacy, consistency, and regulatory confidence.
            </p>
            <p className="font-body-md" style={{
              color: 'var(--color-on-surface-variant)', marginBottom: '48px', lineHeight: '1.6',
            }}>
              We supply fermentation-derived bioactive ingredients — from precision-cultured fungi to validated bacterial strains — that let manufacturers, FMCG brands, pharma, and wellness companies build efficacious, differentiated, market-ready products with confidence.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>biotech</span>
                <div>
                  <h4 className="font-label-md" style={{ color: 'var(--color-on-surface)', marginBottom: '4px' }}>Biological Precision</h4>
                  <p className="font-caption" style={{ color: 'var(--color-on-surface-variant)' }}>Defined strains, defined mechanisms, defined yields.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)' }}>fact_check</span>
                <div>
                  <h4 className="font-label-md" style={{ color: 'var(--color-on-surface)', marginBottom: '4px' }}>Uncompromising Evidence</h4>
                  <p className="font-caption" style={{ color: 'var(--color-on-surface-variant)' }}>Every active backed by data, ready for audit.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
