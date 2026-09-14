'use client';

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  link: string;
  featured?: boolean;
}

export default function ProjectsSection({ projects }: { projects: ProjectItem[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      id="projects"
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
            SELECTED WORKS
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
            Featured <span style={{ fontStyle: 'normal', color: '#000000' }}>Projects</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '2px',
              background: '#000000',
            }}
          />
        </div>

        {/* Projects Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className="glass-card"
              style={{
                padding: '26px',
                borderRadius: '20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-cinzel), serif',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#ffffff',
                    }}
                  >
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span
                      style={{
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '9px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        background: 'rgba(255, 255, 255, 0.14)',
                        border: '1px solid rgba(255, 255, 255, 0.35)',
                        color: '#ffffff',
                      }}
                    >
                      ★ Featured
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '24px',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '12px',
                  }}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    fontSize: '13.5px',
                    color: '#f4f4f5',
                    lineHeight: 1.6,
                    marginBottom: '22px',
                    fontWeight: 400,
                  }}
                >
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '22px' }}>
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        padding: '5px 12px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: 600,
                        background: 'rgba(24, 24, 28, 0.9)',
                        border: '1px solid rgba(255, 255, 255, 0.16)',
                        color: '#e2e8f0',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* View Project Link */}
                {proj.link && proj.link !== '#' && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '11px',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#ffffff',
                      textDecoration: 'none',
                    }}
                  >
                    <span>View Project</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
