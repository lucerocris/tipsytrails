import React from 'react'
import { notFound } from 'next/navigation'
import { PageClient } from '@/app/(frontend)/PageClient'
import type { Page } from '@/payload-types'

export default async function AboutPage() {
  const payloadModule = await import('payload')
  const payloadAny: any = payloadModule
  const getPayload = payloadAny.getPayload ?? payloadAny.default?.getPayload
  const configModule = await import('@/payload.config')
  const config = configModule?.default ?? configModule
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 2,
    where: { slug: { equals: 'about' } },
  })

  const pageData = docs[0] as Page | undefined
  if (!pageData) return notFound()

  return <PageClient page={pageData} />
}