'use client';

interface AboutData {
  name: string;
  title: string;
  tagline: string;
  quote: string;
  quoteAuthor: string;
  bio: string;
  education?: {
    institution: string;
    degree: string;
    period: string;
    cgpa: string;
  };
  stats: Array<{ label: string; value: string }>;
}

export default function AboutSection({ data }: { data: AboutData }) {
  if (!data) return null;

  return (
    <section
      id="about"
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
        <div style={{ marginBottom: '32px' }}>
          <span
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              fontSize: '12px',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              color: '#000000',
              marginBottom: '10px',
              display: 'block',
            }}
          >
            ABOUT & EDUCATION
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(36px, 5vw, 50px)',
              fontWeight: 700,
              color: '#000000',
              marginBottom: '16px',
            }}
          >
            Engineering <span style={{ fontStyle: 'normal', color: '#000000' }}>Precision</span>
          </h2>
          <div
            style={{
              width: '60px',
              height: '2px',
              background: '#000000',
            }}
          />
        </div>

        {/* High-Contrast Glass Card */}
        <div
          className="glass-card"
          style={{
            padding: '32px 28px',
            borderRadius: '20px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(20px, 2.4vw, 25px)',
              color: '#ffffff',
              lineHeight: 1.4,
              marginBottom: '20px',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            "{data.tagline}"
          </p>
          <p
            style={{
              fontSize: '13px',
              color: '#f4f4f5',
              lineHeight: 1.65,
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            {data.bio}
          </p>

          {/* Education Highlight Block */}
          {data.education && (
            <div
              style={{
                marginBottom: '24px',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(18, 18, 22, 0.9)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
              }}
            >
              <div style={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#ffffff', marginBottom: '4px' }}>
                EDUCATION ({data.education.period})
              </div>
              <div style={{ fontFamily: 'var(--font-cormorant), Georgia, serif', fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '2px' }}>
                {data.education.institution}
              </div>
              <div style={{ fontSize: '12px', color: '#e2e8f0' }}>
                {data.education.degree} — <span style={{ color: '#ffffff', fontWeight: 600 }}>CGPA: {data.education.cgpa}</span>
              </div>
            </div>
          )}

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '16px',
              paddingTop: '20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.14)',
            }}
          >
            {data.stats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontSize: '22px',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '2px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: '#e2e8f0',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
