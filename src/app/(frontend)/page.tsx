import React from 'react'
import configPromise from '@/payload.config'
import { BrandCarousel } from '@/app/(frontend)/components/BrandCarousel'
import { getPayload } from 'payload'
import type { Cocktail, Testimonial, Category } from '@/payload-types'
import { notFound } from 'next/navigation'
import { PageClient } from './PageClient'

// ─── type guards ──────────────────────────────────────────────────────────────

function isPopulated<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null
}

function isCocktail(value: number | Cocktail): value is Cocktail {
  return isPopulated<Cocktail>(value)
}

function isTestimonial(value: number | Testimonial): value is Testimonial {
  return isPopulated<Testimonial>(value)
}

function isCategory(value: number | Category): value is Category {
  return isPopulated<Category>(value)
}

type PayloadInstance = Awaited<ReturnType<typeof getPayload>>
type ResolvedCategory = { id: number; name: string; drinks: Cocktail[] }

// ─── resolvers ────────────────────────────────────────────────────────────────

async function resolveTestimonialsForBlocks(
  layout: any[],
  payload: PayloadInstance,
): Promise<Record<number, Testimonial[]>> {
  const result: Record<number, Testimonial[]> = {}
  await Promise.all(
    layout.map(async (block, index) => {
      if (block.blockType !== 'testimonial') return
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

async function resolveMenuCategoriesForBlocks(
  layout: any[],
  payload: PayloadInstance,
): Promise<Record<number, ResolvedCategory[]>> {
  const result: Record<number, ResolvedCategory[]> = {}
  await Promise.all(
    layout.map(async (block, index) => {
      // ✅ matches the actual block slug 'menu'
      if (block.blockType !== 'menu') return

      const refs: (number | Category)[] = block.categories ?? []
      let categories: Category[] = []

      if (refs.length > 0) {
        const populated = refs.filter(isCategory)
        if (populated.length > 0) {
          categories = populated
        } else {
          const ids = refs.filter((r): r is number => typeof r === 'number')
          const { docs } = await payload.find({
            collection: 'categories',
            where: { id: { in: ids } },
            depth: 2,
            limit: ids.length,
          })
          categories = docs
        }
      } else {
        // No categories selected — fall back to featuredOnLanding
        const { docs } = await payload.find({
          collection: 'categories',
          where: { featuredOnLanding: { equals: true } },
          depth: 2,
          sort: 'order',
        })
        categories = docs
      }

      result[index] = categories.map((cat) => ({
        id: cat.id,
        name: cat.name,
        drinks: (cat.drinks?.docs ?? []).filter(isCocktail),
      }))
    }),
  )
  return result
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: pageDocs } = await payload.find({
    collection: 'pages',
    depth: 2,
    where: { slug: { equals: 'home' } },
  })

  const pageData = pageDocs[0]
  if (!pageData) return notFound()

  const layout = pageData.layout ?? []
  const [resolvedTestimonials, resolvedMenuCategories] = await Promise.all([
    resolveTestimonialsForBlocks(layout, payload),
    resolveMenuCategoriesForBlocks(layout, payload),
  ])

  return (
    <PageClient
      page={pageData}
      testimonials={resolvedTestimonials}
      categories={resolvedMenuCategories}
    />
  )
}