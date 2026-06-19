'use client'

import { useEffect, useState } from 'react'

const L1 = 'Vašu nekretninu'
const L2 = 'predstavljamo'
const L3 = 'na pravi način.'
const TOTAL = L1.length + L2.length + L3.length

export default function TypewriterText() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (count >= TOTAL) return
    const t = setTimeout(() => setCount(c => c + 1), 45)
    return () => clearTimeout(t)
  }, [count])

  const t1 = L1.slice(0, Math.min(count, L1.length))
  const t2 = count > L1.length ? L2.slice(0, Math.min(count - L1.length, L2.length)) : ''
  const t3 = count > L1.length + L2.length ? L3.slice(0, count - L1.length - L2.length) : ''

  const c1 = count < L1.length
  const c2 = count >= L1.length && count < L1.length + L2.length
  const c3 = count >= L1.length + L2.length && count < TOTAL
  const cursor = <span className="animate-pulse">|</span>

  return (
    <span className="relative block">

      {/* Ghost mobile — rezerviše 3 reda */}
      <span className="md:hidden invisible select-none block" aria-hidden="true">
        <span className="block">{L1}</span>
        <span className="block">{L2}</span>
        <span className="block text-[#D4AF37]">{L3}</span>
      </span>

      {/* Ghost desktop — rezerviše 2 reda */}
      <span className="hidden md:block invisible select-none" aria-hidden="true">
        <span className="block">{L1}</span>
        <span className="block">{L2} <span className="text-[#D4AF37]">{L3}</span></span>
      </span>

      {/* Typed overlay mobile */}
      <span className="md:hidden absolute inset-0">
        <span className="block">{t1}{c1 && cursor}</span>
        <span className="block">{t2}{c2 && cursor}</span>
        <span className="block text-[#D4AF37]">{t3}{c3 && cursor}</span>
      </span>

      {/* Typed overlay desktop */}
      <span className="hidden md:block absolute inset-0">
        <span className="block">{t1}{c1 && cursor}</span>
        <span className="block">
          {t2}{c2 && cursor}
          {t3 && <>{' '}<span className="text-[#D4AF37]">{t3}{c3 && cursor}</span></>}
        </span>
      </span>

    </span>
  )
}
