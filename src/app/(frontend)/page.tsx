import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { playfair } from './layout'
import { BrandCarousel } from '@/app/components/BrandCarousel'

export default async function HomePage() {
  return (
    <>
      {/* hero */}
      <div className="relative h-screen w-full overflow-hidden text-foreground px-[96px] py-11 flex justify-center">
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
                  Cebu's Premium <span className="!text-primary">Mobile Cocktail Bar</span>{' '}
                </h1>
                <p className="text-lg text-black max-w-lg font-medium">
                  We bring the bar, you bring the guests. Elevated cocktails & full service for
                  weddings and events.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/"
                  className="inline-flex w-fit items-center justify-center px-6 py-4 text-md font-semibold text-white bg-primary rounded-sm"
                >
                  Get My Custom Quote
                </Link>

                <Link
                  href="/"
                  className="inline-flex w-fit items-center justify-center px-6 py-4 text-md font-semibold text-primary border-primary border rounded-sm"
                >
                  Book a Tasting Session
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* brands worked with section */}

      <div className="flex items-center justify-center py-10 px-[96px]">
        {/* content */}
        <div className="w-full h-full flex flex-col justify-center gap-7 max-w-7xl">
          <h4 className={`font-medium text-2xl text-black text-center`}>
            Trusted by Cebu event planners and brands
          </h4>

          <div className="w-full [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
            <BrandCarousel />
          </div>
        </div>
      </div>
    </>
  )
}
