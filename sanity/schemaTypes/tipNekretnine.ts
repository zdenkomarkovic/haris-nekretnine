import { defineField, defineType } from 'sanity'

export const tipNekretnineType = defineType({
  name: 'tipNekretnine',
  title: 'Tip nekretnine',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Opis',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt', title: 'Alt tekst', type: 'string' }),
      ],
    }),
    defineField({
      name: 'redosled',
      title: 'Redosled prikaza',
      type: 'number',
      description: 'Manji broj = prikazuje se pre. Prazno = sortira se po nazivu.',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
