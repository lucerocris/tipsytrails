import { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    group: 'Menu',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        description: 'e.g., Signature Cocktails, Classic Cocktails, Shooters',
      },
    },
    {
      name: 'featuredOnLanding',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Toggle this on to show this category and its drinks as a slider on the homepage.',
      },
    },
    {
      name: 'order',
      type: 'number',
      admin: {
        description: 'Lower numbers appear first on the page (e.g., 1, 2, 3).',
      },
    },

    {
      name: 'drinks',
      type: 'join',
      collection: 'cocktails',
      on: 'category',
      // Allow joined cocktails to populate their `image` upload relation
      // when the parent query requests depth >= 2.
      maxDepth: 2,
    },
  ],
}
