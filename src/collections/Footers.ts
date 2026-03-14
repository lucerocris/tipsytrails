import type { CollectionConfig } from "payload";

export const Footer: CollectionConfig = {
    slug: 'footers',
    admin: {
        useAsTitle: 'copyrightName',
        group: 'Website Content',
        description: 'Controls the site-wide footer content. Only one footer record is used.',
    },

    fields: [
        {
            name: 'tagline',
            type: 'text',
            label: 'Tagline',
            required: true,
            admin: {
                description: 'short tagline shown next to the small martini logo.'
            }
        },

        {
            name: 'exploreLinks',
            type: 'array',
            minRows: 1,
            maxRows: 8,
            admin: {
                description: 'Navigation links shown under the "Explore" column',
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
                        description: 'e.g. /about or https://example.com'
                    },
                },
            ],
        },

        {
            name: 'socialLinks',
            type: 'array',
            minRows: 1,
            maxRows: 8,
            admin: {
                description: 'Links shown under the "Socials" column',
            },

            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                    label: 'Platform Name',
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