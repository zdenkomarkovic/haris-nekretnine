import PropertyCard from './ProductCard'
import type { Nekretnina } from '@/types/shop'

interface Props {
  products: Nekretnina[]
  emptyMessage?: string
}

export default function PropertyGrid({ products, emptyMessage = 'Nema nekretnina.' }: Props) {
  if (products.length === 0) {
    return <p className="text-gray-400 text-sm py-8 text-center">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((n) => (
        <PropertyCard key={n._id} product={n} />
      ))}
    </div>
  )
}
