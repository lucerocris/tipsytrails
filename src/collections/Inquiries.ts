import { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'eventDate', 'status', 'createdAt'],
    group: 'CRM & Sales',
  },
  access: {
    create: () => true, 
    read: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => !!user,
  },
  fields: [
    // --- CRM STATUS & UI (Admin Only Sidebar) ---
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
      name: 'quickMessageUI',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: '@/components/QuickMessage#QuickMessage',
        },
      },
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
    
   
    {
      type: 'row',
      fields: [
        {
          name: 'preferredContact',
          type: 'select',
          defaultValue: 'Viber',
          options: [
            { label: 'Viber', value: 'Viber' },
            { label: 'Facebook Messenger', value: 'Facebook Messenger' },
            { label: 'Email', value: 'Email' },
          ],
        },
        {
          name: 'messengerUsername',
          type: 'text',
          admin: {
            condition: (data) => data.preferredContact === 'Facebook Messenger',
            description: 'Username without the m.me/ prefix',
          },
        },
      ],
    },

    {
      type: 'row',
      fields: [
        { name: 'eventDate', type: 'date', required: true },
        { name: 'eventType', type: 'text' }, 
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