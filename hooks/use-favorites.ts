'use client'

import { useLocalStorage } from './use-local-storage'

export function useFavorites() {
  const [ids, setIds] = useLocalStorage<string[]>('omiljene', [])

  const isFavorite = (id: string) => ids.includes(id)

  const toggle = (id: string) => {
    setIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )
  }

  return { ids, isFavorite, toggle }
}
