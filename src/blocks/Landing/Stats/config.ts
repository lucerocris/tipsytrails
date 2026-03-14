import type { Block } from "payload";

export const StatsBlock: Block = {
  slug: 'stats',
  labels: {
    singular: 'Statistics Section',
    plural: 'Statistics Sections',
  },
  
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      label: 'Eyebrow Label',
      admin: {
        description: 'The small uppercase label above the heading',
      },
    },
    
    {
      name: 'heading',
      type: 'text',
      required: true,
      label: 'Heading',
    },
    
    {
      name: 'headingContinued',
      type: 'text',
      label: 'Heading (Second Line)',
      admin: {
        description: 'Second line before the highlighted word',
      }
    },
    
    {
      name: 'headingHighlight',
      type: 'text',
      label: 'Highlighted word/s in the heading',
    },
    
    {
      name: 'stats',
      type: 'array',
      label: 'stats',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          label: 'Value',
          admin: {
            description: 'e.g., 50+, 100%',
          },
        },
        
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
          admin: {
            description: 'e.g., Events Served'
          },
        },
      ],
    },
    
    {
      name: 'images',
      type: 'array',
      label: 'Gallery Images',
      minRows: 1,
      maxRows: 5,
      admin: {
        description: 'First image is the large featured square. 4 more will fill the 2x2 grid',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}