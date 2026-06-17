import React from 'react';

const members = [
  {
    initials: 'VP',
    name: 'Vidya Pradeep Kumar',
    role: 'Scientist & Innovation Leader',
    field: 'Microbiology & Biotechnology',
    bio: 'Scientist and innovation leader with over two decades of expertise in microbiology and biotechnology. She brings specialized expertise in protein science, microbial flavors, protoplast fusion, fermentation technology, enzyme kinetics, protein engineering, immobilization strategies, and lignocellulosic degradation. Her work spans fermentation optimization and protein expression — delivering valuable insights into cellular responses and enabling effective bioprocess solutions.',
    tags: ['Fermentation Technology', 'Protein Engineering', 'Enzyme Kinetics'],
  },
  {
    initials: 'PK',
    name: 'Pradeep Kumar SK',
    role: 'Innovation Leader',
    field: 'Product & Technology',
    bio: 'Innovation leader with three decades of experience building solutions to solve customer problems across consumer electronics, semiconductors, infotainment, consumer and industrial IoT, and personal health. A proven track record of building the right solutions — on time, at optimal cost, and at premium quality — with result-oriented teams across geographies and cultures.',
    tags: ['Product Strategy', 'IoT & Hardware', 'Global Teams'],
  },
];

export default function Team() {
  return (
    <section id="team" style={{ padding: '120px 0', background: 'var(--color-surface)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 64px' }}>
          <span className="font-label-md" style={{ color: 'var(--color-tertiary)', letterSpacing: '0.24em', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>
            Leadership
          </span>
          <h2 className="font-headline-lg" style={{ color: 'var(--color-on-surface)', marginBottom: '16px' }}>
            Meet the <span className="text-gradient">team</span>
          </h2>
          <p className="font-body-lg" style={{ color: 'var(--color-on-surface-variant)' }}>
            Decades of science and product expertise behind every ingredient we make.
          </p>
        </div>

        <div className="team-grid">
          {members.map((m) => (
            <article key={m.name} className="team-card">
              <div className="team-head">
                <div className="team-avatar">{m.initials}</div>
                <div>
                  <h3 className="team-name">{m.name}</h3>
                  <span className="team-role">{m.role}</span>
                  <span className="team-field">{m.field}</span>
                </div>
              </div>

              <p className="team-bio">{m.bio}</p>

              <div className="team-tags">
                {m.tags.map((t) => (
                  <span key={t} className="team-tag">{t}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        .team-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }

        .team-card {
          position: relative; overflow: hidden;
          background: var(--color-surface-container-lowest);
          border: 1px solid var(--color-outline-variant);
          border-radius: 22px; padding: 40px;
          display: flex; flex-direction: column;
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s var(--ease-out-expo);
        }
        .team-card::before {
          content: ''; position: absolute; top: 0; left: 0; height: 4px; width: 64px;
          background: linear-gradient(90deg, var(--color-primary), transparent);
          transition: width 0.5s var(--ease-out-expo);
        }
        .team-card:hover {
          border-color: var(--color-primary);
          box-shadow: 0 22px 50px -26px rgba(8,52,45,0.3);
          transform: translateY(-4px);
        }
        .team-card:hover::before { width: 100%; }

        .team-head { display: flex; align-items: center; gap: 20px; margin-bottom: 28px; }
        .team-avatar {
          flex-shrink: 0; width: 68px; height: 68px; border-radius: 50%;
          background: linear-gradient(135deg, var(--color-primary), #2f7d6b);
          color: #fff; font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 800; font-size: 22px;
          letter-spacing: 0.02em;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 10px 24px -10px rgba(8,52,45,0.5);
        }
        .team-name {
          font-family: 'Plus Jakarta Sans', sans-serif; font-weight: 700; font-size: 22px;
          color: var(--color-on-surface); line-height: 1.2; margin-bottom: 6px;
        }
        .team-role {
          display: block; font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 14px;
          color: var(--color-primary);
        }
        .team-field {
          display: block; font-family: 'Manrope', sans-serif; font-size: 12px;
          letter-spacing: 0.1em; text-transform: uppercase; color: var(--color-on-surface-variant); margin-top: 2px;
        }

        .team-bio {
          font-family: 'Manrope', sans-serif; font-size: 15.5px; line-height: 1.7;
          color: var(--color-on-surface-variant); margin-bottom: 28px;
        }

        .team-tags { display: flex; flex-wrap: wrap; gap: 8px; margin-top: auto; }
        .team-tag {
          font-family: 'Manrope', sans-serif; font-weight: 600; font-size: 12px;
          padding: 6px 14px; border-radius: 9999px;
          background: var(--color-primary-fixed); color: var(--color-on-primary-fixed-variant);
        }

        @media (max-width: 860px) { .team-grid { grid-template-columns: 1fr; } }
      `}</style>
    </section>
  );
}
