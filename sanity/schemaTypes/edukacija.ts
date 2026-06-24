import { defineField, defineType } from 'sanity'

export const edukacijaType = defineType({
  name: 'edukacija',
  title: 'Edukacija',
  type: 'document',
  fields: [
    defineField({
      name: 'naslov',
      title: 'Naslov',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tekst',
      title: 'Tekst',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normalan', value: 'normal' },
            { title: 'Naslov H2', value: 'h2' },
            { title: 'Naslov H3', value: 'h3' },
            { title: 'Citat', value: 'blockquote' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
              { title: 'Podvučeno', value: 'underline' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  defineField({ name: 'href', type: 'url', title: 'URL' }),
                ],
              },
            ],
          },
        },
      ],
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
      name: 'redosled',
      title: 'Redosled prikaza',
      type: 'number',
      description: 'Manji broj = prikazuje se pre. Prazno = sortira se po datumu.',
    }),
  ],
  preview: {
    select: { title: 'naslov', media: 'slike.0' },
  },
  orderings: [
    {
      title: 'Redosled',
      name: 'redosledAsc',
      by: [{ field: 'redosled', direction: 'asc' }, { field: '_createdAt', direction: 'desc' }],
    },
  ],
})
