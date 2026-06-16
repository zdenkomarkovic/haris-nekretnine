'use client'

import { useState, useEffect, useCallback } from 'react'
import type { VideoPrezentacija } from '@/types/shop'
import VideoPlayer from './VideoPlayer'
import InstagramEmbed from './InstagramEmbed'

const PAGE = 4

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

const platformLabel: Record<string, string> = {
  youtube: 'YouTube',
  facebook: 'Facebook',
  tiktok: 'TikTok',
  instagram: 'Instagram',
  fajl: '',
}

export default function HomepageVideos({ videi }: { videi: VideoPrezentacija[] }) {
  const [shown, setShown] = useState(PAGE)
  const [active, setActive] = useState<number | null>(null)
  const close = useCallback(() => setActive(null), [])

  useEffect(() => {
    if (active === null) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active, close])

  if (!videi.length) return null

  const visible = videi.slice(0, shown)
  const hasMore = shown < videi.length
  const activeVideo = active !== null ? videi[active] ?? null : null

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {visible.map((video, idx) => {
          const ytId = video.tip === 'youtube' && video.url ? getYouTubeId(video.url) : null
          const thumbnail = ytId ? `https://img.youtube.com/vi/${ytId}/mqdefault.jpg` : null
          const isFajl = video.tip === 'fajl' && video.fajlUrl

          return (
            <button
              key={video._id}
              onClick={() => setActive(idx)}
              className={`group relative block w-full rounded-xl overflow-hidden bg-green-950 shadow-md hover:shadow-xl transition-shadow text-left ${isFajl ? 'aspect-[9/16]' : 'aspect-video'}`}
            >
              {thumbnail ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={thumbnail}
                  alt={video.naslov}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : isFajl ? (
                <video
                  src={video.fajlUrl}
                  preload="metadata"
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-green-900" />
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-3">
                <p className="text-white font-medium text-sm leading-tight line-clamp-2">{video.naslov}</p>
                {platformLabel[video.tip] && (
                  <p className="text-green-300 text-xs mt-0.5">{platformLabel[video.tip]}</p>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button
            onClick={() => setShown((n) => n + PAGE)}
            className="px-6 py-2.5 border border-green-900 text-green-900 text-sm font-semibold rounded-lg hover:bg-green-900 hover:text-white transition-colors"
          >
            Vidi više
          </button>
        </div>
      )}

      {/* Modal */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-xl"
            aria-label="Zatvori"
          >
            ✕
          </button>

          {activeVideo.naslov && (
            <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/80 text-sm text-center max-w-md px-16 truncate">
              {activeVideo.naslov}
            </p>
          )}

          <div
            className={`w-full mx-6 ${activeVideo.tip === 'instagram' ? 'max-w-lg' : 'max-w-4xl'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {activeVideo.tip === 'instagram' && activeVideo.url ? (
              <InstagramEmbed url={activeVideo.url} maxWidth={540} />
            ) : (
              <VideoPlayer
                autoPlay
                video={{
                  _key: activeVideo._id,
                  tip: activeVideo.tip,
                  url: activeVideo.url,
                  fajlUrl: activeVideo.fajlUrl,
                  naslov: activeVideo.naslov,
                }}
              />
            )}
          </div>
        </div>
      )}
    </>
  )
}
