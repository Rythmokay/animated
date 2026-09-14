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
            Selected Works
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
            Featured <span style={{ fontStyle: 'italic', color: '#dfc285' }}>Projects</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '1px',
              background: 'linear-gradient(90deg, #dfc285, transparent)',
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
                padding: '28px',
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
                      fontSize: '10px',
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#dfc285',
                    }}
                  >
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span
                      style={{
                        padding: '3px 10px',
                        borderRadius: '20px',
                        fontSize: '9px',
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.15em',
                        background: 'rgba(223, 194, 133, 0.15)',
                        border: '1px solid rgba(223, 194, 133, 0.4)',
                        color: '#dfc285',
                      }}
                    >
                      ★ Featured
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '26px',
                    fontWeight: 400,
                    color: '#ffffff',
                    marginBottom: '12px',
                  }}
                >
                  {proj.title}
                </h3>

                <p
                  style={{
                    fontSize: '13px',
                    color: '#a1a1aa',
                    lineHeight: 1.6,
                    marginBottom: '20px',
                  }}
                >
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '10px',
                        fontWeight: 500,
                        background: '#111113',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: '#a1a1aa',
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
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: '#dfc285',
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
