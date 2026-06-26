export const revalidate = 60

import { getAllEdukacija } from '@/lib/sanity/queries'
import { buildMetadata } from '@/lib/metadata'
import EdukacijaLista from '@/components/edukacija/EdukacijaLista'

export const metadata = buildMetadata({
  title: 'Edukacija',
  description: 'Saveti, vodiči i korisne informacije o kupovini, prodaji i iznajmljivanju nekretnina u Srbiji. Edukativni sadržaj agencije Haris Nekretnine.',
  url: '/edukacija',
})

export default async function EdukacijaPage() {
  const unosi = await getAllEdukacija()

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-10">
        <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-medium mb-2">Haris Nekretnine</p>
        <h1 className="text-3xl font-semibold text-green-900">Edukacija</h1>
        <p className="text-gray-500 mt-2 leading-relaxed">
          Saveti, vodiči i korisne informacije o tržištu nekretnina.
        </p>
      </div>

      {unosi.length === 0 ? (
        <p className="text-gray-400 text-sm py-16 text-center">
          Uskoro — edukativni sadržaj je u pripremi.
        </p>
      ) : (
        <EdukacijaLista unosi={unosi} />
      )}
    </main>
  )
}
