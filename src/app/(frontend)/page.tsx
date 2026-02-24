import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { parrisienne, playfair } from './fonts'
import configPromise from '@/payload.config';
import { BrandCarousel } from '@/app/components/BrandCarousel'
import { getPayload } from 'payload'
import type { Cocktail, Media, Testimonial } from '@/payload-types'

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
    limit: 3,
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
        <div className="flex flex-col max-w-7xl mx-auto gap-20 overflow-hidden">
          {featuredCategories.map((category) => (
            <div key={category.id} className="flex flex-col gap-6">
              <h4 className="flex gap-3">
                {/* Dynamically display the category name (e.g., 'Signature' / 'cocktails') */}
                <span className={`${parrisienne.className} text-5xl text-primary`}>
                  {category.name.split(' ')[0]}
                </span>{' '}
                <span className={`${playfair.className} text-4xl text-black`}>
                  {category.name.split(' ').slice(1).join(' ')}
                </span>
              </h4>

              {/* Horizontal slider container */}
              <div className="flex gap-4 h-108.5 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4">
                {/* Map the eagerly loaded drinks from the join field */}
                {(category.drinks?.docs ?? []).filter(isCocktail).map((drink) => {
                  const image = isMedia(drink.image) ? drink.image : null
                  const imageUrl = image?.url
                    ? image.url.startsWith('http')
                      ? image.url
                      : `${baseUrl}${image.url}`
                    : '/placeholder.png'
                  const imageAlt = image?.alt || drink.name

                  return (
                    <div
                      key={drink.id}
                      className="flex flex-col gap-2 min-w-70 md:min-w-75 flex-1 h-full snap-start shrink-0"
                    >
                      {/* Replaced bg-url with next/image for dynamic db images */}
                      <div className="relative w-full h-full bg-gray-100 rounded-sm overflow-hidden">
                        <Image
                          src={imageUrl}
                          alt={imageAlt}
                          fill
                          sizes="(min-width: 768px) 300px, 280px"
                          className="object-cover"
                        />
                      </div>
                      <p className={`${playfair.className} text-black text-xl font-medium`}>
                        {drink.name}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
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

          <div className="flex gap-3 h-133">
            {testimonials.map((t: Testimonial) => {
              const avatar = t.avatar && typeof t.avatar === 'object' ? t.avatar : null
              const avatarUrl = avatar?.url
                ? avatar.url.startsWith('http')
                  ? avatar.url
                  : `${baseUrl}${avatar.url}`
                : '/placeholder.png'

              return (
                <div
                  key={t.id}
                  className="flex flex-col justify-between flex-1 h-full bg-primary rounded-sm p-11"
                >
                  <div className="flex flex-col gap-9">
                    <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-300 mb-4">
                      <Image
                        src={avatarUrl}
                        alt={avatar?.alt || t.clientName}
                        fill
                        sizes="56px"
                        className="object-cover"
                      />
                    </div>
                    <p className="font-medium text-md text-white leading-relaxed">"{t.quote}"</p>
                  </div>

                  <div className="flex flex-col text-white">
                    <p className="font-semibold text-md">{t.clientName}</p>
                    {t.clientRole ? <p className="text-sm">{t.clientRole}</p> : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}
