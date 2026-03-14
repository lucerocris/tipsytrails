import { HeroBlock } from '@/blocks/Landing/MainHero/config'
import { StatsBlock } from '@/blocks/Landing/Stats/config'
import { CocktailTastingBlock } from '@/blocks/Landing/CocktailTasting/config'
import { TestimonialBlock } from '@/blocks/Landing/Testimonial/config'
import { BrandsBlock } from '@/blocks/Landing/Brands/config'
import { MenuBlock } from '@/blocks/Landing/Menu/config'
import { TimelineBlock } from '@/blocks/About/Timeline/config'
import { AboutHeroBlock } from '@/blocks/PageHero/config'
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
      blocks: [
        HeroBlock,
        StatsBlock,
        CocktailTastingBlock,
        TestimonialBlock,
        BrandsBlock,
        MenuBlock,
        AboutHeroBlock,
        TimelineBlock,
      ],
    },
  ],
}
