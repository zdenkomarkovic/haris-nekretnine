'use client'

import { useState, useEffect } from 'react'
import type { Nekretnina } from '@/types/shop'
import PropertyGrid from './ProductGrid'

const PAGE = 9

interface Props {
  products: Nekretnina[]
  emptyMessage?: string
}

export default function PaginatedPropertyGrid({ products, emptyMessage }: Props) {
  const [shown, setShown] = useState(PAGE)

  const stableKey = (products[0]?._id ?? '') + products.length
  useEffect(() => { setShown(PAGE) }, [stableKey]) // eslint-disable-line react-hooks/exhaustive-deps

  const visible = products.slice(0, shown)
  const remaining = products.length - shown
  const hasMore = remaining > 0

  return (
    <div>
      <PropertyGrid products={visible} emptyMessage={emptyMessage} />

      {hasMore && (
        <div className="mt-8 flex flex-col items-center gap-2">
          <button
            onClick={() => setShown((n) => n + PAGE)}
            className="px-6 py-2.5 border border-green-900 text-green-900 rounded-lg text-sm hover:bg-green-900 hover:text-white transition-colors"
          >
            Prikaži još {Math.min(remaining, PAGE)}
          </button>
          <p className="text-xs text-gray-400">
            Prikazano {visible.length} od {products.length}
          </p>
        </div>
      )}

      {!hasMore && products.length > PAGE && (
        <p className="text-xs text-gray-400 text-center mt-6">
          Prikazano svih {products.length} nekretnina
        </p>
      )}
    </div>
  )
}
