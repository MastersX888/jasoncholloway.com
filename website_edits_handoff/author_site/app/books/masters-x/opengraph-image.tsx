import { ImageResponse } from 'next/og';
import { books } from '@/lib/data/books';
import fs from 'fs';
import path from 'path';

export const alt = 'Masters X Trilogy by Jason Carroll Holloway';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';
export const dynamic = "force-static";

export default async function Image() {
  const trilogyBooks = books.filter((b) => b.series === "Masters X" && b.slug !== "omnibus");

  // Load all 3 covers
  const coverDataUrls = trilogyBooks.map(book => {
    try {
      const coverPath = path.join(process.cwd(), 'public', book.coverImagePB);
      const coverBuffer = fs.readFileSync(coverPath);
      return `data:image/png;base64,${coverBuffer.toString('base64')}`;
    } catch (e) {
      return '';
    }
  });

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
        <div style={{ fontSize: '32px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#8a6d3b', marginBottom: '1.5rem' }}>
          Jason Carroll Holloway
        </div>
        <div style={{ fontSize: '76px', fontWeight: 'bold', color: '#f5f0e8', lineHeight: 1.1, marginBottom: '0.5rem', textAlign: 'center' }}>
          The Masters X Trilogy
        </div>
        <div style={{ fontSize: '32px', color: '#a0a0a0', marginBottom: '4rem', fontStyle: 'italic', textAlign: 'center' }}>
          A Kansas City Conspiracy of Frequency & Medieval Manuscripts
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          {coverDataUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              style={{
                width: 'auto',
                height: '320px',
                objectFit: 'contain',
                borderRadius: '8px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.8)',
                border: '1px solid #222'
              }}
            />
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
