'use client'

import { useState } from 'react'
import type { InquiryFormData } from '@/types/shop'

interface Props {
  nekretnina: { name: string; slug: string }
}

const initialForm: InquiryFormData = {
  ime: '',
  prezime: '',
  email: '',
  telefon: '',
  poruka: '',
}

export default function InquiryForm({ nekretnina }: Props) {
  const [form, setForm] = useState<InquiryFormData>(initialForm)
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
      const res = await fetch('/api/upit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ form, nekretnina }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error ?? 'Greška pri slanju upita')
      }

      setSuccess(true)
      setForm(initialForm)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Greška pri slanju upita')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="border border-green-200 bg-green-50 rounded-lg p-6 text-center">
        <p className="text-lg font-medium text-green-900 mb-2">Upit je poslat!</p>
        <p className="text-sm text-green-700">Kontaktiraćemo vas u najkraćem mogućem roku.</p>
      </div>
    )
  }

  const field = (
    name: keyof InquiryFormData,
    label: string,
    type = 'text',
    required = true
  ) => (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={form[name] ?? ''}
        onChange={handleChange}
        required={required}
        className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-900 transition-colors"
      />
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 border border-gray-200 rounded-lg p-6">
      <h2 className="font-semibold text-green-900">Pošaljite upit</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {field('ime', 'Ime')}
        {field('prezime', 'Prezime')}
      </div>
      {field('email', 'Email', 'email')}
      {field('telefon', 'Telefon', 'tel')}

      <div className="flex flex-col gap-1">
        <label htmlFor="poruka" className="text-sm font-medium">Poruka</label>
        <textarea
          id="poruka"
          name="poruka"
          value={form.poruka ?? ''}
          onChange={handleChange}
          rows={3}
          placeholder="Napišite vaše pitanje ili komentar..."
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-900 transition-colors resize-none"
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-green-900 text-white rounded font-medium text-sm hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Slanje...' : 'Pošalji upit'}
      </button>
    </form>
  )
}
