import { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'clientType', 'mobileViber', 'email'],
    group: 'CRM & Sales',
  },
  fields: [
    {
      name: 'clientType',
      type: 'select',
      defaultValue: 'individual',
      options: [
        { label: 'Individual (Wedding, Birthday)', value: 'individual' },
        { label: 'Corporate / Brand', value: 'corporate' },
        { label: 'Event Coordinator / Partner', value: 'coordinator' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'companyName',
      type: 'text',
      admin: {
        condition: (data) => data.clientType === 'corporate',
        description: 'e.g., Aboitiz, San Miguel, etc.',
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'firstName', type: 'text', required: true },
        { name: 'lastName', type: 'text', required: true },
      ],
    },
    {
      name: 'fullName',
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.firstName && data?.lastName) return `${data.firstName} ${data.lastName}`
          },
        ],
      },
    },
    {
      type: 'row',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'mobileViber', type: 'text', required: true },
      ],
    },
    {
      name: 'totalSpent',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
      },
    },
  ],
}
