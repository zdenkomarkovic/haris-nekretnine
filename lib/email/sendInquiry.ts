import Mailjet from 'node-mailjet'
import type { InquiryFormData } from '@/types/shop'

const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Nekretnine'

function buildOwnerHtml(form: InquiryFormData, nekretnina: { name: string; slug: string }) {
  return `
<!DOCTYPE html>
<html lang="sr">
<head><meta charset="UTF-8"><title>Novi upit za nekretninu</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <h2 style="border-bottom:2px solid #333;padding-bottom:10px">Novi upit za nekretninu</h2>

  <h3>Nekretnina</h3>
  <p><strong>${nekretnina.name}</strong></p>

  <h3 style="margin-top:24px">Podaci kontakta</h3>
  <table style="width:100%;border-collapse:collapse">
    <tr><td style="padding:4px 8px;width:140px;color:#666">Ime i prezime:</td><td style="padding:4px 8px"><strong>${form.ime} ${form.prezime}</strong></td></tr>
    <tr><td style="padding:4px 8px;color:#666">Email:</td><td style="padding:4px 8px">${form.email}</td></tr>
    <tr><td style="padding:4px 8px;color:#666">Telefon:</td><td style="padding:4px 8px">${form.telefon}</td></tr>
    ${form.poruka ? `<tr><td style="padding:4px 8px;color:#666">Poruka:</td><td style="padding:4px 8px">${form.poruka}</td></tr>` : ''}
  </table>
</body>
</html>`
}

function buildClientHtml(form: InquiryFormData, nekretnina: { name: string; slug: string }) {
  return `
<!DOCTYPE html>
<html lang="sr">
<head><meta charset="UTF-8"><title>Potvrda upita</title></head>
<body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333">
  <h2 style="border-bottom:2px solid #333;padding-bottom:10px">Hvala na upitu, ${form.ime}!</h2>

  <p style="font-size:15px;line-height:1.6;color:#555">
    Primili smo vaš upit za nekretninu <strong>${nekretnina.name}</strong>. Kontaktiraćemo vas u najkraćem mogućem roku.
  </p>

  ${form.poruka ? `<h3 style="margin-top:24px">Vaša poruka</h3><p style="background:#f9f9f9;padding:12px;border-radius:4px;color:#555">${form.poruka}</p>` : ''}

  <p style="margin-top:32px;font-size:13px;color:#999;border-top:1px solid #eee;padding-top:16px">
    Ovaj mail je automatski poslan od strane ${SITE_NAME}. Ukoliko imate pitanja, kontaktirajte nas na
    <a href="mailto:${process.env.SITE_MAIL_RECEIVER}" style="color:#555">${process.env.SITE_MAIL_RECEIVER}</a>.
  </p>
</body>
</html>`
}

export async function sendInquiryEmail(
  form: InquiryFormData,
  nekretnina: { name: string; slug: string }
) {
  const client = new Mailjet({
    apiKey: process.env.MAILJET_API_KEY!,
    apiSecret: process.env.MAILJET_SECRET_KEY!,
  })

  const from = {
    Email: process.env.SITE_MAIL_SENDER!,
    Name: SITE_NAME,
  }

  await client.post('send', { version: 'v3.1' }).request({
    Messages: [
      {
        From: from,
        To: [{ Email: process.env.SITE_MAIL_RECEIVER! }],
        Subject: `Novi upit — ${nekretnina.name} — ${form.ime} ${form.prezime}`,
        HTMLPart: buildOwnerHtml(form, nekretnina),
      },
      {
        From: from,
        To: [{ Email: form.email, Name: `${form.ime} ${form.prezime}` }],
        ReplyTo: { Email: process.env.SITE_MAIL_RECEIVER! },
        Subject: `Potvrda upita — ${SITE_NAME}`,
        HTMLPart: buildClientHtml(form, nekretnina),
      },
    ],
  })
}
