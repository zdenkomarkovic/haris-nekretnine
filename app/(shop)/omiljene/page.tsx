'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useFavorites } from '@/hooks/use-favorites'
import { getNekretnineByIds } from '@/lib/sanity/queries'
import type { Nekretnina } from '@/types/shop'
import PropertyGrid from '@/components/shop/ProductGrid'

export default function OmiljenePage() {
  const { ids, toggle } = useFavorites()
  const [nekretnine, setNekretnine] = useState<Nekretnina[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getNekretnineByIds(ids).then((data) => {
      setNekretnine(data)
      setLoading(false)
    })
  }, [ids])

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Početna</Link>
        <span>/</span>
        <span className="text-gray-600">Omiljene</span>
      </nav>

      <div className="flex items-baseline justify-between mb-8">
        <h1 className="text-2xl font-semibold">Omiljene nekretnine</h1>
        {nekretnine.length > 0 && (
          <span className="text-sm text-gray-400">{nekretnine.length} {nekretnine.length === 1 ? 'nekretnina' : 'nekretnina'}</span>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: Math.max(ids.length, 1) }).map((_, i) => (
            <div key={i} className="aspect-video rounded-lg bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : nekretnine.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <svg className="mx-auto mb-4 text-gray-200" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          <p className="text-lg font-medium text-gray-500 mb-2">Nema omiljenih nekretnina</p>
          <p className="text-sm mb-6">Kliknite na srce na bilo kojoj nekretnini da je dodate ovde.</p>
          <Link
            href="/nekretnine"
            className="inline-block px-5 py-2.5 border border-black rounded text-sm hover:bg-black hover:text-white transition-colors"
          >
            Pregledaj nekretnine
          </Link>
        </div>
      ) : (
        <div>
          <PropertyGrid products={nekretnine} />
          <div className="mt-10 text-center">
            <button
              onClick={() => nekretnine.forEach((n) => toggle(n._id))}
              className="text-sm text-gray-400 hover:text-red-500 transition-colors underline underline-offset-4"
            >
              Ukloni sve omiljene
            </button>
          </div>
        </div>
      )}
    </main>
  )
}
