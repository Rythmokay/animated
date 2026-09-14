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
    <section id="about" className="relative z-10 min-h-screen flex items-center justify-center px-6 py-32">
      <div className="max-w-4xl mx-auto w-full">
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em] text-amber-300/80 mb-3 block">
            About & Philosophy
          </span>
          <h2 className="font-calligraphy text-4xl sm:text-5xl font-normal text-neutral-100 mb-6">
            Architecting <span className="italic text-amber-200">Excellence</span>
          </h2>
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
        </div>

        {/* Glass Card */}
        <div className="glass-card p-8 sm:p-12 rounded-3xl mb-10 border border-neutral-800/80">
          <p className="font-calligraphy text-2xl sm:text-3xl text-neutral-200 leading-relaxed mb-6 italic text-center">
            "{data.tagline}"
          </p>
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed font-normal text-center max-w-2xl mx-auto mb-10">
            {data.bio}
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-neutral-800/80">
            {data.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="font-cinzel text-2xl sm:text-3xl font-bold text-amber-200 mb-1">
                  {stat.value}
                </div>
                <div className="text-[11px] font-medium uppercase tracking-widest text-neutral-500">
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
