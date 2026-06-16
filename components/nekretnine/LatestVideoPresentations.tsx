import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import type { Nekretnina, Video } from '@/types/shop'

function getYouTubeId(url: string): string | null {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return u.pathname.slice(1) || null
    const v = u.searchParams.get('v')
    if (v) return v
    const parts = u.pathname.split('/')
    const idx = parts.indexOf('shorts')
    if (idx !== -1) return parts[idx + 1] || null
  } catch {}
  return null
}

function findFirstYouTubeId(videi: Video[]): string | null {
  for (const v of videi) {
    if (v.tip === 'youtube' && v.url) {
      const id = getYouTubeId(v.url)
      if (id) return id
    }
  }
  return null
}

export default function LatestVideoPresentations({ nekretnine }: { nekretnine: Nekretnina[] }) {
  if (!nekretnine.length) return null

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {nekretnine.map((n) => {
        const ytId = n.videi ? findFirstYouTubeId(n.videi) : null
        const image = n.slike?.[0]

        const thumbnailSrc = ytId
          ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg`
          : image
            ? urlFor(image).width(480).height(270).fit('crop').url()
            : null

        return (
          <Link
            key={n._id}
            href={`/nekretnine/${n.slug}`}
            className="group relative block aspect-video rounded-xl overflow-hidden bg-green-950 shadow-md hover:shadow-xl transition-shadow"
          >
            {thumbnailSrc && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={thumbnailSrc}
                alt={n.name}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors"
                style={{ backgroundColor: '#D4AF37' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-3">
              <p className="text-white font-medium text-sm leading-tight truncate">{n.name}</p>
              {n.lokacija && (
                <p className="text-green-200 text-xs mt-0.5 truncate">{n.lokacija}</p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
