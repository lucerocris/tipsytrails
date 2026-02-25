import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { playfair } from './fonts'
import configPromise from '@/payload.config';
import { BrandCarousel } from '@/app/(frontend)/components/BrandCarousel'
import { getPayload } from 'payload'
import type { Cocktail, Media, Testimonial } from '@/payload-types'
import { CocktailCarousel } from '@/app/(frontend)/components/CocktailCarousel';
import { TestimonialCarousel } from '@/app/(frontend)/components/TestimonialCarousel';

function isPopulated<T extends object>(value: unknown): value is T {
  return typeof value === 'object' && value !== null
}

function isCocktail(value: number | Cocktail): value is Cocktail {
  return isPopulated<Cocktail>(value)
}

function isMedia(value: number | Media): value is Media {
  return isPopulated<Media>(value)
}

export default async function HomePage() {
  const payload = await getPayload({config: configPromise});
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

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

  return (
    <>
      {/* hero */}
      <div className="relative h-screen w-full overflow-hidden text-foreground px-24 py-16 flex justify-center">
        {/* The Background Image */}
        <Image
          src="/placeholder.png"
          alt="Hero background"
          fill
          unoptimized
          priority
          className="object-cover -z-10" // Moves image behind content
          sizes="100vw"
        />

        {/* The Content Overlay */}
        <div className="relative z-10 flex h-full w-full items-end  max-w-7xl">
          <div className="flex h-auto flex-col gap-1 lg:gap-3">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-3.5">
                <h1
                  className={`${playfair.className} text-6xl font-semibold flex flex-col gap-2 text-black`}
                >
                  Cebu's Premium <span className="text-primary!">Mobile Cocktail Bar</span>{' '}
                </h1>
                <p className="text-lg text-black max-w-lg">
                  We bring the bar, you bring the guests. Elevated cocktails & full service for
                  weddings and events.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/"
                  className="inline-flex w-fit items-center justify-center px-5 py-3 text-md font-medium text-white bg-primary rounded-sm"
                >
                  Get My Custom Quote
                </Link>

                <Link
                  href="/"
                  className="inline-flex w-fit items-center justify-center px-5 py-3 text-md font-medium text-primary border-primary border rounded-sm"
                >
                  Book a Tasting Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* brands worked with section */}
      <div className="py-20 pt-30">
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

      <div className="py-20">
        <div className="w-full h-fit flex flex-col justify-center gap-10 max-w-7xl mx-auto">
          <div className="flex flex-col gap-10">
            <div className="flex justify-between items-end w-full">
              <div className="flex flex-col gap-2">
                <p>THE TIPSY TRAILS EXPERIENCE</p>
                <h2 className="flex flex-col gap-1 text-5xl font-medium">
                  Why Cebu's Top Brands
                  <span>
                    & Planners
                    <span className={`${playfair.className} text-primary`}> Choose us </span>
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-3 gap-18 max-w-150">
                {/* Stat 1 */}
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-primary font-semibold text-4xl">50+</p>
                  <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">
                    Events Served
                  </p>
                </div>

                {/* Stat 2 */}
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-primary font-semibold text-4xl">7+</p>
                  <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">
                    Years Experience
                  </p>
                </div>

                {/* Stat 3 */}
                <div className="flex flex-col items-center justify-start gap-1">
                  <p className="text-primary font-semibold text-4xl">100%</p>
                  <p className="text-[#9A9A9A] text-sm font-medium text-center leading-tight">
                    Client Satisfaction
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-9">
              <div className="flex-1 h-150 w-full bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat"></div>{' '}
              <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
                <div className="w-full h-full bg-gray-200"></div>
                <div className="w-full h-full bg-gray-200"></div>
                <div className="w-full h-full bg-gray-200"></div>
                <div className="w-full h-full bg-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        {/* Content Container (z-10 puts it above the overlay) */}
        <div className="flex flex-col gap-6 justify-center items-center bg-[url('/placeholder.png')] bg-cover bg-center bg-no-repeat h-[65vh]  rounded-sm w-full max-w-7xl mx-auto">
          <div className="relative z-10 flex flex-col gap-2 text-center text-black">
            <p className="tracking-widest text-sm font-semibold uppercase ">COCKTAIL TASTING</p>

            <h2 className="flex flex-col gap-1 text-5xl font-medium max-w-xl">
              Don't Just Guess. Taste Your Menu First.
            </h2>
          </div>
          <Link
            href="/"
            className="inline-flex w-fit items-center justify-center px-5 py-3 text-md font-medium text-white bg-primary rounded-sm"
          >
            Book a tasting session
          </Link>
        </div>
      </div>

      {/*  menu  */}
      <div className="py-20">
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
      <div className="py-20">
        <div className="flex flex-col max-w-7xl mx-auto gap-10">
          <div className="flex flex-col gap-2">
            <p>TESTIMONIALS</p>
            <h2 className="flex flex-col gap-1 text-5xl font-medium">
              Don't take our word for it!
              <span>Hear it from our Clients.</span>
            </h2>
          </div>

          <TestimonialCarousel 
            testimonial={testimonials}
            baseUrl = {baseUrl}
          />
        </div>
      </div>
    </>
  )
}
