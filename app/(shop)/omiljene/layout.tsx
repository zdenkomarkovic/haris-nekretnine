import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Omiljene nekretnine',
  robots: { index: false, follow: false },
}

export default function OmiljeneLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
