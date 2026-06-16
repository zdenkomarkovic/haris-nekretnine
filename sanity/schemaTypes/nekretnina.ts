import { defineField, defineType } from 'sanity'

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[šŠ]/g, 's')
    .replace(/[čČ]/g, 'c')
    .replace(/[ćĆ]/g, 'c')
    .replace(/[žŽ]/g, 'z')
    .replace(/[đĐ]/g, 'dj')
    .replace(/\s+/g, '-')
    .replace(/[^\w-]/g, '')
    .replace(/-+/g, '-')
}

export const nekretnineType = defineType({
  name: 'nekretnina',
  title: 'Nekretnina',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'sifra',
      title: 'Šifra nekretnine',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc: Record<string, unknown>) => {
          const name = (doc.name as string) ?? ''
          const sifra = (doc.sifra as string) ?? ''
          return sifra ? `${name} ${sifra}` : name
        },
        slugify: async (input, _schemaType, context) => {
          const baseSlug = slugify(input)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const doc = context.parent as any
          const docId = (doc?._id ?? '').replace('drafts.', '')

          const client = context.getClient({ apiVersion: '2024-01-01' })
          const existing = await client.fetch<number>(
            `count(*[_type == "nekretnina" && slug.current == $slug && _id != $id && _id != $draftId])`,
            { slug: baseSlug, id: docId, draftId: `drafts.${docId}` },
          )

          if (existing === 0) return baseSlug
          return `${baseSlug}-${docId.slice(-6)}`
        },
        isUnique: async (slug, context) => {
          const client = context.getClient({ apiVersion: '2024-01-01' })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const docId = ((context as any).document?._id ?? '').replace('drafts.', '')
          const count = await client.fetch<number>(
            `count(*[_type == "nekretnina" && slug.current == $slug && _id != $id && _id != $draftId])`,
            { slug, id: docId, draftId: `drafts.${docId}` },
          )
          return count === 0
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tip',
      title: 'Tip nekretnine',
      type: 'reference',
      to: [{ type: 'tipNekretnine' }],
    }),
    defineField({
      name: 'oblast',
      title: 'Oblast',
      type: 'reference',
      to: [{ type: 'oblast' }],
    }),
    defineField({
      name: 'namena',
      title: 'Namena',
      type: 'string',
      options: {
        list: [
          { title: 'Prodaja', value: 'prodaja' },
          { title: 'Izdavanje', value: 'izdavanje' },
        ],
        layout: 'radio',
      },
      initialValue: 'prodaja',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Dostupno', value: 'dostupno' },
          { title: 'Rezervisano', value: 'rezervisano' },
          { title: 'Prodato', value: 'prodato' },
        ],
        layout: 'radio',
      },
      initialValue: 'dostupno',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cena',
      title: 'Cena (EUR)',
      type: 'number',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'povrsina',
      title: 'Površina (m²)',
      type: 'number',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'brSoba',
      title: 'Broj soba',
      type: 'number',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'brKupatila',
      title: 'Broj kupatila',
      type: 'number',
      validation: (r) => r.positive(),
    }),
    defineField({
      name: 'energetskaKlasa',
      title: 'Energetska klasa',
      type: 'string',
      options: {
        list: ['A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].map((v) => ({ title: v, value: v })),
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'vrstaGrejanja',
      title: 'Vrsta grejanja',
      type: 'string',
      options: {
        list: [
          { title: 'Centralno', value: 'centralno' },
          { title: 'Etažno', value: 'etazno' },
          { title: 'Podno', value: 'podno' },
          { title: 'Klima', value: 'klima' },
          { title: 'Struja', value: 'struja' },
          { title: 'Gas', value: 'gas' },
          { title: 'Drva / ugalj', value: 'drva-ugalj' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'spratnost',
      title: 'Spratnost',
      type: 'string',
      options: {
        list: [
          { title: 'Prizemlje', value: 'prizemlje' },
          { title: '1. sprat', value: '1-sprat' },
          { title: '2. sprat', value: '2-sprat' },
          { title: '3. sprat', value: '3-sprat' },
          { title: '4. sprat', value: '4-sprat' },
          { title: '5. sprat', value: '5-sprat' },
          { title: '6. sprat', value: '6-sprat' },
          { title: '7+ sprat', value: '7plus-sprat' },
          { title: 'Potkrovlje', value: 'potkrovlje' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'lift',
      title: 'Lift',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'lokacija',
      title: 'Lokacija (grad)',
      type: 'string',
    }),
    defineField({
      name: 'adresa',
      title: 'Adresa',
      type: 'string',
    }),
    defineField({
      name: 'slike',
      title: 'Slike',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'opis',
      title: 'Opis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'istaknuta',
      title: 'Istaknuta nekretnina',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'videi',
      title: 'Video zapisi',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'videoZapis',
          title: 'Video zapis',
          fields: [
            defineField({
              name: 'tip',
              title: 'Tip videa',
              type: 'string',
              options: {
                list: [
                  { title: 'Fajl (upload)', value: 'fajl' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
                layout: 'radio',
              },
              initialValue: 'youtube',
              validation: (r) => r.required(),
            }),
            defineField({
              name: 'fajl',
              title: 'Video fajl',
              type: 'file',
              options: { accept: 'video/*' },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              hidden: ({ parent }: any) => parent?.tip !== 'fajl',
            }),
            defineField({
              name: 'url',
              title: 'Link',
              type: 'url',
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              hidden: ({ parent }: any) => parent?.tip === 'fajl',
            }),
            defineField({
              name: 'naslov',
              title: 'Naslov (opciono)',
              type: 'string',
            }),
          ],
          preview: {
            select: { tip: 'tip', url: 'url', naslov: 'naslov' },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            prepare({ tip, url, naslov }: any) {
              const labels: Record<string, string> = {
                fajl: 'Fajl', youtube: 'YouTube', instagram: 'Instagram',
                facebook: 'Facebook', tiktok: 'TikTok',
              }
              return { title: naslov || url || 'Video', subtitle: labels[tip] ?? tip }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'lokacijaGeo',
      title: 'Lokacija na mapi',
      type: 'geopoint',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'cena', media: 'slike.0' },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    prepare({ title, subtitle, media }: any) {
      return { title, subtitle: subtitle ? `${subtitle.toLocaleString('sr-RS')} EUR` : '', media }
    },
  },
})
