import type { Block } from "payload";

export const AboutHeroBlock: Block = {
    slug: 'pageHero',
    labels: {
        singular: 'Page Hero',
        plural: 'Page Heroes',
    },

    fields: [
        {
            name: 'heading',
            type: 'text',
            required: true,
            label: 'Heading',
        },

        {
            name: 'headingScript',
            type: 'text',
            required: true,
            label: 'Script Highlight (Cursive Text)',
        },

        {
            name: 'backgroundImage',
            type: 'upload',
            relationTo: 'media',
            required: true,
            label: 'Background Image',
        },
    ],
}