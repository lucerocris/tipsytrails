import { CollectionConfig } from 'payload'

export const Packages: CollectionConfig = {
  slug: 'packages',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'basePrice'],
    group: 'Operations',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: { placeholder: 'e.g., Premium Open Bar (100 Pax)' },
    },
    {
      name: 'basePrice',
      type: 'number',
      required: true,
    },
    {
      name: 'inclusions',
      type: 'richText',
      admin: {
        description: 'List the liquors, mixers, and hours included.',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}
