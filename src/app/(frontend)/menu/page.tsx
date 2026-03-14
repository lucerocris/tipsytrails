import React from 'react'
import { MenuClient } from './menuClient'

export default async function MenuPage() {
  const payloadModule = await import('payload')
  const payloadAny: any = payloadModule
  const getPayload = payloadAny.getPayload ?? payloadAny.default?.getPayload
  const configModule = await import('@/payload.config')
  const config = configModule?.default ?? configModule
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 2,
    where: { slug: { equals: 'menu' } },
  })

  const pageData = docs[0]

  // Find the first pageHero block in the layout, if the page exists
  const heroBlock =
    pageData?.layout?.find((block: any) => block.blockType === 'pageHero') ?? null

  return <MenuClient heroBlock={heroBlock} />
}