import { NextResponse } from 'next/server'
import Mailjet from 'node-mailjet'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Nekretnine'

export async function POST(req: Request) {
  try {
    const { ime, prezime, email, telefon, poruka } = await req.json()

    if (!ime || !email) {
      return NextResponse.json({ error: 'Nedostaju obavezna polja' }, { status: 400 })
    }

    const client = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY!,
      apiSecret: process.env.MAILJET_SECRET_KEY!,
    })

    const from = { Email: process.env.SITE_MAIL_SENDER!, Name: SITE_NAME }

    await client.post('send', { version: 'v3.1' }).request({
      Messages: [
        {
          From: from,
          To: [{ Email: process.env.SITE_MAIL_RECEIVER! }],
          Subject: `Kontakt poruka — ${ime} ${prezime}`,
          HTMLPart: `
<!DOCTYPE html><html lang="sr"><head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <h2 style="border-bottom:2px solid #333;padding-bottom:10px">Nova kontakt poruka</h2>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:4px 8px;width:140px;color:#666">Ime i prezime:</td><td style="padding:4px 8px"><strong>${ime} ${prezime}</strong></td></tr>
    <tr><td style="padding:4px 8px;color:#666">Email:</td><td style="padding:4px 8px">${email}</td></tr>
    <tr><td style="padding:4px 8px;color:#666">Telefon:</td><td style="padding:4px 8px">${telefon ?? '—'}</td></tr>
    ${poruka ? `<tr><td style="padding:4px 8px;color:#666">Poruka:</td><td style="padding:4px 8px">${poruka}</td></tr>` : ''}
  </table>
</body></html>`,
        },
        {
          From: from,
          To: [{ Email: email, Name: `${ime} ${prezime}` }],
          ReplyTo: { Email: process.env.SITE_MAIL_RECEIVER! },
          Subject: `Potvrda poruke — ${SITE_NAME}`,
          HTMLPart: `
<!DOCTYPE html><html lang="sr"><head><meta charset="UTF-8"></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <h2 style="border-bottom:2px solid #333;padding-bottom:10px">Hvala na poruci, ${ime}!</h2>
  <p style="font-size:15px;line-height:1.6;color:#555">Primili smo vašu poruku i odgovorićemo u najkraćem mogućem roku.</p>
  ${poruka ? `<h3>Vaša poruka</h3><p style="background:#f9f9f9;padding:12px;border-radius:4px;color:#555">${poruka}</p>` : ''}
  <p style="margin-top:32px;font-size:13px;color:#999;border-top:1px solid #eee;padding-top:16px">
    Ovaj mail je automatski poslan od strane ${SITE_NAME}.
  </p>
</body></html>`,
        },
      ],
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Greška pri slanju kontakt poruke:', err)
    return NextResponse.json({ error: 'Greška pri slanju poruke' }, { status: 500 })
  }
}
