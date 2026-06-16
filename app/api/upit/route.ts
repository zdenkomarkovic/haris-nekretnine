import { NextResponse } from 'next/server'
import { sendInquiryEmail } from '@/lib/email/sendInquiry'
import type { InquiryFormData } from '@/types/shop'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { form, nekretnina } = body as {
      form: InquiryFormData
      nekretnina: { name: string; slug: string }
    }

    if (!form?.email || !form?.ime || !nekretnina?.name) {
      return NextResponse.json({ error: 'Nedostaju podaci' }, { status: 400 })
    }

    await sendInquiryEmail(form, nekretnina)

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Greška pri slanju upita:', err)
    return NextResponse.json({ error: 'Greška pri slanju upita' }, { status: 500 })
  }
}
