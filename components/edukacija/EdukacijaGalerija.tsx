'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types/shop'

interface Props {
  slike: SanityImage[]
  naslov: string
}

export default function EdukacijaGalerija({ slike, naslov }: Props) {
  const [lightbox, setLightbox] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)

  const close = useCallback(() => setLightbox(null), [])

  const prev = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i - 1 + slike.length) % slike.length)),
    [slike.length]
  )
  const next = useCallback(() =>
    setLightbox((i) => (i === null ? null : (i + 1) % slike.length)),
    [slike.length]
  )

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightbox, close, prev, next])

  if (slike.length === 0) return null

  const gridClass =
    slike.length === 1
      ? 'grid-cols-1'
      : slike.length === 2
        ? 'grid-cols-2'
        : slike.length === 3
          ? 'grid-cols-3'
          : 'grid-cols-2 sm:grid-cols-4'

  const activeSlike = lightbox !== null ? slike[lightbox] : null

  return (
    <>
      <div className={`grid gap-2 mt-6 ${gridClass}`}>
        {slike.map((slika, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i)}
            className="relative overflow-hidden rounded-lg bg-gray-100 hover:opacity-90 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-green-900"
            style={{ aspectRatio: slike.length === 1 ? '16/9' : '4/3' }}
            aria-label={`Prikaži sliku ${i + 1} u punoj veličini`}
          >
            <Image
              src={urlFor(slika).width(800).height(600).fit('crop').url()}
              alt={slika.alt ?? `${naslov} — slika ${i + 1}`}
              fill
              className="object-cover"
              sizes={
                slike.length === 1
                  ? '(max-width: 768px) 100vw, 720px'
                  : '(max-width: 640px) 50vw, 33vw'
              }
            />
          </button>
        ))}
      </div>

      {lightbox !== null && activeSlike && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={close}
          onTouchStart={(e) => { touchStartX.current = e.touches[0]?.clientX ?? null }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return
            const delta = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current
            touchStartX.current = null
            if (Math.abs(delta) < 50) return
            if (delta < 0) next(); else prev()
          }}
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 z-10 text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-xl"
            aria-label="Zatvori"
          >
            ✕
          </button>

          <div
            className="flex items-center justify-center w-full max-h-[90vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={urlFor(activeSlike).width(1800).fit('max').url()}
              alt={activeSlike.alt ?? `${naslov} — slika ${lightbox + 1}`}
              className="max-h-[90vh] max-w-full w-auto h-auto object-contain"
            />
          </div>

          {slike.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev() }}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white text-2xl transition-colors"
                aria-label="Prethodna slika"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next() }}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white text-2xl transition-colors"
                aria-label="Sledeća slika"
              >
                ›
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
                <span className="text-white/60 text-xs">{lightbox + 1} / {slike.length}</span>
                <div className="flex gap-1.5">
                  {slike.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => { e.stopPropagation(); setLightbox(i) }}
                      className={`w-2 h-2 rounded-full transition-colors ${i === lightbox ? 'bg-white' : 'bg-white/35'}`}
                      aria-label={`Slika ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}
