import type { Block } from "payload";

export const BrandsBlock: Block = {
  slug: 'brands',
  labels: {
    singular: 'brand',
    plural: 'brands',
  },
  
  fields: [
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },

    {
      name: 'logos',
      type: 'array',
      required: true,
      label: 'Brand Logos',
      minRows: 1,
      admin: {
        description: 'Upload brand/partner logos. They will be split in two rows and auto-scrolled',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
          label: 'Logo Image',
        },

        {
          name: 'alt',
          type: 'text',
          label: 'Alt Text',
          admin: {
            description: 'Accessible label for the logo.',
          },
        },

        {
          name: 'height',
          type: 'select',
          label: 'Display Height',
          defaultValue: 'h-8',
          options: [
            { label: 'Extra Small (h-5)', value: 'h-5' },
            { label: 'Small (h-6)', value: 'h-6' },
            { label: 'Medium (h-8)', value: 'h-8' },
            { label: 'Large (h-10)', value: 'h-10' },
            { label: 'Extra Large (h-12)', value: 'h-12' },
          ],
        },
      ],
    },
  ],
}