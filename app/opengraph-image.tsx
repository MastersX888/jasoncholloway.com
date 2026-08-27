import { ImageResponse } from 'next/og';

export const alt = 'Jason Carroll Holloway | Masters X Trilogy';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const dynamic = "force-static";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '4rem',
        }}
      >
        <div style={{ fontSize: '42px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a6d3b', marginBottom: '2rem' }}>
          Official Digital Platform
        </div>
        <div style={{ fontSize: '96px', fontWeight: 'bold', color: '#f5f0e8', lineHeight: 1.1, marginBottom: '1.5rem', textAlign: 'center' }}>
          Jason Carroll Holloway
        </div>
        <div style={{ fontSize: '48px', color: '#a0a0a0', marginBottom: '3rem', fontStyle: 'italic', textAlign: 'center' }}>
          Masters X Trilogy — A Conspiracy That Becomes a Meditation on Listening
        </div>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '2rem' }}>
          <div style={{ color: '#06b6d4', fontSize: '28px', border: '1px solid #06b6d4', padding: '1rem 2rem', borderRadius: '4px' }}>
            Explore the Catalog
          </div>
          <div style={{ color: '#8a6d3b', fontSize: '28px', border: '1px solid #8a6d3b', padding: '1rem 2rem', borderRadius: '4px' }}>
            Read the Field Notes
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
