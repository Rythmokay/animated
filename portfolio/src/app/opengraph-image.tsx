import { ImageResponse } from 'next/og';
import { profileData } from '@/data/portfolioData';

export const alt = `${profileData.name} — ${profileData.title}`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #090d16 0%, #0f172a 50%, #1e1b4b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Glow Accent Circles */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
          }}
        />

        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#10b981',
                boxShadow: '0 0 12px #10b981',
              }}
            />
            <span style={{ fontSize: '20px', color: '#94a3b8', fontWeight: 600 }}>
              {profileData.status}
            </span>
          </div>
          <span
            style={{
              fontSize: '18px',
              backgroundColor: 'rgba(99, 102, 241, 0.2)',
              border: '1px solid rgba(129, 140, 248, 0.4)',
              color: '#a5b4fc',
              padding: '8px 20px',
              borderRadius: '30px',
              fontWeight: 600,
            }}
          >
            SEO & Web Performance Optimized
          </span>
        </div>

        {/* Center Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 800,
              margin: 0,
              background: 'linear-gradient(to right, #ffffff, #cbd5e1, #a5b4fc)',
              backgroundClip: 'text',
              color: 'transparent',
              letterSpacing: '-0.02em',
            }}
          >
            {profileData.name}
          </h1>
          <p
            style={{
              fontSize: '28px',
              color: '#38bdf8',
              fontWeight: 600,
              margin: 0,
            }}
          >
            {profileData.title}
          </p>
          <p
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              margin: 0,
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {profileData.bio}
          </p>
        </div>

        {/* Bottom Footer Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(148, 163, 184, 0.2)',
            paddingTop: '24px',
          }}
        >
          <div style={{ display: 'flex', gap: '32px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>EXPERIENCE</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc' }}>
                {profileData.yearsExperience}+ Years
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>PROJECTS</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc' }}>
                {profileData.completedProjects}+ Shipped
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '14px', color: '#64748b' }}>LOCATION</span>
              <span style={{ fontSize: '22px', fontWeight: 700, color: '#f8fafc' }}>
                San Francisco, CA
              </span>
            </div>
          </div>

          <span style={{ fontSize: '20px', color: '#6366f1', fontWeight: 700 }}>
            alexrivera.dev
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
