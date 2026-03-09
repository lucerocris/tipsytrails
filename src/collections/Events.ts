import { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'eventName',
    defaultColumns: ['eventName', 'eventDate', 'paymentStatus'],
    group: 'Operations',
  },
  fields: [
    {
      name: 'eventName',
      type: 'text',
      required: true,
      admin: { placeholder: 'e.g., Dela Cruz Nuptials or Company Summer Outing' },
    },
    {
      name: 'client',
      type: 'relationship',
      relationTo: 'clients',
      required: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      defaultValue: 'deposit_pending',
      options: [
        { label: 'Awaiting Deposit', value: 'deposit_pending' },
        { label: 'Deposit Paid (Date Secured)', value: 'deposit_paid' },
        { label: 'Fully Paid', value: 'fully_paid' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'eventDate', type: 'date', required: true },
        { name: 'setupTime', type: 'text', admin: { placeholder: 'e.g., 3:00 PM ingress' } },
      ],
    },
    {
      name: 'venue',
      type: 'text',
      required: true,
      admin: { placeholder: 'e.g., Chateau de Busay, Cebu City' },
    },
    {
      name: 'packageBooked',
      type: 'relationship',
      relationTo: 'packages',
    },
    {
      name: 'agreedPrice',
      type: 'number',
      admin: {
        description: 'Final price if negotiated differently from the base package price.',
      },
    },
    {
      name: 'operationsNotes',
      type: 'textarea',
      admin: {
        placeholder: 'e.g., Needs extra glasses for VIP table, client providing own whiskey.',
      },
    },
  ],
}
