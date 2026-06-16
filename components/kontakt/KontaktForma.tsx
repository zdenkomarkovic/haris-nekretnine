'use client'

import { useState } from 'react'

const initialForm = { ime: '', prezime: '', email: '', telefon: '', poruka: '' }

const inp = 'border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-900 transition-colors w-full'

export default function KontaktForma() {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Greška pri slanju poruke')
      }

      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri slanju poruke')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-lg p-8 text-center">
        <p className="text-lg font-medium text-green-900 mb-2">Poruka je poslata!</p>
        <p className="text-sm text-green-700">Odgovorićemo vam u najkraćem mogućem roku.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="ime" className="text-sm font-medium">Ime <span className="text-red-500">*</span></label>
          <input id="ime" name="ime" type="text" required value={form.ime} onChange={handleChange} className={inp} />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="prezime" className="text-sm font-medium">Prezime</label>
          <input id="prezime" name="prezime" type="text" value={form.prezime} onChange={handleChange} className={inp} />
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
        <input id="email" name="email" type="email" required value={form.email} onChange={handleChange} className={inp} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="telefon" className="text-sm font-medium">Telefon</label>
        <input id="telefon" name="telefon" type="tel" value={form.telefon} onChange={handleChange} className={inp} />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="poruka" className="text-sm font-medium">Poruka</label>
        <textarea
          id="poruka"
          name="poruka"
          rows={5}
          value={form.poruka}
          onChange={handleChange}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-900 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-900 text-white rounded font-medium text-sm hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Slanje...' : 'Pošalji poruku'}
      </button>
    </form>
  )
}
