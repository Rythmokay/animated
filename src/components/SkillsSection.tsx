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
          maxWidth: '460px',
          width: '100%',
          marginLeft: 'clamp(16px, 4vw, 60px)',
          textAlign: 'left',
        }}
      >
        {/* Section Header */}
        <div style={{ marginBottom: '36px' }}>
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
            TECHNICAL MASTERY
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
            Skillset & <span style={{ fontStyle: 'normal', color: '#000000' }}>Capabilities</span>
          </h2>
          <div
            style={{
              width: '64px',
              height: '2px',
              background: '#000000',
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
                  padding: '7px 18px',
                  borderRadius: '30px',
                  fontSize: '11px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  background: selectedCategory === cat ? '#ffffff' : 'rgba(18, 18, 22, 0.9)',
                  color: selectedCategory === cat ? '#000000' : '#e2e8f0',
                  border: '1px solid ' + (selectedCategory === cat ? '#ffffff' : 'rgba(255, 255, 255, 0.2)'),
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: selectedCategory === cat ? '0 4px 15px rgba(255, 255, 255, 0.35)' : 'none',
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
                    fontSize: '20px',
                    fontWeight: 600,
                    color: '#ffffff',
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-cinzel), serif',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  {skill.level}%
                </span>
              </div>

              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: '#94a3b8',
                  marginBottom: '12px',
                }}
              >
                {skill.category}
              </div>

              {/* Progress Bar */}
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  background: '#0a0a0d',
                  borderRadius: '10px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${skill.level}%`,
                    background: 'linear-gradient(90deg, #ffffff, #a1a1aa)',
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
