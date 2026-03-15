import type { CollectionAfterChangeHook, CollectionConfig } from 'payload'

const autoCreateClientAndEvent: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  operation,
  req,
  context,
}) => {
  if (operation !== 'update' || doc.status !== 'booked' || previousDoc?.status === 'booked') {
    return doc
  }
  if (context.skipAutoCreate) return doc

  const { payload } = req

  try {
    const newClient = await payload.create({
      collection: 'clients',
      data: {
        firstName: doc.firstName,
        lastName: doc.lastName,
        email: doc.email ?? undefined,
        mobileViber: doc.mobileViber,
      },
      req,
      context: { skipAutoCreate: true },
    })

    const packageId =
      doc.selectedPackage && typeof doc.selectedPackage === 'object'
        ? doc.selectedPackage.id
        : doc.selectedPackage

    await payload.create({
      collection: 'events',
      data: {
        eventName: `${doc.firstName}'s ${doc.eventType || 'Event'}`,
        client: newClient.id,
        eventDate: doc.eventDate,
        venue: doc.venue,
        paymentStatus: 'deposit_pending',
        operationsNotes: doc.specialRequests,
        ...(packageId ? { packageBooked: packageId } : {}),
        ...(doc.agreedPrice != null ? { agreedPrice: doc.agreedPrice } : {}),
      },
      req,
      context: { skipAutoCreate: true },
    })
  } catch (err) {
    req.payload.logger.error({
      err,
      msg: 'autoCreateClientAndEvent: failed to automatically create Client or Event record',
    })
  }

  return doc
}

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
  hooks: {
    afterChange: [autoCreateClientAndEvent],
  },
  fields: [
    // --- CRM STATUS & UI (Admin Only Sidebar) ---
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      admin: {
        position: 'sidebar',
        components: {
          Cell: '@/components/StatusBadge#StatusBadge',
        },
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
      name: 'selectedPackage',
      type: 'relationship',
      relationTo: 'packages',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'agreedPrice',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Final negotiated price (PHP)',
      },
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