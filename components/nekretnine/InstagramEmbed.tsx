'use client'

import { useEffect } from 'react'

declare global {
  interface Window {
    instgrm?: { Embeds?: { process: () => void } }
  }
}

interface Props {
  url: string
  maxWidth?: number
}

export default function InstagramEmbed({ url, maxWidth = 540 }: Props) {
  useEffect(() => {
    if (!document.getElementById('ig-embed-js')) {
      const s = document.createElement('script')
      s.id = 'ig-embed-js'
      s.src = 'https://www.instagram.com/embed.js'
      s.async = true
      s.onload = () => window.instgrm?.Embeds?.process()
      document.body.appendChild(s)
    } else {
      window.instgrm?.Embeds?.process()
    }
  }, [url])

  return (
    <blockquote
      className="instagram-media"
      data-instgrm-permalink={url.split('?')[0]}
      data-instgrm-version="14"
      style={{ maxWidth, width: '100%', margin: 0 }}
    />
  )
}
