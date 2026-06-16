import { defineField, defineType } from 'sanity'

export const oblastType = defineType({
  name: 'oblast',
  title: 'Oblast',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Naziv oblasti',
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
      name: 'opis',
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
  orderings: [
    {
      title: 'Naziv A–Z',
      name: 'nameAsc',
      by: [{ field: 'name', direction: 'asc' }],
    },
  ],
})
