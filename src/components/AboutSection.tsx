'use client';

interface AboutData {
  name: string;
  title: string;
  tagline: string;
  quote: string;
  quoteAuthor: string;
  bio: string;
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
            About & Philosophy
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
            Architecting <span style={{ fontStyle: 'italic', color: '#dfc285' }}>Excellence</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '1px',
              background: 'linear-gradient(90deg, #dfc285, transparent)',
            }}
          />
        </div>

        {/* Glass Card */}
        <div
          className="glass-card"
          style={{
            padding: '36px 32px',
            borderRadius: '24px',
            marginBottom: '32px',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-cormorant), Georgia, serif',
              fontSize: 'clamp(20px, 2.5vw, 26px)',
              color: '#f4f4f5',
              lineHeight: 1.5,
              marginBottom: '20px',
              fontStyle: 'italic',
            }}
          >
            "{data.tagline}"
          </p>
          <p
            style={{
              fontSize: '14px',
              color: '#a1a1aa',
              lineHeight: 1.7,
              fontWeight: 400,
              marginBottom: '32px',
            }}
          >
            {data.bio}
          </p>

          {/* Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '20px',
              paddingTop: '28px',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            {data.stats.map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'left' }}>
                <div
                  style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontSize: '26px',
                    fontWeight: 700,
                    color: '#dfc285',
                    marginBottom: '4px',
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#71717a',
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
