
import React from 'react'
import { HeroBlock } from '@/blocks/Hero'

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
            return <HeroBlock key={index} {...block} />
            
          
          default:
            return (
              <div key={index} className="p-4 bg-red-100 text-red-800 border border-red-300 text-center">
                Unknown block type: <strong>{block.blockType}</strong>
              </div>
            )
        }
      })}
    </div>
  )
}