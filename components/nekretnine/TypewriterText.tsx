'use client'

import { useEffect, useState } from 'react'

const FULL_TEXT = 'Vašu nekretninu\npredstavljamo na pravi način.'
const GOLDEN_START = 30 // index where "na pravi način." begins

export default function TypewriterText() {
  const [displayed, setDisplayed] = useState(0)

  useEffect(() => {
    if (displayed >= FULL_TEXT.length) return
    const timeout = setTimeout(() => setDisplayed(d => d + 1), 45)
    return () => clearTimeout(timeout)
  }, [displayed])

  const text = FULL_TEXT.slice(0, displayed)
  const normalPart = text.slice(0, Math.min(displayed, GOLDEN_START))
  const goldenPart = displayed > GOLDEN_START ? text.slice(GOLDEN_START) : ''

  const renderNormal = (str: string) => {
    const parts = str.split('\n')
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && <br />}
      </span>
    ))
  }

  return (
    <>
      {renderNormal(normalPart)}
      {goldenPart && <span className="text-[#D4AF37]">{goldenPart}</span>}
      <span className="animate-pulse">|</span>
    </>
  )
}
