'use client'

import Link from 'next/link'
import { useFavorites } from '@/hooks/use-favorites'

export default function FavoritesLink() {
  const { ids } = useFavorites()

  return (
    <Link href="/omiljene" className="relative hover:text-[#C9A227] [text-underline-offset:12px] hover:underline flex items-center gap-1.5 transition-colors">
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={ids.length > 0 ? '#ef4444' : 'none'}
        stroke={ids.length > 0 ? '#ef4444' : 'currentColor'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      Omiljeno
      {ids.length > 0 && (
        <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
          {ids.length > 9 ? '9+' : ids.length}
        </span>
      )}
    </Link>
  )
}
