import type { Block } from "payload";

export const CocktailTastingBlock: Block = {
  slug: 'cocktailTasting',
  labels: {
    singular: 'Cocktail Tasting',
    plural: 'Cocktail Tastings',
  },
  
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      label: 'Eyebrow Label',
      admin: {
        description: 'The small uppsercase label above the heading',
      },
    },
    
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
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
          name: 'buttonText',
          type: 'text',
          label: 'Button Text',
        },
        
        {
          name: 'buttonLink',
          type: 'text',
          label: 'Button URL',
          defaultValue: '/cocktail-tasting'
        },
      ],
    },
  ],
}