import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'eventDate', 'status', 'createdAt'],
    group: 'CRM',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // --- CRM STATUS (Admin Only) ---
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
      },
      options: [
        { label: 'New Inquiry', value: 'new' },
        { label: 'Contacted (Viber/Msg)', value: 'contacted' },
        { label: 'Proposal Sent', value: 'proposal_sent' },
        { label: 'Booked / Confirmed', value: 'booked' },
        { label: 'Lost / Cancelled', value: 'lost' },
      ],
    },
    {
      name: 'adminNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Internal notes for this client (e.g., agreed price, specific needs).',
      },
    },

    // --- CLIENT DETAILS (From Form) ---
    {
      type: 'row', // Groups fields side-by-side in the admin panel
      fields: [
        { name: 'firstName', type: 'text', required: true },
        { name: 'lastName', type: 'text', required: true },
      ],
    },
    {
      name: 'fullName', // A hidden field to use as the title in the admin list
      type: 'text',
      admin: { hidden: true },
      hooks: {
        beforeValidate: [
          ({ data }) => {
            if (data?.firstName && data?.lastName) {
              return `${data.firstName} ${data.lastName}`
            }
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

    // --- EVENT DETAILS (From Form) ---
    {
      type: 'row',
      fields: [
        { name: 'eventDate', type: 'date', required: true },
        { name: 'eventType', type: 'text' }, // Can be changed to 'select' if you have fixed types
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'venue', type: 'text', required: true },
        { name: 'guestCount', type: 'number', required: true },
      ],
    },
    {
      name: 'specialRequests',
      type: 'textarea',
    },
  ],
}
