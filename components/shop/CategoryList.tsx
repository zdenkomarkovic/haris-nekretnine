'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { TipNekretnine } from '@/types/shop'

const ROW = 4

interface Props {
  categories: TipNekretnine[]
  showAll?: boolean
}

export default function TipList({ categories: tipovi, showAll = false }: Props) {
  const [expanded, setExpanded] = useState(false)

  if (tipovi.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">Nema tipova nekretnina.</p>
  }

  const shown = showAll || expanded ? tipovi : tipovi.slice(0, ROW)

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {shown.map((tip) => (
          <Link
            key={tip._id}
            href={`/tipovi/${tip.slug}`}
            className="group border border-gray-200 rounded-lg overflow-hidden hover:border-green-900 hover:shadow-sm transition-all"
          >
            {tip.image ? (
              <div className="aspect-video relative bg-gray-50">
                <Image
                  src={urlFor(tip.image).width(400).height(225).fit('crop').url()}
                  alt={tip.image.alt ?? tip.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, 33vw"
                />
              </div>
            ) : (
              <div className="aspect-video bg-gray-50 flex items-center justify-center text-gray-300 text-sm">
                Nema slike
              </div>
            )}
            <div className="p-3">
              <p className="font-medium text-sm">{tip.name}</p>
              {tip.description && (
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">{tip.description}</p>
              )}
            </div>
          </Link>
        ))}
      </div>

      {!showAll && tipovi.length > ROW && (
        <div className="text-center pt-1">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm px-5 py-2 border border-gray-300 rounded-lg hover:border-green-900 hover:text-green-900 transition-colors"
          >
            {expanded ? 'Prikaži manje' : `Prikaži sve (${tipovi.length})`}
          </button>
        </div>
      )}
    </div>
  )
}
