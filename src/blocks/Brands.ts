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
  ],
}