import { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    group: 'Content',
  },
  fields: [
    {
      name: 'quote',
      type: 'textarea',
      required: true,
      admin: {
        description: 'The actual review or testimonial text.',
      },
    },
    {
      name: 'clientName',
      type: 'text',
      required: true,
    },
    {
      name: 'clientRole',
      type: 'text',
      admin: {
        description: 'e.g., Marketing Lead, AboitizLand',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
}
