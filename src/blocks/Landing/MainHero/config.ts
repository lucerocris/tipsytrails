// src/payload/blocks/Hero.ts
import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: {
    singular: 'Hero Section',
    plural: 'Hero Sections',
  },
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Main Heading',
    },

    {
      name: 'headingHighlight',
      type: 'text',
      label: 'Highlighted Heading (Colored)',
      admin: {
        description: 'This text will appear in the primary brand color next to the main heading.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description Paragraph',
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      label: 'Background Image',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'primaryButtonText',
          type: 'text',
          label: 'Primary Button Text (Olive Green)',
          defaultValue: 'Get My Custom Quote',
        },
        {
          name: 'primaryButtonLink',
          type: 'text',
          label: 'Primary Button URL',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'secondaryButtonText',
          type: 'text',
          label: 'Secondary Button Text (White)',
          defaultValue: 'Book a Tasting Session',
        },
        {
          name: 'secondaryButtonLink',
          type: 'text',
          label: 'Secondary Button URL',
        },
      ],
    },
  ],
}
