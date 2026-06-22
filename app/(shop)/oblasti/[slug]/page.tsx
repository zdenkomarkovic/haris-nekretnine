export const revalidate = 60

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import { getOblastBySlug, getFilteredNekretnine, getAllTipovi } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import { urlFor } from '@/lib/sanity/image'
import PaginatedPropertyGrid from '@/components/shop/PaginatedPropertyGrid'
import NekretnineFilteri from '@/components/shop/NekretnineFilteri'

interface Props {
  params: Promise<{ slug: string }>
  searchParams: Promise<{
    namena?: string
    tip?: string
    sobe?: string
    kupatila?: string
    cenaOd?: string
    cenaDo?: string
    m2Od?: string
    m2Do?: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const oblast = await getOblastBySlug(slug)
  if (!oblast) return {}

  return buildMetadata({
    title: oblast.name,
    description: oblast.opis,
    url: `/oblasti/${slug}`,
  })
}

export default async function OblastPage({ params, searchParams }: Props) {
  const { slug } = await params
  const sp = await searchParams

  const [oblast, nekretnine, tipovi] = await Promise.all([
    getOblastBySlug(slug),
    getFilteredNekretnine({
      oblastSlug: slug,
      tipSlug: sp.tip?.trim(),
      namena: sp.namena?.trim(),
      sobe: sp.sobe?.trim(),
      kupatila: sp.kupatila?.trim(),
      cenaOd: sp.cenaOd ? Number(sp.cenaOd) : undefined,
      cenaDo: sp.cenaDo ? Number(sp.cenaDo) : undefined,
      m2Od: sp.m2Od ? Number(sp.m2Od) : undefined,
      m2Do: sp.m2Do ? Number(sp.m2Do) : undefined,
    }),
    getAllTipovi(),
  ])

  if (!oblast) notFound()

  const hasFilters = Object.values(sp).some(Boolean)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <nav className="text-sm text-gray-400 mb-8 flex items-center gap-2">
        <Link href="/" className="hover:text-black transition-colors">Početna</Link>
        <span>/</span>
        <Link href="/oblasti" className="hover:text-black transition-colors">Oblasti</Link>
        <span>/</span>
        <span className="text-gray-600">{oblast.name}</span>
      </nav>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        {oblast.image && (
          <div className="relative w-full md:w-56 shrink-0 h-40 md:h-auto rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={urlFor(oblast.image).width(400).height(320).fit('crop').url()}
              alt={oblast.image.alt ?? oblast.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 224px"
              priority
            />
            <div className="absolute inset-0 bg-black/40 flex items-end p-4">
              <h1 className="text-xl font-bold text-white leading-tight">{oblast.name}</h1>
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {!oblast.image && <h1 className="text-2xl font-semibold mb-2">{oblast.name}</h1>}
          {oblast.opis && (
            <p className="text-gray-500 mb-6">{oblast.opis}</p>
          )}

          <Suspense>
            <NekretnineFilteri
              tipovi={tipovi}
              oblasti={[]}
              basePath={`/oblasti/${slug}`}
              showOblast={false}
            />
          </Suspense>

          <p className="text-sm text-gray-400 mt-2">
            {nekretnine.length} {nekretnine.length === 1 ? 'nekretnina' : nekretnine.length < 5 ? 'nekretnine' : 'nekretnina'}
          </p>
        </div>
      </div>

      {hasFilters && nekretnine.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">
          Nema rezultata za zadate filtere.
        </p>
      ) : (
        <PaginatedPropertyGrid
          products={nekretnine}
          emptyMessage="Nema nekretnina u ovoj oblasti."
        />
      )}
    </main>
  )
}
