import React from 'react'
/* Note: `payload` and the payload config are imported dynamically inside server functions
   to prevent server-only modules (fs, etc.) from being bundled into client code. */
import { BrandCarousel } from '@/app/(frontend)/components/BrandCarousel'
import { notFound } from 'next/navigation'
import { PageClient } from './PageClient'
import type { Cocktail, Testimonial, Category } from '@/payload-types'

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

/**
 * Resolves testimonial references used by blocks into populated testimonial docs.
 * Mirrors patterns used elsewhere in the app.
 */
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

      // fallback: fetch recent testimonials
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
 * Robustly resolves menu categories for blocks and ensures cocktails returned
 * have their `image` upload relation populated. The resolver:
 *
 *  - Fetches categories (depth: 3) so nested references are present where possible
 *  - Collects all cocktail IDs referenced by each category (either as numbers, or
 *    as objects whose `image` is still an ID)
 *  - Performs a single (deduplicated) fetch for all relevant cocktails with depth:1
 *    to populate the `image` upload relation
 *  - Reconstructs each category's drinks array using the populated cocktail docs
 *
 * This approach minimizes round-trips while guaranteeing each cocktail has a
 * populated `image` object available to the client components.
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
              depth: 3, // try to populate nested relationships
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

      // Collect all cocktail IDs referenced by these categories that we may need to populate.
      // category.drinks?.docs may contain numbers or cocktail objects.
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

      // Fetch populated cocktail docs only when needed.
      const populatedById = new Map<number, Cocktail>()
      if (idsToFetch.length > 0) {
        const { docs: populatedDrinks } = await payload.find({
          collection: 'cocktails',
          where: { id: { in: idsToFetch } },
          depth: 1, // populate upload relation (media)
          limit: idsToFetch.length,
        })
        populatedDrinks.forEach((d: any) => populatedById.set(d.id, d))
      }

      // Reconstruct categories with populated cocktails
      result[index] = categories.map((cat) => {
        const raw = cat.drinks?.docs ?? []

        // Map each raw entry (number or object) -> populated Cocktail if available
        const finalDrinks: Cocktail[] = raw
          .map((d) => {
            if (typeof d === 'number') {
              return populatedById.get(d)
            }
            // d is object — prefer the populated version if we fetched it, otherwise keep as-is if it matches type
            const maybePop = populatedById.get((d as Cocktail).id)
            if (maybePop) return maybePop
            return isCocktail(d) ? (d as Cocktail) : undefined
          })
          .filter((d): d is Cocktail => {
            // Inline type guard to satisfy TypeScript: ensure value is defined and looks like a Cocktail object
            return typeof d === 'object' && d !== null
          })

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

export default async function HomePage() {
  // Dynamically import payload and the site config at runtime on the server.
  // This avoids bundling server-only modules like `fs` into client-side bundles.
  const payloadModule = await import('payload')
  const payloadAny: any = payloadModule
  const getPayload = payloadAny.getPayload ?? payloadAny.default?.getPayload
  const configModule = await import('@/payload.config')
  const config = configModule?.default ?? configModule
  const payload = await getPayload({ config })

  const { docs: pageDocs } = await payload.find({
    collection: 'pages',
    depth: 3,
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
