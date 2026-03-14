import React from 'react'
import { HeroBlockUI } from '@/blocks/Landing/MainHero/UI'
import { StatsBlockUI } from '@/blocks/Landing/Stats/UI'
import { CocktailTastingBlockUI } from '@/blocks/Landing/CocktailTasting/UI'
import { TestimonialBlockUI } from '@/blocks/Landing/Testimonial/UI'
import { BrandsBlockUI } from '@/blocks/Landing/Brands/UI'
import { MenuBlockUI } from '@/blocks/Landing/Menu/UI'

type BlockRendererProps = {
  blocks: any[]
}

export const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            return <HeroBlockUI key={index} {...block} />

          case 'stats':
            return <StatsBlockUI key={index} {...block} />

          case 'cocktailTasting':
            return <CocktailTastingBlockUI key={index} {...block} />

          case 'testimonial':
            return <TestimonialBlockUI key={index} {...block} />

          case 'brands':
            return <BrandsBlockUI key={index} {...block} />

          case 'menu':
            return <MenuBlockUI key={index} {...block} />

          default:
            return (
              <div
                key={index}
                className="p-4 bg-red-100 text-red-800 border border-red-300 text-center"
              >
                Unknown block type: <strong>{block.blockType}</strong>
              </div>
            )
        }
      })}
    </div>
  )
}
