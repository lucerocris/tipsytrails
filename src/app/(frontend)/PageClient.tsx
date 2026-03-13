'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { BlockRenderer } from '@/app/(frontend)/components/BlockRenderer'
import type { Cocktail, Testimonial } from '@/payload-types'

const SERVER_URL = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ?? 'http://localhost:3000'

type ResolvedCategory = {
  id: number
  name: string
  drinks: Cocktail[]
}

type PageClientProps = {
  page: any
  testimonials?: Record<number, Testimonial[]>
  categories?: Record<number, ResolvedCategory[]>
}

export const PageClient: React.FC<PageClientProps> = ({
  page: initialPage,
  testimonials = {},
  categories = {},
}) => {
  const { data } = useLivePreview({
    initialData: initialPage,
    serverURL: SERVER_URL,
    depth: 2,
  })

  const blocks = React.useMemo(() => {
    if (!data?.layout) return data?.layout
    return data.layout.map((block: any, index: number) => {
      if (block.blockType === 'testimonial' && testimonials[index]) {
        return { ...block, resolvedTestimonials: testimonials[index] }
      }
      if (block.blockType === 'menu' && categories[index]) {
        return { ...block, resolvedCategories: categories[index] }
      }
      return block
    })
  }, [data?.layout, testimonials, categories])

  return (
    <main>
      <BlockRenderer blocks={blocks} />
    </main>
  )
}