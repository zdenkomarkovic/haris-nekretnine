'use client'

import { useState } from 'react'
import type { EdukacijaUnos } from '@/types/shop'
import EdukacijaKartica from './EdukacijaKartica'

const PO_STRANICI = 6

export default function EdukacijaLista({ unosi }: { unosi: EdukacijaUnos[] }) {
  const [prikazano, setPrikazano] = useState(PO_STRANICI)

  const vidljivi = unosi.slice(0, prikazano)
  const imaJos = prikazano < unosi.length

  return (
    <>
      <div className="flex flex-col gap-6">
        {vidljivi.map((unos) => (
          <EdukacijaKartica key={unos._id} unos={unos} />
        ))}
      </div>

      {imaJos && (
        <div className="mt-10 text-center">
          <button
            onClick={() => setPrikazano((n) => n + PO_STRANICI)}
            className="px-8 py-3 border border-green-900 text-green-900 font-medium rounded-lg hover:bg-green-900 hover:text-white transition-colors"
          >
            Pogledaj više
          </button>
        </div>
      )}
    </>
  )
}
