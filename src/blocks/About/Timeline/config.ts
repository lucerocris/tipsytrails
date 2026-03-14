import type { Block } from "payload";

export const TimelineBlock: Block = {
    slug: 'timeline',
    labels: {
        singular: 'Timeline',
        plural: 'Timelines',
    },

    fields: [
        {
            name: 'entries',
            type: 'array',
            label: 'Timeline Entries',
            minRows: 1,
            admin: {
                description: 'Each entry is a milestone on the timeline.',
            },

            fields: [
                {
                    name: 'dateLabel',
                    type: 'text',
                    required: true,
                    label: 'Date / Period',
                    admin: {
                        description: 'e.g. Jan 2022',
                    },
                },

                {
                    name: 'description',
                    type: 'textarea',
                    required: true,
                    label: 'Description',
                },

                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                    label: 'Image',
                },
            ],
        },
    ],
}