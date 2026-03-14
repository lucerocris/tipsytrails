'use client'

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import AutoScroll from "embla-carousel-auto-scroll"

type LogoEntry = {
  src: string
  alt: string
  className?: string
}

type BrandCarouselProps = {
  logos: LogoEntry[]
}

export function BrandCarousel({
  logos,
}: BrandCarouselProps) {
  const splitIndex = Math.ceil(logos.length / 2);
  const firstRow = logos.slice(0, splitIndex);
  const secondRow = logos.slice(splitIndex);

  const [emblaRefTop] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: 1.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
    }),
  ]);

  const [emblaRefBottom] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed: -1.5,
      stopOnInteraction: false,
      stopOnMouseEnter: true
    }),
  ]);

  if (!logos.length) return null

  return (
    <div className = "w-full py-6 flex flex-col gap-8 md:gap-12">
      <div className = "relative w-full overflow-hidden" ref = {emblaRefTop}>
        <div className = "flex touch-pan-y select-none">
          {[...firstRow, ...firstRow, ...firstRow, ...firstRow].map((logo, index) => (
            <div
              key = {index}
              className = "flex-[0_0_auto] min-w-0 px-6 md:px-10 flex items-center justify-center"
            >
              <img 
                src = {logo.src}
                alt = {logo.alt || "Brand Logo"}
                className = {`w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${
                  logo.className ? logo.className : "h-8 md:h-12"
                }`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className = "relative w-full overflow-hidden" ref = {emblaRefBottom}>
        <div className = "flex touch-pan-y select-none">
          {[...secondRow, ...secondRow, ...secondRow, ...secondRow].map((logo, index) => (
            <div
              key = {index}
              className = "flex-[0_0_auto] min-w-0 px-6 md:px-10 flex items-center justify-center"
            >
              <img 
                src = {logo.src}
                alt = {logo.alt || "Brand Logo"}
                className = {`w-auto object-contain opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 ${
                  logo.className ? logo.className : "h-8 md:h-12"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}