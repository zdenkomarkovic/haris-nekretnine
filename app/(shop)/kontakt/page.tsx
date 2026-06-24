import type { Metadata } from 'next'
import KontaktForma from '@/components/kontakt/KontaktForma'

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontaktirajte Haris Nekretnine — tel. +381652777705. Profesionalna prezentacija i prodaja nekretnina u Prijepolju, Zlatiboru i Zlatiborskom okrugu.',
}

const socials = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/haris.nekretnine_invest.rent/',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61587038136266',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@haris.nekretnine',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
      </svg>
    ),
  },
]

export default function KontaktPage() {
  return (
    <main>
      {/* Hero */}
      <section className="bg-green-950 text-white py-16 px-4 text-center">
        <div className="max-w-xl mx-auto space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#D4AF37] font-medium">Kontakt</p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#D4AF37]">Stupite u kontakt</h1>
          <p className="text-gray-300 text-sm">
            Tu smo da odgovorimo na sva vaša pitanja o nekretninama i uslugama.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-12">

        {/* Levo — info */}
        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-green-900 mb-5">Kontakt informacije</h2>
            <div className="space-y-4">
              <a
                href="tel:+381652777705"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-full bg-green-900 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.37 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Telefon</p>
                  <p className="font-medium text-gray-800 group-hover:text-green-900 transition-colors">+381 65 2777705</p>
                </div>
              </a>

              <a
                href="mailto:haris@berries.rs"
                className="flex items-center gap-4 group"
              >
                <div className="w-11 h-11 rounded-full bg-green-900 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,12 2,6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Email</p>
                  <p className="font-medium text-gray-800 group-hover:text-green-900 transition-colors">haris@berries.rs</p>
                </div>
              </a>
            </div>
          </div>

          {/* Socijalne mreže */}
          <div>
            <h2 className="text-lg font-semibold text-green-900 mb-5">Pratite nas</h2>
            <div className="flex flex-col gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-11 h-11 rounded-full bg-green-900 text-white flex items-center justify-center flex-shrink-0 group-hover:bg-[#D4AF37] transition-colors">
                    {s.icon}
                  </div>
                  <span className="font-medium text-gray-800 group-hover:text-green-900 transition-colors">{s.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Desno — forma */}
        <div>
          <h2 className="text-lg font-semibold text-green-900 mb-5">Pošaljite poruku</h2>
          <KontaktForma />
        </div>
      </div>
    </main>
  )
}
