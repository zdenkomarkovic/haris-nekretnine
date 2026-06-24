import type { Metadata } from 'next'
import './globals.css'
import { SITE_NAME, SITE_URL, SITE_DESCRIPTION } from '@/lib/constants'
import { Cormorant_Garamond, Montserrat } from 'next/font/google'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700'],
  variable: '--font-cormorant',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: ['nekretnine', 'Prijepolje', 'Zlatibor', 'Zlatar', 'kupovina nekretnina', 'prodaja nekretnina', 'iznajmljivanje', 'Zlatiborski okrug', 'stanovi', 'kuće', 'placevi'],
  openGraph: {
    type: 'website',
    locale: 'sr_RS',
    url: SITE_URL,
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="font-[family-name:var(--font-montserrat)]">{children}</body>
    </html>
  )
}
