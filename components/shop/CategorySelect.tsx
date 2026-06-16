'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import type { TipNekretnine } from '@/types/shop'

export default function TipSelect({ categories: tipovi }: { categories: TipNekretnine[] }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const current = searchParams.get('tip') ?? ''

  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString())
    if (e.target.value) {
      params.set('tip', e.target.value)
    } else {
      params.delete('tip')
    }
    router.push(`/nekretnine?${params.toString()}`)
  }

  return (
    <select
      value={current}
      onChange={handleChange}
      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-black transition-colors bg-white"
    >
      <option value="">Svi tipovi</option>
      {tipovi.map((tip) => (
        <option key={tip._id} value={tip.slug}>
          {tip.name}
        </option>
      ))}
    </select>
  )
}
