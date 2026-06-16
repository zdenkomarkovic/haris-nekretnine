'use client'

import { useFavorites } from '@/hooks/use-favorites'

interface Props {
  id: string
  className?: string
}

export default function FavoriteButton({ id, className = '' }: Props) {
  const { isFavorite, toggle } = useFavorites()
  const active = isFavorite(id)

  return (
    <button
      onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggle(id) }}
      aria-label={active ? 'Ukloni iz omiljenih' : 'Dodaj u omiljene'}
      className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow transition-colors ${className}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill={active ? '#ef4444' : 'none'}
        stroke={active ? '#ef4444' : '#6b7280'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-all"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </button>
  )
}
