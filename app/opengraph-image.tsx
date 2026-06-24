import { ImageResponse } from 'next/og'
import { SITE_NAME } from '@/lib/constants'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0f2e1a',
        color: '#fff',
        fontFamily: 'sans-serif',
        padding: '60px',
      }}
    >
      <div style={{ fontSize: 22, letterSpacing: '8px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '24px' }}>
        invest &amp; rent
      </div>
      <div style={{ fontSize: 72, fontWeight: 700, color: '#D4AF37', letterSpacing: '-1px', textAlign: 'center' }}>
        {SITE_NAME}
      </div>
      <div style={{ fontSize: 28, color: '#a3c4a8', marginTop: '24px', textAlign: 'center' }}>
        Prijepolje · Zlatibor · Zlatar
      </div>
      <div style={{ fontSize: 20, color: '#6b9e73', marginTop: '16px' }}>
        harisnekretnine.rs
      </div>
    </div>,
    { ...size },
  )
}
