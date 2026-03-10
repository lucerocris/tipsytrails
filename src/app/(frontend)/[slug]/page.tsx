import React from 'react'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@/payload.config'
import { PageClient } from '@/app/(frontend)/PageClient'
import type { Page } from '@/payload-types'

type Params = Promise<{ slug: string }>

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

  return <PageClient page={pageData} />
}
