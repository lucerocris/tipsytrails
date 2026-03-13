import React from 'react'
import { notFound } from 'next/navigation'
/* Dynamically import `payload` and the site config inside the page function
   at runtime on the server. This prevents server-only modules (fs, etc.)
   from being bundled into client-side code. */
import { PageClient } from '@/app/(frontend)/PageClient'
import type { Page, Testimonial, Cocktail, Category } from '@/payload-types'

type Params = { slug: string }

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

type PayloadInstance = any
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
          return
        }

        const ids = refs.filter((r): r is number => typeof r === 'number')
        if (ids.length > 0) {
          const { docs } = await payload.find({
            collection: 'testimonials',
            where: { id: { in: ids } },
            depth: 1,
            limit: ids.length,
          })
          result[index] = docs
          return
        }
      }

      const { docs } = await payload.find({
        collection: 'testimonials',
        depth: 1,
        limit: 12,
        sort: '-createdAt',
      })
      result[index] = docs
    }),
  )
  return result
}

/**
 * Resolve menu categories used in blocks and guarantee cocktail images are populated.
 * Mirrors the approach used on the home page: fetch categories with depth:3, collect
 * cocktail IDs referenced (numbers or objects with unpopulated image), fetch those
 * cocktails with depth:1 to populate upload relations, then rebuild category drinks.
 */
async function resolveMenuCategoriesForBlocks(
  layout: any[],
  payload: PayloadInstance,
): Promise<Record<number, ResolvedCategory[]>> {
  const result: Record<number, ResolvedCategory[]> = {}

  await Promise.all(
    layout.map(async (block, index) => {
      if (block.blockType !== 'menu') return

      const refs: (number | Category)[] = block.categories ?? []
      let categories: Category[] = []

      if (refs.length > 0) {
        const populated = refs.filter(isCategory)
        if (populated.length > 0) {
          categories = populated
        } else {
          const ids = refs.filter((r): r is number => typeof r === 'number')
          if (ids.length > 0) {
            const { docs } = await payload.find({
              collection: 'categories',
              where: { id: { in: ids } },
              depth: 3,
              limit: ids.length,
            })
            categories = docs
          }
        }
      } else {
        const { docs } = await payload.find({
          collection: 'categories',
          where: { featuredOnLanding: { equals: true } },
          depth: 3,
          sort: 'order',
        })
        categories = docs
      }

      // Collect cocktail IDs that we need to ensure are populated.
      const idsToFetchSet = new Set<number>()
      categories.forEach((cat) => {
        const raw = cat.drinks?.docs ?? []
        raw.forEach((d: any) => {
          if (typeof d === 'number') {
            idsToFetchSet.add(d)
          } else if (d && typeof (d as any).image === 'number') {
            idsToFetchSet.add((d as Cocktail).id)
          } else if (d && typeof (d as Cocktail).id === 'number') {
            idsToFetchSet.add((d as Cocktail).id)
          }
        })
      })

      const idsToFetch = Array.from(idsToFetchSet)

      // Fetch populated cocktails (depth:1) if needed, and build a lookup map.
      const populatedById = new Map<number, Cocktail>()
      if (idsToFetch.length > 0) {
        const { docs: populatedDrinks } = await payload.find({
          collection: 'cocktails',
          where: { id: { in: idsToFetch } },
          depth: 1,
          limit: idsToFetch.length,
        })
        populatedDrinks.forEach((d: any) => populatedById.set(d.id, d))
      }

      // Rebuild each category's drinks using populated docs when available.
      result[index] = categories.map((cat) => {
        const raw = cat.drinks?.docs ?? []

        const finalDrinks: Cocktail[] = raw
          .map((d) => {
            if (typeof d === 'number') {
              return populatedById.get(d)
            }
            const maybePop = populatedById.get((d as Cocktail).id)
            if (maybePop) return maybePop
            return isCocktail(d) ? (d as Cocktail) : undefined
          })
          // Inline type guard to narrow to Cocktail[]
          .filter((x): x is Cocktail => typeof x === 'object' && x !== null)

        return {
          id: cat.id,
          name: cat.name,
          drinks: finalDrinks,
        }
      })
    }),
  )

  return result
}

// ─── page ─────────────────────────────────────────────────────────────────────

export default async function SlugPage({ params }: { params: Params }) {
  const { slug } = params

  // Dynamically import payload and the site config at runtime on the server.
  // This avoids bundling server-only modules (fs, etc.) into client bundles.
  const payloadModule = await import('payload')
  const payloadAny: any = payloadModule
  // Prefer an exported helper when available, otherwise fall back to default accessor.
  const getPayload = payloadAny.getPayload ?? payloadAny.default?.getPayload
  const configModule = await import('@/payload.config')
  const config = configModule?.default ?? configModule
  const payload = await getPayload({ config })

  const { docs } = await payload.find({
    collection: 'pages',
    depth: 3,
    where: { slug: { equals: slug } },
  })

  const pageData = docs[0] as Page | undefined
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
