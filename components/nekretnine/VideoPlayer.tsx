'use client'

import type { Video } from '@/types/shop'
import InstagramEmbed from './InstagramEmbed'

function getYouTubeEmbedUrl(url: string): string {
  try {
    const u = new URL(url)
    if (u.hostname === 'youtu.be') return `https://www.youtube.com/embed${u.pathname}`
    const v = u.searchParams.get('v')
    if (v) return `https://www.youtube.com/embed/${v}`
    const parts = u.pathname.split('/')
    const shortsIdx = parts.indexOf('shorts')
    if (shortsIdx !== -1) return `https://www.youtube.com/embed/${parts[shortsIdx + 1]}`
  } catch {}
  return url
}

function getFacebookEmbedUrl(url: string): string {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&width=640&show_text=false&height=360`
}

function getTikTokEmbedUrl(url: string): string {
  const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/)
  if (match) return `https://www.tiktok.com/embed/v2/${match[1]}`
  return url
}

export default function VideoPlayer({ video, autoPlay = false }: { video: Video; autoPlay?: boolean }) {
  if (video.tip === 'fajl') {
    if (!video.fajlUrl) return null
    return (
      <video controls autoPlay={autoPlay} className="w-full rounded-lg bg-black" src={video.fajlUrl} preload="metadata">
        Vaš pretraživač ne podržava video.
      </video>
    )
  }

  if (!video.url) return null

  if (video.tip === 'instagram') {
    return <InstagramEmbed url={video.url} />
  }

  let embedUrl: string
  let aspectClass = 'aspect-video'

  switch (video.tip) {
    case 'youtube':
      embedUrl = getYouTubeEmbedUrl(video.url) + (autoPlay ? '?autoplay=1' : '')
      break
    case 'facebook':
      embedUrl = getFacebookEmbedUrl(video.url) + (autoPlay ? '&autoplay=true' : '')
      break
    case 'tiktok':
      embedUrl = getTikTokEmbedUrl(video.url)
      aspectClass = 'aspect-[9/16] max-w-sm mx-auto'
      break
    default:
      return (
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-sm underline text-blue-600">
          Video
        </a>
      )
  }

  return (
    <div className={`relative ${aspectClass} w-full rounded-lg overflow-hidden bg-black`}>
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title={video.naslov ?? 'Video'}
      />
    </div>
  )
}
