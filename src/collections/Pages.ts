import { HeroBlock } from '@/blocks/Hero'
import { StatsBlock } from '@/blocks/Stats'
import { CocktailTastingBlock } from '@/blocks/CocktailTasting'
import { NullifyLocaleField } from '@payloadcms/ui'
import { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    livePreview: {
      url: ({ data }) => {
        if (data?.slug === 'home') {
          return `http://localhost:3000/?preview=true`
        }
        if (data?.slug) {
          return `http://localhost:3000/${data.slug}?preview=true`
        }
        return 'http://localhost:3000'
      },
    },
  },

  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, StatsBlock, CocktailTastingBlock],
    },
  ],
}
