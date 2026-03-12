import React from 'react'
import { Button } from '@/app/(frontend)/components/Button'
import { playfair } from './fonts'
import configPromise from '@/payload.config'
import { BrandCarousel } from '@/app/(frontend)/components/BrandCarousel'
import { getPayload } from 'payload'
import type { Cocktail, Testimonial } from '@/payload-types'
import { CocktailCarousel } from '@/app/(frontend)/components/CocktailCarousel'
import { TestimonialCarousel } from '@/app/(frontend)/components/TestimonialCarousel'
import { notFound } from 'next/navigation'
import { PageClient } from './PageClient'

function isPopulated<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null
}

function isCocktail(value: number | Cocktail): value is Cocktail {
  return isPopulated<Cocktail>(value)
}

function isTestimonial(value: number | Testimonial): value is Testimonial {
  return isPopulated<Testimonial>(value);
}

async function resolveTestimonialsForBlocks(
  layout: any[],
  payload: Awaited<ReturnType<typeof getPayload>>,
): Promise<Record<number, Testimonial[]>> {
  const result: Record<number, Testimonial[]> = {};
  
  await Promise.all(
    layout.map(async (block, index) => {
      if (block.blockType !== 'testimonials') return;
      
      const refs: (number | Testimonial)[] = block.testimonials ?? [];
      
      if (refs.length > 0) {
        const populated = refs.filter(isTestimonial)
        if (populated.length > 0) {
          result[index] = populated;
        } else {
          const ids = refs.filter((r): r is number => typeof r === 'number')
          const { docs } = await payload.find({
            collection: 'testimonials',
            where: { id: { in: ids } },
            depth: 1,
            limit: ids.length,
          });
          result[index] = docs;
        }
      } else {
        const { docs } = await payload.find({
          collection: 'testimonials',
          depth: 1,
          limit: 12,
          sort: '-createdAt',
        });
        result[index] = docs;
      }
    }),
  )
  return result
}

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const { docs: pageDocs } = await payload.find({
    collection: 'pages',
    depth: 2,
    where: {
      slug: { equals: 'home' },
    },
  })

  const pageData = pageDocs[0]

  if (!pageData) return notFound()

  const { docs: featuredCategories } = await payload.find({
    collection: 'categories',
    depth: 2,
    where: {
      featuredOnLanding: { equals: true },
    },
    sort: 'order',
  })

  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    depth: 1,
    limit: 12,
    sort: '-createdAt',
  })
  
  const resolvedTestimonials = pageData.layout
    ? await resolveTestimonialsForBlocks(pageData.layout, payload)
    : {};

  return (
    <>
      <PageClient page={pageData} />
      {/* brands worked with section */}
      <div className="py-14 lg:py-20 pt-24 lg:pt-30 px-4 md:px-8">
        {/* content */}
        <div className="w-full h-full flex flex-col justify-center gap-4 max-w-7xl mx-auto">
          <h4 className={`font-medium text-2xl text-black text-center`}>
            Trusted by Cebu event planners and brands
          </h4>

          <div className="w-full mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <BrandCarousel />
          </div>
        </div>
      </div>

      {/*  menu  */}
      <div className="py-14 md:py-20 px-4 md:px-8">
        <div className="flex flex-col max-w-7xl mx-auto gap-20">
          {featuredCategories.map((category) => {
            return (
              <CocktailCarousel
                key={category.id}
                categoryName={category.name}
                drinks={(category.drinks?.docs ?? []).filter(isCocktail)}
                baseUrl={baseUrl}
              />
            )
          })}
        </div>
      </div>
      {/* testimonials */}
      {/*<div className="py-14 md:py-20 px-4 md:px-8">
        <div className="flex flex-col max-w-7xl mx-auto gap-10">
          <div className="flex flex-col gap-2">
            <p className="text-sm lg:text-base">TESTIMONIALS</p>
            <h2 className="flex flex-col gap-1 text-2xl md:text-4xl lg:text-5xl font-medium">
              Don't take our word for it!
              <span>Hear it from our Clients.</span>
            </h2>
          </div>

          <TestimonialCarousel testimonial={testimonials} baseUrl={baseUrl} />
        </div>
      </div>*/}
    </>
  )
}
