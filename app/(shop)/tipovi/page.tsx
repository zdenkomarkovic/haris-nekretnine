import { getAllTipovi } from '@/lib/sanity/queries'
import TipList from '@/components/shop/CategoryList'

export const metadata = { title: 'Tipovi nekretnina' }

export default async function TipoviStranica() {
  const tipovi = await getAllTipovi()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-green-900 mb-8">Tipovi nekretnina</h1>
      <TipList categories={tipovi} showAll />
    </main>
  )
}
