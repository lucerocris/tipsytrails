'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

const LOGOS = [
  {
    src: '/logo/logo1.svg',
    alt: 'Logo 1',
    className: 'h-8',
  },
  {
    src: '/logo/logo2.png',
    alt: 'Logo 2',
    className: 'h-8',
  },
  {
    src: '/logo/logo3.png',
    alt: 'Logo 3',
    className: 'h-8',
  },
  {
    src: '/logo/logo4.png',
    alt: 'Logo 4',
    className: 'h-8',
  },
  {
    src: '/logo/logo5.png',
    alt: 'Logo 5',
    className: 'h-12',
  },
  {
    src: '/logo/logo6.webp',
    alt: 'Logo 6',
    className: 'h-7',
  },
  {
    src: '/logo/logo7.png',
    alt: 'Logo 7',
    className: 'h-7',
  },
  {
    src: '/logo/logo9.png',
    alt: 'Logo 9',
    className: 'h-7',
  },
  {
    src: '/logo/logo10.png',
    alt: 'Logo 10',
    className: 'h-8',
  },
  {
    src: '/logo/logo11.png',
    alt: 'Logo 11',
    className: 'h-6',
  },
  {
    src: '/logo/logo12.png',
    alt: 'Logo 12',
    className: 'h-6',
  },
  {
    src: '/logo/logo13.png',
    alt: 'Logo 13',
    className: 'h-6',
  },
  {
    src: '/logo/logo15.png',
    alt: 'Logo 15',
    className: 'h-10',
  },
]

export function BrandCarousel() {
  // Split the logos array into two halves
  const splitIndex = Math.ceil(LOGOS.length / 2)
  const firstRow = LOGOS.slice(0, splitIndex)
  const secondRow = LOGOS.slice(splitIndex)

  // Configuration for the Top Row (Standard Direction)
  const [emblaRefTop] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: 1.5, // Positive speed = Left
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])

  // Configuration for the Bottom Row (Opposite Direction)
  const [emblaRefBottom] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: -1.5, // Negative speed = Right (Opposite)
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])

  return (
    <div className="w-full py-6 flex flex-col gap-8 md:gap-12">
      {/* --- Top Row --- */}
      <div className="relative w-full overflow-hidden" ref={emblaRefTop}>
        <div className="flex touch-pan-y select-none">
          {/* We repeat the array 4 times to ensure smooth infinite looping */}
          {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((logo, index) => (
            <div
              key={index}
              className="flex-[0_0_auto] min-w-0 px-6 md:px-10 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt || 'Brand Logo'}
                className={`w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${
                  logo.className ? logo.className : 'h-8 md:h-12'
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* --- Bottom Row --- */}
      <div className="relative w-full overflow-hidden" ref={emblaRefBottom}>
        <div className="flex touch-pan-y select-none">
          {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((logo, index) => (
            <div
              key={index}
              className="flex-[0_0_auto] min-w-0 px-6 md:px-10 flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt || 'Brand Logo'}
                className={`w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${
                  logo.className ? logo.className : 'h-8 md:h-12'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
