import { PortableText } from 'next-sanity'
import type { EdukacijaUnos } from '@/types/shop'
import EdukacijaGalerija from './EdukacijaGalerija'

interface Props {
  unos: EdukacijaUnos
}

export default function EdukacijaKartica({ unos }: Props) {
  return (
    <article className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-semibold text-green-900 mb-4">
        {unos.naslov}
      </h2>

      {unos.tekst && unos.tekst.length > 0 && (
        <div className="prose prose-sm md:prose-base max-w-none text-gray-700 leading-relaxed
          prose-headings:text-green-900 prose-headings:font-semibold
          prose-a:text-green-700 prose-a:underline hover:prose-a:text-green-900
          prose-blockquote:border-l-[#D4AF37] prose-blockquote:text-gray-500 prose-blockquote:italic
          prose-strong:text-gray-900"
        >
          <PortableText value={unos.tekst} />
        </div>
      )}

      {unos.slike && unos.slike.length > 0 && (
        <EdukacijaGalerija slike={unos.slike} naslov={unos.naslov} />
      )}
    </article>
  )
}
