'use client'

import { useState, useEffect, useCallback } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useDebounce } from '@/hooks/use-debounce'
import type { TipNekretnine, Oblast } from '@/types/shop'

interface Props {
  tipovi: TipNekretnine[]
  oblasti: Oblast[]
  basePath?: string
  showTip?: boolean
  showOblast?: boolean
}

const sel = 'px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-900 transition-colors bg-white'
const inp = 'px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-900 transition-colors w-full'

export default function NekretnineFilteri({ tipovi, oblasti, basePath = '/nekretnine', showTip = true, showOblast = true }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const updateParam = useCallback((key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    router.push(`${basePath}?${params.toString()}`)
  }, [searchParams, router, basePath])

  // Debounced text search
  const [q, setQ] = useState(searchParams.get('q') ?? '')
  const debouncedQ = useDebounce(q, 350)
  useEffect(() => {
    if (debouncedQ !== (searchParams.get('q') ?? '')) updateParam('q', debouncedQ)
  }, [debouncedQ]) // eslint-disable-line react-hooks/exhaustive-deps

  // Debounced number ranges
  const [cenaOd, setCenaOd] = useState(searchParams.get('cenaOd') ?? '')
  const [cenaDo, setCenaDo] = useState(searchParams.get('cenaDo') ?? '')
  const [m2Od, setM2Od] = useState(searchParams.get('m2Od') ?? '')
  const [m2Do, setM2Do] = useState(searchParams.get('m2Do') ?? '')

  const dCenaOd = useDebounce(cenaOd, 600)
  const dCenaDo = useDebounce(cenaDo, 600)
  const dM2Od = useDebounce(m2Od, 600)
  const dM2Do = useDebounce(m2Do, 600)

  useEffect(() => { if (dCenaOd !== (searchParams.get('cenaOd') ?? '')) updateParam('cenaOd', dCenaOd) }, [dCenaOd]) // eslint-disable-line
  useEffect(() => { if (dCenaDo !== (searchParams.get('cenaDo') ?? '')) updateParam('cenaDo', dCenaDo) }, [dCenaDo]) // eslint-disable-line
  useEffect(() => { if (dM2Od !== (searchParams.get('m2Od') ?? '')) updateParam('m2Od', dM2Od) }, [dM2Od]) // eslint-disable-line
  useEffect(() => { if (dM2Do !== (searchParams.get('m2Do') ?? '')) updateParam('m2Do', dM2Do) }, [dM2Do]) // eslint-disable-line

  const activeCount = [...searchParams.entries()].filter(([, v]) => v).length

  function resetAll() {
    setQ(''); setCenaOd(''); setCenaDo(''); setM2Od(''); setM2Do('')
    router.push(basePath)
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 mb-8 shadow-sm">
      {/* Pretraga + reset */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Pretraži po nazivu, lokaciji, šifri..."
            className={inp}
          />
          {q && (
            <button onClick={() => setQ('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black">
              ✕
            </button>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={resetAll}
            className="px-3 py-2 text-sm border border-gray-300 rounded-lg hover:border-red-400 hover:text-red-500 transition-colors whitespace-nowrap"
          >
            Resetuj {activeCount > 0 && `(${activeCount})`}
          </button>
        )}
      </div>

      {/* Selekti */}
      <div className="flex flex-wrap gap-2">
        <select
          value={searchParams.get('namena') ?? ''}
          onChange={(e) => updateParam('namena', e.target.value)}
          className={sel}
        >
          <option value="">Prodaja i izdavanje</option>
          <option value="prodaja">Prodaja</option>
          <option value="izdavanje">Izdavanje</option>
        </select>

        {showTip && tipovi.length > 0 && (
          <select
            value={searchParams.get('tip') ?? ''}
            onChange={(e) => updateParam('tip', e.target.value)}
            className={sel}
          >
            <option value="">Svi tipovi</option>
            {tipovi.map((t) => (
              <option key={t._id} value={t.slug}>{t.name}</option>
            ))}
          </select>
        )}

        {showOblast && oblasti.length > 0 && (
          <select
            value={searchParams.get('oblast') ?? ''}
            onChange={(e) => updateParam('oblast', e.target.value)}
            className={sel}
          >
            <option value="">Sve oblasti</option>
            {oblasti.map((o) => (
              <option key={o._id} value={o.slug}>{o.name}</option>
            ))}
          </select>
        )}

        <select
          value={searchParams.get('sobe') ?? ''}
          onChange={(e) => updateParam('sobe', e.target.value)}
          className={sel}
        >
          <option value="">Br. soba</option>
          <option value="1">1 soba</option>
          <option value="2">2 sobe</option>
          <option value="3">3 sobe</option>
          <option value="4">4 sobe</option>
          <option value="5p">5+ soba</option>
        </select>

        <select
          value={searchParams.get('kupatila') ?? ''}
          onChange={(e) => updateParam('kupatila', e.target.value)}
          className={sel}
        >
          <option value="">Br. kupatila</option>
          <option value="1">1 kupatilo</option>
          <option value="2">2 kupatila</option>
          <option value="3p">3+ kupatila</option>
        </select>
      </div>

      {/* Opsezi */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 items-center">
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 whitespace-nowrap">Cena (EUR):</span>
          <input
            type="number" min={0} value={cenaOd}
            onChange={(e) => setCenaOd(e.target.value)}
            placeholder="Od"
            className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-900 transition-colors w-28"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number" min={0} value={cenaDo}
            onChange={(e) => setCenaDo(e.target.value)}
            placeholder="Do"
            className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-900 transition-colors w-28"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500 whitespace-nowrap">Površina (m²):</span>
          <input
            type="number" min={0} value={m2Od}
            onChange={(e) => setM2Od(e.target.value)}
            placeholder="Od"
            className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-900 transition-colors w-24"
          />
          <span className="text-gray-400">–</span>
          <input
            type="number" min={0} value={m2Do}
            onChange={(e) => setM2Do(e.target.value)}
            placeholder="Do"
            className="px-2 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-900 transition-colors w-24"
          />
        </div>
      </div>
    </div>
  )
}
