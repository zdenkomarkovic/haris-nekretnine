import { Suspense } from 'react'
import { getFilteredNekretnine, getAllTipovi, getAllOblasti } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import PaginatedPropertyGrid from '@/components/shop/PaginatedPropertyGrid'
import NekretnineFilteri from '@/components/shop/NekretnineFilteri'

export const metadata = buildMetadata({
  title: 'Sve nekretnine',
  description: 'Pretražite sve dostupne nekretnine u Prijepolju, Zlatiboru i Zlatiborskom okrugu. Stanovi, kuće, placevi i poslovni prostori za kupovinu i iznajmljivanje.',
  url: '/nekretnine',
})

interface Props {
  searchParams: Promise<{
    q?: string
    tip?: string
    oblast?: string
    namena?: string
    sobe?: string
    kupatila?: string
    cenaOd?: string
    cenaDo?: string
    m2Od?: string
    m2Do?: string
  }>
}

export default async function NekretninePage({ searchParams }: Props) {
  const sp = await searchParams

  const [nekretnine, tipovi, oblasti] = await Promise.all([
    getFilteredNekretnine({
      q: sp.q?.trim(),
      tipSlug: sp.tip?.trim(),
      oblastSlug: sp.oblast?.trim(),
      namena: sp.namena?.trim(),
      sobe: sp.sobe?.trim(),
      kupatila: sp.kupatila?.trim(),
      cenaOd: sp.cenaOd ? Number(sp.cenaOd) : undefined,
      cenaDo: sp.cenaDo ? Number(sp.cenaDo) : undefined,
      m2Od: sp.m2Od ? Number(sp.m2Od) : undefined,
      m2Do: sp.m2Do ? Number(sp.m2Do) : undefined,
    }),
    getAllTipovi(),
    getAllOblasti(),
  ])

  const hasFilters = Object.values(sp).some(Boolean)

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-semibold text-green-900">Sve nekretnine</h1>
        <span className="text-sm text-gray-400">{nekretnine.length} {nekretnine.length === 1 ? 'nekretnina' : 'nekretnina'}</span>
      </div>

      <Suspense>
        <NekretnineFilteri tipovi={tipovi} oblasti={oblasti} />
      </Suspense>

      {hasFilters && nekretnine.length === 0 ? (
        <p className="text-gray-400 text-sm py-12 text-center">
          Nema rezultata za zadate filtere.
        </p>
      ) : (
        <PaginatedPropertyGrid products={nekretnine} />
      )}
    </main>
  )
}
