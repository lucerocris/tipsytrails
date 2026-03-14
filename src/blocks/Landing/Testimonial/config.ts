import { Block } from "payload";

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  labels: {
    singular: 'testimonial',
    plural: 'testimonials',
  },
  
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
      admin: {
        description: 'The small uppercase label above the heading',
      },
    },
    
    {
      name: 'headingLine1',
      type: 'text',
      required: true,
      label: 'Heading (First Line)',
    },
    
    {
      name: 'headingLine2',
      type: 'text',
      label: 'Heading (Second Line)',
    },
    
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      label: 'Testimonials',
      admin: {
        description: 'Select the testimonials to display. Leave empty to show all.'
      },
    },
  ],
}