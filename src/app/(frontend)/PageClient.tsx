'use client'

import React from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { BlockRenderer } from '@/app/(frontend)/components/BlockRenderer'
import type { Testimonial } from '@/payload-types'

const SERVER_URL = process.env.NEXT_PUBLIC_PAYLOAD_SERVER_URL ?? 'http://localhost:3000'

type PageClientProps = {
  page: any
  testimonials?: Record<number, Testimonial[]>
}

export const PageClient: React.FC<PageClientProps> = ({
  page: initialPage,
  testimonials = {}
}) => {
  const { data } = useLivePreview({
    initialData: initialPage,
    serverURL: SERVER_URL,
    depth: 2,
  })
  
  const blocks = React.useMemo(() => {
    if (!data?.layout) return data?.layout
    return data.layout.map((block: any, index: number) => {
      if (block.blockType === 'testimonials' && testimonials[index]) {
        return { ...block, testimonials: testimonials[index] }
      }
      return block;
    })
  }, [data?.layout, testimonials]);

  return (
    <main>
      <BlockRenderer blocks={data?.layout} />
    </main>
  )
}
