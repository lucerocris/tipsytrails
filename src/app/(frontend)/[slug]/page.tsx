import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PageClient } from '@/app/(frontend)/PageClient'
import type { Page, Testimonial } from '@/payload-types'

type Params = Promise<{ slug: string }>

function isTestimonial(value: number | Testimonial): value is Testimonial {
  return typeof value === 'object' && value !== null
}

async function resolveTestimonialsForBlocks(
  layout: any[],
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<Record<number, Testimonial[]>> {
  const result: Record<number, Testimonial[]> = {}
 
  await Promise.all(
    layout.map(async (block, index) => {
      if (block.blockType !== 'testimonials') return
 
      const refs: (number | Testimonial)[] = block.testimonials ?? []
 
      if (refs.length > 0) {
        const populated = refs.filter(isTestimonial)
        if (populated.length > 0) {
          result[index] = populated
        } else {
          const ids = refs.filter((r): r is number => typeof r === 'number')
          const { docs } = await payload.find({
            collection: 'testimonials',
            where: { id: { in: ids } },
            depth: 1,
            limit: ids.length,
          })
          result[index] = docs
        }
      } else {
        const { docs } = await payload.find({
          collection: 'testimonials',
          depth: 1,
          limit: 12,
          sort: '-createdAt',
        })
        result[index] = docs
      }
    }),
  )
 
  return result
}

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = await params

  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 2,
    where: {
      slug: { equals: slug },
    },
  })

  const pageData = docs[0] as Page | undefined

  if (!pageData) {
    return notFound()
  }
  
  const resolvedTestimonials = pageData.layout
    ? await resolveTestimonialsForBlocks(pageData.layout, payload)
    : {}

  return <PageClient page={pageData} testimonials={resolvedTestimonials} />
}
