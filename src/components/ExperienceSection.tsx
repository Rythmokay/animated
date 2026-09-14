'use client';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function ExperienceSection({ experiences }: { experiences: ExperienceItem[] }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section
      id="experience"
      style={{
        position: 'relative',
        zIndex: 10,
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '120px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '560px',
          width: '100%',
          marginLeft: 'clamp(24px, 6vw, 100px)',
          textAlign: 'left',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              color: '#dfc285',
              marginBottom: '12px',
              display: 'block',
            }}
          >
            Career Timeline
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 400,
              color: '#ffffff',
              marginBottom: '20px',
            }}
          >
            Professional <span style={{ fontStyle: 'italic', color: '#dfc285' }}>Experience</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '1px',
              background: 'linear-gradient(90deg, #dfc285, transparent)',
            }}
          />
        </div>

        {/* Timeline Container */}
        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255, 255, 255, 0.12)', marginLeft: '12px', paddingLeft: '28px' }}>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} style={{ position: 'relative', marginBottom: '32px' }}>
              {/* Gold Marker Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-37px',
                  top: '10px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#050505',
                  border: '2px solid #dfc285',
                  boxShadow: '0 0 12px rgba(223, 194, 133, 0.4)',
                }}
              />

              {/* Glass Card */}
              <div
                className="glass-card"
                style={{
                  padding: '28px',
                  borderRadius: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '24px',
                        fontWeight: 400,
                        color: '#ffffff',
                        marginBottom: '4px',
                      }}
                    >
                      {exp.role}
                    </h3>
                    <div
                      style={{
                        fontFamily: 'var(--font-cinzel), serif',
                        fontSize: '11px',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#dfc285',
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '10px',
                      fontWeight: 500,
                      background: '#111113',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      color: '#a1a1aa',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13px',
                    color: '#a1a1aa',
                    lineHeight: 1.6,
                  }}
                >
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
