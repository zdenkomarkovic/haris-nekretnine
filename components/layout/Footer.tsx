import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-green-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Image
                src="/logo.png"
                alt="Haris Nekretnine"
                width={450}
                height={144}
                className="h-32 w-auto object-contain"
              />
              <span className="text-[#D4AF37] font-bold text-xl leading-tight">
                Haris<br />Nekretnine
              </span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed max-w-xs">
              Profesionalna prezentacija nekretnina kroz fotografiju, video produkciju i digitalni marketing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-[#D4AF37] mb-4">Navigacija</h3>
            <nav className="flex flex-col gap-2 text-sm text-gray-300">
              <Link href="/nekretnine" className="hover:text-[#D4AF37] transition-colors">Sve nekretnine</Link>
              <Link href="/oblasti" className="hover:text-[#D4AF37] transition-colors">Oblasti</Link>
              <Link href="/tipovi" className="hover:text-[#D4AF37] transition-colors">Tipovi</Link>
              <Link href="/o-nama" className="hover:text-[#D4AF37] transition-colors">O nama</Link>
              <Link href="/kontakt" className="hover:text-[#D4AF37] transition-colors">Kontakt</Link>
            </nav>
          </div>

          <div>
            <h3 className="font-semibold text-[#D4AF37] mb-4">Fokus oblasti</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Zlatiborski okrug<br />
              Prijepolje · Zlatibor · Zlatar<br />
              i druge atraktivne lokacije širom Srbije
            </p>
          </div>
        </div>

        <div className="border-t border-green-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-400">
          <span>&copy; {year} Haris Nekretnine. Sva prava zadržana.</span>
          <span>
            Izrada sajta:{' '}
            <a
              href="https://manikamwebsolutions.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#D4AF37] transition-colors"
            >
              Manikam Web Solutions
            </a>
          </span>
        </div>
      </div>
    </footer>
  )
}
