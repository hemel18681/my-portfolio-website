import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0f1115',
          color: 'white',
          fontFamily: 'sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: '20%',
            left: '30%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(204,255,0,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div style={{ fontSize: '64px', marginBottom: '24px', color: '#CCFF00' }}>
          {'</>'}
        </div>

        <div
          style={{
            fontSize: '56px',
            fontWeight: 800,
            letterSpacing: '-2px',
            marginBottom: '8px',
            textAlign: 'center',
            lineHeight: 1.1,
          }}
        >
          Asif Uddin Ahmed Hemel
        </div>

        <div
          style={{
            fontSize: '24px',
            color: '#CCFF00',
            fontWeight: 600,
            marginBottom: '16px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
          }}
        >
          Senior Software Engineer
        </div>

        <div
          style={{
            fontSize: '16px',
            color: '#a1a1aa',
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <span>React</span>
          <span style={{ color: '#CCFF00' }}>•</span>
          <span>Angular</span>
          <span style={{ color: '#CCFF00' }}>•</span>
          <span>Next.js</span>
          <span style={{ color: '#CCFF00' }}>•</span>
          <span>.NET</span>
          <span style={{ color: '#CCFF00' }}>•</span>
          <span>AWS</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            right: '0',
            height: '4px',
            background: '#CCFF00',
          }}
        />
      </div>
    ),
    { ...size }
  )
}
