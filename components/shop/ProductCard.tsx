import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import type { Nekretnina } from '@/types/shop'
import FavoriteButton from '@/components/nekretnine/FavoriteButton'

const statusLabel: Record<string, string> = {
  dostupno: 'Dostupno',
  rezervisano: 'Rezervisano',
  prodato: 'Prodato',
}

export default function PropertyCard({ product: nekretnina }: { product: Nekretnina }) {
  const image = nekretnina.slike?.[0]

  return (
    <div className="group border border-gray-200 rounded-lg overflow-hidden flex flex-col hover:border-green-900 hover:shadow-md transition-all duration-200">
      <Link href={`/nekretnine/${nekretnina.slug}`} className="block aspect-video relative bg-gray-50">
        {image ? (
          <Image
            src={urlFor(image).width(600).height(338).fit('crop').url()}
            alt={image.alt ?? nekretnina.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-300 text-sm">
            Nema slike
          </div>
        )}
        {nekretnina.status !== 'dostupno' && (
          <span className="absolute top-2 left-2 bg-green-900 text-white text-xs px-2 py-1 rounded">
            {statusLabel[nekretnina.status] ?? nekretnina.status}
          </span>
        )}
        <FavoriteButton id={nekretnina._id} className="absolute top-2 right-2 z-10" />
      </Link>

      <div className="p-3 flex flex-col flex-1 gap-2">
        {nekretnina.tip && (
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {nekretnina.tip.name}
          </span>
        )}
        <Link
          href={`/nekretnine/${nekretnina.slug}`}
          className="font-medium text-sm leading-tight hover:underline underline-offset-2"
        >
          {nekretnina.name}
        </Link>

        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
          {nekretnina.povrsina && <span>{nekretnina.povrsina} m²</span>}
          {nekretnina.brSoba && <span>{nekretnina.brSoba} sobe</span>}
          {nekretnina.lokacija && <span>{nekretnina.lokacija}</span>}
        </div>

        <div className="mt-auto pt-2 flex items-center justify-between gap-2">
          {nekretnina.cena != null ? (
            <span className="font-semibold">{nekretnina.cena.toLocaleString('sr-RS')} EUR</span>
          ) : (
            <span className="text-sm text-gray-500 italic">Cena na upit</span>
          )}
          <Link
            href={`/nekretnine/${nekretnina.slug}`}
            className="flex-shrink-0 text-xs px-3 py-1.5 border border-green-900 text-green-900 rounded hover:bg-green-900 hover:text-white transition-colors"
          >
            Pogledaj
          </Link>
        </div>
      </div>
    </div>
  )
}
