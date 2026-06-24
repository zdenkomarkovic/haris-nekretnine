import Image from 'next/image'
import Link from 'next/link'
import FavoritesLink from './FavoritesLink'
import MobileMenu from './MobileMenu'
import { getAllTipovi, getAllOblasti } from '@/lib/sanity/queries'

export default async function Header() {
  const [tipovi, oblasti] = await Promise.all([getAllTipovi(), getAllOblasti()])

  return (
    <header className="sticky top-0 z-40 bg-green-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between relative">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="Haris Nekretnine"
            width={160}
            height={52}
            className="h-11 w-auto object-contain"
            priority
          />
          <span className="text-[#D4AF37] font-semibold text-lg leading-tight tracking-tight uppercase flex flex-col items-center">
            Haris Nekretnine
            <span className="text-xs font-normal tracking-widest flex items-center gap-1">
              <span>—</span>
              <span>invest &amp; rent</span>
              <span>—</span>
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-white">
          <Link href="/" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">Početna</Link>
          {oblasti.length > 0 && (
            <Link href="/oblasti" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">Oblasti</Link>
          )}
          {tipovi.length > 0 && (
            <Link href="/tipovi" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">Tipovi</Link>
          )}
          <Link href="/nekretnine" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">Sve nekretnine</Link>
          <Link href="/edukacija" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">Edukacija</Link>
          <Link href="/o-nama" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">O nama</Link>
          <Link href="/kontakt" className="hover:text-[#D4AF37] transition-colors [text-underline-offset:12px] hover:underline">Kontakt</Link>
          <FavoritesLink />
        </nav>

        <MobileMenu showOblasti={oblasti.length > 0} showTipovi={tipovi.length > 0} />
      </div>
    </header>
  )
}
