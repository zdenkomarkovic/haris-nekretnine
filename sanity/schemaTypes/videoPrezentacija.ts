import { defineField, defineType } from 'sanity'

export const videoPrezentacijaType = defineType({
  name: 'videoPrezentacija',
  title: 'Video Prezentacija',
  type: 'document',
  fields: [
    defineField({
      name: 'naslov',
      title: 'Naslov',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'tip',
      title: 'Platforma',
      type: 'string',
      options: {
        list: [
          { title: 'YouTube', value: 'youtube' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Video fajl', value: 'fajl' },
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL linka',
      type: 'url',
      hidden: ({ document }) => document?.tip === 'fajl',
    }),
    defineField({
      name: 'fajl',
      title: 'Video fajl',
      type: 'file',
      options: { accept: 'video/*' },
      hidden: ({ document }) => document?.tip !== 'fajl',
    }),
    defineField({
      name: 'opis',
      title: 'Opis (opciono)',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'redosled',
      title: 'Redosled',
      type: 'number',
      description: 'Manji broj = prikazuje se pre. Ostavite prazno za automatski redosled po datumu.',
    }),
  ],
  orderings: [
    {
      title: 'Redosled (ručni)',
      name: 'redosledAsc',
      by: [{ field: 'redosled', direction: 'asc' }],
    },
    {
      title: 'Najnoviji',
      name: 'createdDesc',
      by: [{ field: '_createdAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'naslov', subtitle: 'tip' },
    prepare({ title, subtitle }) {
      const labels: Record<string, string> = {
        youtube: '▶ YouTube',
        facebook: '▶ Facebook',
        tiktok: '▶ TikTok',
        instagram: '▶ Instagram',
        fajl: '▶ Video fajl',
      }
      return { title, subtitle: labels[subtitle] ?? subtitle }
    },
  },
})
