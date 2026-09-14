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
          maxWidth: '460px',
          width: '100%',
          marginLeft: 'clamp(16px, 4vw, 60px)',
          textAlign: 'left',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '40px' }}>
          <span
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontSize: '13px',
              fontWeight: 700,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: '#000000',
              marginBottom: '8px',
              display: 'block',
            }}
          >
            CAREER TIMELINE
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(32px, 4.5vw, 46px)',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '20px',
            }}
          >
            Professional <span style={{ fontStyle: 'normal', color: '#000000' }}>Experience</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '2px',
              background: '#000000',
            }}
          />
        </div>

        {/* Timeline Container */}
        <div style={{ position: 'relative', borderLeft: '1px solid rgba(255, 255, 255, 0.16)', marginLeft: '12px', paddingLeft: '28px' }}>
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} style={{ position: 'relative', marginBottom: '32px' }}>
              {/* White Marker Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-37px',
                  top: '10px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: '#050505',
                  border: '2px solid #ffffff',
                  boxShadow: '0 0 12px rgba(255, 255, 255, 0.6)',
                }}
              />

              {/* Darker High-Contrast Glass Card */}
              <div
                className="glass-card"
                style={{
                  padding: '26px',
                  borderRadius: '20px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'var(--font-cormorant), Georgia, serif',
                        fontSize: '23px',
                        fontWeight: 600,
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
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        color: '#e2e8f0',
                      }}
                    >
                      {exp.company}
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '11px',
                      fontWeight: 600,
                      background: '#040407',
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                      color: '#ffffff',
                    }}
                  >
                    {exp.period}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#f4f4f5',
                    lineHeight: 1.6,
                    fontWeight: 400,
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
