'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Video } from '@/types/shop'
import VideoPlayer from './VideoPlayer'
import InstagramEmbed from './InstagramEmbed'

const platformConfig: Record<string, { label: string; bg: string }> = {
  youtube:  { label: 'YouTube',  bg: 'bg-red-600' },
  facebook: { label: 'Facebook', bg: 'bg-blue-600' },
  tiktok:   { label: 'TikTok',  bg: 'bg-zinc-900' },
  fajl:     { label: 'Video',   bg: 'bg-gray-600' },
}

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

export default function VideoCards({ videi }: { videi: Video[] }) {
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

  const activeVideo = active !== null ? videi[active] ?? null : null
  const igVideos = videi.filter((v) => v.tip === 'instagram')
  const otherVideos = videi.filter((v) => v.tip !== 'instagram')

  return (
    <>
      {/* Thumbnail kartice za YouTube / TikTok / Facebook / Fajl */}
      {otherVideos.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {otherVideos.map((video) => {
            const idx = videi.indexOf(video)
            const config = platformConfig[video.tip] ?? { label: video.tip, bg: 'bg-gray-600' }
            const ytId = video.tip === 'youtube' && video.url ? getYouTubeId(video.url) : null

            return (
              <button
                key={video._key}
                onClick={() => setActive(idx)}
                aria-label={video.naslov ?? config.label}
                title={video.naslov ?? config.label}
                className={`relative w-full h-28 rounded-lg overflow-hidden border-2 border-transparent hover:border-black transition-colors ${!ytId ? config.bg : ''}`}
              >
                {ytId && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={`https://img.youtube.com/vi/${ytId}/mqdefault.jpg`}
                    alt=""
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <span className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="white" opacity="0.9">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                {video.naslov && (
                  <span className="absolute top-0 left-0 right-0 bg-black/50 text-white text-[10px] text-center px-2 py-1 leading-tight truncate">
                    {video.naslov}
                  </span>
                )}
                <span className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] font-semibold text-center py-1 leading-tight">
                  {config.label}
                </span>
              </button>
            )
          })}
        </div>
      )}

      {/* Instagram embedi — mali format direktno na stranici, klik otvara modal */}
      {igVideos.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          {igVideos.map((video) => {
            const idx = videi.indexOf(video)
            return (
              <div key={video._key} className="flex flex-col gap-1">
                <div
                  className="relative cursor-zoom-in group overflow-hidden rounded-xl border border-gray-200"
                  style={{ height: 300 }}
                  onClick={() => setActive(idx)}
                >
                  <div className="pointer-events-none" style={{ zoom: 0.5 }}>
                    <InstagramEmbed url={video.url!} maxWidth={540} />
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/10">
                    <span className="bg-black/70 text-white text-xs px-3 py-1.5 rounded-full">
                      Prikaži veće
                    </span>
                  </div>
                </div>
                {video.naslov && (
                  <p className="text-xs text-gray-400 text-center">{video.naslov}</p>
                )}
              </div>
            )
          })}
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
            <p className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center max-w-md px-16 truncate">
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
              <VideoPlayer video={activeVideo} />
            )}
          </div>
        </div>
      )}
    </>
  )
}
