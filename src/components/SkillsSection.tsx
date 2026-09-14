'use client';

import { useState } from 'react';

interface SkillItem {
  id: string;
  name: string;
  category: string;
  level: number;
}

export default function SkillsSection({ skills }: { skills: SkillItem[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  if (!skills || skills.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category)))];

  const filteredSkills = selectedCategory === 'All'
    ? skills
    : skills.filter(s => s.category === selectedCategory);

  return (
    <section
      id="skills"
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
        <div style={{ marginBottom: '36px' }}>
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
            Technical Mastery
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
            Skillset & <span style={{ fontStyle: 'italic', color: '#dfc285' }}>Capabilities</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '1px',
              background: 'linear-gradient(90deg, #dfc285, transparent)',
              marginBottom: '24px',
            }}
          />

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '6px 16px',
                  borderRadius: '30px',
                  fontSize: '10px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  background: selectedCategory === cat ? '#dfc285' : 'rgba(20, 20, 24, 0.8)',
                  color: selectedCategory === cat ? '#050505' : '#a1a1aa',
                  border: '1px solid ' + (selectedCategory === cat ? '#dfc285' : 'rgba(255, 255, 255, 0.1)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Skillset Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
          {filteredSkills.map((skill, idx) => (
            <div
              key={skill.id || idx}
              className="glass-card"
              style={{
                padding: '20px 24px',
                borderRadius: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-cormorant), Georgia, serif',
                    fontSize: '19px',
                    fontWeight: 500,
                    color: '#ffffff',
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#dfc285',
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#71717a',
                  marginBottom: '12px',
                }}
              >
                {skill.category}
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '5px',
                  background: '#111113',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${skill.level}%`,
                    background: 'linear-gradient(90deg, #dfc285, #f5e6be)',
                    borderRadius: '10px',
                    transition: 'width 1s ease-out',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
