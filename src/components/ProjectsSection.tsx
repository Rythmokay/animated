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
    <section id="projects" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80 mb-3 block">
            Selected Works
          </span>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-normal text-neutral-100 mb-6">
            Featured <span className="italic text-amber-200">Projects</span>
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || idx}
              className={`glass-card p-7 rounded-3xl border border-neutral-800/80 flex flex-col justify-between group ${
                proj.featured ? 'sm:col-span-2 border-amber-500/20' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-cinzel text-xs font-semibold uppercase tracking-widest text-amber-300">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-amber-400/10 border border-amber-400/30 text-amber-200">
                      ★ Featured
                    </span>
                  )}
                </div>

                <h3 className="font-calligraphy text-2xl sm:text-3xl font-normal text-neutral-100 mb-3 group-hover:text-amber-200 transition-colors">
                  {proj.title}
                </h3>

                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed mb-5 font-normal">
                  {proj.description}
                </p>
              </div>

              <div>
                {/* Tech Stack Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-neutral-900/90 border border-neutral-800 text-neutral-400"
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
                    className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-300 hover:text-amber-100 transition-colors"
                  >
                    <span>View Project</span>
                    <span className="text-sm">↗</span>
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
