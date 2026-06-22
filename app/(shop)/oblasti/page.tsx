export const revalidate = 60

import { getAllOblasti } from '@/lib/sanity/queries'
import OblastList from '@/components/shop/OblastList'

export const metadata = { title: 'Oblasti' }

export default async function OblastiPage() {
  const oblasti = await getAllOblasti()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold text-green-900 mb-8">Oblasti</h1>
      <OblastList oblasti={oblasti} showAll />
    </main>
  )
}
