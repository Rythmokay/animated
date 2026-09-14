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
    <section id="experience" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80 mb-3 block">
            Career Timeline
          </span>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-normal text-neutral-100 mb-6">
            Professional <span className="italic text-amber-200">Experience</span>
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-neutral-800/80 ml-4 sm:ml-8 space-y-10">
          {experiences.map((exp, idx) => (
            <div key={exp.id || idx} className="relative pl-8 sm:pl-10 group">
              {/* Gold Timeline Dot */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 rounded-full bg-neutral-950 border-2 border-amber-400 group-hover:bg-amber-400 group-hover:scale-125 transition-all"></div>

              {/* Glass Card */}
              <div className="glass-card p-6 sm:p-8 rounded-2xl border border-neutral-800/80">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-calligraphy text-2xl font-normal text-neutral-100 mb-1">
                      {exp.role}
                    </h3>
                    <div className="font-cinzel text-xs font-semibold uppercase tracking-wider text-amber-300">
                      {exp.company}
                    </div>
                  </div>
                  <span className="inline-block px-3.5 py-1 rounded-full text-[11px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-400 self-start sm:self-auto">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed font-normal">
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
