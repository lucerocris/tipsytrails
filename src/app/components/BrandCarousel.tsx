'use client'
import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import AutoScroll from 'embla-carousel-auto-scroll'

// 1. We change this to an array of objects.
//    You can now add a 'className' property to specific logos to resize them.
//    If you don't add a className, it uses the default size (h-8 md:h-12).
const LOGOS = [
  {
    src: '/logo/logo1.svg',
    alt: 'Logo 1',
  },
  {
    src: '/logo/logo2.png',
    alt: 'Logo 2',
  },
  {
    src: '/logo/logo3.png',
    alt: 'Logo 3',
    className: 'h-16',
  },
  {
    src: '/logo/logo4.png',
    alt: 'Logo 4',
  },
  {
    src: '/logo/logo5.png',
    alt: 'Logo 5',
    className: 'h-24',
  },
  {
    src: '/logo/logo6.webp',
    alt: 'Logo 6',
    className: 'h-14',
  },
  {
    src: '/logo/logo7.png',
    alt: 'Logo 6',
    className: 'h-14',
  },
  {
    src: '/logo/logo9.png',
    alt: 'Logo 6',
    className: 'h-14',
  },
  {
    src: '/logo/logo10.png',
    alt: 'Logo 6',
    className: 'h-16',
  },
  {
    src: '/logo/logo11.png',
    alt: 'Logo 6',
    className: 'h-10',
  },
]

export function BrandCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: 1.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ])

  return (
    <div className="relative w-full overflow-hidden" ref={emblaRef}>
      <div className="flex touch-pan-y select-none">
        {[...LOGOS, ...LOGOS, ...LOGOS].map((logo, index) => (
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
  )
}
