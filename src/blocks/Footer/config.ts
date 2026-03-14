import type { Block } from 'payload'

export const FooterBlock: Block = {
  slug: 'footer',
  labels: {
    singular: 'Footer',
    plural: 'Footers',
  },

  fields: [
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: "Cebu's premium mobile cocktail bar for weddings & events.",
      admin: {
        description: 'Short tagline shown next to the martini logo.',
      },
    },

    {
      name: 'exploreLinks',
      type: 'array',
      label: 'Explore Links',
      minRows: 1,
      maxRows: 8,
      admin: {
        description: 'Navigation links shown under the "Explore" column.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Label',
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'URL',
          admin: {
            description: 'e.g. /about or https://example.com',
          },
        },
      ],
    },

    {
      name: 'socialLinks',
      type: 'array',
      label: 'Social Links',
      minRows: 1,
      maxRows: 8,
      admin: {
        description: 'Links shown under the "Socials" column.',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
          label: 'Platform Name',
          admin: {
            description: 'e.g. Instagram, Facebook, Viber',
          },
        },
        {
          name: 'href',
          type: 'text',
          required: true,
          label: 'URL',
        },
      ],
    },

    {
      type: 'row',
      fields: [
        {
          name: 'copyrightName',
          type: 'text',
          label: 'Copyright Name',
          defaultValue: 'Tipsy Trails',
          admin: {
            description: 'Name shown in "© Name, Year".',
            width: '50%',
          },
        },
        {
          name: 'locationText',
          type: 'text',
          label: 'Location Text',
          defaultValue: 'Based in Cebu, Philippines',
          admin: {
            width: '50%',
          },
        },
      ],
    },
  ],
}