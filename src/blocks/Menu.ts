import type { Block } from "payload";

export const MenuBlock: Block = {
  slug: 'menu',
  labels: {
    singular: 'menu',
    plural: 'menus',
  },
  
  fields: [
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      label: 'Categories to Display',
    },
    
    {
      name: 'cardsPerView',
      type: 'select',
      label: 'Cards Per Row (Desktop)',
      defaultValue: '4',
      options: [
        { label: '3 cards', value: '3' },
        { label: '4 cards', value: '4' },
      ]
    }
  ]
}