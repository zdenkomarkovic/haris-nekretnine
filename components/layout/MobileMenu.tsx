'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import FavoritesLink from './FavoritesLink'

interface Props {
  showOblasti: boolean
  showTipovi: boolean
}

export default function MobileMenu({ showOblasti, showTipovi }: Props) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setOpen(false) }, [pathname])

  return (
    <>
      <button
        className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5"
        onClick={() => setOpen((o) => !o)}
        aria-label="Meni"
      >
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
        <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {open && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-green-900 border-b border-green-800 shadow-lg z-50">
          <nav className="max-w-6xl mx-auto px-4 py-5 flex flex-col gap-4 text-sm text-white">
            <Link href="/" className="hover:text-[#D4AF37] transition-colors">Početna</Link>
            {showOblasti && (
              <Link href="/oblasti" className="hover:text-[#D4AF37] transition-colors">Oblasti</Link>
            )}
            {showTipovi && (
              <Link href="/tipovi" className="hover:text-[#D4AF37] transition-colors">Tipovi</Link>
            )}
            <Link href="/nekretnine" className="hover:text-[#D4AF37] transition-colors">Sve nekretnine</Link>
            <Link href="/edukacija" className="hover:text-[#D4AF37] transition-colors">Edukacija</Link>
            <Link href="/o-nama" className="hover:text-[#D4AF37] transition-colors">O nama</Link>
            <Link href="/kontakt" className="hover:text-[#D4AF37] transition-colors">Kontakt</Link>
            <FavoritesLink />
          </nav>
        </div>
      )}
    </>
  )
}
