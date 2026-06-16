import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'O nama' }

const stavke = [
  {
    ikona: '📷',
    naslov: 'Vizuelni identitet',
    tekst: 'Kroz kvalitetan vizuelni sadržaj — fotografiju i video produkciju — svaku nekretninu predstavljamo na način koji ističe njene prednosti, lokaciju, potencijal i jedinstven karakter.',
  },
  {
    ikona: '📢',
    naslov: 'Digitalni marketing',
    tekst: 'Pažljivo osmišljenom promocijom na savremenim online kanalima pomažemo vlasnicima da svoju nekretninu predstave široj publici i dođu do pravih kupaca.',
  },
  {
    ikona: '📍',
    naslov: 'Fokus na Zlatiborski okrug',
    tekst: 'Posebnu pažnju posvećujemo nekretninama u Prijepolju, Zlatiboru i Zlataru, kao i drugim atraktivnim lokacijama širom Srbije.',
  },
  {
    ikona: '📚',
    naslov: 'Edukacija i transparentnost',
    tekst: 'Kroz kontinuirano kreiranje edukativnog i informativnog sadržaja nastojimo da proces informisanja o tržištu nekretnina učinimo jednostavnijim, transparentnijim i dostupnijim svima.',
  },
]

export default function ONamaPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 text-white py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <p className="text-sm uppercase tracking-widest text-[#D4AF37] font-medium">O nama</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">Haris Nekretnine</h1>
          <p className="text-green-200 leading-relaxed">
            Moderan brend posvećen profesionalnoj prezentaciji nekretnina kroz fotografiju,
            video produkciju, digitalni marketing i promociju na savremenim online kanalima.
          </p>
        </div>
      </section>

      {/* Glavni tekst */}
      <section className="max-w-3xl mx-auto px-4 py-14 space-y-6 text-gray-700 leading-relaxed">
        <p className="text-lg">
          Naš cilj je da svaku nekretninu predstavimo na način koji ističe njene prednosti,
          lokaciju, potencijal i jedinstven karakter. Kroz kvalitetan vizuelni sadržaj,
          detaljne opise i pažljivo osmišljenu promociju pomažemo vlasnicima da svoju
          nekretninu predstave široj publici, a zainteresovanim kupcima da lakše pronađu
          ono što traže.
        </p>
        <p>
          Posebnu pažnju posvećujemo nekretninama u Zlatiborskom okrugu — Prijepolju,
          Zlatiboru i Zlataru — i drugim atraktivnim lokacijama širom Srbije.
        </p>
        <p>
          Verujemo da svaka nekretnina ima svoju priču. Zato ne prikazujemo samo kvadrate,
          sobe i lokaciju — već način života, ambijent i mogućnosti koje ona pruža.
        </p>
        <p>
          Kroz kontinuirano kreiranje edukativnog i informativnog sadržaja nastojimo da
          proces informisanja o tržištu nekretnina učinimo jednostavnijim, transparentnijim
          i dostupnijim svima.
        </p>
        <p className="text-green-900 font-semibold text-lg border-l-4 border-[#D4AF37] pl-4">
          Haris Nekretnine — mesto gde nekretnine dobijaju prezentaciju kakvu zaslužuju.
        </p>
      </section>

      {/* 4 kartice */}
      <section className="bg-white border-t border-gray-100 py-14 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-semibold text-green-900 text-center mb-10">Šta nas izdvaja</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {stavke.map((s) => (
              <div key={s.naslov} className="bg-white rounded-xl p-6 border border-gray-200 shadow-md space-y-3">
                <div className="text-3xl">{s.ikona}</div>
                <h3 className="font-semibold text-green-900">{s.naslov}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-100 py-14 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-4">
          <h2 className="text-xl font-semibold text-green-900">Zainteresovani ste za saradnju?</h2>
          <p className="text-sm text-gray-500">Kontaktirajte nas i zajedno ćemo pronaći najbolji način da predstavimo vašu nekretninu.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/kontakt"
              className="px-6 py-3 bg-green-900 text-white font-semibold rounded-lg hover:bg-green-800 transition-colors"
            >
              Kontaktirajte nas
            </Link>
            <Link
              href="/nekretnine"
              className="px-6 py-3 border border-[#D4AF37] text-[#D4AF37] font-semibold rounded-lg hover:bg-[#D4AF37] hover:text-green-950 transition-colors"
            >
              Pogledaj nekretnine
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
