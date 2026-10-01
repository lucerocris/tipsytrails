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

// Marquees hold still for visitors who ask for reduced motion.
const playOnInit = () =>
  typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches

function LogoRow({ logos, speed }: { logos: LogoEntry[]; speed: number }) {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    AutoScroll({
      speed,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      playOnInit: playOnInit(),
    }),
  ]);

  return (
    <div className = "relative w-full overflow-hidden" ref = {emblaRef}>
      <div className = "flex touch-pan-y select-none">
        {[...logos, ...logos, ...logos, ...logos].map((logo, index) => (
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
  )
}

export function BrandCarousel({
  logos,
}: BrandCarouselProps) {
  const splitIndex = Math.ceil(logos.length / 2);
  const firstRow = logos.slice(0, splitIndex);
  const secondRow = logos.slice(splitIndex);

  if (!logos.length) return null

  return (
    <div className = "w-full py-8 md:py-10 flex flex-col gap-8 md:gap-10">
      <LogoRow logos = {firstRow} speed = {1} />
      {secondRow.length > 0 && <LogoRow logos = {secondRow} speed = {-1} />}
    </div>
  )
}
