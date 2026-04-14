import { config, collection, fields } from '@keystatic/core'

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    articles: collection({
      label: 'Articles',
      slugField: 'title',
      path: 'content/articles/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.slug({ name: { label: 'Titre' } }),
        date: fields.date({ label: 'Date de publication' }),
        tags: fields.array(
          fields.text({ label: 'Tag' }),
          { label: 'Tags', itemLabel: (props) => props.value }
        ),
        excerpt: fields.text({ label: 'Extrait', multiline: true }),
        body: fields.document({
          label: 'Contenu',
          formatting: true,
          dividers: true,
          links: true,
          images: true,
        }),
      },
    }),
  },
})
